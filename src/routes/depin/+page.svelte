<script>
	/*
	 * /depin — "Rent your PC"
	 *
	 * Rebuilt around one proposition: your computer is idle most of the
	 * time, and Celaut lets you sell that idle capacity. Everything on
	 * the page serves that sentence.
	 *
	 * The three pillars Josemi called out each get a full-screen pinned
	 * scene, scrubbed by scroll, with a procedural canvas doing the
	 * explaining:
	 *   1. Rent your PC        — the machine splits into sellable slices
	 *   2. Fully peer-to-peer  — the intermediary is removed, mesh forms
	 *   3. Electricity-aware   — cost curve, your price, your margin
	 *   4. microVM isolation   — the boundary seals, an escape bounces
	 *
	 * Motion is additive only. With prefers-reduced-motion the pins and
	 * scrubs never initialise, each canvas paints one final frame, and
	 * all caption beats render stacked — i.e. a plain illustrated
	 * article with the exact same words.
	 */

	import { onMount } from 'svelte';
	import DepinHero from '$lib/components/depin/DepinHero.svelte';
	import PinnedScene from '$lib/components/depin/PinnedScene.svelte';
	import SceneBeat from '$lib/components/depin/SceneBeat.svelte';
	import {
		drawRentScene,
		drawP2PScene,
		drawPowerScene,
		drawIsolationScene
	} from '$lib/components/depin/scenes.js';
	import { startSmoothScroll, loadGsap, prefersReducedMotion, scrollTo } from '$lib/motion.js';

	// Practical follow-through under the immersive part: what you
	// actually get, and what to do next.
	const payoff = [
		{
			title: 'Idle hardware, working',
			body: `Gaming rig asleep at 3am, workstation idle over the weekend, a
			spare box in a cupboard. If it can run nodo, it can earn.`
		},
		{
			title: 'You set the terms',
			body: `Price per unit of compute, which hours you're available, how much
			of the machine you're willing to hand over. All of it yours to change.`
		},
		{
			title: 'Paid per execution',
			body: `Settlement happens on Ergo (ERG) as work completes — no invoices,
			no platform payout schedule, no minimum threshold.`
		},
		{
			title: 'Nothing to trust',
			body: `Services are content-addressed: the requester gets the exact
			software they asked for, and you run it without inspecting or
			vouching for it.`
		},
		{
			title: 'Your files stay yours',
			body: `A workload lives in its own microVM with its own kernel. It never
			sees your disk, your network, or anything else on the machine.`
		},
		{
			title: 'Leave whenever',
			body: `Stop the node and the network routes around you. There is no
			contract, no lock-in, and nobody to ask for permission.`
		}
	];

	const steps = [
		{
			step: '01',
			title: 'Install nodo',
			body: `One command on Linux, an installer on Windows. Your machine joins
			the network and starts discovering peers.`
		},
		{
			step: '02',
			title: 'Set your price and hours',
			body: `Tell the node what your compute costs — including electricity if
			you want it factored in — and when it's available.`
		},
		{
			step: '03',
			title: 'Accept work',
			body: `Peers negotiate directly with your node. Accepted workloads run
			sealed inside a microVM, isolated from everything else.`
		},
		{
			step: '04',
			title: 'Get paid',
			body: `Payment and reputation settle on Ergo as each execution finishes.
			Contribution is rewarded; results stay auditable.`
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
				// Light reveals for the non-pinned sections below the scenes.
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

			// Pins are created by child components; one refresh once fonts
			// and images have settled keeps every start/end accurate.
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
	<title>Rent your PC — Celaut DePIN</title>
	<meta
		name="description"
		content="Sell your computer's resources when you're not using them. Celaut's DePIN layer is fully peer-to-peer, lets you price compute around your electricity costs, and isolates every workload inside a microVM."
	/>
</svelte:head>

<div id="top" class="depin-page">
	<header class="topbar">
		<a class="home-link" href="/">← Back to home</a>
		<span class="topbar-title">Rent your PC</span>
	</header>

	<main>
		<DepinHero />

		<!-- ================= SCENE 1 — Rent your PC ================= -->
		<PinnedScene
			id="rent"
			label="The idea"
			draw={drawRentScene}
			scrollLength={2.4}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.34}>
					<h2>Your PC is idle right now.</h2>
					<p>
						Most personal machines sit unused for the majority of every day. That's real
						hardware — cores, memory, disk — doing nothing at all.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.3} to={0.66}>
					<h2>Sell what you're not using.</h2>
					<p>
						Celaut carves your machine into <strong>capacity you can rent out</strong>. You
						decide how much of it goes to the network and how much stays yours — the rest of
						the machine keeps working exactly as it always did.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.62} to={1} hold>
					<h2>Get paid for the work it does.</h2>
					<p>
						Peers who need compute find your node, agree a price with it directly, and pay
						per execution. <strong>Payment settles on Ergo</strong> as each job finishes.
					</p>
					<span class="beat-note">No datacenter. No middleman. No monthly payout wait.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ================= SCENE 2 — Peer to peer ================= -->
		<PinnedScene
			id="p2p"
			label="Benefit 01"
			align="right"
			draw={drawP2PScene}
			scrollLength={2.4}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.36}>
					<h2>Fully peer-to-peer.</h2>
					<p>
						Every other "rent out your hardware" platform puts a company in the middle. It
						holds the marketplace, takes the cut, sets the rules, and can remove you from
						its network whenever it likes.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.32} to={0.68}>
					<h2>There is nobody in the middle.</h2>
					<p>
						Celaut has <strong>no foundation and no company</strong> sitting between the two
						parties. Your node and the peer that wants compute talk to each other
						<strong>directly</strong> — discovery, negotiation, execution, settlement.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.64} to={1} hold>
					<h2>Which means nobody can cut you off.</h2>
					<p>
						No account to suspend, no terms to change under you, no fee that quietly grows.
						The interaction is <strong>completely peer-to-peer</strong>, so the only thing
						either side depends on is the other side.
					</p>
					<span class="beat-note">Nothing to sign up for. Nothing to be de-platformed from.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ============ SCENE 3 — Electricity-aware pricing ========= -->
		<PinnedScene
			id="electricity"
			label="Benefit 02"
			draw={drawPowerScene}
			scrollLength={2.6}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.34}>
					<h2>Compute isn't free to give away.</h2>
					<p>
						Running your machine costs electricity, and that cost isn't flat — it moves
						through the day and changes with where you live.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.3} to={0.68}>
					<h2>Price it in.</h2>
					<p>
						Celaut lets you <strong>optionally factor electricity costs</strong> into the
						price you set for your compute. Your node prices work with your power bill in
						the equation, so renting out capacity never quietly costs you money.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.64} to={1} hold>
					<h2>And decide when you're open.</h2>
					<p>
						<strong>Availability and runtime are yours to set too.</strong> Only rent the
						machine overnight when power is cheapest, cap how long a single job may run, or
						go offline entirely — the network simply routes elsewhere.
					</p>
					<span class="beat-note">Your rates. Your hours. Your margin.</span>
				</SceneBeat>
			</div>
		</PinnedScene>

		<!-- ================ SCENE 4 — microVM isolation ============= -->
		<PinnedScene
			id="isolation"
			label="Benefit 03"
			align="right"
			draw={drawIsolationScene}
			scrollLength={2.6}
			let:progress
			let:static={isStatic}
		>
			<div class="beats" class:flow={isStatic}>
				<SceneBeat {progress} {isStatic} from={0} to={0.34}>
					<h2>Whose code is running on my PC?</h2>
					<p>
						It's the first question anyone sensible asks. Renting out your machine can't
						mean handing strangers the keys to it.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.3} to={0.68}>
					<h2>Full execution isolation.</h2>
					<p>
						Every workload runs sealed inside its own <strong>microVM</strong> — a real
						virtual machine with its own kernel and a hardware-enforced boundary, not a
						shared-kernel container. It cannot see your files, your network, or any other
						workload on the machine.
					</p>
				</SceneBeat>

				<SceneBeat {progress} {isStatic} from={0.64} to={1} hold>
					<h2>The same tech the big clouds run on.</h2>
					<p>
						microVMs are what <strong>major cloud providers</strong> use to run untrusted
						code from millions of strangers on shared hardware. Celaut puts that same
						isolation model on your desk — the guarantee isn't a promise, it's the
						architecture.
					</p>
					<span class="beat-note">Job ends, VM is destroyed. Nothing persists.</span>
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
				<h2 data-reveal>From install to income</h2>
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
				<h2 data-reveal>The other side of the trade</h2>
				<p class="block-intro" data-reveal>
					Renting your PC out is one half of the network. The other half is being able to
					<em>use</em> it — and the same properties that protect you as a host are what make
					the network worth buying from.
				</p>
				<div class="roles" data-reveal-group>
					<div class="role">
						<h3>Developers</h3>
						<p>
							Ship a program once as a sealed, content-addressed service and let the network
							host, discover and scale it. Reproducibility comes from the design, not from a
							provider's SLA.
						</p>
					</div>
					<div class="role">
						<h3>Agents &amp; users</h3>
						<p>
							Request services by the problem they solve and pay per execution. No cloud
							account, no lock-in — and the seal proves you got exactly the software you
							asked for.
						</p>
					</div>
					<div class="role">
						<h3>Hosts</h3>
						<p>
							That's you. Contribute whatever hardware you have; the node's virtualization
							layer means workloads still land somewhere they fit, even across CPU
							architectures.
						</p>
					</div>
				</div>
			</section>

			<section class="cta" data-reveal>
				<h2>Turn your idle machine on.</h2>
				<p>
					Installing a node takes one command. It's the fastest way to see what your hardware
					is worth when it isn't doing anything else.
				</p>
				<div class="cta-actions">
					<a class="btn primary" href="/install">Run a node</a>
					<a class="btn ghost" href="/paradigm">Read the paradigm</a>
				</div>
			</section>
		</div>
	</main>

	<a class="to-top" href="#top" on:click={toTop} aria-label="Back to top">↑ Top</a>
</div>

<style>
	.depin-page {
		background-color: var(--surface);
		color: var(--on-surface);
		min-height: 100vh;
		font-family: var(--font-body);
	}

	.topbar {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 14px 24px;
		background-color: rgba(var(--surface-deep-rgb), 0.82);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		color: var(--on-surface);
		border-bottom: 1px solid var(--border);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 40;
	}

	.home-link {
		color: var(--on-surface);
		text-decoration: none;
		font-weight: 700;
		white-space: nowrap;
	}

	.home-link:hover {
		color: var(--accent-text);
	}

	.topbar-title {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.05rem;
		color: var(--on-surface);
	}

	/* Caption beats cross-fade in the same grid cell while pinned; in the
	   static/reduced-motion path they stack as normal blocks. */
	.beats {
		display: grid;
		min-height: 15.5em;
	}

	.beats.flow {
		display: block;
		min-height: 0;
	}

	.beats.flow :global(.beat + .beat) {
		margin-top: 36px;
	}

	/* --- Grounded content --- */
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
		transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
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
		max-width: 540px;
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
		.topbar-title {
			display: none;
		}

		.flow-num {
			width: 46px;
			height: 46px;
			font-size: 1.15rem;
		}
	}

	@media (max-width: 820px) {
		.beats {
			min-height: 13.5em;
		}
	}
</style>
