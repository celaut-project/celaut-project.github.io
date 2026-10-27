<script>
	/*
	 * /install — the ways to get a node running.
	 *
	 * Commands, URLs and OS detection stay here; every word comes from
	 * the `install` namespace of the dictionaries. The notes that embed a
	 * link use a `{link}` placeholder so the surrounding sentence can be
	 * reordered freely in translation.
	 *
	 * Linux has three install modes, which differ only in the user that
	 * runs the daemon. Every command below exists in nodo's install.sh /
	 * nodo.py on the `stable` branch, which is the branch the one-liner
	 * fetches; keep them in step with nodo's README ("Installation").
	 */
	import { onMount } from 'svelte';
	import SiteTopbar from '$lib/components/immersive/SiteTopbar.svelte';
	import { t } from '$lib/i18n/index.js';

	const INSTALL_SH = 'https://raw.githubusercontent.com/celaut-project/nodo/stable/install.sh';
	const CURL = `curl --proto '=https' --tlsv1.2 -sSf ${INSTALL_SH}`;
	const WINDOWS_EXE =
		'https://github.com/celaut-project/nodo/releases/download/wsl-exe/Nodo-Setup.exe';
	const MANUAL_GUIDE = 'https://github.com/celaut-project/nodo/blob/stable/docs/INSTALL.md';
	const ROOTLESS_DOC = 'https://github.com/celaut-project/nodo/blob/stable/docs/ROOTLESS.md';
	const NODO_REPO = 'https://github.com/celaut-project/nodo';

	/*
	 * In the order of nodo's README. `key` names the dictionary entry
	 * (install.linux.modes.<key>), `id` the in-page anchor. The node
	 * installed without sudo can run `nodo doctor`/`update`/`uninstall`
	 * as its own user (nodo.py, src/commands/doctor.py); the other two
	 * need sudo for them.
	 */
	const LINUX_MODES = [
		{
			key: 'serviceUser',
			id: 'service-user',
			recommended: true,
			path: '/nodo',
			cmd: `${CURL} | sudo bash -s -- --service-user nodo`,
			check: ['nodo status', 'sudo nodo doctor'],
			update: 'sudo nodo update',
			uninstall: 'sudo nodo uninstall'
		},
		{
			key: 'withoutSudo',
			id: 'without-sudo',
			recommended: false,
			path: '~/.local/share/nodo',
			cmd: `${CURL} | bash`,
			check: ['nodo status', 'nodo doctor'],
			update: 'nodo update',
			uninstall: 'nodo uninstall'
		},
		{
			key: 'root',
			id: 'root',
			recommended: false,
			path: '/nodo',
			cmd: `${CURL} | sudo bash`,
			check: ['nodo status', 'sudo nodo doctor'],
			update: 'sudo nodo update',
			uninstall: 'sudo nodo uninstall'
		}
	];

	let os = 'linux';
	/** The id of the mode whose command was just copied, or ''. */
	let copied = '';

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

	async function copyCmd(/** @type {string} */ id, /** @type {string} */ cmd) {
		try {
			await navigator.clipboard.writeText(cmd);
			copied = id;
			setTimeout(() => {
				if (copied === id) copied = '';
			}, 2000);
		} catch (e) {
			copied = '';
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
				<p>{@html $t('install.linux.lead')}</p>

				<h3>{$t('install.linux.chooseHeading')}</h3>
				<p>{@html $t('install.linux.recommend')}</p>
				<!-- A table on wide screens; under 800px each row becomes a card
				     and every cell carries its column name (data-label). -->
				<div class="modes-table">
					<table>
						<thead>
							<tr>
								<th scope="col">{$t('install.linux.table.mode')}</th>
								<th scope="col">{$t('install.linux.table.sudo')}</th>
								<th scope="col">{$t('install.linux.table.runsAs')}</th>
								<th scope="col">{$t('install.linux.table.path')}</th>
								<th scope="col">{$t('install.linux.table.reach')}</th>
								<th scope="col">{$t('install.linux.table.restart')}</th>
								<th scope="col">{$t('install.linux.table.bestFor')}</th>
							</tr>
						</thead>
						<tbody>
							{#each LINUX_MODES as mode}
								<tr class:recommended={mode.recommended}>
									<th scope="row">
										<a href="#{mode.id}">{$t(`install.linux.modes.${mode.key}.name`)}</a>
										{#if mode.recommended}
											<span class="badge">{$t('install.linux.recommended')}</span>
										{/if}
									</th>
									<td data-label={$t('install.linux.table.sudo')}
										>{$t(`install.linux.modes.${mode.key}.sudo`)}</td
									>
									<td data-label={$t('install.linux.table.runsAs')}
										>{@html $t(`install.linux.modes.${mode.key}.runsAs`)}</td
									>
									<td data-label={$t('install.linux.table.path')}><code>{mode.path}</code></td>
									<td data-label={$t('install.linux.table.reach')}
										>{$t(`install.linux.modes.${mode.key}.reach`)}</td
									>
									<td data-label={$t('install.linux.table.restart')}
										>{$t(`install.linux.modes.${mode.key}.restart`)}</td
									>
									<td data-label={$t('install.linux.table.bestFor')}
										>{$t(`install.linux.modes.${mode.key}.bestFor`)}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				{#each LINUX_MODES as mode}
					<div class="mode" id={mode.id}>
						<h3>
							{$t(`install.linux.modes.${mode.key}.name`)}
							{#if mode.recommended}
								<span class="badge">{$t('install.linux.recommended')}</span>
							{/if}
						</h3>
						<p>{$t(`install.linux.modes.${mode.key}.intro`)}</p>
						<!-- The command scrolls inside its own box; the button sits
						     outside that box and is therefore always on screen. See the
						     note on .code-block in the stylesheet. -->
						<div class="code-block">
							<div class="code-scroll"><code>{mode.cmd}</code></div>
							<button class="copy" on:click={() => copyCmd(mode.id, mode.cmd)}
								>{copied === mode.id ? $t('install.copied') : $t('install.copy')}</button
							>
						</div>
						<ul class="notes">
							{#each $t(`install.linux.modes.${mode.key}.notes`) as note}
								<li>{@html note}</li>
							{/each}
						</ul>
						<dl class="ops">
							<dt>{$t('install.linux.check')}</dt>
							<dd>
								{#each mode.check as c}<code>{c}</code>{/each}
							</dd>
							<dt>{$t('install.linux.update')}</dt>
							<dd><code>{mode.update}</code></dd>
							<dt>{$t('install.linux.uninstall')}</dt>
							<dd><code>{mode.uninstall}</code></dd>
						</dl>
					</div>
				{/each}

				<h3>{$t('install.linux.commonHeading')}</h3>
				<ul class="notes">
					{#each $t('install.linux.common') as note}
						<li>{@html note}</li>
					{/each}
					<li>
						{@html withLink(
							$t('install.linux.rootlessNote'),
							ROOTLESS_DOC,
							$t('install.linux.rootlessLink')
						)}
					</li>
					<li>
						{@html withLink($t('install.linux.manualNote'), MANUAL_GUIDE, $t('install.linux.manualLink'))}
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

	/*
	 * The install command is one long unbreakable line, and the button
	 * that copies it is the only thing on this page a visitor actually
	 * has to press.
	 *
	 * Those two facts used to fight: the whole row scrolled, so on any
	 * viewport narrower than the command (which is every phone, and most
	 * laptops at this max-width) the button sat past the right edge of
	 * the box and had to be scrolled to horizontally. A copy button you
	 * have to find is a copy button that does not exist.
	 *
	 * So the overflow is moved one level in. `.code-scroll` is the only
	 * thing that scrolls; the row itself never does, and the button is a
	 * sibling of the scroller rather than its neighbour inside it. It
	 * cannot leave the viewport, whatever the command's length or the
	 * translation of "Copy".
	 *
	 * `min-width: 0` on the scroller is load-bearing: a flex item's
	 * default `min-width: auto` is its CONTENT's width, so without it the
	 * nowrap line would refuse to shrink and push the row wide again —
	 * reinstating exactly the bug this replaced.
	 */
	.code-block {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--surface-deep);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 16px 18px;
		margin-bottom: 20px;
	}
	.code-scroll {
		flex: 1;
		min-width: 0;
		overflow-x: auto;
		/* Keep the scrollbar off the text on platforms that show one. */
		padding-bottom: 2px;
		scrollbar-width: thin;
	}
	.code-block code {
		font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
		font-size: 0.9rem;
		color: var(--on-surface);
		white-space: nowrap;
		display: block;
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
		/* Keep a flag such as --service-user in one piece. */
		white-space: nowrap;
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

	.panel h3 {
		font-family: var(--font-heading);
		font-size: 1.3rem;
		margin: 36px 0 12px 0;
		color: var(--on-surface);
	}
	.panel p :global(code),
	.modes-table :global(code) {
		font-family: 'SFMono-Regular', Consolas, monospace;
		font-size: 0.85em;
		background: var(--surface-alt);
		border: 1px solid var(--border);
		padding: 1px 5px;
		border-radius: 4px;
	}
	.panel p :global(strong) {
		color: var(--on-surface);
	}
	/* Commands and paths read left to right on a right-to-left page too:
	   without this, Arabic shows /var/lib/nodo as var/lib/nodo/ and the
	   command box opens scrolled to its end. */
	.panel :global(code),
	.code-scroll {
		direction: ltr;
		unicode-bidi: isolate;
	}

	/*
	 * The mode chooser. Seven columns do not fit a phone, and a table
	 * that scrolls sideways hides the column the reader came for, so
	 * under 800px each row becomes a card: the mode name on top, then
	 * one "column name: value" line per cell (the name comes from the
	 * cell's data-label). Between 800px and the panel's full width the
	 * wrapper scrolls, as a fallback for long translations.
	 */
	.modes-table {
		overflow-x: auto;
		margin: 0 0 8px 0;
		border: 1px solid var(--border);
		border-radius: 10px;
	}
	.modes-table table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.85rem;
		line-height: 1.45;
	}
	/* A path read across three lines is not a path any more. */
	.modes-table td code {
		white-space: nowrap;
	}
	.modes-table th,
	.modes-table td {
		text-align: left;
		vertical-align: top;
		padding: 10px 8px;
		border-bottom: 1px solid var(--border);
		color: var(--on-surface-muted);
	}
	.modes-table thead th {
		background: var(--surface-deep);
		color: var(--on-surface);
		font-weight: 700;
		font-size: 0.8rem;
	}
	.modes-table tbody tr:last-child th,
	.modes-table tbody tr:last-child td {
		border-bottom: none;
	}
	.modes-table tbody th {
		font-weight: 700;
	}
	.modes-table tbody th a {
		color: var(--accent-text);
		text-decoration: underline;
	}
	.modes-table tr.recommended {
		background: var(--surface-alt);
	}
	.badge {
		display: inline-block;
		margin-left: 6px;
		padding: 1px 8px;
		border-radius: 999px;
		background: var(--accent);
		color: var(--on-accent);
		font-family: var(--font-body);
		font-size: 0.7rem;
		font-weight: 700;
		vertical-align: middle;
		white-space: nowrap;
	}
	.modes-table .badge {
		margin: 4px 0 0 0;
	}

	.mode {
		/* The sticky topbar would otherwise cover the heading after a
		   jump from the table. */
		scroll-margin-top: 80px;
	}

	.ops {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: 6px 14px;
		margin: 12px 0 0 0;
		font-size: 0.92rem;
	}
	.ops dt {
		font-weight: 700;
		color: var(--on-surface);
	}
	.ops dd {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.ops code {
		font-family: 'SFMono-Regular', Consolas, monospace;
		font-size: 0.85rem;
		background: var(--surface-deep);
		border: 1px solid var(--border);
		padding: 2px 6px;
		border-radius: 4px;
		color: var(--on-surface);
	}

	@media (max-width: 800px) {
		.modes-table {
			overflow-x: visible;
			border: none;
		}
		.modes-table thead {
			/* Visually hidden, still read by screen readers. */
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip: rect(0 0 0 0);
			white-space: nowrap;
		}
		.modes-table table,
		.modes-table tbody,
		.modes-table tr,
		.modes-table th,
		.modes-table td {
			display: block;
			width: auto;
		}
		.modes-table tr {
			border: 1px solid var(--border);
			border-radius: 10px;
			margin-bottom: 12px;
			overflow: hidden;
		}
		.modes-table tbody th {
			background: var(--surface-deep);
			font-size: 1rem;
		}
		.modes-table .badge {
			margin: 0 0 0 8px;
		}
		.modes-table td {
			padding: 8px 12px;
		}
		.modes-table td::before {
			content: attr(data-label);
			display: block;
			font-size: 0.75rem;
			font-weight: 700;
			color: var(--on-surface-subtle);
		}
		.modes-table tbody tr:last-child th {
			border-bottom: 1px solid var(--border);
		}
		.modes-table tbody tr td:last-child {
			border-bottom: none;
		}
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 2.1rem;
		}
		.panel {
			padding: 28px 20px;
		}
		/* At phone widths the button would eat most of the row, leaving a
		   peephole of command. Give it back some room without letting the
		   button shrink out of reach. */
		.code-block {
			padding: 12px 12px;
			gap: 8px;
		}
		.code-block code {
			font-size: 0.8rem;
		}
		.copy {
			padding: 8px 12px;
			font-size: 0.9rem;
		}
	}
</style>