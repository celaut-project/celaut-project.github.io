<script>
	/*
	 * AudienceRouter — the landing page's fork in the road.
	 *
	 * The paradigm document names three user roles. Each now has its own
	 * immersive page, so this section's only job is to let a visitor
	 * self-identify and leave for the right one. It replaces the old
	 * UserRoles block, keeping its copy but turning each role into a
	 * real destination rather than a paragraph.
	 */
	const SKILLS_URL = 'https://celaut-project.github.io/skills';

	const roles = [
		{
			eyebrow: 'Role 01',
			title: 'Node maintainers',
			lede: `Similar to miners in blockchain systems, node maintainers provide
			computational resources to the network. They execute services requested by
			users in exchange for payment, without needing to understand the specific
			functionality of those services.`,
			points: [
				'Provide hardware resources',
				'Execute services on request',
				'Receive compensation for resources'
			],
			primary: { label: 'Rent your PC', href: '/depin' },
			secondary: { label: 'Run a node', href: '/install' }
		},
		{
			eyebrow: 'Role 02',
			title: 'Service developers',
			lede: `Developers create services that can run on any compatible node in the
			network. They focus on building functionality without worrying about the
			underlying infrastructure details.`,
			points: [
				'Design service specifications',
				'Build deterministic applications',
				'Distribute services to nodes'
			],
			primary: { label: 'Build on Celaut', href: '/developers' },
			secondary: { label: 'Explore Skills', href: SKILLS_URL, external: true }
		},
		{
			eyebrow: 'Role 03',
			title: 'Service users',
			lede: `End users launch services on nodes, paying for the computational
			resources used.`,
			points: [
				'Request service execution',
				'Pay for computational resources',
				'Consume service outputs'
			],
			primary: { label: 'Use the network', href: '/users' },
			secondary: { label: 'Explore Skills', href: SKILLS_URL, external: true }
		}
	];
</script>

<section>
	<h2>Which one are you?</h2>
	<p class="intro">
		As users, we can play three types of roles in the ecosystem. Each has its own way in.
	</p>

	<div class="roles" data-reveal-group>
		{#each roles as role}
			<article class="role">
				<p class="eyebrow">{role.eyebrow}</p>
				<h3>{role.title}</h3>
				<p class="lede">{role.lede}</p>
				<ul>
					{#each role.points as point}
						<li>{point}</li>
					{/each}
				</ul>
				<div class="actions">
					<a class="btn primary" href={role.primary.href}>{role.primary.label} →</a>
					{#if role.secondary.external}
						<a
							class="btn ghost"
							href={role.secondary.href}
							target="_blank"
							rel="noopener noreferrer">{role.secondary.label}</a
						>
					{:else}
						<a class="btn ghost" href={role.secondary.href}>{role.secondary.label}</a>
					{/if}
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	section {
		background-color: var(--surface);
		padding: 90px 20px;
	}

	h2 {
		font-size: clamp(2rem, 5vw, 2.6rem);
		text-align: center;
		margin: 0 auto 14px auto;
		color: var(--heading);
	}

	.intro {
		text-align: center;
		max-width: 640px;
		margin: 0 auto 56px auto;
		line-height: 1.7;
		color: var(--on-surface-muted);
	}

	.roles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
		gap: 24px;
		max-width: 1100px;
		margin: 0 auto;
		align-items: stretch;
	}

	.role {
		display: flex;
		flex-direction: column;
		background-color: var(--surface-raised);
		border: 1px solid var(--border);
		border-top: 4px solid var(--accent);
		padding: 30px 30px 28px;
		border-radius: 16px;
		box-shadow: var(--shadow-sm);
		transition: transform 0.25s ease, box-shadow 0.25s ease;
	}

	.role:hover {
		transform: translateY(-6px);
		box-shadow: var(--shadow-md);
	}

	.eyebrow {
		margin: 0 0 8px;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent-text);
	}

	h3 {
		font-size: 1.45rem;
		margin: 0 0 12px 0;
		color: var(--on-surface);
	}

	.lede {
		margin: 0 0 18px 0;
		line-height: 1.65;
		font-size: 0.95rem;
		color: var(--on-surface-muted);
	}

	ul {
		padding-left: 20px;
		margin: 0 0 24px 0;
	}

	/* --accent-text, not the decorative --accent: coral on cream is
	   ~1.9:1 and unreadable in the light theme. */
	li {
		margin-bottom: 8px;
		line-height: 1.55;
		font-size: 0.92rem;
		color: var(--accent-text);
		font-weight: 500;
	}

	li:last-child {
		margin-bottom: 0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		/* Pin the CTAs to the bottom so cards of different text lengths
		   still line their buttons up. */
		margin-top: auto;
	}

	.btn {
		display: inline-block;
		padding: 10px 20px;
		border-radius: 8px;
		font-weight: 700;
		font-size: 0.92rem;
		text-decoration: none;
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
		border-color: var(--border-strong);
		color: var(--on-surface);
	}

	.btn.ghost:hover {
		border-color: var(--accent);
		color: var(--accent-text);
		transform: translateY(-2px);
	}
</style>
