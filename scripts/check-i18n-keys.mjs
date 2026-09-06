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
 *
 * PENDING NAMESPACES (the one deliberate hole)
 * --------------------------------------------
 * A namespace listed in `PENDING` is one that ships in English first
 * and lights up per-language as translations land. It is still
 * reported, so it can never be forgotten, but it does not fail the
 * run.
 *
 * This exists for exactly one reason and should not be extended
 * casually. The glossary is not ordinary copy: its entries include the
 * WORDS that get matched against the prose, so English fallback there
 * is not a degraded experience but a wrong one — the few terms spelled
 * the same in every language (DePIN, microVM, Ergo, gRPC) would get
 * underlined on a Spanish page and open English definitions, which is
 * worse for that reader than having no glossary at all. The runtime
 * therefore gates the whole feature on `$translated('glossary.terms')`
 * and shows nothing until a locale is complete. That makes a partial
 * translation genuinely safe, which is what earns the exception.
 *
 * To retire it: translate `glossary` into a locale, and it moves from
 * PENDING to ok on its own. Once every locale has it, delete the
 * entry from PENDING and the gate is strict again.
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

/**
 * Namespaces that are allowed to be missing from a locale, because the
 * runtime hides the feature entirely rather than falling back to
 * English. See the header for why this is safe here and nowhere else.
 */
const PENDING = ['glossary'];

const isPending = (key) => PENDING.some((ns) => key === ns || key.startsWith(`${ns}.`));

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

	const allMissing = [...enFlat.keys()].filter((k) => !flat.has(k));
	// Split rather than filter, so a pending namespace stays visible in
	// the output instead of quietly disappearing from the report.
	const missing = allMissing.filter((k) => !isPending(k));
	const pending = allMissing.filter(isPending);
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
		`${problems ? 'FAIL' : 'ok  '} ${code}: ${flat.size} keys · missing ${missing.length} · extra ${extra.length} · arraylen ${lenMismatch.length} · identical-to-en ${identical.length}${
			pending.length ? ` · pending ${pending.length}` : ''
		}`
	);
	const show = (label, list) => {
		if (!list.length) return;
		console.log(
			`      ${label}: ${list.slice(0, limit).join(', ')}${list.length > limit ? ` … (+${list.length - limit})` : ''}`
		);
	};
	show('MISSING', missing);
	if (pending.length) {
		console.log(
			`      pending: ${PENDING.join(', ')} not yet translated (feature hidden in this locale — not a failure)`
		);
	}
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
