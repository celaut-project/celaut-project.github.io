<script>
	/*
	 * /developers — "Build it once. It runs anywhere."
	 *
	 * The service-developer half of the Celaut story, staged with the
	 * same machinery as /depin: full-screen pinned scenes, a procedural
	 * canvas scrubbed by scroll, and caption beats that cross-fade as
	 * the visual builds.
	 *
	 * Everything asserted here is drawn from the paradigm doc and the
	 * existing site copy — BOX/API/NET, black-box services, hierarchical
	 * execution, distribution without a registry, and the fact that the
	 * developer does not control the nodes that run their service.
	 *
	 * Reduced motion → no pins, no scrubs, one static frame per canvas,
	 * every beat rendered stacked. Same words, plain article.
	 */

	import { onMount } from 'svelte';
	import SiteTopbar from '$lib/components/immersive/SiteTopbar.svelte';
	import ImmersiveHero from '$lib/components/immersive/ImmersiveHero.svelte';
	import PinnedScene from '$lib/components/immersive/PinnedScene.svelte';
	import SceneBeat from '$lib/components/immersive/SceneBeat.svelte';
	import {
		drawSpecScene,
		drawAgnosticScene,
		drawDistributeScene,
		drawComposeScene
	} from '$lib/components/developers/scenes.js';
	import { startSmoothScroll, loadGsap, prefersReducedMotion, scrollTo } from '$lib/motion.js';

	const SKILLS_URL = 'https://celaut-project.github.io/skills';

	const heroStats = [
		{ value: 'BOX · API · NET', label: 'three components — that is the whole specification' },
		{ value: 'No DevOps', label: 'nodes handle execution; there is no cloud account to open' },
		{ value: 'Deterministic', label: 'same inputs, same outputs, on any node, at any time' }
	];

	const heroActions = [
		{ label: 'Explore Skills', href: SKILLS_URL, external: true, primary: true },
		{ label: 'See how it works', href: '#spec' }
	];

	// What the architecture actually hands a developer. Every line here
	// maps to something the paradigm document states.
	const payoff = [
		{
			title: 'Specify, don’t deploy',
			body: `A service is a BOX (architecture, filesystem, environment, entrypoint,
			config), an API and a NET scope. Write that down and you are done — there is
			no deployment step to own.`
		},
		{
			title: 'Self-contained by construction',
			body: `The BOX describes the entire file structure the service needs, rather
			than pointing at external images or repositories. No third-party registry can
			go missing underneath you.`
		},
		{
			title: 'A black box, on purpose',
			body: `Services operate independently of the nodes that execute them. You
			never write against a node's environment, because you are never told what it
			is.`
		},
		{
			title: 'Reproducible, not "best effort"',
			body: `Given the same inputs a service always produces the same outputs,
			regardless of where or when it runs. Determinism is an architectural property
			here, not a provider promise.`
		},
		{
			title: 'Composition without orchestration',
			body: `A service can request the execution of child services through its node.
			The parent does not know where they run; each one just states the resources it
			needs.`
		},
		{
			title: 'Reputation you can accumulate',
			body: `Because a service is deterministic and isolated by default, a reputation
			proof recorded a while ago still says something true about it today.`
		}
	];

	const steps = [
		{
			step: '01',
			title: 'Write the service',
			body: `Any language, any stack. What matters is the filesystem it needs and the
			command that starts it — not the framework you reached for.`
		},
		{
			step: '02',
			title: 'Specify BOX, API and NET',
			body: `Declare the environment, how callers talk to the service and what (if
			any) external network access it should be able to request.`
		},
		{
			step: '03',
			title: 'Send it to a node',
			body: `One node is enough. It distributes the service to others and can publish
			it to a reputation system so users and other services can find it.`
		},
		{
			step: '04',
			title: 'Let the network run it',
			body: `Nodes negotiate cost and decide where each instance executes. You are not
			in the loop, and you have no infrastructure to keep alive.`
		}
	];

	// The honest framing from the paradigm doc: the two existing options
	// and what each one costs you.
	const tradeoffs = [
		{
			label: 'A hosted web service',
			good: 'Users need no infrastructure and no configuration.',
			bad: `You can't prove the system hasn't changed, and users have to take your
			word that their request data isn't being misused.`
		},
		{
			label: 'Source code they run themselves',
			good: `Deterministic — once downloaded, you can't change it under them — and
			their request data never reaches you.`,
			bad: `They need capable hardware and have to survive the configuration, which
			is where most people give up.`
		},
		{
			label: 'A Celaut service',
			good: `No infrastructure to manage and nothing to configure, because the spec
			already covers the container, architecture, network needs and interface.`,
			bad: `You give up control: you can't modify, throttle or extract data from a
			service once it's out there. That's the point.`,
			highlight: true
		}
	];

	let motion = false;
	let revealRoot;

	onMount(() => {
		motion = !prefersReducedMotion();

		let stopScroll = () => {};
		let cleanupGsap = () => {};
		let cancelled = false;

		startSmoothScroll().then((stop) => {
			if (cancelled) stop();
			else stopScroll = stop;
		});

		if (prefersReducedMotion()) return () => {};

		loadGsap().then((bits) => {
			if (!bits || cancelled || !revealRoot) return;
			const { gsap, ScrollTrigger } = bits;
			const scope = gsap.context(() => {
				gsap.utils.toArray('[data-reveal]').forEach((el) => {
					gsap.from(el, {
						y: 28,
						opacity: 0,
						duration: 0.7,
						ease: 'power2.out',
						scrollTrigger: { trigger: el, start: 'top 88%' }
					});
				});
				gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
					gsap.from(group.children, {
						y: 26,
						opacity: 0,
						duration: 0.6,
						ease: 'power2.out',
						stagger: 0.07,
						scrollTrigger: { trigger: group, start: 'top 85%' }
					});
				});
			}, revealRoot);

			ScrollTrigger.refresh();
			cleanupGsap = () => scope.revert();
		});

		return () => {
			cancelled = true;
			stopScroll();
			cleanupGsap();
		};
	});

	function toTop(event) {
		event.preventDefault();
		scrollTo(0);
	}
</script>

<svelte:head>
	<title>For developers — Build once, run anywhere | Celaut</title>
	<meta
		name="description"
		content="Build Celaut services: specify a BOX, an API and a NET scope, hand it to one node, and let the network distribute and execute it. No infrastructure, no configuration, no platform in the middle."
	/>
</svelte:head>

<div id="top" class="dev-page">
	<SiteTopbar title="For developers" />

	<main>
		<ImmersiveHero
			eyebrow="Service developers"
			title="Build it once."
			tagline="Then stop thinking about where it runs."
			lede="A Celaut service isn't a deployment — it's a specification. Describe the environment, the interface and the network scope, hand it to a single node, and the network takes it from there."
			actions={heroActions}
			stats={heroStats}
			firstSceneId="spec"
		/>

		<!-- ================= SCENE 1 — The specification ================= -->
		<PinnedScene
			id="spec"
			label="The idea"
			draw={drawSpecScene}
			scrollLength={2.4}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.34}>
					<h2>You don't deploy. You specify.</h2>
					<p>
						There is no server to provision, no image to push, no pipeline to keep green. A
						service in Celaut is a written description of what it needs to run.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.3} to={0.66}>
					<h2>Three components. That's all of it.</h2>
					<p>
						<strong>BOX</strong> describes the execution environment — architecture,
						filesystem, environment variables, entrypoint, config. It specifies the entire
						file structure directly, rather than pointing at an external image, which is
						what keeps execution reproducible.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.62} to={1} hold>
					<h2>And how the world reaches it.</h2>
					<p>
						<strong>API</strong> defines how clients and other services talk to it, plus
						accepted payment methods and costs. <strong>NET</strong> names the external
						networks it will reach — by default a service is isolated, and anything wider is
						declared in the specification itself, so users know up front where it can go.
					</p>
					<span class="beat-note">Portable, reproducible, free of third-party dependencies.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ============= SCENE 2 — Language / stack agnostic ============= -->
		<PinnedScene
			id="agnostic"
			label="Benefit 01"
			align="right"
			draw={drawAgnosticScene}
			scrollLength={2.4}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.36}>
					<h2>Whatever you wrote, it ships the same way.</h2>
					<p>
						Celaut doesn't ask you to adopt a framework, a runtime or an SDK. It asks for a
						filesystem and an entrypoint.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.32} to={0.68}>
					<h2>The node doesn't care either.</h2>
					<p>
						Services follow the <strong>black box principle</strong>: they operate
						independently of the details of the nodes that execute them, and nodes run them
						without needing to understand what they do.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.64} to={1} hold>
					<h2>So any compatible node will take it.</h2>
					<p>
						The BOX declares the microarchitecture it targets, so nodes know whether they're
						a match. Beyond that, <strong>your service can be run by anyone on any
						compatible node</strong> — that's the whole contract.
					</p>
					<span class="beat-note">No lock-in, because there's nothing to be locked into.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ================= SCENE 3 — Distribution ================= -->
		<PinnedScene
			id="distribute"
			label="Benefit 02"
			draw={drawDistributeScene}
			scrollLength={2.6}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.34}>
					<h2>Hand it to one node.</h2>
					<p>
						You don't publish to a store and you don't wait for review. The developer only
						needs to <strong>send the service to one or more nodes</strong>.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.3} to={0.68}>
					<h2>The network carries it from there.</h2>
					<p>
						Those nodes handle <strong>distributing the service among others</strong>. There
						is no central service registry — services spread peer-to-peer, so there's no
						single point of failure and no gatekeeper deciding whether you're allowed in.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.64} to={1} hold>
					<h2>Discoverable, if you want it to be.</h2>
					<p>
						Nodes can also <strong>upload the service to a reputation system</strong>, so
						users and other services can judge whether to use it, and when. Services can be
						declared on a blockchain registry — like the
						<strong>Sigma Reputation System</strong> on Ergo — to improve visibility and trust.
					</p>
					<span class="beat-note">Nothing to sign up for. Nobody taking a cut.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ================= SCENE 4 — Composition ================= -->
		<PinnedScene
			id="compose"
			label="Benefit 03"
			align="right"
			draw={drawComposeScene}
			scrollLength={2.6}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.34}>
					<h2>Services that call services.</h2>
					<p>
						A service can request the execution of other services — its
						<strong>child services</strong> — through the node running it. Complex workflows
						are built by composition, not by orchestration config.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.3} to={0.68}>
					<h2>The node decides where they land.</h2>
					<p>
						Nodes manage service instances and decide whether to run them locally or
						distribute the load across peers. Dependencies are the node's problem to solve —
						it ensures services can reach what they need across the network.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.64} to={1} hold>
					<h2>And you never find out where.</h2>
					<p>
						<strong>The parent service does not know where its dependencies are executed.</strong>
						Each child simply states the resources it requires. You write the composition;
						the network solves the placement.
					</p>
					<span class="beat-note">No scheduler to configure. No topology to maintain.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ================= Grounded content below ================= -->
		<div class="ground" bind:this={revealRoot}>
			<section class="block">
				<h2 data-reveal>What the architecture gives you</h2>
				<div class="grid" data-reveal-group>
					{#each payoff as item}
						<article class="card">
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</article>
					{/each}
				</div>
			</section>

			<section class="block">
				<h2 data-reveal>From code to running on the network</h2>
				<ol class="flow" data-reveal-group>
					{#each steps as s}
						<li class="flow-step">
							<span class="flow-num" aria-hidden="true">{s.step}</span>
							<div>
								<h3>{s.title}</h3>
								<p>{s.body}</p>
							</div>
						</li>
					{/each}
				</ol>
			</section>

			<section class="block">
				<h2 data-reveal>The trade you're actually making</h2>
				<p class="block-intro" data-reveal>
					Today, shipping software means picking between hosting it yourself and asking people
					to run it themselves. Both options cost something. Celaut's claim is narrow and
					specific: it takes the advantages of each without their disadvantages — at the price
					of your control over the running service.
				</p>
				<div class="tradeoffs" data-reveal-group>
					{#each tradeoffs as t}
						<article class="tradeoff" class:highlight={t.highlight}>
							<h3>{t.label}</h3>
							<p class="good"><span class="tag">Gains</span>{t.good}</p>
							<p class="bad"><span class="tag alt">Costs</span>{t.bad}</p>
						</article>
					{/each}
				</div>
			</section>

			<section class="block">
				<h2 data-reveal>The rest of the network</h2>
				<p class="block-intro" data-reveal>
					Your service needs somewhere to run and someone to run it for. Both of those are
					people too.
				</p>
				<div class="roles" data-reveal-group>
					<div class="role">
						<h3>Node maintainers</h3>
						<p>
							They provide the hardware and execute whatever is requested, without needing to
							understand what your service does, in exchange for payment.
						</p>
						<a class="role-link" href="/depin">Rent your PC →</a>
					</div>
					<div class="role">
						<h3>Final users</h3>
						<p>
							They launch services on nodes and pay for the computational resources used —
							and can verify that what ran is exactly what the spec described.
						</p>
						<a class="role-link" href="/users">For final users →</a>
					</div>
					<div class="role">
						<h3>The paradigm</h3>
						<p>
							The full architecture: nodes, services, specification, coordination through
							reputation and payment systems, and why any of it is necessary.
						</p>
						<a class="role-link" href="/paradigm">Read the paper →</a>
					</div>
				</div>
			</section>

			<section class="cta" data-reveal>
				<h2>Start from the problems.</h2>
				<p>
					Unstoppable Skills is a registry where the problems are the protagonists: search for
					a skill, and find the services that cover it, their benchmarks and their reputation.
					It's the shortest path from "what should I build" to "who needs it".
				</p>
				<div class="cta-actions">
					<a class="btn primary" href={SKILLS_URL} target="_blank" rel="noopener noreferrer">
						Explore Skills
					</a>
					<a class="btn ghost" href="/paradigm">Read the paradigm</a>
				</div>
			</section>
		</div>
	</main>

	<a class="to-top" href="#top" on:click={toTop} aria-label="Back to top">↑ Top</a>
</div>

<style>
	.dev-page {
		background-color: var(--surface);
		color: var(--on-surface);
		min-height: 100vh;
		font-family: var(--font-body);
	}

	/* Caption beats cross-fade in the same grid cell while pinned; in the
	   static/reduced-motion path they stack as normal blocks. */
	.beats {
		display: grid;
		min-height: 16.5em;
	}

	.beats.flow {
		display: block;
		min-height: 0;
	}

	.beats.flow :global(.beat + .beat) {
		margin-top: 36px;
	}

	.ground {
		max-width: 1060px;
		margin: 0 auto;
		padding: 24px clamp(20px, 6vw, 24px) 110px;
	}

	.block {
		padding: 72px 0 8px;
	}

	.block h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.6rem, 3.2vw, 2.1rem);
		color: var(--heading);
		margin: 0 0 20px;
		padding-bottom: 10px;
		border-bottom: 2px solid var(--accent);
	}

	.block-intro {
		max-width: 760px;
		margin: 0 0 32px;
		line-height: 1.7;
		color: var(--on-surface-muted);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 20px;
	}

	.card {
		background-color: var(--surface-raised);
		border: 1px solid var(--border);
		border-top: 3px solid var(--accent);
		border-radius: 12px;
		padding: 26px;
		box-shadow: var(--shadow-sm);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-md);
	}

	.card h3 {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		color: var(--accent-text);
		margin: 0 0 10px;
	}

	.card p {
		margin: 0;
		line-height: 1.65;
		color: var(--on-surface-muted);
	}

	.flow {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 24px;
	}

	.flow-step {
		display: flex;
		align-items: flex-start;
		gap: 20px;
	}

	.flow-num {
		flex-shrink: 0;
		font-family: var(--font-heading);
		font-size: 1.4rem;
		font-weight: 800;
		color: var(--accent-text);
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		border: 2px solid var(--accent);
	}

	.flow-step h3 {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		color: var(--on-surface);
		margin: 8px 0 6px;
	}

	.flow-step p {
		margin: 0;
		line-height: 1.65;
		color: var(--on-surface-muted);
	}

	/* --- Trade-off comparison --- */
	.tradeoffs {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 20px;
	}

	.tradeoff {
		background-color: var(--surface-raised);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 24px;
	}

	.tradeoff.highlight {
		border-color: var(--accent);
		box-shadow: var(--shadow-md);
	}

	.tradeoff h3 {
		font-family: var(--font-heading);
		font-size: 1.15rem;
		color: var(--on-surface);
		margin: 0 0 16px;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--border);
	}

	.tradeoff.highlight h3 {
		color: var(--accent-text);
	}

	.tradeoff p {
		margin: 0 0 14px;
		line-height: 1.6;
		font-size: 0.95rem;
		color: var(--on-surface-muted);
	}

	.tradeoff p:last-child {
		margin-bottom: 0;
	}

	.tag {
		display: inline-block;
		margin-right: 8px;
		padding: 2px 9px;
		border-radius: 999px;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		border: 1px solid var(--accent);
		color: var(--accent-text);
	}

	.tag.alt {
		border-color: var(--border-strong);
		color: var(--on-surface-subtle);
	}

	/* --- Roles --- */
	.roles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 24px;
	}

	.role h3 {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		color: var(--accent-text);
		margin: 0 0 10px;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.role p {
		margin: 0;
		line-height: 1.65;
		color: var(--on-surface-muted);
	}

	.role-link {
		display: inline-block;
		margin-top: 12px;
		font-weight: 700;
		color: var(--accent-text);
		text-decoration: none;
		border-bottom: 1px solid var(--accent);
	}

	.role-link:hover {
		color: var(--on-surface);
	}

	/* --- CTA --- */
	.cta {
		margin-top: 72px;
		text-align: center;
		background-color: var(--surface-alt);
		border: 1px solid var(--accent);
		border-radius: 18px;
		padding: 52px 24px;
	}

	.cta h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3.4vw, 2rem);
		color: var(--on-surface);
		margin: 0 0 12px;
	}

	.cta p {
		margin: 0 auto 28px;
		max-width: 620px;
		color: var(--on-surface-muted);
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		justify-content: center;
	}

	.btn {
		display: inline-block;
		padding: 13px 30px;
		border-radius: 9px;
		text-decoration: none;
		font-weight: 700;
		border: 2px solid transparent;
		transition: background-color 0.2s ease, transform 0.2s ease, color 0.2s ease,
			border-color 0.2s ease;
	}

	.btn.primary {
		background-color: var(--accent);
		color: var(--on-accent);
		border-color: var(--accent);
	}

	.btn.primary:hover {
		background-color: var(--accent-hover);
		border-color: var(--accent-hover);
		transform: translateY(-2px);
	}

	.btn.ghost {
		border-color: var(--accent);
		color: var(--accent-text);
	}

	.btn.ghost:hover {
		background-color: var(--accent-soft);
		transform: translateY(-2px);
	}

	.to-top {
		position: fixed;
		right: 24px;
		bottom: 24px;
		background-color: var(--accent);
		color: var(--on-accent);
		padding: 10px 16px;
		border-radius: 999px;
		font-weight: 700;
		text-decoration: none;
		box-shadow: var(--shadow-md);
		z-index: 30;
		transition: background-color 0.2s ease, transform 0.2s ease;
	}

	.to-top:hover {
		background-color: var(--accent-hover);
		transform: translateY(-2px);
	}

	@media (max-width: 600px) {
		.flow-num {
			width: 46px;
			height: 46px;
			font-size: 1.15rem;
		}
	}

	@media (max-width: 820px) {
		.beats {
			min-height: 14.5em;
		}
	}
</style>
