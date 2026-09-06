/*
 * The marking engine behind components/Glossary.svelte.
 *
 * Kept out of the component because it is pure DOM work with no Svelte
 * in it — which is also what makes it testable outside a browser
 * (scripts/glossary-check.mjs runs it against the prerendered pages).
 *
 * What it does: walk the rendered page, find the glossary's terms in
 * running prose, and wrap each chosen occurrence in a button the
 * component can attach an explanation to. What it deliberately does not
 * do is mark everything it finds — see the quotas below.
 */

/*
 * Curation. A term is marked at most once per section, no section
 * carries more than two explanations, and no term is offered more than
 * twice on a page. Tuned so a long page lands around one dotted
 * underline every hundred words: help is always within a paragraph, and
 * the page still reads as prose rather than as a textbook.
 */
export const PER_PAGE = 2;
export const PER_SECTION = 2;

/*
 * Which term wins a scarce slot. Ordered by how hard a stop the word is
 * for a reader without the background — not by how technical it sounds.
 * A section that contains both "microVM" and "workload" explains the
 * microVM; "workload" is guessable from context, and a reader who meets
 * it alone still gets it explained.
 *
 * This is editorial judgement, so it lives here, once, rather than
 * being re-decided in each of the seventeen dictionaries. Anything not
 * listed sorts last, so adding a term to `glossary.terms` without
 * touching this file still works.
 */
const PRIORITY = [
	'p2p',
	'compute',
	'microvm',
	'contentAddressed',
	'depin',
	'kernel',
	'deterministic',
	'node',
	'service',
	'container',
	'orchestration',
	'reputation',
	'api',
	'ergo',
	'sla',
	'workload'
];

/** Never mark inside these: display type, interactive things, code. */
const BLOCKED = new Set([
	'A',
	'BUTTON',
	'H1',
	'H2',
	'H3',
	'H4',
	'H5',
	'H6',
	'CODE',
	'PRE',
	'KBD',
	'SAMP',
	'LABEL',
	'TEXTAREA',
	'SELECT',
	'OPTION',
	'CANVAS',
	'SCRIPT',
	'STYLE',
	'SVG'
]);

/** Only these carry running prose; everything else is chrome. */
const PROSE = new Set(['P', 'LI', 'DD']);

/**
 * Which script a form is written in, or null for scripts written
 * without spaces between words.
 *
 * Word boundaries are per-script rather than global, because the two
 * halves of the question differ: "SLA" inside Japanese prose sits flush
 * against kana and must still match, while "SLA" inside English prose
 * must not match "SLAs". Asking only whether the *neighbour* is a
 * letter gets both wrong; asking whether it is a letter of the form's
 * own script gets both right.
 *
 * @param {string} form
 * @returns {string | null}
 */
function scriptOf(form) {
	if (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(form))
		return null;
	if (/\p{Script=Cyrillic}/u.test(form)) return 'Cyrillic';
	if (/\p{Script=Arabic}/u.test(form)) return 'Arabic';
	if (/\p{Script=Devanagari}/u.test(form)) return 'Devanagari';
	return 'Latin';
}

/**
 * One form, as a regex alternative complete with its own boundaries.
 *
 * @param {string} form
 */
function bounded(form) {
	const wild = form.endsWith('*');
	const stem = wild ? form.slice(0, -1) : form;
	const core = pattern(stem) + (wild ? '[\\p{L}\\p{M}]*' : '');
	const script = scriptOf(stem);
	if (!script) return core;
	const edge = `[\\p{Script=${script}}\\p{N}\\p{M}]`;
	return `(?<!${edge})${core}(?!${edge})`;
}

/**
 * One case-insensitive regex per term, matching any of its forms,
 * longest first so "computational resources" wins over "compute" at the
 * same position.
 *
 * A form ending in `*` matches that stem plus any ending — `узл*`,
 * `düğüm*`, `inhaltsadressiert*`. Languages that inflect their nouns
 * would otherwise need a dozen spellings per term, and a forgotten case
 * ending is a term that silently stops explaining itself. Use it only
 * where the stem can't start another word: `compute*` would swallow
 * "computer".
 *
 * Word boundaries count combining marks as part of the word, so a
 * Devanagari or Arabic term is never cut in the middle of a grapheme —
 * "नोड" does not match inside "नोडों", and `नोड*` matches the whole of
 * it.
 *
 * @param {Record<string, { match?: string[] }>} terms `glossary.terms`
 * @returns {Array<{ key: string, re: RegExp }>}
 */
export function buildIndex(terms) {
	if (!terms || typeof terms !== 'object') return [];
	/** @type {Array<{ key: string, re: RegExp }>} */
	const index = [];
	for (const [key, entry] of Object.entries(terms)) {
		const forms = (entry?.match || [])
			.filter((f) => typeof f === 'string' && f.trim())
			.sort((a, b) => b.length - a.length);
		if (!forms.length) continue;
		const alts = forms.map(bounded).join('|');
		try {
			index.push({ key, re: new RegExp(`(?:${alts})`, 'iu') });
		} catch (e) {
			// A locale with a malformed `match` list must not take the page
			// down with it; it just contributes no terms.
		}
	}
	return index.sort((a, b) => rank(a.key) - rank(b.key));
}

/** @param {string} key */
function rank(key) {
	const i = PRIORITY.indexOf(key);
	return i === -1 ? PRIORITY.length : i;
}

/**
 * A form as a regex fragment.
 *
 * Scripts that write vowels as combining marks spell the same word
 * several ways — Arabic "عقدة" is "عُقدة" once voweled — and a `match`
 * list can't be expected to enumerate them. For those, marks are made
 * optional between letters, so one spelling covers the lot.
 *
 * @param {string} s
 */
function pattern(s) {
	const escaped = escapeRe(s);
	if (!MARKED_SCRIPT.test(s)) return escaped;
	return [...s].map(escapeRe).join('\\p{M}*');
}

/** Arabic, Devanagari and Hebrew ranges: scripts that vowel with marks. */
const MARKED_SCRIPT = /[\u0590-\u05ff\u0600-\u06ff\u0900-\u097f]/;

/** @param {string} s */
function escapeRe(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * The section a text node belongs to, or null if the node isn't
 * eligible at all. Eligible means inside running prose and outside
 * everything in BLOCKED — so headings, links, buttons, stats and canvas
 * labels are left alone.
 *
 * @param {Text} node
 * @param {Element} root
 * @returns {Element | null}
 */
function sectionOf(node, root) {
	let el = node.parentElement;
	let prose = false;
	while (el && el !== root.parentElement) {
		if (BLOCKED.has(el.tagName) || el.hasAttribute('data-no-glossary')) return null;
		if (PROSE.has(el.tagName)) prose = true;
		if (el.tagName === 'SECTION' || el.classList.contains('beats')) return prose ? el : null;
		el = el.parentElement;
	}
	return prose ? root : null;
}

/**
 * Find every occurrence worth marking and wrap it.
 *
 * Three passes, because the interesting decision is *which* occurrences
 * to mark and it can't be made one word at a time:
 *
 *   1. collect every candidate — the first hit of each term in each
 *      prose text node;
 *   2. fill each section independently, hardest word first, so a
 *      section offers its two most opaque terms rather than whichever
 *      two happen to appear earliest in it;
 *   3. wrap the winners, back to front within a text node so the
 *      earlier offsets stay valid as it is split.
 *
 * The wrapper keeps the original text node (rather than cloning it), so
 * `unmark` can put the DOM back exactly as Svelte left it.
 *
 * @param {Element} root
 * @param {Array<{ key: string, re: RegExp }>} index in priority order
 * @param {(key: string) => HTMLElement} createMark builds the wrapper
 * @returns {Array<{ btn: HTMLElement, text: Text }>}
 */
export function mark(root, index, createMark) {
	/** @type {Array<{ btn: HTMLElement, text: Text }>} */
	const marks = [];
	if (!index.length) return marks;

	/* 1. Candidates. */
	/** @type {Map<Element, Candidate[]>} in document order. */
	const bySection = new Map();
	prose(root).forEach(({ node, section }, order) => {
		index.forEach(({ key, re }, prio) => {
			const hit = re.exec(node.data);
			if (!hit) return;
			const list = bySection.get(section) ?? [];
			list.push({ node, order, key, prio, at: hit.index, length: hit[0].length });
			bySection.set(section, list);
		});
	});

	/* 2. Selection. */
	/** @type {Map<string, number>} term -> times chosen on this page. */
	const pageCount = new Map();
	/** @type {Map<Text, Candidate[]>} */
	const byNode = new Map();
	for (const list of bySection.values()) {
		list.sort((a, b) => a.prio - b.prio || a.order - b.order || a.at - b.at);
		/** @type {Set<string>} */
		const taken = new Set();
		for (const c of list) {
			if (taken.size >= PER_SECTION) break;
			if (taken.has(c.key)) continue;
			if ((pageCount.get(c.key) || 0) >= PER_PAGE) continue;
			const siblings = byNode.get(c.node) ?? [];
			// Two terms can both match the same words ("compute" inside
			// "computational resources"); the higher-priority one is
			// already placed, so the other is dropped rather than nested.
			if (siblings.some((o) => c.at < o.at + o.length && o.at < c.at + c.length)) continue;
			taken.add(c.key);
			pageCount.set(c.key, (pageCount.get(c.key) || 0) + 1);
			siblings.push(c);
			byNode.set(c.node, siblings);
		}
	}

	/* 3. Wrapping. */
	for (const [node, list] of byNode) {
		list.sort((a, b) => b.at - a.at);
		for (const c of list) {
			const target = node.splitText(c.at);
			target.splitText(c.length);
			const btn = createMark(c.key);
			target.replaceWith(btn);
			btn.appendChild(target);
			marks.push({ btn, text: target });
		}
	}
	// Back to document order, so callers can rely on marks[0] being the
	// first term on the page.
	marks.sort((a, b) => (a.btn.compareDocumentPosition(b.btn) & 4 ? -1 : 1));
	return marks;
}

/**
 * @typedef {{ node: Text, order: number, key: string, prio: number, at: number, length: number }} Candidate
 */

/**
 * Every text node of the page that is running prose, paired with the
 * section it belongs to.
 *
 * @param {Element} root
 * @returns {Array<{ node: Text, section: Element }>}
 */
function prose(root) {
	/** @type {Array<{ node: Text, section: Element }>} */
	const nodes = [];
	const walker = root.ownerDocument.createTreeWalker(root, 4 /* SHOW_TEXT */, {
		acceptNode(node) {
			const data = /** @type {Text} */ (node).data;
			// 3 is the shortest form worth looking for ("API", "ERG").
			return data && data.length > 2 && /\S/.test(data) ? 1 : 2;
		}
	});
	while (walker.nextNode()) {
		const node = /** @type {Text} */ (walker.currentNode);
		const section = sectionOf(node, root);
		if (section) nodes.push({ node, section });
	}
	return nodes;
}

/**
 * Put every marked term back to plain text.
 *
 * `normalize()` re-merges the fragments `splitText` created back into
 * the original node — the one Svelte holds a reference to and may later
 * write into. Without it, a locale switch would write the new sentence
 * into a stranded fragment and leave the old words on screen.
 *
 * @param {Array<{ btn: HTMLElement, text: Text }>} marks
 */
export function unmark(marks) {
	for (const { btn, text } of marks) {
		const parent = btn.parentNode;
		if (!parent) continue;
		btn.replaceWith(text);
		parent.normalize();
	}
}
