<section>
    <h2>Real-World Impact and Applications</h2>

	    <!-- DePin -->
    <div class="content-wrapper">
        <a href="/install">
            <div class="logo-icon">
                <!-- Icono de Red Monocromática -->
                <svg viewBox="0 0 24 24" fill="none"
                     stroke="currentColor"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round">
                    <circle cx="12" cy="5" r="3"/>
                    <circle cx="5" cy="19" r="3"/>
                    <circle cx="19" cy="19" r="3"/>
                    <line x1="12" y1="8" x2="6.2" y2="16.5"/>
                    <line x1="12" y1="8" x2="17.8" y2="16.5"/>
                    <line x1="7.7" y1="19" x2="16.3" y2="19"/>
                </svg>
            </div>
        </a>

        <div class="text-content">
            <p>
                <a href="/install" class="title-link">
                    <strong>DePin</strong>
                </a>
            </p>

            <p>
                DePin lets anyone run a Celaut node (<strong>nodo</strong>) and become part of a
                decentralized physical infrastructure network.
            </p>

            <p>
                Each node discovers peers, executes and orchestrates
                <strong>services</strong> across the network, and manages their dependencies —
                turning ordinary computers into shared, censorship-resistant compute.
            </p>
        </div>
    </div>

	<hr />

    <!-- Unstoppable Skills -->
    <div class="content-wrapper">
        <a href="https://celaut-project.github.io/skills" target="_blank" rel="noopener noreferrer">
            <div class="logo-icon">
                <!-- Icono de Llave Inglesa -->
                <svg viewBox="0 0 24 24" fill="none"
                     stroke="currentColor"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
            </div>
        </a>

        <div class="text-content">
            <p>
                <a href="https://celaut-project.github.io/skills" target="_blank" rel="noopener noreferrer" class="title-link">
                    <strong>Unstoppable Skills</strong>
                </a>
            </p>

            <p>
                Unstoppable Skills is a fully on-chain, serverless registry where the
                <strong>problems (skills)</strong> are the protagonists. Instead of hunting for
                services directly, agents search for a skill and automatically discover the
                services that cover it, real comparative benchmarks, community discussion,
                and reputation-based ranking.
            </p>

            <p>
                Everything is built on <strong>Ergo (ERG)</strong> and Celaut, with native
                <strong>skin-in-the-game</strong> — no one can spam without risking reputation.
            </p>
        </div>
    </div>

    <!-- Third-party projects live below this labelled divider: they build on
         Celaut but are maintained by others, so they're set apart visually. -->
    <div class="third-party-divider" role="separator" aria-label="Third-party projects">
        <span>Third-party</span>
    </div>

    <!-- Game of Prompts (third-party) -->
    <div class="content-wrapper third-party">
        <a href="https://game-of-prompts.github.io" target="_blank" rel="noopener noreferrer">
            <img
                src="https://avatars.githubusercontent.com/u/212117344?s=96&v=4"
                alt="Game of Prompts Logo"
                class="logo"
            />
        </a>

        <div class="text-content">
            <p>
                <a href="https://game-of-prompts.github.io" target="_blank" rel="noopener noreferrer" class="title-link">
                    <strong>Game of Prompts</strong>
                </a>
            </p>

            <p>
                Game of Prompts is a competitive platform where creators design
                <strong>game-services</strong> that evaluate the robots playing them (solvers),
                and players create <strong>solver-services</strong> that attempt to maximize
                their score in those games.
            </p>

            <p>
                The services operate following the Celaut paradigm, and the entire system
                functions using the <strong>Ergo (ERG)</strong> blockchain to record and
                evaluate results and transfer prizes.
            </p>
        </div>
    </div>

    <hr />

    <div class="footer">
        <a href="https://docs.ergoplatform.com/eco/celaut/" target="_blank" rel="noopener noreferrer" class="docs-button">
            Ergo docs
        </a>
        <a href="/paradigm" class="docs-button">
            Formal Paper
        </a>
    </div>
</section>

<style>
	.logo-icon {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		border: 2px solid rgba(var(--on-surface-rgb),0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--accent);
		flex-shrink: 0;
		transition: transform 0.4s ease-in-out;
	}

	/* Añadido efecto hover al contenedor para igualar al de las imágenes */
	.logo-icon:hover {
		transform: scale(1.15);
	}

	.logo-icon svg {
		width: 50px; /* Ajustado ligeramente para un mejor balance visual */
		height: 50px;
	}

	section {
		background-color: var(--surface);
		padding: 80px 40px;
	}

	h2 {
		font-size: 2.5rem;
		text-align: center;
		max-width: 800px;
		margin: 0 auto 60px auto;
		color: var(--on-surface);
	}

	.content-wrapper {
		display: flex;
		align-items: center;
		gap: 40px;
		max-width: 900px;
		margin: 0 auto;
	}

	.logo {
		width: 96px;
		height: 96px;
		object-fit: cover;
		border-radius: 50%;
		border: 2px solid rgba(var(--on-surface-rgb), 0.1);
		flex-shrink: 0;
		transition: transform 0.4s ease-in-out;
	}

	.logo:hover {
		transform: scale(1.15);
	}

	.text-content p {
		margin: 0 0 1rem 0;
		line-height: 1.7;
		color: rgba(var(--on-surface-rgb), 0.85);
	}

	.text-content p:last-child {
		margin-bottom: 0;
	}

	strong {
		color: var(--on-surface);
		font-weight: 600;
	}

	.title-link {
		text-decoration: none;
		border-bottom: 1px solid var(--accent);
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	.title-link strong {
		color: var(--accent);
		font-size: 1.2rem;
	}

	.title-link:hover strong {
		color: var(--accent-hover);
	}

	hr {
		border: none;
		height: 1px;
		background-color: rgba(var(--on-surface-rgb), 0.15);
		max-width: 900px;
		margin: 60px auto;
	}

	/* Labelled divider that sets apart third-party projects. */
	.third-party-divider {
		display: flex;
		align-items: center;
		gap: 16px;
		max-width: 900px;
		margin: 64px auto 48px auto;
	}

	.third-party-divider::before,
	.third-party-divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			rgba(var(--accent-rgb), 0.5),
			transparent
		);
	}

	.third-party-divider span {
		flex-shrink: 0;
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		border: 1px solid rgba(var(--accent-rgb), 0.4);
		border-radius: 999px;
		padding: 4px 14px;
	}

	/* Slightly recede the third-party card so first-party ones lead. */
	.content-wrapper.third-party {
		opacity: 0.92;
	}

	.footer {
		max-width: 900px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: center;
	}

	.docs-button {
		display: inline-block;
		background-color: var(--accent);
		color: var(--on-accent);
		padding: 10px 24px;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 700;
		transition: background-color 0.2s ease;
	}

	.docs-button:hover {
		background-color: var(--accent-hover);
	}

	@media (max-width: 768px) {
		.content-wrapper {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
