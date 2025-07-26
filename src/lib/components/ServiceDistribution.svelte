<section>
    <div class="card">
        <h2>Service Distribution</h2>
        <p class="intro">
            Celaut's architecture promotes dynamic, decentralized coordination. Unlike traditional systems, this approach ensures resilience and flexibility in how services are discovered and utilized across the network.
        </p>

        <div class="features-grid">
            <div class="feature">
                <div class="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                </div>
                <h3>Decentralized Discovery</h3>
                <p>
                    Celaut has no central service registry. Services are distributed across nodes peer-to-peer, allowing direct discovery without a single point of failure.
                </p>
            </div>

            <div class="feature">
                <div class="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
                    </svg>
                </div>
                <h3>Optional Blockchain Integration</h3>
                <p>
                    Services can be declared on blockchains that implement a registry, like the <strong>Sigma Reputation System</strong> on Ergo, to enhance visibility and trust.
                </p>
            </div>
        </div>
    </div>
</section>

<style>
    /* Paleta Monocromática */
    :root {
        --background-color: #f9eee7; /* Gris muy claro */
        --card-background: #f9eee7;    /* Blanco */
        --feature-background: #ffffff;/* Gris claro para contraste */
        --text-color: #212529;         /* Negro suave */
        --subtle-text-color: #495057;  /* Gris oscuro */
        --border-color: #f9eee7;      /* Gris para bordes */
    }

    section {
        padding: 80px 20px;
        background-color: var(--background-color);
    }

    .card {
        background-color: var(--card-background);
        padding: 60px;
        border-radius: 24px;
        max-width: 1100px;
        margin: 0 auto;
        text-align: center;
        border: 1px solid var(--border-color);
    }

    h2 {
        font-size: 2.5rem;
        margin-top: 0;
        margin-bottom: 16px;
        color: var(--text-color);
    }

    .intro {
        max-width: 750px;
        margin: 0 auto 50px auto;
        font-size: 1.1rem;
        line-height: 1.7;
        color: var(--subtle-text-color);
    }

    .features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        text-align: left;
    }

    .feature {
        background-color: var(--feature-background);
        padding: 30px;
        border-radius: 16px;
        border: 1px solid var(--border-color);
    }
    
    .icon-wrapper {
        width: 60px;
        height: 60px;
        border-radius: 12px; /* Ligeramente menos redondo */
        display: grid;
        place-items: center;
        background-color: #ffffff;
        color: var(--text-color); /* El color del icono hereda de aquí */
        margin-bottom: 20px;
    }
    
    h3 {
        font-size: 1.4rem;
        margin-top: 0;
        margin-bottom: 15px;
        font-weight: 700;
        color: var(--text-color);
    }

    .feature p {
        margin: 0;
        line-height: 1.6;
        color: var(--subtle-text-color);
    }

    strong {
        color: var(--text-color);
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .features-grid {
            grid-template-columns: 1fr;
        }
        .card {
            padding: 40px 30px;
        }
    }
</style>
