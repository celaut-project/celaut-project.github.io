#!/usr/bin/env node
/*
 * scripts/perf-profile.mjs
 * ------------------------------------------------------------------
 * CPU sampling profile of one route in one state, so "the page idles at
 * 11%" becomes "this function idles at 11%". Aggregates self-time by
 * function and by top-level source file.
 *
 *   node scripts/perf-profile.mjs [--route /] [--at top|bottom] [--ms 5000]
 */
const BASE = process.env.BASE || 'http://localhost:4174';
const CDP = process.env.CDP || 'http://127.0.0.1:9225';

const args = process.argv.slice(2);
const argOf = (n, d) => {
	const i = args.indexOf(`--${n}`);
	return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const ROUTE = argOf('route', '/');
const AT = argOf('at', 'top');
const MS = Number(argOf('ms', '5000'));
const DPR = Number(argOf('dpr', '2'));

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
await sleep(4500);

if (AT === 'bottom') {
	await evaluate(
		`window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight), true`
	);
	await sleep(1500);
}

await send('Profiler.enable');
await send('Profiler.setSamplingInterval', { interval: 100 });
await send('Profiler.start');
await sleep(MS);
const { profile } = await send('Profiler.stop');

/* ---- aggregate self time per node ---- */
const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const selfSamples = new Map();
for (const id of profile.samples) selfSamples.set(id, (selfSamples.get(id) || 0) + 1);
const total = profile.samples.length;
const dur = (profile.endTime - profile.startTime) / 1000;

const rows = [...selfSamples.entries()]
	.map(([id, count]) => {
		const n = byId.get(id);
		const f = n?.callFrame ?? {};
		return {
			name: f.functionName || '(anonymous)',
			url: (f.url || '').split('/').pop() || '(native)',
			line: f.lineNumber,
			count,
			pct: +((count / total) * 100).toFixed(1),
			ms: +((count / total) * dur).toFixed(0)
		};
	})
	.sort((a, b) => b.count - a.count);

console.log(`\n=== CPU profile: ${ROUTE} @ ${AT}, dpr${DPR}, ${dur.toFixed(0)}ms ===`);
const idlePct = rows.find((r) => r.name === '(idle)')?.pct ?? 0;
console.log(`idle ${idlePct}%  →  busy ${(100 - idlePct).toFixed(1)}%\n`);
console.log('  self%   selfMs  function @ file:line');
console.log('  ' + '-'.repeat(62));
for (const r of rows.slice(0, 22)) {
	if (r.name === '(idle)') continue;
	console.log(
		`  ${String(r.pct).padStart(5)}  ${String(r.ms).padStart(7)}  ${r.name} @ ${r.url}:${r.line}`
	);
}

/* ---- roll up by file ---- */
const byFile = new Map();
for (const r of rows) {
	if (r.name === '(idle)') continue;
	byFile.set(r.url, (byFile.get(r.url) || 0) + r.count);
}
console.log('\n  by file:');
for (const [f, c] of [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
	console.log(`  ${String(+((c / total) * 100).toFixed(1)).padStart(5)}%  ${f}`);
}

ws.close();
await fetch(`${CDP}/json/close/${target.id}`);
