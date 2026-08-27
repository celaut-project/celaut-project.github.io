/*
 * src/lib/motion.js
 * ------------------------------------------------------------------
 * Shared motion runtime for the site: GSAP + ScrollTrigger + Lenis.
 *
 * WHY A MODULE INSTEAD OF PER-COMPONENT IMPORTS
 * ---------------------------------------------
 * The site is prerendered by adapter-static, so *nothing* touching
 * `window` may run at module top level. Everything here is behind an
 * async loader that is only ever called from `onMount`, which keeps
 * the SSR/prerender pass clean and also code-splits GSAP out of the
 * initial bundle.
 *
 * ACCESSIBILITY
 * -------------
 * `prefersReducedMotion()` is the single gate every scene checks. When
 * it is true we skip GSAP entirely and the markup renders as a plain,
 * fully-visible static layout (each scene component is authored so its
 * "final" state is also its CSS default when `.motion-on` is absent).
 */

import { browser } from '$app/environment';

/** True when the user has asked the OS for less animation. */
export function prefersReducedMotion() {
	if (!browser || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** True for viewports where full-screen pinning is a bad idea. */
export function isCompactViewport() {
	if (!browser) return false;
	return window.matchMedia('(max-width: 820px)').matches;
}

/** @type {Promise<{ gsap: any, ScrollTrigger: any }> | null} */
let gsapPromise = null;

/**
 * Lazily import GSAP + ScrollTrigger exactly once and register the
 * plugin. Resolves to `{ gsap, ScrollTrigger }`, or `null` when we are
 * not in a browser.
 */
export async function loadGsap() {
	if (!browser) return null;
	if (!gsapPromise) {
		gsapPromise = (async () => {
			const [{ gsap }, { ScrollTrigger }] = await Promise.all([
				import('gsap'),
				import('gsap/ScrollTrigger')
			]);
			gsap.registerPlugin(ScrollTrigger);
			return { gsap, ScrollTrigger };
		})();
	}
	return gsapPromise;
}

/** @type {import('lenis').default | null} */
let lenis = null;
let lenisRaf = null;
let lenisRefs = 0;

/**
 * Start (or join) the shared Lenis smooth-scroll instance and wire it
 * into ScrollTrigger so pinning stays in sync. Returns a teardown
 * function; the instance is only really destroyed when the last
 * consumer releases it.
 *
 * No-ops (returning a no-op teardown) under reduced motion, so the
 * native scroll behaviour is left completely alone.
 */
export async function startSmoothScroll() {
	if (!browser || prefersReducedMotion()) return () => {};

	lenisRefs += 1;

	if (!lenis) {
		const [{ default: Lenis }, gsapBits] = await Promise.all([import('lenis'), loadGsap()]);

		lenis = new Lenis({
			duration: 1.05,
			// Gentle exponential ease-out — glides without feeling laggy.
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			// Native momentum on touch beats an emulated one every time.
			syncTouch: false
		});

		if (gsapBits) {
			const { gsap, ScrollTrigger } = gsapBits;
			lenis.on('scroll', ScrollTrigger.update);
			// Drive Lenis from GSAP's ticker so both share one RAF loop.
			const tick = (time) => lenis && lenis.raf(time * 1000);
			gsap.ticker.add(tick);
			gsap.ticker.lagSmoothing(0);
			lenisRaf = () => gsap.ticker.remove(tick);
		} else {
			let id = requestAnimationFrame(function loop(time) {
				if (lenis) lenis.raf(time);
				id = requestAnimationFrame(loop);
			});
			lenisRaf = () => cancelAnimationFrame(id);
		}
	}

	return () => {
		lenisRefs = Math.max(0, lenisRefs - 1);
		if (lenisRefs === 0 && lenis) {
			if (lenisRaf) lenisRaf();
			lenisRaf = null;
			lenis.destroy();
			lenis = null;
		}
	};
}

/**
 * Force scroll back to the top and make ScrollTrigger re-measure every
 * pin against the freshly-mounted page.
 *
 * WHY THIS EXISTS
 * ----------------
 * `+page.svelte` unmounts/remounts on every route change, and each one
 * tears down its own Lenis ref and reverts its own GSAP context — but
 * that teardown/setup pair is asynchronous (dynamic imports), so there
 * is a window, right after a client-side navigation, where the browser
 * is still sitting at the PREVIOUS page's scroll offset while the new
 * page's (shorter, not-yet-pinned) DOM has just been inserted. A stray
 * `new Lenis()` reading that stale `scrollY` as its baseline, or a
 * `ScrollTrigger.refresh()` racing the layout before webfonts/images
 * settle, is exactly what makes a destination page open mid-scroll with
 * its pins mis-measured (symptom: the fixed topbar seems to "vanish"
 * until the user scrolls, which is just ScrollTrigger catching up).
 *
 * Called from the root layout's `afterNavigate`, this resets the native
 * scroll position unconditionally and, once GSAP is loaded, refreshes
 * ScrollTrigger twice — immediately and on the next frame — so both the
 * synchronous DOM and any late reflow are accounted for.
 */
export function hardResetScroll() {
	if (!browser) return;
	window.scrollTo(0, 0);
	if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
	if (gsapPromise) {
		gsapPromise.then((bits) => {
			if (!bits) return;
			const { ScrollTrigger } = bits;
			ScrollTrigger.refresh();
			requestAnimationFrame(() => ScrollTrigger.refresh());
		});
	}
}

/** Scroll to an element/offset through Lenis when it is running. */
export function scrollTo(target, options = {}) {
	if (!browser) return;
	if (lenis && !prefersReducedMotion()) {
		lenis.scrollTo(target, { duration: 1.1, ...options });
		return;
	}
	const el = typeof target === 'string' ? document.querySelector(target) : target;
	if (el && el.scrollIntoView) {
		el.scrollIntoView({
			behavior: prefersReducedMotion() ? 'auto' : 'smooth',
			block: 'start'
		});
	} else if (typeof target === 'number') {
		window.scrollTo({ top: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
	}
}

/**
 * Read a CSS custom property off <html> as a concrete colour string.
 * Canvas can't consume `var(--x)`, so every procedural scene resolves
 * its palette through this — which is also what makes the canvases
 * re-theme correctly when the toggle flips.
 */
export function cssVar(name, fallback = '#000000') {
	if (!browser) return fallback;
	const value = getComputedStyle(document.documentElement).getPropertyValue(name);
	return value ? value.trim() : fallback;
}

/**
 * Observe theme flips on <html data-theme>. Canvas scenes use this to
 * re-resolve their palette instead of baking colours in at mount.
 * Returns a disconnect function.
 */
export function onThemeChange(callback) {
	if (!browser) return () => {};
	const observer = new MutationObserver(() => callback());
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['data-theme']
	});
	return () => observer.disconnect();
}

/**
 * Size a canvas's backing store to its own CSS box at device-pixel-ratio,
 * returning the CSS-pixel dimensions. Keeps every procedural scene crisp
 * on retina without each one re-deriving the same DPR maths.
 *
 * IMPORTANT: this measures the CANVAS, not its parent, and clears any
 * inline sizing before measuring. Measuring the parent and then writing
 * an inline pixel height back onto the canvas creates a feedback loop
 * wherever the canvas participates in its parent's height (which is
 * exactly what the reduced-motion/static scene layout does): the canvas
 * grows the section, the ResizeObserver fires, the canvas grows again,
 * and the page runs away to hundreds of thousands of pixels tall.
 *
 * Letting CSS own the layout box and only writing the backing store
 * keeps sizing one-directional.
 */
export function fitCanvas(canvas) {
	// Drop any previous inline sizing so the box is purely CSS-derived.
	canvas.style.width = '';
	canvas.style.height = '';
	const rect = canvas.getBoundingClientRect();
	const dpr = Math.min(window.devicePixelRatio || 1, 2);
	const width = Math.max(1, Math.round(rect.width));
	const height = Math.max(1, Math.round(rect.height));
	const nextW = Math.floor(width * dpr);
	const nextH = Math.floor(height * dpr);
	// Assigning width/height clears the canvas, so only do it on change.
	if (canvas.width !== nextW || canvas.height !== nextH) {
		canvas.width = nextW;
		canvas.height = nextH;
	}
	const ctx = canvas.getContext('2d');
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	return { ctx, width, height };
}

/** Clamp helper used all over the canvas scenes. */
export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Map `t` in [a,b] to [0,1], clamped. Great for staging scene beats. */
export function range(t, a, b) {
	if (b === a) return t >= b ? 1 : 0;
	return clamp((t - a) / (b - a));
}

/** Smoothstep easing for hand-rolled canvas interpolation. */
export function smoothstep(t) {
	const x = clamp(t);
	return x * x * (3 - 2 * x);
}
