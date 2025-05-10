<script lang="ts">
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { fade } from 'svelte/transition';
  import Chart from 'chart.js/auto';

  let DEVEL_HOST = 'http://localhost:16078';
  let BASE_API = '/api/v1/cybercrime-data';

  if (dev) {
    BASE_API = DEVEL_HOST + BASE_API;
  }

  let myData = [];
  let years = [];
  let loadingData = true;
  let errorMessage = '';

  let showChart = false;

  // Lista de comunidades autónomas españolas
  const communities = [
    'Andalucia',
    'Madrid',
    'Cataluña',
    'Valencia',
    'Galicia',
    'Pais Vasco',
    'Castilla-La Mancha',
    'Castilla y Leon',
    'Murcia',
    'Aragon',
    'Baleares',
    'Cantabria',
    'Extremadura',
    'La Rioja',
    'Ceuta y Melilla',
    'TOTAL'
  ];

  let selectedCommunity = '';
  
  // Función que se ejecuta cuando se cambia la comunidad seleccionada
  function handleCommunityChange() {
    errorMessage = '';
    showChart = true;
    getData();
  }

  async function getData() {
    loadingData = true;
    errorMessage = '';

    // Construir la URL con el parámetro de la comunidad seleccionada
    const API = `${BASE_API}?autonomous_community=${encodeURIComponent(selectedCommunity)}`;

    try {
      console.log(`Solicitando datos a: ${API}`);
      const res = await fetch(API, { method: 'GET' });
      if (!res.ok) {
        throw new Error(`Error en la respuesta: ${res.status}`);
      }

      const data = await res.json();
      myData = data;
      console.log(`Datos recibidos: ${myData.length} registros para ${selectedCommunity}`);

      // Extraer años únicos
      years = [...new Set(myData.map((item) => item.year))].sort();

      renderPieChart();
    } catch (error) {
      console.error(`ERROR al obtener datos de ${API}: ${error}`);
      errorMessage = `Error al cargar datos: ${error.message}`;
    } finally {
      loadingData = false;
    }
  }

  function renderPieChart() {
    if (myData.length === 0) {
      errorMessage = 'No hay datos disponibles para la comunidad seleccionada';
      return;
    }

    const criminalOfense = [];
    const cybersecurity = [];
    const arrestedInvestigated = [];

    myData.forEach((record) => {
      criminalOfense.push(record.criminal_ofense ?? 0);
      cybersecurity.push(record.cybersecurity ?? 0);
      arrestedInvestigated.push(record.arrested_investigated ?? 0);
    });

    const ctx = document.getElementById('pieChart')?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Ciberseguridad', 'Delitos Criminales', 'Arrestados/Investigados'],
        datasets: [
          {
            label: `Distribución de Cibercrimen en ${selectedCommunity}`,
            data: [
              criminalOfense.reduce((a, b) => a + b, 0),
              cybersecurity.reduce((a, b) => a + b, 0),
              arrestedInvestigated.reduce((a, b) => a + b, 0),
            ],
            backgroundColor: ['#4dc9f6', '#f67019', '#f53794'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Distribución de Cibercrimen en ${selectedCommunity}`,
            color: '#fff',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
      },
    });
  }

  onMount(async () => {
    await getData();
  });
</script>

<svelte:head>
  <title>Gráfico de Cibercrimen</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="wrapper">
  <div class="container">
    <h2>Gráficas de Datos de Cibercrimen</h2>
    <hr style="width: 55em; animation: loadHrGraph 1s; transition: all 0.3s ease;" />

    <!-- Selector de comunidad -->
    <div class="graph-container" style="background: none; box-shadow: none; padding: 0.5em 0;">
      <h3>Selecciona la comunidad autónoma:</h3>
      <select
        class="custom-select"
        bind:value={selectedCommunity}
        on:change={handleCommunityChange}
        style="width: 150%;"
      >
        <option disabled value="">Selecciona una comunidad</option>
        {#each communities as community}
          <option value={community}>{community}</option>
        {/each}
      </select>
    </div>

    {#if showChart}
      <div transition:fade={{ duration: 400 }}>
        <div class="article">
          <h3 style="font-size: 1.5em; text-transform: none;">
            Distribución de Cibercrimen por Categoría
          </h3>
          <p>
            Visualiza cómo se distribuyen los incidentes de ciberseguridad, los delitos criminales y los arrestos/investigaciones en la comunidad autónoma seleccionada.
          </p>
          <br />
          <figure class="chartjs-figure">
            <canvas id="pieChart"></canvas>
            {#if loadingData}
              <p>Cargando Datos...</p>
            {/if}
            {#if errorMessage}
              <p style="background-color: rgb(247, 111, 111); padding: 10px 20px;">
                {errorMessage}
              </p>
            {/if}
          </figure>
        </div>
      </div>
    {/if}
  </div>
</div>
<style>
  .chartjs-figure {
    min-width: 45em;
    max-width: 45em;
    margin: 2em auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.473);
    padding: 1em;
    background: #052a42;
    border-radius: 10px;
  }

  /* Estilos adicionales */
  .wrapper {
    padding: 2rem;
    background-color: #e5e5e5;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: #052a42;
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
  }

  hr {
    border: 1px solid #052a42;
    width: 100%;
    margin: 20px 0;
  }

  .graph-container {
    margin-bottom: 20px;
  }

  .custom-select {
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    background-color: #f5f5f5;
  }

  .article {
    margin-bottom: 2rem;
  }
</style>
