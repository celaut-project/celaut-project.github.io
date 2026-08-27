<script>
	/*
	 * The two coordination mechanisms, in the same order the pinned scene
	 * introduces them: reputation decides who is worth dealing with,
	 * payment moves the value once that check passes.
	 * Styling comes from the shared `.ground` layer in src/app.css; the
	 * words come from `home.coordination` in the dictionaries.
	 */
	import { t } from '$lib/i18n/index.js';
</script>

<div class="block">
	<p class="eyebrow">{$t('home.coordination.eyebrow')}</p>
	<h2>{$t('home.coordination.heading')}</h2>
	<p class="block-intro">{$t('home.coordination.intro')}</p>

	<div class="grid grid-2">
		{#each $t('home.coordination.items') as item}
			<article class="card">
				<h3>{item.title}</h3>
				<p>{@html item.body}</p>
				<ul class="points">
					{#each item.points as point}
						<li>{point}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>

	<span class="note">{$t('home.coordination.note')}</span>
</div>
