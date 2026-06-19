<section>
    <h2>Real-World Impact and Applications</h2>

	    <!-- DePin -->
    <div class="content-wrapper">
        <a href="https://github.com/celaut-project/nodo?tab=readme-ov-file#installation" target="_blank" rel="noopener noreferrer">
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
                <a href="https://github.com/celaut-project/nodo?tab=readme-ov-file#installation" target="_blank" rel="noopener noreferrer" class="title-link">
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

    <hr />

    <!-- Game of Prompts -->
    <div class="content-wrapper">
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
    </div>
</section>

<style>
	.logo-icon {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		border: 2px solid rgba(249,238,231,0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ef9c82;
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
		background-color: #1d4241;
		padding: 80px 40px;
	}

	h2 {
		font-size: 2.5rem;
		text-align: center;
		max-width: 800px;
		margin: 0 auto 60px auto;
		color: #f9eee7;
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
		border: 2px solid rgba(249, 238, 231, 0.1);
		flex-shrink: 0;
		transition: transform 0.4s ease-in-out;
	}

	.logo:hover {
		transform: scale(1.15);
	}

	.text-content p {
		margin: 0 0 1rem 0;
		line-height: 1.7;
		color: rgba(249, 238, 231, 0.85);
	}

	.text-content p:last-child {
		margin-bottom: 0;
	}

	strong {
		color: #f9eee7;
		font-weight: 600;
	}

	.title-link {
		text-decoration: none;
		border-bottom: 1px solid #ef9c82;
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	.title-link strong {
		color: #ef9c82;
		font-size: 1.2rem;
	}

	.title-link:hover strong {
		color: #e88a6f;
	}

	hr {
		border: none;
		height: 1px;
		background-color: rgba(249, 238, 231, 0.15);
		max-width: 900px;
		margin: 60px auto;
	}

	.footer {
		max-width: 900px;
		margin: 0 auto;
	}

	.docs-button {
		display: inline-block;
		background-color: #ef9c82;
		color: #1d4241;
		padding: 10px 24px;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 700;
		transition: background-color 0.2s ease;
	}

	.docs-button:hover {
		background-color: #e88a6f;
	}

	@media (max-width: 768px) {
		.content-wrapper {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
