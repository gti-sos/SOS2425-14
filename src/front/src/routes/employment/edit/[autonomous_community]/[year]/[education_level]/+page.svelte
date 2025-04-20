<script>
   // @ts-nocheck

    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { dev } from '$app/environment';

    let autonomous_community = '';
    let year = '';
    let education_level = '';
    let activity_rate = '';
    let employment_rate = '';
    let unemployment_rate = '';
    let message = '';

    $: {
        const params = $page.params;
        autonomous_community = decodeURIComponent(params.autonomous_community);
        year = params.year;
        education_level = decodeURIComponent(params.education_level);
    }
    

    let DEVEL_HOST = 'http://localhost:16078';
    let API_BASE = '/api/v1/employment-data';

    if (dev) {
        API_BASE = `${DEVEL_HOST}/api/v1/employment-data`;
    }

    $: API = `${API_BASE}/${encodeURIComponent(autonomous_community)}/${year}/${encodeURIComponent(education_level)}`;

    onMount(async () => {
        try {
        const res = await fetch(API);
        if (!res.ok) throw new Error('No se pudo cargar el recurso.');
        const data = await res.json();

        autonomous_community = data.autonomous_community;
        year = data.year;
        education_level = data.education_level;
        activity_rate = data.activity_rate;
        employment_rate = data.employment_rate;
        unemployment_rate = data.unemployment_rate;
        } catch (err) {
        message = `Error al cargar los datos: ${err.message}`;
        }
    });

	async function updateRecord() {
		try {
			const res = await fetch(API, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					autonomous_community,
					year: parseInt(year),
					education_level,
					activity_rate: parseFloat(activity_rate),
					employment_rate: parseFloat(employment_rate),
					unemployment_rate: parseFloat(unemployment_rate)
				})
			});

			if (res.ok) {
				message = 'Registro actualizado correctamente';
				setTimeout(() => goto('/employment'), 1500);
			} else if (res.status === 400) {
				const errorData = await res.json();
				message = `Error en los datos`;
			} else if (res.status === 404) {
				message = 'El recurso que intentas actualizar no existe.';
			} else {
				message = 'Error inesperado al actualizar el registro.';
			}
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
			message = `No se pudo conectar con el servidor`;
		}
	}

	function cancel() {
		goto('/employment');
	}
</script>
<svelte:head>
	<title>Editar recurso</title>
</svelte:head>

<div class="wrapper dash">
	<div class="container dash">
		{#if message}
            <p class="info-message" transition:fade={{ duration: 300 }}>{message}</p>
		{/if}

        <form class="create-form" on:submit|preventDefault={updateRecord}>
            <input bind:value={autonomous_community} readonly />
            <input bind:value={year} readonly />
            <select bind:value={education_level} disabled>
                <option value="" disabled selected>Nivel educativo</option>
                <option value="SUP">Educación superior (SUP)</option>
                <option value="SEC">Secundaria (SEC)</option>
                <option value="INF">Inferior a secundaria (INF)</option>
                <option value="TOTAL">Total (TOTAL)</option>
            </select>
            <input bind:value={activity_rate} placeholder="Tasa actividad" />
            <input bind:value={employment_rate} placeholder="Tasa empleo" />
            <input bind:value={unemployment_rate} placeholder="Tasa paro" />
            <button type="submit" class="submit">Actualizar</button>
            <button type="button" class="cancel" on:click={cancel}>Cancelar</button>
        </form>
	</div>
</div>

