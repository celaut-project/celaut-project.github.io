#!/usr/bin/env node
/*
 * Headless verification of the built site.
 *
 *   npx vite preview --port 4174
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *     --headless=new --remote-debugging-port=9225 \
 *     --user-data-dir=/tmp/chrome-profile --hide-scrollbars
 *   node scripts/verify-browser.mjs
 *
 * Checks, per (route × locale):
 *
 *   • the section-index rail exists and its entries resolve to real
 *     anchors on the page — a rail pointing at an id that isn't there
 *     is worse than no rail;
 *   • the rail does not overlap the scene copy on desktop. This is a
 *     geometry check, not a screenshot check: the rail is fixed and the
 *     copy is in flow, so the only reliable test is comparing their
 *     boxes on the inline axis, in the direction the document actually
 *     runs (dir=rtl flips which edge is "leading");
 *   • no console errors, and no `[i18n] missing key:` warnings, which
 *     is how a dictionary hole surfaces at runtime;
 *   • <html lang> and <html dir> match the locale.
 *
 * Plus a scripted scroll through the specification scene, asserting the
 * Explore zoom releases when the reader scrolls out of the beat that
 * opened it, and a prefers-reduced-motion pass asserting the page
 * degrades to a readable static article rather than a stack of pinned
 * blanks.
 *
 * Screenshots land in .shots/ (gitignored) for eyeballing.
 */
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4174';
const CDP = process.env.CDP || 'http://127.0.0.1:9225';
const SHOTS = '.shots';

mkdirSync(SHOTS, { recursive: true });

/* ---------------------------------------------------------------- */

async function openTab(url) {
	const target = await fetch(`${CDP}/json/new?${encodeURIComponent(url)}`, {
		method: 'PUT'
	}).then((r) => r.json());
	const ws = new WebSocket(target.webSocketDebuggerUrl);
	await new Promise((res, rej) => {
		ws.onopen = res;
		ws.onerror = rej;
	});

	let nextId = 0;
	const pending = new Map();
	const consoleLines = [];

	ws.onmessage = ({ data }) => {
		const msg = JSON.parse(data);
		if (msg.method === 'Runtime.consoleAPICalled') {
			consoleLines.push({
				level: msg.params.type,
				text: msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ')
			});
			return;
		}
		if (msg.method === 'Runtime.exceptionThrown') {
			consoleLines.push({
				level: 'error',
				text: msg.params.exceptionDetails.text || 'uncaught exception'
			});
			return;
		}
		if (!msg.id) return;
		const waiter = pending.get(msg.id);
		if (!waiter) return;
		pending.delete(msg.id);
		msg.error ? waiter.reject(new Error(JSON.stringify(msg.error))) : waiter.resolve(msg.result);
	};

	const send = (method, params = {}) => {
		const id = ++nextId;
		ws.send(JSON.stringify({ id, method, params }));
		return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
	};

	const evaluate = async (expression) => {
		const r = await send('Runtime.evaluate', {
			expression,
			awaitPromise: true,
			returnByValue: true
		});
		if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
		return r.result.value;
	};

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

	return {
		send,
		evaluate,
		sleep,
		consoleLines,
		targetId: target.id,
		async setViewport(width, height) {
			await send('Emulation.setDeviceMetricsOverride', {
				width,
				height,
				deviceScaleFactor: 1,
				mobile: false
			});
		},
		async reducedMotion(on) {
			await send('Emulation.setEmulatedMedia', {
				features: [
					{ name: 'prefers-reduced-motion', value: on ? 'reduce' : 'no-preference' }
				]
			});
		},
		/*
		 * The unprefixed routes resolve their locale from localStorage, so
		 * a visit to /ar earlier in the run would make a later visit to /
		 * render Arabic — correct site behaviour, wrong for a test that
		 * means to check English. Clear the key, then load for real.
		 *
		 * The first load is also the cold one: GSAP is a separate chunk and
		 * the pins do not exist until it lands, so a scene measured too
		 * early is still .is-static and reports nothing. Wait for at least
		 * one pinned scene before believing any geometry.
		 */
		async goto(url, settle = 2200) {
			await send('Page.navigate', { url: 'about:blank' });
			await sleep(120);
			consoleLines.length = 0;
			await send('Page.navigate', { url });
			await sleep(400);
			try {
				await evaluate(`localStorage.removeItem('celaut-lang')`);
			} catch (e) {
				/* storage may be unavailable; the assertions below still hold */
			}
			await send('Page.navigate', { url });
			consoleLines.length = 0;
			await sleep(settle);
			// Give the motion path up to ~6s to attach its pins.
			for (let i = 0; i < 20; i++) {
				const pinned = await evaluate(
					`document.querySelectorAll('.scene:not(.is-static)').length`
				);
				if (pinned > 0) break;
				await sleep(300);
			}
		},
		async shot(name) {
			const { data } = await send('Page.captureScreenshot', { format: 'png' });
			writeFileSync(`${SHOTS}/${name}.png`, Buffer.from(data, 'base64'));
		},
		async close() {
			ws.close();
			await fetch(`${CDP}/json/close/${target.id}`);
		}
	};
}

/* ---------------------------------------------------------------- */

/**
 * Does the fixed rail overlap the scene copy?
 *
 * A screenshot cannot answer this reliably — the rail is fixed, the copy
 * is in flow, and only one scene is on screen at a time — so this walks
 * every scene, scrolls it into view so GSAP actually pins it, and
 * compares the two boxes on the inline axis IN THE DIRECTION THE
 * DOCUMENT RUNS. Under dir=rtl the rail sits against the right edge
 * (inset-inline-start), so "leading" and "trailing" swap; doing the
 * arithmetic in logical terms means Arabic needs no second code path.
 *
 * Only scenes whose copy is on the same side as the rail can clash: an
 * .align-right caption in LTR is nowhere near it, and reporting its
 * enormous gap as if it were a near miss would bury the real numbers.
 */
const RAIL_OVERLAP = `(async () => {
	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const rail = document.querySelector('.rail');
	if (!rail || getComputedStyle(rail).display === 'none') return { railHidden: true };
	const rtl = document.documentElement.dir === 'rtl';
	const scenes = [...document.querySelectorAll('.scene')];
	const measured = [];

	for (const scene of scenes) {
		// Scroll it in so it is pinned and its copy is laid out.
		scene.scrollIntoView({ behavior: 'auto', block: 'start' });
		await sleep(700);
		if (scene.classList.contains('is-static')) continue;
		const copy = scene.querySelector('.scene-copy');
		if (!copy) continue;
		const cb = copy.getBoundingClientRect();
		if (cb.width === 0) continue;
		const rb = rail.getBoundingClientRect();

		// Which side is the rail on, and which side is the copy's leading
		// edge? In logical terms the rail always occupies the inline-start
		// gutter, so the gap is measured from its inline-end edge to the
		// copy's inline-start edge.
		const gap = rtl ? rb.left - cb.right : cb.left - rb.right;

		// A caption composed to the far side cannot collide with the rail.
		const nearSide = rtl
			? cb.right > window.innerWidth * 0.5
			: cb.left < window.innerWidth * 0.5;

		measured.push({
			id: scene.id,
			alignRight: scene.classList.contains('align-right'),
			nearSide,
			gap: Math.round(gap)
		});
	}

	const atRisk = measured.filter((m) => m.nearSide);
	atRisk.sort((a, b) => a.gap - b.gap);
	return {
		railHidden: false,
		rtl,
		railWidth: Math.round(rail.getBoundingClientRect().width),
		measuredScenes: measured.length,
		atRisk
	};
})()`;

/** Every rail entry must resolve to an element that exists. */
const RAIL_ANCHORS = `(() => {
	const links = [...document.querySelectorAll('.rail a')];
	const entries = links.map((a) => {
		const id = a.getAttribute('href').slice(1);
		return { id, label: a.querySelector('.label')?.textContent?.trim(), found: !!document.getElementById(id) };
	});
	return { count: entries.length, dangling: entries.filter((e) => !e.found), labels: entries.map((e) => e.label) };
})()`;

const LOCALE_ATTRS = `({ lang: document.documentElement.lang, dir: document.documentElement.dir })`;

/* ---------------------------------------------------------------- */

const ROUTES = ['/', '/depin', '/developers', '/users'];
const LOCALES = ['', 'es', 'ar', 'ko'];

const failures = [];
const note = (msg) => console.log(`      ${msg}`);
const fail = (msg) => {
	failures.push(msg);
	console.log(`  FAIL ${msg}`);
};

const tab = await openTab('about:blank');
await tab.send('Page.enable');
await tab.send('Runtime.enable');
await tab.setViewport(1440, 900);
await tab.reducedMotion(false);

console.log(`\n=== desktop 1440x900 · rail geometry, anchors, console ===`);

for (const locale of LOCALES) {
	for (const route of ROUTES) {
		const path = locale ? (route === '/' ? `/${locale}` : `/${locale}${route}`) : route;
		const name = `${locale || 'en'}${route.replace(/\//g, '-') || '-home'}`;
		await tab.goto(BASE + path);

		const attrs = await tab.evaluate(LOCALE_ATTRS);
		const anchors = await tab.evaluate(RAIL_ANCHORS);
		const overlap = await tab.evaluate(RAIL_OVERLAP);
		const errors = tab.consoleLines.filter((l) => l.level === 'error');
		const missingKeys = tab.consoleLines.filter((l) => l.text.includes('[i18n] missing key'));

		console.log(`\n  ${path}  lang=${attrs.lang} dir=${attrs.dir}`);

		const wantDir = locale === 'ar' ? 'rtl' : 'ltr';
		if (attrs.dir !== wantDir) fail(`${path}: dir=${attrs.dir}, expected ${wantDir}`);
		if (locale && attrs.lang !== locale) fail(`${path}: lang=${attrs.lang}, expected ${locale}`);

		if (!anchors.count) fail(`${path}: no section rail rendered`);
		else note(`rail: ${anchors.count} entries · ${anchors.labels.slice(0, 4).join(' / ')}…`);
		if (anchors.dangling?.length) {
			fail(`${path}: rail points at missing ids: ${anchors.dangling.map((d) => d.id).join(', ')}`);
		}

		if (overlap.railHidden) note('rail hidden at this width');
		else if (!overlap.measuredScenes) {
			fail(`${path}: no pinned scene could be measured (motion never attached?)`);
		} else {
			note(
				`rail ${overlap.railWidth}px · measured ${overlap.measuredScenes} scenes · ` +
					`rail-side gaps: ${overlap.atRisk.map((w) => `${w.id} ${w.gap}px`).join(', ')}`
			);
			const clash = overlap.atRisk.filter((w) => w.gap < 0);
			if (clash.length) {
				fail(
					`${path}: rail overlaps copy: ${clash.map((c) => `${c.id} ${c.gap}px`).join(', ')}`
				);
			}
		}

		if (errors.length) fail(`${path}: console errors: ${errors.map((e) => e.text).slice(0, 3).join(' | ')}`);
		if (missingKeys.length) {
			fail(`${path}: missing i18n keys: ${[...new Set(missingKeys.map((m) => m.text))].slice(0, 5).join(' | ')}`);
		}

		await tab.shot(name);
	}
}

/* ---- Zoom reset: scripted scroll through the spec scene ---------- */

console.log(`\n=== zoom reset (service-spec Explore) ===`);
await tab.goto(`${BASE}/`);

const zoomProbe = await tab.evaluate(`(async () => {
	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const scene = document.getElementById('service-spec');
	if (!scene) return { error: 'no service-spec scene' };

	// Park inside the first beat of the spec scene.
	scene.scrollIntoView({ behavior: 'auto', block: 'start' });
	await sleep(1400);
	const top = window.scrollY;

	// Open Explore on the beat that is currently on screen.
	const btn = [...scene.querySelectorAll('.beat-action')]
		.find((b) => b.tagName === 'BUTTON' && b.offsetParent !== null);
	if (!btn) return { error: 'no visible Explore control' };
	btn.click();
	await sleep(700);
	const opened = !!scene.querySelector('.zoom-detail');

	// Scroll onward, out of the beat that owns that zoom.
	window.scrollTo(0, top + window.innerHeight * 2.0);
	await sleep(1400);
	const afterScroll = !!scene.querySelector('.zoom-detail');

	// ...and well past the whole scene.
	window.scrollTo(0, top + window.innerHeight * 4.0);
	await sleep(1200);
	const afterFar = !!scene.querySelector('.zoom-detail');

	return { opened, afterScroll, afterFar };
})()`);

console.log(`  ${JSON.stringify(zoomProbe)}`);
if (zoomProbe.error) fail(`zoom probe: ${zoomProbe.error}`);
else {
	if (!zoomProbe.opened) fail('Explore did not open the zoom detail');
	if (zoomProbe.afterScroll) fail('zoom stayed latched after scrolling out of its beat');
	if (zoomProbe.afterFar) fail('zoom stayed latched after scrolling past the scene');
	if (zoomProbe.opened && !zoomProbe.afterScroll && !zoomProbe.afterFar) {
		note('opens on click, releases on scroll-away, stays released — correct');
	}
}

/* ---- Reduced motion: a readable static article ------------------- */

console.log(`\n=== prefers-reduced-motion ===`);
await tab.reducedMotion(true);
await tab.goto(`${BASE}/`);

const reduced = await tab.evaluate(`(() => {
	const scenes = [...document.querySelectorAll('.scene')];
	const staticScenes = scenes.filter((s) => s.classList.contains('is-static'));
	// Under reduced motion every beat renders stacked at full opacity.
	const beats = [...document.querySelectorAll('.beat')];
	const visible = beats.filter((b) => parseFloat(getComputedStyle(b).opacity) > 0.9);
	// The page must not be one viewport of pinned nothing.
	const pinned = scenes.filter((s) => getComputedStyle(s).position === 'fixed');
	return {
		scenes: scenes.length,
		staticScenes: staticScenes.length,
		beats: beats.length,
		visibleBeats: visible.length,
		pinned: pinned.length,
		docHeight: document.documentElement.scrollHeight,
		headings: document.querySelectorAll('h2').length
	};
})()`);

console.log(`  ${JSON.stringify(reduced)}`);
if (reduced.staticScenes !== reduced.scenes) {
	fail(`reduced motion: ${reduced.scenes - reduced.staticScenes} scene(s) still pinned`);
}
if (reduced.visibleBeats !== reduced.beats) {
	fail(`reduced motion: ${reduced.beats - reduced.visibleBeats} beat(s) not fully visible`);
}
if (reduced.pinned) fail('reduced motion: a scene is position:fixed');
await tab.shot('reduced-motion-home');

/* ---- Mobile ------------------------------------------------------ */

console.log(`\n=== mobile 390x844 ===`);
await tab.reducedMotion(false);
await tab.setViewport(390, 844);

/*
 * The TOC FAB is pinned to inset-inline-start and the back-to-top
 * control to inset-inline-end, so they must sit in opposite bottom
 * corners in BOTH directions. This regressed once already: AudiencePage's
 * .to-top used a physical `right`, which does not flip, so adding the FAB
 * put both controls in the same RTL corner on top of body copy. Checked
 * in both directions, and on both kinds of page, because the landing page
 * and the audience pages use different back-to-top components.
 */
const MOBILE_PROBE = `(async () => {
	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	// Both controls only appear once the reader is past the first screen.
	window.scrollTo(0, window.innerHeight * 3);
	await sleep(900);

	const box = (el) => {
		if (!el) return null;
		const s = getComputedStyle(el);
		const b = el.getBoundingClientRect();
		return {
			l: Math.round(b.left), r: Math.round(b.right),
			t: Math.round(b.top), b: Math.round(b.bottom),
			vis: s.display !== 'none' && parseFloat(s.opacity) > 0.05
		};
	};

	const fab = box(document.querySelector('.toc-fab'));
	// .to-top on the audience pages, .go-to-top on the landing page.
	const toTop = box(document.querySelector('.to-top')) || box(document.querySelector('.go-to-top'));

	let collide = false;
	if (fab && toTop && fab.vis && toTop.vis) {
		const ox = Math.min(fab.r, toTop.r) - Math.max(fab.l, toTop.l);
		const oy = Math.min(fab.b, toTop.b) - Math.max(fab.t, toTop.t);
		if (ox > 0 && oy > 0) collide = { x: ox, y: oy };
	}

	const rail = document.querySelector('.rail');
	return {
		dir: document.documentElement.dir,
		fabShown: !!fab && fab.vis,
		railHidden: !rail || getComputedStyle(rail).display === 'none',
		overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
		collide
	};
})()`;

for (const path of ['/', '/depin', '/developers', '/users', '/ar', '/ar/depin', '/ar/users']) {
	await tab.goto(BASE + path);
	const mobile = await tab.evaluate(MOBILE_PROBE);
	console.log(`  ${path}: ${JSON.stringify(mobile)}`);
	if (!mobile.fabShown) fail(`${path} (mobile): TOC FAB not shown`);
	if (!mobile.railHidden) fail(`${path} (mobile): desktop rail still visible`);
	if (mobile.overflowX) fail(`${path} (mobile): horizontal overflow`);
	if (mobile.collide) {
		fail(
			`${path} (mobile, dir=${mobile.dir}): TOC FAB overlaps back-to-top by ` +
				`${mobile.collide.x}x${mobile.collide.y}px`
		);
	}
	await tab.shot(`mobile-${path.replace(/\//g, '-') || 'home'}`);
}

await tab.close();

console.log(
	failures.length
		? `\n${failures.length} FAILURE(S):\n  - ${failures.join('\n  - ')}`
		: `\nAll checks passed. Screenshots in ${SHOTS}/`
);
process.exit(failures.length ? 1 : 0);
