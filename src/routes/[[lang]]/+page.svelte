<script>
	/*
	 * Landing page.
	 *
	 * The ideas that make up the paradigm are full-screen pinned scenes
	 * with scroll-scrubbed procedural canvases:
	 *
	 *   1. Foundations   — Conway's Life, stepped by your scroll
	 *   2. Network       — everyone has nodes; nobody else lets you skip
	 *                      the protocol. One node forks a ring, then the
	 *                      same peers wire up wherever they overlap
	 *   3. Services      — machinery is sealed into a black box
	 *   4. Specification — one body: BOX, its API, its declared NET
	 *   5. Execution     — children with budgets, and a node deciding
	 *                      where they land
	 *   6. Determinism   — one input, three runs, one answer
	 *   7. Coordination  — payment and reputation between strangers
	 *
	 * The words live in the dictionaries under `home.scenes.<id>`; what
	 * stays here is the pairing of each scene with its draw function and
	 * its scroll timings, which are layout rather than copy.
	 *
	 * Below the scenes the page hands off to the three audience pages
	 * (/depin, /developers, /users) and then to the grounded sections.
	 *
	 * Under prefers-reduced-motion every pin and scrub is skipped: each
	 * canvas paints one static frame and every caption beat renders
	 * stacked, so the page degrades to an illustrated article.
	 */
	import { onMount } from 'svelte';
	import { loadGsap, startSmoothScroll, prefersReducedMotion } from '$lib/motion.js';
	import { t, href } from '$lib/i18n/index.js';
	import Hero from '$lib/components/Hero.svelte';
	import PinnedScene from '$lib/components/immersive/PinnedScene.svelte';
	import SceneBeat from '$lib/components/immersive/SceneBeat.svelte';
	import {
		drawAutomataScene,
		drawAtomsScene,
		drawNetworkScene,
		drawBlackBoxScene,
		drawSpecCellScene,
		drawExecutionScene,
		drawDeterminismScene,
		drawTrustScene
	} from '$lib/components/home/scenes.js';
	import AudienceRouter from '$lib/components/home/AudienceRouter.svelte';
	import CorePrinciples from '$lib/components/CorePrinciples.svelte';
	import WhatIsNot from '$lib/components/WhatIsNot.svelte';
	import Nodes from '$lib/components/Nodes.svelte';
	import Coordination from '$lib/components/Coordination.svelte';
	import ServiceDistribution from '$lib/components/ServiceDistribution.svelte';
	import Applications from '$lib/components/Applications.svelte';
	import SectionIndex from '$lib/components/SectionIndex.svelte';
	import GoToTop from '$lib/components/GoToTop.svelte';

	/**
	 * One caption beat's scroll window. `zoom` marks a beat whose
	 * component can be explored in depth (the specification scene).
	 * @typedef {{ from: number, to: number, hold?: boolean, zoom?: string }} BeatTiming
	 */

	// Three-beat rhythm, shared by four of the eight scenes.
	/** @type {BeatTiming[]} */
	const THREE = [{ from: 0, to: 0.34 }, { from: 0.3, to: 0.66 }, { from: 0.62, to: 1, hold: true }];

	const scenes = [
		{ id: 'foundations', draw: drawAutomataScene, scrollLength: 2.4, beats: THREE },
		{ id: 'atoms', draw: drawAtomsScene, scrollLength: 2.4, align: 'right', beats: THREE },
		{ id: 'nodes', draw: drawNetworkScene, scrollLength: 2.6, align: 'right', beats: THREE },
		{ id: 'services', draw: drawBlackBoxScene, scrollLength: 2.4, beats: THREE },
		{
			id: 'service-spec',
			draw: drawSpecCellScene,
			scrollLength: 2.4,
			align: 'right',
			// Four components to introduce, so a tighter four-beat rhythm.
			// The first three carry an Explore control into the caption.
			/** @type {BeatTiming[]} */
			beats: [
				{ from: 0, to: 0.3, zoom: 'box' },
				{ from: 0.28, to: 0.58, zoom: 'api' },
				{ from: 0.56, to: 0.84, zoom: 'net' },
				{ from: 0.82, to: 1, hold: true }
			]
		},
		{
			id: 'execution',
			draw: drawExecutionScene,
			scrollLength: 2.6,
			/** @type {BeatTiming[]} */
			beats: [
				{ from: 0, to: 0.28 },
				{ from: 0.26, to: 0.54 },
				{ from: 0.52, to: 0.8 },
				{ from: 0.78, to: 1, hold: true }
			]
		},
		{
			id: 'determinism',
			draw: drawDeterminismScene,
			scrollLength: 2.6,
			align: 'right',
			// Four beats: the claim, the honest limit on it, what it buys,
			// and where it travels.
			/** @type {BeatTiming[]} */
			beats: [
				{ from: 0, to: 0.3 },
				{ from: 0.28, to: 0.58 },
				{ from: 0.56, to: 0.84 },
				{ from: 0.82, to: 1, hold: true }
			]
		},
		{
			id: 'coordination',
			draw: drawTrustScene,
			scrollLength: 2.6,
			/** @type {BeatTiming[]} */
			beats: [
				{ from: 0, to: 0.3 },
				{ from: 0.27, to: 0.6 },
				{ from: 0.57, to: 1, hold: true }
			]
		}
	];

	// The grounded blocks, in page order. Each is a self-contained
	// component that reads its own copy from the dictionary.
	const groundSections = [
		{ id: 'user-roles', component: AudienceRouter },
		{ id: 'core-principles', component: CorePrinciples },
		{ id: 'what-is-not', component: WhatIsNot },
		{ id: 'implementations', component: Nodes },
		{ id: 'coordination-detail', component: Coordination },
		{ id: 'service-distribution', component: ServiceDistribution },
		{ id: 'applications', component: Applications }
	];

	/** @type {HTMLElement | undefined} */
	let main;

	/*
	 * Explore mode for the specification scene.
	 *
	 * Each of BOX / API / NET carries far more in the actual schema
	 * (`message Service` in celaut.proto) than a scroll caption can hold,
	 * so the caption gets a control that magnifies that one component and
	 * lists what the specification really declares for it. It is a mode of
	 * the existing scene rather than a route: the reader keeps their place
	 * in the story, and one button takes them back to it.
	 *
	 * `zoomT` is tweened here rather than inside the scene, because the
	 * scene must stay a pure function of its inputs for the single
	 * reduced-motion paint to be correct.
	 */
	const ZOOM_MS = 420;
	/** @type {string | null} */
	let specZoom = null;
	let specZoomT = 0;
	let zoomRaf = 0;
	$: specState = { zoom: specZoom, zoomT: specZoomT };

	/** @param {number} target */
	function tweenZoom(target) {
		cancelAnimationFrame(zoomRaf);
		if (prefersReducedMotion()) {
			specZoomT = target;
			if (target === 0) specZoom = null;
			return;
		}
		const from = specZoomT;
		const startedAt = performance.now();
		const step = (/** @type {number} */ now) => {
			const k = Math.min(1, (now - startedAt) / ZOOM_MS);
			const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
			specZoomT = from + (target - from) * eased;
			if (k < 1) zoomRaf = requestAnimationFrame(step);
			else if (target === 0) specZoom = null;
		};
		zoomRaf = requestAnimationFrame(step);
	}

	/** @param {string} mode */
	function openZoom(mode) {
		specZoom = mode;
		tweenZoom(1);
	}

	function closeZoom() {
		tweenZoom(0);
	}

	onMount(() => {
		let stopScroll = () => {};
		let cleanupGsap = () => {};
		let cancelled = false;

		startSmoothScroll().then((stop) => {
			if (cancelled) stop();
			else stopScroll = stop;
		});

		if (prefersReducedMotion()) return () => {};

		loadGsap().then((bits) => {
			if (!bits || cancelled || !main) return;
			const { gsap, ScrollTrigger } = bits;
			const scope = gsap.context(() => {
				// Hero drifts up and dims as the first pinned scene arrives.
				const hero = main.querySelector('section');
				if (hero) {
					gsap.to(hero.querySelector('.content-wrapper'), {
						y: -110,
						opacity: 0.25,
						ease: 'none',
						scrollTrigger: {
							trigger: hero,
							start: 'top top',
							end: 'bottom top',
							scrub: 0.5
						}
					});
				}

				// One-shot reveal per grounded section. `once` + clearProps
				// means the element ends with no inline styles at all, so
				// nothing can get stuck invisible if a trigger misfires.
				gsap.utils.toArray('.section-anchor').forEach((el) => {
					gsap.from(el, {
						y: 34,
						opacity: 0,
						duration: 0.75,
						ease: 'power2.out',
						clearProps: 'all',
						scrollTrigger: { trigger: el, start: 'top 86%', once: true }
					});
				});

				gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
					gsap.from(group.children, {
						y: 26,
						opacity: 0,
						duration: 0.6,
						ease: 'power2.out',
						stagger: 0.08,
						clearProps: 'all',
						scrollTrigger: { trigger: group, start: 'top 85%', once: true }
					});
				});
			}, main);

			// The pins are created by the PinnedScene children; one refresh
			// after fonts and images settle keeps every start/end accurate.
			ScrollTrigger.refresh();
			cleanupGsap = () => scope.revert();
		});

		return () => {
			cancelled = true;
			cancelAnimationFrame(zoomRaf);
			stopScroll();
			cleanupGsap();
		};
	});
</script>

<SectionIndex />

<main bind:this={main} class="home">
	<Hero />

	<!-- #learn-more is kept for the Hero CTA, which predates the TOC. -->
	<div id="learn-more"></div>

	<!-- ========== The seven pinned scenes ========== -->
	{#each scenes as scene}
		<PinnedScene
			id={scene.id}
			label={scene.id === 'atoms' ? $t('home.atoms.eyebrow') : $t(`home.scenes.${scene.id}.label`)}
			align={scene.align || 'left'}
			draw={scene.draw}
			scrollLength={scene.scrollLength}
			state={scene.id === 'service-spec' ? specState : null}
			let:progress
			let:static={isStatic}
		>
			{@const atomCopy = $t('home.atoms')}
			{@const beats = scene.id === 'atoms'
					? [
						// Deliberately empty: the first beat of the atoms scene says
						// nothing while the stage is still blank, so each primitive
						// is introduced by exactly one beat of its own.
						{},
						{ h: atomCopy.items[0].title, p: atomCopy.items[0].body },
						{ h: atomCopy.items[1].title, p: atomCopy.items[1].body, note: atomCopy.note }
					]
					: $t(`home.scenes.${scene.id}.beats`)}
			<div class="beats" class:flow={isStatic}>
				{#each scene.beats as timing, i}
					{@const beat = beats[i]}
					<!-- A beat with no words renders nothing at all, not an empty
					     box: the atoms scene opens on silence. -->
					{#if beat && (beat.h || beat.p)}
						<SceneBeat {progress} {isStatic} from={timing.from} to={timing.to} hold={timing.hold}>
							{#if beat.h}<h2>{@html beat.h}</h2>{/if}
							{#if beat.p}<p>{@html beat.p}</p>{/if}
							{#if beat.note}<span class="beat-note">{beat.note}</span>{/if}
							{#if timing.zoom}
								<!-- Explore: magnify this component on the canvas and list
								     what the specification actually declares for it. A mode
								     of the same scene, so the reader keeps their place — and
								     the detail lives in the DOM, because the canvas is
								     aria-hidden and text painted onto it can be neither
								     selected nor read out. -->
								{@const detail = $t(`viz.home.zoom.${timing.zoom}`)}
								{#if specZoom === timing.zoom}
									<div class="zoom-detail">
										<p class="zoom-title">{detail.title}</p>
										<ul>
											{#each detail.rows as row}
												<li>{row}</li>
											{/each}
										</ul>
										<p class="zoom-source">{$t('viz.home.zoom.source')}</p>
									</div>
								{/if}
								<div class="beat-actions">
									{#if specZoom === timing.zoom}
										<button type="button" class="beat-action" on:click={closeZoom}>
											{$t('home.scenes.service-spec.exploreClose')}
										</button>
									{:else}
										<button
											type="button"
											class="beat-action"
											on:click={() => openZoom(timing.zoom)}
										>
											{$t('home.scenes.service-spec.explore', {
												what: $t(`viz.home.${timing.zoom}`)
											})}
										</button>
									{/if}
								</div>
							{/if}
							{#if scene.id === 'coordination' && i === 0}
								<div class="beat-actions">
									<a class="beat-action" href={`${$href('/paradigm')}#top`}>
										{$t('home.scenes.coordination.more')}
									</a>
								</div>
							{/if}
						</SceneBeat>
					{/if}
				{/each}
			</div>
		</PinnedScene>
	{/each}

	<!-- ========== The fork in the road, then grounded detail ==========
	     Everything from here down shares one reading language, defined
	     once as the `.ground` layer in src/app.css — the same one the
	     /depin, /developers and /users pages use below their scenes.
	     Each component supplies only markup; its words come from the
	     dictionaries. -->
	<div class="ground">
		{#each groundSections as section}
			<div id={section.id} class="section-anchor">
				<svelte:component this={section.component} />
			</div>
		{/each}
	</div>
</main>

<GoToTop />

<style>
	.section-anchor {
		scroll-margin-top: 12px;
	}

	/* Caption beats cross-fade in the same grid cell while pinned; in the
	   static / reduced-motion path they stack as normal blocks. */
	.beats {
		display: grid;
		min-height: 17em;
	}

	.beats.flow {
		display: block;
		min-height: 0;
	}

	.beats.flow :global(.beat + .beat) {
		margin-top: 36px;
	}

	/* Explore / read-more controls inside a caption beat. Deliberately
	   quiet: the beat's own words stay the loudest thing in the column. */
	.beats :global(.beat-actions) {
		margin-top: 16px;
	}

	.beats :global(.beat-action) {
		display: inline-block;
		padding: 8px 16px;
		border-radius: 999px;
		border: 1px solid var(--border-strong);
		background: rgba(var(--on-surface-rgb), 0.05);
		color: var(--accent-text);
		font: inherit;
		font-size: 0.86rem;
		font-weight: 700;
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease;
	}

	.beats :global(.beat-action:hover),
	.beats :global(.beat-action:focus-visible) {
		background: rgba(var(--on-surface-rgb), 0.12);
		border-color: var(--accent);
	}

	/* The Explore detail. Schema field names, so it is set in the mono
	   face and kept deliberately terse — this is a landing page. */
	.beats :global(.zoom-detail) {
		margin-top: 18px;
		padding: 16px 18px;
		border-radius: 12px;
		border: 1px solid var(--border-strong);
		background: rgba(var(--on-surface-rgb), 0.05);
	}

	.beats :global(.zoom-title) {
		margin: 0 0 10px;
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--accent-text);
	}

	.beats :global(.zoom-detail ul) {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 6px;
	}

	.beats :global(.zoom-detail li) {
		position: relative;
		padding-inline-start: 14px;
		font-size: 0.84rem;
		line-height: 1.5;
		color: var(--on-surface-muted);
	}

	.beats :global(.zoom-detail li)::before {
		content: '';
		position: absolute;
		inset-inline-start: 0;
		top: 0.62em;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--viz-node, var(--accent));
	}

	.beats :global(.zoom-source) {
		margin: 12px 0 0;
		font-size: 0.72rem;
		color: var(--on-surface-muted);
		opacity: 0.7;
	}

	/* The landing page carries SectionIndex's fixed rail down the left
	   edge, which /depin does not. The rail is ~14px from the edge and
	   grows to ~200px wide when a label is active, so left-aligned scene
	   captions need a gutter wider than that or the copy renders under
	   the dots. */
	@media (min-width: 1025px) {
		.home :global(.scene:not(.align-right):not(.is-static) .scene-copy) {
			margin-inline-start: clamp(150px, 13vw, 220px);
			width: min(520px, 100%);
		}
	}
</style>
