<script>
	/*
	 * Home page. Content is unchanged from master — same sections, same
	 * order, same copy. What's new is a LIGHT motion layer:
	 *
	 *   • Lenis smooth scrolling, shared with /depin.
	 *   • A scroll-linked parallax on the hero as you leave it.
	 *   • A one-shot fade/rise reveal per section.
	 *
	 * The heavy pinned-canvas treatment is deliberately reserved for the
	 * DePIN page; the home page just gets a smoother ride. All of it is
	 * skipped entirely under prefers-reduced-motion, and nothing here is
	 * required for the content to render.
	 */
	import { onMount } from 'svelte';
	import { loadGsap, startSmoothScroll, prefersReducedMotion } from '$lib/motion.js';
	import Hero from '$lib/components/Hero.svelte';
	import Foundations from '$lib/components/Foundations.svelte';
	import CorePrinciples from '$lib/components/CorePrinciples.svelte';
	import WhatIsNot from '$lib/components/WhatIsNot.svelte';
	import Nodes from '$lib/components/Nodes.svelte';
	import Services from '$lib/components/Services.svelte';
	import ServiceSpec from '$lib/components/ServiceSpec.svelte';
	import Coordination from '$lib/components/Coordination.svelte';
	import ServiceDistribution from '$lib/components/ServiceDistribution.svelte';
	import UserRoles from '$lib/components/UserRoles.svelte';
	import Applications from '$lib/components/Applications.svelte';
	import SectionIndex from '$lib/components/SectionIndex.svelte';
	import GoToTop from '$lib/components/GoToTop.svelte';

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
			const { gsap } = bits;
			const scope = gsap.context(() => {
				// Hero drifts up and dims slightly as the first section arrives.
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

				// One-shot reveal per section. `once` + clearProps means the
				// element ends up with no inline styles at all, so nothing can
				// get stuck invisible if a trigger misfires.
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
			}, main);
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

<main bind:this={main}>
	<Hero />

	<!-- #learn-more kept for the Hero CTA; #foundations is the TOC target. -->
	<div id="learn-more"></div>
	<div id="foundations" class="section-anchor">
		<Foundations />
	</div>

	<div id="core-principles" class="section-anchor">
		<CorePrinciples />
	</div>
	<div id="what-is-not" class="section-anchor">
		<WhatIsNot />
	</div>

	<div id="nodes" class="section-anchor">
		<Nodes />
	</div>

	<div id="services" class="section-anchor">
		<Services />
	</div>
	<div id="service-spec" class="section-anchor">
		<ServiceSpec />
	</div>
	<div id="coordination" class="section-anchor">
		<Coordination />
	</div>
	<div id="service-distribution" class="section-anchor">
		<ServiceDistribution />
	</div>

	<div id="user-roles" class="section-anchor">
		<UserRoles />
	</div>
	<div id="applications" class="section-anchor">
		<Applications />
	</div>
</main>

<GoToTop />

<style>
	.section-anchor {
		scroll-margin-top: 12px;
	}
</style>
