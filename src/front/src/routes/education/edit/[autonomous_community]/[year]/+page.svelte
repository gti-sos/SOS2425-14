<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { dev } from '$app/environment';

    let autonomous_community = '';
    let year = '';
    let basic_fp = '';  
    let middle_grade = '';  
    let higher_grade = '';
    let message = '';

    $: {
        const params = $page.params;
        autonomous_community = decodeURIComponent(params.autonomous_community);
        year = params.year;
    }

    let DEVEL_HOST = 'http://localhost:16078';
    let API_BASE = '/api/v1/education-data';

    if (dev) {
        API_BASE = `${DEVEL_HOST}/api/v1/education-data`;
    }

    $: API = `${API_BASE}/${encodeURIComponent(autonomous_community)}/${year}`;

    onMount(async () => {
        try {
            const res = await fetch(API);
            if (!res.ok) throw new Error('No se pudo cargar el recurso.');
            const data = await res.json();

            autonomous_community = data.autonomous_community;
            year = data.year;
            basic_fp = data.basic_fp;
            middle_grade = data.middle_grade;
            higher_grade = data.higher_grade;
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
                    autonomous_community: autonomous_community,
                    year: parseInt(year),
                    // Forzamos los valores a float
                    basic_fp: parseFloat(basic_fp) || 0.0,
                    middle_grade: parseFloat(middle_grade) || 0.0,
                    higher_grade: parseFloat(higher_grade) || 0.0
                })
            });

            if (res.ok) {
                message = 'Registro actualizado correctamente';
                setTimeout(() => goto('/education'), 1500);
            } else if (res.status === 400) {
                const errorData = await res.json();
                message = `Error en los datos: ${errorData.error}`;
            } else if (res.status === 404) {
                message = 'El recurso que intentas actualizar no existe.';
            } else {
                message = 'Error inesperado al actualizar el registro.';
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            message = `No se pudo conectar con el servidor: ${errorMessage}`;
        }
    }

    function cancel() {
        goto('/education');
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
            <input type="number" bind:value={basic_fp} placeholder="Formación Profesional Básica" step="any" />
            <input type="number" bind:value={middle_grade} placeholder="Grado Medio" step="any" />
            <input type="number" bind:value={higher_grade} placeholder="Grado Superior" step="any" />
            <button type="submit" class="submit">Actualizar</button>
            <button type="button" class="cancel" on:click={cancel}>Cancelar</button>
        </form>
    </div>
</div>
