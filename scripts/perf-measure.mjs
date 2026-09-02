#!/usr/bin/env node
/*
 * scripts/perf-measure.mjs
 * ------------------------------------------------------------------
 * Honest memory + CPU measurement of the built site, over raw CDP.
 *
 *   npx vite preview --port 4174 &
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *     --headless=new --remote-debugging-port=9225 \
 *     --user-data-dir=/tmp/chrome-perf --hide-scrollbars \
 *     --enable-precise-memory-info --js-flags=--expose-gc
 *   node scripts/perf-measure.mjs [--label baseline] [--routes /,/depin]
 *
 * WHAT IT REPORTS, AND WHY THESE THREE NUMBERS ARE DIFFERENT
 * ----------------------------------------------------------
 * People say "the page uses 100MB" and mean one of three unrelated
 * things. This script separates them deliberately:
 *
 *   jsHeapMB      Performance.getMetrics → JSHeapUsedSize. The objects
 *                 the site's own JavaScript allocated. Usually SMALL.
 *   canvasMB      Sum of every <canvas> backing store, computed as
 *                 width*height*4 from the DOM. This is the RAM the
 *                 browser reserves for pixels the site asked for. It
 *                 does NOT show up in the JS heap, which is exactly why
 *                 profiling the heap makes this cost invisible.
 *   rendererRssMB Real resident memory of the renderer process, from
 *                 the OS. Ground truth for "what the tab costs",
 *                 including browser baseline the site cannot control.
 *
 * CPU is sampled as main-thread busy time (Performance.getMetrics
 * TaskDuration delta over a wall-clock window) plus long tasks, at idle
 * and while scrolling — an idle page burning main thread is pure waste.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const BASE = process.env.BASE || 'http://localhost:4174';
const CDP = process.env.CDP || 'http://127.0.0.1:9225';
const OUT = 'perf-results';
mkdirSync(OUT, { recursive: true });

const args = process.argv.slice(2);
const argOf = (name, fallback) => {
	const i = args.indexOf(`--${name}`);
	return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const LABEL = argOf('label', 'run');
const ROUTES = argOf('routes', '/,/depin,/developers,/users').split(',');
const VIEWPORT = argOf('viewport', '1920x1080').split('x').map(Number);
/*
 * deviceScaleFactor. Headless defaults to 1, but the complaint that
 * started this work came from a retina laptop, where every canvas
 * backing store costs FOUR times as much. Measuring only at DPR 1 would
 * hide the entire problem, so this is a first-class knob.
 */
const DPR = Number(argOf('dpr', '1'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- renderer RSS from the OS ---------------------- */
/*
 * Chrome puts each site in its own renderer. We identify the one for
 * our tab by matching the renderer child processes and taking the
 * largest — with a single tab open under a dedicated --user-data-dir
 * that is unambiguous, and it is the only way to see canvas/GPU-side
 * allocation, which never appears in the JS heap.
 */
function rendererRssMB() {
	try {
		const out = execSync(
			`ps -Ao rss,command | grep -i "Google Chrome Helper (Renderer)" | grep -v grep || true`,
			{ encoding: 'utf8' }
		);
		const rss = out
			.trim()
			.split('\n')
			.filter(Boolean)
			.map((l) => parseInt(l.trim().split(/\s+/)[0], 10))
			.filter((n) => Number.isFinite(n));
		if (!rss.length) return null;
		return +(Math.max(...rss) / 1024).toFixed(1);
	} catch {
		return null;
	}
}

function gpuRssMB() {
	try {
		const out = execSync(
			`ps -Ao rss,command | grep -i "Google Chrome Helper (GPU)" | grep -v grep || true`,
			{ encoding: 'utf8' }
		);
		const rss = out
			.trim()
			.split('\n')
			.filter(Boolean)
			.map((l) => parseInt(l.trim().split(/\s+/)[0], 10))
			.filter((n) => Number.isFinite(n));
		if (!rss.length) return null;
		return +(Math.max(...rss) / 1024).toFixed(1);
	} catch {
		return null;
	}
}

/* ---------------- CDP tab plumbing (from verify-browser.mjs) ----- */

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

	await send('Performance.enable');
	await send('Runtime.enable');

	return {
		send,
		evaluate,
		consoleLines,
		targetId: target.id,
		async setViewport(width, height, deviceScaleFactor = 1) {
			await send('Emulation.setDeviceMetricsOverride', {
				width,
				height,
				deviceScaleFactor,
				mobile: false
			});
		},
		async shot(name) {
			const { data } = await send('Page.captureScreenshot', { format: 'png' });
			writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, 'base64'));
		},
		async close() {
			ws.close();
			await fetch(`${CDP}/json/close/${target.id}`);
		}
	};
}

/* ---------------- metric probes --------------------------------- */

async function metrics(tab) {
	const { metrics: m } = await tab.send('Performance.getMetrics');
	const get = (n) => m.find((x) => x.name === n)?.value ?? 0;
	return {
		jsHeapMB: +(get('JSHeapUsedSize') / 1048576).toFixed(2),
		jsHeapTotalMB: +(get('JSHeapTotalSize') / 1048576).toFixed(2),
		nodes: get('Nodes'),
		listeners: get('JSEventListeners'),
		layoutCount: get('LayoutCount'),
		recalcCount: get('RecalcStyleCount'),
		layoutMs: +(get('LayoutDuration') * 1000).toFixed(1),
		recalcMs: +(get('RecalcStyleDuration') * 1000).toFixed(1),
		scriptMs: +(get('ScriptDuration') * 1000).toFixed(1),
		taskMs: +(get('TaskDuration') * 1000).toFixed(1)
	};
}

/*
 * Canvas backing store, straight off the DOM. A full-viewport canvas at
 * DPR 2 on 1920x1080 is 3840*2160*4 = 33.2MB — this is the number that
 * explains a "100MB page" whose JS heap is 8MB.
 */
const CANVAS_PROBE = `(() => {
  const cs = [...document.querySelectorAll('canvas')];
  let bytes = 0;
  const each = cs.map(c => {
    const b = c.width * c.height * 4;
    bytes += b;
    const r = c.getBoundingClientRect();
    return { w: c.width, h: c.height, mb: +(b/1048576).toFixed(2),
             cls: c.className || '(none)',
             cssW: Math.round(r.width), cssH: Math.round(r.height) };
  });
  return { count: cs.length, totalMB: +(bytes/1048576).toFixed(2), each };
})()`;

async function canvasStats(tab) {
	return tab.evaluate(CANVAS_PROBE);
}

/*
 * Main-thread busy fraction over a window. TaskDuration is cumulative
 * across every task the renderer ran; the delta over N ms of wall clock
 * is exactly how much of that window the main thread was not idle.
 */
async function cpuWindow(tab, ms, during) {
	const a = await metrics(tab);
	const t0 = Date.now();
	if (during) await during();
	else await sleep(ms);
	const t1 = Date.now();
	const b = await metrics(tab);
	const wall = t1 - t0;
	return {
		wallMs: wall,
		busyMs: +(b.taskMs - a.taskMs).toFixed(1),
		busyPct: +(((b.taskMs - a.taskMs) / wall) * 100).toFixed(1),
		scriptMs: +(b.scriptMs - a.scriptMs).toFixed(1),
		layoutMs: +(b.layoutMs - a.layoutMs).toFixed(1),
		recalcMs: +(b.recalcMs - a.recalcMs).toFixed(1),
		layouts: b.layoutCount - a.layoutCount,
		recalcs: b.recalcCount - a.recalcCount
	};
}

async function snapshot(tab, phase) {
	const m = await metrics(tab);
	const c = await canvasStats(tab);
	return {
		phase,
		jsHeapMB: m.jsHeapMB,
		canvasMB: c.totalMB,
		canvasCount: c.count,
		nodes: m.nodes,
		listeners: m.listeners,
		rendererRssMB: rendererRssMB(),
		gpuRssMB: gpuRssMB(),
		canvases: c.each
	};
}

/* Programmatic full-page scroll, in steps, so pinned scenes actually
   run their scrub rather than teleporting past it. */
async function scrollTo(tab, fraction) {
	await tab.evaluate(`(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, Math.round(max * ${fraction}));
    return true;
  })()`);
}

async function scrollSweep(tab, steps = 40, dwell = 60) {
	for (let i = 0; i <= steps; i++) {
		await scrollTo(tab, i / steps);
		await sleep(dwell);
	}
}

/* ---------------- per-route run --------------------------------- */

async function measureRoute(route) {
	const url = `${BASE}${route}`;
	const tab = await openTab('about:blank');
	await tab.setViewport(VIEWPORT[0], VIEWPORT[1], DPR);

	// Cold-ish load: clear the locale key so / really renders English.
	await tab.send('Page.navigate', { url });
	await sleep(500);
	try {
		await tab.evaluate(`localStorage.removeItem('celaut-lang')`);
	} catch {}
	await tab.send('Page.navigate', { url });
	await sleep(3000);
	// Wait for the motion path to attach pins (GSAP is a lazy chunk).
	for (let i = 0; i < 20; i++) {
		const pinned = await tab.evaluate(
			`document.querySelectorAll('.scene:not(.is-static)').length`
		);
		if (pinned > 0) break;
		await sleep(300);
	}
	await sleep(1200);

	const result = { route, states: {}, cpu: {} };

	// --- IDLE at top ---
	result.cpu.idleTop = await cpuWindow(tab, 3000);
	result.states.idle = await snapshot(tab, 'idle');
	await tab.shot(`${LABEL}${route.replace(/\//g, '_')}-idle`);

	// --- MID SCROLL ---
	result.cpu.scrolling = await cpuWindow(tab, 0, () => scrollSweep(tab, 24, 70));
	await scrollTo(tab, 0.5);
	await sleep(900);
	result.states.mid = await snapshot(tab, 'mid-scroll');
	await tab.shot(`${LABEL}${route.replace(/\//g, '_')}-mid`);

	// --- BOTTOM (after a full sweep: memory that only grows) ---
	await scrollSweep(tab, 24, 60);
	await scrollTo(tab, 1);
	await sleep(1200);
	result.states.bottom = await snapshot(tab, 'bottom');
	await tab.shot(`${LABEL}${route.replace(/\//g, '_')}-bottom`);
	result.cpu.idleBottom = await cpuWindow(tab, 3000);

	// --- back to top, idle again: does anything get released? ---
	await scrollTo(tab, 0);
	await sleep(1500);
	result.states.backToTop = await snapshot(tab, 'back-to-top');

	result.consoleErrors = tab.consoleLines.filter(
		(l) => l.level === 'error' || /missing key/i.test(l.text)
	);
	await tab.close();
	await sleep(400);
	return result;
}

/* ---------------- main ------------------------------------------ */

const all = [];
for (const route of ROUTES) {
	process.stdout.write(`measuring ${route} ... `);
	try {
		const r = await measureRoute(route);
		all.push(r);
		console.log(
			`js ${r.states.idle.jsHeapMB}MB canvas ${r.states.idle.canvasMB}MB rss ${r.states.idle.rendererRssMB}MB`
		);
	} catch (e) {
		console.log(`FAILED: ${e.message}`);
		all.push({ route, error: e.message });
	}
}

writeFileSync(`${OUT}/${LABEL}.json`, JSON.stringify(all, null, 2));

/* ---------------- human-readable table -------------------------- */

const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);

console.log(`\n===== ${LABEL} @ ${VIEWPORT.join('x')} dpr${DPR} =====\n`);
console.log(
	pad('route', 14) +
		pad('phase', 14) +
		padL('jsHeap', 8) +
		padL('canvas', 9) +
		padL('#cv', 5) +
		padL('nodes', 8) +
		padL('rssMB', 8) +
		padL('gpuMB', 8)
);
console.log('-'.repeat(74));
for (const r of all) {
	if (r.error) {
		console.log(pad(r.route, 14) + 'ERROR ' + r.error);
		continue;
	}
	for (const k of ['idle', 'mid', 'bottom', 'backToTop']) {
		const s = r.states[k];
		console.log(
			pad(r.route, 14) +
				pad(k, 14) +
				padL(s.jsHeapMB, 8) +
				padL(s.canvasMB, 9) +
				padL(s.canvasCount, 5) +
				padL(s.nodes, 8) +
				padL(s.rendererRssMB ?? '-', 8) +
				padL(s.gpuRssMB ?? '-', 8)
		);
	}
}

console.log(`\n--- CPU (main-thread busy) ---\n`);
console.log(
	pad('route', 14) + pad('window', 14) + padL('busy%', 8) + padL('busyMs', 9) + padL('wallMs', 9)
);
console.log('-'.repeat(54));
for (const r of all) {
	if (r.error) continue;
	for (const k of ['idleTop', 'scrolling', 'idleBottom']) {
		const c = r.cpu[k];
		if (!c) continue;
		console.log(
			pad(r.route, 14) + pad(k, 14) + padL(c.busyPct, 8) + padL(c.busyMs, 9) + padL(c.wallMs, 9)
		);
	}
}

const errs = all.flatMap((r) => r.consoleErrors ?? []);
console.log(`\nconsole errors: ${errs.length}`);
errs.slice(0, 10).forEach((e) => console.log(`  [${e.level}] ${e.text}`));
console.log(`\nwrote ${OUT}/${LABEL}.json`);
