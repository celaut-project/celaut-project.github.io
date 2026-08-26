<script>
	/*
	 * Landing page.
	 *
	 * Phase 1 gave this page Lenis + a light reveal on top of the
	 * original flat sections. Phase 2 re-stages the story itself: the
	 * ideas that make up the paradigm are now full-screen pinned scenes
	 * with scroll-scrubbed procedural canvases, using the same machinery
	 * as /depin.
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
	 * The words are the site's existing words. Nothing new is claimed —
	 * the copy is lifted from the components these scenes replace and
	 * from src/lib/paradigm/README.md.
	 *
	 * Below the scenes the page hands off to the three audience pages
	 * (/depin, /developers, /users) and then to the existing grounded
	 * sections, which are unchanged.
	 *
	 * Under prefers-reduced-motion every pin and scrub is skipped: each
	 * canvas paints one static frame and every caption beat renders
	 * stacked, so the page degrades to an illustrated article.
	 */
	import { onMount } from 'svelte';
	import { loadGsap, startSmoothScroll, prefersReducedMotion } from '$lib/motion.js';
	import Hero from '$lib/components/Hero.svelte';
	import PinnedScene from '$lib/components/immersive/PinnedScene.svelte';
	import SceneBeat from '$lib/components/immersive/SceneBeat.svelte';
	import {
		drawAutomataScene,
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

	<!-- ============== SCENE 1 — Foundations in cellular automata ======= -->
	<PinnedScene
		id="foundations"
		label="Where it comes from"
		draw={drawAutomataScene}
		scrollLength={2.4}
		let:progress
		let:static={isStatic}
	>
		<div class="beats" class:flow={isStatic}>
			<SceneBeat {progress} {isStatic} from={0} to={0.34}>
				<h2>It starts with a handful of rules.</h2>
				<p>
					In the 1940s <strong>John von Neumann</strong> and
					<strong>Stanislaw Ulam</strong> introduced cellular automata: models that showed how
					complex behaviours could emerge from simple ones.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.3} to={0.66}>
				<h2>Nobody is directing this.</h2>
				<p>
					In 1970 <strong>John Horton Conway's "Game of Life"</strong> became the classic
					example: a grid where each cell only ever looks at its neighbours, and yet the
					whole thing produces intricate, evolving structure.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.62} to={1} hold>
				<h2>That's the whole design philosophy.</h2>
				<p>
					These ideas offer insight into how decentralized systems can
					<strong>achieve complexity without central control</strong> — the guiding
					philosophy behind Celaut. Simple rules at the node and service level, an adaptive
					system on top.
				</p>
				<span class="beat-note">Decentralization · Simplicity · Determinism</span>
			</SceneBeat>
		</div>
	</PinnedScene>

	<!-- ================= SCENE 2 — Nodes ================= -->
	<PinnedScene
		id="nodes"
		label="The network"
		align="right"
		draw={drawNetworkScene}
		scrollLength={2.6}
		let:progress
		let:static={isStatic}
	>
		<div class="beats" class:flow={isStatic}>
			<SceneBeat {progress} {isStatic} from={0} to={0.34}>
				<h2>Having nodes is not the difference.</h2>
				<p>
					Most decentralized networks have nodes, and most of them still depend on one
					powerful thing: <strong>the protocol everybody has to run</strong>. The rules are
					the centre, even when the machines are not.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.3} to={0.66}>
				<h2>Celaut has no protocol to agree on.</h2>
				<p>
					Nodes don't have to settle on a communication protocol in advance — they
					<strong>declare the interfaces they support and the payment methods they accept on
					contact</strong>. Two nodes talk about whatever they happen to have in common;
					where they don't overlap, they simply don't talk.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.62} to={1} hold>
				<h2>So you change your node, not the network.</h2>
				<p>
					A new pricing policy, another payment method, a specification format nobody else
					parses yet — you <strong>implement it in your own node</strong> and it works with
					whoever already supports it. Nobody votes, nothing has to be migrated, and there is
					<strong>no hard fork to survive</strong>.
				</p>
				<span class="beat-note">No shared protocol. No shared version. No permission.</span>
			</SceneBeat>
		</div>
	</PinnedScene>

	<!-- ================= SCENE 3 — Services ================= -->
	<PinnedScene
		id="services"
		label="What runs on it"
		draw={drawBlackBoxScene}
		scrollLength={2.4}
		let:progress
		let:static={isStatic}
	>
		<div class="beats" class:flow={isStatic}>
			<SceneBeat {progress} {isStatic} from={0} to={0.34}>
				<h2>A service is a sealed container.</h2>
				<p>
					Services in Celaut are <strong>deterministic software containers</strong> designed
					to perform a specific task. Nothing more elaborate than that.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.3} to={0.66}>
				<h2>Following the black box principle.</h2>
				<p>
					They operate <strong>independently of the nodes that execute them</strong>,
					focusing solely on their functionality. The node doesn't need to understand the
					service, and the service doesn't need to know anything about the node.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.62} to={1} hold>
				<h2>Isolated, every single time.</h2>
				<p>
					Each request runs as an <strong>isolated process</strong> — in a container or a
					virtual machine, depending on the node — which abstracts away the execution
					environment and keeps the security barrier intact.
				</p>
				<span class="beat-note">What goes in, what comes out. That's the whole interface.</span>
			</SceneBeat>
		</div>
	</PinnedScene>

	<!-- ================= SCENE 4 — Specification ================= -->
	<PinnedScene
		id="service-spec"
		label="How a service is specified"
		align="right"
		draw={drawSpecCellScene}
		scrollLength={2.4}
		let:progress
		let:static={isStatic}
	>
		<div class="beats" class:flow={isStatic}>
			<SceneBeat {progress} {isStatic} from={0} to={0.3}>
				<h2><strong>BOX</strong> — the environment.</h2>
				<p>
					Architecture, filesystem, environment variables, entrypoint, configuration and
					resources. It specifies the entire file structure directly rather than relying on
					external images or repositories, which is what makes execution reproducible on any
					node.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.28} to={0.58}>
				<h2><strong>API</strong> — the interface.</h2>
				<p>
					How to communicate with the service, the payment systems it accepts and the
					associated costs. It lets services be used without any central controller
					negotiating protocol on their behalf.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.56} to={0.84}>
				<h2><strong>NET</strong> — the network scope.</h2>
				<p>
					By default a service is <strong>isolated</strong>: it can talk only to its parent,
					its children and the node running it. If it needs the outside world,
					<strong>the networks it will reach are named in its own specification</strong> — the
					node grants them, because it wants to run the service properly, and you get the
					guarantee that it can never reach anywhere else.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.82} to={1} hold>
				<h2>Three components. One portable service.</h2>
				<p>
					Together they create <strong>portable, reproducible services</strong> that deploy
					consistently across the network while maintaining security and determinism.
				</p>
				<span class="beat-note">No third-party dependencies. Nothing left implicit.</span>
			</SceneBeat>
		</div>
	</PinnedScene>

	<!-- ================= SCENE 5 — Execution ================= -->
	<PinnedScene
		id="execution"
		label="Who decides what"
		draw={drawExecutionScene}
		scrollLength={2.6}
		let:progress
		let:static={isStatic}
	>
		<div class="beats" class:flow={isStatic}>
			<SceneBeat {progress} {isStatic} from={0} to={0.28}>
				<h2>A service asks for its children.</h2>
				<p>
					A service can request the execution of <strong>child services</strong> through its
					node. It states <strong>the resources each one needs</strong> and hands over a
					budget for them to spend. Not a machine, not a region — resources.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.26} to={0.54}>
				<h2>The node decides where they run.</h2>
				<p>
					It compares <strong>the cost of running the instance locally against the cost each
					of its peers quotes</strong> and picks the one it considers best. One child stays
					here; another lands on a peer.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.52} to={0.8}>
				<h2>The parent never finds out.</h2>
				<p>
					It doesn't know whether a child ended up on this machine or somewhere else, and it
					doesn't need to. All it watches is <strong>what its children consume and how fast
					they're spending</strong>, so it can balance that.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.78} to={1} hold>
				<h2>That split is the whole trick.</h2>
				<p>
					Node operators deal with the physical side: hardware, capacity, price, placement.
					Service developers <strong>declare the resources they need and nothing about
					infrastructure</strong>. Neither has to do the other's job — which is exactly what
					keeps both halves simple.
				</p>
				<span class="beat-note">Two concerns. One clean line between them.</span>
			</SceneBeat>
		</div>
	</PinnedScene>

	<!-- ================= SCENE 6 — Determinism ================= -->
	<PinnedScene
		id="determinism"
		label="Why it holds"
		align="right"
		draw={drawDeterminismScene}
		scrollLength={2.4}
		let:progress
		let:static={isStatic}
	>
		<div class="beats" class:flow={isStatic}>
			<SceneBeat {progress} {isStatic} from={0} to={0.34}>
				<h2>Same input. Same output. Always.</h2>
				<p>
					Services are fully specified to ensure <strong>reproducible results</strong> across
					time and nodes. Given the same inputs they always produce the same outputs,
					regardless of where or when they're run.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.3} to={0.66}>
				<h2>Which makes trust measurable.</h2>
				<p>
					Because the software can't drift, a
					<strong>reputation proof recorded some time ago still says something true today</strong>
					— provided the service doesn't reach out to a network, which is its default state.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.62} to={1} hold>
				<h2>And it travels.</h2>
				<p>
					Because nothing about the environment is left to the host, the same specification
					produces the same behaviour on <strong>a laptop, a spare server or a node you have
					never heard of</strong>. Where it runs stops being part of the answer.
				</p>
				<span class="beat-note">Fully specified, so nothing is left to the machine.</span>
			</SceneBeat>
		</div>
	</PinnedScene>

	<!-- ================= SCENE 7 — Coordination ================= -->
	<PinnedScene
		id="coordination"
		label="How strangers cooperate"
		draw={drawTrustScene}
		scrollLength={2.6}
		let:progress
		let:static={isStatic}
	>
		<div class="beats" class:flow={isStatic}>
			<SceneBeat {progress} {isStatic} from={0} to={0.3}>
				<h2>Reputation comes first.</h2>
				<p>
					Nodes and services <strong>do not trust each other</strong> — Celaut is a trustless
					system. So nothing starts with a handshake; it starts with a lookup. Reputation is
					<strong>records on ledgers</strong>, opinions rather than verdicts, and each actor
					weighs the sources it already trusts to decide whether a stranger is worth talking to.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.27} to={0.6}>
				<h2>Then value buys resource rights.</h2>
				<p>
					Only once the record checks out does anything move. The requester pays, and what
					comes back is not a promise — it's <strong>the right to consume a node's
					resources</strong>: this much compute, for this long. Payment mechanisms sit
					<strong>outside the core architecture</strong>, so no particular ledger is baked in.
				</p>
			</SceneBeat>

			<SceneBeat {progress} {isStatic} from={0.57} to={1} hold>
				<h2>And the node delivers, because the record is the collateral.</h2>
				<p>
					Nothing forces it to honour that right. What holds it is that
					<strong>the outcome is written back to the ledger</strong> — and a node whose record
					says it took payment and under-delivered stops getting chosen. Each party has a
					standing interest in the next stranger liking what they read.
				</p>
				<span class="beat-note">Check · pay · deliver · record. Then round again.</span>
			</SceneBeat>
		</div>
	</PinnedScene>

	<!-- ================= The fork in the road, then grounded detail ===
	     Everything from here down shares one reading language, defined
	     once as the `.ground` layer in src/app.css — the same one the
	     /depin, /developers and /users pages use below their scenes.
	     Each component supplies only markup and words. -->
	<div class="ground">
		<div id="user-roles" class="section-anchor">
			<AudienceRouter />
		</div>
		<div id="core-principles" class="section-anchor">
			<CorePrinciples />
		</div>
		<div id="what-is-not" class="section-anchor">
			<WhatIsNot />
		</div>
		<div id="implementations" class="section-anchor">
			<Nodes />
		</div>
		<div id="coordination-detail" class="section-anchor">
			<Coordination />
		</div>
		<div id="service-distribution" class="section-anchor">
			<ServiceDistribution />
		</div>
		<div id="applications" class="section-anchor">
			<Applications />
		</div>
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
			margin-left: clamp(150px, 13vw, 220px);
			width: min(520px, 100%);
		}
	}
</style>
