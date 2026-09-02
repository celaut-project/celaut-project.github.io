#!/usr/bin/env node
/*
 * Structural parity check between en.js and every other locale.
 *
 *   node scripts/check-i18n-keys.mjs            # every locale
 *   node scripts/check-i18n-keys.mjs de id      # just these
 *   node scripts/check-i18n-keys.mjs --verbose  # list every problem key
 *
 * en.js is the source of truth. Every other dictionary must have the
 * SAME key set and the SAME array lengths — components index into these
 * arrays positionally (a scene's beat timings pair with its beats by
 * index), so a locale that is one element short doesn't fall back to
 * English, it renders nothing.
 *
 * Exit code is non-zero when any locale has missing keys, extra keys or
 * an array-length mismatch. `identical-to-en` is reported but never
 * fails the run: a handful of strings (product names, network
 * identifiers, "API") are legitimately the same in every language.
 */
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const dir = resolvePath(here, '../src/lib/i18n');

const en = (await import(resolvePath(dir, 'en.js'))).default;

/** Flatten to `a.b.0.c` -> value, recording array lengths as `a.b[]`. */
function flatten(node, prefix = '', out = new Map()) {
	if (Array.isArray(node)) {
		out.set(`${prefix}[]`, node.length);
		node.forEach((v, i) => flatten(v, `${prefix}.${i}`, out));
	} else if (node && typeof node === 'object') {
		for (const [k, v] of Object.entries(node)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
	} else {
		out.set(prefix, node);
	}
	return out;
}

const enFlat = flatten(en);

const argv = process.argv.slice(2);
const verbose = argv.includes('--verbose');
const requested = argv.filter((a) => !a.startsWith('--'));
const codes = requested.length
	? requested
	: readdirSync(dir)
			.filter((f) => f.endsWith('.js') && f !== 'index.js' && f !== 'en.js')
			.map((f) => f.replace(/\.js$/, ''))
			.sort();

let bad = 0;
const limit = verbose ? Infinity : 25;

for (const code of codes) {
	const mod = await import(resolvePath(dir, `${code}.js`));
	const flat = flatten(mod.default);

	const missing = [...enFlat.keys()].filter((k) => !flat.has(k));
	const extra = [...flat.keys()].filter((k) => !enFlat.has(k));
	const lenMismatch = [...enFlat.keys()]
		.filter((k) => k.endsWith('[]') && flat.has(k) && flat.get(k) !== enFlat.get(k))
		.map((k) => `${k} en=${enFlat.get(k)} ${code}=${flat.get(k)}`);
	// A long English string reproduced verbatim is usually an
	// untranslated block. Short ones ("API", "Ergo") are not.
	const identical = [...enFlat.keys()].filter(
		(k) =>
			!k.endsWith('[]') &&
			typeof enFlat.get(k) === 'string' &&
			enFlat.get(k).length > 24 &&
			flat.get(k) === enFlat.get(k)
	);

	const problems = missing.length + extra.length + lenMismatch.length;
	if (problems) bad++;

	console.log(
		`${problems ? 'FAIL' : 'ok  '} ${code}: ${flat.size} keys · missing ${missing.length} · extra ${extra.length} · arraylen ${lenMismatch.length} · identical-to-en ${identical.length}`
	);
	const show = (label, list) => {
		if (!list.length) return;
		console.log(
			`      ${label}: ${list.slice(0, limit).join(', ')}${list.length > limit ? ` … (+${list.length - limit})` : ''}`
		);
	};
	show('MISSING', missing);
	show('EXTRA', extra);
	show('ARRAYLEN', lenMismatch);
	if (identical.length) show('identical', identical);
}

console.log(
	bad
		? `\n${bad} locale(s) out of parity with en.js.`
		: `\nAll ${codes.length} locale(s) in parity with en.js (${enFlat.size} keys each).`
);

process.exit(bad ? 1 : 0);
