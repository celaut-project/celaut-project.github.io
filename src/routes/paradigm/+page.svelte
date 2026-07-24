<script lang="ts">
	import { marked } from 'marked';
	import readme from '$lib/paradigm/README.md?raw';
	import execution from '$lib/paradigm/execution_of_a_service.md?raw';
	import balancer from '$lib/paradigm/service_balancer.md?raw';

	// --- Combine the three docs into one document ---------------------------
	// The README references the two sub-docs under its "System behavior"
	// section; we append them here as their own anchored sections so the whole
	// paradigm repo lives on this single page.
	const combinedRaw =
		readme +
		'\n\n## Execution of a service\n\n' +
		execution +
		'\n\n## Service load balancing\n\n' +
		balancer;

	// --- Preprocess markdown BEFORE rendering -------------------------------
	function preprocess(md: string): string {
		return md
			// Ported image assets now live under /paradigm_assets/
			.replaceAll('](assets/', '](/paradigm_assets/')
			// Internal cross-doc links -> in-page anchors
			.replaceAll('README.md#', '#')
			.replaceAll('](execution_of_a_service.md)', '](#execution-of-a-service)')
			.replaceAll('](service_balancer.md)', '](#service-load-balancing)')
			// The empty "Node handshake" link -> plain text (no broken link)
			.replaceAll('[Node handshake]()', 'Node handshake')
			// Fix URLs that markdown italics mangled (*Celaut* emphasis inside links)
			.replaceAll('*Celaut*-project', 'celaut-project')
			.replaceAll('*Celaut*.proto', 'celaut.proto');
	}

	// --- Slugify (shared by heading ids and the TOC so anchors always align) -
	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/<[^>]+>/g, '')
			.replace(/&[#\w]+;/g, '')
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');
	}

	// --- Render + post-process HTML -----------------------------------------
	function render(md: string): string {
		let html = marked.parse(preprocess(md), { async: false }) as string;

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
		});

		// External links open in a new tab.
		html = html.replace(
			/<a href="(https?:\/\/[^"]+)"/g,
			'<a href="$1" target="_blank" rel="noopener noreferrer"'
		);

		return html;
	}

	const html = render(combinedRaw);

	// --- Build the "Index" TOC from the h2 headings -------------------------
	const toc: { text: string; slug: string }[] = [];
	const headingRe = /^##[ \t]+(.+?)\s*$/gm;
	let match: RegExpExecArray | null;
	while ((match = headingRe.exec(combinedRaw)) !== null) {
		const text = match[1].trim();
		toc.push({ text, slug: slugify(text) });
	}
</script>

<svelte:head>
	<title>Celaut — Formal Paper</title>
	<meta
		name="description"
		content="Celaut: a peer-to-peer architecture for software design and distribution — the formal paper."
	/>
</svelte:head>

<div id="top" class="paradigm-page">
	<header class="topbar">
		<a class="home-link" href="/">← Back to home</a>
		<span class="topbar-title">Celaut — Formal Paper</span>
	</header>

	<main class="prose">
		<nav class="toc" aria-label="Table of contents">
			<h2 class="toc-title">Index</h2>
			<ul>
				{#each toc as item}
					<li><a href={`#${item.slug}`}>{item.text}</a></li>
				{/each}
			</ul>
		</nav>

		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</main>

	<a class="to-top" href="#top" aria-label="Back to top">↑ Top</a>
</div>

<style>
	.paradigm-page {
		background-color: #f9eee7;
		color: #1d4241;
		min-height: 100vh;
		font-family: var(--font-body, 'Lato', sans-serif);
	}

	.topbar {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 16px 24px;
		background-color: #1d4241;
		color: #f9eee7;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.home-link {
		color: #f9eee7;
		text-decoration: none;
		font-weight: 700;
		white-space: nowrap;
	}

	.home-link:hover {
		color: #ef9c82;
	}

	.topbar-title {
		font-family: var(--font-heading, 'Playfair Display', serif);
		font-weight: 700;
		font-size: 1.1rem;
		color: #f9eee7;
	}

	.prose {
		max-width: 820px;
		margin: 0 auto;
		padding: 48px 24px 96px;
		line-height: 1.7;
	}

	/* Table of contents box */
	.toc {
		background-color: #fff;
		border: 1px solid rgba(29, 66, 65, 0.12);
		border-left: 4px solid #ef9c82;
		border-radius: 10px;
		padding: 20px 28px;
		margin-bottom: 48px;
		box-shadow: 0 6px 18px rgba(29, 66, 65, 0.06);
	}

	.toc-title {
		margin: 0 0 12px;
		font-family: var(--font-heading, 'Playfair Display', serif);
		color: #1d4241;
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
		color: #b5573c;
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
		color: #1d4241;
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
		border-bottom: 2px solid rgba(239, 156, 130, 0.4);
	}

	.prose :global(h3) {
		font-size: 1.25rem;
		margin: 32px 0 12px;
		color: #b5573c;
	}

	.prose :global(h4) {
		font-size: 1.05rem;
		margin: 24px 0 8px;
	}

	.prose :global(p) {
		margin: 0 0 18px;
	}

	.prose :global(a) {
		color: #b5573c;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.prose :global(a:hover) {
		color: #ef9c82;
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
		border-left: 4px solid #ef9c82;
		background-color: rgba(239, 156, 130, 0.1);
		border-radius: 0 8px 8px 0;
		color: #576c6b;
	}

	.prose :global(blockquote p) {
		margin: 8px 0;
	}

	.prose :global(code) {
		background-color: rgba(29, 66, 65, 0.08);
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 0.9em;
	}

	.prose :global(hr) {
		border: none;
		border-top: 1px solid rgba(29, 66, 65, 0.15);
		margin: 40px 0;
	}

	.prose :global(img) {
		display: block;
		max-width: 100%;
		height: auto;
		margin: 24px auto;
		background-color: #fff;
		border-radius: 10px;
		padding: 12px;
		box-shadow: 0 6px 18px rgba(29, 66, 65, 0.08);
	}

	.prose :global(strong) {
		color: #1d4241;
	}

	/* Floating back-to-top button */
	.to-top {
		position: fixed;
		right: 24px;
		bottom: 24px;
		background-color: #ef9c82;
		color: #1d4241;
		padding: 10px 16px;
		border-radius: 999px;
		font-weight: 700;
		text-decoration: none;
		box-shadow: 0 6px 16px rgba(29, 66, 65, 0.25);
		z-index: 20;
		transition: background-color 0.2s ease, transform 0.2s ease;
	}

	.to-top:hover {
		background-color: #e88a6f;
		transform: translateY(-2px);
	}

	@media (max-width: 600px) {
		.topbar-title {
			display: none;
		}
	}
</style>
