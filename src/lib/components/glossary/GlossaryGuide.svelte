<script>
	import { t, translated } from '$lib/i18n/index.js';
</script>

{#if $translated('glossary.terms')}
	<p class="glossary-guide" data-no-gloss>
		<span aria-hidden="true">ⓘ</span>
		{$t('glossary.hintBody')}
	</p>
{/if}

<style>
	.glossary-guide {
		max-width: 62ch;
		margin: 28px 0 0;
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--on-surface-muted);
	}
	span { color: var(--accent-text); }
</style>
