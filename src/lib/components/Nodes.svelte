<script>
	/*
	 * Nodes: what they do, and the two implementations that exist.
	 * Styling comes from the shared `.ground` layer in src/app.css; the
	 * words come from `home.nodes` in the dictionaries.
	 *
	 * Icons and repository URLs are structure, so they stay here and are
	 * paired by index with the translated job / implementation lists.
	 */
	import { t } from '$lib/i18n/index.js';
	import Cpu from '$lib/assets/icons/Cpu.svelte';
	import Link from '$lib/assets/icons/Link.svelte';
	import Lock from '$lib/assets/icons/Lock.svelte';
	import Package from '$lib/assets/icons/Package.svelte';

	const jobIcons = [Cpu, Link, Lock, Package];
	const repos = [
		'https://github.com/celaut-project/nodo',
		'https://github.com/celaut-project/chatui'
	];
</script>

<div class="block">
	<p class="eyebrow">{$t('home.nodes.eyebrow')}</p>
	<h2>{$t('home.nodes.heading')}</h2>
	<p class="block-intro">{@html $t('home.nodes.intro')}</p>

	<div class="grid grid-pair">
		{#each $t('home.nodes.jobs') as job, i}
			<article class="card">
				<span class="row-mark" aria-hidden="true"><svelte:component this={jobIcons[i]} /></span>
				<h3>{job.title}</h3>
				<p>{job.body}</p>
			</article>
		{/each}
	</div>

	<h3 class="sub">{$t('home.nodes.implementationsHeading')}</h3>
	<div class="grid grid-2">
		{#each $t('home.nodes.implementations') as impl, i}
			<article class="card">
				<h3>{impl.name}</h3>
				<p>{impl.body}</p>
				<div class="actions">
					<a class="btn" href={repos[i]} target="_blank" rel="noopener noreferrer">
						{$t('common.viewOnGitHub')}
					</a>
				</div>
			</article>
		{/each}
	</div>
</div>

<style>
	/* A secondary heading inside a block: smaller than the block's own
	   h2 and without the accent rule, so it reads as a subdivision. */
	.sub {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		color: var(--on-surface);
		margin: 44px 0 18px;
	}

	.card .row-mark {
		margin-bottom: 16px;
	}
</style>