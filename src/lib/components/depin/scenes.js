/*
 * src/lib/components/depin/scenes.js
 * ------------------------------------------------------------------
 * Procedural canvas scenes for the DePIN page, each scrubbed by the
 * scroll progress that PinnedScene feeds in.
 *
 * The zoox.com reference uses pre-rendered frame sequences. We have no
 * render/photo assets for Celaut, so every scene here is drawn from
 * code instead: same "scroll scrubs a movie" feel, but a few KB of
 * maths rather than a few hundred MB of JPEGs — and, crucially, the
 * visuals re-theme instantly because every colour is resolved from the
 * CSS custom properties at draw time.
 *
 * Each export has the signature:
 *   draw(ctx, { width, height, progress, palette, mouse, time })
 * and must be a pure function of those inputs (no hidden state), so a
 * single static paint at progress = 1 is a valid reduced-motion
 * fallback.
 *
 * The shared primitives (rand/rgba/roundRect/backdrop/stage, and the
 * hero peer field) now live in $lib/components/immersive/scene-kit.js
 * because /, /developers and /users draw with the same toolbox.
 */

import { clamp, range, smoothstep } from '$lib/motion.js';
import {
	rand,
	rgba,
	roundRect,
	backdrop,
	stage
} from '$lib/components/immersive/scene-kit.js';

/* ==================================================================
 * SCENE 1 — "Rent your PC"
 * An idle machine wakes up, splits into rentable compute slices, and
 * ships them out to paying peers. This is the page's core promise, so
 * it is the first thing the visitor scrubs through.
 * ================================================================== */
export function drawRentScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);
	const unit = 120 * scale;

	const wake = range(progress, 0.0, 0.22); // machine powers on
	const split = range(progress, 0.22, 0.55); // chassis fans into slices
	const ship = range(progress, 0.5, 0.85); // slices fly to peers
	const earn = range(progress, 0.78, 1.0); // value flows home

	const bodyW = unit * 1.5;
	const bodyH = unit * 1.9;
	const x = cx - bodyW / 2;
	const y = cy - bodyH / 2;

	// Cursor tilt — a few degrees of "hold it in your hands" parallax.
	ctx.save();
	ctx.translate(cx, cy);
	ctx.rotate((mouse.x - 0.5) * 0.06);
	ctx.translate(-cx, -cy);

	// --- Chassis ---
	ctx.save();
	ctx.globalAlpha = 0.35 + 0.65 * smoothstep(wake);
	ctx.strokeStyle = palette.node;
	ctx.lineWidth = 2 * Math.max(1, scale * 0.9);
	roundRect(ctx, x, y, bodyW, bodyH, 14 * scale);
	ctx.stroke();
	ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.04);
	ctx.fill();
	ctx.restore();

	// Power LED — the "it's on, and idle" beat.
	const pulse = 0.55 + 0.45 * Math.sin(time * 2.2);
	ctx.save();
	ctx.globalAlpha = smoothstep(wake);
	ctx.fillStyle = palette.node;
	ctx.beginPath();
	ctx.arc(x + bodyW - 18 * scale, y + 18 * scale, 4.2 * scale, 0, Math.PI * 2);
	ctx.globalAlpha *= 0.35 + 0.65 * pulse;
	ctx.fill();
	ctx.restore();

	// --- Compute slices ---
	// 6 bays. As `split` runs they fan apart; as `ship` runs the upper
	// ones detach and travel to peers — the machine literally being
	// carved into sellable capacity.
	const SLICES = 6;
	const sliceH = (bodyH - 34 * scale) / SLICES;
	const peers = [];
	const peerCount = compact ? 4 : 5;
	// Keep the peer ring inside the stage half so slices never fly across
	// the caption on their way out.
	const ringR = Math.min(width * (compact ? 0.34 : 0.17), height * 0.4);
	for (let i = 0; i < peerCount; i++) {
		const a = (i / peerCount) * Math.PI * 2 + 0.5;
		peers.push({ x: cx + Math.cos(a) * ringR, y: cy + Math.sin(a) * ringR * 0.95 });
	}

	for (let i = 0; i < SLICES; i++) {
		const t = i / (SLICES - 1);
		const fan = smoothstep(clamp(split * 1.4 - t * 0.35)) * 12 * scale * (t - 0.5) * 2;
		const sx = x + 17 * scale;
		const sy = y + 17 * scale + i * sliceH + fan;
		const sw = bodyW - 34 * scale;
		const sh = sliceH - 6 * scale;

		// Slices 1,2,4 are the ones rented out.
		const rented = i === 1 || i === 2 || i === 4;
		const travel = rented ? smoothstep(range(ship, t * 0.25, 0.7 + t * 0.25)) : 0;
		const peer = peers[i % peers.length];
		const dx = (peer.x - (sx + sw / 2)) * travel;
		const dy = (peer.y - (sy + sh / 2)) * travel;

		ctx.save();
		ctx.globalAlpha = (0.25 + 0.75 * smoothstep(wake)) * (1 - travel * 0.15);
		ctx.translate(dx, dy);
		if (travel > 0) {
			ctx.translate(sx + sw / 2, sy + sh / 2);
			ctx.scale(1 - travel * 0.45, 1 - travel * 0.45);
			ctx.translate(-(sx + sw / 2), -(sy + sh / 2));
		}
		roundRect(ctx, sx, sy, sw, sh, 5 * scale);
		ctx.fillStyle = rented
			? rgba(palette.onSurfaceRgb, 0.06 + 0.16 * Math.max(travel, split))
			: rgba(palette.onSurfaceRgb, 0.05);
		ctx.fill();
		ctx.strokeStyle = rented ? palette.warm : rgba(palette.onSurfaceRgb, 0.22);
		ctx.lineWidth = 1.4 * Math.max(1, scale * 0.8);
		ctx.stroke();

		// Utilisation fill inside each rented bay.
		if (rented) {
			const fill = smoothstep(clamp(split * 1.2 - t * 0.2));
			ctx.fillStyle = palette.warm;
			ctx.globalAlpha *= 0.28;
			roundRect(ctx, sx + 2, sy + 2, (sw - 4) * fill, sh - 4, 4 * scale);
			ctx.fill();
		}
		ctx.restore();
	}
	ctx.restore();

	// --- Peers + payment flow ---
	peers.forEach((p, i) => {
		const appear = smoothstep(range(progress, 0.42 + i * 0.04, 0.66 + i * 0.04));
		if (appear <= 0) return;
		ctx.save();
		ctx.globalAlpha = appear;

		// Link back to the machine.
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.2;
		ctx.setLineDash([5, 7]);
		ctx.lineDashOffset = -time * 26;
		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.lineTo(p.x, p.y);
		ctx.stroke();
		ctx.setLineDash([]);

		ctx.fillStyle = palette.node;
		ctx.beginPath();
		ctx.arc(p.x, p.y, 7 * Math.max(0.8, scale * 0.8), 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = appear * 0.22;
		ctx.beginPath();
		ctx.arc(p.x, p.y, 16 * Math.max(0.8, scale * 0.8), 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();

		// Value travelling back: peers pay for what they used.
		if (earn > 0) {
			const k = (time * 0.42 + i * 0.2) % 1;
			const t2 = smoothstep(earn) * 1;
			const px = p.x + (cx - p.x) * k;
			const py = p.y + (cy - p.y) * k;
			ctx.save();
			ctx.globalAlpha = t2 * (1 - Math.abs(k - 0.5) * 1.2);
			ctx.fillStyle = palette.accent;
			ctx.beginPath();
			ctx.arc(px, py, 3.4, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
	});
}

/* ==================================================================
 * SCENE 2 — Fully peer-to-peer
 * The middleman platform is drawn first, then removed, and the peers
 * re-wire themselves into a direct mesh. Cursor pushes the mesh around
 * so it reads as a living network rather than a diagram.
 * ================================================================== */
export function drawP2PScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const hubIn = range(progress, 0.0, 0.2);
	const hubOut = range(progress, 0.3, 0.52); // the intermediary dissolves
	const mesh = range(progress, 0.48, 0.82); // direct links form
	const traffic = range(progress, 0.7, 1.0);

	const N = compact ? 7 : 9;
	// Radius is capped against the stage half-width, not the full canvas,
	// so the mesh stays clear of the caption column.
	const radius = Math.min(width * (compact ? 0.34 : 0.19), height * 0.36);
	const nodes = [];
	for (let i = 0; i < N; i++) {
		const a = (i / N) * Math.PI * 2 - Math.PI / 2;
		let nx = cx + Math.cos(a) * radius;
		let ny = cy + Math.sin(a) * radius * 1.05;
		// Cursor repulsion — the mesh yields to the pointer.
		const mx = mouse.x * width;
		const my = mouse.y * height;
		const dx = nx - mx;
		const dy = ny - my;
		const d = Math.hypot(dx, dy) || 1;
		const push = Math.min(46, 4200 / (d + 40));
		nx += (dx / d) * push;
		ny += (dy / d) * push;
		// Gentle idle drift so it never looks frozen.
		nx += Math.sin(time * 0.5 + i) * 3;
		ny += Math.cos(time * 0.43 + i * 1.7) * 3;
		nodes.push({ x: nx, y: ny });
	}

	// --- Stage 1: everything routed through a central intermediary ---
	const hubAlpha = smoothstep(hubIn) * (1 - smoothstep(hubOut));
	if (hubAlpha > 0.01) {
		ctx.save();
		ctx.globalAlpha = hubAlpha;
		nodes.forEach((n) => {
			ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.3);
			ctx.lineWidth = 1.3;
			ctx.beginPath();
			ctx.moveTo(n.x, n.y);
			ctx.lineTo(cx, cy);
			ctx.stroke();
		});

		// The hub itself, shaking apart as it is removed.
		const shake = smoothstep(hubOut) * 6;
		const hw = 92 * scale * (1 - smoothstep(hubOut) * 0.5);
		ctx.translate(cx + (rand(Math.floor(time * 30)) - 0.5) * shake, cy);
		roundRect(ctx, -hw / 2, -hw / 2, hw, hw, 12 * scale);
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.09);
		ctx.fill();
		ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.45);
		ctx.lineWidth = 1.6;
		ctx.stroke();

		// A slash through it once it starts dissolving.
		if (hubOut > 0) {
			ctx.globalAlpha = hubAlpha * smoothstep(hubOut);
			ctx.strokeStyle = palette.accent;
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(-hw * 0.42, -hw * 0.42);
			ctx.lineTo(hw * 0.42, hw * 0.42);
			ctx.stroke();
		}
		ctx.restore();
	}

	// Debris from the dissolved intermediary.
	if (hubOut > 0 && hubOut < 1) {
		const f = smoothstep(hubOut);
		for (let i = 0; i < 16; i++) {
			const a = rand(i) * Math.PI * 2;
			const d = f * 180 * scale * (0.4 + rand(i + 40));
			ctx.save();
			ctx.globalAlpha = (1 - f) * 0.6;
			ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.5);
			ctx.fillRect(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 3.5, 3.5);
			ctx.restore();
		}
	}

	// --- Stage 2: direct peer-to-peer mesh ---
	const meshF = smoothstep(mesh);
	if (meshF > 0) {
		ctx.save();
		for (let i = 0; i < N; i++) {
			for (let j = i + 1; j < N; j++) {
				// Stagger link formation so the mesh "weaves" into being.
				const order = ((i * 7 + j * 3) % N) / N;
				const t = smoothstep(clamp((meshF - order * 0.5) / 0.5));
				if (t <= 0.01) continue;
				const a = nodes[i];
				const b = nodes[j];
				ctx.globalAlpha = t * 0.5;
				ctx.strokeStyle = palette.link;
				ctx.lineWidth = 1.1;
				ctx.beginPath();
				ctx.moveTo(a.x, a.y);
				ctx.lineTo(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
				ctx.stroke();
			}
		}
		ctx.restore();
	}

	// --- Stage 3: packets moving peer → peer, no hop in the middle ---
	if (traffic > 0) {
		const packets = compact ? 8 : 14;
		for (let p = 0; p < packets; p++) {
			const i = Math.floor(rand(p) * N);
			const j = (i + 1 + Math.floor(rand(p + 90) * (N - 1))) % N;
			const k = (time * (0.22 + rand(p + 7) * 0.3) + rand(p + 3)) % 1;
			const a = nodes[i];
			const b = nodes[j];
			ctx.save();
			ctx.globalAlpha = smoothstep(traffic) * (1 - Math.abs(k - 0.5) * 1.1);
			ctx.fillStyle = p % 3 === 0 ? palette.accent : palette.node;
			ctx.beginPath();
			ctx.arc(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, 3.2, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
	}

	// --- Peers on top ---
	nodes.forEach((n, i) => {
		const appear = smoothstep(range(progress, i * 0.015, 0.18 + i * 0.015));
		ctx.save();
		ctx.globalAlpha = appear;
		ctx.fillStyle = palette.node;
		ctx.beginPath();
		ctx.arc(n.x, n.y, 8 * Math.max(0.8, scale * 0.75), 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = appear * 0.18 * (0.6 + 0.4 * Math.sin(time * 1.6 + i));
		ctx.beginPath();
		ctx.arc(n.x, n.y, 20 * Math.max(0.8, scale * 0.75), 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	});
}

/* ==================================================================
 * SCENE 3 — Electricity-aware pricing
 * A 24-hour strip: what your power actually costs, the price you set
 * on top of it, the margin between them, and the availability window
 * you choose to be online for.
 * ================================================================== */
export function drawPowerScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const compact = width < 820;

	// Chart is sized and placed inside the stage half (see `stage()`), with
	// room reserved on the right for the margin dial.
	const chartW = compact ? width * 0.84 : Math.min(width * 0.3, 460);
	const chartH = compact ? height * 0.26 : Math.min(height * 0.4, 300);
	const stageCx = compact ? width * 0.5 : width * (align === 'right' ? 0.3 : 0.66);
	const ox = compact ? (width - chartW) / 2 : stageCx - chartW / 2 - (compact ? 0 : 40);
	const oy = compact ? height * 0.16 : height * 0.5 - chartH / 2 - 10;

	const axes = range(progress, 0.0, 0.16);
	const costIn = range(progress, 0.12, 0.42); // electricity cost curve
	const priceIn = range(progress, 0.4, 0.66); // the price you set
	const marginIn = range(progress, 0.58, 0.8); // what you keep
	const windowIn = range(progress, 0.76, 1.0); // availability window

	// Cost of power over 24h — cheap at night, expensive at the peak.
	const cost = (h) => 0.32 + 0.3 * Math.sin(((h - 7) / 24) * Math.PI * 2) + 0.06 * Math.sin(h * 0.9);
	const price = (h) => cost(h) + 0.26 + 0.05 * Math.sin(h * 0.5);
	const px = (h) => ox + (h / 24) * chartW;
	const py = (v) => oy + chartH - clamp(v / 1.05) * chartH;

	// --- Axes / gridlines ---
	ctx.save();
	ctx.globalAlpha = smoothstep(axes);
	ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.16);
	ctx.lineWidth = 1;
	for (let i = 0; i <= 4; i++) {
		const y = oy + (chartH / 4) * i;
		ctx.beginPath();
		ctx.moveTo(ox, y);
		ctx.lineTo(ox + chartW, y);
		ctx.stroke();
	}
	ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.55);
	ctx.font = `500 ${compact ? 10 : 12}px Lato, sans-serif`;
	['00:00', '06:00', '12:00', '18:00', '24:00'].forEach((lbl, i) => {
		ctx.fillText(lbl, px(i * 6) - (i === 0 ? 0 : i === 4 ? 34 : 17), oy + chartH + 18);
	});
	ctx.restore();

	// --- Margin band (drawn under both lines) ---
	if (marginIn > 0) {
		const f = smoothstep(marginIn);
		ctx.save();
		ctx.globalAlpha = f * 0.28;
		ctx.beginPath();
		ctx.moveTo(px(0), py(price(0)));
		for (let h = 0; h <= 24; h += 0.5) ctx.lineTo(px(h), py(price(h)));
		for (let h = 24; h >= 0; h -= 0.5) ctx.lineTo(px(h), py(cost(h)));
		ctx.closePath();
		ctx.fillStyle = palette.accent;
		ctx.fill();
		ctx.restore();
	}

	// --- Cost curve ---
	const drawCurve = (fn, colour, t, dashed) => {
		if (t <= 0) return;
		const f = smoothstep(t);
		ctx.save();
		ctx.strokeStyle = colour;
		ctx.lineWidth = 2.4;
		if (dashed) ctx.setLineDash([6, 5]);
		ctx.beginPath();
		for (let h = 0; h <= 24 * f; h += 0.25) {
			const X = px(h);
			const Y = py(fn(h));
			if (h === 0) ctx.moveTo(X, Y);
			else ctx.lineTo(X, Y);
		}
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();
	};
	drawCurve(cost, rgba(palette.onSurfaceRgb, 0.62), costIn, true);
	drawCurve(price, palette.warm, priceIn, false);

	// --- Legend ---
	if (costIn > 0) {
		ctx.save();
		ctx.font = `700 ${compact ? 11 : 13}px Lato, sans-serif`;
		ctx.globalAlpha = smoothstep(costIn);
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.72);
		ctx.fillText(t('viz.depin.electricityCost'), ox, oy - 26);
		ctx.globalAlpha = smoothstep(priceIn);
		ctx.fillStyle = palette.warm;
		ctx.fillText(t('viz.depin.priceYouSet'), ox, oy - 8);
		ctx.restore();
	}

	// --- Availability window: the hours you choose to be online ---
	if (windowIn > 0) {
		const f = smoothstep(windowIn);
		const from = 22;
		const span = 9; // 22:00 → 07:00, the cheap overnight stretch
		ctx.save();
		ctx.globalAlpha = f * 0.16;
		ctx.fillStyle = palette.node;
		// Wraps past midnight, so it's two rects.
		ctx.fillRect(px(from), oy, chartW * ((24 - from) / 24) * f, chartH);
		ctx.fillRect(ox, oy, chartW * ((span - (24 - from)) / 24) * f, chartH);
		ctx.globalAlpha = f;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.6;
		ctx.setLineDash([4, 4]);
		ctx.beginPath();
		ctx.moveTo(px(from), oy);
		ctx.lineTo(px(from), oy + chartH);
		ctx.moveTo(px(span - (24 - from)), oy);
		ctx.lineTo(px(span - (24 - from)), oy + chartH);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.font = `700 ${compact ? 10 : 12}px Lato, sans-serif`;
		ctx.fillStyle = palette.node;
		ctx.fillText(t('viz.depin.availableWindow'), ox + 8, oy + chartH - 10);
		ctx.restore();
	}

	// --- Live meter dial: ticks up as the scene resolves ---
	const dialR = compact ? 38 : 56;
	const dx = compact ? width * 0.5 : ox + chartW + dialR + 44;
	const dy = compact ? oy + chartH + 86 : oy + chartH / 2;
	if (dx + dialR < width - 8) {
		const f = smoothstep(range(progress, 0.5, 1));
		ctx.save();
		ctx.translate(dx, dy);
		ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.18);
		ctx.lineWidth = 8;
		ctx.beginPath();
		ctx.arc(0, 0, dialR, Math.PI * 0.75, Math.PI * 2.25);
		ctx.stroke();
		ctx.strokeStyle = palette.accent;
		ctx.lineCap = 'round';
		ctx.beginPath();
		ctx.arc(0, 0, dialR, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * f);
		ctx.stroke();
		ctx.fillStyle = palette.onSurface;
		ctx.textAlign = 'center';
		ctx.font = `700 ${compact ? 15 : 20}px Lato, sans-serif`;
		ctx.fillText(`${Math.round(f * 100)}%`, 0, compact ? -2 : 0);
		ctx.font = `500 ${compact ? 9 : 11}px Lato, sans-serif`;
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.7);
		ctx.fillText(t('viz.depin.marginCovered'), 0, compact ? 14 : 20);
		ctx.textAlign = 'left';
		ctx.restore();
	}

	// Drifting energy sparks along the price line, once it exists.
	if (priceIn > 0.4) {
		for (let i = 0; i < 5; i++) {
			const h = ((time * 2.2 + i * 5) % 24);
			ctx.save();
			ctx.globalAlpha = 0.6 * smoothstep(priceIn);
			ctx.fillStyle = palette.accent;
			ctx.beginPath();
			ctx.arc(px(h), py(price(h)), 2.8, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
	}
}

/* ==================================================================
 * SCENE 4 — Full execution isolation (microVMs)
 * A workload's particles are gathered up, a hardware-backed boundary
 * is sealed around them, neighbouring workloads get their own, and an
 * escape attempt bounces off the wall.
 * ================================================================== */
export function drawIsolationScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const gather = range(progress, 0.0, 0.24); // workload coalesces
	const seal = range(progress, 0.22, 0.55); // the box draws + closes
	const neighbours = range(progress, 0.5, 0.76); // siblings appear, each sealed
	const attack = range(progress, 0.76, 1.0); // escape attempt deflected

	const boxW = (compact ? 190 : 250) * Math.max(0.85, scale * 0.85);
	const boxH = boxW * 0.78;
	const bx = cx - boxW / 2;
	const by = cy - boxH / 2;

	// --- Workload particles ---
	const P = compact ? 24 : 38;
	for (let i = 0; i < P; i++) {
		const g = smoothstep(gather);
		const a = rand(i) * Math.PI * 2 + time * (0.1 + rand(i + 5) * 0.25);
		const wild = (compact ? 130 : 175) * (0.5 + rand(i + 11));
		const tame = (boxW * 0.34) * (0.25 + rand(i + 23) * 0.7);
		const r = wild + (tame - wild) * g;
		const x = cx + Math.cos(a) * r;
		const y = cy + Math.sin(a) * r * 0.8;
		ctx.save();
		ctx.globalAlpha = 0.35 + 0.5 * g;
		ctx.fillStyle = i % 4 === 0 ? palette.accent : palette.node;
		ctx.beginPath();
		ctx.arc(x, y, 2 + rand(i + 31) * 2.2, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}

	// --- The microVM boundary, drawn edge by edge then locked ---
	const s = smoothstep(seal);
	if (s > 0) {
		ctx.save();
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 2.6 * Math.max(1, scale * 0.8);
		ctx.lineCap = 'round';
		const edges = [
			[bx, by, bx + boxW, by],
			[bx + boxW, by, bx + boxW, by + boxH],
			[bx + boxW, by + boxH, bx, by + boxH],
			[bx, by + boxH, bx, by]
		];
		edges.forEach((e, i) => {
			const t = clamp((s - i * 0.2) / 0.4);
			if (t <= 0) return;
			ctx.beginPath();
			ctx.moveTo(e[0], e[1]);
			ctx.lineTo(e[0] + (e[2] - e[0]) * t, e[1] + (e[3] - e[1]) * t);
			ctx.stroke();
		});

		// Interior tint + a scanning line while it seals.
		if (s > 0.85) {
			ctx.globalAlpha = 0.08;
			ctx.fillStyle = palette.node;
			roundRect(ctx, bx, by, boxW, boxH, 4);
			ctx.fill();
			ctx.globalAlpha = 0.35;
			const scanY = by + ((time * 60) % boxH);
			ctx.strokeStyle = palette.node;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(bx, scanY);
			ctx.lineTo(bx + boxW, scanY);
			ctx.stroke();
		}

		// Lock glyph — the seal is closed.
		if (s > 0.95) {
			const lr = 13 * Math.max(0.9, scale * 0.8);
			ctx.globalAlpha = 1;
			ctx.translate(cx, by - lr * 1.6);
			ctx.strokeStyle = palette.accent;
			ctx.lineWidth = 2.2;
			ctx.beginPath();
			ctx.arc(0, -lr * 0.35, lr * 0.5, Math.PI, 0);
			ctx.stroke();
			roundRect(ctx, -lr * 0.72, -lr * 0.35, lr * 1.44, lr, 3);
			ctx.fillStyle = palette.accent;
			ctx.fill();
		}
		ctx.restore();
	}

	// --- Neighbouring workloads, each in their own sealed box ---
	if (neighbours > 0) {
		const f = smoothstep(neighbours);
		// Kept tight around the sealed box so sibling VMs stay inside the
		// stage half and never drift under the caption column.
		const offs = compact
			? [
					[-1, -1.05],
					[1, 1.05]
				]
			: [
					[-1.06, -0.66],
					[1.06, -0.66],
					[-1.06, 0.66],
					[1.06, 0.66]
				];
		offs.forEach((o, i) => {
			const t = smoothstep(clamp((f - i * 0.12) / 0.6));
			if (t <= 0) return;
			const w = boxW * 0.4;
			const h = boxH * 0.4;
			const nx = cx + o[0] * boxW * 0.74 - w / 2;
			const ny = cy + o[1] * boxH * 0.86 - h / 2;
			ctx.save();
			ctx.globalAlpha = t * 0.85;
			roundRect(ctx, nx, ny, w, h, 4);
			ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.4);
			ctx.lineWidth = 1.6;
			ctx.stroke();
			ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.05);
			ctx.fill();
			// Its own little payload, visibly not touching ours.
			for (let k = 0; k < 5; k++) {
				ctx.globalAlpha = t * 0.6;
				ctx.fillStyle = palette.node;
				ctx.beginPath();
				ctx.arc(
					nx + w * (0.2 + rand(i * 10 + k) * 0.6),
					ny + h * (0.2 + rand(i * 10 + k + 50) * 0.6),
					1.8,
					0,
					Math.PI * 2
				);
				ctx.fill();
			}
			ctx.restore();
		});
	}

	// --- Escape attempt, deflected by the boundary ---
	if (attack > 0) {
		const f = smoothstep(attack);
		const k = (time * 0.7) % 1;
		const startX = cx - boxW * 1.2;
		const startY = cy - boxH * 1.0;
		const hitX = bx;
		const hitY = by + boxH * 0.34;
		const travel = Math.min(1, k * 2);
		ctx.save();
		ctx.globalAlpha = f * 0.9;
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(startX + (hitX - startX) * travel, startY + (hitY - startY) * travel);
		ctx.stroke();

		if (k > 0.5) {
			// Ricochet + impact flare: it does not get in.
			const b = (k - 0.5) * 2;
			ctx.beginPath();
			ctx.moveTo(hitX, hitY);
			ctx.lineTo(hitX - boxW * 0.7 * b, hitY + boxH * 0.9 * b);
			ctx.globalAlpha = f * (1 - b);
			ctx.stroke();
			ctx.globalAlpha = f * (1 - b) * 0.8;
			ctx.fillStyle = palette.accent;
			ctx.beginPath();
			ctx.arc(hitX, hitY, 6 + 14 * b, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}
}
