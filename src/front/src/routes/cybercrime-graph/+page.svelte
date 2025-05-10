<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { fade } from 'svelte/transition';

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
		'Aragon',
		'Asturias',
		'Baleares',
		'Canarias',
		'Cantabria',
		'Castilla-La Mancha',
		'Castilla y Leon',
		'Cataluña',
		'Comunitat Valenciana',
		'Extremadura',
		'Galicia',
		'Madrid',
		'Murcia',
		'Navarra',
		'Pais Vasco',
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

			// Extraer años y niveles de cibercriminalidad únicos
			years = [...new Set(myData.map((item) => item.year))].sort();

			renderChart();
		} catch (error) {
			console.error(`ERROR al obtener datos de ${API}: ${error}`);
			// @ts-ignore
			errorMessage = `Error al cargar datos: ${error.message}`;
		} finally {
			loadingData = false;
		}
	}

	function renderChart() {
		if (myData.length === 0) {
			errorMessage = 'No hay datos disponibles para la comunidad seleccionada';
			return;
		}

		const criminal_ofense = [];
		const cybersecurity = [];
		const arrested_investigated = [];

		years.forEach((year) => {
			const record = myData.find((r) => String(r.year) === String(year));
			criminal_ofense.push(record?.criminal_ofense ?? 0);
			cybersecurity.push(record?.cybersecurity ?? 0);
			arrested_investigated.push(record?.arrested_investigated ?? 0);
		});

		const ctx = document.getElementById('pieChart')?.getContext('2d');
		if (!ctx) return;

		// Crear el gráfico de tarta
		new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Ofensa criminal', 'Ciberseguridad', 'Investigados arrestados'],
				datasets: [
					{
						data: [criminal_ofense[0], cybersecurity[0], arrested_investigated[0]], // Usar los datos del primer año
						backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						labels: {
							color: '#fff'
						}
					},
					title: {
						display: true,
						text: 'Distribución de Delitos por Nivel de Cibercriminalidad',
						color: '#fff',
						font: {
							size: 20,
							weight: 'bold',
							family: 'Arial'
						}
					}
				}
			}
		});
	}

	// Esta funcion carga los scripts necesarios
	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const existing = document.querySelector(`script[src="${src}"]`);
			if (existing) return resolve();

			const script = document.createElement('script');
			script.src = src;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	onMount(async () => {
		try {
			// Cargar Chart.js
			await loadScript('https://cdn.jsdelivr.net/npm/chart.js');

			await getData();
		} catch (error) {
			errorMessage = `Error cargando scripts: ${error}`;
			console.error(error);
		}
	});
</script>

<svelte:head>
	<title>Gráficas - Datos de Cibercriminalidad</title>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="wrapper">
	<div class="container">
		<h2>Gráficas de Datos de Cibercriminalidad</h2>
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
						Distribución de Delitos por Nivel de Cibercriminalidad
					</h3>
					<p>
						Visualiza la distribución de las delitos en los diferentes niveles de Cibercriminalidad
						(Ofensa criminal,Ciberseguridad,Investigados arrestados) para la comunidad autónoma seleccionada.
					</p>
					<br />
					<figure class="chartjs-figure">
						<div>
							{#if loadingData}
								<p>Cargando Datos...</p>
							{/if}
							{#if errorMessage}
								<p style="background-color: rgb(247, 111, 111); padding: 10px 20px;">
									{errorMessage}
								</p>
							{/if}
						</div>
					</figure>
					<figure class="chartjs-figure">
						{#if !loadingData && !errorMessage}
							<canvas id="pieChart"></canvas>
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
</style> 
 