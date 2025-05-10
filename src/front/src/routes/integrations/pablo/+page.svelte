<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { dev } from '$app/environment';

    let DEVEL_HOST = 'http://localhost:16078';
    const API_G15 = 'https://sos2425-15.onrender.com/api/v1/precipitation-stats/';
    let API_CYBERCRIME = '/api/v1/cybercrime-data';
    if (dev) {
        API_CYBERCRIME = DEVEL_HOST + API_CYBERCRIME;
    }

    let data15 = [];

    let loadingData = true;
    let errorMessage = '';

    // Fetch a API_G15 + datos criminales
    async function get15AndCrimeData() {
        loadingData = true;
        errorMessage = '';
        try {
            console.log(`Solicitando datos a: ${API_G15}`);
            const resG15 = await fetch('/api/g15precipitation');
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
		} catch (error) {
			errorMessage = `Error cargando scripts: ${error}`;
			console.error(error);
		}
	});
    </script>

    <svelte:head>
        <title>Integrations - Pablo Dominguez</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </svelte:head>

    <div class="wrapper">
        <div class="container">
            <h2 style="text-align: center;">Integraciones <br /><i>Pablo</i></h2>
            <hr style="width: 55em; animation: loadHrGraph 1s; transition: all 0.3s ease;" />
            <div transition:fade={{ duration: 400 }}>
                <!-- G15 - precipitation-stats -->
                <div class="article" style="margin-top: 0;">
                    <h3 style="font-size: 1.5em; text-transform: none;">
                        Relación entre Precipitacion y Cibercriminalidad (2021)
                    </h3>
                    <p>
                        Este gráfico tipo burbuja relaciona el uso del suelo (suelo desnudo y superficie arbolada) con 
                        la tasa media de delitos de cibercrimen en provincias seleccionadas de Andalucía.
                        El eje X representa la superficie de suelo, el eje Y la superficie arbolada y el tamaño de cada burbuja
                        indica la tasa de crimen promedio.
                    </p>
                    <a style="color: #fff;" href={API_G15} target="_blank"><i>G15 - precipitation-stats</i></a>
                    <a style="color: #fff; margin-left:1em;" href={API_CYBERCRIME} target="_blank"><i> G14-cybercrime-data</i></a>
                    <figure class="chartjs-figure" transition:fade>
                        {#if loadingData}
                            <p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>
                        {/if}
                        <canvas id="g15CrimeChart"></canvas>
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

