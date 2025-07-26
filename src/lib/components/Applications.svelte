<section>
    <h2>Real-World Impact and Applications</h2>

    <div class="content-wrapper">
        <a href="https://game-of-prompts.github.io/web-contract" target="_blank" rel="noopener noreferrer">
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