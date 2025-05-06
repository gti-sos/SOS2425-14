<script>
	import Api from '$lib/components/Api.svelte';
	import data from '$lib/data/integrations.json';
</script>

<div class="wrapper">
	<div class="container">
		<h2>Integraciones</h2>
		<hr />
		<div class="article">
			<h3 style="text-align: center;">Integrations Showcase</h3>
			<div class="apis-container">
				{#each data as card}
					<Api api={card.api} description={card.description} path={card.path} image={card.image} text="Integrations"/>
				{/each}
			</div>
		</div>
	</div>
</div>
