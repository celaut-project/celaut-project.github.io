#!/usr/bin/env node
/*
 * Browser verification of the plain-language layer.
 *
 *   npx vite preview --port 4174
 *   google-chrome --headless=new --remote-debugging-port=9225 \
 *     --user-data-dir=/tmp/chrome-profile --hide-scrollbars
 *   node scripts/glossary-browser.mjs
 *
 * scripts/glossary-check.mjs asks whether the right words are found;
 * this asks whether the layer behaves once it is on a page — the half
 * that only a real DOM can answer:
 *
 *   • terms are marked, and every one is a focusable button carrying a
 *     definition that exists in the dictionary;
 *   • clicking one opens the card, Escape closes it, and focus lands
 *     back on the term;
 *   • the card stays inside the viewport (the whole point is that it is
 *     readable where the reader already is);
 *   • switching locale mid-page leaves no torn text behind. This is the
 *     one that would be invisible in review and obvious to a visitor:
 *     the marks split text nodes Svelte owns, so they have to be undone
 *     before Svelte rewrites the page in another language.
 *
 * Screenshots land in .shots/ (gitignored) for eyeballing.
 */
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4174';
const CDP = process.env.CDP || 'http://127.0.0.1:9225';
const SHOTS = '.shots';

mkdirSync(SHOTS, { recursive: true });

let failures = 0;
/** @param {string} name @param {boolean} ok @param {string} [detail] */
function check(name, ok, detail = '') {
	if (!ok) failures++;
	console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? `  — ${detail}` : ''}`);
}

/** Minimal CDP client: open a tab, evaluate in it, screenshot, close. */
async function openTab(url, { width = 1280, height = 900, mobile = false } = {}) {
	const target = await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' }).then((r) =>
		r.json()
	);
	const ws = new WebSocket(target.webSocketDebuggerUrl);
	await new Promise((res, rej) => {
		ws.onopen = res;
		ws.onerror = rej;
	});

	let nextId = 0;
	const pending = new Map();
	/** @type {string[]} */
	const errors = [];

	ws.onmessage = ({ data }) => {
		const msg = JSON.parse(String(data));
		if (msg.method === 'Runtime.exceptionThrown') {
			errors.push(msg.params.exceptionDetails.text || 'uncaught exception');
			return;
		}
		if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
			errors.push(msg.params.args.map((/** @type {any} */ a) => a.value ?? '').join(' '));
			return;
		}
		const resolve = pending.get(msg.id);
		if (resolve) {
			pending.delete(msg.id);
			resolve(msg);
		}
	};

	const send = (/** @type {string} */ method, /** @type {any} */ params = {}) =>
		new Promise((resolve) => {
			const id = ++nextId;
			pending.set(id, resolve);
			ws.send(JSON.stringify({ id, method, params }));
		});

	await send('Runtime.enable');
	await send('Page.enable');
	await send('Network.enable');
	// Never test a cached shell: after a rebuild its chunk names are gone.
	await send('Network.setCacheDisabled', { cacheDisabled: true });
	await send('Emulation.setDeviceMetricsOverride', {
		width,
		height,
		deviceScaleFactor: 1,
		mobile,
		hasTouch: mobile
	});
	if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
	await send('Page.navigate', { url });

	const evaluate = async (/** @type {string} */ expression) => {
		const res = /** @type {any} */ (
			await send('Runtime.evaluate', {
				expression,
				awaitPromise: true,
				returnByValue: true
			})
		);
		if (res.result?.exceptionDetails) {
			throw new Error(res.result.exceptionDetails.text + ' ' + expression.slice(0, 80));
		}
		return res.result?.result?.value;
	};

	const shot = async (/** @type {string} */ name) => {
		const res = /** @type {any} */ (await send('Page.captureScreenshot', { format: 'png' }));
		writeFileSync(`${SHOTS}/${name}.png`, Buffer.from(res.result.data, 'base64'));
	};

	const close = async () => {
		ws.close();
		await fetch(`${CDP}/json/close/${target.id}`);
	};

	// Wait for the layer rather than for a stopwatch: hydration, fonts,
	// the first scan and its 700ms retry pass all have to land first, and
	// how long that takes depends on the machine.
	await evaluate(`
		new Promise((resolve) => {
			const deadline = Date.now() + 12000;
			const tick = () => {
				if (document.querySelector('.gl-term') || Date.now() > deadline) resolve();
				else setTimeout(tick, 100);
			};
			tick();
		})
	`);
	return { evaluate, shot, close, errors };
}

const ROUTES = [
	['depin', '/depin'],
	['home', '/'],
	['developers', '/developers'],
	['es-depin', '/es/depin']
];

for (const [name, path] of ROUTES) {
	console.log(`\n${name} (${path})`);
	const tab = await openTab(BASE + path);

	const marks = await tab.evaluate(`
		(() => {
			const terms = [...document.querySelectorAll('.gl-term')];
			return {
				count: terms.length,
				keys: terms.map((t) => t.dataset.glossary),
				texts: terms.map((t) => t.textContent),
				buttons: terms.every((t) => t.tagName === 'BUTTON'),
				inProse: terms.every((t) => t.closest('p, li, dd')),
				inChrome: terms.some((t) => t.closest('h1, h2, h3, a, button.btn, canvas')),
				defined: terms.every((t) => {
					const card = t.dataset.glossary;
					return typeof card === 'string' && card.length > 0;
				})
			};
		})()
	`);
	check('terms are marked', marks.count > 6, `${marks.count} marks`);
	check('every mark is a button', marks.buttons);
	check('every mark is in prose', marks.inProse);
	check('no mark in headings, links or canvas', !marks.inChrome);
	check('every mark carries a term key', marks.defined, [...new Set(marks.keys)].join(', '));

	/* Opening, and staying on screen. */
	const opened = await tab.evaluate(`
		(async () => {
			const term = document.querySelector('.gl-term');
			term.scrollIntoView({ block: 'center' });
			await new Promise((r) => setTimeout(r, 250));
			term.click();
			await new Promise((r) => setTimeout(r, 250));
			const pop = document.getElementById('gl-pop');
			if (!pop) return { open: false };
			const r = pop.getBoundingClientRect();
			return {
				open: true,
				expanded: term.getAttribute('aria-expanded') === 'true',
				described: term.getAttribute('aria-describedby') === 'gl-pop',
				name: pop.querySelector('.gl-name')?.textContent,
				body: pop.querySelector('.gl-body')?.textContent?.length ?? 0,
				analogy: pop.querySelector('.gl-analogy')?.textContent?.length ?? 0,
				onScreen: r.top >= 0 && r.left >= 0 && r.bottom <= innerHeight && r.right <= innerWidth
			};
		})()
	`);
	check('clicking a term opens the card', opened.open);
	check('the term reports itself expanded', opened.expanded);
	check('the term points at the card', opened.described);
	check('the card has a name, a definition and an analogy', opened.body > 40 && opened.analogy > 20, `${opened.name} · ${opened.body}+${opened.analogy} chars`);
	check('the card is fully on screen', opened.onScreen);
	await tab.shot(`glossary-${name}`);

	const closed = await tab.evaluate(`
		(async () => {
			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
			await new Promise((r) => setTimeout(r, 200));
			const term = document.querySelector('.gl-term');
			return {
				gone: !document.getElementById('gl-pop'),
				refocused: document.activeElement === term,
				collapsed: term.getAttribute('aria-expanded') === 'false'
			};
		})()
	`);
	check('Escape closes the card', closed.gone);
	check('focus returns to the term', closed.refocused);
	check('the term reports itself collapsed', closed.collapsed);

	/*
	 * The locale switch. `textContent` before and after must differ only
	 * by language — no duplicated clause, no leftover fragment of the
	 * old sentence, which is what a mishandled split text node leaves.
	 */
	for (const e of tab.errors) check('no console error', false, e);
	if (!tab.errors.length) check('no console errors', true);

	await tab.close();
}

/*
 * Touch. A coarse pointer gets a bottom sheet instead of a floating
 * card, and the sheet is anchored to the screen rather than to the word
 * — so it must open even when the term itself is off-screen, which a
 * card that positions itself against its anchor will happily refuse to
 * do.
 */
{
	console.log('\ntouch (/depin at 390×844)');
	const tab = await openTab(BASE + '/depin', { width: 390, height: 844, mobile: true });
	const result = await tab.evaluate(`
		(async () => {
			// Deliberately a term further down the page than the viewport.
			const term = [...document.querySelectorAll('.gl-term')][1];
			if (!term) return { skipped: true };
			const offScreen = term.getBoundingClientRect().top > innerHeight;
			term.click();
			await new Promise((r) => setTimeout(r, 400));
			const pop = document.getElementById('gl-pop');
			if (!pop) return { offScreen, open: false };
			const r = pop.getBoundingClientRect();
			return {
				offScreen,
				open: true,
				isSheet: pop.classList.contains('sheet'),
				fullWidth: Math.round(r.width) === Math.round(innerWidth),
				atBottom: Math.round(r.bottom) === Math.round(innerHeight),
				backdrop: !!document.querySelector('.gl-backdrop')
			};
		})()
	`);
	check('a tap opens the sheet', result.open, result.offScreen ? 'term was off-screen' : '');
	check('it is the sheet, not the floating card', result.isSheet);
	check('it spans the screen and sits at the bottom', result.fullWidth && result.atBottom);
	check('it has a backdrop to dismiss', result.backdrop);
	await tab.shot('glossary-touch');

	const dismissed = await tab.evaluate(`
		(async () => {
			document.querySelector('.gl-backdrop').click();
			await new Promise((r) => setTimeout(r, 300));
			return !document.getElementById('gl-pop');
		})()
	`);
	check('tapping the backdrop closes it', dismissed);
	for (const e of tab.errors) check('no console error', false, e);
	await tab.close();
}

/*
 * The locale switch.
 *
 * The marks split text nodes Svelte owns, and a locale switch is the
 * moment Svelte writes new sentences into them — so a mishandled unmark
 * shows up here and nowhere else. The check is exact rather than
 * heuristic: switching /depin to French must leave the page reading
 * word for word like /fr/depin loaded from scratch.
 */
{
	console.log('\nlocale switch (/depin → français)');

	const collect = `[...document.querySelectorAll('p')].map((p) => p.textContent.replace(/\\s+/g, ' ').trim())`;

	const reference = await openTab(BASE + '/fr/depin');
	const expected = await reference.evaluate(collect);
	await reference.close();

	const tab = await openTab(BASE + '/depin');
	const result = await tab.evaluate(`
		(async () => {
			const marksBefore = document.querySelectorAll('.gl-term').length;
			const opener = document.querySelector('.lang-toggle');
			if (!opener) return { skipped: 'no language switcher found' };
			opener.click();
			await new Promise((r) => setTimeout(r, 400));
			const fr = [...document.querySelectorAll('.lang-menu button')].find((el) =>
				/fran/i.test(el.textContent || '')
			);
			if (!fr) return { skipped: 'no French option found' };
			fr.click();
			// The dictionary is a separate chunk; give the fetch room.
			await new Promise((r) => setTimeout(r, 2000));
			return {
				marksBefore,
				marksAfter: document.querySelectorAll('.gl-term').length,
				paragraphs: ${collect}
			};
		})()
	`);

	if (result.skipped) {
		check('locale switch exercised', false, result.skipped);
	} else {
		const got = result.paragraphs;
		const mismatch = expected.findIndex((/** @type {string} */ p, /** @type {number} */ i) => got[i] !== p);
		check('the page really switched language', got.join(' ').includes('nœud'));
		check('same number of paragraphs as a fresh /fr/depin', got.length === expected.length, `${got.length} vs ${expected.length}`);
		check(
			'every paragraph reads exactly like a fresh /fr/depin',
			mismatch === -1,
			mismatch === -1 ? '' : `¶${mismatch}: "${String(got[mismatch]).slice(0, 70)}" ≠ "${String(expected[mismatch]).slice(0, 70)}"`
		);
		check('terms are re-marked in the new language', result.marksAfter > 6, `${result.marksBefore} → ${result.marksAfter}`);
	}
	await tab.shot('glossary-locale-switch');
	for (const e of tab.errors) check('no console error', false, e);
	await tab.close();
}

console.log(failures ? `\n${failures} failure(s)` : '\nall green');
process.exit(failures ? 1 : 0);
