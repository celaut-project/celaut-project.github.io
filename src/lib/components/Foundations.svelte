<script>
    import GameOfLife from '$lib/components/GameOfLife.svelte';
</script>

<section>
    <div class="card">
        <h2>Foundations in Cellular Automata</h2>
        <div class="content">
            <div class="text-content">
                <p>
                    The Celaut architecture draws inspiration from <strong>cellular automata theory</strong>,
                    pioneered by mathematicians <strong>John von Neumann</strong> and
                    <strong>Stanislaw Ulam</strong> in the 1940s.
                </p>

                <blockquote>
                    <p>
                        This mathematical model demonstrates how
                        <strong>complex behaviors emerge from simple rules</strong> and local
                        interactions.
                    </p>
                </blockquote>

                <p>
                    In 1970, <strong>John Horton Conway's 'Game of Life'</strong> became a classic
                    example of <strong>emergent complexity</strong>, showing how intricate patterns
                    develop from basic interactions - a principle that forms the philosophical foundation
                    of Celaut's design approach.
                </p>
            </div>
            <div class="image-content">
                <figure>
                    <GameOfLife />
                    <figcaption>
                        Conway’s Game of Life demonstrates how complex patterns emerge from simple rules - a
                        core inspiration for Celaut’s architecture.
                    </figcaption>
                </figure>
            </div>
        </div>
    </div>
</section>

<style>
    /* Alternating band. Previously this was `var(--on-surface)`, which in dark
       mode painted a full-width CREAM slab behind the card — the single worst
       offender in the old theme. --surface-alt is a proper one-step elevation
       change that reads correctly in both themes. */
    section {
        background-color: var(--surface-alt);
        padding: 80px 20px;
    }

    .card {
        max-width: 1100px;
        margin: 0 auto;
        background-color: var(--surface-raised);
        padding: 60px;
        border-radius: 24px;
        border: 1px solid var(--border);
        box-shadow: var(--shadow-md);
    }

    h2 {
        text-align: left;
        font-size: 2.5rem;
        margin-top: 0;
        margin-bottom: 30px;
        color: var(--heading);
    }

    .content {
        display: flex;
        gap: 60px;
        align-items: center;
    }

    .text-content {
        flex: 1.2;
    }

    p {
        line-height: 1.8;
        margin: 0 0 24px 0;
        color: var(--on-surface-muted);
    }

    p:last-child {
        margin-bottom: 0;
    }

    /* --- ESTILOS AÑADIDOS --- */

    /* 1. Estilo para resaltar palabras clave */
    /* --accent-text, not --accent: coral-on-cream is ~1.9:1 and unreadable in
       light mode. The accessible accent keeps the same brand read at >= 4.9:1. */
    strong {
        color: var(--accent-text);
        font-weight: 600;
    }

    /* 2. Estilo para la cita destacada (blockquote) */
    blockquote {
        margin: 32px 0 32px 20px;
        padding-left: 24px;
        border-left: 3px solid var(--accent);
        font-style: italic;
    }

    blockquote p {
        color: var(--on-surface);
        margin: 0; /* Anulamos el margen del párrafo dentro de la cita */
        line-height: 1.7;
    }

    /* --- FIN DE ESTILOS AÑADIDOS --- */


    .image-content {
        flex: 0.8;
        text-align: center;
    }

    figure {
        margin: 0;
    }

    img {
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid var(--border);
        border-radius: 16px;
        background-color: var(--surface-raised);
    }

    figcaption {
        display: block;
        padding: 0 10px;
        margin-top: 15px;
        font-size: 0.9rem;
        line-height: 1.5;
        font-style: italic;
        color: var(--on-surface-subtle);
    }

    @media (max-width: 800px) {
        .content {
            flex-direction: column;
            gap: 40px;
        }
        h2 {
            text-align: center;
        }
        /* Ajuste para el blockquote en móvil */
        blockquote {
            margin-left: 0;
        }

        /* ✨ NUEVOS AJUSTES PARA MÓVIL ✨ */
        section {
            padding: 40px 20px; /* Reduce el padding vertical */
        }

        .card {
            padding: 30px; /* Reduce el padding interno */
        }
    }
</style>