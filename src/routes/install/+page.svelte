<script>
	import { onMount } from 'svelte';

	const LINUX_CMD =
		"curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/celaut-project/nodo/stable/install.sh | sudo bash";
	const WINDOWS_EXE =
		'https://github.com/celaut-project/nodo/releases/latest/download/Nodo-Setup.exe';
	const MANUAL_GUIDE = 'https://github.com/celaut-project/nodo/blob/master/docs/INSTALL.md';

	let os = 'linux';
	let copied = false;

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
	<title>Install Nodo — Celaut</title>
	<meta name="description" content="Install a Celaut node (nodo) on Linux, Windows, or macOS." />
</svelte:head>

<main>
	<section>
		<a class="back" href="/">← Back to Celaut</a>

		<h1>Run a Celaut Node</h1>
		<p class="subtitle">
			Install <strong>nodo</strong> and join the decentralized network — discover peers, execute and
			orchestrate services, and turn your machine into shared, censorship-resistant compute.
		</p>

		<div class="tabs" role="tablist">
			<button class="tab" class:active={os === 'linux'} on:click={() => (os = 'linux')}>Linux</button>
			<button class="tab" class:active={os === 'windows'} on:click={() => (os = 'windows')}>Windows</button>
			<button class="tab" class:active={os === 'mac'} on:click={() => (os = 'mac')}>macOS</button>
		</div>

		<div class="panel">
			{#if os === 'linux'}
				<h2>Linux</h2>
				<p>Basic installation — run this in your terminal:</p>
				<div class="code-block">
					<code>{LINUX_CMD}</code>
					<button class="copy" on:click={copyCmd}>{copied ? 'Copied ✓' : 'Copy'}</button>
				</div>
				<ul class="notes">
					<li>The script needs <code>sudo</code> for system-level setup. Python, Java and <code>yq</code> runtimes are installed locally under the node's main directory.</li>
					<li>Prefer a manual, no-sudo install? Follow the <a href={MANUAL_GUIDE} target="_blank" rel="noopener noreferrer">manual guide</a>.</li>
				</ul>
			{:else if os === 'windows'}
				<h2>Windows 11</h2>
				<p>Download and run the official installer:</p>
				<a class="download" href={WINDOWS_EXE} target="_blank" rel="noopener noreferrer">
					Download Nodo-Setup.exe
				</a>
				<ul class="notes">
					<li>The installer automatically creates an isolated Linux distribution dedicated to Nodo, so the node runs separated from the rest of your system.</li>
					<li>No manual Linux environment setup is required.</li>
				</ul>
			{:else}
				<h2>macOS</h2>
				<p class="unavailable">A native macOS installer is <strong>not available yet</strong>.</p>
				<ul class="notes">
					<li>Support for macOS is planned. In the meantime, you can run a node on a Linux machine or a Linux VM.</li>
					<li>Follow <a href="https://github.com/celaut-project/nodo" target="_blank" rel="noopener noreferrer">the nodo repository</a> for updates.</li>
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
		padding: 100px 20px 80px;
	}

	section {
		width: 100%;
		max-width: 780px;
	}

	.back {
		display: inline-block;
		margin-bottom: 40px;
		color: var(--on-surface-muted);
		text-decoration: none;
		font-size: 0.95rem;
		transition: color 0.2s ease;
	}
	.back:hover {
		color: var(--accent-text);
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
	.subtitle strong {
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
	.unavailable strong {
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
	.notes code {
		font-family: 'SFMono-Regular', Consolas, monospace;
		font-size: 0.85rem;
		background: var(--surface-alt);
		border: 1px solid var(--border);
		padding: 2px 6px;
		border-radius: 4px;
	}
	.notes a {
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
