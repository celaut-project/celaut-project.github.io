<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

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
     * Una acción de Svelte que divide el texto de un nodo en caracteres,
     * y los anima secuencialmente para un efecto de aparición escalonada.
     * @param {HTMLElement} node - El elemento DOM.
     * @param {object} params - Parámetros de configuración.
     * @param {number} params.delay - Retraso inicial antes de que comience la animación.
     * @param {number} params.duration - Duración de la animación de cada carácter.
     * @param {number} params.stagger - Retraso entre la animación de cada carácter.
     */
    function staggeredFadeIn(node, { delay = 0, duration = 300, stagger = 30 }) {
        const text = node.textContent;
        const chars = text.split('');
        
        node.textContent = ''; // Limpiar el nodo para llenarlo con spans
        node.style.opacity = 1; // Hacemos visible el contenedor

        chars.forEach((char, i) => {
            const span = document.createElement('span');
            // Si el carácter es un espacio, usamos un espacio duro para que no se colapse
            span.textContent = char === ' ' ? '\u00A0' : char; 
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(25px)';
            span.style.transition = `all ${duration}ms ease-out ${delay + i * stagger}ms`;
            node.appendChild(span);

            // Disparamos la animación después de un pequeño tick para que el navegador la registre
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 20);
        });

        return {
            destroy() {
                // Lógica de limpieza si fuera necesaria
            }
        };
    }


    // --- 3. LÓGICA PARA EL FONDO DE AUTÓMATAS CELULARES (JUEGO DE LA VIDA) ---
    
    let canvas; // Variable para enlazar con el elemento <canvas>

    onMount(() => {
        const ctx = canvas.getContext('2d');
        let cols, rows, grid;
        const resolution = 25; // Tamaño en píxeles de cada celda
        const cellColor = '#2a5a58'; // Color de las celdas "vivas"

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

        // Bucle principal de la animación
        function gameLoop() {
            grid = computeNextGeneration(grid);
            draw(grid);
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
                        ctx.fillStyle = cellColor;
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

        return () => {
            window.removeEventListener('resize', setup);
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
            A Peer-to-Peer Architecture for Decentralized Software
        </h2>
        
        <p use:staggeredFadeIn={{ delay: 1600, stagger: 10 }}>
            Inspired by cellular automata, Celaut is a revolutionary peer-to-peer architecture for software design and distribution built on decentralization, simplicity, and determinism principles.
        </p>

        <div class="buttons" in:fly={{ y: 20, duration: 600, delay: 2600 }}>
            <a
                class="button primary"
                href="https://github.com/celaut-project/nodo?tab=readme-ov-file#installation"
                target="_blank"
                rel="noopener noreferrer">Start to use it</a
            >
            <a
                class="button secondary"
                href="https://github.com/celaut-project/paradigm"
                target="_blank"
                rel="noopener noreferrer">Learn More</a
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
        background-color: #102827; /* Fondo sólido como fallback */
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
        color: #ef9c82;
        transition: transform 0.2s ease-out; /* Transición suave para el parallax */
    }

    h1 {
        font-size: clamp(3.5rem, 10vw, 6rem);
        font-weight: 700;
        margin: 0;
        letter-spacing: 0.1em;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
        opacity: 0; /* Oculto inicialmente, la acción 'staggeredFadeIn' lo hará visible */
    }

    h2 {
        font-size: clamp(1.2rem, 4vw, 1.75rem);
        margin: 20px 0;
        font-weight: 400;
        max-width: 600px;
        text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
        opacity: 0;
    }

    p {
        font-size: 1.1rem;
        margin: 0 auto;
        line-height: 1.7;
        max-width: 700px;
        color: rgba(249, 238, 231, 0.85);
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
        opacity: 0;
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
        background-color: #ef9c82;
        color: #1d4241;
        border-color: #ef9c82;
    }

    .primary:hover {
        background-color: #e88a6f;
        border-color: #e88a6f;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }

    .secondary {
        background-color: transparent;
        color: #f9eee7;
        border-color: #f9eee7;
    }

    .secondary:hover {
        background-color: #f9eee7;
        color: #1d4241;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }
</style>