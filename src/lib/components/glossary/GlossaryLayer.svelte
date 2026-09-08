<script>
	/*
	 * GlossaryLayer — mounts once, in the root layout, and owns the
	 * whole "explain the jargon" feature at runtime.
	 *
	 * Responsibilities:
	 *   • annotate the document after each navigation, when the layer is
	 *     switched on, and when the locale changes (different language,
	 *     different trigger words, so the marks are rebuilt from scratch)
	 *   • re-annotate content that appears later — these pages reveal
	 *     scene captions on scroll, so a MutationObserver picks up prose
	 *     that was not in the DOM at first paint
	 *   • turn a click on a mark into an open popover
	 *
	 * It renders nothing but the popover: everything else it does is to
	 * the existing DOM. That is what keeps the feature removable — delete
	 * this component and the site is exactly what it was before, because
	 * no page markup and no dictionary sentence knows it exists.
	 */

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { annotate, clearGlossary } from '$lib/glossary/annotate.js';
	import { glossaryEnabled, openTerm, markSeen } from '$lib/glossary/store.js';
	import { t, locale, translated } from '$lib/i18n/index.js';
	import GlossaryPopover from './GlossaryPopover.svelte';
	import GlossaryHint from './GlossaryHint.svelte';

	let mounted = false;
	/** Guards against re-entrancy: our own DOM writes trigger the observer. */
	let working = false;
	/**
	 * Set when a mutation arrives while we are mid-pass.
	 *
	 * Without this the observer simply DROPPED those mutations, and any
	 * page whose content lands in the same frame as our first pass — the
	 * install page renders its markdown after mount — was left with no
	 * marks at all, permanently, because nothing ever asked again.
	 * Re-entrancy still has to be prevented, but the answer is to defer
	 * the work, not to discard it.
	 */
	let dirty = false;
	/** @type {number | undefined} */
	let scheduled;

	/** The subtree we annotate. Everything the site renders lives here. */
	function root() {
		return /** @type {HTMLElement | null} */ (document.querySelector('main')) || document.body;
	}

	/*
	 * Is the glossary actually translated into the language being read?
	 *
	 * This gate is the difference between a helpful feature and a
	 * confusing one. Several trigger words are spelled identically in
	 * every language — DePIN, microVM, Ergo, gRPC, peer-to-peer — so
	 * without it, English fallback definitions attach themselves to a
	 * Spanish or Japanese page: a few words underlined, each opening a
	 * card the reader may not be able to read. Worse than nothing, and
	 * precisely for the reader the feature exists to serve.
	 *
	 * English and Spanish ship today; the other dictionaries light up the
	 * moment `glossary` is added to them, with no code change here.
	 */
	$: available = $translated('glossary.terms');

	function run() {
		if (!mounted) return;
		// A pass requested while another is in flight must be remembered,
		// never dropped. Silently returning here is what left /install
		// unannotated: its panel renders after mount, so its pass
		// collided with the locale bootstrap and was discarded, and
		// nothing ever asked a second time.
		if (working) {
			dirty = true;
			return;
		}
		const el = root();
		if (!el) return;

		working = true;
		dirty = false;
		try {
			// `available` is false on a locale whose glossary has not been
			// translated yet: the layer stays completely off there rather
			// than underlining foreign words with English definitions.
			if (!$glossaryEnabled || !available) {
				clearGlossary(el);
			} else {
				const terms = $t('glossary.terms');
				if (Array.isArray(terms) && terms.length) {
					annotate(el, terms);
					relabel(el);
				}
			}
		} finally {
			// Let the observer's microtask queue drain before we listen
			// again, or our own mutations schedule another pass.
			requestAnimationFrame(() => {
				working = false;
				// Anything that arrived while we were busy still needs doing.
				if (dirty) schedule();
			});
		}
	}

	/**
	 * annotate.js is framework-free and has no access to the locale, so
	 * it writes a fallback aria-label. This puts the translated one on.
	 */
	function relabel(el) {
		const template = $t('glossary.explain');
		if (typeof template !== 'string') return;
		for (const mark of el.querySelectorAll('button.gloss[data-gloss]')) {
			mark.setAttribute('aria-label', template.replace('{term}', mark.textContent || ''));
		}
	}

	function schedule() {
		if (scheduled) cancelAnimationFrame(scheduled);
		scheduled = requestAnimationFrame(() => {
			scheduled = undefined;
			run();
		});
	}

	/* Re-run on navigation, whenever the switch flips, and whenever the
	   glossary's availability in the current language changes. */
	$: if (mounted && ($page.url.pathname || $glossaryEnabled !== undefined || available !== undefined))
		schedule();

	/*
	 * A locale change means different trigger words entirely, so the
	 * existing marks have to come down before the new pass runs.
	 *
	 * WHY THIS IS A RAW SUBSCRIPTION AND NOT A REACTIVE BLOCK
	 * ------------------------------------------------------
	 * It has to happen BEFORE Svelte re-renders the prose, not merely
	 * "soon". A `$:` block is scheduled with every other reactive update,
	 * so it could run after the components that own the text had already
	 * been re-rendered around our marks. A store subscription runs
	 * synchronously inside `locale.set()`, before any effect is flushed,
	 * which is the only point where the DOM is guaranteed to still be
	 * the one we annotated.
	 *
	 * That ordering is what the whole feature rests on. `{@html}` blocks
	 * tear themselves down by walking from their first node to their
	 * last; nodes we added that fall outside that pair are NOT removed,
	 * so they survive into the next language as stale sentences and the
	 * section reads half in Spanish and half in English (and grows a
	 * little with every switch). Handing Svelte a DOM with no glossary
	 * nodes in it at all means there is nothing to survive.
	 *
	 * `sweepOrphans` inside annotate/clear is the belt to this braces:
	 * if anything is ever torn down without warning us, the debris is
	 * recognised and deleted on the next pass rather than accumulating.
	 */
	onMount(() => {
		const stop = locale.subscribe(() => {
			if (!mounted) return;
			const el = root();
			if (el) clearGlossary(el);
			schedule();
		});
		return stop;
	});

	function onClick(event) {
		const target = event.target;
		if (!(target instanceof Element)) return;
		const mark = target.closest('button.gloss[data-gloss]');
		if (!mark) return;

		event.preventDefault();
		event.stopPropagation();

		const id = mark.getAttribute('data-gloss');
		const already = mark.getAttribute('aria-expanded') === 'true';

		for (const other of document.querySelectorAll('button.gloss[aria-expanded="true"]')) {
			other.setAttribute('aria-expanded', 'false');
		}

		if (already) {
			openTerm.set(null);
			return;
		}

		mark.setAttribute('aria-expanded', 'true');
		openTerm.set({ id, rect: mark.getBoundingClientRect() });
		markSeen();
	}

	/* Keep the buttons' aria-expanded honest when the card closes for
	   any other reason (Escape, outside click, scroll). */
	$: if (mounted && !$openTerm) {
		for (const mark of document.querySelectorAll('button.gloss[aria-expanded="true"]')) {
			mark.setAttribute('aria-expanded', 'false');
		}
	}

	onMount(() => {
		mounted = true;
		schedule();

		const observer = new MutationObserver((records) => {
			if (!$glossaryEnabled) return;
			// Only care about structural changes that could bring prose in.
			const relevant = records.some((r) => r.type === 'childList' && r.addedNodes.length);
			if (!relevant) return;
			// Mid-pass: remember rather than drop, and run again after.
			if (working) dirty = true;
			else schedule();
		});
		const el = root();
		if (el) observer.observe(el, { childList: true, subtree: true });

		document.addEventListener('click', onClick, true);

		return () => {
			observer.disconnect();
			document.removeEventListener('click', onClick, true);
			if (scheduled) cancelAnimationFrame(scheduled);
			mounted = false;
		};
	});
</script>

<GlossaryPopover />
<GlossaryHint />

<!--
	The mark styling is global on purpose: the buttons are created by
	annotate.js with plain DOM APIs, so Svelte's scoped-class rewriting
	never sees them.

	The affordance is a dotted underline in the accent, and nothing else
	— no background, no colour change, no icon. It has to be visible
	enough that a reader who wants help finds it, and quiet enough that
	a reader who doesn't can read straight past a paragraph containing
	one. Underline-only survives both themes and does not compete with
	the <strong> emphasis the copy already uses heavily.
-->
<style>
	:global(button.gloss) {
		/* Inherit everything: the mark must read as the word it replaced,
		   not as a control that happens to contain text. */
		font: inherit;
		color: inherit;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: help;
		text-decoration: underline;
		text-decoration-style: dotted;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		text-decoration-color: var(--accent);
		transition: color 0.18s ease, text-decoration-color 0.18s ease;
	}

	:global(button.gloss:hover),
	:global(button.gloss[aria-expanded='true']) {
		color: var(--accent-text);
		text-decoration-color: var(--accent-text);
	}

	:global(button.gloss:focus-visible) {
		outline: 2px solid var(--accent-text);
		outline-offset: 2px;
		border-radius: 3px;
	}

	/*
	 * The wrapper annotate.js inserts when the paragraph it is splitting
	 * is itself a flex or grid container.
	 *
	 * Without it, splitting the text node turns each piece into a flex
	 * ITEM: the two halves of the sentence and the mark line up as
	 * side-by-side columns, and the whitespace-only boxes between them
	 * are discarded by the layout algorithm, so the space before the
	 * marked word disappears entirely. This keeps the run as a single
	 * box for the flex parent while remaining ordinary inline text
	 * inside — it must inherit alignment and wrapping, and add nothing
	 * of its own, because the reader has to see the sentence the
	 * translator wrote and nothing else.
	 */
	:global(span[data-gloss-run]) {
		display: inline;
		font: inherit;
		color: inherit;
		text-align: inherit;
	}

	/* Inside a <strong> the mark must stay bold — `font: inherit` gets
	   the weight from the button's own default otherwise. */
	:global(strong button.gloss),
	:global(b button.gloss) {
		font-weight: inherit;
	}
</style>
