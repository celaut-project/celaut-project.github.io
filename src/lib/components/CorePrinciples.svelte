<section>
    <h2>Core Principles of Celaut</h2>

    <div class="principles-container">
        <div class="principle">
            <div class="icon-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" /><path d="M12 8v4l2 1" />
                    <path d="m19.07 4.93-1.41 1.41" /><path d="m4.93 19.07 1.41-1.41" />
                    <path d="m4.93 4.93 1.41 1.41" /><path d="m19.07 19.07-1.41-1.41" />
                </svg>
            </div>
            <h3>Decentralization</h3>
            <p>
                Celaut eliminates <strong>single points of control or failure</strong> by allowing nodes
                to <strong>communicate and coordinate dynamically</strong>.
            </p>
        </div>

        <div class="principle">
            <div class="icon-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M12.67 19a2 2 0 0 0-2.01.52L6.18 22a2 2 0 0 1-2.83-2.83l2.48-4.48a2 2 0 0 0 .52-2.01L2.05 3.9a2 2 0 0 1 2.83-2.83l8.79 8.78a2 2 0 0 0 2.01-.52l4.48-2.48a2 2 0 0 1 2.83 2.83l-8.78 8.79z" />
                    <path d="m22 2-2.5 2.5" />
                </svg>
            </div>
            <h3>Simplicity</h3>
            <p>
                The architecture follows <strong>minimalist principles</strong> that
                <strong>reduce complexity</strong>, ensuring each component is easy to understand and
                maintain.
            </p>
        </div>
        
        <div class="principle">
            <div class="icon-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m12 20 4-4" /><path d="m12 4 4 4" />
                    <path d="M12 12a8 8 0 0 0 8 8" /><path d="M12 12a8 8 0 0 1 8-8" />
                    <path d="m20 12-4 4" /><path d="m4 12 4-4" />
                    <path d="M12 12a8 8 0 0 0-8-8" /><path d="M12 12a8 8 0 0 1-8 8" />
                </svg>
            </div>
            <h3>Determinism</h3>
            <p>
                Services are fully specified to ensure <strong>reproducible results</strong> across time
                and nodes. Given the same inputs, they <strong>always produce the same outputs</strong>,
                regardless of where or when they're run.
            </p>
        </div>
    </div>
</section>

<style>
    section {
        background-color: var(--surface);
        padding: 80px 20px;
    }

    h2 {
        text-align: center;
        font-size: 2.5rem;
        margin: 0 auto 60px auto;
        color: var(--heading);
    }

    .principles-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
        max-width: 1100px;
        margin: 0 auto;
    }

    .principle {
        background-color: rgba(var(--on-surface-rgb), 0.04);
        border-radius: 16px;
        padding: 40px 30px;
        text-align: center;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        border: 1px solid rgba(var(--on-surface-rgb), 0.12);
        border-top: 5px solid var(--accent);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .principle:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
    }
    
    .icon-wrapper {
        width: 64px;
        height: 64px;
        margin: 0 auto 25px auto;
        background-color: rgba(var(--accent-rgb), 0.14);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-wrapper svg {
        width: 32px;
        height: 32px;
        color: var(--accent);
    }

    h3 {
        font-size: 1.5rem;
        margin: 0 0 15px 0;
        color: var(--on-surface);
    }

    p {
        line-height: 1.6;
        color: rgba(var(--on-surface-rgb), 0.75);
        margin: 0;
    }

    /* --- ESTILO PARA RESALTAR TEXTO CLAVE --- */
    p strong {
        color: var(--accent); /* Conecta visualmente con el icono y el borde */
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .principles-container {
            grid-template-columns: 1fr;
            gap: 40px;
        }
    }
</style>