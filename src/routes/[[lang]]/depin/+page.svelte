<script>
	/*
	 * /depin — "Rent your PC"
	 *
	 * One proposition: your computer is idle most of the time, and
	 * Celaut lets you sell that idle capacity. Each of the three pillars
	 * gets a full-screen pinned scene, scrubbed by scroll, with a
	 * procedural canvas doing the explaining:
	 *   1. Rent your PC        — the machine splits into sellable slices
	 *   2. Fully peer-to-peer  — the intermediary is removed, mesh forms
	 *   3. Electricity-aware   — cost curve, your price, your margin
	 *   4. microVM isolation   — the boundary seals, an escape bounces
	 *
	 * Structure and words live apart: the staging machinery is
	 * AudiencePage (shared with /developers and /users) and every string
	 * is in the `depin` namespace of the dictionaries. What is left here
	 * is what is genuinely specific to this page — which scenes it runs,
	 * how long each one is pinned, and where its links go.
	 */

	import AudiencePage from '$lib/components/immersive/AudiencePage.svelte';
	import {
		drawRentScene,
		drawP2PScene,
		drawPowerScene,
		drawIsolationScene
	} from '$lib/components/depin/scenes.js';

	// Beat timings are layout, not copy — the captions themselves come
	// from depin.scenes.<id>.beats, paired by index.
	const OPENER = [{ from: 0, to: 0.34 }, { from: 0.3, to: 0.66 }, { from: 0.62, to: 1, hold: true }];
	const BENEFIT_A = [
		{ from: 0, to: 0.36 },
		{ from: 0.32, to: 0.68 },
		{ from: 0.64, to: 1, hold: true }
	];
	const BENEFIT_B = [
		{ from: 0, to: 0.34 },
		{ from: 0.3, to: 0.68 },
		{ from: 0.64, to: 1, hold: true }
	];

	const scenes = [
		{ id: 'rent', draw: drawRentScene, scrollLength: 2.4, beats: OPENER },
		{ id: 'p2p', draw: drawP2PScene, scrollLength: 2.4, align: 'right', beats: BENEFIT_A },
		{ id: 'electricity', draw: drawPowerScene, scrollLength: 2.6, beats: BENEFIT_B },
		{
			id: 'isolation',
			draw: drawIsolationScene,
			scrollLength: 2.6,
			align: 'right',
			beats: BENEFIT_B
		}
	];

	const heroActions = [{ href: '/install', primary: true }, { href: '#rent' }];
	// The third role card is the reader themselves, so it has no link.
	const roleLinks = ['/developers', '/users'];
	const ctaActions = [{ href: '/install' }, { href: '/paradigm' }];
</script>

<AudiencePage
	page="depin"
	{scenes}
	{heroActions}
	{roleLinks}
	{ctaActions}
	beatsMinHeight="15.5em"
/>
