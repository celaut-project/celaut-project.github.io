<script>
	/*
	 * /users — "Run it. Pay for what it used."
	 *
	 * The final-user half of the Celaut story. Grounded strictly in what
	 * the site and the paradigm document already assert: users launch
	 * services on nodes and pay for the computational resources used;
	 * services are deterministic and isolated by default; the developer
	 * controls neither the nodes nor your request data; discovery is
	 * peer-to-peer with no central registry; reputation, not a
	 * gatekeeper, is how quality surfaces.
	 *
	 * Staging comes from the shared AudiencePage and every string from
	 * the `users` namespace of the dictionaries.
	 */

	import AudiencePage from '$lib/components/immersive/AudiencePage.svelte';
	import {
		drawAskScene,
		drawProofScene,
		drawSealedScene,
		drawMeterScene
	} from '$lib/components/users/scenes.js';

	const SKILLS_URL = 'https://celaut-project.github.io/skills';

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
		{ id: 'ask', draw: drawAskScene, scrollLength: 2.4, beats: OPENER },
		{ id: 'proof', draw: drawProofScene, scrollLength: 2.4, align: 'right', beats: BENEFIT_A },
		{ id: 'sealed', draw: drawSealedScene, scrollLength: 2.6, beats: BENEFIT_B },
		{ id: 'pay', draw: drawMeterScene, scrollLength: 2.6, align: 'right', beats: BENEFIT_B }
	];

	const heroActions = [{ href: SKILLS_URL, external: true, primary: true }, { href: '#ask' }];
	const roleLinks = ['/depin', '/developers', '/paradigm'];
	const ctaActions = [{ href: SKILLS_URL, external: true }, { href: '/depin' }];
</script>

<AudiencePage page="users" {scenes} {heroActions} {roleLinks} {ctaActions} />
