/*
 * src/lib/components/home/scenes.js
 * ------------------------------------------------------------------
 * Procedural canvas scenes for the landing page.
 *
 * The home page's job is to explain the paradigm itself, so these
 * scenes re-stage the motifs the site already owns — Conway's Game of
 * Life, the node network, the BOX/API/NET diagram — as scroll-scrubbed
 * sequences rather than static illustrations.
 *
 *   1. automata     — simple local rules → emergent global behaviour
 *   2. nodes        — a network with no centre, and no centre to remove
 *   3. service      — the black box: a sealed, deterministic container
 *   4. spec         — BOX / API / NET, the three components
 *   5. determinism  — the same input, run in three places, three times
 *   6. coordination — reputation and payment, the trustless glue
 *
 * All pure functions of (progress, palette, mouse, time).
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
 * SCENE 1 — Foundations in cellular automata
 * A Game-of-Life field runs deterministically from a fixed seed. As
 * the scene progresses the generation count advances, so scrolling
 * literally steps the automaton forward: simple rules, complex result.
 * ================================================================== */

// A deterministic Life field. Same seed → same generations, always,
// which is what lets this be scrubbed forwards and backwards.
function lifeAt(cols, rows, generation, seedFn) {
	let grid = new Uint8Array(cols * rows);
	for (let i = 0; i < grid.length; i++) grid[i] = seedFn(i);
	for (let g = 0; g < generation; g++) {
		const next = new Uint8Array(cols * rows);
		for (let x = 0; x < cols; x++) {
			for (let y = 0; y < rows; y++) {
				let n = 0;
				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -1; dy <= 1; dy++) {
						if (dx === 0 && dy === 0) continue;
						const px = x + dx;
						const py = y + dy;
						if (px < 0 || py < 0 || px >= cols || py >= rows) continue;
						n += grid[px * rows + py];
					}
				}
				const cell = grid[x * rows + y];
				next[x * rows + y] = cell ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0;
			}
		}
		grid = next;
	}
	return grid;
}

export function drawAutomataScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const compact = width < 820;

	const fieldW = compact ? width * 0.86 : Math.min(width * 0.36, 520);
	const fieldH = compact ? height * 0.32 : Math.min(height * 0.56, 460);
	const stageCx = compact ? width * 0.5 : width * (align === 'right' ? 0.3 : 0.68);
	const ox = stageCx - fieldW / 2;
	const oy = compact ? height * 0.14 : height * 0.5 - fieldH / 2;

	const res = compact ? 15 : 19;
	const cols = Math.max(4, Math.floor(fieldW / res));
	const rows = Math.max(4, Math.floor(fieldH / res));

	const seedIn = range(progress, 0.0, 0.2); // cells appear
	const evolve = range(progress, 0.16, 0.82); // generations advance
	const emerge = range(progress, 0.7, 1.0); // structure is highlighted

	// Frozen seed pattern — no randomness at draw time.
	const seed = (i) => (rand(i * 3.7) > 0.62 ? 1 : 0);
	const generation = Math.floor(smoothstep(evolve) * 26);
	const grid = lifeAt(cols, rows, generation, seed);

	// --- Cells ---
	const appear = smoothstep(seedIn);
	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			if (!grid[x * rows + y]) continue;
			// Cells near the pointer lift and warm up: the field is alive.
			const cxp = ox + x * res + res / 2;
			const cyp = oy + y * res + res / 2;
			const d = Math.hypot(cxp - mouse.x * width, cyp - mouse.y * height);
			const near = clamp(1 - d / 190);
			ctx.save();
			ctx.globalAlpha = appear * (0.5 + 0.5 * near);
			ctx.fillStyle = near > 0.4 ? palette.accent : palette.node;
			const pad = 1.5 - near;
			roundRect(ctx, ox + x * res + pad, oy + y * res + pad, res - pad * 2, res - pad * 2, 2);
			ctx.fill();
			ctx.restore();
		}
	}

	// --- Frame + generation readout ---
	ctx.save();
	ctx.globalAlpha = appear * 0.5;
	ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.3);
	ctx.lineWidth = 1.4;
	ctx.strokeRect(ox, oy, cols * res, rows * res);
	ctx.restore();
	label(
		ctx,
		`generation ${String(generation).padStart(2, '0')}`,
		ox + (cols * res) / 2,
		oy + rows * res + 24,
		palette,
		appear * 0.85,
		compact ? 10 : 12
	);

	// --- The rule, stated plainly, once the field is running ---
	if (evolve > 0.1) {
		const f = smoothstep(range(progress, 0.2, 0.4));
		label(
			ctx,
			'2 or 3 neighbours: live · exactly 3: born',
			ox + (cols * res) / 2,
			oy - 18,
			palette,
			f * 0.8,
			compact ? 10 : 12,
			500
		);
	}

	// --- Emergence: ring the structures the rules produced ---
	if (emerge > 0) {
		const f = smoothstep(emerge);
		// Find dense clusters deterministically and circle a few.
		const found = [];
		for (let x = 1; x < cols - 1 && found.length < 3; x += 2) {
			for (let y = 1; y < rows - 1 && found.length < 3; y += 2) {
				let n = 0;
				for (let dx = -1; dx <= 1; dx++)
					for (let dy = -1; dy <= 1; dy++) n += grid[(x + dx) * rows + (y + dy)];
				if (n >= 5) found.push({ x, y });
			}
		}
		found.forEach((p, i) => {
			const t = smoothstep(clamp(f * 1.4 - i * 0.2));
			if (t <= 0) return;
			ctx.save();
			ctx.globalAlpha = t * 0.85;
			ctx.strokeStyle = palette.accent;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(ox + p.x * res + res / 2, oy + p.y * res + res / 2, res * 2.4 * t, 0, Math.PI * 2);
			ctx.stroke();
			ctx.restore();
		});
	}
}

/* ==================================================================
 * SCENE 2 — Nodes: no centre to remove
 * A centralised star is drawn, then its hub is deleted and the whole
 * thing collapses. The same peers, wired as a mesh, lose a node and
 * simply route around the gap.
 * ================================================================== */
export function drawNetworkScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const star = range(progress, 0.0, 0.22); // centralised topology
	const kill = range(progress, 0.2, 0.42); // hub removed, star dies
	const mesh = range(progress, 0.4, 0.68); // peers re-wire directly
	const lose = range(progress, 0.66, 0.86); // a peer disappears
	const route = range(progress, 0.82, 1.0); // traffic finds another way

	const N = compact ? 7 : 9;
	const radius = Math.min(width * (compact ? 0.32 : 0.16), height * 0.34);
	const lost = 3;
	const nodes = [];
	for (let i = 0; i < N; i++) {
		const a = (i / N) * Math.PI * 2 - Math.PI / 2;
		let x = cx + Math.cos(a) * radius;
		let y = cy + Math.sin(a) * radius * 1.02;
		const dx = x - mouse.x * width;
		const dy = y - mouse.y * height;
		const d = Math.hypot(dx, dy) || 1;
		const push = Math.min(34, 2800 / (d + 48));
		x += (dx / d) * push;
		y += (dy / d) * push;
		nodes.push({ x, y });
	}

	// --- Phase 1: everything through a hub ---
	const starF = smoothstep(star) * (1 - smoothstep(kill));
	if (starF > 0.01) {
		ctx.save();
		ctx.globalAlpha = starF;
		nodes.forEach((n) => {
			ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.32);
			ctx.lineWidth = 1.3;
			ctx.beginPath();
			ctx.moveTo(n.x, n.y);
			ctx.lineTo(cx, cy);
			ctx.stroke();
		});
		const shake = smoothstep(kill) * 7;
		const hw = 82 * scale * (1 - smoothstep(kill) * 0.55);
		ctx.translate(cx + (rand(Math.floor(time * 30)) - 0.5) * shake, cy);
		roundRect(ctx, -hw / 2, -hw / 2, hw, hw, 10 * scale);
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.09);
		ctx.fill();
		ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.45);
		ctx.lineWidth = 1.6;
		ctx.stroke();
		if (kill > 0) {
			ctx.globalAlpha = starF * smoothstep(kill);
			ctx.strokeStyle = palette.accent;
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(-hw * 0.4, -hw * 0.4);
			ctx.lineTo(hw * 0.4, hw * 0.4);
			ctx.stroke();
		}
		ctx.restore();
		if (star > 0.4) {
			label(
				ctx,
				'a single point of failure',
				cx,
				cy + radius * 1.3,
				palette,
				starF * 0.85,
				compact ? 10 : 12
			);
		}
	}

	// --- Phase 2: direct mesh ---
	const meshF = smoothstep(mesh);
	const loseF = smoothstep(lose);
	const isGone = (i) => i === lost && loseF > 0;
	if (meshF > 0) {
		ctx.save();
		for (let i = 0; i < N; i++) {
			for (let j = i + 1; j < N; j++) {
				const order = ((i * 7 + j * 3) % N) / N;
				const t = smoothstep(clamp((meshF - order * 0.5) / 0.5));
				if (t <= 0.01) continue;
				const dead = isGone(i) || isGone(j);
				ctx.globalAlpha = t * 0.5 * (dead ? 1 - loseF : 1);
				ctx.strokeStyle = palette.link;
				ctx.lineWidth = 1.1;
				ctx.beginPath();
				ctx.moveTo(nodes[i].x, nodes[i].y);
				ctx.lineTo(
					nodes[i].x + (nodes[j].x - nodes[i].x) * t,
					nodes[i].y + (nodes[j].y - nodes[i].y) * t
				);
				ctx.stroke();
			}
		}
		ctx.restore();
	}

	// --- Phase 3: traffic routes around the gap ---
	if (route > 0) {
		const f = smoothstep(route);
		for (let p = 0; p < (compact ? 7 : 12); p++) {
			let i = Math.floor(rand(p) * N);
			let j = (i + 1 + Math.floor(rand(p + 90) * (N - 1))) % N;
			if (i === lost) i = (i + 1) % N;
			if (j === lost) j = (j + 1) % N;
			const k = (time * (0.22 + rand(p + 7) * 0.3) + rand(p + 3)) % 1;
			packet(ctx, nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, k, palette.accent, f);
		}
		label(
			ctx,
			'the network routes around it',
			cx,
			cy + radius * 1.35,
			palette,
			f * 0.9,
			compact ? 10 : 12
		);
	}

	// --- Peers ---
	nodes.forEach((n, i) => {
		const appear = smoothstep(range(progress, i * 0.012, 0.16 + i * 0.012));
		const alpha = isGone(i) ? appear * (1 - loseF) : appear;
		if (alpha <= 0.01) {
			// Leave a faint ghost where the peer used to be.
			ctx.save();
			ctx.globalAlpha = loseF * 0.35;
			ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.5);
			ctx.lineWidth = 1.2;
			ctx.setLineDash([3, 4]);
			ctx.beginPath();
			ctx.arc(n.x, n.y, 9 * Math.max(0.8, scale * 0.75), 0, Math.PI * 2);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.restore();
			return;
		}
		ctx.save();
		ctx.globalAlpha = alpha;
		ctx.fillStyle = palette.node;
		ctx.beginPath();
		ctx.arc(n.x, n.y, 8 * Math.max(0.8, scale * 0.75), 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = alpha * 0.18 * (0.6 + 0.4 * Math.sin(time * 1.6 + i));
		ctx.beginPath();
		ctx.arc(n.x, n.y, 20 * Math.max(0.8, scale * 0.75), 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	});
}

/* ==================================================================
 * SCENE 3 — Services: the black box
 * Loose machinery is gathered up and sealed. The interior goes opaque:
 * from the outside a service is defined by what goes in and what comes
 * out, and nothing else.
 * ================================================================== */
export function drawBlackBoxScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const gather = range(progress, 0.0, 0.26); // internals coalesce
	const seal = range(progress, 0.24, 0.54); // container closes
	const opaque = range(progress, 0.5, 0.74); // the inside stops mattering
	const io = range(progress, 0.7, 1.0); // input → output

	const boxW = (compact ? 176 : 230) * Math.max(0.85, scale * 0.85);
	const boxH = boxW * 0.74;
	const bx = cx - boxW / 2;
	const by = cy - boxH / 2;
	const opaqueF = smoothstep(opaque);

	// --- Internals, fading out once the box goes opaque ---
	const P = compact ? 18 : 28;
	for (let i = 0; i < P; i++) {
		const g = smoothstep(clamp(gather * 1.4 - rand(i) * 0.3));
		const a = rand(i) * Math.PI * 2 + time * (0.08 + rand(i + 5) * 0.2);
		const wild = (compact ? 150 : 200) * (0.5 + rand(i + 11));
		const tame = boxW * 0.3 * (0.25 + rand(i + 23) * 0.7);
		const r = wild + (tame - wild) * g;
		ctx.save();
		ctx.globalAlpha = (0.3 + 0.55 * g) * (1 - opaqueF * 0.95);
		ctx.fillStyle = i % 4 === 0 ? palette.accent : palette.node;
		ctx.beginPath();
		ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.8, 2 + rand(i + 31) * 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}

	// --- The container ---
	sealedBox(ctx, bx, by, boxW, boxH, seal, palette, { scan: time });

	// --- Opaque fill: you don't get to see inside, and don't need to ---
	if (opaqueF > 0) {
		ctx.save();
		ctx.globalAlpha = opaqueF * 0.9;
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.1);
		roundRect(ctx, bx + 1, by + 1, boxW - 2, boxH - 2, 4);
		ctx.fill();
		// Hatching, to read unmistakably as "sealed".
		ctx.clip();
		ctx.globalAlpha = opaqueF * 0.22;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1;
		for (let x = -boxH; x < boxW; x += 10) {
			ctx.beginPath();
			ctx.moveTo(bx + x, by);
			ctx.lineTo(bx + x + boxH, by + boxH);
			ctx.stroke();
		}
		ctx.restore();
		label(ctx, 'black box', cx, cy + 5, palette, opaqueF, compact ? 13 : 16);
	}

	// --- Input and output, the only surface that exists ---
	if (io > 0) {
		const f = smoothstep(io);
		const reach = (compact ? 70 : 110) * f;
		ctx.save();
		ctx.globalAlpha = f;
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 2.2;
		ctx.beginPath();
		ctx.moveTo(bx - reach, cy);
		ctx.lineTo(bx, cy);
		ctx.moveTo(bx + boxW, cy);
		ctx.lineTo(bx + boxW + reach, cy);
		ctx.stroke();
		ctx.restore();
		label(ctx, 'input', bx - reach / 2, cy - 14, palette, f, compact ? 10 : 12);
		label(ctx, 'output', bx + boxW + reach / 2, cy - 14, palette, f, compact ? 10 : 12);
		for (let i = 0; i < 3; i++) {
			const k = (time * 0.5 + i * 0.33) % 1;
			packet(ctx, bx - reach, cy, bx, cy, k, palette.accent, f);
			packet(ctx, bx + boxW, cy, bx + boxW + reach, cy, k, palette.node, f);
		}
	}
}

/* ==================================================================
 * SCENE 4 — The three components
 * The existing BOX / API / NET diagram, but assembled: the container
 * first, then the interface, then the network scope, each labelled as
 * it arrives.
 * ================================================================== */
export function drawSpecTriadScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const boxIn = range(progress, 0.0, 0.3);
	const apiIn = range(progress, 0.28, 0.56);
	const netIn = range(progress, 0.54, 0.8);
	const together = range(progress, 0.76, 1.0);

	const r = (compact ? 44 : 58) * Math.max(0.85, scale * 0.8);
	const spread = r * 2.1;
	const parts = [
		{ key: 'BOX', t: boxIn, x: cx, y: cy - spread * 0.52, colour: palette.node },
		{ key: 'API', t: apiIn, x: cx - spread * 0.62, y: cy + spread * 0.4, colour: palette.accent },
		{ key: 'NET', t: netIn, x: cx + spread * 0.62, y: cy + spread * 0.4, colour: palette.node }
	];

	// --- Connecting triangle, drawn as the parts arrive ---
	const tg = smoothstep(together);
	if (apiIn > 0) {
		ctx.save();
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.6;
		ctx.setLineDash([6, 7]);
		ctx.lineDashOffset = -time * 16;
		for (let i = 0; i < parts.length; i++) {
			const a = parts[i];
			const b = parts[(i + 1) % parts.length];
			const t = smoothstep(Math.min(clamp(a.t), clamp(b.t)));
			if (t <= 0) continue;
			ctx.globalAlpha = t * 0.6;
			ctx.beginPath();
			ctx.moveTo(a.x, a.y);
			ctx.lineTo(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
			ctx.stroke();
		}
		ctx.setLineDash([]);
		ctx.restore();
	}

	// --- The three discs ---
	parts.forEach((p, i) => {
		const f = smoothstep(p.t);
		if (f <= 0) return;
		const rr = r * (0.7 + 0.3 * f) * (1 + tg * 0.04 * Math.sin(time * 1.6 + i));
		ctx.save();
		ctx.globalAlpha = f;
		ctx.beginPath();
		ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.06);
		ctx.fill();
		ctx.strokeStyle = p.colour;
		ctx.lineWidth = 2.4;
		ctx.stroke();
		// A soft halo once everything is in place.
		if (tg > 0) {
			ctx.globalAlpha = tg * 0.14;
			ctx.beginPath();
			ctx.arc(p.x, p.y, rr * 1.5, 0, Math.PI * 2);
			ctx.fillStyle = p.colour;
			ctx.fill();
		}
		ctx.restore();
		label(ctx, p.key, p.x, p.y + 6, palette, f, compact ? 14 : 18);
	});

	// --- What each one is, spelled out ---
	if (together > 0) {
		const captions = [
			['environment', parts[0].x, parts[0].y - r - 16],
			['interface', parts[1].x, parts[1].y + r + 24],
			['network scope', parts[2].x, parts[2].y + r + 24]
		];
		captions.forEach((c, i) => {
			const t = smoothstep(clamp(tg * 1.4 - i * 0.15));
			label(ctx, c[0], c[1], c[2], palette, t * 0.85, compact ? 10 : 12, 500);
		});
	}
}

/* ==================================================================
 * SCENE 5 — Determinism
 * The same input is dispatched to three different nodes, at three
 * different times, and all three return an identical result.
 * ================================================================== */
export function drawDeterminismScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const input = range(progress, 0.0, 0.2);
	const split = range(progress, 0.18, 0.46); // three runs dispatched
	const exec = range(progress, 0.42, 0.72); // each executes
	const match = range(progress, 0.68, 1.0); // identical outputs

	const lanes = compact ? 2 : 3;
	const laneGap = (compact ? 72 : 88) * Math.max(0.85, scale * 0.8);
	const laneW = (compact ? 120 : 150) * Math.max(0.85, scale * 0.8);
	const startX = cx - laneW * 0.62;
	const topY = cy - ((lanes - 1) / 2) * laneGap;
	const when = ['now', 'in a year', 'on other hardware'];

	// --- The input, on the left ---
	const inF = smoothstep(input);
	ctx.save();
	ctx.globalAlpha = inF;
	ctx.fillStyle = palette.accent;
	ctx.beginPath();
	ctx.arc(startX - laneW * 0.5, cy, 13 * Math.max(0.85, scale * 0.8), 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
	label(ctx, 'one input', startX - laneW * 0.5, cy + 32, palette, inF, compact ? 10 : 12);

	for (let i = 0; i < lanes; i++) {
		const y = topY + i * laneGap;
		const t = smoothstep(clamp(split * 1.4 - i * 0.1));
		if (t <= 0) continue;

		// Branch line out to the lane.
		ctx.save();
		ctx.globalAlpha = t * 0.6;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.4;
		ctx.beginPath();
		ctx.moveTo(startX - laneW * 0.5 + 14, cy);
		ctx.lineTo(startX - laneW * 0.5 + 14 + (startX - (startX - laneW * 0.5 + 14)) * t, cy + (y - cy) * t);
		ctx.stroke();
		ctx.restore();

		// The node that runs it.
		const e = smoothstep(clamp(exec * 1.4 - i * 0.1));
		sealedBox(ctx, startX, y - 18 * Math.max(0.85, scale * 0.8), laneW * 0.5, 36 * Math.max(0.85, scale * 0.8), e, palette, {
			scan: time + i
		});
		if (!compact || i < 2) {
			label(ctx, when[i], startX + laneW * 0.25, y - 28 * Math.max(0.85, scale * 0.8), palette, e * 0.8, compact ? 9 : 11, 500);
		}

		// Result travelling out to the right.
		const m = smoothstep(clamp(match * 1.3 - i * 0.08));
		if (m > 0) {
			const outX = startX + laneW * 1.05;
			ctx.save();
			ctx.globalAlpha = m * 0.6;
			ctx.strokeStyle = palette.link;
			ctx.lineWidth = 1.3;
			ctx.beginPath();
			ctx.moveTo(startX + laneW * 0.5, y);
			ctx.lineTo(startX + laneW * 0.5 + (outX - startX - laneW * 0.5) * m, y);
			ctx.stroke();
			ctx.restore();
			// The identical output value.
			ctx.save();
			ctx.globalAlpha = m;
			ctx.font = `700 ${compact ? 11 : 13}px Lato, sans-serif`;
			ctx.fillStyle = palette.node;
			ctx.fillText('a1f3…9c2e', outX + 8, y + 4);
			ctx.restore();
			const k = (time * 0.55 + i * 0.25) % 1;
			packet(ctx, startX + laneW * 0.5, y, outX, y, k, palette.accent, m);
		}
	}

	// --- The verdict ---
	if (match > 0.5) {
		const f = smoothstep(range(progress, 0.85, 1));
		label(
			ctx,
			'identical, every time',
			cx + laneW * 0.2,
			topY + (lanes - 1) * laneGap + 56,
			palette,
			f * 0.9,
			compact ? 11 : 13
		);
	}
}

/* ==================================================================
 * SCENE 6 — Coordination without trust
 * Two parties who don't trust each other still transact: value moves
 * one way, an opinion is recorded on a ledger, and the next party
 * weighs it through the sources they already trust.
 * ================================================================== */
export function drawTrustScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const two = range(progress, 0.0, 0.2); // two strangers
	const pay = range(progress, 0.18, 0.46); // value moves
	const record = range(progress, 0.42, 0.7); // an opinion is recorded
	const weigh = range(progress, 0.66, 1.0); // others weigh the source

	const gap = (compact ? 96 : 130) * Math.max(0.85, scale * 0.8);
	const ax = cx - gap;
	const bxp = cx + gap;
	const partyY = cy - (compact ? 54 : 70);

	// --- The two parties ---
	const f2 = smoothstep(two);
	[
		{ x: ax, name: 'requester' },
		{ x: bxp, name: 'node' }
	].forEach((p, i) => {
		ctx.save();
		ctx.globalAlpha = f2;
		ctx.fillStyle = i === 0 ? palette.accent : palette.node;
		ctx.beginPath();
		ctx.arc(p.x, partyY, 14 * Math.max(0.85, scale * 0.8), 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		label(ctx, p.name, p.x, partyY - 26, palette, f2, compact ? 10 : 12);
	});

	// A struck-out "trust" link between them: they don't have one.
	if (two > 0.4 && pay < 0.5) {
		const f = smoothstep(range(progress, 0.1, 0.24)) * (1 - smoothstep(range(progress, 0.3, 0.44)));
		if (f > 0.01) {
			ctx.save();
			ctx.globalAlpha = f * 0.8;
			ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.45);
			ctx.lineWidth = 1.6;
			ctx.setLineDash([5, 6]);
			ctx.beginPath();
			ctx.moveTo(ax + 20, partyY);
			ctx.lineTo(bxp - 20, partyY);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.strokeStyle = palette.accent;
			ctx.lineWidth = 2.4;
			ctx.beginPath();
			ctx.moveTo(cx - 14, partyY - 14);
			ctx.lineTo(cx + 14, partyY + 14);
			ctx.stroke();
			ctx.restore();
			label(ctx, 'no trust between them', cx, partyY - 34, palette, f * 0.85, compact ? 10 : 12, 500);
		}
	}

	// --- Value moving, and work coming back ---
	const pf = smoothstep(pay);
	if (pf > 0) {
		ctx.save();
		ctx.globalAlpha = pf * 0.55;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.6;
		ctx.beginPath();
		ctx.moveTo(ax + 18, partyY);
		ctx.lineTo(ax + 18 + (bxp - ax - 36) * pf, partyY);
		ctx.stroke();
		ctx.restore();
		for (let i = 0; i < 3; i++) {
			const k = (time * 0.5 + i * 0.33) % 1;
			packet(ctx, ax, partyY, bxp, partyY, k, palette.accent, pf);
			packet(ctx, bxp, partyY, ax, partyY, (k + 0.5) % 1, palette.node, pf);
		}
		label(ctx, 'payment ⇄ execution', cx, partyY + 30, palette, pf * 0.85, compact ? 10 : 12, 500);
	}

	// --- The ledger, below: an opinion is recorded ---
	const rf = smoothstep(record);
	if (rf > 0) {
		const ly = cy + (compact ? 72 : 96);
		const lw = compact ? width * 0.6 : gap * 2.1;
		ctx.save();
		ctx.globalAlpha = rf;
		roundRect(ctx, cx - lw / 2, ly - 17, lw, 34, 9);
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 1.8;
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.05);
		ctx.fill();
		for (let i = 0; i < 7; i++) {
			const k = ((time * 0.22 + i / 7) % 1) * lw;
			ctx.globalAlpha = rf * 0.55;
			ctx.fillStyle = palette.accent;
			ctx.fillRect(cx - lw / 2 + k, ly - 6, 8, 12);
		}
		ctx.restore();
		label(ctx, 'reputation, as a record on a ledger', cx, ly + 34, palette, rf * 0.85, compact ? 10 : 12, 500);

		// The opinion dropping from the transaction into the ledger.
		const k = (time * 0.6) % 1;
		packet(ctx, bxp, partyY, cx, ly - 17, k, palette.node, rf);
	}

	// --- Others weighing the source ---
	if (weigh > 0) {
		const f = smoothstep(weigh);
		const ly = cy + (compact ? 72 : 96);
		const observers = compact ? 3 : 4;
		for (let i = 0; i < observers; i++) {
			const t = smoothstep(clamp(f * 1.4 - i * 0.12));
			if (t <= 0) continue;
			const angle = Math.PI * (0.18 + (i / (observers - 1)) * 0.64);
			const ox = cx + Math.cos(angle) * gap * 1.35;
			const oy = ly + 64 + Math.sin(angle) * 30;
			ctx.save();
			ctx.globalAlpha = t * 0.5;
			ctx.strokeStyle = palette.link;
			ctx.lineWidth = 1.1;
			ctx.setLineDash([4, 5]);
			ctx.beginPath();
			ctx.moveTo(ox, oy);
			ctx.lineTo(cx, ly + 17);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.globalAlpha = t;
			// Weight of trust varies per observer: bigger dot, more weight.
			ctx.fillStyle = palette.node;
			ctx.beginPath();
			ctx.arc(ox, oy, (4 + rand(i + 2) * 6) * Math.max(0.8, scale * 0.7), 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
		label(
			ctx,
			'each party weighs the sources it trusts',
			cx,
			ly + 118,
			palette,
			f * 0.85,
			compact ? 10 : 12,
			500
		);
	}
}
