/*
 * src/lib/components/home/scenes.js
 * ------------------------------------------------------------------
 * Procedural canvas scenes for the landing page.
 *
 * The home page's job is to explain the paradigm itself, so these
 * scenes re-stage the motifs the site already owns — Conway's Game of
 * Life, the node network, the BOX/API/NET specification — as
 * scroll-scrubbed sequences rather than static illustrations.
 *
 *   1. automata     — simple local rules → emergent global behaviour
 *   2. nodes        — a network with no protocol anyone has to agree on
 *   3. service      — the black box: a sealed, deterministic container
 *   4. spec         — the service body: BOX, its API, its declared NET
 *   5. execution    — children, budgets, and who decides where they run
 *   6. determinism  — the same input, run in three places, three times
 *   7. coordination — reputation and payment, the trustless glue
 *   8. principles   — the three commitments all of the above derive from
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
	membranePath,
	poreAt,
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

export function drawAutomataScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
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
		t('viz.home.generation', { n: String(generation).padStart(2, '0') }),
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
			t('viz.home.lifeRule'),
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
 * SCENE 2 — The two primitives
 * The emergent field resolves into Celaut's two atomic pieces. A node
 * appears as a peer-connected machine; a sealed service arrives, runs
 * without exposing its interior, then leaves unchanged. Their boundary
 * is the architecture: hardware on one side, deterministic software on
 * the other.
 * ================================================================== */
export function drawAtomsScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);
	// One primitive per caption beat, in the caption's own order. The
	// first beat says nothing at all, so the stage stays empty through
	// its window [0, 0.34]; the node arrives with the second beat
	// [0.3, 0.66] and the service with the third [0.62, 1].
	const nodeIn = smoothstep(range(progress, 0.3, 0.52));
	const serviceIn = smoothstep(range(progress, 0.62, 0.84));
	const exchange = smoothstep(range(progress, 0.86, 1));
	const atomCopy = t('home.atoms');

	const nodeX = cx + (compact ? -68 : -116) * scale;
	const serviceX = cx + (compact ? 70 : 122) * scale;
	const radius = (compact ? 34 : 46) * scale;

	// A node is physical capacity connected to peers. The small satellites
	// arrive first, then the centre takes responsibility for execution.
	for (let i = 0; i < 5; i++) {
		const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
		const satelliteIn = smoothstep(clamp(nodeIn * 1.35 - i * 0.07));
		const sx = nodeX + Math.cos(a) * radius * 1.65;
		const sy = cy + Math.sin(a) * radius * 1.35;
		ctx.save();
		ctx.globalAlpha = satelliteIn * 0.48;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.2;
		ctx.beginPath();
		ctx.moveTo(nodeX, cy);
		ctx.lineTo(sx, sy);
		ctx.stroke();
		ctx.fillStyle = palette.node;
		ctx.globalAlpha = satelliteIn;
		ctx.beginPath();
		ctx.arc(sx, sy, compact ? 3.5 : 4.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
	ctx.save();
	ctx.globalAlpha = nodeIn;
	ctx.fillStyle = palette.node;
	ctx.globalAlpha = nodeIn * 0.12;
	ctx.strokeStyle = palette.node;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(nodeX, cy, radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.globalAlpha = nodeIn;
	ctx.stroke();
	ctx.fillStyle = palette.node;
	ctx.beginPath();
	ctx.arc(nodeX, cy, 8 * scale, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();

	// A service is a sealed, deterministic body. Its contents animate,
	// but the node only ever sees the boundary and the declared interface.
	const boxW = (compact ? 92 : 132) * scale;
	const boxH = boxW * 0.72;
	sealedBox(
		ctx,
		serviceX - boxW / 2,
		cy - boxH / 2,
		boxW,
		boxH,
		serviceIn,
		palette,
		{ scan: serviceIn }
	);
	if (serviceIn > 0.05) {
		for (let i = 0; i < 7; i++) {
			const a = time * (0.3 + rand(i) * 0.25) + rand(i + 9) * Math.PI * 2;
			ctx.save();
			ctx.globalAlpha = serviceIn * (1 - exchange * 0.35) * 0.7;
			ctx.fillStyle = i % 3 ? palette.node : palette.accent;
			ctx.beginPath();
			ctx.arc(serviceX + Math.cos(a) * boxW * 0.22, cy + Math.sin(a) * boxH * 0.22, 2.2, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
	}

	// The interface lights up only when the two primitives cooperate.
	if (exchange > 0) {
		ctx.save();
		ctx.globalAlpha = exchange * 0.8;
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 2;
		ctx.setLineDash([6, 8]);
		ctx.beginPath();
		ctx.moveTo(nodeX + radius, cy);
		ctx.lineTo(serviceX - boxW / 2, cy);
		ctx.stroke();
		ctx.restore();
		packet(ctx, nodeX + radius, cy, serviceX - boxW / 2, cy, (time * 0.28) % 1, palette.accent, exchange);
	}

	label(ctx, atomCopy.items[0].title, nodeX, cy + radius * 1.85, palette, nodeIn, compact ? 11 : 13);
	label(ctx, atomCopy.items[1].title, serviceX, cy + radius * 1.85, palette, serviceIn, compact ? 11 : 13);
}

/* ==================================================================
 * SCENE 3 — The network: nothing to agree on
 * Having nodes is not what makes Celaut different. Every serious
 * decentralised network has nodes and most still bow to one powerful
 * thing: the protocol everybody is obliged to run. So the scene shows
 * that first — a uniform ring, one node diverges, the ring tears in
 * two — and then shows Celaut: the same peers, each carrying its own
 * set of supported interfaces, payment methods and spec formats,
 * wired together wherever those sets happen to overlap. One node adds
 * a policy and nobody else has to move.
 * ================================================================== */

// Six capability slots — think "accepts Ergo", "speaks this gateway",
// "parses the zipped spec format". Drawn as distinct SHAPES rather than
// colours: the palette only has two, and six marks have to stay
// tellable apart in both themes.
//
// Every node carries exactly two, which over seven peers wires up about
// half the possible pairs. That ratio is the point: enough links to look
// like a network, enough gaps to show that a link is not a given. The
// two seeds are tuned for a flat spread of slots — correlated ones put
// the same glyph on six nodes out of seven and the gaps vanished.
const CAP_SLOTS = 6;

function capsOf(i) {
	const a = Math.floor(rand(i * 5.7 + 2.9) * CAP_SLOTS);
	let b = Math.floor(rand(i * 17.3 + 8.1) * (CAP_SLOTS - 1));
	if (b >= a) b++;
	return a < b ? [a, b] : [b, a];
}

function capGlyph(ctx, x, y, slot, size) {
	ctx.beginPath();
	switch (slot) {
		case 0:
			ctx.arc(x, y, size, 0, Math.PI * 2);
			break;
		case 1:
			ctx.rect(x - size, y - size, size * 2, size * 2);
			break;
		case 2:
			ctx.moveTo(x, y - size * 1.15);
			ctx.lineTo(x + size, y + size * 0.7);
			ctx.lineTo(x - size, y + size * 0.7);
			ctx.closePath();
			break;
		case 3:
			ctx.moveTo(x, y - size * 1.2);
			ctx.lineTo(x + size * 1.1, y);
			ctx.lineTo(x, y + size * 1.2);
			ctx.lineTo(x - size * 1.1, y);
			ctx.closePath();
			break;
		case 4:
			ctx.rect(x - size * 1.2, y - size * 0.5, size * 2.4, size);
			break;
		default: // cross
			ctx.rect(x - size * 1.25, y - size * 0.42, size * 2.5, size * 0.84);
			ctx.rect(x - size * 0.42, y - size * 1.25, size * 0.84, size * 2.5);
	}
}

export function drawNetworkScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const uniform = range(progress, 0.0, 0.22); // one protocol, everyone runs it
	const fork = range(progress, 0.2, 0.4); // one node diverges, the ring tears
	const settle = range(progress, 0.42, 0.52); // the old picture clears out
	const diverse = range(progress, 0.46, 0.68); // each node, its own capabilities
	const adopt = range(progress, 0.68, 0.88); // one node adds a policy
	const flow = range(progress, 0.85, 1.0); // traffic over the links that exist

	const N = compact ? 6 : 7;
	const rebel = 2;
	const adopter = compact ? 4 : 5;

	const settleF = smoothstep(settle);
	const oldF = smoothstep(uniform) * (1 - settleF);
	const forkF = smoothstep(fork) * (1 - settleF);
	const diverseF = smoothstep(diverse);
	const adoptF = smoothstep(adopt);
	const flowF = smoothstep(flow);

	/** @type {number[][]} */
	const caps = [];
	for (let i = 0; i < N; i++) caps.push(capsOf(i));
	// The capability the adopter is missing, and picks up in the last beat.
	let gained = -1;
	for (let s = 0; s < CAP_SLOTS && gained < 0; s++) {
		if (!caps[adopter].includes(s)) gained = s;
	}

	// Which camp a node walks off to when the ring tears. The split runs
	// along the rebels' own side of the ring — a fixed horizontal offset
	// made the two camps walk straight through each other whenever the
	// rebels started out on the right.
	const camp = (i) => (i === rebel || i === (rebel + 1) % N ? -1 : 1);
	const tearA = ((rebel + 0.5) / N) * Math.PI * 2 - Math.PI / 2;

	const radius = Math.min(width * (compact ? 0.32 : 0.16), height * 0.32);
	const nodes = [];
	for (let i = 0; i < N; i++) {
		const a = (i / N) * Math.PI * 2 - Math.PI / 2;
		const off = forkF * radius * (camp(i) === -1 ? 0.62 : -0.3);
		let x = cx + Math.cos(a) * radius + Math.cos(tearA) * off;
		let y = cy + Math.sin(a) * radius * 1.02 + Math.sin(tearA) * off;
		const dx = x - mouse.x * width;
		const dy = y - mouse.y * height;
		const d = Math.hypot(dx, dy) || 1;
		const push = Math.min(34, 2800 / (d + 48));
		x += (dx / d) * push;
		y += (dy / d) * push;
		nodes.push({ x, y });
	}

	// --- Phase 1 & 2: one ring, one version, and then the tear ---
	if (oldF > 0.01) {
		ctx.save();
		ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.42);
		ctx.lineWidth = 1.4;
		for (let i = 0; i < N; i++) {
			const j = (i + 1) % N;
			const torn = camp(i) !== camp(j);
			ctx.globalAlpha = oldF * 0.8 * (torn ? 1 - smoothstep(fork) : 1);
			if (ctx.globalAlpha <= 0.01) continue;
			ctx.beginPath();
			ctx.moveTo(nodes[i].x, nodes[i].y);
			ctx.lineTo(nodes[j].x, nodes[j].y);
			ctx.stroke();
		}
		ctx.restore();

		// The version badge everyone is obliged to carry — until one doesn't.
		nodes.forEach((n, i) => {
			const diverged = camp(i) === -1 && fork > 0;
			const by = n.y - 24 * Math.max(0.8, scale * 0.75);
			const colour = diverged ? palette.accent : palette.node;
			ctx.save();
			ctx.globalAlpha = oldF;
			if (compact) {
				ctx.fillStyle = colour;
				ctx.beginPath();
				ctx.arc(n.x, by, 3.4, 0, Math.PI * 2);
				ctx.fill();
			} else {
				ctx.strokeStyle = colour;
				ctx.lineWidth = 1.3;
				roundRect(ctx, n.x - 13, by - 8, 26, 16, 4);
				ctx.stroke();
				ctx.font = `700 10px ${palette.fontBody || 'Lato, sans-serif'}`;
				ctx.textAlign = 'center';
				ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.78);
				ctx.fillText(diverged ? 'v2' : 'v1', n.x, by + 4);
			}
			ctx.restore();
		});
	}

	// --- Phase 3 & 4: links exist only where capabilities overlap ---
	const sharedWith = (i, j, withNew) => {
		let n = 0;
		for (const s of caps[i]) if (caps[j].includes(s)) n++;
		if (withNew && gained >= 0) {
			if (i === adopter && caps[j].includes(gained)) n++;
			if (j === adopter && caps[i].includes(gained)) n++;
		}
		return n;
	};

	/** @type {number[][]} */
	const links = [];
	if (diverseF > 0) {
		ctx.save();
		ctx.lineCap = 'round';
		for (let i = 0; i < N; i++) {
			for (let j = i + 1; j < N; j++) {
				const base = Math.min(1, sharedWith(i, j, false) / 2);
				const grown = Math.min(1, sharedWith(i, j, true) / 2);
				const order = ((i * 7 + j * 3) % N) / N;
				const t = smoothstep(clamp((diverseF - order * 0.45) / 0.55));
				const a = (base * t + (grown - base) * adoptF) * 0.6;
				if (a <= 0.02) continue;
				const fresh = grown > base;
				const k = fresh ? adoptF : t;
				ctx.globalAlpha = a;
				ctx.strokeStyle = fresh ? palette.accent : palette.link;
				ctx.lineWidth = fresh ? 1.7 : 1.1;
				ctx.beginPath();
				ctx.moveTo(nodes[i].x, nodes[i].y);
				ctx.lineTo(
					nodes[i].x + (nodes[j].x - nodes[i].x) * k,
					nodes[i].y + (nodes[j].y - nodes[i].y) * k
				);
				ctx.stroke();
				links.push([i, j]);
			}
		}
		ctx.restore();
	}

	// --- Phase 5: traffic, over the links that happen to exist ---
	if (flowF > 0 && links.length) {
		for (let p = 0; p < (compact ? 6 : 11); p++) {
			const l = links[Math.floor(rand(p * 5) * links.length) % links.length];
			const k = (time * (0.22 + rand(p + 7) * 0.3) + rand(p + 3)) % 1;
			packet(
				ctx,
				nodes[l[0]].x,
				nodes[l[0]].y,
				nodes[l[1]].x,
				nodes[l[1]].y,
				k,
				palette.accent,
				flowF * 0.9
			);
		}
	}

	// --- Peers, and the capabilities each one happens to support ---
	nodes.forEach((n, i) => {
		const appear = smoothstep(range(progress, i * 0.012, 0.16 + i * 0.012));
		const rr = 8 * Math.max(0.8, scale * 0.75);
		ctx.save();
		ctx.globalAlpha = appear;
		ctx.fillStyle = palette.node;
		ctx.beginPath();
		ctx.arc(n.x, n.y, rr, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = appear * 0.18 * (0.6 + 0.4 * Math.sin(time * 1.6 + i));
		ctx.beginPath();
		ctx.arc(n.x, n.y, rr * 2.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();

		if (diverseF <= 0.01) return;
		const set = caps[i].slice();
		if (i === adopter && gained >= 0) set.push(gained);
		const size = compact ? 2.4 : 3;
		const gap = size * 3.6;
		const gy = n.y - rr - (compact ? 12 : 15);
		set.forEach((s, k) => {
			const fresh = i === adopter && s === gained;
			const f = diverseF * (fresh ? adoptF : 1);
			if (f <= 0.02) return;
			const gx = n.x + (k - (set.length - 1) / 2) * gap;
			ctx.save();
			ctx.globalAlpha = f * 0.9;
			ctx.fillStyle = fresh ? palette.accent : palette.node;
			capGlyph(ctx, gx, gy, s, size);
			ctx.fill();
			if (fresh) {
				// A pulse, so it is obvious which one just showed up.
				ctx.globalAlpha = f * 0.45 * (0.4 + 0.6 * Math.abs(Math.sin(time * 2)));
				ctx.strokeStyle = palette.accent;
				ctx.lineWidth = 1.2;
				ctx.beginPath();
				ctx.arc(gx, gy, size * (3 + Math.sin(time * 2)), 0, Math.PI * 2);
				ctx.stroke();
			}
			ctx.restore();
		});
	});

	// --- One caption at a time, on the same line ---
	const capY = cy + radius * 1.42;
	const size = compact ? 10 : 12;
	label(
		ctx,
		t('viz.home.oneProtocol'),
		cx,
		capY,
		palette,
		smoothstep(range(progress, 0.06, 0.15)) *
			(1 - smoothstep(range(progress, 0.18, 0.26))) *
			0.9,
		size
	);
	label(
		ctx,
		t('viz.home.networkSplits'),
		cx,
		capY,
		palette,
		smoothstep(range(progress, 0.24, 0.32)) *
			(1 - smoothstep(range(progress, 0.4, 0.48))) *
			0.9,
		size
	);
	label(
		ctx,
		t('viz.home.whereOverlap'),
		cx,
		capY,
		palette,
		smoothstep(range(progress, 0.52, 0.6)) *
			(1 - smoothstep(range(progress, 0.68, 0.76))) *
			0.9,
		size
	);
	label(
		ctx,
		t('viz.home.noVote'),
		cx,
		capY,
		palette,
		smoothstep(range(progress, 0.76, 0.86)) * 0.9,
		size
	);
}

/* ==================================================================
 * SCENE 3 — Services: the black box
 * Loose machinery is gathered up and sealed. The interior goes opaque:
 * from the outside a service is defined by what goes in and what comes
 * out, and nothing else.
 * ================================================================== */
export function drawBlackBoxScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
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
		label(ctx, t('viz.home.blackBox'), cx, cy + 5, palette, opaqueF, compact ? 13 : 16);
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
		label(ctx, t('viz.home.input'), bx - reach / 2, cy - 14, palette, f, compact ? 10 : 12);
		label(ctx, t('viz.home.output'), bx + boxW + reach / 2, cy - 14, palette, f, compact ? 10 : 12);
		for (let i = 0; i < 3; i++) {
			const k = (time * 0.5 + i * 0.33) % 1;
			packet(ctx, bx - reach, cy, bx, cy, k, palette.accent, f);
			packet(ctx, bx + boxW, cy, bx + boxW + reach, cy, k, palette.node, f);
		}
	}
}

/* ==================================================================
 * SCENE 4 — How a service is specified
 * One body, not three floating discs. The BOX is the membrane and
 * everything inside it; the API is a single wide channel on one side;
 * NET is a handful of thin channels to networks the specification
 * names up front — and the rest of the membrane holds, which is the
 * actual guarantee. The channel underneath is the default one every
 * service has: its node, its parent, its children.
 *
 * The scene also has a ZOOM mode, driven by the Explore buttons in the
 * caption (`state.zoom` = 'box' | 'api' | 'net', `state.zoomT` = 0→1):
 * it magnifies the chosen component and dims the rest, while the
 * caption lists what the specification actually carries for it. The
 * words stay in the DOM rather than on the canvas — the canvas is
 * aria-hidden, and detail nobody can select, translate or hear read
 * out is not detail.
 * ================================================================== */

// The networks a spec can name are not a crypto-only list: a service
// may declare bitcoin's mainnet, but equally a plain web host or a
// private family network that exists on nobody's registry. Three
// channels on desktop, two on compact, rotating slowly through the
// pool so the examples stay varied without crowding the frame.
const NET_ROTATE_PERIOD = 5.2;

/**
 * @param {string[]} pool
 * @param {number} index
 * @param {number} count
 * @param {number} time
 */
function netNameAt(pool, index, count, time) {
	if (!pool.length) return { name: '', fade: 1 };
	const step = Math.floor(time / NET_ROTATE_PERIOD);
	const k = (time % NET_ROTATE_PERIOD) / NET_ROTATE_PERIOD;
	// Every visible channel holds a different entry: count < pool length,
	// so consecutive offsets can never collide.
	const name = pool[(step * count + index) % pool.length];
	const fade = Math.min(1, smoothstep(clamp(k / 0.14)), smoothstep(clamp((1 - k) / 0.14)));
	return { name, fade };
}

// The examples themselves. A network name is an identifier, not prose,
// so they are not translated — but they DO come from the dictionary,
// because a locale may want a local example in the private-network
// slot. Compact viewports get the short forms.
/**
 * @param {(key: string) => any} t
 * @param {boolean} compact
 * @returns {string[]}
 */
function netPool(t, compact) {
	const names = t(compact ? 'viz.home.netsCompact' : 'viz.home.nets');
	return Array.isArray(names) && names.length ? names : ['bitcoin-mainnet', 'ipfs', 'nostr'];
}

/*
 * The zoomed-in view of one component, opened from the Explore control
 * in the caption. Each panel lists what the specification actually
 * carries for that component — the fields of `message Service` in
 * celaut.proto — rather than restating the caption in bigger type.
 */
/**
 * @param {string | null} mode
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 * @param {boolean} compact
 */
function specZoomFocus(mode, cx, cy, r, compact) {
	if (mode === 'api') return { x: cx - r * (compact ? 1.4 : 1.7), y: cy };
	if (mode === 'net') return { x: cx, y: cy - r * (compact ? 1.5 : 1.8) };
	return { x: cx, y: cy };
}

/**
 * How much each part of the scene is dimmed while one of them is being
 * explored. The focused component keeps its full weight; the rest fade
 * back so the magnified frame reads as being ABOUT one thing.
 * @param {string | null} mode
 * @param {string} part
 * @param {number} zoomT
 */
function specDim(mode, part, zoomT) {
	if (!mode || zoomT <= 0) return 1;
	return 1 - (mode === part ? 0 : 0.78) * zoomT;
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {any} opts
 */
export function drawSpecCellScene(
	ctx,
	{ width, height, progress, palette, mouse, time, align, reduced, state, t }
) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const boxIn = range(progress, 0.0, 0.3);
	const apiIn = range(progress, 0.28, 0.56);
	const netIn = range(progress, 0.54, 0.8);
	const together = range(progress, 0.76, 1.0);

	const s = Math.max(0.85, scale * 0.8);
	const r = (compact ? 62 : 100) * s;
	const tg = smoothstep(together);
	// The channel to node / parent / children is the DEFAULT, so it is
	// already there rather than arriving as a third feature.
	const innerF = smoothstep(range(progress, 0.12, 0.34));

	// --- Explore mode: magnify one component and detail it ---
	// `state` is owned by the page (a button in the caption sets it), so
	// the scene stays a pure function of its inputs.
	const zoomMode = state && state.zoom ? state.zoom : null;
	const zoomT = zoomMode ? smoothstep(clamp(state.zoomT ?? 1)) : 0;
	// Reduced motion still dims the other components — so the frame says
	// which one you are reading about — but never magnifies: the caption
	// gains its detail without the view lurching.
	const magnify = reduced ? 0 : zoomT;
	// Explore also FORCES its own component fully on: a reader who opens
	// "Explore NET" must see NET, even if the scroll hasn't reached it.
	// Kept separate from the dim factors below because these drive
	// GEOMETRY — how far a channel has grown, how far the membrane has
	// sealed — and a dimmed component must still be fully drawn.
	const force = (/** @type {string} */ part, /** @type {number} */ f) =>
		zoomMode === part ? Math.max(f, zoomT) : f;
	const boxF = force('box', smoothstep(boxIn));
	const apiF = force('api', smoothstep(apiIn));
	const netF = force('net', smoothstep(netIn));
	const netG = force('net', netIn);
	// ...and these are pure opacity, so the explored component stands out
	// against the rest of the body.
	const dimBox = specDim(zoomMode, 'box', zoomT);
	const dimApi = specDim(zoomMode, 'api', zoomT);
	const dimNet = specDim(zoomMode, 'net', zoomT);
	ctx.save();
	if (magnify > 0.001) {
		const focus = specZoomFocus(zoomMode, cx, cy, r, compact);
		const k = 1 + 1.7 * magnify;
		ctx.translate(focus.x, focus.y);
		ctx.scale(k, k);
		ctx.translate(-focus.x, -focus.y);
	}

	// --- A halo once everything is in place, behind the body ---
	if (tg > 0) {
		ctx.save();
		ctx.globalAlpha = tg;
		const g = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 2);
		g.addColorStop(0, rgba(palette.onSurfaceRgb, 0.1));
		g.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = g;
		ctx.fillRect(cx - r * 2, cy - r * 2, r * 4, r * 4);
		ctx.restore();
	}

	// --- Cytoplasm: the environment the BOX pins down, gathering in ---
	const P = compact ? 16 : 26;
	for (let i = 0; i < P; i++) {
		const g = smoothstep(clamp(boxIn * 1.4 - rand(i) * 0.3));
		const a = rand(i) * Math.PI * 2 + time * (0.1 + rand(i + 5) * 0.18);
		const wild = r * (1.7 + rand(i + 11));
		// Settled into an annulus rather than a disc: the BOX caption sits
		// dead centre and organelles drifting across it made it unreadable.
		const tame = r * (0.46 + rand(i + 23) * 0.32);
		const rr = wild + (tame - wild) * g;
		ctx.save();
		ctx.globalAlpha = (0.25 + 0.45 * g) * (0.5 + 0.5 * boxF) * dimBox;
		ctx.fillStyle = i % 4 === 0 ? palette.accent : palette.node;
		ctx.beginPath();
		ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 1.6 + rand(i + 31) * 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}

	// --- The membrane, sealing itself shut ---
	if (boxF > 0.01) {
		ctx.save();
		if (boxF > 0.92) {
			membranePath(ctx, cx, cy, r, time, 1, 1);
			ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.06);
			ctx.fill();
		}
		ctx.globalAlpha = Math.min(1, boxF * 1.6) * dimBox;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 2.4;
		ctx.lineJoin = 'round';
		membranePath(ctx, cx, cy, r, time, 1, boxF);
		ctx.stroke();
		ctx.restore();
	}
	label(ctx, t('viz.home.box'), cx, cy - 2, palette, boxF * dimBox, compact ? 14 : 18);
	label(
		ctx,
		t('viz.home.environment'),
		cx,
		cy + (compact ? 16 : 20),
		palette,
		boxF * 0.7 * dimBox,
		compact ? 9 : 11,
		500
	);

	// --- API: one wide channel, traffic in both directions ---
	if (apiF > 0.01) {
		const pore = poreAt(cx, cy, r, Math.PI, time);
		const endX = cx - r * (compact ? 2.1 : 2.5);
		const reach = pore.x + (endX - pore.x) * apiF;
		const half = (compact ? 5 : 7) * s;
		ctx.save();
		ctx.globalAlpha = apiF * dimApi;
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 2.2;
		ctx.lineCap = 'round';
		// Start a little inside the body: the two rails sit above and
		// below the pore's own y, where the membrane bulges further out,
		// so anchoring them exactly at the pore leaves a visible gap.
		const inner = pore.x + 12 * s;
		ctx.beginPath();
		ctx.moveTo(inner, pore.y - half);
		ctx.lineTo(reach, pore.y - half);
		ctx.moveTo(inner, pore.y + half);
		ctx.lineTo(reach, pore.y + half);
		ctx.stroke();
		ctx.restore();
		for (let i = 0; i < 3; i++) {
			const k = (time * 0.5 + i * 0.33) % 1;
			packet(ctx, endX, pore.y - half, pore.x, pore.y - half, k, palette.accent, apiF * dimApi);
			packet(ctx, pore.x, pore.y + half, endX, pore.y + half, k, palette.node, apiF * dimApi);
		}
		const mid = (pore.x + endX) / 2;
		label(ctx, t('viz.home.api'), mid, pore.y - half - 14, palette, apiF * dimApi, compact ? 12 : 15);
		label(
			ctx,
			t('viz.home.interface'),
			mid,
			pore.y + half + 22,
			palette,
			apiF * 0.75 * dimApi,
			compact ? 9 : 11,
			500
		);
	}

	// --- NET: thin channels, one per network the spec names ---
	const pool = netPool(t, compact);
	const nets = compact
		? [{ a: -Math.PI / 2 - 0.34 }, { a: -Math.PI / 2 + 0.34 }]
		: [{ a: -Math.PI / 2 - 0.44 }, { a: -Math.PI / 2 }, { a: -Math.PI / 2 + 0.44 }];
	const netR = r * (compact ? 2.0 : 2.4);
	nets.forEach((n, i) => {
		const f = smoothstep(clamp(netG * 1.4 - i * 0.12)) * dimNet;
		if (f <= 0.02) return;
		const pore = poreAt(cx, cy, r, n.a, time);
		const tx = cx + Math.cos(n.a) * netR;
		const ty = cy + Math.sin(n.a) * netR;
		ctx.save();
		ctx.globalAlpha = f * 0.7;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.2;
		ctx.setLineDash([4, 5]);
		ctx.lineDashOffset = -time * 14;
		ctx.beginPath();
		ctx.moveTo(pore.x, pore.y);
		ctx.lineTo(pore.x + (tx - pore.x) * f, pore.y + (ty - pore.y) * f);
		ctx.stroke();
		ctx.setLineDash([]);
		// The network on the far end: a little cluster of peers.
		ctx.globalAlpha = f;
		ctx.fillStyle = palette.node;
		for (let k = 0; k < 5; k++) {
			const ka = rand(i * 9 + k) * Math.PI * 2;
			const kr = (4 + rand(i * 9 + k + 40) * 9) * s;
			ctx.beginPath();
			ctx.arc(tx + Math.cos(ka) * kr, ty + Math.sin(ka) * kr, 1.8, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
		const named = netNameAt(pool, i, nets.length, time);
		label(ctx, named.name, tx, ty - 18 * s, palette, f * named.fade * 0.85, compact ? 9 : 11, 500);
		packet(ctx, pore.x, pore.y, tx, ty, (time * 0.45 + i * 0.3) % 1, palette.node, f * 0.9);
	});
	label(
		ctx,
		t('viz.home.netDeclared'),
		cx,
		cy - netR - 40 * s,
		palette,
		netF * 0.9 * dimNet,
		compact ? 10 : 12
	);

	// --- ...and nowhere else. The rest of the membrane holds. ---
	if (netF > 0.05) {
		[0.06, -0.16, 0.26].forEach((ba, i) => {
			const k = (time * 0.45 + i * 0.34) % 1;
			const t = k < 0.5 ? k * 2 : (1 - k) * 2;
			const edge = poreAt(cx, cy, r, ba, time);
			ctx.save();
			ctx.globalAlpha = netF * 0.85 * dimNet;
			ctx.fillStyle = palette.accent;
			ctx.beginPath();
			ctx.arc(cx + (edge.x - cx) * t, cy + (edge.y - cy) * t, 2.6, 0, Math.PI * 2);
			ctx.fill();
			if (t > 0.9) {
				// Contact flash on the membrane: it does not get through.
				ctx.globalAlpha = netF * (t - 0.9) * 6 * dimNet;
				ctx.strokeStyle = palette.accent;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.arc(cx, cy, edge.r, ba - 0.1, ba + 0.1);
				ctx.stroke();
			}
			ctx.restore();
		});
		label(
			ctx,
			t('viz.home.nowhereElse'),
			cx + r * 1.55,
			cy + r * 0.95,
			palette,
			netF * 0.85 * dimNet,
			compact ? 9 : 11,
			500
		);
	}

	// --- The default channel every service already has ---
	if (innerF > 0.01) {
		const pore = poreAt(cx, cy, r, Math.PI / 2, time);
		const endY = cy + r * (compact ? 1.85 : 2.15);
		ctx.save();
		ctx.globalAlpha = innerF * 0.8;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.8;
		ctx.beginPath();
		ctx.moveTo(pore.x, pore.y);
		ctx.lineTo(pore.x, pore.y + (endY - pore.y) * innerF);
		ctx.stroke();
		ctx.restore();

		// Two glyphs only: the node running it, and its parent. The spec
		// scene is about what the service DECLARES; its children belong to
		// the execution scene and only crowded this one.
		const gw = (compact ? 16 : 22) * s;
		const spread = (compact ? 30 : 40) * s;
		[-1, 1].forEach((k, i) => {
			const f = smoothstep(clamp(innerF * 1.4 - i * 0.1));
			if (f <= 0.02) return;
			const gx = cx + k * spread;
			ctx.save();
			ctx.globalAlpha = f * 0.5;
			ctx.strokeStyle = palette.node;
			ctx.lineWidth = 1.2;
			ctx.beginPath();
			ctx.moveTo(pore.x, endY);
			ctx.lineTo(gx, endY);
			ctx.stroke();
			ctx.globalAlpha = f * 0.9;
			ctx.lineWidth = 1.4;
			if (k === -1) {
				ctx.beginPath();
				ctx.arc(gx, endY, gw * 0.42, 0, Math.PI * 2);
				ctx.stroke();
			} else {
				roundRect(ctx, gx - gw / 2, endY - gw * 0.32, gw, gw * 0.64, 3);
				ctx.stroke();
			}
			ctx.restore();
		});
		label(ctx, t('viz.home.itsNodeItsParent'), cx, endY + 26 * s, palette, innerF * 0.8, compact ? 9 : 11, 500);
	}

	// Close the magnification transform.
	ctx.restore();
}

/* ==================================================================
 * SCENE 5 — Execution: who decides what
 * A parent service asks its node for children, stating the resources
 * each one needs and handing over a budget to spend on them. The node
 * compares its own cost against what its peers quote and places them.
 * Then the fog comes down: the parent cannot see WHERE anything
 * landed, only what its children are consuming — and that same line
 * is the split between what a node operator worries about and what a
 * service developer does.
 * ================================================================== */
export function drawExecutionScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const ask = range(progress, 0.0, 0.24); // resources stated, budget handed over
	const quote = range(progress, 0.22, 0.48); // peers quote their cost
	const place = range(progress, 0.46, 0.7); // the node places the children
	const blind = range(progress, 0.66, 0.86); // the "where" disappears
	const split = range(progress, 0.84, 1.0); // two concerns, one line

	const s = Math.max(0.85, scale * 0.8);
	const askF = smoothstep(ask);
	const placeF = smoothstep(place);
	const blindF = smoothstep(blind);
	const splitF = smoothstep(split);

	const pw = (compact ? 104 : 136) * s;
	const ph = pw * 0.56;
	const parentY = cy - (compact ? 132 : 168) * s;
	const parentBottom = parentY + ph / 2;
	const childY = cy + (compact ? 4 : 8) * s;
	const lineY = childY + (compact ? 78 : 96) * s;
	const hostY = lineY + (compact ? 48 : 62) * s;
	const spread = Math.min(width * (compact ? 0.3 : 0.14), height * 0.22);

	const hosts = compact
		? [
				{ x: cx - spread * 0.75, name: t('viz.home.thisNode'), cost: '0.9', local: true },
				{ x: cx + spread * 0.75, name: t('viz.home.aPeer'), cost: '0.7', winner: true }
			]
		: [
				{ x: cx - spread, name: t('viz.home.aPeer'), cost: '1.2' },
				{ x: cx, name: t('viz.home.thisNode'), cost: '0.9', local: true },
				{ x: cx + spread, name: t('viz.home.aPeer'), cost: '0.7', winner: true }
			];
	// The node doing the asking: index 0 when compact, 1 otherwise.
	const localX = hosts[compact ? 0 : 1].x;
	const hostR = (h) => (h.local ? 20 : 15) * s;

	const childGap = (compact ? 46 : 74) * s;
	const children = [
		{
			x: cx - childGap,
			host: compact ? 0 : 1,
			spec: compact ? '2 vCPU' : '2 vCPU · 512 MB'
		},
		{
			x: cx + childGap,
			host: compact ? 1 : 2,
			spec: compact ? '1 vCPU' : '1 vCPU · 256 MB'
		}
	];

	// --- The parent service ---
	sealedBox(ctx, cx - pw / 2, parentY - ph / 2, pw, ph, Math.min(1, ask * 3), palette, {
		scan: time
	});
	label(ctx, t('viz.home.aService'), cx, parentY - ph / 2 - 14, palette, askF, compact ? 10 : 12, 500);

	// --- What it hands down: resources stated, and a budget with them ---
	if (askF > 0.02) {
		ctx.save();
		ctx.globalAlpha = askF * 0.6;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.4;
		ctx.beginPath();
		ctx.moveTo(cx, parentBottom);
		ctx.lineTo(cx, parentBottom + (hostY - parentBottom) * askF);
		ctx.stroke();
		ctx.restore();
		for (let i = 0; i < 3; i++) {
			packet(ctx, cx, parentBottom, cx, hostY, (time * 0.6 + i * 0.33) % 1, palette.accent, askF);
		}

		const cw = (compact ? 74 : 108) * s;
		children.forEach((c, i) => {
			const f = smoothstep(clamp(ask * 1.4 - i * 0.15));
			if (f <= 0.02) return;
			const chipX = cx + cw * 0.62 + 14 * s;
			const chipY = parentBottom + (compact ? 26 : 32) * s + i * (compact ? 22 : 26) * s;
			ctx.save();
			ctx.globalAlpha = f * 0.9;
			ctx.strokeStyle = palette.node;
			ctx.lineWidth = 1.2;
			roundRect(ctx, chipX - cw / 2, chipY - 9 * s, cw, 18 * s, 5);
			ctx.stroke();
			ctx.font = `600 ${compact ? 9 : 10.5}px ${palette.fontBody || 'Lato, sans-serif'}`;
			ctx.textAlign = 'center';
			ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.78);
			ctx.fillText(c.spec, chipX, chipY + 3.5 * s);
			// The budget that travels with it.
			ctx.globalAlpha = f;
			ctx.fillStyle = palette.accent;
			ctx.beginPath();
			ctx.arc(chipX + cw / 2 + 9 * s, chipY, 3.4 * s, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		});
	}

	// --- The node asks its peers what they would charge ---
	hosts.forEach((h, i) => {
		const f = smoothstep(clamp(quote * 1.4 - i * 0.1));
		if (f <= 0.02) return;
		const hr = hostR(h);
		ctx.save();
		if (!h.local) {
			ctx.globalAlpha = f * 0.5;
			ctx.strokeStyle = palette.link;
			ctx.lineWidth = 1.2;
			ctx.setLineDash([4, 5]);
			ctx.lineDashOffset = -time * 16;
			ctx.beginPath();
			ctx.moveTo(localX, hostY);
			ctx.lineTo(localX + (h.x - localX) * f, hostY);
			ctx.stroke();
			ctx.setLineDash([]);
		}
		ctx.globalAlpha = f;
		ctx.strokeStyle = h.winner ? palette.accent : palette.node;
		ctx.lineWidth = h.winner ? 2.2 : 1.5;
		ctx.beginPath();
		ctx.arc(h.x, hostY, hr, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.05);
		ctx.fill();
		if (h.winner) {
			ctx.globalAlpha = f * 0.22 * (0.5 + 0.5 * Math.sin(time * 2));
			ctx.fillStyle = palette.accent;
			ctx.beginPath();
			ctx.arc(h.x, hostY, hr * 1.8, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
		if (!compact) label(ctx, h.name, h.x, hostY + hr + 17 * s, palette, f * 0.75, 10, 500);
		label(
			ctx,
			t('viz.home.cost', { value: h.cost }),
			h.x,
			hostY + hr + (compact ? 16 : 32) * s,
			palette,
			f * 0.9,
			compact ? 9 : 11
		);
		if (!h.local) {
			packet(ctx, h.x, hostY, localX, hostY, (time * 0.55 + i * 0.3) % 1, palette.node, f * 0.8);
		}
	});

	// --- The children land wherever the node decided ---
	const cwd = (compact ? 54 : 72) * s;
	const chh = cwd * 0.56;
	children.forEach((c, i) => {
		const f = smoothstep(clamp(place * 1.4 - i * 0.12));
		if (f <= 0.02) return;
		sealedBox(ctx, c.x - cwd / 2, childY - chh / 2, cwd, chh, f, palette, { scan: time + i });
		ctx.save();
		ctx.globalAlpha = f * 0.55;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.3;
		ctx.beginPath();
		ctx.moveTo(cx, parentBottom);
		ctx.lineTo(c.x, childY - chh / 2);
		ctx.stroke();
		// Child → wherever it actually runs. This is the line the fog eats.
		ctx.globalAlpha = f * 0.45 * (1 - blindF);
		ctx.setLineDash([3, 5]);
		ctx.beginPath();
		ctx.moveTo(c.x, childY + chh / 2);
		ctx.lineTo(hosts[c.host].x, hostY - hostR(hosts[c.host]));
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();
	});
	label(ctx, t('viz.home.children'), cx, childY - (compact ? 26 : 32) * s, palette, placeF * 0.8, compact ? 9 : 11, 500);

	// --- The fog: from up here, the "where" simply is not visible ---
	if (blindF > 0.01) {
		const bottom = hostY + (compact ? 58 : 74) * s;
		const fw = Math.min(width, spread * 2 + (compact ? 170 : 300) * s);
		const fh = bottom - lineY;
		// An ellipse, not a rectangle: a fillRect with a radial gradient
		// still has to reach alpha 0 before the rect edge or the "fog"
		// reads as a UI panel. Squashing the transform gets the falloff
		// to match the band's proportions instead.
		ctx.save();
		ctx.globalAlpha = blindF;
		ctx.translate(cx, lineY + fh * 0.45);
		ctx.scale(1, (fh * 1.15) / fw);
		// The painted square is wider than the gradient reaches, so the
		// falloff stays flat right across the host row and still hits
		// alpha 0 well before any edge of the fill.
		const g = ctx.createRadialGradient(0, 0, 0, 0, 0, fw * 0.62);
		g.addColorStop(0, rgba(palette.surfaceDeepRgb, 0.95));
		g.addColorStop(0.7, rgba(palette.surfaceDeepRgb, 0.92));
		g.addColorStop(1, rgba(palette.surfaceDeepRgb, 0));
		ctx.fillStyle = g;
		ctx.fillRect(-fw * 0.85, -fw * 0.85, fw * 1.7, fw * 1.7);
		ctx.restore();
	}

	// --- What the parent DOES see: how fast each child is spending ---
	if (blindF > 0.02) {
		children.forEach((c, i) => {
			const by = childY + chh / 2 + 12 * s;
			const left = 1 - ((time * 0.14 + i * 0.45) % 1);
			ctx.save();
			ctx.globalAlpha = blindF * 0.7;
			ctx.strokeStyle = rgba(palette.onSurfaceRgb, 0.45);
			ctx.lineWidth = 1;
			roundRect(ctx, c.x - cwd / 2, by, cwd, 6 * s, 3);
			ctx.stroke();
			ctx.globalAlpha = blindF;
			ctx.fillStyle = left < 0.25 ? palette.accent : palette.node;
			roundRect(ctx, c.x - cwd / 2, by, cwd * left, 6 * s, 3);
			ctx.fill();
			ctx.restore();
			// The parent tops it back up when it runs low.
			if (left < 0.3) {
				packet(ctx, cx, parentBottom, c.x, by, (time * 1.1) % 1, palette.accent, blindF);
			}
		});
		label(
			ctx,
			t('viz.home.whatTheySpend'),
			cx,
			childY + chh / 2 + 32 * s,
			palette,
			blindF * 0.85,
			compact ? 9 : 11,
			500
		);
	}

	// --- The line itself: two concerns, and nothing crossing it ---
	if (splitF > 0.01) {
		const lw = Math.min(width * 0.6, spread * 2 + (compact ? 160 : 260) * s);
		ctx.save();
		ctx.globalAlpha = splitF * 0.8;
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 1.6;
		ctx.setLineDash([6, 6]);
		ctx.beginPath();
		ctx.moveTo(cx - lw / 2, lineY);
		ctx.lineTo(cx - lw / 2 + lw * splitF, lineY);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();
		label(
			ctx,
			compact ? t('viz.home.developersShort') : t('viz.home.developersLong'),
			cx,
			lineY - 12 * s,
			palette,
			splitF * 0.9,
			compact ? 9 : 11
		);
		label(
			ctx,
			compact ? t('viz.home.operatorsShort') : t('viz.home.operatorsLong'),
			cx,
			lineY + 20 * s,
			palette,
			splitF * 0.9,
			compact ? 9 : 11
		);
	}
}

/* ==================================================================
 * SCENE 6 — Determinism
 * The same input is dispatched to three different nodes, at three
 * different times, and all three return an identical result.
 * ================================================================== */
export function drawDeterminismScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
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
	const when = t('viz.home.when');

	// --- The input, on the left ---
	const inF = smoothstep(input);
	ctx.save();
	ctx.globalAlpha = inF;
	ctx.fillStyle = palette.accent;
	ctx.beginPath();
	ctx.arc(startX - laneW * 0.5, cy, 13 * Math.max(0.85, scale * 0.8), 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
	label(ctx, t('viz.home.oneInput'), startX - laneW * 0.5, cy + 32, palette, inF, compact ? 10 : 12);

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
			ctx.font = `700 ${compact ? 11 : 13}px ${palette.fontBody || 'Lato, sans-serif'}`;
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
			t('viz.home.identicalEveryTime'),
			cx + laneW * 0.2,
			topY + (lanes - 1) * laneGap + 56,
			palette,
			f * 0.9,
			compact ? 11 : 13
		);
	}
}

/* ==================================================================
 * SCENE 7 — Coordination without trust
 * A loop, not a handshake. Reputation comes FIRST: before a stranger
 * is worth talking to, each party reads what the sources it already
 * trusts have said about it. Only then does value move, and what it
 * buys is a concrete right to consume a node's resources. The node
 * honours that right because the outcome is written back to the
 * ledger — and that record is what the next stranger will read. The
 * arc closing the cycle IS the enforcement mechanism, so it, the
 * rights chip and the fresh record all persist to the final frame.
 * ================================================================== */
export function drawTrustScene(ctx, { width, height, progress, palette, mouse, time, align, t }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const read = range(progress, 0.0, 0.26); // the sources are consulted
	const pay = range(progress, 0.24, 0.48); // value buys resource rights
	const serve = range(progress, 0.46, 0.68); // the node spends resources
	const record = range(progress, 0.64, 0.86); // the outcome is written down
	const loop = range(progress, 0.82, 1.0); // and it feeds the next lookup

	const s = Math.max(0.85, scale * 0.8);
	const partyF = smoothstep(range(progress, 0.0, 0.12));
	const readF = smoothstep(read);
	const payF = smoothstep(pay);
	const serveF = smoothstep(serve);
	const recordF = smoothstep(record);
	const loopF = smoothstep(loop);

	const gap = (compact ? 94 : 152) * s;
	const ax = cx - gap;
	const bx = cx + gap;
	const partyY = cy - (compact ? 96 : 112) * s;
	const ledgerY = cy + (compact ? 68 : 82) * s;
	const lw = compact ? Math.min(width * 0.74, gap * 2.5) : gap * 2.4;
	const lh = (compact ? 26 : 32) * s;
	const pr = 14 * s;

	/* ---- The ledger: everything else reads from or writes to it ---- */
	const ledgerF = smoothstep(range(progress, 0.04, 0.2));
	if (ledgerF > 0.01) {
		ctx.save();
		ctx.globalAlpha = ledgerF;
		roundRect(ctx, cx - lw / 2, ledgerY - lh / 2, lw, lh, 9);
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 1.8;
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.05);
		ctx.fill();
		// Records already on it; the last slot stays empty until this
		// interaction gets written into it.
		const slots = compact ? 5 : 7;
		const step = (lw - 26 * s) / slots;
		for (let i = 0; i < slots; i++) {
			const filled = i < slots - 1 ? 1 : recordF;
			if (filled <= 0.02) continue;
			ctx.globalAlpha = ledgerF * (0.35 + 0.45 * filled);
			ctx.fillStyle = i === slots - 1 ? palette.accent : palette.node;
			ctx.fillRect(cx - lw / 2 + 13 * s + i * step, ledgerY - 6 * s, 7 * s, 12 * s * filled);
		}
		ctx.restore();
		label(
			ctx,
			t('viz.home.reputationLedger'),
			cx,
			ledgerY + lh / 2 + 20 * s,
			palette,
			ledgerF * 0.85,
			compact ? 9 : 11,
			500
		);
	}

	/* ---- The sources, weighted by how much each is trusted --------- */
	if (readF > 0.01) {
		const n = compact ? 3 : 4;
		const sy = ledgerY + lh / 2 + (compact ? 48 : 58) * s;
		for (let i = 0; i < n; i++) {
			const f = smoothstep(clamp(read * 1.4 - i * 0.12));
			if (f <= 0.02) continue;
			const sx = cx - lw / 2 + 16 * s + (i / (n - 1)) * (lw - 32 * s);
			ctx.save();
			ctx.globalAlpha = f * 0.45;
			ctx.strokeStyle = palette.link;
			ctx.lineWidth = 1.1;
			ctx.setLineDash([4, 5]);
			ctx.beginPath();
			ctx.moveTo(sx, sy);
			ctx.lineTo(cx + (sx - cx) * 0.55, ledgerY + lh / 2);
			ctx.stroke();
			ctx.setLineDash([]);
			// Bigger dot, more weight: no two actors read the same ledger
			// the same way.
			ctx.globalAlpha = f;
			ctx.fillStyle = palette.node;
			ctx.beginPath();
			ctx.arc(sx, sy, (3.5 + rand(i + 2) * 5.5) * s, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
		label(ctx, t('viz.home.sourcesYouTrust'), cx, sy + (compact ? 22 : 26) * s, palette, readF * 0.8, compact ? 9 : 11, 500);
	}

	/* ---- Step 1: the requester reads before it talks --------------- */
	// Fades once the payment beat takes over — it is the one step that
	// genuinely belongs to a single moment.
	const lookF = readF * (1 - smoothstep(range(progress, 0.3, 0.44)));
	if (lookF > 0.02) {
		ctx.save();
		ctx.globalAlpha = lookF * 0.55;
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 1.3;
		ctx.setLineDash([3, 5]);
		ctx.beginPath();
		ctx.moveTo(ax, partyY + pr);
		ctx.lineTo(cx - lw * 0.3, ledgerY - lh / 2);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();
		packet(ctx, cx - lw * 0.3, ledgerY - lh / 2, ax, partyY + pr, (time * 0.7) % 1, palette.accent, lookF);
		label(
			ctx,
			t('viz.home.firstWhatSources'),
			cx,
			partyY + 40 * s,
			palette,
			lookF * 0.9,
			compact ? 9 : 11,
			500
		);
	}

	/* ---- Step 2: value buys a concrete right ----------------------- */
	if (payF > 0.01) {
		ctx.save();
		ctx.globalAlpha = payF * 0.5;
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.6;
		ctx.beginPath();
		ctx.moveTo(ax + pr + 4 * s, partyY);
		ctx.lineTo(bx - pr - 4 * s, partyY);
		ctx.stroke();
		ctx.restore();
		for (let i = 0; i < 3; i++) {
			packet(ctx, ax, partyY, bx, partyY, (time * 0.5 + i * 0.33) % 1, palette.accent, payF);
		}
		// What comes back is not a promise: it is a right, with an amount
		// and a duration on it. Kept for the rest of the scene.
		const chipW = (compact ? 96 : 128) * s;
		const chipY = partyY + (compact ? 32 : 38) * s;
		ctx.save();
		ctx.globalAlpha = payF;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.4;
		roundRect(ctx, cx - chipW / 2, chipY - 11 * s, chipW, 22 * s, 6);
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.06);
		ctx.fill();
		ctx.font = `700 ${compact ? 9 : 10.5}px ${palette.fontBody || 'Lato, sans-serif'}`;
		ctx.textAlign = 'center';
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.85);
		ctx.fillText(compact ? t('viz.home.rightShort') : t('viz.home.rightLong'), cx, chipY + 4 * s);
		ctx.restore();
		label(
			ctx,
			t('viz.home.paymentRights'),
			cx,
			chipY + (compact ? 24 : 28) * s,
			palette,
			payF * 0.85,
			compact ? 9 : 11,
			500
		);
	}

	/* ---- Step 3: the node spends real resources honouring it ------- */
	if (serveF > 0.01) {
		const bw = (compact ? 52 : 66) * s;
		const bh = bw * 0.56;
		const by = partyY + (compact ? 30 : 34) * s;
		// A stem, so the work reads as the node's own rather than floating.
		ctx.save();
		ctx.globalAlpha = serveF * 0.45;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.3;
		ctx.beginPath();
		ctx.moveTo(bx, partyY + pr);
		ctx.lineTo(bx, by);
		ctx.stroke();
		ctx.restore();
		sealedBox(ctx, bx - bw / 2, by, bw, bh, serveF, palette, { scan: time });
		for (let i = 0; i < 3; i++) {
			packet(ctx, bx, by + bh, ax, partyY + pr, (time * 0.55 + i * 0.33) % 1, palette.node, serveF * 0.85);
		}
	}

	/* ---- Step 4: the outcome is written back ----------------------- */
	if (recordF > 0.01) {
		ctx.save();
		ctx.globalAlpha = recordF * 0.5;
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 1.4;
		ctx.setLineDash([3, 5]);
		// Bowed downward so it passes under the rights chip rather than
		// straight through its caption.
		ctx.beginPath();
		ctx.moveTo(ax, partyY + pr);
		ctx.quadraticCurveTo(cx - lw * 0.2, ledgerY - lh * 0.9, cx + lw * 0.36, ledgerY - lh / 2);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();
		packet(ctx, ax, partyY + pr, cx + lw * 0.36, ledgerY - lh / 2, (time * 0.6) % 1, palette.accent, recordF);
		label(
			ctx,
			t('viz.home.outcomeRecorded'),
			cx - lw * (compact ? 0.06 : 0.18),
			ledgerY - lh / 2 - 15 * s,
			palette,
			recordF * 0.9,
			compact ? 9 : 11,
			500
		);
	}

	/* ---- Step 5: which is what the next stranger reads ------------- */
	if (loopF > 0.01) {
		const rx = cx + lw / 2 + (compact ? 26 : 40) * s;
		ctx.save();
		ctx.globalAlpha = loopF * 0.75;
		ctx.strokeStyle = palette.accent;
		ctx.lineWidth = 1.8;
		ctx.setLineDash([7, 6]);
		ctx.lineDashOffset = -time * 22;
		ctx.beginPath();
		ctx.moveTo(cx + lw / 2, ledgerY);
		ctx.quadraticCurveTo(rx, ledgerY, rx, (ledgerY + partyY) / 2);
		ctx.quadraticCurveTo(rx, partyY, bx + pr + 16 * s, partyY);
		ctx.stroke();
		ctx.setLineDash([]);
		// Arrowhead pointing straight back into the node.
		ctx.globalAlpha = loopF;
		ctx.fillStyle = palette.accent;
		ctx.beginPath();
		ctx.moveTo(bx + pr + 4 * s, partyY);
		ctx.lineTo(bx + pr + 15 * s, partyY - 6 * s);
		ctx.lineTo(bx + pr + 15 * s, partyY + 6 * s);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		label(
			ctx,
			t('viz.home.nextStranger'),
			cx,
			partyY - 52 * s,
			palette,
			loopF * 0.9,
			compact ? 9 : 11,
			500
		);
	}

	/* ---- The two parties, drawn last so nothing crosses them ------- */
	[
		{ x: ax, name: t('viz.home.requester'), colour: palette.accent },
		{ x: bx, name: t('viz.home.node'), colour: palette.node }
	].forEach((p) => {
		ctx.save();
		ctx.globalAlpha = partyF;
		ctx.fillStyle = p.colour;
		ctx.beginPath();
		ctx.arc(p.x, partyY, pr, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		label(ctx, p.name, p.x, partyY - 26 * s, palette, partyF, compact ? 10 : 12);
	});
}

/* ==================================================================
 * SCENE 9 — Core principles
 * The closing recap of the paradigm story, and the one scene that is
 * deliberately NOT a new idea: everything the previous eight scenes
 * showed is a consequence of three commitments, so this one draws the
 * three of them as a closed figure and hangs each consequence off the
 * vertex it comes from.
 *
 * A triangle rather than three cards, because the point is that they
 * hold each other up: drop decentralization and determinism stops
 * being worth anything (nobody to check the answer against); drop
 * simplicity and neither of the other two survives contact with an
 * implementation. Each vertex carries a tiny motif of its own —
 * a mesh with no centre, three rules and nothing more, one answer
 * repeated — so the figure states the principle as well as naming it.
 *
 * Principle names come from `home.principles.items`, the same array
 * the caption beats read, so the canvas can never drift out of sync
 * with the words beside it in any locale.
 * ================================================================== */

/**
 * The mesh with no middle: peers wired to each other and to nothing
 * above them. Drawn small, as a vertex motif.
 */
function motifDecentralized(ctx, x, y, r, f, palette, time) {
	const n = 6;
	const pts = [];
	for (let i = 0; i < n; i++) {
		const a = (i / n) * Math.PI * 2 + time * 0.12;
		pts.push({ x: x + Math.cos(a) * r, y: y + Math.sin(a) * r });
	}
	ctx.save();
	ctx.globalAlpha = f * 0.4;
	ctx.strokeStyle = palette.link;
	ctx.lineWidth = 1;
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			// Every peer to every other peer, and to nothing else.
			ctx.beginPath();
			ctx.moveTo(pts[i].x, pts[i].y);
			ctx.lineTo(pts[j].x, pts[j].y);
			ctx.stroke();
		}
	}
	ctx.globalAlpha = f;
	ctx.fillStyle = palette.node;
	for (const p of pts) {
		ctx.beginPath();
		ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.restore();
}

/**
 * Three rules and nothing more. The strokes arrive one at a time and
 * then stop — the motif is as much about the fourth line never showing
 * up as about the three that do.
 */
function motifSimple(ctx, x, y, r, f, palette) {
	ctx.save();
	ctx.strokeStyle = palette.node;
	ctx.lineWidth = 2.2;
	ctx.lineCap = 'round';
	for (let i = 0; i < 3; i++) {
		const k = clamp(f * 1.5 - i * 0.22);
		if (k <= 0) continue;
		const yy = y - r * 0.55 + i * r * 0.55;
		ctx.globalAlpha = smoothstep(k);
		ctx.beginPath();
		ctx.moveTo(x - r, yy);
		ctx.lineTo(x - r + 2 * r * smoothstep(k), yy);
		ctx.stroke();
	}
	ctx.restore();
}

/**
 * One answer, repeated. Three identical marks, so the eye reads
 * "same" before it reads anything else.
 */
function motifDeterministic(ctx, x, y, r, f, palette) {
	ctx.save();
	ctx.strokeStyle = palette.node;
	ctx.lineWidth = 1.6;
	const w = r * 0.52;
	for (let i = 0; i < 3; i++) {
		const k = clamp(f * 1.5 - i * 0.2);
		if (k <= 0) continue;
		ctx.globalAlpha = smoothstep(k);
		const cxx = x + (i - 1) * r * 0.78;
		roundRect(ctx, cxx - w / 2, y - w / 2, w, w, 3);
		ctx.stroke();
		// The identical mark inside each one.
		ctx.globalAlpha = smoothstep(k) * 0.75;
		ctx.beginPath();
		ctx.moveTo(cxx - w * 0.22, y);
		ctx.lineTo(cxx - w * 0.04, y + w * 0.2);
		ctx.lineTo(cxx + w * 0.24, y - w * 0.2);
		ctx.stroke();
	}
	ctx.restore();
}

const PRINCIPLE_MOTIFS = [motifDecentralized, motifSimple, motifDeterministic];

export function drawPrinciplesScene(
	ctx,
	{ width, height, progress, palette, mouse, time, align, t }
) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const s = Math.max(0.85, scale * 0.8);
	const R = (compact ? 96 : 138) * s;

	const form = smoothstep(range(progress, 0.0, 0.2));
	// One window per principle, matching the caption beats: the vertex
	// the reader is being told about is the vertex that is lit.
	const lit = [
		smoothstep(range(progress, 0.18, 0.42)),
		smoothstep(range(progress, 0.4, 0.64)),
		smoothstep(range(progress, 0.62, 0.86))
	];
	const whole = smoothstep(range(progress, 0.84, 1.0));

	const items = t('home.principles.items');
	const names = Array.isArray(items) ? items.map((/** @type {any} */ i) => i.title) : ['', '', ''];
	const consequences = t('viz.home.principles.consequences');
	const conseq = Array.isArray(consequences) ? consequences : ['', '', ''];

	// Vertices: apex up, then clockwise. The apex is the one the eye
	// lands on first, so it carries the principle everything else is
	// usually mistaken for being about.
	const angles = [-Math.PI / 2, Math.PI / 6, (Math.PI * 5) / 6];
	const verts = angles.map((a) => ({
		x: cx + Math.cos(a) * R,
		y: cy + Math.sin(a) * R,
		a
	}));

	/* ---- The figure itself: three edges, drawn in sequence -------- */
	ctx.save();
	ctx.strokeStyle = palette.node;
	ctx.lineWidth = 2;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	for (let i = 0; i < 3; i++) {
		const k = smoothstep(clamp(form * 1.6 - i * 0.22));
		if (k <= 0.01) continue;
		const a = verts[i];
		const b = verts[(i + 1) % 3];
		// Each edge is brightest while either of the principles it joins
		// is being read about — the edges are the mutual dependency.
		const near = Math.max(lit[i], lit[(i + 1) % 3]);
		ctx.globalAlpha = (0.34 + 0.42 * near) * k;
		ctx.beginPath();
		ctx.moveTo(a.x, a.y);
		ctx.lineTo(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k);
		ctx.stroke();
	}
	ctx.restore();

	/* ---- The interior, once all three are in place ---------------- */
	if (whole > 0.01) {
		ctx.save();
		ctx.globalAlpha = whole * 0.5;
		const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
		g.addColorStop(0, rgba(palette.onSurfaceRgb, 0.1));
		g.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.moveTo(verts[0].x, verts[0].y);
		ctx.lineTo(verts[1].x, verts[1].y);
		ctx.lineTo(verts[2].x, verts[2].y);
		ctx.closePath();
		ctx.fill();
		ctx.restore();

		// A slow sweep from the centre out to each vertex: the derivation
		// running, rather than a static diagram.
		verts.forEach((v, i) => {
			const k = (time * 0.32 + i * 0.33) % 1;
			packet(ctx, cx, cy, v.x, v.y, k, palette.accent, whole * 0.8, 2.6);
		});
	}

	/* ---- Each vertex: its motif, its name, its consequence -------- */
	verts.forEach((v, i) => {
		const f = Math.max(form * 0.32, lit[i]);
		if (f <= 0.02) return;
		const mr = (compact ? 20 : 27) * s;

		// A disc behind the motif so the edges do not run through it.
		ctx.save();
		ctx.globalAlpha = f;
		ctx.fillStyle = palette.surfaceDeep;
		ctx.beginPath();
		ctx.arc(v.x, v.y, mr * 1.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = f * (0.3 + 0.6 * lit[i]);
		ctx.strokeStyle = lit[i] > 0.5 ? palette.accent : palette.node;
		ctx.lineWidth = 1.4;
		ctx.beginPath();
		ctx.arc(v.x, v.y, mr * 1.5, 0, Math.PI * 2);
		ctx.stroke();
		ctx.restore();

		PRINCIPLE_MOTIFS[i](ctx, v.x, v.y, mr * 0.78, f, palette, time);

		// The name sits outside the figure, pushed along the vertex's own
		// angle so it never lands on an edge.
		const lx = v.x + Math.cos(v.a) * mr * 2.5;
		const ly = v.y + Math.sin(v.a) * mr * 2.5 + (i === 0 ? -4 : 10) * s;
		label(ctx, names[i] || '', lx, ly, palette, f, compact ? 11 : 13.5);

		// ...and under it, the thing the previous scenes showed, which
		// this principle is where it came from.
		if (lit[i] > 0.05) {
			label(
				ctx,
				conseq[i] || '',
				lx,
				ly + (compact ? 15 : 18) * s,
				palette,
				lit[i] * 0.8,
				compact ? 9 : 10.5,
				500
			);
		}
	});

	/* ---- The closing line, in the middle of the figure ------------- */
	if (whole > 0.05) {
		label(
			ctx,
			t('viz.home.principles.derivedFrom'),
			cx,
			cy + (compact ? 4 : 5) * s,
			palette,
			whole * 0.9,
			compact ? 9.5 : 11.5,
			500
		);
	}
}
