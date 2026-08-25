/*
 * src/lib/components/developers/scenes.js
 * ------------------------------------------------------------------
 * Procedural canvas scenes for /developers, scrubbed by the scroll
 * progress that PinnedScene feeds in.
 *
 * The story, in order, is the one the paradigm doc tells from a
 * developer's seat:
 *   1. spec        — you ship a specification (BOX / API / NET),
 *                    not a deployment
 *   2. agnostic    — a service is a black box, so whatever you wrote
 *                    it ships the same way and runs the same way
 *   3. distribute  — hand it to one node; the network carries it
 *   4. compose     — services request child services through the node,
 *                    and never learn where they ran
 *
 * Every scene is a pure function of (progress, palette, mouse, time),
 * so a single paint at progress = 1 is a valid reduced-motion frame.
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
 * SCENE 1 — "You don't deploy. You specify."
 * Loose files gather themselves into a self-contained filesystem, the
 * BOX seals around them, and the API and NET faces attach. That is
 * literally the whole of a Celaut service specification.
 * ================================================================== */
export function drawSpecScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const files = range(progress, 0.0, 0.3); // filesystem items arrive
	const seal = range(progress, 0.26, 0.56); // BOX closes around them
	const api = range(progress, 0.52, 0.76); // API face attaches
	const net = range(progress, 0.72, 1.0); // NET boundary declared

	const boxW = (compact ? 190 : 250) * Math.max(0.85, scale * 0.85);
	const boxH = boxW * 0.8;
	const bx = cx - boxW / 2;
	const by = cy - boxH / 2;

	// Slight hold-it-in-your-hands tilt.
	ctx.save();
	ctx.translate(cx, cy);
	ctx.rotate((mouse.x - 0.5) * 0.05);
	ctx.translate(-cx, -cy);

	// --- Filesystem items flying in and settling into a stack ---
	const ITEMS = compact ? 7 : 10;
	for (let i = 0; i < ITEMS; i++) {
		const t = smoothstep(clamp(files * 1.5 - i * 0.09));
		if (t <= 0) continue;
		const a = rand(i) * Math.PI * 2;
		const far = (compact ? 210 : 300) * (0.6 + rand(i + 9));
		const w = boxW * (0.34 + rand(i + 21) * 0.3);
		const h = 9 * Math.max(1, scale * 0.8);
		// Destination: a tidy stack of "item branches" inside the box.
		const tx = bx + boxW * 0.12 + (i % 2) * boxW * 0.42;
		const ty = by + boxH * 0.16 + Math.floor(i / 2) * (boxH * 0.14);
		const sx = cx + Math.cos(a) * far;
		const sy = cy + Math.sin(a) * far * 0.75;
		const x = sx + (tx - sx) * t;
		const y = sy + (ty - sy) * t;

		ctx.save();
		ctx.globalAlpha = 0.35 + 0.6 * t;
		roundRect(ctx, x, y, w * (0.6 + 0.4 * t), h, 3);
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.1);
		ctx.fill();
		ctx.strokeStyle = i % 3 === 0 ? palette.warm : rgba(palette.onSurfaceRgb, 0.36);
		ctx.lineWidth = 1.3;
		ctx.stroke();
		ctx.restore();
	}

	// --- BOX seals around the filesystem ---
	sealedBox(ctx, bx, by, boxW, boxH, seal, palette, { scan: time });
	label(ctx, 'BOX', cx, by - 16 * Math.max(0.9, scale * 0.8), palette, smoothstep(seal), compact ? 12 : 15);
	ctx.restore();

	// --- API face: the declared way in ---
	if (api > 0) {
		const f = smoothstep(api);
		const ax = bx + boxW;
		const ay = cy;
		const reach = (compact ? 62 : 96) * f;
		ctx.save();
		ctx.globalAlpha = f;
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 2.2;
		ctx.beginPath();
		ctx.moveTo(ax, ay);
		ctx.lineTo(ax + reach, ay);
		ctx.stroke();
		// Three endpoint stubs — "methods you expose".
		for (let i = -1; i <= 1; i++) {
			ctx.beginPath();
			ctx.moveTo(ax + reach, ay);
			ctx.lineTo(ax + reach + 22 * f, ay + i * 26 * f);
			ctx.stroke();
			ctx.fillStyle = palette.accent;
			ctx.beginPath();
			ctx.arc(ax + reach + 22 * f, ay + i * 26 * f, 4, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
		label(ctx, 'API', ax + reach + 14, ay - 44 * f, palette, f, compact ? 11 : 13);

		// Callers knocking on the API.
		for (let i = 0; i < 3; i++) {
			const k = (time * 0.5 + i * 0.33) % 1;
			packet(ctx, ax + reach + 44, ay + (i - 1) * 26, ax, ay, k, palette.accent, f * 0.9);
		}
	}

	// --- NET: isolated by default, access requested through the node ---
	if (net > 0) {
		const f = smoothstep(net);
		const r = Math.max(boxW, boxH) * (0.78 + 0.05 * Math.sin(time * 1.4));
		ctx.save();
		ctx.globalAlpha = f * 0.55;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.6;
		ctx.setLineDash([7, 9]);
		ctx.lineDashOffset = -time * 18;
		ctx.beginPath();
		ctx.ellipse(cx, cy, r, r * 0.82, 0, 0, Math.PI * 2);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();
		label(ctx, 'NET', cx, cy + r * 0.82 + 22, palette, f, compact ? 11 : 13);
	}
}

/* ==================================================================
 * SCENE 2 — "Whatever you wrote, it ships the same way."
 * Four differently-shaped payloads (different languages, different
 * stacks) all fold into the identical sealed service shape, and every
 * node in the row accepts the same thing.
 * ================================================================== */
export function drawAgnosticScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const show = range(progress, 0.0, 0.24); // the four payloads appear
	const fold = range(progress, 0.24, 0.58); // each becomes the same box
	const same = range(progress, 0.54, 0.8); // identical seals, side by side
	const run = range(progress, 0.76, 1.0); // all executing, same output

	const cols = compact ? 2 : 4;
	const cellW = (compact ? 78 : 96) * Math.max(0.85, scale * 0.8);
	const cellH = cellW * 0.86;
	const gap = cellW * 0.42;
	const rows = Math.ceil(4 / cols);
	const totalW = cols * cellW + (cols - 1) * gap;
	const totalH = rows * cellH + (rows - 1) * gap;
	const ox = cx - totalW / 2;
	const oy = cy - totalH / 2 - (compact ? 0 : 10);

	for (let i = 0; i < 4; i++) {
		const col = i % cols;
		const row = Math.floor(i / cols);
		const x = ox + col * (cellW + gap);
		const y = oy + row * (cellH + gap);
		const appear = smoothstep(clamp(show * 1.4 - i * 0.08));
		if (appear <= 0) continue;
		const f = smoothstep(clamp(fold * 1.3 - i * 0.07));

		ctx.save();
		ctx.globalAlpha = appear;

		// The "before" shape morphs toward a rounded square as `f` runs:
		// a circle, a triangle, a wide bar and a tall bar all converge.
		ctx.strokeStyle = f > 0.7 ? palette.node : palette.warm;
		ctx.lineWidth = 2 * Math.max(1, scale * 0.7);
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.05);
		const inset = cellW * 0.12 * (1 - f);
		if (i === 0) {
			// circle → square
			const rr = (cellW / 2) * (1 - f) + 6 * f;
			roundRect(ctx, x + inset, y + inset, cellW - inset * 2, cellH - inset * 2, rr);
		} else if (i === 1) {
			const w = cellW * (0.55 + 0.45 * f);
			roundRect(ctx, x + (cellW - w) / 2, y + inset, w, cellH - inset * 2, 6);
		} else if (i === 2) {
			const h = cellH * (0.48 + 0.52 * f);
			roundRect(ctx, x + inset, y + (cellH - h) / 2, cellW - inset * 2, h, 6);
		} else {
			roundRect(ctx, x + inset * 1.4, y + inset * 0.4, cellW - inset * 2.8, cellH - inset * 0.8, 6);
		}
		ctx.fill();
		ctx.stroke();

		// Payload speckle inside — the code you actually wrote.
		for (let k = 0; k < 5; k++) {
			ctx.globalAlpha = appear * 0.55;
			ctx.fillStyle = palette.node;
			ctx.beginPath();
			ctx.arc(
				x + cellW * (0.25 + rand(i * 12 + k) * 0.5),
				y + cellH * (0.25 + rand(i * 12 + k + 40) * 0.5),
				1.8,
				0,
				Math.PI * 2
			);
			ctx.fill();
		}
		ctx.restore();

		// Once folded they are indistinguishable — the black box.
		if (same > 0) {
			const s = smoothstep(same);
			label(ctx, 'service', x + cellW / 2, y + cellH + 18, palette, s * 0.75, compact ? 9 : 11, 500);
			ctx.save();
			ctx.globalAlpha = s * 0.22;
			ctx.fillStyle = palette.node;
			roundRect(ctx, x, y, cellW, cellH, 8);
			ctx.fill();
			ctx.restore();
		}

		// Executing: each box emits the same result downward.
		if (run > 0) {
			const r = smoothstep(run);
			const k = (time * 0.6 + i * 0.17) % 1;
			packet(
				ctx,
				x + cellW / 2,
				y + cellH,
				x + cellW / 2,
				y + cellH + (compact ? 34 : 52),
				k,
				palette.accent,
				r
			);
		}
	}

	// A rail under the grid: any compatible node takes any of them.
	if (run > 0) {
		const r = smoothstep(run);
		const railY = oy + totalH + (compact ? 44 : 64);
		ctx.save();
		ctx.globalAlpha = r * 0.7;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.6;
		ctx.beginPath();
		ctx.moveTo(ox - 16, railY);
		ctx.lineTo(ox + totalW + 16, railY);
		ctx.stroke();
		const nodes = compact ? 4 : 6;
		for (let i = 0; i < nodes; i++) {
			const nx = ox - 10 + ((totalW + 20) / (nodes - 1)) * i;
			ctx.globalAlpha = r * (0.55 + 0.45 * Math.sin(time * 1.5 + i));
			ctx.fillStyle = palette.node;
			ctx.beginPath();
			ctx.arc(nx, railY, 6 * Math.max(0.8, scale * 0.7), 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
		label(ctx, 'any compatible node', cx, railY + 26, palette, r * 0.8, compact ? 10 : 12, 500);
	}
}

/* ==================================================================
 * SCENE 3 — "Hand it to one node. The network carries it."
 * The service is passed to a single peer, which propagates it outward
 * hop by hop. The hash under it never changes, because the thing being
 * copied is the exact bytes you sealed.
 * ================================================================== */
export function drawDistributeScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const hand = range(progress, 0.0, 0.26); // you → first node
	const wave1 = range(progress, 0.24, 0.52); // first ring of peers
	const wave2 = range(progress, 0.48, 0.76); // second ring
	const registry = range(progress, 0.72, 1.0); // optional on-chain record

	const radius = Math.min(width * (compact ? 0.34 : 0.18), height * 0.34);
	const inner = compact ? 4 : 5;
	const ringA = [];
	for (let i = 0; i < inner; i++) {
		const a = (i / inner) * Math.PI * 2 - Math.PI / 2;
		ringA.push({ x: cx + Math.cos(a) * radius * 0.62, y: cy + Math.sin(a) * radius * 0.62 });
	}
	const outer = compact ? 6 : 9;
	const ringB = [];
	for (let i = 0; i < outer; i++) {
		const a = (i / outer) * Math.PI * 2 - Math.PI / 3;
		ringB.push({ x: cx + Math.cos(a) * radius * 1.12, y: cy + Math.sin(a) * radius * 1.05 });
	}

	// --- Links, drawn as each wave propagates ---
	const drawLinks = (from, to, t) => {
		const f = smoothstep(t);
		if (f <= 0) return;
		ctx.save();
		to.forEach((n, j) => {
			const src = from[j % from.length];
			const k = clamp((f - (j / to.length) * 0.4) / 0.6);
			if (k <= 0) return;
			ctx.globalAlpha = k * 0.5;
			ctx.strokeStyle = palette.link;
			ctx.lineWidth = 1.2;
			ctx.beginPath();
			ctx.moveTo(src.x, src.y);
			ctx.lineTo(src.x + (n.x - src.x) * k, src.y + (n.y - src.y) * k);
			ctx.stroke();
			// The service itself travelling the link.
			if (k > 0.9) {
				const p = (time * 0.5 + j * 0.19) % 1;
				packet(ctx, src.x, src.y, n.x, n.y, p, palette.accent, 0.9, 3.4);
			}
		});
		ctx.restore();
	};

	drawLinks([{ x: cx, y: cy }], ringA, wave1);
	drawLinks(ringA, ringB, wave2);

	// --- Peers holding a copy ---
	const peer = (n, t, size) => {
		const f = smoothstep(t);
		if (f <= 0) return;
		const s = size * Math.max(0.8, scale * 0.8);
		ctx.save();
		ctx.globalAlpha = f;
		roundRect(ctx, n.x - s / 2, n.y - s / 2, s, s, 4);
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.6;
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.07);
		ctx.fill();
		ctx.restore();
	};
	ringB.forEach((n, j) => peer(n, clamp(wave2 * 1.3 - j * 0.06), 16));
	ringA.forEach((n, j) => peer(n, clamp(wave1 * 1.3 - j * 0.08), 22));

	// --- The service you sealed, at the centre ---
	const h = smoothstep(hand);
	const boxW = (compact ? 74 : 92) * Math.max(0.85, scale * 0.8);
	sealedBox(ctx, cx - boxW / 2, cy - boxW / 2, boxW, boxW, Math.min(1, hand * 2.4), palette, {
		scan: time
	});
	// The hash under it stays byte-identical everywhere it lands.
	label(ctx, 'a1f3…9c2e', cx, cy + boxW / 2 + 20, palette, h * 0.85, compact ? 10 : 12, 700);

	// --- Optional: declare it on a registry (e.g. Ergo) ---
	if (registry > 0) {
		const f = smoothstep(registry);
		const ry = cy + radius * (compact ? 1.5 : 1.42);
		const rw = compact ? width * 0.62 : radius * 1.9;
		ctx.save();
		ctx.globalAlpha = f;
		roundRect(ctx, cx - rw / 2, ry - 15, rw, 30, 8);
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 1.8;
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.05);
		ctx.fill();
		// Ledger blocks ticking along inside.
		for (let i = 0; i < 6; i++) {
			const k = ((time * 0.25 + i / 6) % 1) * rw;
			ctx.globalAlpha = f * 0.55;
			ctx.fillStyle = palette.accent;
			ctx.fillRect(cx - rw / 2 + k, ry - 5, 8, 10);
		}
		ctx.restore();
		label(ctx, 'optional reputation registry', cx, ry + 32, palette, f * 0.8, compact ? 10 : 12, 500);
	}
}

/* ==================================================================
 * SCENE 4 — "Services that call services."
 * A parent service asks its node for a dependency. The node finds
 * somewhere to run it — maybe locally, maybe three peers away — and
 * the parent never learns which.
 * ================================================================== */
export function drawComposeScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const parent = range(progress, 0.0, 0.2); // the parent service
	const ask = range(progress, 0.18, 0.44); // it asks its node
	const place = range(progress, 0.4, 0.72); // node places the children
	const blind = range(progress, 0.68, 1.0); // the "where" is hidden

	const pw = (compact ? 96 : 124) * Math.max(0.85, scale * 0.8);
	const py = cy - (compact ? 118 : 150) * Math.max(0.85, scale * 0.8);
	const px = cx - pw / 2;

	// --- Parent service ---
	sealedBox(ctx, px, py, pw, pw * 0.66, Math.min(1, parent * 3), palette, { scan: time });
	label(ctx, 'your service', cx, py - 14, palette, smoothstep(parent), compact ? 10 : 12, 500);

	// --- Its node, directly below ---
	const nodeY = cy + (compact ? 6 : 10);
	const nodeR = (compact ? 26 : 32) * Math.max(0.85, scale * 0.8);
	const a = smoothstep(ask);
	if (a > 0) {
		ctx.save();
		ctx.globalAlpha = a;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(cx, nodeY, nodeR, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.06);
		ctx.fill();
		// The request travelling down.
		const k = (time * 0.75) % 1;
		packet(ctx, cx, py + pw * 0.66, cx, nodeY - nodeR, k, palette.accent, a);
		ctx.restore();
		label(ctx, 'its node', cx, nodeY + nodeR + 18, palette, a * 0.8, compact ? 10 : 12, 500);
	}

	// --- Children, placed wherever they fit ---
	const kids = compact ? 3 : 4;
	const spread = Math.min(width * (compact ? 0.36 : 0.2), height * 0.3);
	const p = smoothstep(place);
	for (let i = 0; i < kids; i++) {
		const t = smoothstep(clamp(place * 1.4 - i * 0.1));
		if (t <= 0) continue;
		const ang = Math.PI * (0.18 + (i / (kids - 1)) * 0.64);
		const kx = cx + Math.cos(ang) * spread * 1.25;
		const ky = nodeY + Math.sin(ang) * spread * 0.95;
		const kw = pw * 0.44;

		ctx.save();
		ctx.globalAlpha = t * 0.65;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.2;
		ctx.setLineDash([5, 6]);
		ctx.lineDashOffset = -time * 20;
		ctx.beginPath();
		ctx.moveTo(cx, nodeY);
		ctx.lineTo(cx + (kx - cx) * t, nodeY + (ky - nodeY) * t);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();

		sealedBox(ctx, kx - kw / 2, ky - kw * 0.33, kw, kw * 0.66, t, palette, { scan: time + i });
		// Each child runs on its own node.
		ctx.save();
		ctx.globalAlpha = t * 0.5;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.3;
		ctx.beginPath();
		ctx.arc(kx, ky, kw * 0.72, 0, Math.PI * 2);
		ctx.stroke();
		ctx.restore();
	}

	// --- The parent cannot see where they landed ---
	if (blind > 0 && p > 0) {
		const f = smoothstep(blind);
		ctx.save();
		// A dashed "visibility line": below it, placement is the node's
		// business and the parent simply cannot see it.
		const bandY = nodeY + spread * 0.1;
		ctx.globalAlpha = f * 0.5;
		ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.5);
		ctx.lineWidth = 1.4;
		ctx.setLineDash([3, 7]);
		ctx.beginPath();
		ctx.moveTo(cx - spread * 1.5, bandY);
		ctx.lineTo(cx + spread * 1.5, bandY);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();
		label(ctx, 'you never find out where', cx, bandY - 12, palette, f * 0.85, compact ? 10 : 12, 700);

		// Results still come back up the chain.
		for (let i = 0; i < 3; i++) {
			const k = (time * 0.45 + i * 0.3) % 1;
			packet(ctx, cx, nodeY - nodeR, cx, py + pw * 0.66, k, palette.accent, f * 0.9);
		}
	}
}
