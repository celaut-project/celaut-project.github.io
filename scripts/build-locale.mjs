/*
 * Generate a locale dictionary from en.js's structure plus a flat map of
 * translations, so a new language can never drift out of shape.
 *
 *   node scripts/build-locale.mjs de scripts/locale-data/de.json
 *
 * The JSON is `{ "__header__": "...", "home.atoms.heading": "…", … }`
 * keyed by the same dotted paths `scripts/check-i18n-keys.mjs` reports.
 * Anything absent falls through to the English string, and the script
 * lists what it fell through on so nothing is silently untranslated.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const i18n = resolvePath(here, '../src/lib/i18n');

const [code, dataPath] = process.argv.slice(2);
if (!code || !dataPath) {
	console.error('usage: build-locale.mjs <code> <translations.json>');
	process.exit(2);
}

const en = (await import(resolvePath(i18n, 'en.js'))).default;
const data = JSON.parse(readFileSync(resolvePath(process.cwd(), dataPath), 'utf8'));
const header = data.__header__;
delete data.__header__;

const missed = [];
const unused = new Set(Object.keys(data));

/** Serialise a JS string the way the hand-written dictionaries do:
 *  single quotes normally, double quotes when the text contains a
 *  straight apostrophe (typographic ’ needs no escaping). */
function str(value) {
	if (value.includes("'")) {
		if (value.includes('"')) return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
		return `"${value.replace(/\\/g, '\\\\')}"`;
	}
	return `'${value.replace(/\\/g, '\\\\')}'`;
}

/** A bare key if it's a valid identifier, else quoted (e.g. 'service-spec'). */
const key = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : `'${k}'`);

function emit(node, path, depth) {
	const pad = '\t'.repeat(depth);
	const inner = '\t'.repeat(depth + 1);

	if (node === null || typeof node === 'boolean' || typeof node === 'number') {
		return String(node);
	}
	if (typeof node === 'string') {
		const translated = Object.prototype.hasOwnProperty.call(data, path);
		if (translated) unused.delete(path);
		else missed.push(path);
		return str(translated ? data[path] : node);
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

console.log(`wrote src/lib/i18n/${code}.js`);
if (missed.length) console.log(`  fell back to English (${missed.length}): ${missed.join(', ')}`);
if (unused.size) console.log(`  UNUSED keys in JSON (${unused.size}): ${[...unused].join(', ')}`);
