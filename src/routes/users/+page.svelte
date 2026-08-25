<script>
	/*
	 * /users — "Run it. Pay for what it used."
	 *
	 * The final-user half of the Celaut story, staged with the same
	 * machinery as /depin and /developers.
	 *
	 * Grounded strictly in what the site and the paradigm document
	 * already assert: users launch services on nodes and pay for the
	 * computational resources used; services are deterministic and
	 * isolated by default; the developer controls neither the nodes nor
	 * your request data; discovery is peer-to-peer with no central
	 * registry; reputation, not a gatekeeper, is how quality surfaces.
	 *
	 * Reduced motion → no pins, no scrubs, one static frame per canvas,
	 * every beat stacked and fully visible.
	 */

	import { onMount } from 'svelte';
	import SiteTopbar from '$lib/components/immersive/SiteTopbar.svelte';
	import ImmersiveHero from '$lib/components/immersive/ImmersiveHero.svelte';
	import PinnedScene from '$lib/components/immersive/PinnedScene.svelte';
	import SceneBeat from '$lib/components/immersive/SceneBeat.svelte';
	import {
		drawAskScene,
		drawProofScene,
		drawSealedScene,
		drawMeterScene
	} from '$lib/components/users/scenes.js';
	import { startSmoothScroll, loadGsap, prefersReducedMotion, scrollTo } from '$lib/motion.js';

	const SKILLS_URL = 'https://celaut-project.github.io/skills';

	const heroStats = [
		{ value: 'No account', label: 'nothing to sign up for, nothing to be locked out of' },
		{ value: 'Per execution', label: 'you pay for the computational resources actually used' },
		{ value: 'Isolated', label: 'services run sealed, and see nothing they were not given' }
	];

	const heroActions = [
		{ label: 'Explore Skills', href: SKILLS_URL, external: true, primary: true },
		{ label: 'See how it works', href: '#ask' }
	];

	const payoff = [
		{
			title: 'No infrastructure to manage',
			body: `The nodes handle it. There is no cloud provider to choose, no machine to
			keep alive, and nothing to leave running between uses.`
		},
		{
			title: 'No configuration',
			body: `The service specification already covers how the container is built, the
			architecture it needs, its network requirements and its interface. None of that
			is yours to work out.`
		},
		{
			title: 'The developer has no reach',
			body: `Service developers can't control, modify or extract data from a service —
			they don't control the nodes that distribute and run it.`
		},
		{
			title: 'It can’t change under you',
			body: `A service is deterministic: the same inputs produce the same outputs,
			whenever and wherever it runs. Nobody can quietly degrade it to push you onto a
			newer one.`
		},
		{
			title: 'Judged by reputation, not ranking',
			body: `Reputation lives as records on a ledger, and each participant weighs the
			sources it trusts. There is no editorial front page deciding what you see.`
		},
		{
			title: 'Nothing to be removed from',
			body: `Discovery is peer-to-peer with no central registry, so there is no account
			to suspend and no listing to pull.`
		}
	];

	const steps = [
		{
			step: '01',
			title: 'Find the service',
			body: `Search by the problem you want solved. Nodes discover services peer-to-peer,
			and registries like Unstoppable Skills map problems to the services that cover them.`
		},
		{
			step: '02',
			title: 'Request an execution',
			body: `Your node talks directly to a peer that can run it. Interfaces and accepted
			payment methods are declared on contact, so nothing has to be agreed in advance.`
		},
		{
			step: '03',
			title: 'It runs, sealed',
			body: `The node executes the service as an isolated instance — a container or a
			virtual machine — with no access beyond what the specification asked for.`
		},
		{
			step: '04',
			title: 'Pay for what it used',
			body: `Compensation is exchanged for the resources used, with proof of payment
			gating access. No subscription, no minimum, no standing bill.`
		}
	];

	// The two familiar options and what each one costs — straight from
	// the "Why is this necessary" section of the paradigm document.
	const tradeoffs = [
		{
			label: 'Use a web service',
			good: 'You run no infrastructure and configure nothing.',
			bad: `You can't attribute reputation to it, because the operator can't prove the
			system hasn't changed — and can't assure you your request data isn't misused.`
		},
		{
			label: 'Run the source yourself',
			good: `It's deterministic, and the developer has no control over your request
			data.`,
			bad: `You need hardware capable of running it, and you have to deal with the
			configuration — which is usually where people give up and go back to option one.`
		},
		{
			label: 'Use a Celaut service',
			good: `No infrastructure, no configuration, and the developer still can't
			control, modify or extract data from the service.`,
			bad: `You pay per execution, and you depend on the network having a node willing
			to run it at a price you accept.`,
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
	<title>For final users — Run it, pay for what it used | Celaut</title>
	<meta
		name="description"
		content="Launch services on Celaut nodes and pay only for the computational resources used. No accounts, no subscriptions, no platform in the middle — services run isolated and deterministically, so you get exactly what the specification describes."
	/>
</svelte:head>

<div id="top" class="users-page">
	<SiteTopbar title="For final users" />

	<main>
		<ImmersiveHero
			eyebrow="Service users"
			title="Run it."
			tagline="Pay for what it used. Nothing else."
			lede="Launch a service on a node, get the result, pay for the compute it consumed. There's no account to create, no subscription to cancel, and no company sitting between you and the machine that did the work."
			actions={heroActions}
			stats={heroStats}
			firstSceneId="ask"
		/>

		<!-- ================= SCENE 1 — Ask the network ================= -->
		<PinnedScene
			id="ask"
			label="The idea"
			draw={drawAskScene}
			scrollLength={2.4}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.34}>
					<h2>Ask the network, not a company.</h2>
					<p>
						You want something done — a model run, a sequence analysed, a bot traded, a
						file processed. Today that means picking a provider and opening an account with
						them.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.3} to={0.66}>
					<h2>Nodes answer directly.</h2>
					<p>
						Celaut has <strong>no central service registry</strong>. Services are
						distributed across nodes peer-to-peer, and nodes declare their supported
						interfaces and <strong>accepted payment methods on contact</strong> — so nothing
						has to be agreed with anyone in advance.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.62} to={1} hold>
					<h2>You deal with the machine that does the work.</h2>
					<p>
						Your node negotiates the execution cost with a peer and the work happens. There
						is <strong>no platform in the middle</strong> taking a cut, setting the rules, or
						able to remove you from a network you never joined.
					</p>
					<span class="beat-note">No signup. No subscription. No middleman.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ================= SCENE 2 — What runs is what you asked for ==== -->
		<PinnedScene
			id="proof"
			label="Benefit 01"
			align="right"
			draw={drawProofScene}
			scrollLength={2.4}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.36}>
					<h2>How do you know what actually ran?</h2>
					<p>
						With a hosted service you can't. The operator can't prove the system hasn't
						changed — so when a tool gets popular, nothing stops its performance quietly
						dropping to push you toward a newer one.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.32} to={0.68}>
					<h2>Here, the service <em>is</em> its specification.</h2>
					<p>
						A service specifies its entire environment — architecture, filesystem,
						entrypoint, config. Change any of it and it is
						<strong>a different service</strong>, not a silent update to the one you were
						using.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.64} to={1} hold>
					<h2>So the result is reproducible.</h2>
					<p>
						Given the same inputs, a service <strong>always produces the same outputs</strong>,
						regardless of which node executes it or when. That's what makes a reputation
						record from months ago still worth something today.
					</p>
					<span class="beat-note">Determinism is the guarantee. Not a promise — the design.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ================= SCENE 3 — Sealed execution ================= -->
		<PinnedScene
			id="sealed"
			label="Benefit 02"
			draw={drawSealedScene}
			scrollLength={2.6}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.34}>
					<h2>Your request is nobody else's business.</h2>
					<p>
						When you send a workload somewhere, the honest question is who else gets to see
						it on the way through.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.3} to={0.68}>
					<h2>Every execution is isolated.</h2>
					<p>
						The node runs the service as an <strong>isolated instance</strong> — a container
						or a virtual machine. By default a service is cut off from external networks
						entirely, able to talk only to its parent, its children and the node running it.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.64} to={1} hold>
					<h2>And the developer isn't on the other end.</h2>
					<p>
						<strong>Service developers cannot control, modify or extract data from a
						service</strong>, because they don't control the nodes that distribute and run
						it. Any wider network access has to be declared in the specification, in the
						open, before you ever run it.
					</p>
					<span class="beat-note">Isolated by default. Access is requested, never assumed.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ================= SCENE 4 — Pay per execution ================ -->
		<PinnedScene
			id="pay"
			label="Benefit 03"
			align="right"
			draw={drawMeterScene}
			scrollLength={2.6}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.34}>
					<h2>You pay for the work. Full stop.</h2>
					<p>
						Users launch services on nodes and <strong>pay for the computational resources
						used</strong>. That's the entire commercial relationship.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.3} to={0.68}>
					<h2>Nothing accrues while you're idle.</h2>
					<p>
						There is no seat, no tier and no monthly floor. When the execution finishes, the
						charging finishes with it — payment is exchanged for resources used, and proof
						of payment is what gates access.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.64} to={1} hold>
					<h2>Priced by a market, not a pricing page.</h2>
					<p>
						Nodes set their own costs and compete on them, and
						<strong>services have a marginal cost of zero</strong> — the cost of running one
						falls on the node — so many start free to build reputation. Payment systems sit
						outside the core architecture, so which ledger settles it is not fixed either.
					</p>
					<span class="beat-note">Pay per execution. Leave whenever. Nothing to cancel.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ================= Grounded content below ================= -->
		<div class="ground" bind:this={revealRoot}>
			<section class="block">
				<h2 data-reveal>What you actually get</h2>
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
				<h2 data-reveal>From "I need this done" to a result</h2>
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
				<h2 data-reveal>Against the two options you have today</h2>
				<p class="block-intro" data-reveal>
					Take a trading bot as the example. Right now you either hand your portfolio to a web
					service, or you find the source and run it yourself. Each choice buys you one thing
					and costs you another.
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
				<h2 data-reveal>The other people in the network</h2>
				<p class="block-intro" data-reveal>
					Someone wrote the service and someone's machine runs it. Both roles are open to you
					too.
				</p>
				<div class="roles" data-reveal-group>
					<div class="role">
						<h3>Node maintainers</h3>
						<p>
							They provide the hardware that executes what you request, in exchange for
							payment — without needing to know what the service does.
						</p>
						<a class="role-link" href="/depin">Have spare hardware? →</a>
					</div>
					<div class="role">
						<h3>Service developers</h3>
						<p>
							They write services that any compatible node can run, and hand them to the
							network rather than hosting them.
						</p>
						<a class="role-link" href="/developers">For developers →</a>
					</div>
					<div class="role">
						<h3>The paradigm</h3>
						<p>
							Nodes, services, specification, and the reputation and payment systems that
							let parties who don't trust each other still cooperate.
						</p>
						<a class="role-link" href="/paradigm">Read the paper →</a>
					</div>
				</div>
			</section>

			<section class="cta" data-reveal>
				<h2>Start from the problem you have.</h2>
				<p>
					Unstoppable Skills is a fully on-chain, serverless registry where the problems
					themselves are the protagonists. Search for a skill and find the services that cover
					it, real comparative benchmarks, discussion, and reputation-based ranking.
				</p>
				<div class="cta-actions">
					<a class="btn primary" href={SKILLS_URL} target="_blank" rel="noopener noreferrer">
						Explore Skills
					</a>
					<a class="btn ghost" href="/depin">Rent your PC instead</a>
				</div>
			</section>
		</div>
	</main>

	<a class="to-top" href="#top" on:click={toTop} aria-label="Back to top">↑ Top</a>
</div>

<style>
	.users-page {
		background-color: var(--surface);
		color: var(--on-surface);
		min-height: 100vh;
		font-family: var(--font-body);
	}

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
