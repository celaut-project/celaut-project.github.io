<!--
	Core principles — the first grounded block under the pinned scenes.
	Styling comes from the shared `.ground` layer in src/app.css; this
	component only supplies markup and words.
-->
<div class="block">
	<p class="eyebrow">The rules it holds to</p>
	<h2>Core principles of Celaut</h2>
	<p class="block-intro">
		Three commitments the whole architecture is derived from. Everything above — nodes without a
		protocol, sealed services, declared networks — is a consequence of these.
	</p>

	<div class="grid">
		<article class="card">
			<h3>Decentralization</h3>
			<p>
				Celaut eliminates <strong>single points of control or failure</strong> by letting nodes
				communicate and coordinate dynamically, with nothing in the middle to ask permission from.
			</p>
		</article>

		<article class="card">
			<h3>Simplicity</h3>
			<p>
				The architecture follows <strong>minimalist rules</strong> that reduce complexity, so each
				component stays small enough to be understood and maintained on its own.
			</p>
		</article>

		<article class="card">
			<h3>Determinism</h3>
			<p>
				Services are fully specified to ensure <strong>reproducible results</strong> across time
				and nodes. Given the same inputs they produce the same outputs, regardless of where or
				when they run.
			</p>
		</article>
	</div>
</div>
