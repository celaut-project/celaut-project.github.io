<script>
	/*
	 * What exists today, and at what stage.
	 *
	 * The `stage` chip carries the state on the card itself rather than
	 * leaving it to be inferred: Nodo is running, Superapp is in alpha with
	 * pre-release APKs. Both are real software, so both get the accent;
	 * the muted outline would be for one that is still only an intention.
	 *
	 * Styling comes from the shared `.ground` layer in src/app.css; the
	 * words come from `home.implementations` in the dictionaries. The
	 * repository URLs are structure, so they stay here and pair by index.
	 */
	import { t } from '$lib/i18n/index.js';

	const repos = [
		'https://github.com/celaut-project/nodo',
		'https://github.com/celaut-project/superapp'
	];
</script>

<div class="block">
	<p class="eyebrow">{$t('home.implementations.eyebrow')}</p>
	<h2>{$t('home.implementations.heading')}</h2>
	<p class="block-intro">{@html $t('home.implementations.intro')}</p>

	<div class="grid grid-2">
		{#each $t('home.implementations.items') as impl, i}
			<article class="card">
				<div class="card-head">
					<h3>{impl.name}</h3>
					<span class="stage live">{impl.stage}</span>
				</div>
				<p>{@html impl.body}</p>
				<div class="actions">
					<a class="btn" href={repos[i]} target="_blank" rel="noopener noreferrer">
						{$t('common.viewOnGitHub')}
					</a>
				</div>
			</article>
		{/each}
	</div>

	<span class="note">{$t('home.implementations.note')}</span>
</div>

<style>
	.card :global(a) {
		color: var(--accent-text);
		text-decoration: underline;
	}

	.card-head {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}

	.card-head h3 {
		margin: 0;
	}

	/*
	 * The state chip. A running implementation gets the accent; anything
	 * that is still an intention gets the muted outline, so the two can
	 * never be skimmed as equivalent.
	 */
	.stage {
		font-family: var(--font-body);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		padding: 3px 10px;
		border-radius: 999px;
		border: 1px solid var(--border-strong);
		color: var(--on-surface-subtle);
	}

	.stage.live {
		border-color: var(--accent);
		color: var(--accent-text);
		background: var(--accent-soft);
	}
</style>
