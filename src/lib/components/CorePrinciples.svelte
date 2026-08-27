<script>
	/*
	 * Core principles — the first grounded block under the pinned scenes.
	 * Styling comes from the shared `.ground` layer in src/app.css; the
	 * words come from `home.principles` in the dictionaries.
	 */
	import { t } from '$lib/i18n/index.js';
</script>

<div class="block">
	<p class="eyebrow">{$t('home.principles.eyebrow')}</p>
	<h2>{$t('home.principles.heading')}</h2>
	<p class="block-intro">{$t('home.principles.intro')}</p>

	<div class="grid">
		{#each $t('home.principles.items') as item}
			<article class="card">
				<h3>{item.title}</h3>
				<p>{@html item.body}</p>
			</article>
		{/each}
	</div>
</div>
