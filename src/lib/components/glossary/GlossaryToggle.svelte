<script>
	/*
	 * The switch that turns the explanation layer off.
	 *
	 * It sits in the same fixed cluster as language and theme, because
	 * it is the same kind of control: a reading preference, not a piece
	 * of navigation. Third in the row, after language and theme, in
	 * rough order of how often it gets touched.
	 *
	 * The icon is a question mark in a circle when the layer is on and
	 * the same mark struck through when it is off, so the button always
	 * says what the current state IS, and its label always says what
	 * pressing it would DO. (Those two being confused is the single most
	 * common failure in toggle buttons.)
	 */

	import { glossaryEnabled, toggleGlossary } from '$lib/glossary/store.js';
	import { t, translated } from '$lib/i18n/index.js';

	/*
	 * Hidden entirely on a locale whose glossary is not translated yet.
	 *
	 * A control that is visible but does nothing is worse than an absent
	 * one — it invites a click, produces no change, and teaches the
	 * reader that the site's controls are unreliable. English has the
	 * glossary today; every other language gets the button the moment its
	 * dictionary carries the terms.
	 */
	$: available = $translated('glossary.terms');
</script>

{#if available}
<button
	class="gloss-toggle"
	class:off={!$glossaryEnabled}
	type="button"
	on:click={toggleGlossary}
	aria-pressed={$glossaryEnabled}
	aria-label={$glossaryEnabled ? $t('glossary.toggleOff') : $t('glossary.toggleOn')}
	title={$glossaryEnabled ? $t('glossary.toggleOff') : $t('glossary.toggleOn')}
>
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<circle cx="12" cy="12" r="9.25" />
		<path d="M9.4 9.2a2.7 2.7 0 1 1 3.35 2.62c-.62.16-.75.62-.75 1.13v.6" />
		<path d="M12 16.6h.01" />
		{#if !$glossaryEnabled}
			<path class="slash" d="M4.6 19.4 19.4 4.6" />
		{/if}
	</svg>
</button>
{/if}

<style>
	.gloss-toggle {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--accent-text);
		background: rgba(var(--surface-rgb), 0.82);
		border: 1px solid var(--border-strong);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow: var(--shadow-sm);
		transition: background 0.25s ease, transform 0.2s ease, border-color 0.25s ease,
			color 0.25s ease;
	}

	.gloss-toggle:hover {
		transform: scale(1.08);
		background: var(--surface);
		border-color: var(--accent);
	}

	.gloss-toggle:focus-visible {
		outline: 2px solid var(--accent-text);
		outline-offset: 3px;
	}

	/* Off reads as muted rather than as an error. */
	.gloss-toggle.off {
		color: var(--on-surface-subtle);
	}

	.gloss-toggle svg {
		width: 22px;
		height: 22px;
	}

	@media (prefers-reduced-motion: reduce) {
		.gloss-toggle {
			transition: none;
		}
		.gloss-toggle:hover {
			transform: none;
		}
	}
</style>
