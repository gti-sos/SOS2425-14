<script>
	// @ts-nocheck
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	
	let DEVEL_HOST = 'http://localhost:16078';
	let API = '/api/v1/cybercrime-data';
	
	if (dev) {
		API = DEVEL_HOST + API;
	}
	
	let cybercrime = [];
	let message = '';
	let creating = false;
	let showFilters = false;
	
	let form = {
		autonomous_community: '',
		year: '',
		criminal_ofense: '',
		cybersecurity: '',
		arrested_investigated: ''
	};
	
	let search = {
		from: '',
		to: '',
		year: '',
		autonomous_community: '',
		criminal_ofense: '',
		criminal_ofense_from: '',
		criminal_ofense_to: '',
		cybersecurity: '',
		cybersecurity_from: '',
		cybersecurity_to: '',
		arrested_investigated: '',
		arrested_investigated_from: '',
		arrested_investigated_to: '',
		limit: '',
		offset: ''
	};
	
/**
 * Hace un GET inicial a la API para obtener los datos de crimen cibernético.
 * Muestra mensajes según el código de estado recibido.
 */
 async function getCybercrimeData() {
    try {
        const res = await fetch(API);

        if (!res.ok) {
            if (res.status === 404) {
                message = 'No se encontraron datos de crimen cibernético.';
            } else if (res.status === 500) {
                message = 'Error del servidor. Intenta más tarde.';
            } else {
                message = `Error inesperado`;
            }
            cybercrime = [];  // Asegúrate de que 'cybercrimeData' esté definida en tu código
            return;
        }

        // Si la respuesta es correcta, obtenemos los datos
        cybercrime = await res.json();  // 'cybercrimeData' es donde guardamos los datos
    } catch (error) {
        console.error('[GET] Error cargando datos:', error);
        message = 'No se pudo conectar con el servidor.';
        cybercrime = [];  // Asegúrate de que 'cybercrimeData' esté definida en tu código
    }

    //  Limpiar el mensaje después de 2 segundos
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
				criminal_ofense: '',
				criminal_ofense_from: '',
				criminal_ofense_to: '',
				cybersecurity: '',
				cybersecurity_from: '',
				cybersecurity_to: '',
				arrested_investigated: '',
				arrested_investigated_from: '',
				arrested_investigated_to: '',
				limit: '',
				offset: ''
			};
			message = '';
			getCybercrimeData();
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

    // Filtra solo los parámetros que no están vacíos
    for (const [key, value] of Object.entries(search)) {  // Aquí usamos 'form' en lugar de 'search'
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
            cybercrime = [];  // Asegúrate de que 'cybercrimeData' esté definida en tu código
            return;
        }

        // Si la búsqueda fue exitosa, se almacenan los resultados en 'cybercrimeData'
        cybercrime = await res.json();

        // Mensajes según el número de resultados encontrados
        if (cybercrime.length === 0) {
            message = 'No se encontraron resultados para tu búsqueda.';
        } else {
            message = `Se encontraron ${cybercrime.length} resultados.`;
        }
    } catch (err) {
        console.error('[SEARCH] Error al buscar:', err);
        message = 'No se pudo conectar con el servidor.';
        cybercrime = [];  // Asegúrate de que 'cybercrimeData' esté definida en tu código
    }

    // Limpiar el mensaje después de 2 segundos
    setTimeout(() => (message = ''), 2000);
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
				await getCybercrimeData();
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
	
	function resetForm() {
		form = {
			autonomous_community: '',
			year: '',
			criminal_ofense: '',
			cybersecurity: '',
			arrested_investigated: ''
		};
	}
	
	async function loadInitialData() {
		const url = `${API}/loadInitialData`;
	
		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`Error ${res.status}`);
			message = 'Datos iniciales cargados.';
			await getCybercrimeData();
		} catch (error) {
			console.error('[LOAD INITIAL DATA] Error:', error);
			message = 'Error al cargar los datos iniciales.';
		}
		setTimeout(() => {
			message = '';
		}, 2000);
	}
	
/**
 * Elimina todos los registros de crimen cibernético de la API.
 * Informa al usuario si la operación fue exitosa o si hubo algún error.
 */
 async function deleteAll() {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar todos los registros de crimen cibernético?');
    if (!confirmDelete) return;

    try {
        const res = await fetch(API, { method: 'DELETE' });

        if (res.status === 200) {
            message = 'Todos los registros de crimen cibernético han sido eliminados.';
            await getCybercrimeData();  // Aquí obtenemos los datos actualizados después de la eliminación
        } else if (res.status === 404) {
            message = 'No hay registros de crimen cibernético que eliminar.';
        } else {
            message = `Error al eliminar los registros de crimen cibernético.`;
        }
    } catch (error) {
        console.error('[DELETE] Error eliminando registros de crimen cibernético:', error);
        message = 'Error al eliminar los registros de crimen cibernético.';
    }

    setTimeout(() => {
        message = '';
    }, 2000);
}

/**
 * Elimina un registro específico de crimen cibernético de la API usando sus identificadores.
 * Muestra mensajes según el resultado de la operación.
 */
async function deleteRecord(autonomous_community, year) {
    const confirmDelete = confirm(
        `¿Estás seguro de que quieres eliminar el registro de crimen cibernético en ${autonomous_community} (${year})?`
    );
    if (!confirmDelete) return;

    try {
        const res = await fetch(
            `${API}/${autonomous_community}/${year}`,
            { method: 'DELETE' }
        );

        if (res.status === 200) {
            message = `Registro de crimen cibernético en ${autonomous_community} (${year}) eliminado correctamente.`;
            await getCybercrimeData();  // Actualiza los datos después de eliminar el registro
        } else if (res.status === 404) {
            message = `Registro de crimen cibernético no encontrado.`;
        } else {
            message = `Error al eliminar el registro de crimen cibernético.`;
        }
    } catch (error) {
        console.error('[DELETE] Error eliminando el registro de crimen cibernético:', error);
        message = 'Error al eliminar el registro de crimen cibernético.';
    }

    setTimeout(() => {
        message = '';
    }, 2000);
}

onMount(async () => {
    await getCybercrimeData();  // Inicializa la carga de datos de crimen cibernético cuando se monta el componente
});

	</script>
	
<svelte:head>
	<title>Datos de Ciberdelincuencia</title>
</svelte:head>

<div class="wrapper dash">
	<div class="container dash">
		{#if message}
            <p class="info-message" transition:fade={{ duration: 300 }}>{message}</p>
		{/if}

		<div class="header">
			<h3>Datos de ciberdelincuencia</h3>
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
                <input placeholder="Comunidad Autónoma" bind:value={form.autonomous_community} required />
                <input type="number" placeholder="Año" bind:value={form.year} required />
                <input placeholder="Delitos Informáticos" bind:value={form.criminal_ofense} required />
                <input placeholder="Delitos contra la Ciberseguridad" bind:value={form.cybersecurity} required />
                <input placeholder="Detenidos / Investigados" bind:value={form.arrested_investigated} required />

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

				<input type="text" bind:value={search.criminal_ofense} placeholder="Delitos informáticos exacto" />
				<input type="number" bind:value={search.criminal_ofense_from} placeholder="Delitos inf. desde" />
				<input type="number" bind:value={search.criminal_ofense_to} placeholder="Delitos inf. hasta" />

				<input type="text" bind:value={search.cybersecurity} placeholder="Ciberseguridad exacto" />
				<input type="number" bind:value={search.cybersecurity_from} placeholder="Ciberseguridad desde" />
				<input type="number" bind:value={search.cybersecurity_to} placeholder="Ciberseguridad hasta" />

				<input type="text" bind:value={search.arrested_investigated} placeholder="Detenidos exacto" />
				<input type="number" bind:value={search.arrested_investigated_from} placeholder="Detenidos desde" />
				<input type="number" bind:value={search.arrested_investigated_to} placeholder="Detenidos hasta" />

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
                        <th>Delitos Informáticos</th>
                        <th>Delitos Ciberseguridad</th>
                        <th>Detenidos / Investigados</th>
                        <th>Acciones</th>
					</tr>
				</thead>
			</table>
			<div class="scroll-body">
				<table>
					<tbody>
						{#each cybercrime as entry}
							<tr>
								<td>{entry.autonomous_community}</td>
                                <td>{entry.year}</td>
                                <td>{entry.criminal_ofense}</td>
                                <td>{entry.cybersecurity}</td>
                                <td>{entry.arrested_investigated}</td>
								<td class="actions">
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										class="btn-circle"
										title="Editar Registro"
										on:click={() => goto(`/cybercrime/edit/${encodeURIComponent(entry.autonomous_community)}/${entry.year}`)}
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
	