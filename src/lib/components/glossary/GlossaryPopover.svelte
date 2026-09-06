<script>
	/*
	 * The definition card that opens over a marked word.
	 *
	 * Placement rules, in order of stubbornness:
	 *   1. Below the word if there is room, above it if there isn't.
	 *   2. Horizontally centred on the word, then clamped into the
	 *      viewport with a 12px margin, so a term at the very edge of a
	 *      narrow screen never renders half off-screen.
	 *   3. Below 520px it stops trying to be clever and becomes a sheet
	 *      pinned to the bottom of the screen — which is where a thumb
	 *      already is, and avoids the popover covering the sentence the
	 *      reader is in the middle of.
	 *
	 * It closes on Escape, on outside click, on scroll (the anchor has
	 * moved and a card floating over unrelated prose is worse than no
	 * card), and on navigation.
	 *
	 * Focus is moved into the card on open and returned to the marked
	 * word on close — the standard non-modal disclosure contract. It is
	 * deliberately NOT a modal: it does not trap focus and does not make
	 * the page inert, because it explains one word and nothing about the
	 * rest of the page should stop being usable while it is open.
	 */

	import { onMount, tick } from 'svelte';
	import { openTerm, closeTerm } from '$lib/glossary/store.js';
	import { GLOSSARY_IDS } from '$lib/glossary/terms.js';
	import { t } from '$lib/i18n/index.js';

	/** @type {HTMLElement | undefined} */
	let card;
	let top = 0;
	let left = 0;
	let placement = 'below';
	let sheet = false;

	/** The element that was clicked, so focus can be handed back. */
	/** @type {HTMLElement | null} */
	let opener = null;

	$: term = $openTerm ? entryFor($openTerm.id) : null;

	function entryFor(id) {
		const terms = $t('glossary.terms');
		if (!Array.isArray(terms)) return null;
		const i = GLOSSARY_IDS.indexOf(id);
		return i >= 0 ? terms[i] : null;
	}

	/* Reposition whenever a new term opens. */
	$: if ($openTerm) place($openTerm.rect);

	async function place(rect) {
		opener = document.querySelector(`button.gloss[aria-expanded="true"]`);
		await tick();
		if (!card) return;

		sheet = window.innerWidth <= 520;
		if (sheet) {
			card.focus({ preventScroll: true });
			return;
		}

		const margin = 12;
		const gap = 10;
		const box = card.getBoundingClientRect();

		const roomBelow = window.innerHeight - rect.bottom;
		placement = roomBelow >= box.height + gap + margin ? 'below' : 'above';
		top = placement === 'below' ? rect.bottom + gap : rect.top - box.height - gap;

		const wanted = rect.left + rect.width / 2 - box.width / 2;
		const max = window.innerWidth - box.width - margin;
		left = Math.max(margin, Math.min(wanted, Math.max(margin, max)));

		card.focus({ preventScroll: true });
	}

	function dismiss() {
		const returnTo = opener;
		closeTerm();
		// Hand focus back to the word, so a keyboard reader carries on
		// from where they were rather than at the top of the document.
		if (returnTo && document.contains(returnTo)) returnTo.focus({ preventScroll: true });
	}

	function onKey(event) {
		if (event.key === 'Escape' && $openTerm) {
			event.stopPropagation();
			dismiss();
		}
	}

	onMount(() => {
		const onPointer = (event) => {
			if (!$openTerm) return;
			if (card && card.contains(event.target)) return;
			// A click on another marked word is that word's business.
			if (event.target instanceof Element && event.target.closest('button.gloss')) return;
			dismiss();
		};
		const onScroll = () => {
			if ($openTerm) closeTerm();
		};

		window.addEventListener('pointerdown', onPointer, true);
		window.addEventListener('scroll', onScroll, { passive: true, capture: true });
		window.addEventListener('resize', onScroll);

		return () => {
			window.removeEventListener('pointerdown', onPointer, true);
			window.removeEventListener('scroll', onScroll, true);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<svelte:window on:keydown={onKey} />

{#if $openTerm && term}
	<div
		class="gloss-card"
		class:sheet
		class:above={placement === 'above' && !sheet}
		bind:this={card}
		role="dialog"
		aria-label={term.title}
		tabindex="-1"
		style={sheet ? '' : `top: ${top}px; left: ${left}px;`}
	>
		<div class="head">
			<h3>{term.title}</h3>
			<button class="close" type="button" on:click={dismiss} aria-label={$t('glossary.close')}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
		</div>
		<p>{@html term.body}</p>
		{#if term.more}
			<p class="more">{@html term.more}</p>
		{/if}
	</div>
{/if}

<style>
	.gloss-card {
		position: fixed;
		z-index: 80;
		width: min(340px, calc(100vw - 24px));
		background-color: var(--surface-raised);
		color: var(--on-surface);
		border: 1px solid var(--border-strong);
		border-top: 3px solid var(--accent);
		border-radius: 12px;
		padding: 16px 18px 18px;
		box-shadow: var(--shadow-md);
		font-family: var(--font-body);
		animation: gloss-in 160ms ease-out;
	}

	.gloss-card:focus-visible {
		outline: 2px solid var(--accent-text);
		outline-offset: 3px;
	}

	.gloss-card.above {
		border-top: 1px solid var(--border-strong);
		border-bottom: 3px solid var(--accent);
	}

	@keyframes gloss-in {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
	}

	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 8px;
	}

	.gloss-card h3 {
		font-family: var(--font-heading);
		font-size: 1.05rem;
		color: var(--accent-text);
		margin: 0;
		line-height: 1.3;
	}

	.gloss-card p {
		margin: 0;
		font-size: 0.94rem;
		line-height: 1.62;
		color: var(--on-surface-muted);
	}

	.gloss-card p.more {
		margin-top: 10px;
		font-size: 0.88rem;
		color: var(--on-surface-subtle);
	}

	.close {
		flex-shrink: 0;
		width: 26px;
		height: 26px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		border: 1px solid transparent;
		background: transparent;
		color: var(--on-surface-subtle);
		cursor: pointer;
		transition: color 0.18s ease, border-color 0.18s ease;
	}

	.close:hover {
		color: var(--accent-text);
		border-color: var(--border-strong);
	}

	.close:focus-visible {
		outline: 2px solid var(--accent-text);
		outline-offset: 2px;
	}

	.close svg {
		width: 14px;
		height: 14px;
	}

	/* Phone: a bottom sheet, not a floating card. */
	.gloss-card.sheet {
		width: 100%;
		left: 0;
		right: 0;
		bottom: 0;
		top: auto;
		border-radius: 16px 16px 0 0;
		border-inline: none;
		border-bottom: none;
		border-top: 3px solid var(--accent);
		padding: 18px 20px calc(22px + env(safe-area-inset-bottom, 0px));
		animation: gloss-up 200ms ease-out;
	}

	@keyframes gloss-up {
		from {
			transform: translateY(100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.gloss-card,
		.gloss-card.sheet {
			animation: none;
		}
	}
</style>
