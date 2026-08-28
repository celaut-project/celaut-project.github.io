<script>
	/*
	 * The two primitives — nodes and services — placed immediately after
	 * the "Where it comes from" scene so the rest of the page has
	 * something to point at. Styling comes from the shared `.ground`
	 * layer; words from `home.atoms`.
	 */
	import { t } from '$lib/i18n/index.js';
</script>

<div class="block">
	<p class="eyebrow">{$t('home.atoms.eyebrow')}</p>
	<h2>{$t('home.atoms.heading')}</h2>
	<p class="block-intro">{$t('home.atoms.intro')}</p>

	<div class="grid grid-pair">
		{#each $t('home.atoms.items') as item}
			<article class="card">
				<h3>{item.title}</h3>
				<p>{@html item.body}</p>
			</article>
		{/each}
	</div>
</div>
