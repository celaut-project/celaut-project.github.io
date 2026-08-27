<script>
	/*
	 * Where Celaut is actually being used. Two projects from the project
	 * itself, then a third-party one, kept visibly separate.
	 * Styling comes from the shared `.ground` layer in src/app.css; the
	 * words come from `home.applications` in the dictionaries.
	 *
	 * Icons and URLs pair by index with the translated list — they are
	 * structure, not language.
	 */
	import { t, href } from '$lib/i18n/index.js';

	const ourLinks = [
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

	<div class="grid grid-2">
		{#each $t('home.applications.ours') as app, i}
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
					{#if ourLinks[i].external}
						<a class="btn" href={$href(ourLinks[i].href)} target="_blank" rel="noopener noreferrer"
							>{$t('common.visit')}</a
						>
					{:else}
						<a class="btn" href={$href(ourLinks[i].href)}>{$t('common.readMore')}</a>
					{/if}
				</div>
			</article>
		{/each}
	</div>

	<h3 class="sub">
		{$t('home.applications.thirdPartyHeading')}
		<span class="tag">{$t('home.applications.thirdPartyTag')}</span>
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
			<h3>{$t('home.applications.thirdParty.name')}</h3>
			{#each $t('home.applications.thirdParty.body') as paragraph}
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