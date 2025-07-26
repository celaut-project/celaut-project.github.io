<section>
    <div class="card">
        <h2>What Celaut Is Not</h2>
        <p class="intro">
            To fully understand Celaut's innovative approach, it's crucial to clarify what it is not.
            This architecture stands apart from common misconceptions in decentralized technologies.
        </p>

        <div class="blocks-container">
            <div class="block">
                <div class="block-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>
                </div>
                <div class="block-content">
                    <h3>Not a Single Network</h3>
                    <p>
                        Celaut defines a <strong>flexible architecture</strong>, not a predetermined, <strong>monolithic network</strong>. While
                        predominant networks may emerge, the system inherently supports <strong>peer-to-peer constructions</strong>
                         rather than dictating a singular one.
                    </p>
                </div>
            </div>

            <div class="block">
                 <div class="block-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/><line x1="4" y1="4" x2="20" y2="20"/></svg>
                </div>
                <div class="block-content">
                    <h3>Not a Complete Protocol Stack</h3>
                    <p>
                        Celaut provides <strong>core principles</strong> for building computation distribution stacks, rather than
                        a <strong>full, opinionated stack</strong>. Current implementations leverage components like gRPC or Docker, but these are <strong>interchangeable choices</strong>.
                    </p>
                </div>
            </div>
            
            <div class="block">
                 <div class="block-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
                </div>
                <div class="block-content">
                    <h3>Not a Blockchain Project</h3>
                    <p>
                        Celaut is <strong>distinct from traditional blockchain initiatives</strong>. It operates <strong>without a native cryptocurrency</strong> or DAOs. However, it does <strong>incorporate blockchain technologies</strong> where appropriate—for example, to enable trustless cooperation—without adopting the broader blockchain ecosystem.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    section {
        background-color: #f9eee7; /* <- COLOR: Fondo de la sección */
        padding: 80px 20px;
    }

    .card {
        max-width: 1100px;
        margin: 0 auto;
        background-color: #1d4241; /* <- COLOR: Fondo de la tarjeta */
        padding: 60px;
        border-radius: 24px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }

    h2 {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 20px 0;
        color: #ef9c82; /* <- COLOR: Texto principal */
    }

    .intro {
        text-align: center;
        max-width: 800px;
        margin: 0 auto 50px auto;
        line-height: 1.7;
        color: rgba(249, 238, 231, 0.85); /* <- COLOR: Texto secundario */
    }

    .blocks-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .block {
        /* MEJORA: Layout Flex para alinear icono y texto */
        display: flex;
        align-items: flex-start; /* Alinea el icono con la parte superior del texto */
        gap: 25px;
        background-color: rgba(249, 238, 231, 0.03);
        border: 1px solid rgba(249, 238, 231, 0.1);
        padding: 30px;
        border-radius: 16px;
    }

    /* --- ESTILOS AÑADIDOS --- */

    .block-icon {
        flex-shrink: 0; /* Evita que el icono se encoja */
        width: 48px;
        height: 48px;
        background-color: rgba(239, 156, 130, 0.1); /* Fondo sutil con el color de acento */
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .block-icon svg {
        width: 24px;
        height: 24px;
        color: #ef9c82;
    }

    .block-content {
        flex: 1; /* El contenido de texto ocupa el resto del espacio */
    }

    h3 {
        font-size: 1.4rem;
        margin: 0 0 10px 0;
        color: #f9eee7;
    }

    .block p {
        margin: 0;
        line-height: 1.7;
        color: rgba(249, 238, 231, 0.85);
    }
    
    .block p strong {
        color: #ef9c82;
        font-weight: 600;
    }
    
    /* Adaptación para móviles */
    @media (max-width: 640px) {
        /* MEJORA: Reducir el padding de la tarjeta principal para ganar espacio. */
        .card {
            padding: 40px 25px;
        }

        /* MEJORA: Ajustar título e introducción para pantallas pequeñas. */
        h2 {
            font-size: 2.2rem;
        }
        .intro {
            margin-bottom: 40px;
        }

        .block {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 20px;
            /* MEJORA: Reducir también un poco el padding interno de los bloques. */
            padding: 25px;
        }
    }
</style>