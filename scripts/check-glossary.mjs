#!/usr/bin/env node
/*
 * Does each locale's glossary actually fire on that locale's prose?
 *
 *   node scripts/check-glossary.mjs            # every locale
 *   node scripts/check-glossary.mjs de ja      # just these
 *   node scripts/check-glossary.mjs --verbose  # show every alias hit
 *
 * WHY THIS EXISTS SEPARATELY FROM check-i18n-keys.mjs
 * ---------------------------------------------------
 * `check-i18n-keys.mjs` proves the glossary is SHAPED right. It cannot
 * prove it is USEFUL, and for this namespace those are very different
 * things. A term's `match` array holds the words that trigger it in
 * that language, and those words have to be the words that language's
 * copy actually uses. Translate the definition of "node" perfectly but
 * list the alias as "nodo" on a page whose German prose says "Knoten",
 * and the term is invisible: no error, no fallback, no mark, just a
 * feature that silently does nothing for that reader.
 *
 * A locale is also the only place that can go wrong in the other
 * direction. English aliases left in a non-English list ("service" in
 * the German array) will happily match the English words that survive
 * in product names and code, and open a definition in the wrong
 * register.
 *
 * So this replays the real matcher against the real dictionary:
 *
 *   • builds the same alias regex annotate.js builds, from the same
 *     source, with the same longest-first ordering and the same
 *     spaceless-script rule — so a pass here means the runtime would
 *     have marked it too;
 *   • runs it over every string in the locale that could reach an
 *     ANNOTATABLE element, and reports terms that match NOTHING;
 *   • fails on any alias that collides with another term's alias,
 *     since the longest-first tie-break makes that a coin toss over
 *     which definition the reader gets;
 *   • fails on an alias that is a substring of its own longer alias in
 *     a spaceless script (zh/ja/ko), where there is no word boundary
 *     to separate them.
 *
 * Zero-coverage is a WARNING, not a failure, and deliberately: a term
 * may legitimately not appear in the copy of a page a locale hasn't
 * grown yet, and `MAX_PER_PAGE` means an unused entry costs the reader
 * nothing. Collisions fail, because those actively mislead.
 */
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const dir = resolvePath(here, '../src/lib/i18n');
const { GLOSSARY_IDS } = await import(resolvePath(here, '../src/lib/glossary/terms.js'));

/** Kept byte-identical to annotate.js. */
const SPACELESS = /[\u3000-\u30ff\u4e00-\u9fff\uac00-\ud7af]/;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Same split as annotate.js: all-caps letter aliases are case-exact. */
const isAcronym = (a) => /^[A-Z]{2,}$/.test(a);
function matchAll(aliases, corpus) {
	const sorted = [...aliases].sort((a, b) => b.length - a.length);
	const part = (a) =>
		SPACELESS.test(a) ? esc(a) : `(?<![\\p{L}\\p{N}_-])${esc(a)}(?:s|es|'s|’s)?(?![\\p{L}\\p{N}_-])`;
	const exact = sorted.filter(isAcronym).map(part);
	const folded = sorted.filter((a) => !isAcronym(a)).map(part);
	const found = [];
	for (const [alts, flags] of [
		[exact, 'gu'],
		[folded, 'giu']
	]) {
		if (!alts.length) continue;
		const re = new RegExp(alts.join('|'), flags);
		for (const s of corpus) {
			const hits = s.match(re);
			if (hits) found.push(...hits);
		}
	}
	return found;
}

/** Every string in the dictionary except the glossary itself. */
function prose(node, path = '', out = []) {
	if (typeof node === 'string') {
		if (!path.startsWith('glossary')) out.push(node);
	} else if (Array.isArray(node)) {
		node.forEach((v, i) => prose(v, `${path}.${i}`, out));
	} else if (node && typeof node === 'object') {
		for (const [k, v] of Object.entries(node)) prose(v, path ? `${path}.${k}` : k, out);
	}
	return out;
}

/** Strip inline HTML so a tag name can't be mistaken for a term. */
const text = (s) => s.replace(/<[^>]*>/g, ' ');

const argv = process.argv.slice(2);
const verbose = argv.includes('--verbose');
const requested = argv.filter((a) => !a.startsWith('--'));
const codes = requested.length
	? requested
	: readdirSync(dir)
			.filter((f) => f.endsWith('.js') && f !== 'index.js')
			.map((f) => f.replace(/\.js$/, ''))
			.sort();

let failed = 0;
let warned = 0;

for (const code of codes) {
	const dict = (await import(resolvePath(dir, `${code}.js`))).default;
	const g = dict.glossary;
	if (!g?.terms) {
		console.log(`--   ${code}: no glossary (feature hidden in this locale)`);
		continue;
	}
	if (g.terms.length !== GLOSSARY_IDS.length) {
		console.log(`FAIL ${code}: ${g.terms.length} terms, expected ${GLOSSARY_IDS.length}`);
		failed++;
		continue;
	}

	const corpus = prose(dict).map(text);
	const problems = [];
	const empty = [];
	const seen = new Map(); // lowercased alias -> owning id

	g.terms.forEach((term, i) => {
		const id = GLOSSARY_IDS[i];

		for (const alias of term.match) {
			const key = alias.toLowerCase();
			if (seen.has(key)) problems.push(`alias "${alias}" claimed by both ${seen.get(key)} and ${id}`);
			else seen.set(key, id);
		}
		// In a spaceless script there is no boundary to stop a short alias
		// swallowing a longer one's prefix — "計算" inside "計算資源".
		for (const a of term.match) {
			for (const b of term.match) {
				if (a !== b && SPACELESS.test(a) && b.includes(a) && b.length > a.length) {
					problems.push(`${id}: alias "${a}" shadows "${b}" (no word boundary in this script)`);
				}
			}
		}

		const found = matchAll(term.match, corpus);
		const hits = found.length;
		const examples = found.slice(0, 2);
		if (hits === 0) empty.push(id);
		else if (verbose) console.log(`      ${id}: ${hits}× (${examples.join(', ')})`);
	});

	if (problems.length) failed++;
	else if (empty.length) warned++;

	console.log(
		`${problems.length ? 'FAIL' : empty.length ? 'warn' : 'ok  '} ${code}: ` +
			`${GLOSSARY_IDS.length} terms · ${seen.size} aliases · ` +
			`${GLOSSARY_IDS.length - empty.length}/${GLOSSARY_IDS.length} match the locale's own copy`
	);
	for (const p of problems) console.log(`      COLLISION ${p}`);
	if (empty.length) console.log(`      no hits in this locale's prose: ${empty.join(', ')}`);
}

console.log(
	failed
		? `\n${failed} locale(s) with colliding aliases.`
		: `\nNo alias collisions.${warned ? ` ${warned} locale(s) have terms with no hits (see warn lines).` : ''}`
);
process.exit(failed ? 1 : 0);
