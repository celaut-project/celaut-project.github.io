<script>
    // The Celaut mark, assembled cell by cell. The logo is a glider (the
    // smallest spaceship of Conway's Game of Life) over a faded grid. The
    // teal cell is the one the next generation will give birth to: it has
    // exactly three live neighbours. So the intro is not decoration, it is
    // the first steps of the same automaton that runs behind the title.
    //
    // Order of the build: the dim grid from the outside in, then the live
    // cells of the glider one by one, then the cell that is about to be born.
    export let size = 132;
    /** Delay before the first cell appears, in ms. */
    export let delay = 150;
    /** Show the finished mark at once, with no build (return visits). */
    export let instant = false;
    /** Purely decorative: hidden from screen readers (the name is beside it). */
    export let decorative = false;

    const PITCH_X = 31.5;
    const PITCH_Y = 31.5;
    const X0 = -8.25;
    const Y0 = 7.5;
    const CELL = 27.5;

    // Tier of each grid cell: 0 = outer edge ... 3 = centre. null = no cell.
    // The grid is a rounded 7x6 block, with the same fading rings as the logo.
    const GRID = [
        [null, 0, 1, 2, 1, 0, null],
        [null, 2, 3, 3, 3, 2, null],
        [0, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 0],
        [null, 2, 3, 3, 3, 2, null],
        [null, 0, 1, 2, 1, 0, null]
    ];
    // The empty cells are the theme's grid tone, fading out towards the
    // corners (as chatui's CellMark does). On the dark tile this gives the
    // original shades; on a light page the same tone is dark-on-cream.
    const TIER_ALPHA = [0.12, 0.5, 0.62, 1];
    const EDGE_ALPHA = 0.2; // the two cells at the ends of the middle rows

    // Live cells in the order they are drawn: [row, col, kind].
    const LIVE = [
        [1, 3, 'warm'],
        [2, 4, 'warm'],
        [3, 4, 'warm'],
        [3, 3, 'warm'],
        [3, 2, 'warm'],
        [4, 3, 'born']
    ];

    const STEP_DIM = 40; // ms between dim cells
    const STEP_LIVE = 150; // ms between live cells

    const live = new Map(LIVE.map(([r, c], i) => [`${r}:${c}`, { kind: LIVE[i][2], order: i }]));

    // Dim cells are ordered by how far they sit from the centre, so the grid
    // grows inward. The live ones replace the dim cell underneath them.
    const dimCells = [];
    GRID.forEach((row, r) =>
        row.forEach((tier, c) => {
            if (tier === null || live.has(`${r}:${c}`)) return;
            const dist = Math.hypot(r - 2.5, c - 3);
            dimCells.push({ r, c, alpha: tier === 0 && (c === 0 || c === 6) ? EDGE_ALPHA : TIER_ALPHA[tier], dist });
        })
    );
    dimCells.sort((a, b) => b.dist - a.dist);
    dimCells.forEach((cell, i) => (cell.at = delay + i * STEP_DIM));

    const liveStart = delay + dimCells.length * STEP_DIM + 120;
    const liveCells = LIVE.map(([r, c, kind], i) => ({ r, c, kind, at: liveStart + i * STEP_LIVE }));

    const x = (c) => X0 + c * PITCH_X;
    const y = (r) => Y0 + r * PITCH_Y;
</script>

<svg
    class="logo"
    class:instant
    viewBox="-22 -22 244 244"
    width={size}
    height={size}
    role={decorative ? undefined : 'img'}
    aria-label={decorative ? undefined : 'Celaut'}
    aria-hidden={decorative ? 'true' : undefined}
>
    <rect class="tile" x="-22" y="-22" width="244" height="244" rx="46" />
    {#each dimCells as cell}
        <rect
            class="cell dim"
            x={x(cell.c)}
            y={y(cell.r)}
            width={CELL}
            height={CELL}
            rx="6"
            fill-opacity={cell.alpha}
            style="animation-delay: {cell.at}ms"
        />
    {/each}
    {#each liveCells as cell}
        <rect
            class="cell live {cell.kind}"
            x={x(cell.c)}
            y={y(cell.r)}
            width={CELL}
            height={CELL}
            rx="6"
            style="animation-delay: {cell.at}ms"
        />
    {/each}
</svg>

<style>
    .logo {
        display: block;
        overflow: visible;
        shape-rendering: geometricPrecision;
    }

    /* Colours come from the site's tokens, so the mark follows the theme the
       way chatui's CellMark does: coral and a green born cell (mint on the
       dark page, deep green on cream) over the theme's grid tone. */
    .tile {
        fill: #12302e;
    }
    /* On the light page the mark sits straight on the cream, with no tile. */
    :global(:root[data-theme='light']) .tile {
        fill: transparent;
    }
    .dim {
        fill: var(--viz-grid);
    }
    .warm {
        fill: var(--accent);
    }
    .born {
        fill: var(--viz-node);
    }

    .cell {
        opacity: 0;
        transform-box: fill-box;
        transform-origin: center;
        animation: cell-in 420ms cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards;
    }

    .live {
        animation-name: cell-pop;
        animation-duration: 520ms;
    }

    @keyframes cell-in {
        from {
            opacity: 0;
            transform: scale(0.4);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes cell-pop {
        0% {
            opacity: 0;
            transform: scale(0.2);
        }
        60% {
            opacity: 1;
            transform: scale(1.25);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .instant .cell {
        animation: none;
        opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
        .cell {
            animation: none;
            opacity: 1;
        }
    }
</style>
