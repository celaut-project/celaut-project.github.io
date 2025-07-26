<script>
    import BoxIcon from '$lib/assets/icons/BoxIcon.svelte';
    import ApiIcon from '$lib/assets/icons/ApiIcon.svelte';
    import NetIcon from '$lib/assets/icons/NetIcon.svelte';

    // Variables para controlar el estado hover de cada grupo
    let isBoxHovered = false;
    let isApiHovered = false;
    let isNetHovered = false;
</script>

<section>
    <div class="card">
        <h2>Service Specification Components</h2>

        <div class="spec-layout">
            <div class="description-box left" on:mouseenter={() => isBoxHovered = true} on:mouseleave={() => isBoxHovered = false}>
                <h3 class:hovered={isBoxHovered}>BOX</h3>
                <p>
                    Defines the <strong>execution environment</strong> – architecture, filesystem, environment variables,
                    entrypoint, configuration, and resources – to ensure <strong>deterministic execution</strong>
                    across nodes.
                </p>
            </div>

            <div class="diagram">
                <div class="circle api" class:hovered={isApiHovered} on:mouseenter={() => isApiHovered = true} on:mouseleave={() => isApiHovered = false}><ApiIcon /></div>
                <div class="circle box" class:hovered={isBoxHovered} on:mouseenter={() => isBoxHovered = true} on:mouseleave={() => isBoxHovered = false}><BoxIcon /></div>
                <div class="circle net" class:hovered={isNetHovered} on:mouseenter={() => isNetHovered = true} on:mouseleave={() => isNetHovered = false}><NetIcon /></div>
            </div>

            <div class="description-box right">
                <div class="spec-item" on:mouseenter={() => isApiHovered = true} on:mouseleave={() => isApiHovered = false}>
                    <h3 class:hovered={isApiHovered}>API</h3>
                    <p>
                        Defines how to <strong>communicate with the service</strong>, accepted payment systems, and
                        associated costs. Enables decentralized communication without central negotiation.
                    </p>
                </div>
                 <div class="spec-item" on:mouseenter={() => isNetHovered = true} on:mouseleave={() => isNetHovered = false}>
                    <h3 class:hovered={isNetHovered}>NET</h3>
                    <p>
                        Defines the scope of <strong>external network access</strong>. By default, services are isolated for
                        security, but can request specific network access through the node when required for
                        functionality.
                    </p>
                </div>
            </div>
        </div>

        <p class="footer-text">
            These three components work together to create portable, reproducible services that can be
            deployed consistently across the Celaut network while maintaining security and determinism.
        </p>
    </div>
</section>

<style>
    section {
        padding: 80px 20px;
        background-color: #ef9c82;
    }

    .card {
        background: linear-gradient(145deg, #224c4b, #183837);
        border: 1px solid rgba(249, 238, 231, 0.1);
        padding: 60px;
        border-radius: 24px;
        margin: 0 auto;
        max-width: 1100px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }

    h2 {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 60px 0;
        color: #f9eee7;
    }

    .spec-layout {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 40px;
    }

    .description-box.left {
        text-align: right;
    }
    
    .description-box h3 {
        font-size: 1.5rem;
        margin-bottom: 8px;
        color: #f9eee7;
        display: inline-block;
        padding-bottom: 5px;
        border-bottom: 2px solid transparent;
        transition: color 0.3s ease;
    }

    .description-box p {
        margin: 0;
        line-height: 1.6;
        color: rgba(249, 238, 231, 0.85);
    }

    .description-box p strong {
        color: #f9eee7;
        font-weight: 600;
    }

    .right .spec-item {
        margin-bottom: 30px;
    }
    .right .spec-item:last-child {
        margin-bottom: 0;
    }

    .diagram {
        position: relative;
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .circle {
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: rgba(249, 238, 231, 0.05);
        border: 1px solid rgba(249, 238, 231, 0.2);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f9eee7;
        transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
        cursor: pointer;
    }

    /* Regla general de hover para los círculos que no se centran con transform */
    .circle:hover {
        transform: scale(1.1);
        background-color: rgba(249, 238, 231, 0.15);
    }
    
    /* CORRECCIÓN: Regla específica para API que combina el centrado y la escala */
    .api:hover {
        transform: translateX(-50%) scale(1.1);
    }

    h3.hovered,
    .circle.hovered {
        color: #ef9c82;
    }

    .circle :global(svg) {
        width: 40px;
        height: 40px;
    }
    
    /* El centrado original de API */
    .api {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .box {
        bottom: 20px;
        left: 0px;
    }
    .net {
        bottom: 20px;
        right: 0px;
    }

    .footer-text {
        text-align: center;
        max-width: 800px;
        margin: 60px auto 0 auto;
        line-height: 1.7;
        color: rgba(249, 238, 231, 0.85);
    }

    @media (max-width: 900px) {
        section {
            padding: 50px 15px;
        }
        .card {
            padding: 40px 25px;
        }
        h2 {
            font-size: 2rem;
            margin-bottom: 40px;
        }
        .spec-layout {
            grid-template-columns: 1fr;
            gap: 30px;
        }
        .description-box.left {
            text-align: left;
        }
        .diagram {
            order: -1;
            margin: 0 auto 20px auto;
        }
        .footer-text {
            margin-top: 40px;
        }
    }
</style>