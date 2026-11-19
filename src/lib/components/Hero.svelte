<script context="module">
    // Lives as long as the page does: a reload replays the opening, while
    // coming back to the home page from another route inside the site (the
    // module stays loaded) does not.
    let introPlayed = false;
</script>

<script>
    import { onMount, tick, createEventDispatcher } from 'svelte';
    import GlossaryGuide from './glossary/GlossaryGuide.svelte';
    import HeroLogo from './HeroLogo.svelte';
    import { fly, fade } from 'svelte/transition';
    import { locale, t, href } from '$lib/i18n/index.js';
    import { createViewportGate, releaseCanvas } from '$lib/motion.js';

    // --- ROTATING HERO CARDS ---
    // One card at a time, rotated every 4s with a subtle fade + vertical
    // slide. The pool mixes three kinds: the short architecture facts, the
    // three roles and the three applications. Roles and applications live
    // at the bottom of a very long page, and most visitors never get there
    // — so they get a turn up here too, each linking straight to its page.
    // The wrapper below is sized with a fixed min-height so swapping cards
    // never shifts the surrounding layout.
    $: facts = $t('home.hero.facts');
    const appLinks = ['/depin', 'https://celaut-project.github.io/skills', 'https://game-of-prompts.github.io'];
    const roleLinks = ['/depin', '/developers', '/users'];
    $: appCards = [...$t('home.applications.layer'), $t('home.applications.builtOn')].map((app, i) => ({
        kind: 'app',
        tag: i < 2 ? $t('home.applications.layerTag') : $t('home.applications.builtOnTag'),
        title: app.name,
        // The string already carries its own arrow; the template adds one.
        cta: $t('common.readMore').replace(/\s*→\s*$/, ''),
        href: appLinks[i]
    }));
    $: roleCards = $t('home.roles.items').map((role, i) => ({
        kind: 'role',
        tag: role.eyebrow,
        title: role.title,
        body: role.points[0],
        cta: role.primary,
        href: roleLinks[i]
    }));
    // Interleave so two link cards never sit back to back: a fact, then a
    // role or an app, then a fact again. Facts outnumber the rest, so the
    // tail of the cycle is plain facts.
    $: cards = (() => {
        const links = [];
        const roles = [...roleCards];
        const apps = [...appCards];
        while (roles.length || apps.length) {
            if (roles.length) links.push(roles.shift());
            if (apps.length) links.push(apps.shift());
        }
        const out = [];
        facts.forEach((text, i) => {
            out.push({ kind: 'fact', body: text });
            if (links[i]) out.push(links[i]);
        });
        return out.concat(links.slice(facts.length));
    })();
    let cardIndex = 0;
    let cardsTimer;
    /** @type {HTMLDivElement} */
    let banner;
    // Clamp so a shorter translation can never leave the index out of range.
    $: safeCardIndex = ((cardIndex % cards.length) + cards.length) % cards.length;
    $: card = cards[safeCardIndex];
    // Direction of the last move, so the transition slides the way the
    // reader just pushed. +1 forward (new card enters from below, as the
    // automatic rotation has always done), -1 back.
    let cardDir = 1;

    /*
     * MANUAL NAVIGATION
     * -----------------
     * The banner rotated on a timer and offered no way to go back, so a
     * card that caught the reader's eye was gone before they could read
     * it and there was no way to return to it. Arrows on either side,
     * dots underneath, and the left/right keys once the group has focus.
     *
     * A manual move also HOLDS the rotation for a while rather than
     * merely resetting the 4s interval: someone stepping through the
     * cards is reading them, and having the next one arrive under their
     * eyes mid-sentence is the same bug in a different costume. The
     * hold is generous (12s) and self-expiring, so the banner resumes
     * on its own without needing a "play" control nobody would press.
     */
    const HOLD_AFTER_INPUT = 12000;
    let holdUntil = 0;

    /** @param {number} delta */
    function step(delta) {
        cardDir = delta < 0 ? -1 : 1;
        cardIndex = safeCardIndex + delta;
        holdUntil = Date.now() + HOLD_AFTER_INPUT;
    }

    /** @param {number} i */
    function goTo(i) {
        if (i === safeCardIndex) return;
        cardDir = i > safeCardIndex ? 1 : -1;
        cardIndex = i;
        holdUntil = Date.now() + HOLD_AFTER_INPUT;
    }

    /**
     * Left/right anywhere inside the banner. Only those two keys are
     * claimed, and only when no modifier is held, so nothing here can
     * swallow a browser or screen-reader shortcut.
     *
     * @param {KeyboardEvent} event
     */
    function handleBannerKeydown(event) {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        // In an RTL document the left key still means "the card on the
        // left", which is the NEXT one when the row is mirrored.
        const rtl = document.documentElement.getAttribute('dir') === 'rtl';
        if (event.key === 'ArrowLeft') step(rtl ? 1 : -1);
        else if (event.key === 'ArrowRight') step(rtl ? -1 : 1);
        else return;
        event.preventDefault();
    }

    /**
     * Attach the arrow-key handler imperatively.
     *
     * As an `on:keydown` attribute this trips `a11y_no_noninteractive_
     * element_interactions`, and the lint rule is right about the shape
     * of the thing even though it is wrong about this instance: the
     * banner is a role="group" that is not itself focusable, and the
     * keys are only ever delivered here because one of the real buttons
     * INSIDE it has focus and the event bubbled. Nothing is keyboard-
     * inaccessible — the arrows and dots are ordinary buttons — so the
     * listener is attached here rather than silenced with an
     * `svelte-ignore` that would also hide a genuine regression later.
     *
     * @param {HTMLElement} node
     */
    function arrowKeys(node) {
        node.addEventListener('keydown', handleBannerKeydown);
        return {
            destroy() {
                node.removeEventListener('keydown', handleBannerKeydown);
            }
        };
    }

    // --- OPENING ---------------------------------------------------------
    // 1. BUILD   The logo assembles itself cell by cell, huge, centred, and
    //            nothing else is on screen (see HeroLogo.svelte).
    // 2. SETTLE  It shrinks and glides up; the wordmark and tagline write
    //            themselves underneath. Nothing else yet.
    // 3. REVEAL  At the first small scroll (or a click on the hint) the
    //            index rail, the tips carousel and the buttons fade in.
    // Coming back to the home page inside the site, a reload part-way down the page, a
    // #hash link and reduced motion all skip straight to the finished state.
    const dispatch = createEventDispatcher();
    const BUILD = 2900; // ms until the last cell of the logo has landed
    const SETTLE = 1100; // ms the logo takes to shrink into place
    const fast = (() => {
        if (typeof window === 'undefined') return false;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
        return window.scrollY > 0 || !!location.hash || introPlayed;
    })();
    const TITLE_AT = fast ? 200 : BUILD + 600;

    let stage = 'build'; // 'build' | 'done'
    let extras = false; // index rail, carousel and buttons are visible
    let measured = false; // the logo has been placed for its big phase
    let instant = false; // finished logo, no build
    let markStyle = '';
    let liftShift = 0; // px the title block sits below its final spot
    let glide = false;
    let extrasEl;

    // The tagline's reveal is choreographed to land after the wordmark on
    // first paint. A later replay (a language switch) should be immediate —
    // the visitor is already looking at it.
    let taglineDelay = fast ? 0 : TITLE_AT + 300;



    // --- 1. THE POINTER ---
    // The logo, wordmark and tagline stay perfectly still. Only the
    // background automaton reacts to the mouse (see nextGeneration). These
    // are plain variables, not template state, so moving the mouse never
    // re-renders the hero.
    let pointerX = 0;
    let pointerY = 0;
    let pointerOn = false;

    function handleMousemove(event) {
        pointerX = event.clientX;
        pointerY = event.clientY;
        pointerOn = true;
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
        // Splitting Arabic (and any RTL script) into per-character spans
        // destroys letter joining. Fade the whole string instead.
        const isRTL =
            typeof document !== 'undefined' &&
            document.documentElement.getAttribute('dir') === 'rtl';
        if (isRTL) {
            node.style.opacity = '0';
            const timer = setTimeout(() => {
                node.style.transition = `opacity ${duration}ms ease-out`;
                node.style.opacity = '1';
            }, delay);
            return {
                destroy() {
                    clearTimeout(timer);
                }
            };
        }

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

    // "Start to use it" glides to the audience fork, where visitors pick the
    // role that matches them (node maintainer / developer / user) and leave
    // for the dedicated page, rather than being dropped onto /install.
    function scrollToRoles(event) {
        event.preventDefault();
        const target =
            document.getElementById('user-roles') || document.getElementById('applications');
        if (!target) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }

    // True only while the hero backdrop is on screen; the pointer handler
    // and the automata loop both read it. The hero is one viewport tall at
    // the very top of a very long page, so for most of a visit this is
    // false and all of this work can simply not happen.
    let heroLive = false;
    let markEl;
    let revealNow = () => {};

    onMount(() => {
        // After the first reveal, a language switch replays the tagline at once.
        const tagTimer = setTimeout(() => (taglineDelay = 0), TITLE_AT + 1500);
        // ---- opening sequence ----
        let destroyed = false;
        let settled = false;
        let wantExtras = false;
        const timers = [];

        function reveal() {
            if (extras) return;
            glide = true;
            liftShift = 0;
            extras = true;
            dispatch('reveal');
        }

        const onIntent = (e) => {
            if (e.type === 'scroll' && window.scrollY < 4) return;
            if (e.type === 'wheel' && e.deltaY <= 0) return;
            if (e.type === 'keydown' && !['ArrowDown', 'PageDown', ' ', 'End', 'Tab'].includes(e.key)) return;
            wantExtras = true;
            if (settled) reveal();
        };
        window.addEventListener('scroll', onIntent, { passive: true });
        window.addEventListener('wheel', onIntent, { passive: true });
        window.addEventListener('touchmove', onIntent, { passive: true });
        window.addEventListener('keydown', onIntent);
        revealNow = reveal;

        const startOpening = async () => {
            if (fast) {
                instant = true;
                measured = true;
                stage = 'done';
                settled = true;
                reveal();
                started = true;
                if (!reducedMotion()) seedFromMark();
                return;
            }
            introPlayed = true;
            // Park the title block lower by half the height of what will
            // appear later, so the opening sits in the middle of the screen.
            liftShift = Math.round((extrasEl?.offsetHeight || 0) / 2);
            await tick();
            if (destroyed) return;
            // Scale and move the finished logo to the middle of the window.
            const r = markEl.getBoundingClientRect();
            const target = bigSize();
            const k = target / r.width;
            const dx = window.innerWidth / 2 - (r.left + r.width / 2);
            const dy = window.innerHeight / 2 - (r.top + r.height / 2);
            markStyle = `transform: translate(${dx}px, ${dy}px) scale(${k}); transition: none;`;
            measured = true;
            seedFromLogo();
            timers.push(
                // The glider starts to travel as the logo pulls away.
                setTimeout(() => (started = true), BUILD + 500),
                setTimeout(() => {
                    markStyle = `transform: none; transition: transform ${SETTLE}ms cubic-bezier(0.65, 0, 0.25, 1);`;
                }, BUILD),
                setTimeout(() => {
                    stage = 'done';
                    settled = true;
                    if (wantExtras || window.scrollY > 4) reveal();
                }, BUILD + SETTLE)
            );
        };

        let ctx = canvas.getContext('2d');

        // ---- Background automaton ------------------------------------------
        // The logo is a Game of Life glider, and the background is the same
        // kind of automaton picking up where the logo leaves off:
        //   * the grid is the logo's own grid, scaled to the big opening
        //     logo, so each of its cells lands exactly on a grid cell;
        //   * the five live cells of the logo are the seed of the field.
        //     When the logo shrinks they stay behind, and from there the
        //     pattern spreads out in every direction, chaotically.
        // Plain Life would send that glider off in one straight line, so the
        // field runs "Seeds" (a cell is born with exactly two live
        // neighbours, and no cell survives): from five cells it explodes
        // outwards and never dies out or freezes. It is kept quiet by being
        // faint, and by each cell fading out as it dies.
        const LOGO_VIEW = 244; // the logo's viewBox, and the numbers below
        const LOGO_PITCH = 31.5; // distance between cell origins
        const LOGO_CELL = 27.5; // cell size
        const LOGO_RX = 6; // cell corner radius
        const LOGO_X0 = -8.25 + 22; // first cell's offset inside the viewBox
        const LOGO_Y0 = 7.5 + 22;
        const PAD = 3; // cells kept beyond every screen edge
        // The glider of the logo: [row, col] in its 7x6 grid.
        const LOGO_GLIDER = [[1, 3], [2, 4], [3, 2], [3, 3], [3, 4]];
        const STEP_MS = 900; // ms between generations: slow, so it never feels busy
        const FADE_IN = 450; // ms for a new cell to come into view
        const FADE_OUT = 1500; // ms for a dead cell to fade away
        const STIR_MS = 110; // ms between pointer stirs
        const ALPHA = 0.16; // overall strength of the backdrop
        const TEXT_DIM = 0.35; // share of that strength kept right behind the text

        let R = 30; // px per grid cell
        let gx0 = 0;
        let gy0 = 0;
        let cols = 0;
        let rows = 0;
        let alive = null;
        let hue = null; // 0 coral, 1 teal (just born), 2 woken by the pointer
        let shown = null; // how visible each cell is right now, eased 0..1
        let gen = 0;
        let started = false;
        // Whether the canvas currently owns a pixel buffer. The hero is a
        // full-window canvas (~8MB at 1920x1080, and four times that on a
        // retina panel), so it is worth handing back once it has scrolled
        // away — the reader is nine scenes deep and cannot see it.
        let allocated = false;
        let laidOut = '';

        // Size of the logo during the opening (see startOpening).
        const bigSize = () => Math.min(window.innerHeight * 0.4, window.innerWidth * 0.6, 360);

        // Builds the grid for the current window. The big logo sits in the
        // middle of the window, so the grid is aligned to where its cells are.
        function layout() {
            const S = bigSize();
            const u = S / LOGO_VIEW;
            R = LOGO_PITCH * u;
            const left = window.innerWidth / 2 - S / 2 + LOGO_X0 * u;
            const top = window.innerHeight / 2 - S / 2 + LOGO_Y0 * u;
            gx0 = (((left % R) + R) % R) - PAD * R;
            gy0 = (((top % R) + R) % R) - PAD * R;
            cols = Math.ceil((window.innerWidth - gx0) / R) + PAD;
            rows = Math.ceil((window.innerHeight - gy0) / R) + PAD;
            alive = new Uint8Array(cols * rows);
            hue = new Uint8Array(cols * rows);
            shown = new Float32Array(cols * rows);
            laidOut = `${window.innerWidth}x${window.innerHeight}`;
        }

        function place(pattern, c0, r0) {
            for (const [r, c] of pattern) {
                const i = (r0 + r) * cols + (c0 + c);
                if (c0 + c < 1 || r0 + r < 1 || c0 + c >= cols - 1 || r0 + r >= rows - 1) continue;
                alive[i] = 1;
                hue[i] = 0;
                shown[i] = 1;
            }
        }

        // The glider of the big logo, exactly under the logo's own cells.
        function seedFromLogo() {
            if (!alive) layout();
            const S = bigSize();
            const u = S / LOGO_VIEW;
            const left = window.innerWidth / 2 - S / 2 + LOGO_X0 * u;
            const top = window.innerHeight / 2 - S / 2 + LOGO_Y0 * u;
            place(LOGO_GLIDER, Math.round((left - gx0) / R), Math.round((top - gy0) / R));
            draw();
        }

        // Same seed, placed behind the small logo: for visits that skip the
        // opening, and to restart the field if it ever empties.
        function seedFromMark() {
            if (!alive) layout();
            if (!markEl) return;
            const m = markEl.getBoundingClientRect();
            const ci = Math.floor((m.left + m.width / 2 - gx0) / R);
            const ri = Math.floor((m.top + m.height / 2 - gy0) / R);
            place(LOGO_GLIDER, ci - 3, ri - 2);
        }

        function setup() {
            if (!allocated) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Only rebuild when the window changed shape: releasing the
            // backing store must not wipe the glider in flight.
            if (!alive || laidOut !== `${window.innerWidth}x${window.innerHeight}`) {
                layout();
                if (started) seedFromMark();
            }
        }

        function allocate() {
            if (allocated) return;
            allocated = true;
            setup();
            draw();
        }

        function release() {
            if (!allocated) return;
            allocated = false;
            releaseCanvas(canvas);
        }

        // One generation. The outermost ring of cells is kept dead, so the
        // pattern simply vanishes off screen at the edges.
        function nextGeneration() {
            const next = new Uint8Array(alive.length);
            for (let r = 1; r < rows - 1; r++) {
                for (let c = 1; c < cols - 1; c++) {
                    const i = r * cols + c;
                    const n =
                        alive[i - cols - 1] + alive[i - cols] + alive[i - cols + 1] +
                        alive[i - 1] + alive[i + 1] +
                        alive[i + cols - 1] + alive[i + cols] + alive[i + cols + 1];
                    // Seeds: born with exactly two neighbours, never survives.
                    next[i] = n === 2 && !alive[i] ? 1 : 0;
                }
            }
            for (let i = 0; i < next.length; i++) {
                if (next[i] && !alive[i]) hue[i] = 1;
            }
            alive = next;
            // Should the field ever run empty, the logo starts it again.
            if (!next.includes(1)) seedFromMark();
        }

        const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // The pointer stirs the field: the cells under and around it wake up
        // with some chance. Under the Seeds rule those cells breed their
        // neighbours at the next generation, so a sweep of the mouse leaves
        // a spreading, chaotic trail. Done between generations, so the
        // cursor answers at once even though the field itself is slow.
        function stirPointer() {
            const pc = Math.floor((pointerX - gx0) / R);
            const pr = Math.floor((pointerY - gy0) / R);
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const rr = pr + dr;
                    const cc = pc + dc;
                    if (rr < 1 || cc < 1 || rr >= rows - 1 || cc >= cols - 1) continue;
                    if (Math.random() < 0.5) {
                        alive[rr * cols + cc] = 1;
                        hue[rr * cols + cc] = 2;
                    }
                }
            }
        }

        // Calm pace: one generation every STEP_MS, and in between every
        // cell eases towards its target (in over FADE_IN, out over FADE_OUT)
        // instead of switching, so nothing flickers. Runs only while the
        // hero is on screen and the tab is in the foreground (viewport gate).
        let lastStep = 0;
        let lastStir = 0;
        let lastFrame = 0;
        let raf = 0;
        function gameLoop(now) {
            const still = reducedMotion();
            const dt = Math.min(100, now - (lastFrame || now));
            lastFrame = now;
            if (alive && started && !still) {
                if (now - lastStep >= STEP_MS) {
                    lastStep = now;
                    nextGeneration();
                    gen++;
                }
                if (pointerOn && now - lastStir >= STIR_MS) {
                    lastStir = now;
                    stirPointer();
                }
                const up = 1 - Math.exp(-dt / FADE_IN);
                const down = 1 - Math.exp(-dt / FADE_OUT);
                let moving = false;
                for (let i = 0; i < shown.length; i++) {
                    const target = alive[i];
                    const v = shown[i];
                    if (v === target) continue;
                    const nv = v + (target - v) * (target > v ? up : down);
                    shown[i] = Math.abs(nv - target) < 0.01 ? target : nv;
                    moving = true;
                }
                if (moving) draw();
            }
            raf = requestAnimationFrame(gameLoop);
        }
        function startLoop() {
            if (raf) return;
            lastStep = 0;
            raf = requestAnimationFrame(gameLoop);
        }
        function stopLoop() {
            if (!raf) return;
            cancelAnimationFrame(raf);
            raf = 0;
        }

        // Theme colours: coral for live cells, the logo's teal for the ones
        // just born, both from the palette so they follow light and dark.
        const rgb = (name, fallback) => {
            const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
            const m = /^#([0-9a-f]{6})$/i.exec(v);
            if (!m) return fallback;
            const n = parseInt(m[1], 16);
            return [n >> 16, (n >> 8) & 255, n & 255];
        };

        function draw() {
            if (!allocated || !alive) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const warm = rgb('--viz-warm', [239, 156, 130]);
            const teal = rgb('--viz-node', [111, 227, 196]);
            const size = (LOGO_CELL / LOGO_PITCH) * R;
            const inset = (R - size) / 2;
            const radius = (LOGO_RX / LOGO_PITCH) * R;
            const round = typeof ctx.roundRect === 'function';
            // The wordmark and tagline sit in a central column; cells behind
            // it are dimmed so the text stays easy to read, and they return
            // to full strength towards the sides.
            const mid = canvas.width / 2;
            const half = Math.min(340, canvas.width * 0.4);
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const i = r * cols + c;
                    const g = shown[i];
                    if (g < 0.03) continue;
                    const touched = hue[i] === 2;
                    const col = hue[i] === 1 ? teal : warm;
                    const x = gx0 + c * R + inset;
                    const away = Math.min(1, Math.abs(x + size / 2 - mid) / half);
                    const dim = TEXT_DIM + (1 - TEXT_DIM) * away * away;
                    ctx.fillStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${Math.min(0.6, ALPHA * (touched ? 3 : dim) * g)})`;
                    const y = gy0 + r * R + inset;
                    if (round) {
                        ctx.beginPath();
                        ctx.roundRect(x, y, size, size, radius);
                        ctx.fill();
                    } else {
                        ctx.fillRect(x, y, size, size);
                    }
                }
            }
        }

        // Inicialización — allocation and the loop are both driven by the
        // viewport gate, which fires immediately with the current state.
        const stopGate = createViewportGate(canvas, {
            onNear: (near) => (near ? allocate() : release()),
            onLive: (live) => {
                heroLive = live;
                live ? startLoop() : stopLoop();
            }
        });

        // Manejar redimensionamiento de la ventana. Debounced: a drag-resize
        // fires this continuously, and each call reallocates a full-window
        // backing store and re-seeds the grid.
        let resizeTimer;
        function onResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setup();
                draw();
            }, 150);
        }
        window.addEventListener('resize', onResize);

        // Rotate the hero cards every 4 seconds. Hold still while the
        // visitor is hovering or has focus on the card (they may be about
        // to click a link), while the hero is off screen, in a background
        // tab, or when they asked for reduced motion.
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const bannerOnScreen = () => {
            if (!banner) return false;
            const r = banner.getBoundingClientRect();
            return r.bottom > 0 && r.top < window.innerHeight;
        };
        cardsTimer = setInterval(() => {
            if (!extras || document.hidden || reduceMotion.matches || !bannerOnScreen()) return;
            if (banner?.matches(':hover, :focus-within')) return;
            // Someone is stepping through the cards by hand; stay put.
            if (Date.now() < holdUntil) return;
            cardDir = 1;
            cardIndex = cardIndex + 1;
        }, 4000);

        startOpening();

        return () => {
            stopLoop();
            stopGate();
            clearTimeout(resizeTimer);
            clearTimeout(tagTimer);
            destroyed = true;
            timers.forEach(clearTimeout);
            window.removeEventListener('scroll', onIntent);
            window.removeEventListener('wheel', onIntent);
            window.removeEventListener('touchmove', onIntent);
            window.removeEventListener('keydown', onIntent);
            window.removeEventListener('resize', onResize);
            clearInterval(cardsTimer);
            releaseCanvas(canvas);
        };
    });
</script>

<svelte:window on:mousemove={handleMousemove} />
<svelte:document on:mouseleave={() => (pointerOn = false)} />

<section>
    <canvas bind:this={canvas} id="automata-bg"></canvas>

    <div class="content-wrapper">
        <div
            class="top"
            class:glide
            style="transform: translateY({liftShift}px);"
        >
        <div class="mark" class:pending={!measured} class:rest={stage === 'done'} style={markStyle} bind:this={markEl}>
            <HeroLogo size={104} delay={150} {instant} />
        </div>
        <h1 dir="ltr" use:staggeredFadeIn={{ delay: TITLE_AT, stagger: 70 }}>CELAUT</h1>

        <!-- staggeredFadeIn rewrites the element's children into per-character
             spans, so Svelte can no longer patch the text in place. Keying on
             the locale remounts the heading instead, which re-runs the action
             and replays the reveal in the new language. -->
        {#key $locale}
            <h2 use:staggeredFadeIn={{ delay: taglineDelay, stagger: 20 }}>
                {$t('home.hero.tagline')}
            </h2>
        {/key}
        </div>

        <div class="extras" bind:this={extrasEl} aria-hidden={extras ? undefined : 'true'}>
        
        <!-- role="group" + a name, so the arrows, the card and the dots are
             announced as one thing rather than as three unrelated controls;
             the keydown handler lives here so the arrow keys work wherever
             focus is inside it. -->
        <div
            class="facts extra"
            class:shown={extras}
            style="--i: 0"
            bind:this={banner}
            aria-live="polite"
            role="group"
            aria-label={$t('common.carousel.nav')}
            use:arrowKeys
        >
            <button
                class="nav prev"
                type="button"
                on:click={() => step(-1)}
                aria-label={$t('common.carousel.prev')}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
                    stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 5 8 12l7 7" />
                </svg>
            </button>
            <button
                class="nav next"
                type="button"
                on:click={() => step(1)}
                aria-label={$t('common.carousel.next')}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
                    stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 5 7 7-7 7" />
                </svg>
            </button>

            {#key `${$locale}-${safeCardIndex}`}
                {#if card.kind === 'fact'}
                    <p
                        class="fact"
                        in:fly={{ y: 14 * cardDir, duration: 500, delay: 180 }}
                        out:fade={{ duration: 260 }}
                    >
                        <!-- The sentence lives in its own inline span, and that is
                             load-bearing rather than cosmetic. `.fact` is a flex
                             container (it centres the text in the fixed-height
                             card). The glossary annotator splits a paragraph's
                             single text node into `[Text, <button>, Text]` in
                             place — and direct children of a flex container each
                             become a flex ITEM, while whitespace-only anonymous
                             boxes between them are discarded outright. So the
                             moment a term matched here, one sentence turned into
                             two or three side-by-side columns with the spaces
                             eaten: "Lareputación" in one column, the rest in the
                             next. Wrapping the copy makes the flex container hold
                             exactly ONE item, so the split happens inside an
                             ordinary inline formatting context and reads as one
                             flowing sentence. -->
                        <span class="fact-text">{card.body}</span>
                    </p>
                {:else}
                    <!-- Role and application cards are one link each, so the
                         whole card is the click target. -->
                    <a
                        class="fact link-card"
                        href={$href(card.href)}
                        in:fly={{ y: 14 * cardDir, duration: 500, delay: 180 }}
                        out:fade={{ duration: 260 }}
                    >
                        <span class="card-tag">{card.tag}</span>
                        <strong class="card-title">{card.title}</strong>
                        {#if card.body}<span class="card-body">{card.body}</span>{/if}
                        <span class="card-cta">{card.cta} <span aria-hidden="true">→</span></span>
                    </a>
                {/if}
            {/key}
        </div>

        <!-- Dots: position AND direct access. Outside `.facts` because that
             box has a fixed height the cards fill absolutely; a row of dots
             inside it would sit on top of the prose. -->
        <div class="dots extra" class:shown={extras} style="--i: 1">
            {#each cards as _, i}
                <button
                    class="dot"
                    class:on={i === safeCardIndex}
                    type="button"
                    on:click={() => goTo(i)}
                    aria-label={$t('common.carousel.goTo').replace('{n}', String(i + 1))}
                    aria-current={i === safeCardIndex ? 'true' : undefined}
                ></button>
            {/each}
        </div>

        <div class="buttons extra" class:shown={extras} style="--i: 2">
            <a class="button primary" href="#user-roles" on:click={scrollToRoles}
                >{$t('home.hero.primary')}</a
            >
            <a class="button secondary" href="#foundations" on:click={scrollToLearnMore}
                >{$t('home.hero.secondary')}</a
            >
        </div>
        <div class="extra" class:shown={extras} style="--i: 3"><GlossaryGuide /></div>
        </div>
    </div>

    <button
        type="button"
        class="scroll-hint"
        class:on={stage === 'done' && !extras}
        tabindex={stage === 'done' && !extras ? 0 : -1}
        aria-label={$t('home.hero.secondary')}
        on:click={() => revealNow()}
    >
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
        </svg>
    </button>
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
        /* Exactly the window, 1:1 with the canvas pixels. The section is
           taller than the window (100vh plus its padding), and stretching
           the canvas to it skewed the grid away from the logo's cells. */
        width: 100vw;
        height: 100vh;
        z-index: 0;
    }

    .mark {
        /* Scales down on short screens so the hero still fits in one view. */
        --mark: clamp(60px, 10.5vh, 112px);
        width: var(--mark);
        height: var(--mark);
        margin-bottom: 10px;
    }

    /* The title block (logo, wordmark, tagline) and the part that appears on
       the first scroll. The latter keeps its space reserved so nothing
       jumps when it fades in. */
    .top,
    .extras {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .top.glide {
        transition: transform 900ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .extra {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(16px);
        transition:
            opacity 0.6s ease calc(var(--i, 0) * 110ms),
            transform 0.6s ease calc(var(--i, 0) * 110ms),
            visibility 0s 0.8s;
    }
    .extra.shown {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: none;
        transition:
            opacity 0.6s ease calc(var(--i, 0) * 110ms + 250ms),
            transform 0.6s ease calc(var(--i, 0) * 110ms + 250ms),
            visibility 0s;
    }

    .scroll-hint {
        position: absolute;
        /* The section is 100vh plus its 20px padding, so the bottom 40px
           can sit under the fold; keep the hint clear of it. */
        bottom: 64px;
        left: 50%;
        z-index: 2;
        width: 44px;
        height: 44px;
        margin-left: -22px;
        padding: 0;
        border: none;
        background: none;
        color: var(--accent-text);
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.8s ease 0.4s, visibility 0s 1.2s;
    }
    .scroll-hint.on {
        opacity: 0.85;
        visibility: visible;
        transition: opacity 0.8s ease 0.4s, visibility 0s;
        animation: hint-bob 1.8s ease-in-out 1.2s infinite;
    }
    .scroll-hint svg {
        width: 32px;
        height: 32px;
    }
    @keyframes hint-bob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(7px); }
    }

    .mark {
        position: relative;
        z-index: 3;
    }
    /* Shadow only once the mark is small: scaled up with the logo it
       became a wide grey halo. */
    .mark :global(.logo) {
        transition: filter 0.6s ease;
    }
    .mark.rest :global(.logo) {
        filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.2));
    }
    /* No tile on the light page, so no shadow either. */
    :global(:root[data-theme='light']) .mark.rest :global(.logo) {
        filter: none;
    }
    .mark.pending {
        opacity: 0;
    }

    .mark :global(svg) {
        width: 100%;
        height: 100%;
    }

    @media (prefers-reduced-motion: reduce) {
        .scroll-hint.on {
            animation: none;
        }
        .extra,
        .top.glide {
            transition: none;
        }
    }

    .content-wrapper {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: var(--on-surface);
    }

    h1 {
		direction: ltr;
		unicode-bidi: isolate;
        font-size: clamp(3.5rem, 10vw, 6rem);
        /* Weight + tighter tracking carry the emphasis now, not a heavy glow. */
        font-weight: 800;
        margin: 0;
        letter-spacing: 0.03em;
        color: var(--accent-text);
        /* Halo in the surface colour, so it lifts the type off the busy
           automata canvas in BOTH themes (a black shadow read as grime on
           the cream light surface). */
        text-shadow: 0 2px 10px rgba(var(--surface-rgb), 0.85);
        /* Sharper edges on high-DPI displays. */
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        opacity: 0; /* Oculto inicialmente, la acción 'staggeredFadeIn' lo hará visible */
    }

    /* Both themes now resolve the title through --accent-text (lifted coral in
       dark, deep terracotta in light), so no per-theme hex override is needed. */

    h2 {
        font-size: clamp(1.2rem, 4vw, 1.75rem);
        margin: 20px 0;
        font-weight: 400;
        max-width: 600px;
        color: var(--on-surface);
        text-shadow: 0 1px 8px rgba(var(--surface-rgb), 0.9);
        opacity: 0;
    }



    /* Translucent card holds the rotating facts above the busy automata
       background, so the body copy stays readable in both themes. Fixed
       min-height reserves the space, so cycling facts never shift layout. */
    .facts {
        position: relative;
        width: 100%;
        max-width: 720px;
        min-height: 10em;
        margin: 28px auto 0;
        border-radius: 14px;
        background: rgba(var(--surface-rgb), 0.72);
        border: 1px solid var(--border);
        box-shadow: var(--shadow-md);
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

    /* The single flex item. Everything the glossary does happens inside
       here, where inline layout applies normally. */
    .fact-text {
        display: block;
    }

    /* Role / application cards: a small tag, the name, one line of what it
       is, and the page's own call to action. Same footprint as a fact. */
    .link-card {
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        padding: 12px 28px;
        text-decoration: none;
        line-height: 1.4;
        transition: border-color 0.2s ease, background-color 0.2s ease;
    }
    .link-card:hover,
    .link-card:focus-visible {
        background: rgba(var(--surface-rgb), 0.9);
    }
    .link-card:focus-visible {
        outline: 2px solid var(--accent-text);
        outline-offset: 3px;
        border-radius: 14px;
    }
    .card-tag {
        font-size: 0.75rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--on-surface-muted);
    }
    .card-title {
        font-size: clamp(1.1rem, 2.6vw, 1.35rem);
        color: var(--on-surface);
    }
    .card-body {
        font-size: clamp(0.9rem, 2vw, 1rem);
        color: var(--on-surface-muted);
    }
    .card-cta {
        margin-top: 4px;
        font-size: 0.9rem;
        color: var(--accent-text);
    }
    /* --- MANUAL NAVIGATION --------------------------------------- *
       The arrows sit ON the card's edge rather than outside it: the
       banner is already as wide as the hero allows, and putting them
       outside would either narrow the prose or push them off a phone
       screen. They are above the card (z-index) but the card's padding
       keeps the text clear of them, so neither overlaps the other's
       click target. */
    .nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border-radius: 50%;
        cursor: pointer;
        color: var(--on-surface-muted);
        background: rgba(var(--surface-rgb), 0.78);
        border: 1px solid var(--border);
        transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
    }
    .nav svg {
        width: 18px;
        height: 18px;
    }
    .nav:hover {
        color: var(--accent-text);
        border-color: var(--accent);
        background: var(--surface);
    }
    .nav:focus-visible {
        outline: 2px solid var(--accent-text);
        outline-offset: 2px;
    }
    .prev {
        left: -18px;
    }
    .next {
        right: -18px;
    }

    .dots {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-top: 14px;
        flex-wrap: wrap;
    }
    /* The hit area is the 22px button; the visible dot is the ::after.
       Sized for a fingertip without drawing a row of large circles. */
    .dot {
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 50%;
    }
    .dot::after {
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: rgba(var(--surface-rgb), 0.9);
        border: 1px solid var(--border-strong);
        transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
    }
    .dot:hover::after {
        border-color: var(--accent);
    }
    .dot.on::after {
        background: var(--accent);
        border-color: var(--accent);
        transform: scale(1.25);
    }
    .dot:focus-visible {
        outline: 2px solid var(--accent-text);
        outline-offset: 1px;
    }

    @media (prefers-reduced-motion: reduce) {
        .dot::after {
            transition: none;
        }
        .nav {
            transition: none;
        }
    }

    @media (max-width: 540px) {
        .facts {
            min-height: 11.5em;
        }
        .link-card {
            padding: 12px 18px;
        }
        /* No room to hang the arrows off the edge; tuck them inside and
           let the card's own padding hold the text clear. */
        .prev {
            left: 2px;
        }
        .next {
            right: 2px;
        }
        .fact {
            padding-left: 44px;
            padding-right: 44px;
        }
        .link-card {
            padding-left: 44px;
            padding-right: 44px;
        }
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
        box-shadow: var(--shadow-sm);
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
        box-shadow: var(--shadow-md);
    }

    .secondary {
        background-color: rgba(var(--surface-rgb), 0.55);
        color: var(--on-surface);
        border-color: var(--border-strong);
    }

    .secondary:hover {
        background-color: var(--on-surface);
        color: var(--surface);
        border-color: var(--on-surface);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
</style>
