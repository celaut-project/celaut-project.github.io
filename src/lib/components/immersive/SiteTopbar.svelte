<script>
	/*
	 * SiteTopbar — the fixed bar shared by every immersive page.
	 *
	 * Before this existed each page owned a private "← Back to home"
	 * strip, so there was no way to move between the audience pages
	 * without going via the landing page. Now the three audience routes
	 * (+ the paradigm deep dive) are always one click away, and the
	 * current one is marked with aria-current.
	 *
	 * Deliberately not in +layout.svelte: the landing page has its own
	 * SectionIndex rail and hero, and a second fixed bar there would
	 * fight both of them.
	 */
	import { page } from '$app/stores';

	/** Page title shown next to the wordmark. */
	export let title = '';

	const links = [
		{ href: '/depin', label: 'Rent your PC' },
		{ href: '/developers', label: 'Developers' },
		{ href: '/users', label: 'Users' },
		{ href: '/paradigm', label: 'Paradigm' }
	];

	$: current = $page.url.pathname.replace(/\/$/, '') || '/';
</script>

<header class="topbar">
	<a class="home-link" href="/">
		<span aria-hidden="true">←</span>
		<span class="wordmark">CELAUT</span>
	</a>

	{#if title}
		<span class="topbar-title">{title}</span>
	{/if}

	<nav aria-label="Celaut sections">
		<ul>
			{#each links as l}
				<li>
					<a
						href={l.href}
						class:active={current === l.href}
						aria-current={current === l.href ? 'page' : undefined}>{l.label}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.topbar {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 12px clamp(14px, 4vw, 24px);
		/* Sits over full-bleed canvases, so it needs its own backing. */
		background-color: rgba(var(--surface-deep-rgb), 0.85);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		color: var(--on-surface);
		border-bottom: 1px solid var(--border);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 40;
	}

	.home-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--on-surface);
		text-decoration: none;
		font-weight: 700;
		white-space: nowrap;
	}

	.home-link:hover {
		color: var(--accent-text);
	}

	.wordmark {
		font-family: var(--font-heading);
		letter-spacing: 0.08em;
	}

	.topbar-title {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.02rem;
		color: var(--on-surface-muted);
		white-space: nowrap;
	}

	nav {
		margin-left: auto;
		/* The theme toggle is a fixed element in the top-right corner; keep
		   the last link clear of it. */
		padding-right: 56px;
		min-width: 0;
	}

	nav ul {
		list-style: none;
		display: flex;
		align-items: center;
		gap: 4px;
		margin: 0;
		padding: 0;
		overflow-x: auto;
		scrollbar-width: none;
	}

	nav ul::-webkit-scrollbar {
		display: none;
	}

	nav a {
		display: block;
		padding: 7px 12px;
		border-radius: 8px;
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 600;
		white-space: nowrap;
		color: var(--on-surface-muted);
		transition: color 0.2s ease, background-color 0.2s ease;
	}

	nav a:hover {
		color: var(--on-surface);
		background-color: var(--accent-soft);
	}

	nav a.active {
		color: var(--accent-text);
		background-color: var(--accent-soft);
	}

	@media (max-width: 900px) {
		.topbar-title {
			display: none;
		}
	}

	@media (max-width: 560px) {
		.topbar {
			gap: 10px;
		}

		.home-link .wordmark {
			display: none;
		}

		nav a {
			padding: 7px 9px;
			font-size: 0.84rem;
		}
	}
</style>
