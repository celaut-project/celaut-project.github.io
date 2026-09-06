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
 * @returns {{ re: RegExp, owner: Map<string, string> } | null}
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

	const parts = aliases.map((a) => {
		const body = esc(a);
		// A trailing plural/possessive is part of the match for
		// space-separated scripts, so "nodes" and "services" are marked
		// too, and the popover still resolves to the singular term.
		return SPACELESS.test(a) ? body : `${body}(?:s|es|'s|’s)?`;
	});

	// Lookaround rather than \b: \b treats an accented letter as a
	// boundary, which would let "nodo" match inside "nodos" in the
	// wrong place for several of the locales here.
	const re = new RegExp(`(?<![\\p{L}\\p{N}_-])(?:${parts.join('|')})(?![\\p{L}\\p{N}_-])`, 'giu');

	return { re, owner };
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
	const { re, owner } = matcher;

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
			re.lastIndex = 0;

			/** @type {Array<{ start: number, end: number, id: string, word: string }>} */
			const hits = [];
			let m;
			while ((m = re.exec(text))) {
				const id = resolve(owner, m[0]);
				if (!id) continue;
				if (seen.has(id)) continue;
				if ((pageCount.get(id) || 0) >= MAX_PER_PAGE) continue;

				hits.push({ start: m.index, end: m.index + m[0].length, id, word: m[0] });
				// Claim the budget immediately, so a term appearing twice
				// in the same paragraph is only marked once.
				seen.add(id);
				pageCount.set(id, (pageCount.get(id) || 0) + 1);
			}

			if (!hits.length) continue;

			const frag = document.createDocumentFragment();
			let cursor = 0;
			for (const hit of hits) {
				if (hit.start > cursor) {
					frag.appendChild(document.createTextNode(text.slice(cursor, hit.start)));
				}
				frag.appendChild(makeMark(hit.word, hit.id, terms));
				cursor = hit.end;
				added += 1;
			}
			if (cursor < text.length) {
				frag.appendChild(document.createTextNode(text.slice(cursor)));
			}

			textNode.parentNode?.replaceChild(frag, textNode);
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
 * @param {HTMLElement} root
 */
export function clearGlossary(root) {
	if (!root) return;
	const marks = root.querySelectorAll('button.gloss[data-gloss]');
	/** @type {Set<Node>} */
	const parents = new Set();
	for (const mark of marks) {
		const parent = mark.parentNode;
		if (!parent) continue;
		parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
		parents.add(parent);
	}
	// Merge the adjacent text nodes we just created back together, or a
	// second annotate() pass would see "peer-to-" and "peer" as two
	// nodes and fail to match across them.
	for (const parent of parents) parent.normalize();
}
