<section>
    <h2>Services: <strong>Deterministic Software Containers</strong></h2>
    <p class="intro">
        Services in Celaut are <strong>deterministic software containers</strong> designed to perform specific tasks.
        Following the <strong>black box</strong> principle, they operate <strong>independently</strong> of the nodes that execute them,
        focusing solely on their functionality.
    </p>

    <div class="services-grid">
        <div class="service-card">
            <div class="card-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <h3>Isolated Execution</h3>
            </div>
            <p>
                Services are executed as <strong>isolated processes</strong> in containers or virtual machines, abstracting the
                details of the execution environment and maintaining <strong>security barriers</strong>.
            </p>
        </div>

        <div class="service-card">
            <div class="card-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                <h3>Deterministic Behavior</h3>
            </div>
            <p>
                Given the same inputs, services <strong>always produce the same outputs</strong> regardless of where or
                when they are executed, ensuring <strong>consistent and reproducible results</strong> across the entire network.
            </p>
        </div>

        <div class="service-card">
            <div class="card-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
                <h3>Hierarchical Execution</h3>
            </div>
            <p>
                The service can request the execution of <strong>dependencies (child services)</strong> from its node. The parent service <strong>does not know where</strong> the dependencies are executed; each one specifies the <strong>required resources</strong>.
            </p>
        </div>
    </div>
</section>

<style>
    section {
        background-color: #ef9c82;
        padding: 80px 20px;
    }

    h2 {
        text-align: center;
        font-size: 2.5rem;
        margin: 0 auto 20px auto;
        max-width: 800px;
        color: #1d4241;
    }

    .intro {
        text-align: center;
        max-width: 800px;
        margin: 0 auto 60px auto;
        font-size: 1.1rem;
        line-height: 1.7;
        color: #1d4241;
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
        max-width: 1100px;
        margin: 0 auto;
    }

    .service-card {
        border: 2px solid #1d4241;
        padding: 40px;
        border-radius: 16px;
        background-color: transparent;
    }

    /* Styles for the card header (icon + title) */
    .card-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    }

    .card-header svg {
        color: #1d4241;
        flex-shrink: 0; /* Prevents the icon from shrinking */
    }

    h3 {
        font-size: 1.4rem;
        font-weight: 700;
        margin: 0;
        color: #1d4241;
    }
    
    .service-card p {
        margin: 0;
        line-height: 1.6;
        color: #1d4241;
    }

    strong {
        font-weight: 700; /* Ensures consistent bold weight */
    }

    @media (max-width: 900px) {
        .services-grid {
            grid-template-columns: 1fr;
        }
    }
</style>