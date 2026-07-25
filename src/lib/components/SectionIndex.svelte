<script>
	import { onMount } from 'svelte';

	// Landing-page table of contents. Desktop: a sticky vertical rail on the
	// left (dot + label). Mobile: a floating button that opens a compact menu.
	// Active section is tracked with an IntersectionObserver.
	const sections = [
		{ id: 'foundations', label: 'Foundations' },
		{ id: 'core-principles', label: 'Core Principles' },
		{ id: 'what-is-not', label: 'What It Is Not' },
		{ id: 'nodes', label: 'Nodes' },
		{ id: 'services', label: 'Services' },
		{ id: 'service-spec', label: 'Service Spec' },
		{ id: 'coordination', label: 'Coordination' },
		{ id: 'service-distribution', label: 'Service Distribution' },
		{ id: 'user-roles', label: 'User Roles' },
		{ id: 'applications', label: 'Applications' }
	];

	let active = sections[0].id;
	let open = false;

	function go(event, id) {
		event.preventDefault();
		open = false;
		const el = document.getElementById(id);
		if (!el) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) active = entry.target.id;
				}
			},
			{ rootMargin: '-45% 0px -50% 0px', threshold: 0 }
		);
		for (const s of sections) {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});
</script>

<!-- Desktop side rail -->
<nav class="rail" aria-label="Section navigation">
	<ul>
		{#each sections as s}
			<li>
				<a
					href={`#${s.id}`}
					class:active={active === s.id}
					on:click={(e) => go(e, s.id)}
					aria-current={active === s.id ? 'true' : undefined}
				>
					<span class="dot" aria-hidden="true"></span>
					<span class="label">{s.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<!-- Mobile toggle + menu -->
<button
	class="toc-fab"
	on:click={() => (open = !open)}
	aria-label={open ? 'Close section menu' : 'Open section menu'}
	aria-expanded={open}
>
	{#if open}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
	{:else}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
	{/if}
</button>

{#if open}
	<div class="toc-sheet" role="menu">
		<p class="toc-title">On this page</p>
		<ul>
			{#each sections as s}
				<li>
					<a
						href={`#${s.id}`}
						class:active={active === s.id}
						on:click={(e) => go(e, s.id)}
						role="menuitem">{s.label}</a
					>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	/* ---- Desktop rail ---- */
	.rail {
		position: fixed;
		top: 50%;
		left: 14px;
		transform: translateY(-50%);
		z-index: 50;
		padding: 10px 8px;
		border-radius: 14px;
		background: rgba(var(--surface-rgb), 0.4);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(var(--on-surface-rgb), 0.12);
	}

	.rail ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.rail a {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 8px;
		border-radius: 8px;
		text-decoration: none;
		color: rgba(var(--on-surface-rgb), 0.7);
		font-size: 0.82rem;
		white-space: nowrap;
		transition: color 0.2s ease, background 0.2s ease;
	}

	.rail .dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
		background: rgba(var(--on-surface-rgb), 0.35);
		transition: background 0.2s ease, transform 0.2s ease;
	}

	/* Labels stay hidden until hover/active to keep the rail slim. */
	.rail .label {
		max-width: 0;
		overflow: hidden;
		opacity: 0;
		transition: max-width 0.28s ease, opacity 0.28s ease;
	}

	.rail:hover .label,
	.rail a.active .label {
		max-width: 200px;
		opacity: 1;
	}

	.rail a:hover {
		color: var(--on-surface);
		background: rgba(var(--on-surface-rgb), 0.06);
	}

	.rail a.active {
		color: var(--accent);
	}

	.rail a.active .dot {
		background: var(--accent);
		transform: scale(1.3);
	}

	/* ---- Mobile FAB + sheet ---- */
	.toc-fab {
		display: none;
		position: fixed;
		bottom: 24px;
		left: 18px;
		z-index: 55;
		width: 46px;
		height: 46px;
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--on-accent);
		background: var(--accent);
		border: none;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
	}

	.toc-fab svg {
		width: 22px;
		height: 22px;
	}

	.toc-sheet {
		display: none;
		position: fixed;
		bottom: 80px;
		left: 18px;
		z-index: 55;
		width: min(240px, 70vw);
		padding: 14px 16px;
		border-radius: 14px;
		background: var(--surface);
		border: 1px solid rgba(var(--on-surface-rgb), 0.15);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
	}

	.toc-sheet .toc-title {
		margin: 0 0 8px 0;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(var(--on-surface-rgb), 0.6);
	}

	.toc-sheet ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.toc-sheet a {
		display: block;
		padding: 8px 10px;
		border-radius: 8px;
		text-decoration: none;
		color: rgba(var(--on-surface-rgb), 0.85);
		font-size: 0.92rem;
	}

	.toc-sheet a.active {
		color: var(--accent);
		background: rgba(var(--accent-rgb), 0.12);
	}

	@media (max-width: 1024px) {
		.rail {
			display: none;
		}
		.toc-fab {
			display: flex;
		}
		.toc-sheet {
			display: block;
		}
	}
</style>
