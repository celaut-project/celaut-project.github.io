<script>
	/*
	 * /install — the three ways to get a node running.
	 *
	 * Commands, URLs and OS detection stay here; every word comes from
	 * the `install` namespace of the dictionaries. The two notes that
	 * embed a link use a `{link}` placeholder so the surrounding
	 * sentence can be reordered freely in translation.
	 */
	import { onMount } from 'svelte';
	import SiteTopbar from '$lib/components/immersive/SiteTopbar.svelte';
	import { t } from '$lib/i18n/index.js';

	const LINUX_CMD =
		"curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/celaut-project/nodo/stable/install.sh | sudo bash";
	const WINDOWS_EXE =
		'https://github.com/celaut-project/nodo/releases/latest/download/Nodo-Setup.exe';
	const MANUAL_GUIDE = 'https://github.com/celaut-project/nodo/blob/master/docs/INSTALL.md';
	const NODO_REPO = 'https://github.com/celaut-project/nodo';

	let os = 'linux';
	let copied = false;

	/**
	 * Splice an anchor into a translated sentence at its {link} slot.
	 * Keeps the link text translatable and lets the clause sit wherever
	 * the target language wants it.
	 */
	function withLink(
		/** @type {string} */ text,
		/** @type {string} */ href,
		/** @type {string} */ label
	) {
		const anchor = `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
		return text.replace('{link}', anchor);
	}

	onMount(() => {
		const p = (navigator.userAgent + ' ' + (navigator.platform || '')).toLowerCase();
		if (p.includes('win')) os = 'windows';
		else if (p.includes('mac')) os = 'mac';
		else os = 'linux';
	});

	async function copyCmd() {
		try {
			await navigator.clipboard.writeText(LINUX_CMD);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (e) {
			copied = false;
		}
	}
</script>

<svelte:head>
	<title>{$t('install.meta.title')}</title>
	<meta name="description" content={$t('install.meta.description')} />
</svelte:head>

<SiteTopbar title={$t('install.topbarTitle')} position="sticky" />

<main>
	<section>
		<h1>{$t('install.heading')}</h1>
		<p class="subtitle">{@html $t('install.subtitle')}</p>

		<div class="tabs" role="tablist">
			<button class="tab" class:active={os === 'linux'} on:click={() => (os = 'linux')}
				>{$t('install.tabs.linux')}</button
			>
			<button class="tab" class:active={os === 'windows'} on:click={() => (os = 'windows')}
				>{$t('install.tabs.windows')}</button
			>
			<button class="tab" class:active={os === 'mac'} on:click={() => (os = 'mac')}
				>{$t('install.tabs.mac')}</button
			>
		</div>

		<div class="panel">
			{#if os === 'linux'}
				<h2>{$t('install.linux.heading')}</h2>
				<p>{$t('install.linux.intro')}</p>
				<div class="code-block">
					<code>{LINUX_CMD}</code>
					<button class="copy" on:click={copyCmd}
						>{copied ? $t('install.copied') : $t('install.copy')}</button
					>
				</div>
				<ul class="notes">
					<li>{@html $t('install.linux.notes')[0]}</li>
					<li>
						{@html withLink(
							$t('install.linux.notes')[1],
							MANUAL_GUIDE,
							$t('install.linux.manualLink')
						)}
					</li>
				</ul>
			{:else if os === 'windows'}
				<h2>{$t('install.windows.heading')}</h2>
				<p>{$t('install.windows.intro')}</p>
				<a class="download" href={WINDOWS_EXE} target="_blank" rel="noopener noreferrer">
					{$t('install.windows.download')}
				</a>
				<ul class="notes">
					{#each $t('install.windows.notes') as note}
						<li>{@html note}</li>
					{/each}
				</ul>
			{:else}
				<h2>{$t('install.mac.heading')}</h2>
				<p class="unavailable">{@html $t('install.mac.intro')}</p>
				<ul class="notes">
					<li>{@html $t('install.mac.notes')[0]}</li>
					<li>
						{@html withLink($t('install.mac.notes')[1], NODO_REPO, $t('install.mac.repoLink'))}
					</li>
				</ul>
			{/if}
		</div>
	</section>
</main>

<style>
	main {
		min-height: 100vh;
		background-color: var(--surface);
		color: var(--on-surface);
		display: flex;
		justify-content: center;
		/* The topbar is sticky and in flow, so no top offset is needed. */
		padding: 56px 20px 80px;
	}

	section {
		width: 100%;
		max-width: 780px;
	}

	h1 {
		font-family: var(--font-heading);
		font-size: 2.8rem;
		margin: 0 0 16px 0;
		color: var(--heading);
	}

	.subtitle {
		font-size: 1.1rem;
		line-height: 1.7;
		color: var(--on-surface-muted);
		margin: 0 0 40px 0;
	}
	.subtitle :global(strong) {
		color: var(--on-surface);
	}

	.tabs {
		display: flex;
		gap: 8px;
		margin-bottom: 24px;
		border-bottom: 1px solid var(--border);
	}

	.tab {
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		color: var(--on-surface-subtle);
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: 700;
		padding: 12px 20px;
		cursor: pointer;
		transition: color 0.2s ease, border-color 0.2s ease;
	}
	.tab:hover {
		color: var(--on-surface);
	}
	.tab.active {
		color: var(--accent-text);
		border-bottom-color: var(--accent);
	}

	.panel {
		background: var(--surface-raised);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 40px;
		box-shadow: var(--shadow-sm);
	}

	.panel h2 {
		font-family: var(--font-heading);
		font-size: 1.8rem;
		margin: 0 0 16px 0;
		color: var(--on-surface);
	}

	.panel p {
		line-height: 1.7;
		color: var(--on-surface-muted);
		margin: 0 0 20px 0;
	}

	.code-block {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--surface-deep);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 16px 18px;
		margin-bottom: 20px;
		overflow-x: auto;
	}
	.code-block code {
		font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
		font-size: 0.9rem;
		color: var(--on-surface);
		white-space: nowrap;
		flex: 1;
	}
	.copy {
		flex-shrink: 0;
		background-color: var(--accent);
		color: var(--on-accent);
		border: none;
		border-radius: 8px;
		padding: 8px 16px;
		font-weight: 700;
		font-family: var(--font-body);
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
	.copy:hover {
		background-color: var(--accent-hover);
	}

	.download {
		display: inline-block;
		background-color: var(--accent);
		color: var(--on-accent);
		padding: 14px 28px;
		border-radius: 10px;
		text-decoration: none;
		font-weight: 700;
		margin-bottom: 20px;
		transition: background-color 0.2s ease;
	}
	.download:hover {
		background-color: var(--accent-hover);
	}

	.unavailable {
		font-size: 1.15rem;
	}
	.unavailable :global(strong) {
		color: var(--accent-text);
	}

	.notes {
		margin: 8px 0 0 0;
		padding-left: 20px;
	}
	.notes li {
		line-height: 1.7;
		color: var(--on-surface-muted);
		margin-bottom: 10px;
	}
	.notes :global(code) {
		font-family: 'SFMono-Regular', Consolas, monospace;
		font-size: 0.85rem;
		background: var(--surface-alt);
		border: 1px solid var(--border);
		padding: 2px 6px;
		border-radius: 4px;
	}
	.notes :global(a) {
		color: var(--accent-text);
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 2.1rem;
		}
		.panel {
			padding: 28px 20px;
		}
	}
</style>