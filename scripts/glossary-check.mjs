/*
 * Checks the plain-language layer across every locale.
 *
 *   node scripts/glossary-check.mjs          # needs `npm run build` first
 *   node scripts/glossary-check.mjs es fr    # only these locales
 *
 * The layer finds its terms in the rendered page, so a translation only
 * works if its `match` list contains the words that locale's copy
 * actually uses. That failure is invisible in the browser — the page
 * looks fine, it just quietly explains nothing — which is exactly the
 * kind of thing seventeen dictionaries will drift into. So this reports,
 * per locale: missing or malformed entries, terms whose `match` finds
 * nothing anywhere on the site, and how many marks each page would get.
 *
 * It reads the prerendered HTML rather than the DOM, so the counts
 * approximate what Glossary.svelte does (prose only, one term per
 * section, two per section, two per page) closely enough to catch a
 * locale that has gone silent or a page that has gone noisy.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildIndex, PER_PAGE, PER_SECTION } from '../src/lib/glossary.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(root, 'build');
const FIELDS = ['term', 'body', 'analogy', 'match'];
const PAGES = ['index', 'depin', 'developers', 'users'];

if (!fs.existsSync(build)) {
	console.error('No build/ directory — run `npm run build` first.');
	process.exit(2);
}

const locales = process.argv.slice(2).length
	? process.argv.slice(2)
	: fs
			.readdirSync(path.join(root, 'src/lib/i18n'))
			.filter((f) => f.endsWith('.js') && f !== 'index.js')
			.map((f) => f.replace(/\.js$/, ''))
			.sort();

/** English defines the set every other locale is measured against. */
const en = (await import(path.join(root, 'src/lib/i18n/en.js'))).default;
const expected = Object.keys(en.glossary?.terms || {});

let problems = 0;
const report = (/** @type {string} */ msg) => {
	problems++;
	console.log(`   ✗ ${msg}`);
};

for (const code of locales) {
	const dict = (await import(path.join(root, `src/lib/i18n/${code}.js`))).default;
	const terms = dict.glossary?.terms;
	console.log(`\n${code}`);

	if (!terms) {
		report('no glossary at all — it will fall back to English');
		continue;
	}
	for (const key of expected) {
		const entry = terms[key];
		if (!entry) {
			report(`missing term "${key}"`);
			continue;
		}
		for (const field of FIELDS) {
			if (!entry[field] || (field === 'match' && !entry.match.length)) {
				report(`"${key}" has no ${field}`);
			}
		}
		// A translation that left the English wording in place is a
		// forgotten entry, not a decision — except where the term is the
		// same word in both (microVM, API, DePIN, Ergo).
		if (entry.body && code !== 'en' && entry.body === en.glossary.terms[key]?.body) {
			report(`"${key}" body is still the English one`);
		}
	}
	for (const key of Object.keys(terms)) {
		if (!expected.includes(key)) report(`extra term "${key}" (not in en.js)`);
	}

	const index = buildIndex(terms);
	if (index.length !== expected.length) {
		report(`only ${index.length}/${expected.length} terms produced a usable pattern`);
	}

	/* How the pages would actually be marked. */
	const found = new Set();
	for (const page of PAGES) {
		const file = path.join(build, code === 'en' ? `${page}.html` : `${code}/${page}.html`);
		const home = path.join(build, code === 'en' ? 'index.html' : `${code}.html`);
		const target = page === 'index' ? home : file;
		if (!fs.existsSync(target)) {
			report(`no prerendered ${page} page at ${path.relative(root, target)}`);
			continue;
		}
		const { marks, words } = simulate(fs.readFileSync(target, 'utf8'), index, found);
		const density = marks ? Math.round(words / marks) : 0;
		const noisy = marks && density < 60;
		console.log(
			`   ${page.padEnd(11)} ${String(marks).padStart(2)} marks` +
				(marks ? `, one per ~${density} words` : '') +
				(noisy ? '   ← dense' : '')
		);
		if (noisy) problems++;
	}

	const silent = expected.filter((k) => !found.has(k));
	if (silent.length) {
		console.log(`   never matched: ${silent.join(', ')}`);
		// Half the glossary going unused means the `match` lists were
		// translated loosely, not that the copy avoids the ideas.
		if (silent.length > expected.length / 2) {
			report(`${silent.length}/${expected.length} terms match nothing — check this locale's \`match\` lists`);
		}
	}
}

console.log(problems ? `\n${problems} problem(s)` : '\nno problems');
process.exit(problems ? 1 : 0);

/**
 * Mark-count approximation over prerendered HTML: prose only, sections
 * split on <section>, same quotas as the real thing.
 *
 * @param {string} html
 * @param {Array<{ key: string, re: RegExp }>} index
 * @param {Set<string>} found terms seen at least once, accumulated across pages
 */
function simulate(html, index, found) {
	const pageCount = new Map();
	let marks = 0;
	const sections = html.split(/<section\b/i).map(proseOf);
	// Whether a term matches at all is asked of the whole page, before
	// the quotas: a term that loses every slot to a higher-priority one
	// is still a working translation.
	for (const { key, re } of index) {
		if (sections.some((s) => re.test(s))) found.add(key);
	}
	for (const prose of sections) {
		let taken = 0;
		for (const { key, re } of index) {
			if (taken >= PER_SECTION) break;
			if (!re.test(prose)) continue;
			if ((pageCount.get(key) || 0) >= PER_PAGE) continue;
			pageCount.set(key, (pageCount.get(key) || 0) + 1);
			taken++;
			marks++;
		}
	}
	return { marks, words: countWords(html) };
}

/**
 * Words, for a density figure that means the same thing in every
 * language. Chinese and Japanese are written without spaces, so
 * splitting on whitespace would report a handful of "words" per page and
 * call every locale dense; their characters are counted at the usual
 * two-per-word instead.
 *
 * @param {string} html
 */
function countWords(html) {
	const text = html.replace(/<[^>]+>/g, ' ');
	const dense = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu;
	const chars = (text.match(dense) || []).length;
	const spaced = text.replace(dense, ' ').split(/\s+/).filter(Boolean).length;
	return spaced + Math.round(chars / 2);
}

/** The running prose of one HTML fragment, links and tags stripped. */
function proseOf(/** @type {string} */ html) {
	return [...html.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
		.map((m) => m[2].replace(/<a\b[\s\S]*?<\/a>/gi, ' ').replace(/<[^>]+>/g, ''))
		.join('   ');
}
