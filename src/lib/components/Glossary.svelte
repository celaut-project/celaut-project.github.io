<script>
	/*
	 * Glossary — the plain-language layer.
	 *
	 * The copy on this site is written for readers who already know what
	 * "peer-to-peer", "compute" or "microVM" mean. Everyone else stops at
	 * the first unfamiliar noun — and simplifying the prose to fix that
	 * would cost us the readers the project actually needs. So the words
	 * stay exactly as they are and an explanation is attached to them:
	 * the term keeps a dotted underline, and one hover or tap opens a
	 * short definition in everyday language, plus the analogy that makes
	 * it land.
	 *
	 * Nothing is marked up by hand in the dictionaries. The terms are
	 * found in the rendered page (see $lib/glossary.js), which means the
	 * seventeen dictionaries stay pure copy — a definition is written
	 * once, under `glossary.terms`, instead of being sprinkled through
	 * the sentences of every locale — and new copy inherits the help
	 * layer for free.
	 *
	 * This component owns the interaction: hover/tap to open, a floating
	 * card on a pointer, a bottom sheet on touch, and the one-time hint
	 * that teaches a first-time visitor what the underline offers.
	 *
	 * DOM safety: the marks are raw nodes injected into text Svelte owns,
	 * and Svelte keeps a reference to the text node it may later write
	 * into. A locale switch is the one moment that happens, so
	 * `onLocaleChange` unmarks *synchronously* — store subscribers run
	 * inside `locale.set()`, before Svelte's update flush — and re-scans
	 * once the new copy has rendered.
	 */

	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { locale, t } from '$lib/i18n/index.js';
	import { buildIndex, mark, unmark } from '$lib/glossary.js';

	/** @type {(key: string, vars?: Record<string, unknown>) => any} */
	let tr;
	$: tr = $t;

	/** @type {Array<{ btn: HTMLElement, text: Text }>} */
	let marks = [];

	/** @type {string | null} */
	let openKey = null;
	/** @type {HTMLElement | null} */
	let anchor = null;
	/** Click-opened popovers survive mouseleave; hover-opened ones don't. */
	let pinned = false;
	/** Touch and narrow screens get a bottom sheet instead of a popover. */
	let sheet = false;
	let pos = { top: 0, left: 0, side: 'top' };
	/** @type {HTMLElement | undefined} */
	let popEl;
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let openTimer;
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let closeTimer;

	$: def = openKey ? tr('glossary.terms')?.[openKey] : null;

	/* ---------------------------------------------------------------
	 * Marking
	 * --------------------------------------------------------------- */

	/** @param {string} key */
	function createMark(key) {
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'gl-term';
		btn.dataset.glossary = key;
		btn.setAttribute('aria-expanded', 'false');
		return btn;
	}

	function scan() {
		if (marks.length) return;
		marks = mark(document.body, buildIndex(tr('glossary.terms')), createMark);
		armHint();
	}

	function clear() {
		close();
		unmark(marks);
		marks = [];
		hintObserver?.disconnect();
		hintOpen = false;
		hintTerm = null;
	}

	/* ---------------------------------------------------------------
	 * The explanation
	 * --------------------------------------------------------------- */

	function measure() {
		if (!anchor) return;
		// A bottom sheet is anchored to the screen, not to the term, so
		// where the term is doesn't concern it. The floating card does
		// point at its term, and gives up once that has scrolled away.
		if (sheet) return;
		const r = anchor.getBoundingClientRect();
		if (r.bottom < -40 || r.top > window.innerHeight + 40) {
			close();
			return;
		}
		const width = 320;
		const gap = 12;
		const height = popEl?.offsetHeight || 170;
		const above = r.top > height + gap + 16;
		pos = {
			side: above ? 'top' : 'bottom',
			top: above ? r.top - gap - height : r.bottom + gap,
			left: Math.min(
				Math.max(12, r.left + r.width / 2 - width / 2),
				Math.max(12, window.innerWidth - width - 12)
			)
		};
	}

	/**
	 * @param {HTMLElement} btn
	 * @param {boolean} isPinned click-opened, so a mouseleave shouldn't close it
	 */
	function open(btn, isPinned) {
		clearTimeout(closeTimer);
		const key = btn.dataset.glossary;
		if (!key) return;
		if (anchor && anchor !== btn) release(anchor);
		anchor = btn;
		openKey = key;
		pinned = isPinned;
		btn.setAttribute('aria-expanded', 'true');
		btn.setAttribute('aria-describedby', 'gl-pop');
		dismissHint();
		// One tick for the card to exist and be measurable, so it is never
		// painted at the wrong end of the screen first.
		tick().then(() => {
			measure();
			if (sheet) popEl?.focus();
		});
	}

	/** @param {HTMLElement} btn */
	function release(btn) {
		btn.setAttribute('aria-expanded', 'false');
		btn.removeAttribute('aria-describedby');
	}

	function close() {
		clearTimeout(openTimer);
		clearTimeout(closeTimer);
		if (anchor) release(anchor);
		openKey = null;
		anchor = null;
		pinned = false;
	}

	/**
	 * Dismissing by keyboard or by the sheet's own button returns focus
	 * to the term it came from.
	 *
	 * `focus()` fires `focusin` synchronously, and `focusin` is what
	 * opens a term for keyboard users — so without this guard, Escape
	 * would close the card and immediately reopen it, leaving keyboard
	 * users with no way out at all.
	 */
	let refocusing = false;

	function closeAndRefocus() {
		const previous = anchor;
		close();
		if (!previous) return;
		refocusing = true;
		previous.focus();
		refocusing = false;
	}

	/* ---------------------------------------------------------------
	 * First-run hint
	 *
	 * A dotted underline is a convention technical readers know and
	 * nobody ever taught anyone else. Once per visitor, the first marked
	 * term to scroll into view says out loud what it is offering — then
	 * never again.
	 * --------------------------------------------------------------- */

	const HINT_KEY = 'celaut-glossary-hint';

	/** @type {HTMLElement | null} */
	let hintTerm = null;
	let hintPos = { top: 0, left: 0 };
	let hintOpen = false;
	/** @type {IntersectionObserver | undefined} */
	let hintObserver;

	function hintSeen() {
		try {
			return localStorage.getItem(HINT_KEY) === '1';
		} catch (e) {
			// No storage (private mode) — better to stay quiet than to show
			// the same hint on every page.
			return true;
		}
	}

	function armHint() {
		if (hintSeen() || !marks.length) return;
		hintTerm = marks[0].btn;
		hintObserver?.disconnect();
		hintObserver = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;
				hintObserver?.disconnect();
				placeHint();
				hintOpen = true;
				setTimeout(() => hintOpen && dismissHint(), 9000);
			},
			{ threshold: 1 }
		);
		hintObserver.observe(hintTerm);
	}

	const HINT_W = 280;

	/*
	 * Beside the term where the margin allows it, underneath it where it
	 * doesn't. Underneath is the obvious placement and the wrong one on a
	 * wide screen: these pages set prose in a half-width column with a
	 * call to action below it, so a bubble under the word lands on the
	 * button. The margin is empty, and a bubble in it points just as
	 * clearly.
	 */
	function placeHint() {
		if (!hintTerm) return;
		const r = hintTerm.getBoundingClientRect();
		const beside = r.right + 14 + HINT_W + 12 < window.innerWidth;
		hintPos = beside
			? { top: Math.max(12, r.top - 10), left: r.right + 14 }
			: {
					top: r.bottom + 10,
					left: Math.min(Math.max(12, r.left - 8), Math.max(12, window.innerWidth - HINT_W - 12))
				};
	}

	function dismissHint() {
		if (!hintOpen) return;
		hintOpen = false;
		hintObserver?.disconnect();
		try {
			localStorage.setItem(HINT_KEY, '1');
		} catch (e) {
			/* nothing to remember it with; the hint simply shows again */
		}
	}

	/* ---------------------------------------------------------------
	 * Wiring
	 * --------------------------------------------------------------- */

	onMount(() => {
		const mq = window.matchMedia('(max-width: 640px), (pointer: coarse)');
		sheet = mq.matches;
		const onMq = (/** @type {MediaQueryListEvent} */ e) => {
			sheet = e.matches;
			close();
		};
		mq.addEventListener('change', onMq);

		/** @param {Event} e */
		const termOf = (e) =>
			/** @type {HTMLElement | null} */ (
				/** @type {Element | null} */ (e.target)?.closest?.('.gl-term') ?? null
			);
		/** @param {Event | { target: EventTarget | null }} e */
		const inPopover = (e) =>
			!!(/** @type {Element | null} */ (e.target)?.closest?.('.gl-pop'));

		/** @param {MouseEvent} e */
		const onClick = (e) => {
			const btn = termOf(e);
			if (btn) {
				e.preventDefault();
				if (openKey && anchor === btn && pinned) close();
				else open(btn, true);
			} else if (openKey && !inPopover(e)) {
				close();
			}
		};

		/** @param {MouseEvent} e */
		const onOver = (e) => {
			if (sheet) return;
			const btn = termOf(e);
			if (!btn) return;
			clearTimeout(closeTimer);
			if (anchor === btn) return;
			clearTimeout(openTimer);
			openTimer = setTimeout(() => open(btn, false), 130);
		};

		/** @param {MouseEvent} e */
		const onOut = (e) => {
			if (sheet || pinned || !openKey) return;
			if (!termOf(e) && !inPopover(e)) return;
			clearTimeout(openTimer);
			// Moving between the term and its own card is not leaving.
			const to = /** @type {Element | null} */ (e.relatedTarget);
			if (to?.closest?.('.gl-pop') || to?.closest?.('.gl-term')) return;
			closeTimer = setTimeout(close, 220);
		};

		/*
		 * Keyboard reaches the terms as buttons, and focus is what opens
		 * them there. Only keyboard focus, though: a pointer press also
		 * focuses, and if that opened the card too, the click that
		 * follows would read as a second press and close it again —
		 * which is every tap on a touch screen doing nothing at all.
		 * `:focus-visible` is exactly the browser's own answer to "did
		 * this focus come from the keyboard?".
		 */
		const onFocusIn = (/** @type {FocusEvent} */ e) => {
			if (refocusing) return;
			const btn = termOf(e);
			if (!btn || anchor === btn) return;
			if (!btn.matches(':focus-visible')) return;
			open(btn, true);
		};

		const onKey = (/** @type {KeyboardEvent} */ e) => {
			if (e.key !== 'Escape') return;
			if (openKey) closeAndRefocus();
			else dismissHint();
		};

		const reposition = () => {
			if (openKey) measure();
			if (hintOpen) placeHint();
		};

		document.addEventListener('click', onClick);
		document.addEventListener('mouseover', onOver);
		document.addEventListener('mouseout', onOut);
		document.addEventListener('focusin', onFocusIn);
		document.addEventListener('keydown', onKey);
		window.addEventListener('scroll', reposition, { passive: true });
		window.addEventListener('resize', reposition);

		// The first pass runs once the route's content is painted; the
		// retry only matters for content that arrives a beat later (the
		// paradigm page renders its markdown after mount), and `scan` is a
		// no-op once anything is marked.
		requestAnimationFrame(scan);
		const retry = setTimeout(scan, 700);

		return () => {
			clearTimeout(retry);
			clearTimeout(openTimer);
			clearTimeout(closeTimer);
			mq.removeEventListener('change', onMq);
			document.removeEventListener('click', onClick);
			document.removeEventListener('mouseover', onOver);
			document.removeEventListener('mouseout', onOut);
			document.removeEventListener('focusin', onFocusIn);
			document.removeEventListener('keydown', onKey);
			window.removeEventListener('scroll', reposition);
			window.removeEventListener('resize', reposition);
			clear();
		};
	});

	/*
	 * A locale switch replaces every string on the page. Unmark first —
	 * synchronously, while this subscriber is still running inside
	 * `locale.set()` and before Svelte's flush — so no Svelte-owned text
	 * node is left split, then re-scan against the new dictionary.
	 */
	let bootstrapped = false;
	$: onLocaleChange($locale);

	/** @param {string} code */
	function onLocaleChange(code) {
		// The first run is the initial subscription, before onMount's own
		// first scan: there is nothing marked to replace yet.
		if (!bootstrapped) {
			bootstrapped = true;
			return;
		}
		clear();
		tick().then(scan);
	}

	// Every navigation renders new copy into this same layout.
	afterNavigate(() => {
		clear();
		tick().then(() => requestAnimationFrame(scan));
	});
</script>

{#if openKey && def}
	{#if sheet}
		<!-- The backdrop is a second way out for pointers; Escape and the
		     sheet's own Close button are the keyboard ones, so it needs no
		     key handler of its own. -->
		<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
		<div class="gl-backdrop" on:click={close}></div>
	{/if}
	<!-- The sheet is a dialog and takes focus (tabindex -1, never in the
	     tab order); the floating card is a tooltip and takes none. The
	     compiler can't see that from the ternaries. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		id="gl-pop"
		class="gl-pop"
		class:sheet
		bind:this={popEl}
		role={sheet ? 'dialog' : 'tooltip'}
		aria-modal={sheet ? 'true' : undefined}
		aria-label={sheet ? def.term : undefined}
		tabindex={sheet ? -1 : undefined}
		style={sheet ? '' : `top:${pos.top}px; inset-inline-start:${pos.left}px;`}
	>
		<p class="gl-name">{def.term}</p>
		<p class="gl-body">{def.body}</p>
		{#if def.analogy}
			<p class="gl-analogy">{def.analogy}</p>
		{/if}
		<button class="gl-close" type="button" on:click={closeAndRefocus}>
			{tr('glossary.close')}
		</button>
	</div>
{/if}

{#if hintOpen}
	<div class="gl-hint" style={`top:${hintPos.top}px; inset-inline-start:${hintPos.left}px;`}>
		<p>{tr('glossary.hint')}</p>
		<button type="button" on:click={dismissHint}>{tr('glossary.hintDismiss')}</button>
	</div>
{/if}

<style>
	/*
	 * The marked term. Global, because these buttons are injected into
	 * the page rather than rendered by this component.
	 *
	 * It has to read as the same word it always was, only offered: the
	 * type is inherited wholesale (weight included — many terms sit
	 * inside a <strong>), and the only addition is a dotted underline in
	 * the accessible accent.
	 */
	:global(.gl-term) {
		all: unset;
		cursor: help;
		text-decoration-line: underline;
		text-decoration-style: dotted;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.22em;
		text-decoration-color: rgba(var(--accent-text-rgb), 0.5);
		transition: color 0.18s ease, text-decoration-color 0.18s ease;
	}

	:global(.gl-term:hover),
	:global(.gl-term[aria-expanded='true']) {
		color: var(--accent-text);
		text-decoration-color: var(--accent-text);
	}

	:global(.gl-term:focus-visible) {
		outline: 2px solid var(--accent-text);
		outline-offset: 2px;
		border-radius: 3px;
	}

	.gl-pop,
	.gl-hint {
		position: fixed;
		z-index: 90;
		box-sizing: border-box;
		background: var(--surface-raised);
		border: 1px solid var(--border-strong);
		border-radius: 12px;
		box-shadow: var(--shadow-lg);
		color: var(--on-surface);
		text-align: start;
	}

	.gl-pop {
		width: 320px;
		max-width: calc(100vw - 24px);
		padding: 16px 18px 14px;
		animation: gl-in 0.18s ease-out;
	}

	.gl-name {
		margin: 0 0 6px;
		font-family: var(--font-heading);
		font-size: 1.02rem;
		font-weight: 700;
		line-height: 1.3;
		color: var(--accent-text);
	}

	.gl-body {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--on-surface);
	}

	/*
	 * The analogy is the half that actually lands for a non-technical
	 * reader, so it is set apart rather than buried in the definition.
	 */
	.gl-analogy {
		margin: 10px 0 0;
		padding-inline-start: 10px;
		border-inline-start: 2px solid var(--accent);
		font-size: 0.86rem;
		line-height: 1.55;
		font-style: italic;
		color: var(--on-surface-muted);
	}

	/* Pointer users dismiss by moving away, clicking out or pressing Esc. */
	.gl-close {
		display: none;
	}

	/* ---------- Touch / narrow screens: a bottom sheet ---------- */
	.gl-pop.sheet {
		width: 100%;
		max-width: none;
		inset: auto 0 0 0;
		border-radius: 16px 16px 0 0;
		border-inline: 0;
		border-bottom: 0;
		padding: 20px 22px calc(18px + env(safe-area-inset-bottom, 0px));
		animation: gl-up 0.22s ease-out;
	}

	.gl-pop.sheet .gl-name {
		font-size: 1.12rem;
	}

	.gl-pop.sheet .gl-body {
		font-size: 0.98rem;
	}

	.gl-pop.sheet .gl-analogy {
		font-size: 0.92rem;
	}

	.gl-pop.sheet .gl-close {
		display: block;
		width: 100%;
		margin: 16px 0 0;
		padding: 11px;
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: var(--on-surface-muted);
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 9px;
		cursor: pointer;
	}

	.gl-backdrop {
		position: fixed;
		inset: 0;
		z-index: 89;
		background: rgba(var(--surface-deep-rgb), 0.5);
		animation: gl-fade 0.22s ease-out;
	}

	/* ---------- First-run hint ---------- */
	.gl-hint {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		width: 280px; /* keep in step with HINT_W */
		max-width: calc(100vw - 24px);
		padding: 12px 14px;
		border-color: var(--accent);
		animation: gl-in 0.3s ease-out;
	}

	.gl-hint p {
		margin: 0;
		font-size: 0.84rem;
		line-height: 1.5;
		color: var(--on-surface-muted);
	}

	.gl-hint button {
		padding: 0;
		font-family: var(--font-body);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--accent-text);
		background: transparent;
		border: 0;
		cursor: pointer;
	}

	@keyframes gl-in {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
	}

	@keyframes gl-up {
		from {
			transform: translateY(100%);
		}
	}

	@keyframes gl-fade {
		from {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.gl-pop,
		.gl-hint,
		.gl-backdrop {
			animation: none;
		}
		:global(.gl-term) {
			transition: none;
		}
	}
</style>
