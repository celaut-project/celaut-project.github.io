<script>
	/*
	 * AudienceRouter — the landing page's fork in the road.
	 *
	 * The paradigm document names three user roles. Each has its own
	 * immersive page, so this section's only job is to let a visitor
	 * self-identify and leave for the right one.
	 *
	 * Copy lives in `home.roles`; the destinations stay here and pair by
	 * index, because a link is structure rather than language.
	 */
	import { t, href } from '$lib/i18n/index.js';

	const SKILLS_URL = 'https://celaut-project.github.io/skills';

	// Every primary is an internal route; only a secondary ever leaves
	// the site.
	const destinations = [
		{ primary: '/depin', secondary: { href: '/install' } },
		{ primary: '/developers', secondary: { href: SKILLS_URL, external: true } },
		{ primary: '/users', secondary: { href: SKILLS_URL, external: true } }
	];
</script>

<div class="block">
	<p class="eyebrow">{$t('home.roles.eyebrow')}</p>
	<h2>{$t('home.roles.heading')}</h2>
	<p class="block-intro">{$t('home.roles.intro')}</p>

	<div class="grid" data-reveal-group>
		{#each $t('home.roles.items') as role, i}
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
					<a class="btn btn-primary" href={$href(destinations[i].primary)}>{role.primary} →</a>
					<a
						class="btn"
						href={$href(destinations[i].secondary.href)}
						target={destinations[i].secondary.external ? '_blank' : undefined}
						rel={destinations[i].secondary.external ? 'noopener noreferrer' : undefined}
					>
						{role.secondary}
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