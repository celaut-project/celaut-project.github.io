<script>
    import gameOfLifeImgWebP from '$lib/assets/game-of-life.webp';
    import gameOfLifeImgPng from '$lib/assets/game-of-life.png';
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
                    <picture>
                        <source srcset="{gameOfLifeImgWebP}" type="image/webp" />
                        <source srcset="{gameOfLifeImgPng}" type="image/png" />
                        <img
                            src="{gameOfLifeImgPng}"
                            alt="Conway's Game of Life"
                            loading="lazy"
                            width="400"
                            height="350"
                        />
                    </picture>
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
    section {
        background-color: #f9eee7;
        padding: 80px 20px;
    }

    .card {
        max-width: 1100px;
        margin: 0 auto;
        background-color: #1D4241; /* <- COLOR: Fondo de la tarjeta */
        padding: 60px;
        border-radius: 24px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }

    h2 {
        text-align: left;
        font-size: 2.5rem;
        margin-top: 0;
        margin-bottom: 30px;
        color: #ef9c82; /* <- COLOR: Texto principal */
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
        color: rgba(249, 238, 231, 0.85); /* <- COLOR: Texto secundario con opacidad */
    }

    p:last-child {
        margin-bottom: 0;
    }

    /* --- ESTILOS AÑADIDOS --- */

    /* 1. Estilo para resaltar palabras clave */
    strong {
        color: #ef9c82; /* Reutilizamos el color del título para crear consistencia */
        font-weight: 600;
    }

    /* 2. Estilo para la cita destacada (blockquote) */
    blockquote {
        margin: 32px 0 32px 20px;
        padding-left: 24px;
        border-left: 3px solid #ef9c82; /* Un borde sutil con el color de acento */
        font-style: italic;
    }

    blockquote p {
        color: rgba(249, 238, 231, 0.95); /* Aumentamos ligeramente la opacidad para que destaque */
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
        border: 1px solid rgba(249, 238, 231, 0.15); /* <- COLOR: Borde sutil basado en el texto */
        border-radius: 16px;
        background-color: #1C4241; /* Fondo de carga para la imagen */
    }

    figcaption {
        display: block;
        padding: 0 10px;
        margin-top: 15px;
        font-size: 0.9rem;
        line-height: 1.5;
        font-style: italic;
        color: rgba(249, 238, 231, 0.65); /* <- COLOR: Texto de leyenda con más opacidad */
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