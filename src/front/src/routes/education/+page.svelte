<script>
	// @ts-nocheck
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	
	let DEVEL_HOST = 'http://localhost:16078';
	let API = '/api/v1/education-data'; // Cambié esto a education-data
	
	if (dev) {
		API = DEVEL_HOST + API;
	}
	
	let education = [];  // Cambié cybercrime a education
	let message = '';
	let creating = false;
	let showFilters = false;
	
	let form = {
		autonomous_community: '',
		year: '',
		basic_fp: '',
		middle_grade: '',
		higher_grade: ''
	};
	
	let search = {
		from: '',
		to: '',
		year: '',
		autonomous_community: '',
		basic_fp_from: '',
		basic_fp_to: '',
		middle_grade_from: '',
		middle_grade_to: '',
		higher_grade_from: '',
		higher_grade_to: '',
		limit: '',
		offset: ''
	};
	
	// Función para obtener los datos de educación
	async function getEducationData() {
		try {
			const res = await fetch(API);
	
			if (!res.ok) {
				if (res.status === 404) {
					message = 'No se encontraron datos de educación.';
				} else if (res.status === 500) {
					message = 'Error del servidor. Intenta más tarde.';
				} else {
					message = `Error inesperado`;
				}
				education = [];  // Asegúrate de que 'education' esté definida en tu código
				return;
			}
	
			education = await res.json();  // Aquí asignamos los datos de educación
		} catch (error) {
			console.error('[GET] Error cargando datos:', error);
			message = 'No se pudo conectar con el servidor.';
			education = [];  // Asegúrate de que 'education' esté definida en tu código
		}
	
		setTimeout(() => (message = ''), 2000);
	}

		function toggleFilters() {
			showFilters = !showFilters;
			creating = false;
			if (!showFilters) {
				search = {
					from: '',
					to: '',
					year: '',
					autonomous_community: '',
					basic_fp: '', // Formación Profesional Básica
					middle_grade: '', // Grado Medio
					higher_grade: '', // Grado Superior
					basic_fp_from: '', // Rango de Formación Profesional Básica
					basic_fp_to: '',
					middle_grade_from: '', // Rango de Grado Medio
					middle_grade_to: '',
					higher_grade_from: '', // Rango de Grado Superior
					higher_grade_to: '',
					limit: '',
					offset: ''
				};
			message = '';
			getEducationData();
		}
	}

	function toggleCreate() {
		creating = !creating;
		showFilters = false;
	}
	
	// Función para buscar los registros de educación
	async function searchRecords() {
		const params = new URLSearchParams();
	
		for (const [key, value] of Object.entries(search)) {
			if (value !== '' && value !== null && value !== undefined) {
				params.append(key, value);
			}
		}
	
		try {
			const res = await fetch(`${API}?${params.toString()}`);
	
			if (!res.ok) {
				if (res.status === 400) {
					message = 'Parámetros de búsqueda no válidos.';
				} else if (res.status === 500) {
					message = 'Error interno del servidor al buscar.';
				} else {
					message = `Error inesperado`;
				}
				education = [];  // Asegúrate de que 'education' esté definida en tu código
				return;
			}
	
			education = await res.json();
	
			if (education.length === 0) {
				message = 'No se encontraron resultados para tu búsqueda.';
			} else {
				message = `Se encontraron ${education.length} resultados.`;
			}
		} catch (err) {
			console.error('[SEARCH] Error al buscar:', err);
			message = 'No se pudo conectar con el servidor.';
			education = [];  // Asegúrate de que 'education' esté definida en tu código
		}
	
		setTimeout(() => (message = ''), 2000);
	}
	
	// Función para crear un nuevo registro de educación
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
				await getEducationData();
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
		setTimeout(() => (message = ''), 2000);
	}
	
	// Función para resetear el formulario
	function resetForm() {
		form = {
			autonomous_community: '',
			year: '',
			basic_fp: '',
			middle_grade: '',
			higher_grade: ''
		};
	}
	
	// Función loadInitialData 
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
	
/**
 * Elimina todos los registros de educación de la API.
 * Informa al usuario si la operación fue exitosa o si hubo algún error.
 */
 async function deleteAll() {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar todos los registros de educación?');
    if (!confirmDelete) return;

    try {
        const res = await fetch(API, { method: 'DELETE' });

        if (res.status === 200) {
            message = 'Todos los registros de educación han sido eliminados.';
            await getEducationData();  // Aquí obtenemos los datos actualizados después de la eliminación
        } else if (res.status === 404) {
            message = 'No hay registros de educación que eliminar.';
        } else {
            message = `Error al eliminar los registros de educación.`;
        }
    } catch (error) {
        console.error('[DELETE] Error eliminando registros de educación:', error);
        message = 'Error al eliminar los registros de educación.';
    }

    setTimeout(() => {
        message = '';
    }, 2000);
}

/**
 * Elimina un registro específico de educación de la API usando sus identificadores.
 * Muestra mensajes según el resultado de la operación.
 */
async function deleteRecord(autonomous_community, year) {
    try {
        const res = await fetch(
            `${API}/${autonomous_community}/${year}`,
            { method: 'DELETE' }
        );

        if (res.status === 200) {
            message = `Registro de educación en ${autonomous_community} (${year}) eliminado correctamente.`;
            await getEducationData();  // Actualiza los datos después de eliminar el registro
        } else if (res.status === 404) {
            message = `Registro de educación no encontrado.`;
        } else {
            message = `Error al eliminar el registro de educación.`;
        }
    } catch (error) {
        console.error('[DELETE] Error eliminando el registro de educación:', error);
        message = 'Error al eliminar el registro de educación.';
    }

    setTimeout(() => {
        message = '';
    }, 2000);
}

onMount(async () => {
    await getEducationData();  // Inicializa la carga de datos de educación cuando se monta el componente
});


</script>
	
<svelte:head>
	<title>Datos de Educación</title>
</svelte:head>

<div class="wrapper dash">
	<div class="container dash">
		{#if message}
            <p class="info-message" transition:fade={{ duration: 300 }}>{message}</p>
		{/if}

		<div class="header">
			<h3>Datos de Educación</h3>
			<div class="actions">
				<button class="btn" on:click={toggleFilters}>
					<i class="fas fa-search"></i> Buscar
				</button>
				<button class="btn" on:click={toggleCreate}>
					<i class="fas fa-plus"></i> Nuevo registro
				</button>
				<button class="btn" on:click={loadInitialData}>
					<i class="fas fa-sync-alt"></i> Recargar
				</button>
				<button class="btn" on:click={deleteAll}>
					<i class="fas fa-trash-alt"></i> Eliminar
				</button>
			</div>
		</div>

        {#if creating}
            <form class="create-form" on:submit|preventDefault={createRecord}>
                <input placeholder="Comunidad Autónoma" bind:value={form.autonomous_community} required />
                <input type="number" placeholder="Año" bind:value={form.year} required />
                <input type="number" placeholder="Formación Profesional Básica" bind:value={form.basic_fp} required step="any"/>
                <input type="number" placeholder="Grado Medio" bind:value={form.middle_grade} required step="any"/>
                <input type="number" placeholder="Grado Superior" bind:value={form.higher_grade} required step="any"/>

                <button type="submit" class="submit">Crear</button>
                <button type="button" class="cancel" on:click={() => (creating = false)}>Cancelar</button>
            </form> 
        {/if}

		{#if showFilters}
		<form class="create-form" on:submit|preventDefault={searchRecords}>
			<input type="number" bind:value={search.from} placeholder="Desde año" />
			<input type="number" bind:value={search.to} placeholder="Hasta año" />
			<input type="number" bind:value={search.year} placeholder="Año exacto" />
			<input type="text" bind:value={search.autonomous_community} placeholder="Comunidad autónoma" />
	
			<!-- Campos con valores decimales -->
			<input type="number" bind:value={search.basic_fp} placeholder="Formación Profesional Básica exacto" step="any" />
			<input type="number" bind:value={search.basic_fp_from} placeholder="Formación Prof. Básica desde" step="any" />
			<input type="number" bind:value={search.basic_fp_to} placeholder="Formación Prof. Básica hasta" step="any" />
	
			<input type="number" bind:value={search.middle_grade} placeholder="Grado Medio exacto" step="any" />
			<input type="number" bind:value={search.middle_grade_from} placeholder="Grado Medio desde" step="any" />
			<input type="number" bind:value={search.middle_grade_to} placeholder="Grado Medio hasta" step="any" />
	
			<input type="number" bind:value={search.higher_grade} placeholder="Grado Superior exacto" step="any" />
			<input type="number" bind:value={search.higher_grade_from} placeholder="Grado Superior desde" step="any" />
			<input type="number" bind:value={search.higher_grade_to} placeholder="Grado Superior hasta" step="any" />
	
			<input type="number" bind:value={search.limit} placeholder="Limitar a..." />
			<input type="number" bind:value={search.offset} placeholder="Comenzar desde..." />
	
			<button class="btn" type="submit">Buscar</button>
		</form>
		{/if}
	

        <div class="seeker"></div>
        <div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Comunidad Autónoma</th>
                        <th>Año</th>
                        <th>Formación Profesional Básica</th>
                        <th>Grado Medio</th>
                        <th>Grado Superior</th>
                        <th>Acciones</th>
					</tr>
				</thead>
			</table>
			<div class="scroll-body">
				<table>
					<tbody>
						{#each education as entry}
							<tr>
								<td>{entry.autonomous_community}</td>
                                <td>{entry.year}</td>
                                <td>{entry.basic_fp}</td>
                                <td>{entry.middle_grade}</td>
                                <td>{entry.higher_grade}</td>
								<td class="actions">
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										class="btn-circle"
										title="Editar Registro"
										on:click={() => goto(`/education/edit/${encodeURIComponent(entry.autonomous_community)}/${entry.year}`)}
										>
										<i class="fas fa-pen"></i>
									</button>
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										class="btn-circle"
										title="Eliminar Registro"
										on:click={() => deleteRecord(entry.autonomous_community, entry.year)}
										><i class="fas fa-times"></i></button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
