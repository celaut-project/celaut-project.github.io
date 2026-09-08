#!/usr/bin/env node
/*
 * Splice a translated `glossary` namespace into a locale dictionary.
 *
 *   node scripts/apply-glossary.mjs de scripts/glossary-data/de.json
 *   node scripts/apply-glossary.mjs --all          # every json in glossary-data/
 *
 * WHY A SCRIPT AND NOT SEVENTEEN HAND EDITS
 * -----------------------------------------
 * The glossary is the one namespace whose SHAPE is load-bearing at
 * runtime in a way ordinary copy is not. `glossary.terms` is paired
 * positionally with `GLOSSARY_IDS` in src/lib/glossary/terms.js, so an
 * entry inserted in the wrong slot does not render an English word — it
 * renders the WRONG definition, confidently, in the reader's own
 * language. That is a failure no reviewer can see by reading a diff of
 * a language they don't speak.
 *
 * So the ordering is never a translator's responsibility. The JSON is
 * keyed by glossary id (`'peer-to-peer'`, `'node'`, …); this script
 * looks each id up and emits the array in `GLOSSARY_IDS` order. A
 * missing id, an unknown id or a duplicate is a hard error, not a
 * silent shift.
 *
 * The emitted text matches the house style the dictionaries are already
 * written in (tabs, single quotes, double quotes only where the string
 * contains a straight apostrophe), so the result is indistinguishable
 * from a hand-written block and `prettier --check` stays quiet.
 *
 * Idempotent: an existing `glossary: { … }` block in the target file is
 * replaced, so re-running after a translation fix is safe.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath, basename } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const i18nDir = resolvePath(here, '../src/lib/i18n');
const dataDir = resolvePath(here, 'glossary-data');

const { GLOSSARY_IDS } = await import(resolvePath(here, '../src/lib/glossary/terms.js'));
const en = (await import(resolvePath(i18nDir, 'en.js'))).default;

/** Chrome keys, in the order en.js writes them. Everything except `terms`. */
const CHROME = Object.keys(en.glossary).filter((k) => k !== 'terms');
/** Per-term keys, in en.js order. `more` is optional by design. */
const TERM_KEYS = ['match', 'title', 'body', 'more'];

/** Serialise a string the way the hand-written dictionaries do. */
function str(value) {
	if (value.includes("'")) {
		if (value.includes('"')) return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
		return `"${value.replace(/\\/g, '\\\\')}"`;
	}
	return `'${value.replace(/\\/g, '\\\\')}'`;
}

/**
 * Emit the whole `glossary: { … }` member, tab-indented one level in,
 * with no trailing comma (the caller adds it).
 *
 * @param {any} g the translated glossary object, ids not yet ordered
 * @param {string} code locale code, for error messages
 */
function emit(g, code) {
	const L = [];
	const p = (depth, text) => L.push('\t'.repeat(depth) + text);

	p(1, 'glossary: {');
	for (const k of CHROME) {
		if (typeof g[k] !== 'string' || !g[k].trim()) {
			throw new Error(`${code}: glossary.${k} missing or empty`);
		}
		p(2, `${k}: ${str(g[k])},`);
	}

	const byId = g.terms;
	if (!byId || typeof byId !== 'object' || Array.isArray(byId)) {
		throw new Error(`${code}: glossary.terms must be an object keyed by glossary id`);
	}
	const unknown = Object.keys(byId).filter((id) => !GLOSSARY_IDS.includes(id));
	if (unknown.length) throw new Error(`${code}: unknown glossary id(s): ${unknown.join(', ')}`);
	const absent = GLOSSARY_IDS.filter((id) => !byId[id]);
	if (absent.length) throw new Error(`${code}: missing glossary id(s): ${absent.join(', ')}`);

	p(2, 'terms: [');
	GLOSSARY_IDS.forEach((id, i) => {
		const term = byId[id];
		const extra = Object.keys(term).filter((k) => !TERM_KEYS.includes(k));
		if (extra.length) throw new Error(`${code}/${id}: unexpected key(s): ${extra.join(', ')}`);
		if (!Array.isArray(term.match) || !term.match.length) {
			throw new Error(`${code}/${id}: match must be a non-empty array`);
		}
		if (term.match.some((s) => typeof s !== 'string' || !s.trim())) {
			throw new Error(`${code}/${id}: match contains an empty alias`);
		}
		const dupes = term.match.filter(
			(s, n) => term.match.findIndex((o) => o.toLowerCase() === s.toLowerCase()) !== n
		);
		if (dupes.length) throw new Error(`${code}/${id}: duplicate alias(es): ${dupes.join(', ')}`);
		for (const k of ['title', 'body']) {
			if (typeof term[k] !== 'string' || !term[k].trim()) {
				throw new Error(`${code}/${id}: ${k} missing or empty`);
			}
		}
		if ('more' in term && (typeof term.more !== 'string' || !term.more.trim())) {
			throw new Error(`${code}/${id}: more present but empty — omit the key instead`);
		}

		// `// id` so a human scanning a language they don't read can still
		// tell which entry is which, and check it against GLOSSARY_IDS.
		p(3, `{`);
		p(4, `// ${id}`);
		p(4, `match: [${term.match.map(str).join(', ')}],`);
		p(4, `title: ${str(term.title)},`);
		p(4, `body: ${str(term.body)}${term.more ? ',' : ''}`);
		if (term.more) p(4, `more: ${str(term.more)}`);
		p(3, `}${i === GLOSSARY_IDS.length - 1 ? '' : ','}`);
	});
	p(2, ']');
	p(1, '}');
	return L.join('\n');
}

/**
 * Replace or insert the `glossary` member of a dictionary file.
 *
 * Brace-counting rather than a regex: the block contains braces inside
 * strings ("{term}") and nested objects, and a lazy regex would stop at
 * the first of them.
 */
function splice(source, block, code) {
	const start = source.indexOf('\n\tglossary: {');
	if (start === -1) {
		// Insert as the first member, which is where es.js already has it.
		const anchor = source.indexOf('export default {');
		if (anchor === -1) throw new Error(`${code}: no 'export default {' found`);
		const at = anchor + 'export default {'.length;
		return `${source.slice(0, at)}\n${block},${source.slice(at)}`;
	}
	let i = source.indexOf('{', start);
	let depth = 0;
	let inStr = null;
	for (; i < source.length; i++) {
		const c = source[i];
		if (inStr) {
			if (c === '\\') i++;
			else if (c === inStr) inStr = null;
			continue;
		}
		if (c === "'" || c === '"' || c === '`') inStr = c;
		else if (c === '{') depth++;
		else if (c === '}' && --depth === 0) break;
	}
	if (depth !== 0) throw new Error(`${code}: unbalanced braces in existing glossary block`);
	return `${source.slice(0, start + 1)}${block}${source.slice(i + 1)}`;
}

const argv = process.argv.slice(2);
const jobs = argv.includes('--all')
	? readdirSync(dataDir)
			.filter((f) => f.endsWith('.json'))
			.sort()
			.map((f) => [basename(f, '.json'), resolvePath(dataDir, f)])
	: [[argv[0], resolvePath(process.cwd(), argv[1] ?? resolvePath(dataDir, `${argv[0]}.json`))]];

if (!jobs.length || !jobs[0][0]) {
	console.error('usage: apply-glossary.mjs <code> [translations.json]   |   --all');
	process.exit(2);
}

for (const [code, path] of jobs) {
	const target = resolvePath(i18nDir, `${code}.js`);
	const block = emit(JSON.parse(readFileSync(path, 'utf8')), code);
	const before = readFileSync(target, 'utf8');
	const after = splice(before, block, code);
	writeFileSync(target, after);
	const verb = before.includes('\n\tglossary: {') ? 'replaced' : 'inserted';
	console.log(`${code}: ${verb} glossary (${GLOSSARY_IDS.length} terms)`);
}
