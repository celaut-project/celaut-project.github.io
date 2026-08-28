<script lang="ts">
	/*
	 * /paradigm — the three paradigm documents rendered as one page.
	 *
	 * Each locale has its own copy of the markdown under
	 * $lib/paradigm/<locale>/. `+page.ts`'s `load()` already resolved
	 * `data.docs` to the right language's raw text — lazily, via a
	 * dynamic import per locale, so this route's bundle doesn't carry
	 * all ten languages' documents (that was ~450 kB on its own before).
	 * Everything downstream here — combining, rendering, heading ids,
	 * the index — is derived from `data.docs`, so a client-side
	 * navigation to a different `/xx/paradigm` re-renders the whole
	 * document with matching anchors once its own `load()` resolves.
	 */
	import { marked } from 'marked';
	import SiteTopbar from '$lib/components/immersive/SiteTopbar.svelte';
	import { t } from '$lib/i18n/index.js';

	/** @type {import('./$types').PageData} */
	export let data;
	$: docs = data.docs;

	// --- Slugify (shared by heading ids, the TOC and the cross-doc links,
	//     so every anchor lines up in both languages) --------------------
	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/<[^>]+>/g, '')
			.replace(/&[#\w]+;/g, '')
			// Strip diacritics so Spanish headings still produce clean,
			// linkable ascii slugs ("ejecución" → "ejecucion").
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			// Unicode-aware "word character": keeps CJK ideographs and
			// Devanagari text (which \w, being ASCII-only, would otherwise
			// strip entirely and collapse every heading down to the same
			// "section" fallback) alongside plain Latin letters and digits.
			// \p{M} matters specifically for Devanagari: vowel signs like
			// े/ा are combining Marks rather than Letters, so without it
			// "सेवा" degrades to the unreadable, meaning-different "सव".
			.replace(/[^\p{L}\p{M}\p{N}\s-]/gu, '')
			.trim()
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');
	}

	// --- Preprocess markdown BEFORE rendering -------------------------------
	function preprocess(md: string, anchors: Record<string, string>): string {
		return (
			md
				// Ported image assets now live under /paradigm_assets/
				.replaceAll('](assets/', '](/paradigm_assets/')
				// Internal cross-doc links -> in-page anchors. The targets are
				// derived from the translated headings, so they hold in any
				// language.
				.replaceAll('README.md#system-behavior', `#${anchors.systemBehavior}`)
				.replaceAll('README.md#', '#')
				.replaceAll('](execution_of_a_service.md)', `](#${anchors.execution})`)
				.replaceAll('](service_balancer.md)', `](#${anchors.balancer})`)
				// The empty "Node handshake" link -> plain text (no broken link)
				.replaceAll('[Node handshake]()', 'Node handshake')
				// Fix URLs that markdown italics mangled (*Celaut* emphasis inside links)
				.replaceAll('*Celaut*-project', 'celaut-project')
				.replaceAll('*Celaut*.proto', 'celaut.proto')
		);
	}

	// --- Render + post-process HTML -----------------------------------------
	function render(md: string, anchors: Record<string, string>): string {
		let html = marked.parse(preprocess(md, anchors), { async: false }) as string;

		// Give every heading a stable, unique id for anchor navigation.
		const seen = new Set<string>();
		html = html.replace(
			/<h([1-4])([^>]*)>([\s\S]*?)<\/h\1>/g,
			(_m: string, level: string, attrs: string, inner: string) => {
				let slug = slugify(inner) || 'section';
				let unique = slug;
				let i = 1;
				while (seen.has(unique)) unique = `${slug}-${i++}`;
				seen.add(unique);
				return `<h${level} id="${unique}"${attrs}>${inner}</h${level}>`;
			}
		);

		// External links open in a new tab.
		html = html.replace(
			/<a href="(https?:\/\/[^"]+)"/g,
			'<a href="$1" target="_blank" rel="noopener noreferrer"'
		);

		return html;
	}

	// --- Build the "Index" TOC from the h2 headings -------------------------
	function buildToc(md: string): { text: string; slug: string }[] {
		const toc: { text: string; slug: string }[] = [];
		const headingRe = /^##[ \t]+(.+?)\s*$/gm;
		let match: RegExpExecArray | null;
		while ((match = headingRe.exec(md)) !== null) {
			const text = match[1].trim();
			toc.push({ text, slug: slugify(text) });
		}
		return toc;
	}

	// Prefer the slug of the heading that actually appears in the loaded
	// README. New locales fall back to the English documents, whose h2 is
	// "System behavior" — using the i18n label ("Systemverhalten") here
	// rewrote README.md#system-behavior to a fragment that doesn't exist.
	function systemBehaviorSlug(readme: string, fallback: string): string {
		const headingRe = /^##[ \t]+(.+?)\s*$/gm;
		const fallbackSlug = slugify(fallback);
		let match;
		while ((match = headingRe.exec(readme)) !== null) {
			const slug = slugify(match[1].trim());
			if (slug === 'system-behavior' || slug === fallbackSlug) return slug;
		}
		return fallbackSlug;
	}

	// The README references the two sub-docs under its "System behavior"
	// section; they are appended here as their own anchored sections so the
	// whole paradigm repo lives on this single page.
	$: executionHeading = $t('paradigm.executionHeading');
	$: balancerHeading = $t('paradigm.balancerHeading');
	$: anchors = {
		systemBehavior: systemBehaviorSlug(docs.readme, $t('paradigm.systemBehaviorHeading')),
		execution: slugify(executionHeading),
		balancer: slugify(balancerHeading)
	};
	$: combinedRaw =
		docs.readme +
		`\n\n## ${executionHeading}\n\n` +
		docs.execution +
		`\n\n## ${balancerHeading}\n\n` +
		docs.balancer;
	$: html = render(combinedRaw, anchors);
	$: toc = buildToc(combinedRaw);
</script>

<svelte:head>
	<title>{$t('paradigm.meta.title')}</title>
	<meta name="description" content={$t('paradigm.meta.description')} />
</svelte:head>

<div id="top" class="paradigm-page">
	<SiteTopbar title={$t('paradigm.topbarTitle')} position="sticky" />

	<main class="prose">
		<nav class="toc" aria-label={$t('paradigm.tocNav')}>
			<h2 class="toc-title">{$t('paradigm.toc')}</h2>
			<ul>
				{#each toc as item}
					<li><a href={`#${item.slug}`}>{item.text}</a></li>
				{/each}
			</ul>
		</nav>

		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</main>

	<a class="to-top" href="#top" aria-label={$t('common.backToTop')}>{$t('common.toTop')}</a>
</div>

<style>
	.paradigm-page {
		background-color: var(--surface);
		color: var(--on-surface);
		min-height: 100vh;
		font-family: var(--font-body, 'Lato', sans-serif);
	}


	.prose {
		max-width: 820px;
		margin: 0 auto;
		padding: 48px 24px 96px;
		line-height: 1.7;
	}

	/* Table of contents box */
	.toc {
		background-color: var(--surface-raised);
		border: 1px solid var(--border);
		border-left: 4px solid var(--accent);
		border-radius: 10px;
		padding: 20px 28px;
		margin-bottom: 48px;
		box-shadow: var(--shadow-sm);
	}

	.toc-title {
		margin: 0 0 12px;
		font-family: var(--font-heading, 'Playfair Display', serif);
		color: var(--on-surface);
		font-size: 1.3rem;
	}

	.toc ul {
		margin: 0;
		padding-left: 20px;
	}

	.toc li {
		margin: 6px 0;
	}

	.toc a {
		color: var(--accent-text);
		text-decoration: none;
	}

	.toc a:hover {
		text-decoration: underline;
	}

	/* Rendered markdown content */
	.prose :global(h1),
	.prose :global(h2),
	.prose :global(h3),
	.prose :global(h4) {
		font-family: var(--font-heading, 'Playfair Display', serif);
		color: var(--on-surface);
		line-height: 1.25;
		scroll-margin-top: 80px;
	}

	.prose :global(h1) {
		font-size: 2.1rem;
		margin: 0 0 24px;
	}

	.prose :global(h2) {
		font-size: 1.6rem;
		margin: 48px 0 16px;
		padding-bottom: 8px;
		border-bottom: 2px solid var(--accent);
	}

	.prose :global(h3) {
		font-size: 1.25rem;
		margin: 32px 0 12px;
		color: var(--accent-text);
	}

	.prose :global(h4) {
		font-size: 1.05rem;
		margin: 24px 0 8px;
	}

	.prose :global(p) {
		margin: 0 0 18px;
	}

	.prose :global(a) {
		color: var(--accent-text);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.prose :global(a:hover) {
		color: var(--on-surface);
	}

	.prose :global(ul),
	.prose :global(ol) {
		padding-left: 26px;
		margin: 0 0 18px;
	}

	.prose :global(li) {
		margin: 6px 0;
	}

	.prose :global(blockquote) {
		margin: 20px 0;
		padding: 8px 20px;
		border-left: 4px solid var(--accent);
		background-color: var(--accent-soft);
		border-radius: 0 8px 8px 0;
		color: var(--on-surface-muted);
	}

	.prose :global(blockquote p) {
		margin: 8px 0;
	}

	.prose :global(code) {
		background-color: var(--surface-alt);
		border: 1px solid var(--border);
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 0.9em;
	}

	.prose :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 40px 0;
	}

	.prose :global(img) {
		display: block;
		max-width: 100%;
		height: auto;
		margin: 24px auto;
		/* Diagrams are dark-ink-on-transparent, so they need a light backing in
		   BOTH themes. Tokenised as --diagram-backdrop (deliberately constant
		   across themes) rather than left as a bare hex. */
		background-color: var(--diagram-backdrop);
		border-radius: 10px;
		padding: 12px;
		box-shadow: var(--shadow-sm);
	}

	.prose :global(strong) {
		color: var(--on-surface);
	}

	/* Floating back-to-top button */
	.to-top {
		position: fixed;
		right: 24px;
		bottom: 24px;
		background-color: var(--accent);
		color: var(--on-accent);
		padding: 10px 16px;
		border-radius: 999px;
		font-weight: 700;
		text-decoration: none;
		box-shadow: var(--shadow-md);
		z-index: 20;
		transition: background-color 0.2s ease, transform 0.2s ease;
	}

	.to-top:hover {
		background-color: var(--accent-hover);
		transform: translateY(-2px);
	}

</style>
