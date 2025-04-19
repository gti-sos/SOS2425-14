<script>
    // @ts-nocheck
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let DEVEL_HOST = 'http://localhost:16078';
	let API = '/api/v1/employment-data';

	if (dev) {
		API = DEVEL_HOST + API;
	}

	/**
	 * @type {any[]}
	 */
	let employment = [];
	let message = '';

	async function getEmploymentData() {
		try {
			const res = await fetch(API);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			employment = await res.json();
		} catch (error) {
			console.error('[GET] Error getting employment data:', error);
		}
	}

	function addNew() {
		// Aquí podrías implementar un modal o formulario si quieres
	}

	async function loadInitialData() {
		const url = `${API}/loadInitialData`;

		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`Error ${res.status}`);
			message = 'Datos iniciales cargados.';
			await getEmploymentData();
		} catch (error) {
			console.error('[LOAD INITIAL DATA] Error:', error);
			message = 'Error al cargar los datos iniciales.';
		}
		setTimeout(() => {
			message = '';
		}, 3000);
	}

	async function deleteAll() {
		const confirmDelete = confirm('¿Estás seguro de que quieres eliminar todos los registros?');
		if (!confirmDelete) return;

		try {
			const res = await fetch(API, { method: 'DELETE' });
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

			message = 'Todos los registros han sido eliminados.';
			await getEmploymentData();
		} catch (error) {
			console.error('[DELETE] Error deleting records:', error);
			message = 'Error al eliminar los registros.';
		}
		setTimeout(() => {
			message = '';
		}, 3000);
	}

	async function deleteRecord(autonomous_community, year, education_level) {
		const confirmDelete = confirm(
			`¿Estás seguro de que quieres eliminar el registro de ${autonomous_community} (${year}, ${education_level})?`
		);
		if (!confirmDelete) return;

		try {
			const res = await fetch(`${API}/${autonomous_community}/${year}/${education_level}`, {
				method: 'DELETE'
			});
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			message = `Registro de ${autonomous_community} (${year}, ${education_level}) eliminado correctamente.`;
			await getEmploymentData();
		} catch (error) {
			console.error('[DELETE ONE] Error deleting record:', error);
			message = 'Error al eliminar el registro.';
		}
		setTimeout(() => {
			message = '';
		}, 3000);
	}

	onMount(async () => {
		await getEmploymentData();
	});
</script>

<svelte:head>
	<title>Datos de Empleo</title>
</svelte:head>

<div class="wrapper dash">
	<div class="container dash">
		{#if message}
            <p class="info-message" transition:fade={{ duration: 300 }}>{message}</p>
		{/if}

		<div class="header">
			<h3>Employment Data</h3>
			<div class="actions">
				<button on:click={addNew} class="green">
					<i class="fas fa-plus"></i> Nuevo registro
				</button>
				<button on:click={loadInitialData} class="green">
					<i class="fas fa-sync-alt"></i> Recargar los datos iniciales
				</button>
				<button on:click={deleteAll} class="red">
					<i class="fas fa-trash-alt"></i> Eliminar todos los datos
				</button>
			</div>
		</div>
        <div class="seeker"></div>
        <div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Comunidad Autónoma</th>
                        <th>Año</th>
                        <th>Nivel educativo</th>
                        <th>Tasa de actividad</th>
                        <th>Tasa de empleo</th>
                        <th>Tasa de paro</th>
                        <th>Acciones</th>
					</tr>
				</thead>
			</table>
			<div class="scroll-body">
				<table>
					<tbody>
						{#each employment as entry}
							<tr>
								<td>{entry.autonomous_community}</td>
                                <td>{entry.year}</td>
                                <td>{entry.education_level}</td>
                                <td>{entry.activity_rate}</td>
                                <td>{entry.employment_rate}</td>
                                <td>{entry.unemployment_rate}</td>
								<td class="actions">
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button class="edit" title="Editar Registro"><i class="fas fa-pen"></i></button>
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<button
										class="delete"
										title="Eliminar Registro"
										on:click={() => deleteRecord(entry.autonomous_community, entry.year, entry.education_level)}
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