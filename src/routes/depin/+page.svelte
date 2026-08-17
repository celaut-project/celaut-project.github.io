<script>
	// DePIN explainer subpage. Goal: give a newcomer a plain-language answer to
	// "what is Celaut for?" through the lens of its DePIN (Decentralized
	// Physical Infrastructure Network) layer — the network of nodo operators
	// that actually run services. Structure mirrors the paradigm page: a sticky
	// back-to-home topbar, prose sections, and a floating back-to-top button.

	// Concrete things people build/run on the network. Kept as data so the
	// grid stays easy to extend.
	const useCases = [
		{
			title: 'Verifiable services',
			body: `Package any program as a Celaut service and run it on nodes you
			don't control — the seal guarantees you get the exact software you
			asked for, byte for byte. No trusting the operator.`
		},
		{
			title: 'Censorship-resistant compute',
			body: `Services are content-addressed and replicated across independent
			nodes. There is no single host to pressure, take down, or rate-limit —
			the network routes around dead peers.`
		},
		{
			title: 'Cross-architecture execution',
			body: `A service built for one CPU architecture can run on another via
			the node's virtualization layer, so operators contribute whatever
			hardware they have and workloads still land somewhere they fit.`
		},
		{
			title: 'Autonomous AI agents',
			body: `Agents discover the services they need by the problem they
			solve, spawn them on demand, and pay per execution — a self-serve
			backend that needs no cloud account.`
		},
		{
			title: 'On-chain coordination',
			body: `Payments, reputation, and results settle on Ergo (ERG). Operators
			earn for the work their node does; bad actors risk staked reputation.`
		},
		{
			title: 'Composable pipelines',
			body: `Services declare and resolve their own dependencies, so a node
			can assemble multi-service workflows automatically instead of you
			wiring infrastructure by hand.`
		}
	];

	// The lifecycle a request follows once it hits the network.
	const flow = [
		{
			step: '01',
			title: 'Join',
			body: `Install nodo on any machine. It announces itself and discovers
			peers — your computer becomes a provider in the network.`
		},
		{
			step: '02',
			title: 'Discover',
			body: `A client asks for a service by its identity. Nodes that hold it
			(or can build it) respond; the network finds the nearest capable peer.`
		},
		{
			step: '03',
			title: 'Execute',
			body: `The node runs the sealed service in isolation, orchestrates its
			dependencies, and streams back the result — reproducibly.`
		},
		{
			step: '04',
			title: 'Settle',
			body: `Payment and reputation are recorded on Ergo, so contribution is
			rewarded and results are auditable.`
		}
	];
</script>

<svelte:head>
	<title>DePIN — Celaut</title>
	<meta
		name="description"
		content="How Celaut works as a Decentralized Physical Infrastructure Network (DePIN): run a node, share compute, and execute verifiable services across a censorship-resistant network."
	/>
</svelte:head>

<div id="top" class="depin-page">
	<header class="topbar">
		<a class="home-link" href="/">← Back to home</a>
		<span class="topbar-title">DePIN</span>
	</header>

	<main class="wrap">
		<section class="hero">
			<div class="hero-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
					stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="5" r="3" />
					<circle cx="5" cy="19" r="3" />
					<circle cx="19" cy="19" r="3" />
					<line x1="12" y1="8" x2="6.2" y2="16.5" />
					<line x1="12" y1="8" x2="17.8" y2="16.5" />
					<line x1="7.7" y1="19" x2="16.3" y2="19" />
				</svg>
			</div>
			<h1>A network you can actually join</h1>
			<p class="lede">
				<strong>DePIN</strong> — a Decentralized Physical Infrastructure Network — is the layer
				where Celaut becomes real hardware. Anyone can run a node
				(<strong>nodo</strong>) and turn an ordinary computer into shared,
				censorship-resistant compute that executes verifiable software for the whole network.
			</p>
			<p class="lede-sub">
				If the <a href="/paradigm">paradigm</a> is the theory of how software should be
				built and distributed, DePIN is the practice: the living mesh of machines that host,
				discover, and run it.
			</p>
		</section>

		<section class="block">
			<h2>What you can do with it</h2>
			<p class="block-intro">
				Celaut turns programs into portable, sealed <strong>services</strong> and runs them on a
				network of independent nodes. That unlocks a handful of things a normal cloud can't offer:
			</p>
			<div class="grid">
				{#each useCases as u}
					<article class="card">
						<h3>{u.title}</h3>
						<p>{u.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="block">
			<h2>How the network runs a job</h2>
			<ol class="flow">
				{#each flow as f}
					<li class="flow-step">
						<span class="flow-num" aria-hidden="true">{f.step}</span>
						<div>
							<h3>{f.title}</h3>
							<p>{f.body}</p>
						</div>
					</li>
				{/each}
			</ol>
		</section>

		<section class="block">
			<h2>Who it's for</h2>
			<div class="roles">
				<div class="role">
					<h3>Operators</h3>
					<p>
						Have spare compute? Run a node, join the mesh, and earn on Ergo for the work
						it does. No datacenter required.
					</p>
				</div>
				<div class="role">
					<h3>Developers</h3>
					<p>
						Ship a program once as a sealed service and let the network host, discover, and
						scale it — with reproducibility guaranteed by design.
					</p>
				</div>
				<div class="role">
					<h3>Agents &amp; users</h3>
					<p>
						Consume services on demand and pay per execution. No accounts, no lock-in — just
						the software you asked for, verified.
					</p>
				</div>
			</div>
		</section>

		<section class="cta">
			<h2>Ready to become part of the network?</h2>
			<p>Installing a node takes one command. It's the fastest way to see DePIN in action.</p>
			<div class="cta-actions">
				<a class="btn primary" href="/install">Run a node</a>
				<a class="btn ghost" href="/paradigm">Read the paradigm</a>
			</div>
		</section>
	</main>

	<a class="to-top" href="#top" aria-label="Back to top">↑ Top</a>
</div>

<style>
	.depin-page {
		background-color: var(--surface);
		color: var(--on-surface);
		min-height: 100vh;
		font-family: var(--font-body, 'Lato', sans-serif);
	}

	.topbar {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 16px 24px;
		background-color: var(--surface-deep);
		color: var(--on-surface);
		border-bottom: 1px solid rgba(var(--on-surface-rgb), 0.1);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.home-link {
		color: var(--on-surface);
		text-decoration: none;
		font-weight: 700;
		white-space: nowrap;
	}

	.home-link:hover {
		color: var(--accent);
	}

	.topbar-title {
		font-family: var(--font-heading, 'Playfair Display', serif);
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--on-surface);
	}

	.wrap {
		max-width: 960px;
		margin: 0 auto;
		padding: 24px 24px 96px;
	}

	/* --- Hero --- */
	.hero {
		text-align: center;
		padding: 56px 8px 24px;
		border-bottom: 1px solid rgba(var(--on-surface-rgb), 0.12);
		margin-bottom: 8px;
	}

	.hero-icon {
		width: 88px;
		height: 88px;
		margin: 0 auto 24px;
		border-radius: 50%;
		border: 2px solid rgba(var(--accent-rgb), 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--accent);
	}

	.hero-icon svg {
		width: 46px;
		height: 46px;
	}

	.hero h1 {
		font-family: var(--font-heading, 'Playfair Display', serif);
		font-size: clamp(2rem, 4vw, 2.8rem);
		color: var(--on-surface);
		margin: 0 0 20px;
		line-height: 1.15;
	}

	.lede {
		max-width: 720px;
		margin: 0 auto 14px;
		font-size: 1.1rem;
		line-height: 1.7;
		color: rgba(var(--on-surface-rgb), 0.88);
	}

	.lede-sub {
		max-width: 720px;
		margin: 0 auto;
		line-height: 1.7;
		color: rgba(var(--on-surface-rgb), 0.7);
	}

	.lede-sub a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.lede-sub a:hover {
		color: var(--accent-hover);
	}

	strong {
		color: var(--on-surface);
		font-weight: 700;
	}

	/* --- Generic content block --- */
	.block {
		padding: 48px 0 8px;
	}

	.block h2 {
		font-family: var(--font-heading, 'Playfair Display', serif);
		font-size: 1.8rem;
		color: var(--on-surface);
		margin: 0 0 16px;
		padding-bottom: 8px;
		border-bottom: 2px solid rgba(var(--accent-rgb), 0.4);
	}

	.block-intro {
		max-width: 760px;
		margin: 0 0 32px;
		line-height: 1.7;
		color: rgba(var(--on-surface-rgb), 0.82);
	}

	/* --- Use-case grid --- */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 20px;
	}

	.card {
		background-color: rgba(var(--on-surface-rgb), 0.04);
		border: 1px solid rgba(var(--on-surface-rgb), 0.12);
		border-top: 3px solid var(--accent);
		border-radius: 12px;
		padding: 24px;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.card:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
	}

	.card h3 {
		font-family: var(--font-heading, 'Playfair Display', serif);
		font-size: 1.2rem;
		color: var(--accent);
		margin: 0 0 10px;
	}

	.card p {
		margin: 0;
		line-height: 1.65;
		color: rgba(var(--on-surface-rgb), 0.82);
	}

	/* --- Flow / numbered steps --- */
	.flow {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 20px;
	}

	.flow-step {
		display: flex;
		align-items: flex-start;
		gap: 20px;
	}

	.flow-num {
		flex-shrink: 0;
		font-family: var(--font-heading, 'Playfair Display', serif);
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--accent);
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		border: 2px solid rgba(var(--accent-rgb), 0.3);
	}

	.flow-step h3 {
		font-family: var(--font-heading, 'Playfair Display', serif);
		font-size: 1.2rem;
		color: var(--on-surface);
		margin: 6px 0 6px;
	}

	.flow-step p {
		margin: 0;
		line-height: 1.65;
		color: rgba(var(--on-surface-rgb), 0.82);
	}

	/* --- Roles --- */
	.roles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 20px;
	}

	.role {
		padding: 8px 4px;
	}

	.role h3 {
		font-family: var(--font-heading, 'Playfair Display', serif);
		font-size: 1.25rem;
		color: var(--accent);
		margin: 0 0 10px;
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(var(--on-surface-rgb), 0.15);
	}

	.role p {
		margin: 0;
		line-height: 1.65;
		color: rgba(var(--on-surface-rgb), 0.82);
	}

	/* --- CTA --- */
	.cta {
		margin-top: 64px;
		text-align: center;
		background-color: rgba(var(--accent-rgb), 0.1);
		border: 1px solid rgba(var(--accent-rgb), 0.35);
		border-radius: 16px;
		padding: 48px 24px;
	}

	.cta h2 {
		font-family: var(--font-heading, 'Playfair Display', serif);
		font-size: 1.7rem;
		color: var(--on-surface);
		margin: 0 0 12px;
	}

	.cta p {
		margin: 0 auto 28px;
		max-width: 520px;
		color: rgba(var(--on-surface-rgb), 0.82);
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		justify-content: center;
	}

	.btn {
		display: inline-block;
		padding: 12px 28px;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 700;
		transition: background-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
	}

	.btn.primary {
		background-color: var(--accent);
		color: var(--on-accent);
	}

	.btn.primary:hover {
		background-color: var(--accent-hover);
		transform: translateY(-2px);
	}

	.btn.ghost {
		border: 1px solid var(--accent);
		color: var(--accent);
	}

	.btn.ghost:hover {
		background-color: rgba(var(--accent-rgb), 0.12);
	}

	/* --- Floating back-to-top --- */
	.to-top {
		position: fixed;
		right: 24px;
		bottom: 24px;
		background-color: var(--accent);
		color: var(--on-accent, #1d4241);
		padding: 10px 16px;
		border-radius: 999px;
		font-weight: 700;
		text-decoration: none;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
		z-index: 20;
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
			font-size: 1.2rem;
		}
	}
</style>
