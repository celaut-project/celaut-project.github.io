#!/usr/bin/env node
/*
 * Re-shape every locale dictionary to match en.js, one-off.
 *
 *   node scripts/migrate-locales.mjs            # every locale
 *   node scripts/migrate-locales.mjs es ar      # just these
 *
 * WHY THIS EXISTS
 * ---------------
 * A structural edit to en.js (a section renamed, a block moved to a
 * different page, a key set restructured) has to land identically in
 * sixteen other dictionaries, and hand-editing sixteen files is how
 * they drift. This walks en.js as the shape and resolves each leaf, in
 * order:
 *
 *   1. `scripts/locale-new/<code>.json`  — new/changed strings, written
 *      by hand for this migration. Keyed by the same dotted paths
 *      `check-i18n-keys.mjs` reports.
 *   2. MOVES — a key that is the same sentence at a new path. Copied
 *      from the locale's OLD dictionary, so an existing translation
 *      survives a reorganisation instead of being retranslated.
 *   3. The same path in the old dictionary — the ordinary case, an
 *      untouched string.
 *   4. English, reported loudly, because that is a hole.
 *
 * Output is written back over `src/lib/i18n/<code>.js`, preserving the
 * file's hand-written header comment.
 */
import { readFileSync, existsSync } from 'node:fs';
import { writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const i18n = resolvePath(here, '../src/lib/i18n');
const newData = resolvePath(here, 'locale-new');

/*
 * Paths whose sentence did not change, only its home. Left side is the
 * NEW path in en.js, right side is where that string used to live in
 * each locale. Everything not listed keeps its own path.
 */
const MOVES = {
	// The section-index chrome is shared by four pages now, so it moved
	// out of the landing page's namespace.
	'common.toc.nav': 'home.index.nav',
	'common.toc.title': 'home.index.title',
	'common.toc.open': 'home.index.open',
	'common.toc.close': 'home.index.close',

	// "Nodes: the foundation of the network" moved to /depin, where the
	// whole page is about running one. The four responsibilities are the
	// same four sentences.
	'depin.responsibilities.items.0.title': 'home.nodes.jobs.0.title',
	'depin.responsibilities.items.0.body': 'home.nodes.jobs.0.body',
	'depin.responsibilities.items.1.title': 'home.nodes.jobs.1.title',
	'depin.responsibilities.items.1.body': 'home.nodes.jobs.1.body',
	'depin.responsibilities.items.2.title': 'home.nodes.jobs.2.title',
	'depin.responsibilities.items.2.body': 'home.nodes.jobs.2.body',
	'depin.responsibilities.items.3.title': 'home.nodes.jobs.3.title',
	'depin.responsibilities.items.3.body': 'home.nodes.jobs.3.body',

	// "Service distribution" moved to /developers.
	'developers.distribution.items.0.body': 'home.distribution.items.0.body',
	'developers.distribution.items.1.body': 'home.distribution.items.1.body',

	// Applications regrouped by distance from the architecture rather
	// than by authorship. The project descriptions themselves are the
	// same text; only their grouping and framing changed.
	'home.applications.layer.0.name': 'home.applications.ours.0.name',
	'home.applications.layer.1.name': 'home.applications.ours.1.name',
	'home.applications.builtOn.name': 'home.applications.thirdParty.name',
	'home.applications.builtOn.body.0': 'home.applications.thirdParty.body.0',
	'home.applications.builtOn.body.1': 'home.applications.thirdParty.body.1',

	// The implementation names are proper nouns either way.
	'home.implementations.items.0.name': 'home.nodes.implementations.0.name',
	'home.implementations.items.1.name': 'home.nodes.implementations.1.name'
};

/*
 * Leaves that are identifiers rather than prose, and are therefore
 * correctly identical in every language. Taking the English value for
 * these is the right answer, not a hole, so they are not reported.
 *
 * `viz.home.nets*` are network names a specification can declare
 * ("bitcoin-mainnet", "api.weather.gov"). They were never present in
 * any non-English dictionary — every locale was silently falling
 * through to English at runtime. Materialising them here closes that
 * pre-existing parity gap and leaves each locale free to substitute a
 * local example in the private-network slot later.
 */
const IDENTIFIER_PREFIXES = ['viz.home.nets.', 'viz.home.netsCompact.'];
const isIdentifier = (path) => IDENTIFIER_PREFIXES.some((p) => path.startsWith(p));

const en = (await import(resolvePath(i18n, 'en.js'))).default;

/** Walk a dotted path. */
const get = (obj, path) =>
	path.split('.').reduce((n, p) => (n === null || n === undefined ? undefined : n[p]), obj);

/** Serialise a string the way the hand-written dictionaries do. */
function str(value) {
	if (value.includes("'")) {
		if (value.includes('"')) return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
		return `"${value.replace(/\\/g, '\\\\')}"`;
	}
	return `'${value.replace(/\\/g, '\\\\')}'`;
}

/** A bare key if it's a valid identifier, else quoted ('service-spec'). */
const key = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : `'${k}'`);

const requested = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const codes = requested.length
	? requested
	: readdirSync(i18n)
			.filter((f) => f.endsWith('.js') && f !== 'index.js' && f !== 'en.js')
			.map((f) => f.replace(/\.js$/, ''))
			.sort();

let anyHoles = 0;

for (const code of codes) {
	const oldDict = (await import(`${resolvePath(i18n, `${code}.js`)}?v=${Date.now()}`)).default;
	const overridePath = resolvePath(newData, `${code}.json`);
	const overrides = existsSync(overridePath)
		? JSON.parse(readFileSync(overridePath, 'utf8'))
		: {};

	// Preserve the file's own header comment block verbatim.
	const source = readFileSync(resolvePath(i18n, `${code}.js`), 'utf8');
	const headerEnd = source.indexOf('export default');
	const header = source.slice(0, headerEnd).trimEnd();

	const holes = [];
	const unusedOverrides = new Set(Object.keys(overrides));

	function emit(node, path, depth) {
		const pad = '\t'.repeat(depth);
		const inner = '\t'.repeat(depth + 1);

		if (node === null || typeof node === 'boolean' || typeof node === 'number') {
			return String(node);
		}
		if (typeof node === 'string') {
			if (Object.prototype.hasOwnProperty.call(overrides, path)) {
				unusedOverrides.delete(path);
				return str(overrides[path]);
			}
			const movedFrom = MOVES[path];
			if (movedFrom) {
				const moved = get(oldDict, movedFrom);
				if (typeof moved === 'string') return str(moved);
			}
			const kept = get(oldDict, path);
			if (typeof kept === 'string') return str(kept);
			if (!isIdentifier(path)) holes.push(path);
			return str(node);
		}
		if (Array.isArray(node)) {
			if (!node.length) return '[]';
			const parts = node.map((v, i) => inner + emit(v, `${path}.${i}`, depth + 1));
			return `[\n${parts.join(',\n')}\n${pad}]`;
		}
		const parts = Object.entries(node).map(
			([k, v]) => `${inner}${key(k)}: ${emit(v, path ? `${path}.${k}` : k, depth + 1)}`
		);
		return `{\n${parts.join(',\n')}\n${pad}}`;
	}

	const body = emit(en, '', 0);
	writeFileSync(resolvePath(i18n, `${code}.js`), `${header}\n\nexport default ${body};\n`);

	const mark = holes.length ? 'HOLES' : 'ok   ';
	console.log(`${mark} ${code}: ${holes.length} fell back to English`);
	if (holes.length) {
		anyHoles++;
		console.log(`      ${holes.join('\n      ')}`);
	}
	if (unusedOverrides.size) {
		console.log(`      UNUSED override keys: ${[...unusedOverrides].join(', ')}`);
	}
}

process.exit(anyHoles ? 1 : 0);
