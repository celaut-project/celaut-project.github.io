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
	import { t } from '$lib/i18n/index.js';
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

	// Three-beat rhythm, shared by five of the seven scenes.
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
			beats: [
				{ from: 0, to: 0.3 },
				{ from: 0.28, to: 0.58 },
				{ from: 0.56, to: 0.84 },
				{ from: 0.82, to: 1, hold: true }
			]
		},
		{
			id: 'execution',
			draw: drawExecutionScene,
			scrollLength: 2.6,
			beats: [
				{ from: 0, to: 0.28 },
				{ from: 0.26, to: 0.54 },
				{ from: 0.52, to: 0.8 },
				{ from: 0.78, to: 1, hold: true }
			]
		},
		{ id: 'determinism', draw: drawDeterminismScene, scrollLength: 2.4, align: 'right', beats: THREE },
		{
			id: 'coordination',
			draw: drawTrustScene,
			scrollLength: 2.6,
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

	let main;

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
			let:progress
			let:static={isStatic}
		>
			{@const atomCopy = $t('home.atoms')}
			{@const beats = scene.id === 'atoms'
					? [
						{ h: atomCopy.heading, p: atomCopy.intro },
						{ h: atomCopy.items[0].title, p: atomCopy.items[0].body },
						{ h: atomCopy.items[1].title, p: atomCopy.items[1].body }
					]
					: $t(`home.scenes.${scene.id}.beats`)}
			<div class="beats" class:flow={isStatic}>
				{#each scene.beats as timing, i}
					{@const beat = beats[i]}
					{#if beat}
						<SceneBeat {progress} {isStatic} from={timing.from} to={timing.to} hold={timing.hold}>
							<h2>{@html beat.h}</h2>
							<p>{@html beat.p}</p>
							{#if beat.note}<span class="beat-note">{beat.note}</span>{/if}
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
