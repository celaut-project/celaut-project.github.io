<script>
	/*
	 * How a service gets from its developer to the people who run it.
	 * Styling comes from the shared `.ground` layer in src/app.css; the
	 * words come from `home.distribution` in the dictionaries.
	 */
	import { t } from '$lib/i18n/index.js';
</script>

<div class="block">
	<p class="eyebrow">{$t('home.distribution.eyebrow')}</p>
	<h2>{$t('home.distribution.heading')}</h2>
	<p class="block-intro">{$t('home.distribution.intro')}</p>

	<div class="grid grid-2">
		{#each $t('home.distribution.items') as item}
			<article class="card">
				<h3>{item.title}</h3>
				<p>{@html item.body}</p>
			</article>
		{/each}
	</div>
</div>
