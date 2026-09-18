<script>
	/*
	 * Where the architecture is actually running, organised by DISTANCE
	 * FROM THE ARCHITECTURE rather than by who wrote it.
	 *
	 * The previous version split these into "ours" and a third-party
	 * section tagged "not built by us". That put a company voice on a
	 * page that deliberately has none — the landing page describes a
	 * paradigm, and a paradigm has no "us" — and it drew the wrong line
	 * besides. Authorship is not the interesting difference here.
	 *
	 * The interesting difference is how much of each thing survives if
	 * you take Celaut away. DePIN and Unstoppable Skills do not survive
	 * at all: they ARE the architecture, once nodes are running and the
	 * reputation layer is reachable. Game of Prompts survives as an idea
	 * — it is a competition with its own users and its own reason to
	 * exist, assembled out of Celaut services. That is precisely what
	 * makes it the stronger evidence of the two groups, so it is framed
	 * as a step further out rather than as an outsider.
	 *
	 * Styling comes from the shared `.ground` layer in src/app.css; the
	 * words come from `home.applications`. Icons and URLs pair by index
	 * with the translated list — they are structure, not language.
	 */
	import { t, href } from '$lib/i18n/index.js';

	const layerLinks = [
		{ href: '/depin', external: false },
		{ href: 'https://celaut-project.github.io/skills', external: true }
	];
	const GAME_OF_PROMPTS = 'https://game-of-prompts.github.io';
	const ERGO_DOCS = 'https://docs.ergoplatform.com/eco/celaut/';
</script>

<div class="block">
	<p class="eyebrow">{$t('home.applications.eyebrow')}</p>
	<h2>{$t('home.applications.heading')}</h2>
	<p class="block-intro">{$t('home.applications.intro')}</p>

	<h3 class="sub">
		{$t('home.applications.layerHeading')}
		<span class="tag accent">{$t('home.applications.layerTag')}</span>
	</h3>
	<p class="sub-intro">{@html $t('home.applications.layerIntro')}</p>

	<div class="grid grid-2">
		{#each $t('home.applications.layer') as app, i}
			<article class="card">
				<span class="row-mark" aria-hidden="true">
					{#if i === 0}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="6.2" y2="16.5"/><line x1="12" y1="8" x2="17.8" y2="16.5"/><line x1="7.7" y1="19" x2="16.3" y2="19"/></svg>
					{:else}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
					{/if}
				</span>
				<h3>{app.name}</h3>
				<p>{app.body}</p>
				<div class="actions">
					{#if layerLinks[i].external}
						<a class="btn" href={$href(layerLinks[i].href)} target="_blank" rel="noopener noreferrer"
							>{$t('common.visit')}</a
						>
					{:else}
						<a class="btn" href={$href(layerLinks[i].href)}>{$t('common.readMore')}</a>
					{/if}
				</div>
			</article>
		{/each}
	</div>

	<h3 class="sub">
		{$t('home.applications.builtOnHeading')}
		<span class="tag">{$t('home.applications.builtOnTag')}</span>
	</h3>
	<p class="sub-intro">{@html $t('home.applications.builtOnIntro')}</p>

	<div class="grid grid-pair">
		<article class="card">
			<span class="row-mark logo" aria-hidden="true">
				<img
					src="https://avatars.githubusercontent.com/u/212117344?s=96&v=4"
					alt=""
					loading="lazy"
				/>
			</span>
			<h3>{$t('home.applications.builtOn.name')}</h3>
			{#each $t('home.applications.builtOn.body') as paragraph}
				<p>{@html paragraph}</p>
			{/each}
			<div class="actions">
				<a class="btn" href={GAME_OF_PROMPTS} target="_blank" rel="noopener noreferrer">
					{$t('common.visit')}
				</a>
			</div>
		</article>
	</div>

	<div class="actions closing">
		<a class="btn btn-primary" href={ERGO_DOCS} target="_blank" rel="noopener noreferrer">
			{$t('home.applications.ergoDocs')}
		</a>
		<a class="btn" href={$href('/paradigm')}>{$t('home.applications.formalPaper')}</a>
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
		margin: 44px 0 10px;
	}

	.sub-intro {
		max-width: 760px;
		margin: 0 0 22px;
		line-height: 1.7;
		color: var(--on-surface-muted);
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

	/* The layer itself gets the accent; something built on top of it
	   gets the quiet outline. The two groups are a difference in kind,
	   not in quality, so the distinction is a colour rather than a
	   demotion. */
	.tag.accent {
		color: var(--accent-text);
		border-color: var(--accent);
		background: var(--accent-soft);
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
