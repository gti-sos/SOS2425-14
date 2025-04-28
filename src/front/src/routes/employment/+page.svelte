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
	let showFilters = false;

    let form = {
        autonomous_community: '',
        year: '',
        education_level: '',
        activity_rate: '',
        employment_rate: '',
        unemployment_rate: ''
    };

	let search = {
		from: '',
		to: '',
		year: '',
		autonomous_community: '',
		education_level: '',
		activity_rateMin: '',
		activity_rateMax: '',
		employment_rateMin: '',
		employment_rateMax: '',
		unemployment_rateMin: '',
		unemployment_rateMax: '',
		limit: '',
		offset: ''
	};

	/**
	 * Hace GEt inicial a la API.
	 * Muestra mensajes según el código de estado recibido.
	 */
	async function getEmploymentData() {
		try {
			const res = await fetch(API);

			if (!res.ok) {
				if (res.status === 404) {
					message = 'No se encontraron datos de empleo.';
				} else if (res.status === 500) {
					message = 'Error del servidor. Intenta más tarde.';
				} else {
					message = `Error inesperado`;
				}
				employment = [];
				return;
			}
			employment = await res.json();
		} catch (error) {
			console.error('[GET] Error cargando datos:', error);
			message = 'No se pudo conectar con el servidor.';
			employment = [];
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
				education_level: '',
				activity_rateMin: '',
				activity_rateMax: '',
				employment_rateMin: '',
				employment_rateMax: '',
				unemployment_rateMin: '',
				unemployment_rateMax: '',
				limit: '',
				offset: ''
			};
			message = '';
			getEmploymentData();
		}
	}

    function toggleCreate() {
        creating = !creating;
        showFilters = false;
    }

	/**
	 * Realiza una búsqueda de registros filtrando por los parámetros del formulario.
	 * Actualiza los resultados y muestra mensajes según el código de estado HTTP.
	 */
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
				employment = [];
				return;
			}

			employment = await res.json();

			if (employment.length === 0) {
				message = 'No se encontraron resultados para tu búsqueda.';
			} else {
				message = `Se encontraron ${employment.length} resultados.`;
			}
		} catch (err) {
			console.error('[SEARCH] Error al buscar:', err);
			message = 'No se pudo conectar con el servidor.';
			employment = [];
		}
		setTimeout(() => (message = ''), 2000);
	}

	/**
	 * Envía un nuevo registro a la API.
	 * Muestra mensajes según el estado devuelto: éxito, conflicto o error de validación.
	*/
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
				message = `Datos inválidos: revisa los campos.`;
			} else if (res.status === 409) {
				message = 'Ya existe un registro con esos identificadores.';
			} else {
				message = `Error inesperado al procesar la petición.`;
			}
		} catch (error) {
			console.error('[CREATE] Error:', error);
			message = 'No se pudo conectar con el servidor.';
		}
		setTimeout(() => (message = ''), 2000);
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

	/**
	 * Carga los datos iniciales desde la API.
	 * Muestra mensajes según el resultado de la operación.
	 */
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
		}, 2000);
	}

	/**
	 * Elimina todos los registros de la API.
	 * Informa al usuario si la operación fue exitosa o si hubo algún error.
	 */
	async function deleteAll() {
		const confirmDelete = confirm('¿Estás seguro de que quieres eliminar todos los registros?');
		if (!confirmDelete) return;

		try {
			const res = await fetch(API, { method: 'DELETE' });

			if (res.status === 200) {
				message = 'Todos los registros han sido eliminados.';
				await getEmploymentData();
			} else if (res.status === 404) {
				message = 'No hay registros que eliminar.';
			} else {
				message = `Error al eliminar`;
			}
		} catch (error) {
			console.error('[DELETE] Error deleting records:', error);
			message = 'Error al eliminar los registros.';
		}

		setTimeout(() => {
			message = '';
		}, 2000);
	}
	
	/**
	 * Elimina un registro específico de la API usando sus identificadores.
	 * Muestra mensajes según el resultado de la operación.
	 */
	async function deleteRecord(autonomous_community, year, education_level) {
		try {
			const res = await fetch(
				`${API}/${autonomous_community}/${year}/${education_level}`,
				{ method: 'DELETE' }
			);

			if (res.status === 200) {
				message = `Registro de ${autonomous_community} (${year}, ${education_level}) eliminado correctamente.`;
				await getEmploymentData();
			} else if (res.status === 404) {
				message = `Registro no encontrado.`;
			} else {
				message = `Error al eliminar`;
			}
		} catch (error) {
			console.error('[DELETE] Error deleting record:', error);
			message = 'Error al eliminar el registro.';
		}

		setTimeout(() => {
			message = '';
		}, 2000);
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
			<h3>Datos de empleo</h3>
			<div class="actions">
				<button class="btn" on:click={toggleFilters}>
					<i class="fas fa-search"></i> Búsqueda
				</button>
				<button class="btn" on:click={toggleCreate}>
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
                <select  name="autonomous_community" bind:value={form.autonomous_community} required>
					<option value="" disabled selected>Comunidad autónoma</option>
					<option value="Andalucía">Andalucía</option>
					<option value="Aragón">Aragón</option>
					<option value="Asturias">Asturias</option>
					<option value="Baleares">Baleares</option>
					<option value="Canarias">Canarias</option>
					<option value="Cantabria">Cantabria</option>
					<option value="Castilla y León">Castilla y León</option>
					<option value="Castilla-La Mancha">Castilla-La Mancha</option>
					<option value="Cataluña">Cataluña</option>
					<option value="Ceuta y Melilla">Ceuta y Melilla</option>
					<option value="Comunitat Valenciana">Comunitat Valenciana</option>
					<option value="Extremadura">Extremadura</option>
					<option value="Galicia">Galicia</option>
					<option value="La Rioja">La Rioja</option>
					<option value="Madrid">Madrid</option>
					<option value="Murcia">Murcia</option>
					<option value="Navarra">Navarra</option>
					<option value="País Vasco">País Vasco</option>
					<option value="TOTAL">TOTAL</option>
				</select>

                <input type="number" placeholder="Año" bind:value={form.year} required />
                <select name="education_level" bind:value={form.education_level} required>
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

		{#if showFilters}
			<form class="create-form" on:submit|preventDefault={searchRecords}>
				<input type="number" bind:value={search.from} placeholder="Desde año" />
				<input type="number" bind:value={search.to} placeholder="Hasta año" />
				<input type="number" bind:value={search.year} placeholder="Año exacto" />
				<select
 					name="autonomous_community"
 					bind:value={search.autonomous_community}
 					class:empty={search.autonomous_community === ""}
 					>
 					<option value="" disabled selected>Comunidad autónoma</option>
 					<option value="Andalucía">Andalucía</option>
 					<option value="Aragón">Aragón</option>
 					<option value="Asturias">Asturias</option>
 					<option value="Baleares">Baleares</option>
 					<option value="Canarias">Canarias</option>
 					<option value="Cantabria">Cantabria</option>
 					<option value="Castilla y León">Castilla y León</option>
 					<option value="Castilla-La Mancha">Castilla-La Mancha</option>
 					<option value="Cataluña">Cataluña</option>
 					<option value="Ceuta y Melilla">Ceuta y Melilla</option>
 					<option value="Comunitat Valenciana">Comunitat Valenciana</option>
 					<option value="Extremadura">Extremadura</option>
 					<option value="Galicia">Galicia</option>
 					<option value="La Rioja">La Rioja</option>
 					<option value="Madrid">Madrid</option>
 					<option value="Murcia">Murcia</option>
 					<option value="Navarra">Navarra</option>
 					<option value="País Vasco">País Vasco</option>
 					<option value="TOTAL">TOTAL</option>
 				</select>

				<select
					name="education_level"
					bind:value={search.education_level}
					class:empty={search.education_level === ""}
					>
					<option value="" disabled selected>Nivel educativo</option>
					<option value="SUP">Educación superior (SUP)</option>
					<option value="SEC">Secundaria (SEC)</option>
					<option value="INF">Inferior a secundaria (INF)</option>
					<option value="TOTAL">Total (TOTAL)</option>
			 	</select>


				<input type="number" bind:value={search.activity_rateMin} placeholder="Tasa actividad min" />
				<input type="number" bind:value={search.activity_rateMax} placeholder="Tasa actividad max" />
				<input type="number" bind:value={search.employment_rateMin} placeholder="Tasa empleo min" />
				<input type="number" bind:value={search.employment_rateMax} placeholder="Tasa empleo max" />
				<input type="number" bind:value={search.unemployment_rateMin} placeholder="Tasa paro min" />
				<input type="number" bind:value={search.unemployment_rateMax} placeholder="Tasa paro max" />

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