<script>
	/*
	 * A one-time toast telling a first-time reader that the dotted words
	 * are clickable.
	 *
	 * This exists because a dotted underline is not a universally
	 * understood affordance. Without one sentence of explanation the
	 * feature only reaches readers who happen to try clicking a word,
	 * which is close to nobody — and the readers it is FOR (people
	 * unsure of the vocabulary) are the least likely to experiment.
	 *
	 * Constraints it holds to, because a toast is easy to get wrong:
	 *   • Once, ever. Dismissal is persisted, and so is opening any term
	 *     (if you already clicked one, you clearly do not need telling).
	 *   • Never on first paint. It waits until the reader has actually
	 *     scrolled past a mark, so it explains something already on
	 *     screen instead of interrupting the hero.
	 *   • Bottom-left, clear of the controls cluster (top-right), the
	 *     to-top button and the mobile section-index FAB.
	 *   • It is not a modal, does not steal focus, and auto-retires
	 *     after twelve seconds if ignored.
	 */

	import { onMount } from 'svelte';
	import { glossaryEnabled, glossaryUnseen, markSeen } from '$lib/glossary/store.js';
	import { t, translated } from '$lib/i18n/index.js';

	// Same gate as the layer and the switch: never advertise an
	// affordance this language does not have yet.
	$: available = $translated('glossary.terms');

	let visible = false;
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let retire;

	function dismiss() {
		visible = false;
		clearTimeout(retire);
		markSeen();
	}

	onMount(() => {
		if (!$glossaryUnseen || !$glossaryEnabled || !available) return;

		// Show it when a marked word has actually been on screen.
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;
				observer.disconnect();
				if (!$glossaryUnseen || !$glossaryEnabled) return;
				visible = true;
				retire = setTimeout(dismiss, 12000);
			},
			{ threshold: 1 }
		);

		// Marks are injected after mount, so wait for the first one.
		const poll = setInterval(() => {
			const mark = document.querySelector('button.gloss[data-gloss]');
			if (!mark) return;
			clearInterval(poll);
			observer.observe(mark);
		}, 400);

		// Give up after 15s rather than polling for the life of the page.
		const stopPolling = setTimeout(() => clearInterval(poll), 15000);

		return () => {
			observer.disconnect();
			clearInterval(poll);
			clearTimeout(stopPolling);
			clearTimeout(retire);
		};
	});

	/* If the reader opens a term themselves, the hint has no job left. */
	$: if (!$glossaryUnseen && visible) visible = false;
</script>

{#if visible}
	<div class="gloss-hint" role="status">
		<div class="mark" aria-hidden="true">
			<span>peer-to-peer</span>
		</div>
		<div class="copy">
			<strong>{$t('glossary.hintTitle')}</strong>
			<p>{$t('glossary.hintBody')}</p>
		</div>
		<button type="button" on:click={dismiss}>{$t('glossary.hintDismiss')}</button>
	</div>
{/if}

<style>
	.gloss-hint {
		position: fixed;
		inset-inline-start: 24px;
		bottom: 24px;
		z-index: 70;
		width: min(340px, calc(100vw - 32px));
		background-color: var(--surface-raised);
		border: 1px solid var(--border-strong);
		border-inline-start: 3px solid var(--accent);
		border-radius: 12px;
		padding: 16px 18px;
		box-shadow: var(--shadow-md);
		font-family: var(--font-body);
		animation: hint-in 260ms ease-out;
	}

	.mark {
		font-size: 0.82rem;
		color: var(--on-surface-subtle);
		margin-bottom: 8px;
	}

	/* A live sample of the affordance being described, so the sentence
	   and the thing it refers to are never more than an inch apart. */
	.mark span {
		text-decoration: underline;
		text-decoration-style: dotted;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		text-decoration-color: var(--accent);
		color: var(--accent-text);
	}

	.copy strong {
		display: block;
		font-family: var(--font-heading);
		font-size: 0.98rem;
		color: var(--on-surface);
		margin-bottom: 5px;
	}

	.copy p {
		margin: 0;
		font-size: 0.87rem;
		line-height: 1.55;
		color: var(--on-surface-muted);
	}

	.gloss-hint button {
		margin-top: 12px;
		padding: 7px 16px;
		border-radius: 8px;
		border: 1px solid var(--accent);
		background: transparent;
		color: var(--accent-text);
		font-family: var(--font-body);
		font-size: 0.85rem;
		font-weight: 700;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.gloss-hint button:hover {
		background: var(--accent-soft);
	}

	.gloss-hint button:focus-visible {
		outline: 2px solid var(--accent-text);
		outline-offset: 2px;
	}

	@keyframes hint-in {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.gloss-hint {
			animation: none;
		}
	}

	/* On phones the definition itself arrives as a bottom sheet, so the
	   hint sits above where that sheet will appear rather than under it. */
	@media (max-width: 520px) {
		.gloss-hint {
			inset-inline: 12px;
			width: auto;
			bottom: 16px;
		}
	}
</style>
