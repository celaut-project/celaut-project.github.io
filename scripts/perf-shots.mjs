#!/usr/bin/env node
/*
 * scripts/perf-shots.mjs
 * ------------------------------------------------------------------
 * Deterministic screenshots at fixed scroll offsets, for before/after
 * comparison. The scroll positions are absolute pixel offsets, not
 * fractions, so the same offset lands on the same story beat in both
 * builds even if total page height differs by a pixel.
 *
 *   node scripts/perf-shots.mjs --label before --dpr 2
 */
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4174';
const CDP = process.env.CDP || 'http://127.0.0.1:9225';

const args = process.argv.slice(2);
const argOf = (n, d) => {
	const i = args.indexOf(`--${n}`);
	return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const LABEL = argOf('label', 'shot');
const DPR = Number(argOf('dpr', '2'));
const ROUTE = argOf('route', '/');
const OUT = `perf-results/shots-${LABEL}`;
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const target = await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json());
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => {
	ws.onopen = res;
	ws.onerror = rej;
});
let nextId = 0;
const pending = new Map();
ws.onmessage = ({ data }) => {
	const m = JSON.parse(data);
	if (!m.id) return;
	const w = pending.get(m.id);
	if (!w) return;
	pending.delete(m.id);
	m.error ? w.reject(new Error(JSON.stringify(m.error))) : w.resolve(m.result);
};
const send = (method, params = {}) => {
	const id = ++nextId;
	ws.send(JSON.stringify({ id, method, params }));
	return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
};
const evaluate = async (expression) => {
	const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
	if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
	return r.result.value;
};

await send('Emulation.setDeviceMetricsOverride', {
	width: 1920,
	height: 1080,
	deviceScaleFactor: DPR,
	mobile: false
});
await send('Page.navigate', { url: `${BASE}${ROUTE}` });
await sleep(600);
try {
	await evaluate(`localStorage.removeItem('celaut-lang')`);
} catch {}
await send('Page.navigate', { url: `${BASE}${ROUTE}` });
await sleep(5000);

const height = await evaluate(`document.documentElement.scrollHeight`);
console.log(`page height: ${height}`);

/*
 * Walk the page in fixed 1400px steps. That is slightly larger than a
 * viewport, so consecutive shots do not overlap, and every pinned scene
 * gets sampled several times across its scrub.
 */
const STEP = 1400;
const stops = [];
for (let y = 0; y < height - 1080; y += STEP) stops.push(y);

let i = 0;
for (const y of stops) {
	// Scroll, then let the scrub settle AND the canvas repaint. Time-based
	// scenes never fully settle, so this is a fixed dwell rather than a
	// wait-for-idle; both builds get exactly the same dwell.
	await evaluate(`window.scrollTo(0, ${y}), true`);
	await sleep(700);
	const { data } = await send('Page.captureScreenshot', { format: 'png' });
	const name = `${String(i).padStart(2, '0')}-y${y}`;
	writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, 'base64'));
	i++;
}
console.log(`wrote ${i} shots to ${OUT}`);

ws.close();
await fetch(`${CDP}/json/close/${target.id}`);
