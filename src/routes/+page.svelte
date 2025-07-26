<script>
	import Hero from '$lib/components/Hero.svelte';
	import Foundations from '$lib/components/Foundations.svelte';
	import CorePrinciples from '$lib/components/CorePrinciples.svelte';
	import WhatIsNot from '$lib/components/WhatIsNot.svelte';
	import Nodes from '$lib/components/Nodes.svelte';
	import Services from '$lib/components/Services.svelte';
	import ServiceSpec from '$lib/components/ServiceSpec.svelte';
	import Coordination from '$lib/components/Coordination.svelte';
	import ServiceDistribution from '$lib/components/ServiceDistribution.svelte';
	import UserRoles from '$lib/components/UserRoles.svelte';
    import Applications from '$lib/components/Applications.svelte';
</script>

<main>
	<Hero />
	<Foundations />

	<div class="bg-peach">
		<CorePrinciples />
		<WhatIsNot />
	</div>

	<Nodes />

	<div class="bg-peach">
		<Services />
		<ServiceSpec />
		<Coordination />
		<ServiceDistribution />
	</div>

	<UserRoles />
	<Applications />
</main>