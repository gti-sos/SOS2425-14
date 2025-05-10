<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { dev } from '$app/environment';
    import Chart from 'chart.js/auto'; // Asegúrate de tener Chart.js instalado

    let DEVEL_HOST = 'http://localhost:16078';
    const API_G15 = 'https://sos2425-15.onrender.com/api/v1/precipitation-stats/';
    const API_G20 = 'https://sos2425-20.onrender.com/api/v1/fines';
    const API_G12 = 'https://sos2425-12.onrender.com/api/v1/annual-consumptions';
    const API_G13 = 'https://sos2425-13.onrender.com/api/v2/national-parks';

    let API_CYBERCRIME = '/api/v1/cybercrime-data';
    if (dev) {
        API_CYBERCRIME = DEVEL_HOST + API_CYBERCRIME;
    }

    let data15 = [];
    let data20 = [];
    let data12 = [];
    let data13 = [];

    let loadingData = true;
    let errorMessage = '';

    // Fetch a API_G15 + datos criminales
    async function get15AndCrimeData() {
        loadingData = true;
        errorMessage = '';
        try {
            console.log(`Solicitando datos a: ${API_G15}`);
            const resG15 = await fetch(API_G15);
            if (!resG15.ok) throw new Error('Error al obtener datos de G15');
            const dataG15 = await resG15.json();

            console.log(`Solicitando datos a: ${API_CYBERCRIME}`);
            const resCrime = await fetch(API_CYBERCRIME);
            if (!resCrime.ok) throw new Error('Error al obtener datos de cybercrime-data');
            const dataCrime = await resCrime.json();

            const year = 2020;
            const provinciasSeleccionadas = ['almería', 'granada', 'jaén'];

            const combinedData = provinciasSeleccionadas.map((provincia) => {
                const meteo = dataG15.find(
                    (r) => r.province.toLowerCase() === provincia && r.year === year
                );
                // Relación provincia ↔ comunidad autónoma
                const comunidad =
                    provincia === 'almería' || provincia === 'granada' || provincia === 'jaén'
                        ? 'Andalucia'
                        : null;

                const crimen = dataCrime.find(
                    (r) => r.autonomous_community.toLowerCase() === comunidad?.toLowerCase() && r.year === year
                );

                const cyberRate = crimen ? crimen.cybersecurity / 10000 : 0;

                return {
                    province: provincia,
                    x: meteo?.annual_precipitation ?? 0,
                    y: meteo?.deviation ?? 0,
                    r: cyberRate
                };
            });
            console.log(`Datos combinados: ${combinedData.length} registros`);
            renderBubbleChart(combinedData);
        } catch (err) {
            console.error('Error combinando datos G15 + Criminalidad:', err);
            errorMessage = 'No se pudieron cargar los datos meteorológicos y criminales.';
        } finally {
            loadingData = false;
        }
    }

    // Render de la gráfica de Precipitación vs Criminalidad
    let chartG15CrimeInstance;

    function renderBubbleChart(data) {
        const ctx = document.getElementById('g15CrimeChart')?.getContext('2d');
        if (!ctx) return;

        if (chartG15CrimeInstance) {
            chartG15CrimeInstance.destroy();
            chartG15CrimeInstance = null;
        }

        chartG15CrimeInstance = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: data.map((d) => ({
                    label: d.province.toUpperCase(),
                    data: [{ x: d.x, y: d.y, r: d.r }],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)' // azul claro
                }))
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Relación entre Precipitación y Cibercriminalidad (2020)',
                        color: '#fff',
                        font: { size: 20, weight: 'bold' }
                    },
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Precipitación Anual (mm)',
                            color: '#fff'
                        },
                        ticks: { color: '#fff' }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Desviación respecto a la Media Histórica (mm)',
                            color: '#fff'
                        },
                        ticks: { color: '#fff' }
                    }
                }
            }
        });
    }

    // Fetch a API_G20
    async function getG20Data() {
        loadingData = true;
        errorMessage = '';
        try {
            console.log(`Solicitando datos a: ${API_G20}`);
            const res = await fetch(API_G20, {
                method: 'GET',
                headers: { Accept: 'application/json' }
            });

            if (!res.ok) {
                throw new Error(`Error en la respuesta: ${res.status}`);
            }

            const data = await res.json();
            data20 = data;
            console.log(`Datos recibidos: ${data20.length} registros`);
            render20Chart();
        } catch (error) {
            console.error(`ERROR al obtener datos de ${API_G20}: ${error}`);
            errorMessage = `Error al cargar datos: ${error.message}`;
        } finally {
            loadingData = false;
        }
    }

    // Render de la grafica
    let chart20Instance;

    function render20Chart() {
        // Filtramos los datos por año 2023
        const year = 2023;
        const filtered = data20.filter((r) => Number(r.anyo) === year);

        const countsByFines = {};
        for (const r of filtered) {
            const group = r.fines_group;
            countsByFines[group] = (countsByFines[group] || 0) + 1;
        }

        const labels = Object.keys(countsByFines).map((k) => `Grupo ${k}`);
        const values = Object.values(countsByFines);

        const ctx = document.getElementById('20Chart')?.getContext('2d');
        if (!ctx) return;

        if (chart20Instance) {
            chart20Instance.destroy();
            chart20Instance = null;
        }

        chart20Instance = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Número de accidentes por grupo Fines',
                        data: values,
                        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0', '#9966FF', '#00D98B']
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
                        text: 'Accidentes con Fineses por Grupo (2023)',
                        color: '#fff',
                        font: {
                            size: 20,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }
    
	//Esta funcion carga los scripts en vez de svelte:head
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
			// Charts.js
			await loadScript('https://cdn.jsdelivr.net/npm/chart.js');

			await get15AndCrimeData();
			await get20Data();
		} catch (error) {
			errorMessage = `Error cargando scripts: ${error}`;
			console.error(error);
		}
	});
</script>

<svelte:head>
	<title>Integrations - Pablo </title>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="wrapper">
	<div class="container">
		<h2 style="text-align: center;">Integraciones <br /><i>Pablo</i></h2>
		<hr style="width: 55em; animation: loadHrGraph 1s; transition: all 0.3s ease;" />
		<div transition:fade={{ duration: 400 }}>
			<div class="article" style="margin-top: 0;">
				<h3 style="font-size: 1.5em; text-transform: none;">
					Relación entre Precipitacion y Cibercriminalidad (2021)
				</h3>
				<p>
					Este gráfico tipo burbuja relaciona el uso del suelo (suelo desnudo y superficie arbolada) con 
					la tasa media de matriculación en Formación Profesional en provincias seleccionadas de Andalucía.
					El eje X representa la superficie de suelo, el eje Y la superficie arbolada y el tamaño de cada burbuja
					indica la tasa de FP promedio.
				</p>
				<a style="color: #fff;" href={API_G15} target="_blank"><i>G15 - ocupied-grand-stats</i></a>
				<a style="color: #fff; margin-left:1em;" href={API_EDUCATION} target="_blank"><i> G14-education-data</i></a>
				<figure class="chartjs-figure" transition:fade>
					{#if loadingData}
						<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>
					{/if}
					<canvas id="g15CrimeChart"></canvas>
				</figure>
			</div>
			<div class="article" style="margin-top: 1em;">
				<h3 style="font-size: 1.5em; text-transform: none;">
					Accidentes con Animales por Grupo (2023)
				</h3>
				<p>
					Este gráfico muestra cuántos accidentes de tráfico con animales estuvieron relacionados
					con cada grupo animal durante el año 2023. Permite identificar qué tipos de fauna están
					más implicados en este tipo de incidentes según los registros recopilados a nivel
					nacional.
				</p>
				<a style="color: #fff;" href={API_G20} target="_blank"
					><i>G20 - accidents-with-animals</i></a
				>
				<figure class="chartjs-figure" transition:fade>
					{#if loadingData}
						<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>
					{/if}
					<canvas id="20Chart"></canvas>
				</figure>
			</div>
			<div class="article">
				<h3 style="font-size: 1.5em;">Consumo Energético vs Tasa de Matriculación en FP (2021)</h3>
				<p>
					Este gráfico compara el consumo total de energía en distintas comunidades autónomas con la
					tasa de matriculación en Formación Profesional. Permite observar si existe alguna relación
					entre desarrollo energético y acceso a estudios técnicos.
				</p>
				<a style="color: #fff;" href={API_G12} target="_blank"><i>G12 - annual-consumptions</i></a>
				<a style="color: #fff; margin-left:1em;" href={API_EDUCATION} target="_blank"><i> G14-education-data</i></a>
				<figure class="chartjs-figure" transition:fade>
					{#if loadingData}
						<p style="color: #fff; text-align: center; font-weight: bold;">
							Cargando datos combinados...
						</p>
					{/if}
					<canvas id="combinedChart"></canvas>
				</figure>
			</div>
			<div class="article" style="margin-top: 0;">
				<h3 style="font-size: 1.5em; text-transform: none;">
					Superficie Actual de los Parques Nacionales
				</h3>
				<p>
					Este gráfico muestra la superficie actual en hectáreas de los distintos parques nacionales
					de España. Permite comparar el tamaño de cada parque natural y analizar cómo varía su
					extensión a lo largo del territorio nacional.
				</p>
				<a style="color: #fff;" href={API_G13} target="_blank"><i>G13 - national-parks</i></a>
				<figure class="chartjs-figure" transition:fade>
					{#if loadingData}
						<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>
					{/if}
					<canvas id="13Chart"></canvas>
				</figure>
			</div>
			<div class="article" style="margin-top: 2em;">
				<h3 style="font-size: 1.5em; text-transform: none;">
					Comparativa Climática de Varias Ciudades (Weather)
				</h3>
				<p>
					Este gráfico de burbujas permite comparar en tiempo real la temperatura, humedad y
					velocidad del viento en cinco ciudades españolas: Sevilla, Madrid, Barcelona, Valencia y
					Bilbao.
				</p>
				<a style="color: #fff;" href="https://openweathermap.org/current" target="_blank">
					<i>API externa - OpenWeatherMap</i>
				</a>
				<figure class="chartjs-figure" transition:fade>
					<canvas id="externalChart"></canvas>
				</figure>
			</div>
			<div class="article" style="margin-top: 0;">
				<h3 style="font-size: 1.5em; text-transform: none;">
					Temperatura Horaria en Sevilla (AEMET)
				</h3>
				<p>
					Este gráfico de dispersión representa las temperaturas registradas en distintas horas del
					día en Sevilla, según los datos proporcionados por la Agencia Estatal de Meteorología.
					Permite visualizar cómo varía la temperatura a lo largo de la jornada.
				</p>
				<a
					style="color: #fff;"
					href="https://www.aemet.es/es/eltiempo/prediccion/municipios/sevilla-id41091"
					target="_blank"
				>
					<i>AEMET - Predicción Sevilla</i>
				</a>
				<figure class="chartjs-figure" transition:fade>
					<p id="mensaje" style="color: #fff; text-align: center; font-weight: bold;"></p>
					<canvas id="aemetChart"></canvas>
				</figure>
			</div>
			<div class="article" style="margin-top: 0;">
				<h3 style="font-size: 1.5em; text-transform: none;">
					Comparativa de Descripciones en Publicaciones APOD (NASA)
				</h3>
				<p>
					Este gráfico muestra la longitud de las descripciones en los resultados de imágenes y
					vídeos de la NASA (Astronomy Picture of the Day), permitiendo una visión del nivel de
					detalle en cada contenido.
				</p>
				<a style="color: #fff;" href="https://images-api.nasa.gov" target="_blank"
					><i>NASA Images API</i></a
				>
				<figure class="chartjs-figure" transition:fade>
					<p id="mensaje-nasa" style="color: white; text-align: center; margin-top: 1em;"></p>
					<canvas id="nasaChart"></canvas>
				</figure>
			</div>
		</div>
	</div>
</div>

<style>
	.chartjs-figure {
		max-width: 45em;
		margin: 2em auto;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.473);
		padding: 1em;
		background: #052a42;
		border-radius: 10px;
	}
</style>

