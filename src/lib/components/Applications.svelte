<script>
	// Where Celaut is actually being used. Two projects from the
	// project itself, then a third-party one, kept visibly separate.
	// Styling comes from the shared `.ground` layer in src/app.css.
	const ours = [
		{
			name: 'DePin',
			href: '/depin',
			external: false,
			body: 'Anyone can run a Celaut node and become part of a decentralized physical infrastructure network. Each node discovers peers, executes and orchestrates services, and manages their dependencies — turning ordinary computers into shared, censorship-resistant compute.'
		},
		{
			name: 'Unstoppable Skills',
			href: 'https://celaut-project.github.io/skills',
			external: true,
			body: 'A fully on-chain, serverless registry where the problems are the protagonists. Instead of hunting for services, agents search for a skill and discover the services that cover it, with real benchmarks and reputation-based ranking. Built on Ergo and Celaut, with native skin-in-the-game: nobody spams without risking reputation.'
		}
	];
</script>

<div class="block">
	<p class="eyebrow">Where it is already running</p>
	<h2>Real-world impact and applications</h2>
	<p class="block-intro">
		The architecture is not a thought experiment. These are the places it is in use today.
	</p>

	<div class="grid grid-2">
		{#each ours as app}
			<article class="card">
				<span class="row-mark" aria-hidden="true">
					{#if app.name === 'DePin'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="6.2" y2="16.5"/><line x1="12" y1="8" x2="17.8" y2="16.5"/><line x1="7.7" y1="19" x2="16.3" y2="19"/></svg>
					{:else}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
					{/if}
				</span>
				<h3>{app.name}</h3>
				<p>{app.body}</p>
				<div class="actions">
					{#if app.external}
						<a class="btn" href={app.href} target="_blank" rel="noopener noreferrer">Visit →</a>
					{:else}
						<a class="btn" href={app.href}>Read more →</a>
					{/if}
				</div>
			</article>
		{/each}
	</div>

	<h3 class="sub">
		Third-party <span class="tag">not built by us</span>
	</h3>
	<div class="grid grid-pair">
		<article class="card">
			<span class="row-mark logo" aria-hidden="true">
				<img
					src="https://avatars.githubusercontent.com/u/212117344?s=96&v=4"
					alt=""
					loading="lazy"
				/>
			</span>
			<h3>Game of Prompts</h3>
			<p>
				A competitive platform where creators design <strong>game-services</strong> that evaluate
				the robots playing them, and players write <strong>solver-services</strong> that try to
				maximise their score.
			</p>
			<p>
				The services follow the Celaut paradigm, and the whole system uses the Ergo blockchain to
				record results and transfer prizes.
			</p>
			<div class="actions">
				<a class="btn" href="https://game-of-prompts.github.io" target="_blank" rel="noopener noreferrer">
					Visit →
				</a>
			</div>
		</article>
	</div>

	<div class="actions closing">
		<a class="btn btn-primary" href="https://docs.ergoplatform.com/eco/celaut/" target="_blank" rel="noopener noreferrer">
			Ergo docs
		</a>
		<a class="btn" href="/paradigm">Formal paper</a>
	</div>
</div>

<style>
	.sub {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
		font-family: var(--font-heading);
		font-size: 1.25rem;
		color: var(--on-surface);
		margin: 44px 0 18px;
	}

	.tag {
		font-family: var(--font-body);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--on-surface-subtle);
		border: 1px solid var(--border-strong);
		border-radius: 999px;
		padding: 4px 10px;
	}

	.card .row-mark {
		margin-bottom: 16px;
	}

	/* The one mark that is a real logo rather than a line icon, so it
	   gets no accent tint behind it. */
	.logo {
		background: var(--surface-alt);
		overflow: hidden;
		padding: 0;
	}

	.logo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.closing {
		margin-top: 40px;
		padding-top: 0;
	}
</style>
