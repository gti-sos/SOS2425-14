<script>
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let DEVEL_HOST = 'http://localhost:16078';
	let API = '/api/v1/education-data';

	if (dev) {
		API = DEVEL_HOST + API;
	}
	/**
	 * @type {any[]}
	 */
	let education = [];
	let message = '';

	async function getEducationData() {
		try {
			const res = await fetch(API);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			const data = await res.json();
			education = data;
		} catch (error) {
			console.error('[GET] Error getting education data:', error);
		}
	}

	function addNew() {}

	async function loadInitialData() {
		const urlReset = `${API}/loadInitialData?reset=true`;
		const urlNormal = `${API}/loadInitialData`;

		try {
			if (education.length > 0) {
				const confirmReset = confirm(
					'There are existing records. Do you want to reload the initial data and reset everything?'
				);
				if (!confirmReset) return;

				const res = await fetch(urlReset);
				if (!res.ok) throw new Error(`Error ${res.status}`);
				message = '🔄 Initial data reloaded with reset.';
			} else {
				const res = await fetch(urlNormal);
				if (!res.ok) throw new Error(`Error ${res.status}`);
				message = '📥 Initial data loaded.';
			}

			await getEducationData();
		} catch (error) {
			console.error('[LOAD INITIAL DATA] Error:', error);
			message = '❌ Error loading initial data.';
		}
		setTimeout(() => {
			message = '';
		}, 3000);
	}

	async function deleteAll() {
		const confirmDelete = confirm('Are you sure you want to delete all records?');
		if (!confirmDelete) return;

		try {
			const res = await fetch(API, { method: 'DELETE' });
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

			message = '✅ All records have been deleted.';
			await getEducationData();
		} catch (error) {
			console.error('[DELETE] Error deleting records:', error);
			message = '❌ Error deleting records.';
		}
		setTimeout(() => {
			message = '';
		}, 3000);
	}

	/**
	 * @param {any} community
	 * @param {any} year
	 */
	async function deleteRecord(community, year) {
		const confirmDelete = confirm(
			`Are you sure you want to delete the record for ${community} (${year})?`
		);
		if (!confirmDelete) return;

		try {
			const res = await fetch(`${API}/${community}/${year}`, {
				method: 'DELETE'
			});
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			message = `🗑️ Record for ${community} (${year}) deleted successfully.`;
			await getEducationData();
		} catch (error) {
			console.error('[DELETE ONE] Error deleting record:', error);
			message = '❌ Error deleting the record.';
		}
		setTimeout(() => {
			message = '';
		}, 3000);
	}

	onMount(async () => {
		getEducationData();
	});
</script>

<svelte:head>
	<title>Dashboard - Education Data</title>
</svelte:head>

<div class="wrapper dash">
	<div class="container dash">
		{#if message}
			<p class="info-message" transition:fade={{ duration: 300 }}>{message}</p>
		{/if}

		<div class="header">
			<h3>Education Data</h3>
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
		<div class="seeker"></div>
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Autonomous Community</th>
						<th>Year</th>
						<th>Basic FP</th>
						<th>Middle Grade</th>
						<th>Higher Grade</th>
						<th>Actions</th>
					</tr>
				</thead>
			</table>
			<div class="scroll-body">
				<table>
					<tbody>
						{#each education as record}
							<tr>
								<td>{record.autonomous_community}</td>
								<td>{record.year}</td>
								<td>{record.basic_fp}</td>
								<td>{record.middle_grade}</td>
								<td>{record.higher_grade}</td>
								<td class="actions">
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button class="edit" title="Edit record"><i class="fas fa-pen"></i></button>
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<button
										class="delete"
										title="Delete record"
										on:click={() => deleteRecord(record.autonomous_community, record.year)}
										><i class="fas fa-times"></i></button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
