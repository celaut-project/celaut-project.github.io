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
	import SectionIndex from '$lib/components/SectionIndex.svelte';
	import GoToTop from '$lib/components/GoToTop.svelte';
</script>

<SectionIndex />

<main>
	<Hero />

	<!-- #learn-more kept for the Hero CTA; #foundations is the TOC target. -->
	<div id="learn-more"></div>
	<div id="foundations" class="section-anchor">
		<Foundations />
	</div>

	<div class="bg-peach">
		<div id="core-principles" class="section-anchor">
			<CorePrinciples />
		</div>
		<div id="what-is-not" class="section-anchor">
			<WhatIsNot />
		</div>
	</div>

	<div id="nodes" class="section-anchor">
		<Nodes />
	</div>

	<div class="bg-peach">
		<div id="services" class="section-anchor">
			<Services />
		</div>
		<div id="service-spec" class="section-anchor">
			<ServiceSpec />
		</div>
		<div id="coordination" class="section-anchor">
			<Coordination />
		</div>
		<div id="service-distribution" class="section-anchor">
			<ServiceDistribution />
		</div>
	</div>

	<div id="user-roles" class="section-anchor">
		<UserRoles />
	</div>
	<div id="applications" class="section-anchor">
		<Applications />
	</div>
</main>

<GoToTop />

<style>
	.section-anchor {
		scroll-margin-top: 12px;
	}
</style>
