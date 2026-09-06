<script>
	/*
	 * The fixed top-right control cluster: language, theme, then the
	 * glossary switch.
	 *
	 * Both buttons used to be `position: fixed` on their own, which meant
	 * every surface that had to keep clear of them (SiteTopbar's nav)
	 * hard-coded a magic number. They now share one positioned parent and
	 * publish their width as --floating-controls-w, so the topbar reserves
	 * exactly the right gap and a third control would need no edits there.
	 *
	 * All three are reading preferences rather than navigation — what
	 * language, which theme, and whether unfamiliar terms are explained —
	 * which is why the glossary switch lives here and not in the topbar.
	 */
	import LanguageToggle from './LanguageToggle.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import GlossaryToggle from './glossary/GlossaryToggle.svelte';
</script>

<div class="floating-controls">
	<LanguageToggle />
	<ThemeToggle />
	<GlossaryToggle />
</div>

<style>
	.floating-controls {
		position: fixed;
		top: 18px;
		inset-inline-end: 18px;
		z-index: 60;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	@media (max-width: 560px) {
		.floating-controls {
			top: 12px;
			inset-inline-end: 12px;
			gap: 6px;
		}
	}
</style>
