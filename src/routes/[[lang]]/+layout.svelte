<script>
	import '../../app.css';
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { theme, applyTheme } from '$lib/theme.js';
	import { locale, applyLocale, commitLocale, detectLocale, setLocale } from '$lib/i18n/index.js';
	import { hardResetScroll, killAllScrollTriggers } from '$lib/motion.js';
	import AmbientBackground from '$lib/components/AmbientBackground.svelte';
	import FloatingControls from '$lib/components/FloatingControls.svelte';

	/** @type {import('./$types').LayoutData} */
	export let data;

	/*
	 * `data.lang` comes from +layout.ts's load(), which already awaited
	 * this locale's dictionary — so it's safe to switch synchronously.
	 *
	 * A prefixed route (/es/…) is authoritative: whatever the visitor
	 * had saved before, the URL they followed wins for this page. An
	 * unprefixed route has no locale of its own to be authoritative
	 * about, so it falls back to the existing client-side bootstrap
	 * (saved choice, else browser languages, else English) — unchanged
	 * from before locale-prefixed routes existed.
	 */
	if (data.isPrefixed) {
		commitLocale(data.lang);
	} else if (browser) {
		const initial = detectLocale();
		if (initial !== data.lang) setLocale(initial);
	}

	// Keep <html data-theme> and <html lang>/<html dir> in sync with
	// their stores across every route.
	$: applyTheme($theme);
	$: applyLocale($locale);

	// A regular link/goto navigation (home -> /depin, a locale switch,
	// etc.) should always land at the top of the destination, and its
	// GSAP pins must be measured against ITS OWN layout, not whatever
	// was still true a moment ago on the previous page. Back/forward
	// (`popstate`) is left alone so the browser's own scroll restoration
	// keeps working.
	beforeNavigate((nav) => {
		if (nav.type !== 'popstate') killAllScrollTriggers();
	});
	afterNavigate((nav) => {
		if (nav.type !== 'popstate') hardResetScroll();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@500;700;800&family=Noto+Naskh+Arabic:wght@500;700;800&family=Noto+Sans+Arabic:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<AmbientBackground />
<FloatingControls />

<slot />
