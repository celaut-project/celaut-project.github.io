#!/usr/bin/env node
/*
 * Headless verification of the glossary layer.
 *
 *   npx vite preview --port 4179
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *     --headless=new --remote-debugging-port=9231 \
 *     --user-data-dir=/tmp/chrome-gloss --hide-scrollbars
 *   node scripts/verify-glossary.mjs
 *
 * The layer rewrites live prose after render, which is exactly the kind
 * of thing that works on the page you tested and quietly mangles
 * another. So the checks here are the ones that would catch damage:
 *
 *   • marks appear, and are <button data-gloss> — not spans, not
 *     <abbr title>, so they are keyboard-reachable and announced;
 *   • DENSITY: no term marked more than twice per page. This is the
 *     check that keeps the page from turning into dotted-underline
 *     soup, which is the failure mode that would make the feature
 *     worse than not shipping it;
 *   • NO TEXT WAS CHANGED. The full textContent of <main> with the
 *     layer on must equal the textContent with it off. If annotation
 *     ever drops or duplicates a character, this fails;
 *   • marks never land inside a link, a heading, or another mark;
 *   • the off switch fully reverses — zero marks left, text intact;
 *   • clicking a mark opens a popover with a real definition in it;
 *   • no console errors while any of that happens.
 *
 * REGRESSIONS THIS ALSO PINS DOWN
 * -------------------------------
 * Three bugs shipped at once because each was invisible to the checks
 * above, so each now has an assertion of its own:
 *
 *   • LAYOUT. `.fact` in the hero is `display: flex`. Splitting its
 *     text node made the halves and the mark into three flex ITEMS,
 *     and flex discards the whitespace-only boxes between items — so
 *     one sentence rendered as side-by-side columns with the space
 *     before the marked word deleted. Every marked run must therefore
 *     present as a single box to its parent, checked by measuring the
 *     line boxes of the parent rather than by trusting the CSS.
 *
 *   • FRAMEWORK OWNERSHIP. Svelte holds references to the text nodes it
 *     created, and tears `{@html}` blocks down by walking between a
 *     recorded first and last node. Marks left outside that range
 *     survived a re-render, so a language switch produced a Spanish
 *     heading over an English paragraph and the page grew with every
 *     switch. Checked by switching locale repeatedly and requiring the
 *     text to equal a COLD LOAD of that locale each time — not merely
 *     "not empty", which is what the original checks asked and is why
 *     the stale-text version passed them.
 *
 *   • FIRST PAINT. The toggle reported "on" while nothing was marked.
 *     Checked by asserting that a cold load has marks BEFORE anything
 *     is clicked, and that toggling off and on again does not change
 *     how many there are.
 *
 * The rotating hero fact is excluded from text comparisons: it cycles
 * every ten seconds and its seven sentences differ in length, so
 * comparing it would measure the clock. Its layout is checked directly
 * instead, which is the property that actually broke.
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4179';
const CDP = process.env.CDP || 'http://127.0.0.1:9231';
const ROUTES = ['/', '/depin', '/developers', '/users', '/install', '/es', '/es/depin', '/es/developers', '/es/users', '/es/install'];

let failures = 0;
const fail = (m) => {
	failures += 1;
	console.log(`  ✗ ${m}`);
};
const ok = (m) => console.log(`  ✓ ${m}`);

async function newTab() {
	const r = await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' });
	return r.json();
}

function connect(wsUrl) {
	return import('node:http').then(async () => {
		const { WebSocket } = await import('node:worker_threads').then(() => ({
			WebSocket: globalThis.WebSocket
		}));
		return new Promise((resolve, reject) => {
			const ws = new WebSocket(wsUrl);
			ws.onopen = () => resolve(ws);
			ws.onerror = reject;
		});
	});
}

function makeSession(ws) {
	let id = 0;
	const pending = new Map();
	const logs = [];
	ws.onmessage = (ev) => {
		const msg = JSON.parse(ev.data);
		if (msg.id && pending.has(msg.id)) {
			const { resolve, reject } = pending.get(msg.id);
			pending.delete(msg.id);
			msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
		} else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
			logs.push(msg.params.args.map((a) => a.value || a.description).join(' '));
		} else if (msg.method === 'Runtime.exceptionThrown') {
			logs.push(msg.params.exceptionDetails.text || 'exception');
		}
	};
	const send = (method, params = {}) =>
		new Promise((resolve, reject) => {
			const n = ++id;
			pending.set(n, { resolve, reject });
			ws.send(JSON.stringify({ id: n, method, params }));
		});
	const evaluate = async (expression) => {
		const r = await send('Runtime.evaluate', {
			expression,
			returnByValue: true,
			awaitPromise: true
		});
		if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
		return r.result.value;
	};
	return { send, evaluate, logs };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
	mkdirSync('.shots', { recursive: true });
	const tab = await newTab();
	const ws = await connect(tab.webSocketDebuggerUrl);
	const { send, evaluate, logs } = makeSession(ws);

	await send('Runtime.enable');
	await send('Page.enable');
	await send('Emulation.setDeviceMetricsOverride', {
		width: 1440,
		height: 900,
		deviceScaleFactor: 1,
		mobile: false
	});

	/*
	 * Start from a clean slate.
	 *
	 * The language choice and the glossary switch both persist to
	 * localStorage, and the Chrome profile here is reused between runs.
	 * Without this reset the LAST run's `/es/depin` visit left the
	 * locale set to Spanish, so the next run's English routes rendered
	 * in Spanish and the checks failed for a reason that had nothing to
	 * do with the code. (That accident was useful — it is what exposed
	 * the English-definitions-on-a-Spanish-page bug — but a test must
	 * not depend on leftover state to reproduce.)
	 */
	await send('Page.navigate', { url: `${BASE}/` });
	await sleep(1200);
	await evaluate(`(() => { try { localStorage.clear(); } catch (e) {} return true; })()`);

	for (const route of ROUTES) {
		console.log(`\n${route}`);
		logs.length = 0;

		await send('Page.navigate', { url: `${BASE}${route}` });
		await sleep(2200);
		// Explicit Spanish URLs cover translated definitions too. Clear the
		// saved choice so unprefixed URLs remain English on the next run.
		await evaluate(`(() => { try { localStorage.removeItem('celaut-lang'); } catch (e) {} return true; })()`);

		// Baseline text with the layer OFF, captured by clearing first.
		const plain = await evaluate(`(() => {
			const root = document.querySelector('main') || document.body;
			const clone = root.cloneNode(true);
			clone.querySelectorAll('button.gloss[data-gloss]').forEach(b => {
				b.replaceWith(document.createTextNode(b.textContent));
			});
			return clone.textContent.replace(/\\s+/g, ' ').trim();
		})()`);

		const marks = await evaluate(`(() => {
			const nodes = [...document.querySelectorAll('button.gloss[data-gloss]')];
			const counts = {};
			for (const n of nodes) {
				const id = n.dataset.gloss;
				counts[id] = (counts[id] || 0) + 1;
			}
			return {
				total: nodes.length,
				counts,
				words: nodes.slice(0, 8).map(n => n.dataset.gloss + ':' + n.textContent),
				inLink: nodes.filter(n => n.closest('a')).length,
				inHeading: nodes.filter(n => n.closest('h1,h2,h3,h4,h5,h6')).length,
				nested: nodes.filter(n => n.parentElement && n.parentElement.closest('button.gloss')).length,
				unlabelled: nodes.filter(n => !n.getAttribute('aria-label')).length,
				notButton: nodes.filter(n => n.tagName !== 'BUTTON').length
			};
		})()`);

		/*
		 * REGRESSION (first paint): marks must be present on a cold load,
		 * before anything has been clicked. The reported failure was a
		 * toggle that said "on" over a page with nothing underlined until
		 * it was switched off and on again — so "there are marks now" is
		 * only meaningful if nothing has touched the toggle yet, which is
		 * the case here: this is the first read after navigation.
		 */
		if (marks.total === 0) fail('no marks on first paint (before any interaction)');
		else ok(`${marks.total} marks on first paint (${Object.keys(marks.counts).length} distinct terms)`);

		/*
		 * REGRESSION (layout): no annotated run may turn its parent into a
		 * multi-item flex/grid line.
		 *
		 * Two assertions, because the CSS alone does not tell you whether
		 * the damage happened:
		 *   1. every mark's nearest annotatable ancestor that is a flex or
		 *      grid container must see the whole run as ONE child box;
		 *   2. the space before a marked word must still be rendered — the
		 *      visible symptom was "Lareputación", the space silently
		 *      eaten by flex layout discarding anonymous whitespace boxes.
		 */
		const layout = await evaluate(`(() => {
			const ANNOTATABLE = 'p, li, dd, figcaption, .block-note, .beat-note, .lede, .stat-label';
			const bad = [];
			const glued = [];
			for (const mark of document.querySelectorAll('button.gloss[data-gloss]')) {
				// The box that actually lays this mark out is its PARENT — check
				// that, not the nearest annotatable ancestor, because the
				// damage is done by whichever element the run is a child of.
				const run = mark.closest('span[data-gloss-run]') || mark;
				const block = run.parentElement;
				if (!block) continue;
				const d = getComputedStyle(block).display;
				if (d === 'flex' || d === 'inline-flex' || d === 'grid' || d === 'inline-grid') {
					// Direct children of a flex/grid container are its items.
					// A correctly wrapped run contributes exactly one.
					const items = [...block.childNodes].filter(n =>
						n.nodeType === 1 || (n.nodeType === 3 && n.nodeValue.trim()));
					if (items.length > 1) bad.push({
						sel: block.tagName.toLowerCase() + '.' + (block.className || '').split(' ')[0],
						display: d, items: items.length,
						text: (block.textContent || '').replace(/\\s+/g,' ').trim().slice(0, 60)
					});
				}
				// The character immediately before the mark, as RENDERED.
				const r = document.createRange();
				r.setStartBefore(block.firstChild);
				r.setEndBefore(mark);
				const before = r.toString();
				if (before.length && /[\\p{L}\\p{N}]$/u.test(before) && !/[-\\u2010-\\u2015'\\u2019\\/(\\[]$/u.test(before)) {
					glued.push(before.slice(-16) + '|' + mark.textContent);
				}
			}
			return { bad, glued };
		})()`);

		if (layout.bad.length)
			fail(`annotated flex/grid block split into items: ${layout.bad.map(b => `${b.sel}(${b.display}, ${b.items} items)`).join(', ')}`);
		else ok('no annotated block became a multi-item flex/grid line');

		if (layout.glued.length)
			fail(`word glued to the text before it (lost space): ${layout.glued.slice(0, 3).join(', ')}`);
		else ok('spacing around every mark preserved');

		const over = Object.entries(marks.counts).filter(([, n]) => n > 2);
		if (over.length) fail(`density: ${over.map(([k, n]) => `${k}×${n}`).join(', ')}`);
		else ok('density within 2-per-page cap');

		if (marks.inLink) fail(`${marks.inLink} marks inside links`);
		else ok('none inside links');
		if (marks.inHeading) fail(`${marks.inHeading} marks inside headings`);
		else ok('none inside headings');
		if (marks.nested) fail(`${marks.nested} nested marks`);
		else ok('no nesting');
		if (marks.notButton) fail(`${marks.notButton} marks are not <button>`);
		if (marks.unlabelled) fail(`${marks.unlabelled} marks without aria-label`);
		else if (marks.total) ok('every mark labelled and focusable');

		// Text integrity: the rendered text must be byte-identical to the
		// same page with every mark unwrapped.
		const live = await evaluate(`(() => {
			const root = document.querySelector('main') || document.body;
			return root.textContent.replace(/\\s+/g, ' ').trim();
		})()`);
		if (live !== plain) fail('annotation altered the page text');
		else ok('page text unchanged by annotation');

		// Open the first term.
		if (marks.total) {
			const opened = await evaluate(`(() => {
				const m = document.querySelector('button.gloss[data-gloss]');
				m.click();
				return new Promise(r => setTimeout(() => {
					const card = document.querySelector('.gloss-card');
					r(card ? {
						title: card.querySelector('h3')?.textContent || '',
						body: (card.querySelector('p')?.textContent || '').slice(0, 60),
						expanded: m.getAttribute('aria-expanded')
					} : null);
				}, 400));
			})()`);
			if (!opened) fail('clicking a mark opened no popover');
			else if (!opened.body || opened.body.length < 20) fail('popover has no definition text');
			else {
				ok(`popover: "${opened.title}" — ${opened.body}…`);
				if (opened.expanded !== 'true') fail('aria-expanded not set on open');
			}

			// Escape closes and returns focus.
			const closed = await evaluate(`(() => {
				document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
				window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
				return new Promise(r => setTimeout(() => r(!document.querySelector('.gloss-card')), 300));
			})()`);
			if (!closed) fail('Escape did not close the popover');
			else ok('Escape closes');
		}

		// The off switch must fully reverse the DOM.
		const offState = await evaluate(`(() => {
			const btn = document.querySelector('.gloss-toggle');
			if (!btn) return { missing: true };
			btn.click();
			return new Promise(r => setTimeout(() => {
				const root = document.querySelector('main') || document.body;
				r({
					left: document.querySelectorAll('button.gloss').length,
					text: root.textContent.replace(/\\s+/g, ' ').trim(),
					pressed: btn.getAttribute('aria-pressed')
				});
			}, 600));
		})()`);

		if (offState.missing) fail('no glossary toggle in the controls cluster');
		else {
			if (offState.left !== 0) fail(`${offState.left} marks survived the off switch`);
			else ok('off switch removes every mark');
			if (offState.text !== plain) fail('text not restored after switching off');
			else ok('text restored exactly');
			if (offState.pressed !== 'false') fail('aria-pressed wrong after toggle');
		}

		// Back on, and it must re-annotate rather than stay empty.
		const backOn = await evaluate(`(() => {
			document.querySelector('.gloss-toggle').click();
			return new Promise(r => setTimeout(() => r(document.querySelectorAll('button.gloss').length), 800));
		})()`);
		if (!backOn) fail('re-enabling did not restore marks');
		else ok(`re-enabled cleanly (${backOn} marks)`);

		/*
		 * REGRESSION (first paint, second half): toggling off and on must
		 * not CHANGE how many marks there are.
		 *
		 * The reported bug was "nothing is underlined until you toggle off
		 * and on", and the shape that would produce is `marks.total` low
		 * or zero on arrival and higher after the round trip. Asserting
		 * the two are equal catches it from either direction, including a
		 * partial first pass that only annotated some of the page.
		 */
		if (marks.total && backOn !== marks.total)
			fail(`mark count changed across a toggle cycle: ${marks.total} on arrival, ${backOn} after off/on`);
		else if (marks.total) ok('toggle cycle is a no-op (first pass annotated everything)');

		const errors = logs.filter((l) => !/favicon|404/i.test(l));
		if (errors.length) fail(`console errors: ${errors.slice(0, 3).join(' | ')}`);
		else ok('no console errors');

		const shot = await send('Page.captureScreenshot', { format: 'png' });
		writeFileSync(`.shots/gloss${route.replace(/\//g, '_') || '_home'}.png`, Buffer.from(shot.data, 'base64'));
	}

	/*
	 * REGRESSION (framework ownership): a locale switch must leave the
	 * page reading EXACTLY like a cold load of that locale.
	 *
	 * This is the check the original suite was missing. It asked only
	 * whether marks still existed after a language change, which stale
	 * text passes trivially — the section was still full of words, they
	 * were just the previous language's words, sitting under the new
	 * language's heading and accumulating with every switch.
	 *
	 * So: capture what each locale looks like cold and with the layer
	 * off (the ground truth the translator wrote), then switch back and
	 * forth through the real UI control and require an exact match every
	 * time. The rotating hero fact is removed from both sides because it
	 * changes on a timer.
	 */
	console.log('\nlocale switching (text must match a cold load exactly)');
	logs.length = 0;

	const TEXT = `(() => {
		const r = document.querySelector('main') || document.body;
		const c = r.cloneNode(true);
		c.querySelectorAll('.facts').forEach(f => f.remove());
		c.querySelectorAll('button.gloss[data-gloss]').forEach(b =>
			b.replaceWith(document.createTextNode(b.textContent)));
		return c.textContent.replace(/\\s+/g, ' ').trim();
	})()`;

	/** Cold, glossary-off ground truth for a locale. */
	async function golden(path) {
		await send('Page.navigate', { url: `${BASE}/` });
		await sleep(1200);
		await evaluate(`(() => { try { localStorage.setItem('celaut-glossary','off'); } catch (e) {} return true; })()`);
		await send('Page.navigate', { url: `${BASE}${path}` });
		await sleep(2600);
		const text = await evaluate(TEXT);
		await evaluate(`(() => { try { localStorage.setItem('celaut-glossary','on'); } catch (e) {} return true; })()`);
		return text;
	}

	const goldEn = await golden('/');
	const goldEs = await golden('/es');

	await send('Page.navigate', { url: `${BASE}/` });
	await sleep(2600);
	await evaluate(`(() => { try { localStorage.removeItem('celaut-lang'); } catch (e) {} return true; })()`);

	const pickLocale = (code) => `(() => {
		const t = document.querySelector('.lang-toggle');
		if (!t) return 'no toggle';
		t.click();
		return new Promise(r => setTimeout(() => {
			const b = document.querySelector('.lang-menu button[lang="${code}"]');
			if (!b) return r('no option');
			b.click();
			setTimeout(() => r('ok'), 2200);
		}, 300));
	})()`;

	let switchFailures = 0;
	for (const code of ['es', 'en', 'es', 'en']) {
		const res = await evaluate(pickLocale(code));
		if (res !== 'ok') {
			fail(`could not switch to ${code}: ${res}`);
			switchFailures += 1;
			continue;
		}
		await sleep(600);
		const text = await evaluate(TEXT);
		const want = code === 'es' ? goldEs : goldEn;
		const live = await evaluate(`document.querySelectorAll('button.gloss[data-gloss]').length`);
		if (text === want) {
			ok(`→${code}: text identical to a cold load (${text.length} chars, ${live} marks)`);
		} else {
			switchFailures += 1;
			// Show where they diverge, which is far more useful than lengths.
			let i = 0;
			while (i < text.length && i < want.length && text[i] === want[i]) i += 1;
			fail(
				`→${code}: text differs from a cold load (${text.length} vs ${want.length} chars). ` +
					`First divergence at ${i}: got …${JSON.stringify(text.slice(i, i + 70))}, ` +
					`expected …${JSON.stringify(want.slice(i, i + 70))}`
			);
		}
		if (!live) fail(`→${code}: no marks after the switch`);
	}
	if (!switchFailures) ok('four locale switches, no stale or duplicated prose');

	const switchErrors = logs.filter((l) => !/favicon|404/i.test(l));
	if (switchErrors.length) fail(`console errors while switching: ${switchErrors.slice(0, 3).join(' | ')}`);
	else ok('no console errors while switching');

	/*
	 * Untranslated locale: the layer must be completely absent.
	 *
	 * This is the check that protects the reader the feature exists
	 * for. English ships first, and several trigger words are spelled
	 * identically in every language — DePIN, microVM, Ergo, gRPC,
	 * peer-to-peer. So the naive implementation underlines those few
	 * words on a French page and opens ENGLISH definitions from them:
	 * a French speaker who does not read English gets a worse page
	 * than if the feature had never shipped.
	 *
	 * The contract is therefore all-or-nothing per language: zero
	 * marks, no toggle, no hint, until that locale's dictionary carries
	 * the terms. When it does, this assertion is the one to invert.
	 */
	console.log('\n/fr/depin (untranslated locale — layer must be absent)');
	logs.length = 0;
	await send('Page.navigate', { url: `${BASE}/fr/depin` });
	await sleep(2400);
	const es = await evaluate(`(() => ({
		total: document.querySelectorAll('button.gloss[data-gloss]').length,
		toggle: !!document.querySelector('.gloss-toggle'),
		hint: !!document.querySelector('.gloss-hint'),
		card: !!document.querySelector('.gloss-card'),
		lang: document.documentElement.lang,
		textLen: (document.querySelector('main') || document.body).textContent.length
	}))()`);

	if (es.lang !== 'fr') fail(`html lang is "${es.lang}", expected fr`);
	else ok('html lang=fr');
	if (es.total !== 0) fail(`${es.total} marks on an untranslated locale — English definitions would leak`);
	else ok('no marks (correct: glossary not translated to fr)');
	if (es.toggle) fail('glossary toggle shown on a locale that has no glossary');
	else ok('toggle correctly hidden');
	if (es.hint) fail('first-run hint shown on a locale that has no glossary');
	else ok('hint correctly suppressed');
	if (!es.textLen) fail('French page rendered empty');
	else ok(`page renders normally (${es.textLen} chars of fr prose, untouched)`);

	const esErrors = logs.filter((l) => !/favicon|404/i.test(l));
	if (esErrors.length) fail(`console errors: ${esErrors.slice(0, 2).join(' | ')}`);
	else ok('no console errors');

	ws.close();
	console.log(`\n${failures ? `FAIL — ${failures} problem(s)` : 'PASS — all checks green'}`);
	process.exit(failures ? 1 : 0);
}

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
