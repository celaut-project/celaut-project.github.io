<section>
    <h2>Real-World Impact and Applications</h2>

    <div class="content-wrapper">
        <div class="text-content">
            <p>
                <a href="https://celaut-project.github.io/skills" target="_blank" rel="noopener noreferrer" class="title-link">
                    <strong>Unstoppable Skills</strong>
                </a>
                is a fully on-chain, serverless registry where the <strong>problems (skills)</strong> are the
                protagonists. Instead of hunting for services directly, agents search for a skill and
                automatically discover the services that cover it, real comparative benchmarks, community
                discussion, and reputation-based ranking.
            </p>
            <p>
                Everything is built on <strong>Ergo (ERG)</strong> and Celaut, with native
                <strong>skin-in-the-game</strong> — no one can spam without risking reputation.
            </p>
        </div>
    </div>

    <hr />

    <div class="content-wrapper">
        <div class="text-content">
            <p>
                <a href="https://github.com/celaut-project/nodo?tab=readme-ov-file#installation" target="_blank" rel="noopener noreferrer" class="title-link">
                    <strong>DePin</strong>
                </a>
                lets anyone run a Celaut node (<strong>nodo</strong>) and become part of a decentralized
                physical infrastructure network.
            </p>
            <p>
                Each node discovers peers, executes and orchestrates <strong>services</strong> across the
                network, and manages their dependencies — turning ordinary computers into shared,
                censorship-resistant compute.
            </p>
        </div>
    </div>

    <hr />

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
                <strong>Game of Prompts</strong> is a competitive platform where creators design
                <strong>game-services</strong> that evaluate the robots playing them (solvers), and players
                create
                <strong>solver-services</strong> that attempt to maximize their score in those games.
            </p>
            <p>
                The services operate following the Celaut paradigm, and the entire system functions using
                the <strong>Ergo (ERG)</strong> blockchain to record and evaluate results and transfer
                prizes.
            </p>
        </div>
    </div>

    <hr />

    <div class="footer">
        <a href="https://docs.ergoplatform.com/eco/celaut/" target="_blank" rel="noopener noreferrer" class="docs-button">Ergo docs</a>
    </div>
</section>

<style>
	section {
		background-color: #1d4241; /* <- COLOR: Fondo de la sección */
		padding: 80px 40px;
	}

	h2 {
		font-size: 2.5rem;
		text-align: center;
		max-width: 800px;
		margin: 0 auto 60px auto;
		color: #f9eee7; /* <- COLOR: Texto principal */
	}

	.content-wrapper {
		display: flex;
		align-items: center;
		gap: 40px;
		max-width: 900px;
		margin: 0 auto;
	}

	.logo {
		width: 96px; /* MEJORA: Tamaño de la imagen de la URL */
		height: 96px;
		border-radius: 50%; /* MEJORA: Imagen circular */
		border: 2px solid rgba(249, 238, 231, 0.1); /* MEJORA: Borde sutil */
		flex-shrink: 0;
	}

	.logo:hover {
		transition: transform 0.4s ease-in-out;
		transform: scale(1.15); /* Aumenta el tamaño un 15% */
	}

	.text-content p {
		margin: 0 0 1rem 0;
		line-height: 1.7;
		color: rgba(249, 238, 231, 0.85); /* <- COLOR: Texto secundario */
	}

	.text-content p:last-child {
		margin-bottom: 0;
	}

	strong {
		color: #f9eee7; /* <- COLOR: Texto principal para énfasis */
		font-weight: 600;
	}

	.title-link {
		text-decoration: none;
		border-bottom: 1px solid #ef9c82; /* <- COLOR: Acento bajo el título-enlace */
	}

	.title-link strong {
		color: #ef9c82; /* <- COLOR: Acento para títulos enlazados */
	}

	.title-link:hover strong {
		color: #e88a6f;
	}

	hr {
		border: none;
		height: 1px;
		background-color: rgba(249, 238, 231, 0.15); /* MEJORA: Color de línea sutil */
		max-width: 900px;
		margin: 60px auto;
	}

	.footer {
		max-width: 900px;
		margin: 0 auto;
	}

	.docs-button {
		display: inline-block;
		background-color: #ef9c82; /* <- COLOR: Acento para el botón */
		color: #1d4241; /* <- COLOR: Texto oscuro para contraste */
		padding: 10px 24px;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 700;
		transition: background-color 0.2s ease;
	}

	.docs-button:hover {
		background-color: #e88a6f; /* Un tono ligeramente más oscuro para el hover */
	}

	@media (max-width: 768px) {
		.content-wrapper {
			flex-direction: column;
			text-align: center;
		}
	}
</style>