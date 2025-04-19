<script>
    // @ts-nocheck
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';


	let DEVEL_HOST = 'http://localhost:16078';
	let API = '/api/v1/employment-data';

	if (dev) {
		API = DEVEL_HOST + API;
	}

	let employment = [];
	let message = '';
    let creating = false;
    let form = {
        autonomous_community: '',
        year: '',
        education_level: '',
        activity_rate: '',
        employment_rate: '',
        unemployment_rate: ''
    };

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

	async function createRecord() { 
	try {
		const res = await fetch(API, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		});

		const result = await res.json();

		if (res.status === 201) {
			message = 'Registro creado correctamente';
			creating = false;
			resetForm();
			await getEmploymentData();
		} else if (res.status === 400) {
			message = `Datos inválidos: ${result.error || 'Revisa los campos.'}`;
		} else if (res.status === 409) {
			message = 'Ya existe un registro con esos identificadores.';
		} else {
			message = `Error inesperado (${res.status}) al procesar la petición.`;
		}
	} catch (error) {
		console.error('[CREATE] Error:', error);
		message = 'No se pudo conectar con el servidor.';
	}
	setTimeout(() => (message = ''), 5000);
}


    function resetForm() {
        form = {
            autonomous_community: '',
            year: '',
            education_level: '',
            activity_rate: '',
            employment_rate: '',
            unemployment_rate: ''
        };
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
				<button class="btn" on:click={() => (creating = !creating)}>
					<i class="fas fa-plus"></i> Nuevo registro
				</button>
				<button class="btn" on:click={loadInitialData}>
					<i class="fas fa-sync-alt"></i> Recargar los datos iniciales
				</button>
				<button class="btn" on:click={deleteAll}>
					<i class="fas fa-trash-alt"></i> Eliminar todos los datos
				</button>
			</div>
		</div>

        {#if creating}
            <form class="create-form" on:submit|preventDefault={createRecord}>
                <input placeholder="Comunidad Autónoma" bind:value={form.autonomous_community} required />
                <input type="number" placeholder="Año" bind:value={form.year} required />
                <select bind:value={form.education_level} required>
                    <option value="" disabled selected>Nivel educativo</option>
                    <option value="SUP">Educación superior (SUP)</option>
                    <option value="SEC">Secundaria (SEC)</option>
                    <option value="INF">Inferior a secundaria (INF)</option>
                    <option value="TOTAL">Total (TOTAL)</option>
                </select>
                <input type="number" step="0.01" placeholder="Tasa actividad" bind:value={form.activity_rate} required />
                <input type="number" step="0.01" placeholder="Tasa empleo" bind:value={form.employment_rate} required />
                <input type="number" step="0.01" placeholder="Tasa paro" bind:value={form.unemployment_rate} required />

                <button type="submit" class="submit">Crear</button>
                <button type="button" class="cancel" on:click={() => (creating = false)}>Cancelar</button>
            </form> 
        {/if}

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
									<button
                                        class="btn-circle"
                                        title="Editar Registro"
                                        on:click={() => goto(`/employment/edit/${encodeURIComponent(entry.autonomous_community)}/${entry.year}/${encodeURIComponent(entry.education_level)}`)}
                                        >
                                        <i class="fas fa-pen"></i>
                                        </button>

									<!-- svelte-ignore a11y_consider_explicit_label -->
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<button
										class="btn-circle"
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