<!--
	The two coordination mechanisms, in the same order the pinned scene
	introduces them: reputation decides who is worth dealing with,
	payment moves the value once that check passes.
	Styling comes from the shared `.ground` layer in src/app.css.
-->
<div class="block">
	<p class="eyebrow">What makes strangers cooperate</p>
	<h2>Coordination mechanisms</h2>
	<p class="block-intro">
		Neither is part of the core architecture, and that is deliberate: both sit outside it, so no
		particular ledger or currency is ever baked in.
	</p>

	<div class="grid grid-2">
		<article class="card">
			<h3>Reputation systems</h3>
			<p>
				A history of interactions, recorded on ledgers as opinions rather than verdicts. It is
				<strong>what gets consulted first</strong>, before anyone commits anything.
			</p>
			<ul class="points">
				<li>Each actor weighs the sources it already trusts, at its own discretion.</li>
				<li>Standing is worth protecting, so it becomes the collateral behind a promise.</li>
				<li>The result is self-regulation, with no authority handing out verdicts.</li>
			</ul>
		</article>

		<article class="card">
			<h3>Payment mechanisms</h3>
			<p>
				Value exchanged for resources consumed. What a payment buys is
				<strong>a concrete right</strong> — this much compute, for this long — not a promise of
				good behaviour.
			</p>
			<ul class="points">
				<li>Nodes are compensated for the resources a service actually spends.</li>
				<li>Proof of payment gates access to services that ask for it.</li>
				<li>Ledgers can be public and permissionless or private and closed.</li>
			</ul>
		</article>
	</div>

	<span class="note">Check the record · pay for the right · deliver · record the outcome.</span>
</div>
