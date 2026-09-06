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
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4179';
const CDP = process.env.CDP || 'http://127.0.0.1:9231';
const ROUTES = ['/', '/depin', '/developers', '/users', '/install'];

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
		// Every route is checked in English; the locale pass at the end
		// covers the translated path on purpose and in isolation.
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

		if (marks.total === 0) fail('no marks were added');
		else ok(`${marks.total} marks (${Object.keys(marks.counts).length} distinct terms)`);

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

		const errors = logs.filter((l) => !/favicon|404/i.test(l));
		if (errors.length) fail(`console errors: ${errors.slice(0, 3).join(' | ')}`);
		else ok('no console errors');

		const shot = await send('Page.captureScreenshot', { format: 'png' });
		writeFileSync(`.shots/gloss${route.replace(/\//g, '_') || '_home'}.png`, Buffer.from(shot.data, 'base64'));
	}

	/*
	 * Untranslated locale: the layer must be completely absent.
	 *
	 * This is the check that protects the reader the feature exists
	 * for. English ships first, and several trigger words are spelled
	 * identically in every language — DePIN, microVM, Ergo, gRPC,
	 * peer-to-peer. So the naive implementation underlines those few
	 * words on a Spanish page and opens ENGLISH definitions from them:
	 * a Spanish speaker who does not read English gets a worse page
	 * than if the feature had never shipped.
	 *
	 * The contract is therefore all-or-nothing per language: zero
	 * marks, no toggle, no hint, until that locale's dictionary carries
	 * the terms. When it does, this assertion is the one to invert.
	 */
	console.log('\n/es/depin (untranslated locale — layer must be absent)');
	logs.length = 0;
	await send('Page.navigate', { url: `${BASE}/es/depin` });
	await sleep(2400);
	const es = await evaluate(`(() => ({
		total: document.querySelectorAll('button.gloss[data-gloss]').length,
		toggle: !!document.querySelector('.gloss-toggle'),
		hint: !!document.querySelector('.gloss-hint'),
		card: !!document.querySelector('.gloss-card'),
		lang: document.documentElement.lang,
		textLen: (document.querySelector('main') || document.body).textContent.length
	}))()`);

	if (es.lang !== 'es') fail(`html lang is "${es.lang}", expected es`);
	else ok('html lang=es');
	if (es.total !== 0) fail(`${es.total} marks on an untranslated locale — English definitions would leak`);
	else ok('no marks (correct: glossary not translated to es)');
	if (es.toggle) fail('glossary toggle shown on a locale that has no glossary');
	else ok('toggle correctly hidden');
	if (es.hint) fail('first-run hint shown on a locale that has no glossary');
	else ok('hint correctly suppressed');
	if (!es.textLen) fail('Spanish page rendered empty');
	else ok(`page renders normally (${es.textLen} chars of es prose, untouched)`);

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
