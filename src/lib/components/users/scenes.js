/*
 * src/lib/components/users/scenes.js
 * ------------------------------------------------------------------
 * Procedural canvas scenes for /users, scrubbed by the scroll progress
 * that PinnedScene feeds in.
 *
 * The story, from a person who just wants something done:
 *   1. ask     — you describe the problem; nodes offer to solve it,
 *                with no account and no platform in between
 *   2. proof   — the service is content-addressed, so what runs is
 *                provably the thing you asked for
 *   3. sealed  — it executes isolated, and the developer has no reach
 *                into your request data
 *   4. meter   — you pay for the execution, not for a subscription
 *
 * Pure functions of (progress, palette, mouse, time): a single paint at
 * progress = 1 is the reduced-motion frame.
 */

import { clamp, range, smoothstep } from '$lib/motion.js';
import {
	rand,
	rgba,
	roundRect,
	backdrop,
	stage,
	sealedBox,
	label,
	packet
} from '$lib/components/immersive/scene-kit.js';

/* ==================================================================
 * SCENE 1 — "Ask the network, not a company."
 * Your request radiates out; peers answer with a price. You pick one
 * and talk to it directly — no signup, no gateway.
 * ================================================================== */

/*
 * A peer's quote, in whatever it happens to settle in.
 *
 * Payment sits OUTSIDE the core architecture, so no single ledger is
 * baked in and quoting everything in ERG misrepresented that. Each peer
 * names its own unit; every chip also carries the same amount converted
 * to USD, because that is the number a reader can actually compare
 * across peers. Rates are illustrative round numbers — this is a
 * drawing of a market, not a ticker.
 */
const QUOTE_UNITS = [
	{ code: 'ERG', min: 0.4, span: 1.6, digits: 2, usdPerUnit: 1.1 },
	{ code: 'BTC', min: 0.000008, span: 0.000026, digits: 6, usdPerUnit: 68000 },
	{ code: 'USD', min: 0.45, span: 1.7, digits: 2, usdPerUnit: 1 }
];

/** @param {number} i */
function quoteFor(i) {
	const unit = QUOTE_UNITS[i % QUOTE_UNITS.length];
	const amount = unit.min + rand(i + 3) * unit.span;
	const usd = amount * unit.usdPerUnit;
	return {
		primary: `${amount.toFixed(unit.digits)} ${unit.code}`,
		// The USD line is the common scale; skipped when the quote is
		// already in USD, where it would just repeat itself.
		secondary: unit.code === 'USD' ? '' : `≈ $${usd.toFixed(2)}`
	};
}
export function drawAskScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const you = range(progress, 0.0, 0.18); // you, at the centre
	const call = range(progress, 0.16, 0.46); // the request radiates
	const offers = range(progress, 0.42, 0.72); // peers quote a price
	const pick = range(progress, 0.68, 1.0); // one direct link remains

	// Sized against the stage HALF, with room left over for the price
	// chips that sit just outside each peer, so nothing lands under the
	// caption column or off the right edge.
	const radius = Math.min(width * (compact ? 0.3 : 0.155), height * 0.32);
	const N = compact ? 6 : 8;
	const chosen = 2;
	const peers = [];
	for (let i = 0; i < N; i++) {
		const a = (i / N) * Math.PI * 2 - Math.PI / 2;
		let x = cx + Math.cos(a) * radius;
		let y = cy + Math.sin(a) * radius * 1.02;
		// The mesh yields to the cursor a little, so it feels live.
		const mx = mouse.x * width;
		const my = mouse.y * height;
		const dx = x - mx;
		const dy = y - my;
		const d = Math.hypot(dx, dy) || 1;
		const push = Math.min(38, 3200 / (d + 44));
		x += (dx / d) * push;
		y += (dy / d) * push;
		peers.push({ x, y });
	}

	// --- The request, as expanding rings ---
	const c = smoothstep(call);
	if (c > 0) {
		for (let i = 0; i < 3; i++) {
			const k = ((time * 0.45 + i / 3) % 1);
			ctx.save();
			ctx.globalAlpha = c * (1 - k) * 0.5;
			ctx.strokeStyle = palette.link;
			ctx.lineWidth = 1.6;
			ctx.beginPath();
			ctx.arc(cx, cy, radius * 1.15 * k, 0, Math.PI * 2);
			ctx.stroke();
			ctx.restore();
		}
	}

	// --- Peers + their quotes ---
	peers.forEach((p, i) => {
		const appear = smoothstep(clamp(call * 1.4 - i * 0.05));
		if (appear <= 0) return;
		const isChosen = i === chosen;
		const fade = pick > 0 && !isChosen ? 1 - smoothstep(pick) * 0.78 : 1;

		// Link, thickening for the one you actually engage.
		ctx.save();
		ctx.globalAlpha = appear * fade * (isChosen ? 0.95 : 0.4);
		ctx.strokeStyle = isChosen && pick > 0 ? palette.accent : palette.link;
		ctx.lineWidth = isChosen && pick > 0 ? 2.4 : 1.2;
		if (!(isChosen && pick > 0)) {
			ctx.setLineDash([5, 7]);
			ctx.lineDashOffset = -time * 22;
		}
		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.lineTo(p.x, p.y);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();

		// The peer.
		ctx.save();
		ctx.globalAlpha = appear * fade;
		ctx.fillStyle = palette.node;
		ctx.beginPath();
		ctx.arc(p.x, p.y, 8 * Math.max(0.8, scale * 0.75), 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = appear * fade * 0.18 * (0.6 + 0.4 * Math.sin(time * 1.6 + i));
		ctx.beginPath();
		ctx.arc(p.x, p.y, 20 * Math.max(0.8, scale * 0.75), 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();

		// A quote chip: what this peer wants to run it, in its own unit,
		// with the same figure in USD underneath so the offers compare.
		const o = smoothstep(clamp(offers * 1.35 - i * 0.06));
		if (o > 0) {
			const px = p.x + (p.x - cx) * 0.3;
			const py = p.y + (p.y - cy) * 0.3;
			const quote = quoteFor(i);
			const font = palette.fontBody || 'Lato, sans-serif';
			const topSize = compact ? 9 : 11;
			const subSize = compact ? 8 : 9.5;
			const twoLine = Boolean(quote.secondary);
			ctx.save();
			// Measure rather than assume: "0.000021 BTC" is a good deal wider
			// than "1.24 ERG" and a fixed chip clipped it.
			ctx.font = `700 ${topSize}px ${font}`;
			const textW = ctx.measureText(quote.primary).width;
			const w = Math.max(compact ? 46 : 56, textW + (compact ? 14 : 18));
			const h = twoLine ? (compact ? 30 : 34) : 22;
			ctx.globalAlpha = o * fade;
			roundRect(ctx, px - w / 2, py - h / 2, w, h, 11);
			ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.08);
			ctx.fill();
			ctx.strokeStyle = isChosen && pick > 0 ? palette.accent : rgba(palette.onSurfaceRgb, 0.3);
			ctx.lineWidth = 1.2;
			ctx.stroke();
			ctx.textAlign = 'center';
			ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.82);
			ctx.fillText(quote.primary, px, twoLine ? py - 1 : py + 4);
			if (twoLine) {
				ctx.font = `500 ${subSize}px ${font}`;
				ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.58);
				ctx.fillText(quote.secondary, px, py + (compact ? 10 : 12));
			}
			ctx.textAlign = 'left';
			ctx.restore();
		}

		// Traffic on the chosen link once the deal is done.
		if (isChosen && pick > 0) {
			const f = smoothstep(pick);
			for (let k = 0; k < 2; k++) {
				const t = (time * 0.55 + k * 0.5) % 1;
				packet(ctx, cx, cy, p.x, p.y, t, palette.accent, f);
				packet(ctx, p.x, p.y, cx, cy, (t + 0.5) % 1, palette.node, f);
			}
		}
	});

	// --- You ---
	const y = smoothstep(you);
	if (y > 0) {
		const r = 15 * Math.max(0.85, scale * 0.8);
		ctx.save();
		ctx.globalAlpha = y;
		ctx.fillStyle = palette.accent;
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		label(ctx, t('viz.users.you'), cx, cy + r + 20, palette, y, compact ? 11 : 13);
	}

	// No account required: a struck-through login card fading out.
	if (call > 0.1 && pick < 0.4) {
		const f = smoothstep(range(progress, 0.2, 0.4)) * (1 - smoothstep(range(progress, 0.45, 0.62)));
		if (f > 0.01) {
			const w = compact ? 120 : 150;
			const h = w * 0.5;
			const bx = cx - w / 2;
			const by = cy - radius * (compact ? 1.5 : 1.42) - h / 2;
			ctx.save();
			ctx.globalAlpha = f;
			roundRect(ctx, bx, by, w, h, 8);
			ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.07);
			ctx.fill();
			ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.4);
			ctx.lineWidth = 1.5;
			ctx.stroke();
			// Two fake input rows.
			ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.2);
			ctx.fillRect(bx + 12, by + h * 0.3, w - 24, 8);
			ctx.fillRect(bx + 12, by + h * 0.55, w - 24, 8);
			// Struck out.
			ctx.strokeStyle = palette.accent;
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(bx + 6, by + 6);
			ctx.lineTo(bx + w - 6, by + h - 6);
			ctx.stroke();
			ctx.restore();
			label(ctx, t('viz.users.noAccount'), cx, by - 10, palette, f, compact ? 10 : 12);
		}
	}

	// Naming what the chips are showing: the unit is the peer's choice,
	// not the network's.
	const q = smoothstep(clamp(offers * 1.2 - 0.2));
	if (q > 0.02) {
		label(
			ctx,
			t('viz.users.eachPeerItsUnit'),
			cx,
			cy + radius * (compact ? 1.62 : 1.5) + 22,
			palette,
			q * 0.85,
			compact ? 9 : 11,
			500
		);
	}
}

/* ==================================================================
 * SCENE 2 — "You get exactly what the spec says."
 * The service's hash is computed, matched against what was requested,
 * and only then does it run. A swapped copy fails the comparison.
 * ================================================================== */
export function drawProofScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const asked = range(progress, 0.0, 0.22); // the hash you asked for
	const arrive = range(progress, 0.2, 0.46); // a candidate turns up
	const compare = range(progress, 0.44, 0.72); // hashes compared
	const verdict = range(progress, 0.68, 1.0); // match → run, else reject

	const boxW = (compact ? 96 : 122) * Math.max(0.85, scale * 0.8);
	const boxH = boxW * 0.7;
	const gapY = compact ? 92 : 124;

	// --- Top: the specification you requested ---
	const topY = cy - gapY * 0.95;
	sealedBox(ctx, cx - boxW / 2, topY - boxH / 2, boxW, boxH, Math.min(1, asked * 3), palette, {
		scan: 0
	});
	label(ctx, t('viz.users.whatYouAsked'), cx, topY - boxH / 2 - 14, palette, smoothstep(asked), compact ? 10 : 12, 500);
	label(ctx, 'a1f3…9c2e', cx, topY + boxH / 2 + 20, palette, smoothstep(asked), compact ? 11 : 13);

	// --- Bottom: what the node actually has ---
	const botY = cy + gapY * 0.95;
	const arriveF = smoothstep(arrive);
	if (arriveF > 0) {
		const drop = (1 - arriveF) * 60;
		ctx.save();
		ctx.translate(0, drop);
		sealedBox(ctx, cx - boxW / 2, botY - boxH / 2, boxW, boxH, arriveF, palette, { scan: time });
		ctx.restore();
		label(ctx, t('viz.users.whatNodeRuns'), cx, botY + boxH / 2 + 22 + drop, palette, arriveF, compact ? 10 : 12, 500);
		label(ctx, 'a1f3…9c2e', cx, botY - boxH / 2 - 12 + drop, palette, arriveF, compact ? 11 : 13);
	}

	// --- The comparison itself ---
	const c = smoothstep(compare);
	if (c > 0) {
		ctx.save();
		ctx.globalAlpha = c;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.6;
		ctx.setLineDash([4, 6]);
		ctx.lineDashOffset = -time * 18;
		const x1 = cx - boxW * 0.72;
		const x2 = cx + boxW * 0.72;
		[x1, x2].forEach((x) => {
			ctx.beginPath();
			ctx.moveTo(x, topY);
			ctx.lineTo(x, botY);
			ctx.stroke();
		});
		ctx.setLineDash([]);
		ctx.restore();

		// A scanning bar sweeping between them.
		const k = (time * 0.5) % 1;
		ctx.save();
		ctx.globalAlpha = c * 0.4;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 2;
		const sy = topY + (botY - topY) * k;
		ctx.beginPath();
		ctx.moveTo(cx - boxW * 0.8, sy);
		ctx.lineTo(cx + boxW * 0.8, sy);
		ctx.stroke();
		ctx.restore();
	}

	// --- Verdict: a match ring, and a rejected impostor drifting off ---
	if (verdict > 0) {
		const f = smoothstep(verdict);
		const r = boxW * 0.42 * (1 + 0.04 * Math.sin(time * 2));
		ctx.save();
		ctx.globalAlpha = f;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.stroke();
		// Tick inside.
		ctx.lineCap = 'round';
		ctx.beginPath();
		ctx.moveTo(cx - r * 0.36, cy);
		ctx.lineTo(cx - r * 0.08, cy + r * 0.3);
		ctx.lineTo(cx + r * 0.4, cy - r * 0.32);
		ctx.stroke();
		ctx.restore();
		label(ctx, t('viz.users.identicalItRuns'), cx, cy + r + 22, palette, f, compact ? 10 : 12, 700);

		// The swapped build, pushed out of frame with a different hash.
		const drift = smoothstep(clamp((f - 0.3) / 0.7));
		if (drift > 0) {
			const ox = cx + boxW * 1.5 + drift * boxW * 1.2;
			ctx.save();
			ctx.globalAlpha = (1 - drift * 0.7) * 0.85;
			roundRect(ctx, ox - boxW * 0.3, cy - boxH * 0.3, boxW * 0.6, boxH * 0.6, 5);
			ctx.strokeStyle = palette.accent;
			ctx.lineWidth = 1.8;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(ox - boxW * 0.26, cy - boxH * 0.26);
			ctx.lineTo(ox + boxW * 0.26, cy + boxH * 0.26);
			ctx.stroke();
			ctx.restore();
			label(ctx, 'b7c0…41aa', ox, cy + boxH * 0.5 + 16, palette, (1 - drift * 0.7) * 0.8, compact ? 9 : 11);
		}
	}
}

/* ==================================================================
 * SCENE 3 — "Your request is nobody else's business."
 * The workload is sealed inside a microVM on the node that runs it.
 * The developer's reach stops at the seal; the host's does too.
 * ================================================================== */
export function drawSealedScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const send = range(progress, 0.0, 0.26); // your data goes in
	const seal = range(progress, 0.24, 0.54); // the microVM closes
	const probe = range(progress, 0.5, 0.78); // outside reach bounces
	const gone = range(progress, 0.74, 1.0); // job ends, VM destroyed

	const boxW = (compact ? 180 : 236) * Math.max(0.85, scale * 0.85);
	const boxH = boxW * 0.74;
	const bx = cx - boxW / 2;
	const by = cy - boxH / 2;

	// --- Your data, moving in and settling ---
	const destroyF = smoothstep(gone);
	const P = compact ? 20 : 32;
	for (let i = 0; i < P; i++) {
		const g = smoothstep(clamp(send * 1.4 - rand(i) * 0.3));
		const a = rand(i) * Math.PI * 2 + time * (0.08 + rand(i + 5) * 0.2);
		const wild = (compact ? 140 : 190) * (0.5 + rand(i + 11));
		const tame = boxW * 0.32 * (0.25 + rand(i + 23) * 0.7);
		// Once the VM is torn down the particles scatter and vanish.
		const r = (wild + (tame - wild) * g) * (1 + destroyF * 2.4);
		ctx.save();
		ctx.globalAlpha = (0.3 + 0.55 * g) * (1 - destroyF);
		ctx.fillStyle = i % 4 === 0 ? palette.accent : palette.node;
		ctx.beginPath();
		ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.8, 2 + rand(i + 31) * 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}

	// --- The microVM boundary ---
	const sealT = Math.min(1, seal) * (1 - destroyF * 0.9);
	sealedBox(ctx, bx, by, boxW, boxH, sealT, palette, { scan: time });
	label(
		ctx,
		destroyF > 0.5 ? t('viz.users.destroyed') : t('viz.users.microvm'),
		cx,
		by - 16,
		palette,
		smoothstep(seal),
		compact ? 11 : 14
	);

	// --- Two outside parties reaching in, and failing ---
	if (probe > 0) {
		const f = smoothstep(probe) * (1 - destroyF);
		// Both probe origins stay inside the stage half: the left one must
		// clear the caption column, the right one the viewport edge.
		const sides = [
			{
				sx: bx - boxW * 0.52,
				sy: by - boxH * 0.5,
				hx: bx,
				hy: by + boxH * 0.34,
				name: t('viz.users.theDeveloper')
			},
			{
				sx: bx + boxW * 1.52,
				sy: by + boxH * 1.5,
				hx: bx + boxW,
				hy: by + boxH * 0.66,
				name: t('viz.users.theHostMachine')
			}
		];
		sides.forEach((s, i) => {
			const k = (time * 0.6 + i * 0.5) % 1;
			const travel = Math.min(1, k * 2);
			ctx.save();
			ctx.globalAlpha = f * 0.9;
			ctx.strokeStyle = palette.accent;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(s.sx, s.sy);
			ctx.lineTo(s.sx + (s.hx - s.sx) * travel, s.sy + (s.hy - s.sy) * travel);
			ctx.stroke();
			if (k > 0.5) {
				const b = (k - 0.5) * 2;
				ctx.globalAlpha = f * (1 - b);
				ctx.beginPath();
				ctx.moveTo(s.hx, s.hy);
				ctx.lineTo(s.hx + (s.sx - s.hx) * 0.5 * b, s.hy + (s.sy - s.hy) * 0.9 * b);
				ctx.stroke();
				ctx.globalAlpha = f * (1 - b) * 0.75;
				ctx.fillStyle = palette.accent;
				ctx.beginPath();
				ctx.arc(s.hx, s.hy, 6 + 13 * b, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.restore();
			if (!compact) {
				label(ctx, s.name, s.sx, s.sy - 14, palette, f * 0.8, 11, 500);
			}
		});
	}
}

/* ==================================================================
 * SCENE 4 — "Pay for the execution. Nothing else."
 * Usage and what you pay are the same shape: two bursts of work, then
 * nothing. When usage falls to 0, the charge falls to 0 with it — next
 * to a subscription bar that keeps climbing whether you used it or not.
 * ================================================================== */
export function drawMeterScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const compact = width < 820;

	const axes = range(progress, 0.0, 0.14);
	const runIn = range(progress, 0.12, 0.44); // the workload runs
	const meterIn = range(progress, 0.4, 0.66); // the meter tracks it
	const stopIn = range(progress, 0.62, 0.84); // it stops when you stop
	const subIn = range(progress, 0.8, 1.0); // the subscription contrast

	const chartW = compact ? width * 0.82 : Math.min(width * 0.3, 440);
	const chartH = compact ? height * 0.2 : Math.min(height * 0.3, 220);
	const stageCx = compact ? width * 0.5 : width * (align === 'right' ? 0.3 : 0.66);
	const ox = compact ? (width - chartW) / 2 : stageCx - chartW / 2;
	const oy = compact ? height * 0.16 : height * 0.42 - chartH / 2;

	// Usage: two bursts of work, a true idle in between, then nothing.
	// Pay tracks this rate — not a running total — so idle is actually 0.
	const usage = (t) => {
		if (t < 0.12) return 0;
		if (t < 0.34) return 0.55 + 0.25 * Math.sin(t * 40);
		if (t < 0.42) return 0;
		if (t < 0.62) return 0.78 + 0.18 * Math.sin(t * 33);
		return 0;
	};
	const px = (t) => ox + t * chartW;
	const py = (v) => oy + chartH - clamp(v) * chartH;

	// --- Baseline ---
	ctx.save();
	ctx.globalAlpha = smoothstep(axes);
	ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.16);
	ctx.lineWidth = 1;
	for (let i = 0; i <= 3; i++) {
		const y = oy + (chartH / 3) * i;
		ctx.beginPath();
		ctx.moveTo(ox, y);
		ctx.lineTo(ox + chartW, y);
		ctx.stroke();
	}
	ctx.restore();

	// --- Usage area, drawn left to right as the scene runs ---
	const rf = smoothstep(runIn);
	if (rf > 0) {
		ctx.save();
		ctx.globalAlpha = 0.26;
		ctx.beginPath();
		ctx.moveTo(px(0), py(0));
		for (let t = 0; t <= rf; t += 0.01) ctx.lineTo(px(t), py(usage(t)));
		ctx.lineTo(px(rf), py(0));
		ctx.closePath();
		ctx.fillStyle = palette.node;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 2.2;
		ctx.beginPath();
		for (let t = 0; t <= rf; t += 0.01) {
			const X = px(t);
			const Y = py(usage(t));
			if (t === 0) ctx.moveTo(X, Y);
			else ctx.lineTo(X, Y);
		}
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = rf;
		ctx.font = `700 ${compact ? 11 : 13}px ${palette.fontBody || 'Lato, sans-serif'}`;
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.75);
		ctx.fillText(t('viz.users.computeUsed'), ox, oy - 12);
		ctx.restore();
	}

	// --- What you pay tracks current usage. Idle → 0, running → the rate. ---
	const mf = smoothstep(meterIn);
	if (mf > 0) {
		ctx.save();
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 2.4;
		ctx.beginPath();
		for (let t = 0; t <= rf + 0.0001; t += 0.01) {
			const X = px(t);
			const Y = py(usage(t));
			if (t === 0) ctx.moveTo(X, Y);
			else ctx.lineTo(X, Y);
		}
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = mf;
		ctx.font = `700 ${compact ? 11 : 13}px ${palette.fontBody || 'Lato, sans-serif'}`;
		ctx.fillStyle = palette.accent;
		ctx.fillText(t('viz.users.whatYouPay'), ox, oy - 30);
		ctx.restore();
	}

	// --- The stop: the meter flatlines when the job ends ---
	if (stopIn > 0) {
		const f = smoothstep(stopIn);
		const stopX = px(0.62);
		ctx.save();
		ctx.globalAlpha = f;
		ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.5);
		ctx.lineWidth = 1.6;
		ctx.setLineDash([4, 4]);
		ctx.beginPath();
		ctx.moveTo(stopX, oy - 4);
		ctx.lineTo(stopX, oy + chartH + 4);
		ctx.stroke();
		ctx.setLineDash([]);
		// Flat line onward: zero usage, zero charge.
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 2.4;
		ctx.beginPath();
		ctx.moveTo(stopX, py(0));
		ctx.lineTo(stopX + (chartW - (stopX - ox)) * f * 0.99, py(0));
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = f;
		ctx.font = `700 ${compact ? 10 : 12}px ${palette.fontBody || 'Lato, sans-serif'}`;
		ctx.textAlign = 'center';
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.7);
		ctx.fillText(t('viz.users.chargingStops'), stopX + 4, oy + chartH + 32);
		ctx.textAlign = 'left';
		ctx.restore();
	}

	// --- The contrast: a subscription that never stops ---
	if (subIn > 0) {
		const f = smoothstep(subIn);
		const sy = compact ? oy + chartH + 74 : oy + chartH + 82;
		ctx.save();
		ctx.globalAlpha = f * 0.75;
		ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.42);
		ctx.lineWidth = 2;
		ctx.setLineDash([6, 5]);
		ctx.beginPath();
		ctx.moveTo(ox, sy);
		ctx.lineTo(ox + chartW, sy - chartH * 0.42 * f);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.font = `500 ${compact ? 10 : 12}px ${palette.fontBody || 'Lato, sans-serif'}`;
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.6);
		ctx.fillText(t('viz.users.subscription'), ox, sy + 20);
		ctx.restore();
	}

	// --- Settlement chips flying off as executions complete ---
	if (meterIn > 0.3) {
		for (let i = 0; i < 4; i++) {
			const t = ((time * 0.4 + i * 0.25) % 1);
			const from = i % 2 === 0 ? 0.25 : 0.55;
			packet(
				ctx,
				px(from),
				py(usage(from)),
				px(from),
				oy - 46,
				t,
				palette.accent,
				smoothstep(meterIn) * 0.9,
				3
			);
		}
	}
}
