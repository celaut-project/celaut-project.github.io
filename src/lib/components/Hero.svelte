<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';

    // --- ROTATING HERO FACTS ---
    // Short, engaging facts about Celaut that cycle in place of the old static
    // paragraph. Hardcoded on purpose (no external source), rotated every 10s
    // with a subtle fade + vertical slide. The card wrapper below is sized with
    // a fixed min-height so swapping facts never shifts the surrounding layout.
    const facts = [
        'Inspired by cellular automata — resilient global behaviour emerging from simple local rules.',
        'Deterministic by design: identical inputs always produce identical, verifiable output.',
        'No central registry. Services are distributed peer-to-peer across independent nodes.',
        'Every service is content-addressed — its hash is its name, so nothing can be silently swapped.',
        'Nodes run each service sealed inside its own isolated micro-environment.',
        'Reputation lives on-chain: trust is earned and provable, never granted by a gatekeeper.',
        'Three principles, all the way down: decentralization, simplicity, and determinism.'
    ];
    let factIndex = 0;
    let factsTimer;

    // --- 1. LÓGICA PARA EL EFECTO PARALLAX ---
    let parallaxX = 0;
    let parallaxY = 0;

    /**
     * Actualiza las coordenadas para el efecto parallax basándose en la posición del ratón.
     * Las coordenadas se normalizan (-0.5 a 0.5) para un cálculo más sencillo.
     */
    function handleMousemove(event) {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        parallaxX = (clientX / innerWidth) - 0.5;
        parallaxY = (clientY / innerHeight) - 0.5;
    }


    // --- 2. ACCIÓN PERSONALIZADA PARA ANIMACIÓN DE TEXTO "STAGGER" ---

    /**
     * Una acción de Svelte que divide el texto de un nodo en palabras y caracteres,
     * y los anima secuencialmente para un efecto de aparición escalonada,
     * manteniendo la integridad de las palabras para evitar saltos de línea incorrectos.
     * @param {HTMLElement} node - El elemento DOM.
     * @param {object} params - Parámetros de configuración.
     * @param {number} params.delay - Retraso inicial antes de que comience la animación.
     * @param {number} params.duration - Duración de la animación de cada carácter.
     * @param {number} params.stagger - Retraso entre la animación de cada carácter.
     */
    function staggeredFadeIn(node, { delay = 0, duration = 300, stagger = 30 }) {
        const text = node.textContent;
        // Dividimos por espacios para obtener un array de palabras
        const words = text.split(' '); 

        node.textContent = ''; // Limpiar el nodo
        node.style.opacity = 1; // Hacemos visible el contenedor

        let charIndex = 0; // Contador global de caracteres para el 'stagger'

        words.forEach((word, wordIndex) => {
            // Creamos un contenedor para cada palabra
            const wordWrapper = document.createElement('span');
            wordWrapper.style.display = 'inline-block'; // Las palabras se comportan como bloques en línea
            
            const chars = word.split('');
            chars.forEach((char) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(25px)';
                // Usamos el contador global para que la animación sea fluida entre palabras
                span.style.transition = `all ${duration}ms ease-out ${delay + charIndex * stagger}ms`;
                wordWrapper.appendChild(span);

                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 20);

                charIndex++; // Incrementamos el contador por cada carácter
            });

            node.appendChild(wordWrapper);

            // Añadimos un espacio real después de cada palabra, excepto la última
            if (wordIndex < words.length - 1) {
                node.appendChild(document.createTextNode(' '));
            }
        });

        return {
            destroy() {
                // Lógica de limpieza si fuera necesaria
            }
        };
    }

    // --- 3. LÓGICA PARA EL FONDO DE AUTÓMATAS CELULARES (JUEGO DE LA VIDA) ---
    
    let canvas; // Variable para enlazar con el elemento <canvas>

    // Smooth-scroll the Hero's "Learn More" CTA down to the first content
    // section (respects reduced-motion). A glide reads better than a jump.
    function scrollToLearnMore(event) {
        event.preventDefault();
        const target = document.getElementById('foundations') || document.getElementById('learn-more');
        if (!target) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }

    // "Start to use it" glides to the Applications section so visitors can pick
    // how they want to jump in (run a node, build/use skills) rather than being
    // dropped straight onto the install page.
    function scrollToApps(event) {
        event.preventDefault();
        const target = document.getElementById('applications');
        if (!target) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }

    onMount(() => {
        const ctx = canvas.getContext('2d');
        let cols, rows, grid;
        const resolution = 25; // Tamaño en píxeles de cada celda
        // Theme-aware colour for the "living" cells.
        const cellColor = () =>
            document.documentElement.getAttribute('data-theme') === 'light'
                ? '#c9a892'
                : '#2a5a58';

        function setup() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cols = Math.ceil(canvas.width / resolution);
            rows = Math.ceil(canvas.height / resolution);
            grid = createGrid(cols, rows);
        }

        // Crea una retícula 2D con un estado inicial aleatorio
        function createGrid(cols, rows) {
            return new Array(cols).fill(null)
                .map(() => new Array(rows).fill(null)
                .map(() => Math.floor(Math.random() * 1.4))); // Más ceros que unos para un look más disperso
        }

        // Bucle principal de la animación.
        // Throttled to one generation every 0.2s (instead of once per frame)
        // so the automata background evolves at a calmer, more readable pace.
        const stepInterval = 200; // ms between generations
        let lastStep = 0;
        function gameLoop(now) {
            if (now - lastStep >= stepInterval) {
                lastStep = now;
                grid = computeNextGeneration(grid);
                draw(grid);
            }
            requestAnimationFrame(gameLoop);
        }

        // Calcula el estado de la siguiente generación basándose en las reglas del Juego de la Vida
        function computeNextGeneration(grid) {
            const nextGen = grid.map(arr => [...arr]);
            for (let col = 0; col < grid.length; col++) {
                for (let row = 0; row < grid[col].length; row++) {
                    const cell = grid[col][row];
                    let numNeighbors = 0;
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            if (i === 0 && j === 0) continue;
                            const x_cell = col + i;
                            const y_cell = row + j;

                            if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
                                const currentNeighbor = grid[x_cell][y_cell];
                                numNeighbors += currentNeighbor;
                            }
                        }
                    }

                    // Reglas del Juego de la Vida
                    if (cell === 1 && (numNeighbors < 2 || numNeighbors > 3)) {
                        nextGen[col][row] = 0;
                    } else if (cell === 0 && numNeighbors === 3) {
                        nextGen[col][row] = 1;
                    }
                }
            }
            return nextGen;
        }

        // Dibuja la retícula en el canvas
        function draw(grid) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let col = 0; col < grid.length; col++) {
                for (let row = 0; row < grid[col].length; row++) {
                    if (grid[col][row] === 1) {
                        ctx.fillStyle = cellColor();
                        ctx.fillRect(col * resolution, row * resolution, resolution - 1, resolution - 1);
                    }
                }
            }
        }
        
        // Inicialización
        setup();
        setTimeout(gameLoop, 200); // Iniciar bucle

        // Manejar redimensionamiento de la ventana
        window.addEventListener('resize', setup);

        // Rotate the hero facts every 10 seconds.
        factsTimer = setInterval(() => {
            factIndex = (factIndex + 1) % facts.length;
        }, 10000);

        return () => {
            window.removeEventListener('resize', setup);
            clearInterval(factsTimer);
        };
    });
</script>

<svelte:window on:mousemove={handleMousemove} />

<section>
    <canvas bind:this={canvas} id="automata-bg"></canvas>

    <div
        class="content-wrapper"
        style="transform: translate({parallaxX * -30}px, {parallaxY * -20}px);"
    >
        <h1 use:staggeredFadeIn={{ delay: 200, stagger: 70 }}>CELAUT</h1>
        
        <h2 use:staggeredFadeIn={{ delay: 800, stagger: 20 }}>
            A Peer-to-Peer Architecture for Software Design and Distribution
        </h2>
        
        <div class="facts" in:fly={{ y: 20, duration: 600, delay: 1600 }} aria-live="polite">
            {#key factIndex}
                <p
                    class="fact"
                    in:fly={{ y: 14, duration: 500, delay: 180 }}
                    out:fade={{ duration: 260 }}
                >
                    {facts[factIndex]}
                </p>
            {/key}
        </div>

        <div class="buttons" in:fly={{ y: 20, duration: 600, delay: 2600 }}>
            <a class="button primary" href="#applications" on:click={scrollToApps}>Start to use it</a>
            <a
                class="button secondary"
                href="#foundations"
                on:click={scrollToLearnMore}>Learn More</a
            >
        </div>
    </div>
</section>

<style>
    section {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background-color: var(--surface-deep); /* Fondo sólido como fallback */
        overflow: hidden; /* Oculta lo que se salga de la sección */
        position: relative;
    }

    #automata-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .content-wrapper {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: var(--accent);
        transition: transform 0.2s ease-out; /* Transición suave para el parallax */
    }

    h1 {
        font-size: clamp(3.5rem, 10vw, 6rem);
        /* Weight + tighter tracking carry the emphasis now, not a heavy glow. */
        font-weight: 800;
        margin: 0;
        letter-spacing: 0.03em;
        /* Subtle depth instead of a soft halo — keeps the letters crisp. */
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
        /* Sharper edges on high-DPI displays. */
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        opacity: 0; /* Oculto inicialmente, la acción 'staggeredFadeIn' lo hará visible */
    }

    /* Light theme: the coral accent washes out against the cream surface, so
       deepen the title to a terracotta for real contrast while keeping the
       warm brand tone. Dark mode already reads crisp, so it's left untouched. */
    :global(html[data-theme='light']) h1 {
        color: #bf5836;
    }

    h2 {
        font-size: clamp(1.2rem, 4vw, 1.75rem);
        margin: 20px 0;
        font-weight: 400;
        max-width: 600px;
        text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
        opacity: 0;
    }

    /* Light theme: the pale coral subtitle blends into the cream surface, and
       the heavy dark shadow reads muddy on a light background. Deepen it to a
       muted terracotta (a step lighter than the title, to keep the hierarchy)
       and swap the shadow for a soft light halo. */
    :global(html[data-theme='light']) h2 {
        color: #9c4b32;
        text-shadow: 0 1px 2px rgba(var(--surface-rgb), 0.6);
    }

    /* Translucent card holds the rotating facts above the busy automata
       background, so the body copy stays readable in both themes. Fixed
       min-height reserves the space, so cycling facts never shift layout. */
    .facts {
        position: relative;
        width: 100%;
        max-width: 720px;
        min-height: 6.5em;
        margin: 28px auto 0;
        border-radius: 14px;
        background: rgba(var(--surface-rgb), 0.62);
        border: 1px solid rgba(var(--on-surface-rgb), 0.14);
        box-shadow: 0 10px 34px rgba(0, 0, 0, 0.18);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
    }

    .fact {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 20px 28px;
        text-align: center;
        font-size: clamp(1rem, 2.4vw, 1.2rem);
        line-height: 1.6;
        /* Full-strength on-surface colour + no text-shadow: crisp and high
           contrast against the card in both light and dark themes. */
        color: var(--on-surface);
    }

    .buttons {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }

    .button {
        display: inline-block;
        text-decoration: none;
        padding: 12px 28px;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 700;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .primary {
        background-color: var(--accent);
        color: var(--on-accent);
        border-color: var(--accent);
    }

    .primary:hover {
        background-color: var(--accent-hover);
        border-color: var(--accent-hover);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }

    .secondary {
        background-color: transparent;
        color: var(--on-surface);
        border-color: var(--on-surface);
    }

    .secondary:hover {
        background-color: var(--on-surface);
        color: var(--surface);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }
</style>