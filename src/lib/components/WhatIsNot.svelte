<script>
	/*
	 * Clearing up what Celaut is not. Rows rather than cards: each one is
	 * a correction that needs a sentence or two, not a headline.
	 * Styling comes from the shared `.ground` layer in src/app.css; the
	 * words come from `home.whatIsNot` in the dictionaries.
	 */
	import { t } from '$lib/i18n/index.js';
</script>

<div class="block">
	<p class="eyebrow">{$t('home.whatIsNot.eyebrow')}</p>
	<h2>{$t('home.whatIsNot.heading')}</h2>
	<p class="block-intro">{$t('home.whatIsNot.intro')}</p>

	<div class="rows">
		{#each $t('home.whatIsNot.items') as item, i}
			<div class="row">
				<!-- Numbering is presentation, so it is generated rather than
				     repeated in every dictionary. -->
				<span class="row-mark" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
				<div>
					<h3>{item.title}</h3>
					<p>{@html item.body}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
