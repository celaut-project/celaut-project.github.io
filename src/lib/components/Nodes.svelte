<script>
	// Nodes: what they do, and the two implementations that exist.
	// Styling comes from the shared `.ground` layer in src/app.css.
	import Cpu from '$lib/assets/icons/Cpu.svelte';
	import Link from '$lib/assets/icons/Link.svelte';
	import Lock from '$lib/assets/icons/Lock.svelte';
	import Package from '$lib/assets/icons/Package.svelte';

	const jobs = [
		{
			icon: Cpu,
			title: 'Service execution',
			body: 'It negotiates execution costs with peers and decides whether to run a service locally or delegate it, so resources go where they are cheapest.'
		},
		{
			icon: Link,
			title: 'Communication',
			body: 'It declares the interfaces it supports and the payment methods it accepts on contact, which is what lets protocols evolve without prior agreement.'
		},
		{
			icon: Lock,
			title: 'Security',
			body: 'It issues and manages the addresses and authentication tokens every service interaction is identified by.'
		},
		{
			icon: Package,
			title: 'Dependencies',
			body: 'It makes sure a service can reach what it needs, wherever across the network that dependency happens to be running.'
		}
	];

	const implementations = [
		{
			name: 'Nodo',
			body: 'The reference implementation, built with Python3 and Rust — a working example of how a node is deployed in practice.',
			href: 'https://github.com/celaut-project/nodo'
		},
		{
			name: 'Chatui',
			body: 'A node for Android devices. It exposes services through basic chat interfaces, without requiring trust in any other node.',
			href: 'https://github.com/celaut-project/chatui'
		}
	];
</script>

<div class="block">
	<p class="eyebrow">The machines</p>
	<h2>Nodes: the foundation of the network</h2>
	<p class="block-intro">
		A node is a <strong>computer or device</strong> that communicates with peers and manages service
		execution. Four jobs, and no coordinator above them.
	</p>

	<div class="grid grid-pair">
		{#each jobs as job}
			<article class="card">
				<span class="row-mark" aria-hidden="true"><svelte:component this={job.icon} /></span>
				<h3>{job.title}</h3>
				<p>{job.body}</p>
			</article>
		{/each}
	</div>

	<h3 class="sub">Implementations you can run today</h3>
	<div class="grid grid-2">
		{#each implementations as impl}
			<article class="card">
				<h3>{impl.name}</h3>
				<p>{impl.body}</p>
				<div class="actions">
					<a class="btn" href={impl.href} target="_blank" rel="noopener noreferrer">
						View on GitHub →
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
