<script>
	/*
	 * What exists today, and at what stage.
	 *
	 * This replaces the old "Nodes: the foundation of the network"
	 * block, whose four node responsibilities restated the whole of
	 * /depin. Those moved onto that page; what stayed is the part the
	 * landing page is the right place for — which implementations of the
	 * architecture actually exist.
	 *
	 * The `stage` chip is the honest part, and the reason this component
	 * is not just a card grid. Nodo is a running node with installers
	 * for two operating systems. Chatui is a repository containing a
	 * one-line README and no implementation. The previous version listed
	 * them side by side under "Implementations you can run today", which
	 * was a claim the second one could not support, so the state is now
	 * on the card itself rather than left to be inferred.
	 *
	 * Styling comes from the shared `.ground` layer in src/app.css; the
	 * words come from `home.implementations` in the dictionaries. The
	 * repository URLs and which stage counts as "live" are structure, so
	 * they stay here and pair by index.
	 */
	import { t } from '$lib/i18n/index.js';

	const repos = [
		'https://github.com/celaut-project/nodo',
		'https://github.com/celaut-project/chatui'
	];
	// Index 0 is the running implementation; anything else is an
	// announced direction. Kept as data rather than read from the
	// translated `stage` string, which must never become load-bearing.
	const LIVE = 0;
</script>

<div class="block">
	<p class="eyebrow">{$t('home.implementations.eyebrow')}</p>
	<h2>{$t('home.implementations.heading')}</h2>
	<p class="block-intro">{@html $t('home.implementations.intro')}</p>

	<div class="grid grid-2">
		{#each $t('home.implementations.items') as impl, i}
			<article class="card" class:concept={i !== LIVE}>
				<div class="card-head">
					<h3>{impl.name}</h3>
					<span class="stage" class:live={i === LIVE}>{impl.stage}</span>
				</div>
				<p>{impl.body}</p>
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

	/* A concept is real information, not a lesser card — but it should
	   not be wearing the same accent rule as something you can install. */
	.card.concept {
		border-top-color: var(--border-strong);
	}
</style>
