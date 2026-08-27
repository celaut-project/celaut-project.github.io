<script>
	/*
	 * /developers — "Build it once. It runs anywhere."
	 *
	 * The service-developer half of the Celaut story. Everything
	 * asserted here is drawn from the paradigm doc and the existing site
	 * copy — BOX/API/NET, black-box services, hierarchical execution,
	 * distribution without a registry, and the fact that the developer
	 * does not control the nodes that run their service.
	 *
	 * The staging machinery is shared (AudiencePage) and the words live
	 * in the `developers` namespace of the dictionaries, so this file
	 * only says which scenes run, for how long, and where links go.
	 */

	import AudiencePage from '$lib/components/immersive/AudiencePage.svelte';
	import {
		drawSpecScene,
		drawAgnosticScene,
		drawDistributeScene,
		drawComposeScene
	} from '$lib/components/developers/scenes.js';

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
		{ id: 'spec', draw: drawSpecScene, scrollLength: 2.4, beats: OPENER },
		{ id: 'agnostic', draw: drawAgnosticScene, scrollLength: 2.4, align: 'right', beats: BENEFIT_A },
		{ id: 'distribute', draw: drawDistributeScene, scrollLength: 2.6, beats: BENEFIT_B },
		{ id: 'compose', draw: drawComposeScene, scrollLength: 2.6, align: 'right', beats: BENEFIT_B }
	];

	const heroActions = [{ href: SKILLS_URL, external: true, primary: true }, { href: '#spec' }];
	const roleLinks = ['/depin', '/users', '/paradigm'];
	const ctaActions = [{ href: SKILLS_URL, external: true }, { href: '/paradigm' }];
</script>

<AudiencePage page="developers" {scenes} {heroActions} {roleLinks} {ctaActions} />
