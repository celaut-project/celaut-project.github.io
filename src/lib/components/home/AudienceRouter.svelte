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

<div class="block">
	<p class="eyebrow">Pick your way in</p>
	<h2>Which one are you?</h2>
	<p class="block-intro">
		As users, we can play three types of roles in the ecosystem. Each has its own way in.
	</p>

	<div class="grid" data-reveal-group>
		{#each roles as role}
			<article class="card">
				<p class="role-num">{role.eyebrow}</p>
				<h3>{role.title}</h3>
				<p>{role.lede}</p>
				<ul class="points">
					{#each role.points as point}
						<li>{point}</li>
					{/each}
				</ul>
				<div class="actions">
					<!-- Every primary is an internal route; only a secondary
					     ever leaves the site. -->
					<a class="btn btn-primary" href={role.primary.href}>{role.primary.label} →</a>
					<a
						class="btn"
						href={role.secondary.href}
						target={role.secondary.external ? '_blank' : undefined}
						rel={role.secondary.external ? 'noopener noreferrer' : undefined}
					>
						{role.secondary.label}
					</a>
				</div>
			</article>
		{/each}
	</div>
</div>

<style>
	/*
	 * Only two rules of its own. Everything else — card, bullets,
	 * buttons — comes from the shared `.ground` layer in src/app.css,
	 * which is also what finally lines the three action rows up: the
	 * card is a flex column and `.actions` carries `margin-top: auto`,
	 * so a longer lede pushes copy down instead of pushing its buttons
	 * out of step with the card next to it.
	 */
	.role-num {
		margin: 0 0 8px;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--on-surface-subtle);
	}

	/* The bullets are the last thing before the buttons, so they take
	   the slack rather than leaving a gap under the prose. */
	.card .points {
		margin-bottom: 0;
	}

	/* Stacked, full width, always two rows. Side by side, the pairs
	   wrap at different widths — "Rent your PC / Run a node" fits on
	   one line where "Build on Celaut / Explore Skills" does not — so
	   the bottoms lined up while the buttons themselves did not. */
	.card .actions {
		flex-direction: column;
		align-items: stretch;
	}

	.card .actions .btn {
		justify-content: center;
	}
</style>
