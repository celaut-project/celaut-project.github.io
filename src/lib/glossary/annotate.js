/*
 * src/lib/glossary/annotate.js
 * ------------------------------------------------------------------
 * Finds glossary terms in already-rendered prose and wraps the first
 * few occurrences in a <button class="gloss">.
 *
 * WHY POST-RENDER DOM WALKING, AND NOT MARKUP
 * -------------------------------------------
 * The obvious implementation is to write `<Gloss term="node">node</Gloss>`
 * into the copy. That was rejected for one reason: this site keeps
 * every user-facing string in seventeen dictionaries, and components
 * index into them positionally. Putting markup in the copy would mean
 * seventeen translators hand-placing seventeen sets of tags, forever,
 * and `check-i18n-keys.mjs` could not tell a missing tag from a
 * stylistic choice. The words would rot out of sync with the terms.
 *
 * Walking the DOM instead means: translators write plain sentences,
 * they list the words that should be explained in their language, and
 * the pairing is done by the machine every time the page renders. A
 * new term is one dictionary entry, not a hunt through the prose.
 *
 * WHAT IT PROMISES
 * ----------------
 * • Never crosses an element boundary. It only ever splits a single
 *   text node, so `<strong>peer-to-peer</strong>` inside a sentence is
 *   matched on its own text node, and nothing nests or unbalances.
 * • Never touches links, buttons, code, headings — see SKIP_TAGS.
 * • Idempotent. Marked spans carry `data-gloss`, and the walker skips
 *   any subtree that already has one, so re-running after a locale
 *   change or a scroll-triggered reveal cannot double-wrap.
 * • Fully reversible. `clearGlossary(root)` unwraps every span and
 *   normalises the text nodes back, which is what the off switch does
 *   — no reload, no re-render.
 * • Non-destructive to the framework. The ORIGINAL `Text` node is never
 *   thrown away: it stays in the document holding the first slice of
 *   its own sentence, and the marks and remaining slices are inserted
 *   after it. Svelte keeps direct references to the text nodes it
 *   created so it can later call `set_data()` on them; replacing one
 *   with a fresh node (which is what this file used to do) left that
 *   reference pointing at a detached node, and the next update wrote
 *   into nothing. See `clearGlossary` for the exact reversal.
 * • Layout-safe inside flex and grid. A text node split in place turns
 *   its siblings into flex/grid ITEMS, and whitespace-only anonymous
 *   boxes between items are discarded — so one sentence became several
 *   side-by-side columns with the spaces eaten. Every run is therefore
 *   wrapped in one inline span, so the parent still sees exactly one
 *   child box. Unconditionally, not only when the parent happens to be
 *   flex today, so a later stylesheet change cannot reintroduce the
 *   bug silently.
 *
 * ACCESSIBILITY
 * -------------
 * Each mark is a real <button> with aria-expanded and a description
 * ("Explain: peer-to-peer"), so it is reachable and announced. It is
 * not an <abbr title>: title tooltips are unreachable by keyboard,
 * invisible on touch, and cannot be styled or translated reliably.
 */

import {
	ANNOTATABLE,
	SKIP_TAGS,
	MAX_PER_SECTION,
	MAX_PER_PAGE,
	SECTION_SCOPE,
	GLOSSARY_IDS
} from './terms.js';

/**
 * Word-boundary rules that actually hold for the languages this site
 * ships in. `\b` is Latin-centric and does the wrong thing for Chinese
 * and Japanese, which have no spaces at all, so a term there would
 * never match with `\b` and would over-match without it.
 *
 * The compromise: for scripts that use spaces we require a non-letter
 * on both sides (so "node" does not match inside "nodes'" — well, it
 * does match "nodes" via the plural rule below, but never inside
 * "anode"); for scripts that don't, we match the substring directly,
 * which is correct for them because their terms are whole words by
 * construction.
 */
const SPACELESS = /[\u3000-\u30ff\u4e00-\u9fff\uac00-\ud7af]/;

/**
 * Bookkeeping for the reversal: the node we split, and what it said
 * before we touched it.
 *
 * A WeakMap so a node that Svelte removes for its own reasons — a beat
 * scrolling out, a `{#key}` block remounting — takes its entry with it
 * and nothing here keeps detached DOM alive.
 *
 * @type {WeakMap<Node, { node: Text, text: string, run: HTMLElement }>}
 */
const ORIGINALS = new WeakMap();

/**
 * Delete generated runs that have lost their origin.
 *
 * A run and the text node it came from are siblings, created together.
 * If the framework tears down the surrounding block, it may remove the
 * original node and leave the run behind (see the `{@html}` note in
 * `annotate`) — stale words from the previous language, sitting in the
 * page next to the new ones, accumulating with every switch.
 *
 * The tell is unambiguous and cheap: the run's recorded origin is no
 * longer in the document, or no longer its sibling. Either way the run
 * is debris and the text it holds is a duplicate of something the
 * framework has already re-rendered, so it is removed rather than
 * unwrapped — unwrapping would preserve the duplicate.
 *
 * @param {HTMLElement} root
 */
function sweepOrphans(root) {
	for (const run of root.querySelectorAll('span[data-gloss-run]')) {
		const record = ORIGINALS.get(run);
		if (!record) {
			// No bookkeeping at all: this run cannot be reversed safely and
			// its text is not ours to keep.
			run.remove();
			continue;
		}
		const origin = record.node;
		if (!origin.isConnected || origin.parentNode !== run.parentNode) {
			run.remove();
			ORIGINALS.delete(run);
		}
	}
}

/** Escape a literal for use inside a RegExp. */
function esc(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Build one big alternation over every alias in the active locale.
 *
 * Aliases are sorted longest-first so that "peer-to-peer" wins over
 * "peer", and "virtual machine" over "machine". Without that, the
 * regex engine's left-to-right alternation would happily mark the
 * short one and leave the reader with the wrong definition.
 *
 * @param {Array<{ match?: string[] }>} terms  Dictionary entries, paired with GLOSSARY_IDS.
 * @returns {{ reExact: RegExp|null, reFold: RegExp|null, owner: Map<string, string> } | null}
 */
function buildMatcher(terms) {
	/** alias (lowercased) -> term id */
	const owner = new Map();
	const aliases = [];

	terms.forEach((term, i) => {
		const id = GLOSSARY_IDS[i];
		if (!id || !term || !Array.isArray(term.match)) return;
		for (const raw of term.match) {
			const alias = String(raw || '').trim();
			if (!alias) continue;
			const key = alias.toLowerCase();
			// First writer wins, so an earlier term keeps an alias it
			// shares with a later one rather than silently losing it.
			if (owner.has(key)) continue;
			owner.set(key, id);
			aliases.push(alias);
		}
	});

	if (!aliases.length) return null;

	aliases.sort((a, b) => b.length - a.length);

	/** An alias written entirely in uppercase (BOX, NET, API, ERG) is
	 *  a project token, not an English word. Matching it
	 *  case-insensitively would mark "black box", "a spare box", or
	 *  Turkish "net olmakta" with the wrong definition. Those stay
	 *  exact; everything else still folds case. */
	// Letters only, so P2P (has a digit) still folds case.
	const isAcronym = (a) => /^[A-Z]{2,}$/.test(a);

	const part = (a) => {
		const body = esc(a);
		return SPACELESS.test(a) ? body : `${body}(?:s|es|'s|’s)?`;
	};
	const wrap = (alts) =>
		`(?<![\\p{L}\\p{N}_-])(?:${alts.join('|')})(?![\\p{L}\\p{N}_-])`;

	const exact = aliases.filter(isAcronym).map(part);
	const folded = aliases.filter((a) => !isAcronym(a)).map(part);

	return {
		reExact: exact.length ? new RegExp(wrap(exact), 'gu') : null,
		reFold: folded.length ? new RegExp(wrap(folded), 'giu') : null,
		owner
	};
}

/** Resolve a matched string back to its term id. */
function resolve(owner, matched) {
	const lower = matched.toLowerCase();
	if (owner.has(lower)) return owner.get(lower);
	// Strip the plural/possessive the regex allowed.
	const singular = lower.replace(/(?:'s|’s|es|s)$/, '');
	if (owner.has(singular)) return owner.get(singular);
	// "es" was greedy — try dropping only the "s".
	const lighter = lower.replace(/s$/, '');
	return owner.get(lighter) || null;
}

/** True when this node sits inside something we must not rewrite. */
function isSkippable(node) {
	let el = node.parentElement;
	while (el) {
		if (SKIP_TAGS.has(el.tagName)) return true;
		if (el.dataset && el.dataset.gloss !== undefined) return true;
		if (el.dataset && el.dataset.noGloss !== undefined) return true;
		el = el.parentElement;
	}
	return false;
}

/**
 * Annotate a subtree in place.
 *
 * @param {HTMLElement} root
 * @param {Array<{ match?: string[], title?: string }>} terms  From `$t('glossary.terms')`.
 * @returns {number} how many marks were added.
 */
export function annotate(root, terms) {
	if (!root || !Array.isArray(terms)) return 0;

	const matcher = buildMatcher(terms);
	if (!matcher) return 0;
	const { reExact, reFold, owner } = matcher;

	// Anything the framework orphaned since the last pass goes first, so
	// the budget below counts only marks that are really on the page.
	sweepOrphans(root);

	/*
	 * Budgets are seeded from what is ALREADY marked, not started at
	 * zero.
	 *
	 * This is the whole reason the density cap can be trusted. These
	 * pages reveal prose as you scroll, so annotate() runs many times
	 * per page as new content arrives. A fresh counter each run meant
	 * each pass was independently allowed two of every term, and a long
	 * page ended up with four or six — the exact dotted-underline soup
	 * the cap exists to prevent. Counting the existing marks first makes
	 * the budget a property of the page rather than of the pass.
	 */
	/** term id -> times marked on this page */
	const pageCount = new Map();
	/** section element -> Set of term ids marked inside it */
	const sectionSeen = new Map();

	for (const existing of root.querySelectorAll('button.gloss[data-gloss]')) {
		const id = existing.getAttribute('data-gloss');
		if (!id) continue;
		pageCount.set(id, (pageCount.get(id) || 0) + 1);
		const section = existing.closest(SECTION_SCOPE) || root;
		let set = sectionSeen.get(section);
		if (!set) {
			set = new Set();
			sectionSeen.set(section, set);
		}
		set.add(id);
	}

	let added = 0;

	const blocks = root.querySelectorAll(ANNOTATABLE);

	for (const block of blocks) {
		if (SKIP_TAGS.has(block.tagName)) continue;

		const section = block.closest(SECTION_SCOPE) || root;
		let seen = sectionSeen.get(section);
		if (!seen) {
			seen = new Set();
			sectionSeen.set(section, seen);
		}

		// Snapshot the text nodes first: we are about to replace some of
		// them, and a live TreeWalker would then walk our own output.
		const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
		/** @type {Text[]} */
		const textNodes = [];
		let n;
		while ((n = walker.nextNode())) {
			if (n.nodeValue && n.nodeValue.trim() && !isSkippable(n)) textNodes.push(n);
		}

		for (const textNode of textNodes) {
			const text = textNode.nodeValue;

			/** @type {Array<{ start: number, end: number, id: string, word: string }>} */
			const raw = [];
			for (const re of [reExact, reFold]) {
				if (!re) continue;
				re.lastIndex = 0;
				let m;
				while ((m = re.exec(text))) {
					const id = resolve(owner, m[0]);
					if (!id) continue;
					raw.push({ start: m.index, end: m.index + m[0].length, id, word: m[0] });
				}
			}
			raw.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));

			const hits = [];
			let occupied = -1;
			for (const hit of raw) {
				if (hit.start < occupied) continue;
				if (seen.has(hit.id)) continue;
				if ((pageCount.get(hit.id) || 0) >= MAX_PER_PAGE) continue;
				hits.push(hit);
				occupied = hit.end;
				// Claim the budget immediately, so a term appearing twice
				// in the same paragraph is only marked once.
				seen.add(hit.id);
				pageCount.set(hit.id, (pageCount.get(hit.id) || 0) + 1);
			}

			if (!hits.length) continue;

			const parent = textNode.parentNode;
			if (!parent) continue;

			/*
			 * THE SHAPE OF A SPLIT, AND WHY IT IS THIS SHAPE
			 * ----------------------------------------------
			 * A split leaves exactly two nodes where there was one:
			 *
			 *   [ original Text (leading slice) ][ <span data-gloss-run> ]
			 *
			 * Everything generated — the marks and the text between them —
			 * goes inside that one span. Two separate framework problems
			 * force this, and one layout problem is solved by it for free.
			 *
			 * 1. Svelte keeps a direct reference to each Text node it
			 *    created and later calls `set_data()` on it. Replace that
			 *    node (which this file used to do) and the reference points
			 *    at detached DOM: the next update writes into nothing, and
			 *    the words on screen silently stop changing. So the original
			 *    node is never removed — only its `data` is shortened, and
			 *    `clearGlossary` writes the whole sentence back into it.
			 *
			 * 2. `{@html ...}` records the parsed fragment's first and last
			 *    child as the effect's `nodes_start`/`nodes_end`, and tears
			 *    the block down by walking siblings from start to end.
			 *    Anything outside that pair is never removed. Nodes appended
			 *    after the last one therefore SURVIVE a re-render and the
			 *    next render stacks new content on top of them — which is
			 *    how a language switch left a Spanish heading followed by an
			 *    English paragraph, and why the page grew a little more with
			 *    every switch. It cannot be dodged by picking a side: the
			 *    boundary nodes are not identifiable from out here (a
			 *    "last" text node still has comment anchors after it). It is
			 *    handled instead by (a) clearing synchronously before Svelte
			 *    re-renders — see GlossaryLayer — and (b) `sweepOrphans`
			 *    below, which recognises a run that has been separated from
			 *    its origin and deletes it. Keeping every generated node in
			 *    ONE element is what makes that recognition possible.
			 *
			 * 3. Free consequence: when the paragraph is a flex or grid
			 *    container, its children are flex ITEMS and the whitespace
			 *    boxes between them are discarded — a split sentence became
			 *    side-by-side columns with the spaces eaten. One span means
			 *    the container still sees a single child box.
			 */
			const wrap = document.createElement('span');
			wrap.dataset.glossRun = '';

			let cursor = hits[0].start;
			for (const hit of hits) {
				if (hit.start > cursor) {
					wrap.appendChild(document.createTextNode(text.slice(cursor, hit.start)));
				}
				wrap.appendChild(makeMark(hit.word, hit.id, terms));
				cursor = hit.end;
				added += 1;
			}
			if (cursor < text.length) {
				wrap.appendChild(document.createTextNode(text.slice(cursor)));
			}

			// The original node keeps the leading slice and its identity.
			textNode.nodeValue = text.slice(0, hits[0].start);
			parent.insertBefore(wrap, textNode.nextSibling);

			// Recorded on BOTH nodes: the run needs to find its origin (to
			// know whether it has been orphaned), and the reversal needs to
			// find the run from the mark.
			ORIGINALS.set(wrap, { node: textNode, text, run: wrap });
			ORIGINALS.set(textNode, { node: textNode, text, run: wrap });
		}
	}

	return added;
}

/**
 * One marked word. A button, because it opens something — using a
 * <span> with a click handler would be a lie to assistive tech and
 * unreachable by keyboard.
 */
function makeMark(word, id, terms) {
	const idx = GLOSSARY_IDS.indexOf(id);
	const title = (terms[idx] && terms[idx].title) || word;

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 'gloss';
	btn.dataset.gloss = id;
	btn.textContent = word;
	btn.setAttribute('aria-expanded', 'false');
	// The label is set by the caller's locale-aware wrapper if present;
	// this is the fallback so the button is never unlabelled.
	btn.setAttribute('aria-label', `${word} — ${title}`);
	return btn;
}

/**
 * Undo everything `annotate` did inside `root`, restoring plain text.
 * Used by the off switch and before a locale change re-annotates with
 * a different language's trigger words.
 *
 * The contract that matters here is not "the text looks right again" —
 * it is "the DOM is byte-for-byte what Svelte thinks it is". So the
 * ORIGINAL text node is restored to its original position with its
 * original contents, rather than a fresh node being substituted for
 * it. A fresh node is indistinguishable to the reader and fatal to the
 * framework: Svelte's stored reference would still point at the node
 * we discarded, and the next `set_data()` on it would update a node
 * that is no longer in the document.
 *
 * @param {HTMLElement} root
 */
export function clearGlossary(root) {
	if (!root) return;

	/**
	 * Parents that need `normalize()` afterwards.
	 *
	 * ONLY the fallback paths go in here. `normalize()` merges a run of
	 * adjacent text nodes into the FIRST one and deletes the rest — so
	 * calling it on a parent whose original node we just restored could
	 * delete that very node and reintroduce the bug this function exists
	 * to prevent. The restore path leaves no adjacent text nodes to merge
	 * (the inserted ones are removed and the original holds the whole
	 * sentence again), so it does not need normalising at all.
	 * @type {Set<Node>}
	 */
	const parents = new Set();

	// Debris first: a run whose origin is gone must be deleted, not
	// unwrapped, or its stale words would be merged back into the prose.
	sweepOrphans(root);

	/*
	 * Every surviving run is reversed by putting the whole sentence back
	 * into the ORIGINAL node and deleting the run. One assignment and one
	 * removal per split — no node the framework knows about is created,
	 * moved or destroyed.
	 */
	for (const run of root.querySelectorAll('span[data-gloss-run]')) {
		const parent = run.parentNode;
		if (!parent) continue;
		const record = ORIGINALS.get(run);
		if (record) {
			record.node.nodeValue = record.text;
			ORIGINALS.delete(record.node);
			ORIGINALS.delete(run);
			run.remove();
		} else {
			// Unreachable in practice (the WeakMap entry outlives the run),
			// but never drop words on the floor.
			parent.replaceChild(document.createTextNode(run.textContent || ''), run);
			parents.add(parent);
		}
	}

	// Any mark not inside a run predates this scheme, or was produced by
	// the defensive path above. Unwrap it in place.
	for (const mark of root.querySelectorAll('button.gloss[data-gloss]')) {
		const parent = mark.parentNode;
		if (!parent) continue;
		parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
		parents.add(parent);
	}

	// Merge the adjacent text nodes back together, or a second annotate()
	// pass would see "peer-to-" and "peer" as two nodes and fail to match
	// across them.
	for (const parent of parents) {
		if (parent.isConnected) parent.normalize();
	}
}
