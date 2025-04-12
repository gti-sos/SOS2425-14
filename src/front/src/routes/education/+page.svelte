<script>
	import { onMount } from 'svelte';

	let API_URL = 'http://localhost:16078/api/v1/education-data';

	let results = '';
	let education = [];

	async function getEducationData() {
		try {
			const res = await fetch(API_URL);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			const data = await res.json();
			education = data;
			results = JSON.stringify(data, null, 2);
			console.log(results);
		} catch (error) {
			console.error('[GET] Error getting education data:', error);
		}
	}

	function addNew() {}
	function deleteAll() {}
	function loadInitialData() {}

	onMount(() => {
		getEducationData();
	});
</script>

<div class="wrapper dash">
	<div class="container dash">
		<div class="header">
			<h3>Education</h3>
			<div class="actions">
				<button on:click={addNew} class="green">
					<i class="fas fa-plus"></i> Add New Record
				</button>
				<button on:click={loadInitialData} class="green">
					<i class="fas fa-sync-alt"></i> Reload Initial Data
				</button>
				<button on:click={deleteAll} class="red">
					<i class="fas fa-trash-alt"></i> Delete All
				</button>
			</div>
		</div>
	</div>
</div>
