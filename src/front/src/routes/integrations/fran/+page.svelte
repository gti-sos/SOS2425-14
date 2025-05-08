<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const API_G15 = 'https://sos2425-15.onrender.com/api/v1/ocupied-grand-stats/';
	const API_G20 = 'https://sos2425-20.onrender.com/api/v1/accidents-with-animals';
	const API_G12 = 'https://sos2425-12.onrender.com/api/v1/annual-consumptions';
	const API_G13 = 'https://sos2425-13.onrender.com/api/v2/national-parks';

	let data15 = [];
	let data20 = [];
	let data12 = [];
	let data13 = [];

	let loadingData = true;
	let errorMessage = '';

	// Fetch a API_G15
	async function get15Data() {
		loadingData = true;
		errorMessage = '';

		try {
			console.log(`Solicitando datos a: ${API_G15}`);
			const res = await fetch(API_G15, {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				}
			});

			if (!res.ok) {
				throw new Error(`Error en la respuesta: ${res.status}`);
			}

			const data = await res.json();
			data15 = data;
			console.log(`Datos recibidos: ${data15.length} registros`);

			render15Chart();
		} catch (error) {
			console.error(`ERROR al obtener datos de ${API_G15}: ${error}`);
			errorMessage = `Error al cargar datos: ${error.message}`;
		} finally {
			loadingData = false;
		}
	}

	// Render de la grafica
	let chart15Instance;
	let selectedYear15 = 2021;
	let selectedProvince15 = 'cadiz';

	function render15Chart() {
		const record = data15.find(
			(r) =>
				Number(r.year) === Number(selectedYear15) &&
				r.province.toLowerCase() === selectedProvince15.toLowerCase()
		);

		if (!record) return;

		const ctx = document.getElementById('15Chart')?.getContext('2d');
		if (!ctx) return;

		if (chart15Instance) {
			chart15Instance.destroy();
			chart15Instance = null;
		}

		chart15Instance = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: ['Ground', 'Grass', 'Wooded', 'Non Agrarian Surface'],
				datasets: [
					{
						label: `${record.province.toUpperCase()} - ${selectedYear15}`,
						data: [
							record.ground ?? 0,
							record.grass ?? 0,
							record.wooded ?? 0,
							record.non_agrarian_surface ?? 0
						],
						backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0']
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
						text: 'Distribución del Uso del Suelo en Cádiz',
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

	// Fetch a API_G20
	async function get20Data() {
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
		// Agrupar accidentes por grupo de animal (solo para año 2023)
		const year = 2023;
		const filtered = data20.filter((r) => Number(r.anyo) === year);

		const countsByAnimal = {};
		for (const r of filtered) {
			const group = r.animal_group;
			countsByAnimal[group] = (countsByAnimal[group] || 0) + 1;
		}

		const labels = Object.keys(countsByAnimal).map((k) => `Grupo ${k}`);
		const values = Object.values(countsByAnimal);

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
						label: 'Número de accidentes por grupo animal',
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
						text: 'Accidentes con Animales por Grupo (2023)',
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

	//Fetch a API_G12
	async function get12Data() {
		loadingData = true;
		errorMessage = '';

		try {
			console.log(`Solicitando datos a: ${API_G12}`);
			const res = await fetch(API_G12, {
				method: 'GET',
				headers: { Accept: 'application/json' }
			});

			if (!res.ok) {
				throw new Error(`Error en la respuesta: ${res.status}`);
			}

			const data = await res.json();
			data12 = data;
			console.log(`Datos recibidos: ${data12.length} registros`);

			render12Chart();
		} catch (error) {
			console.error(`ERROR al obtener datos de ${API_G12}: ${error}`);
			errorMessage = `Error al cargar datos: ${error.message}`;
		} finally {
			loadingData = false;
		}
	}

	// Render del Grafico
	let chart12Instance;
	let selectedYear12 = 2021;
	let selectedCommunity12 = 'Andalucía';

	function render12Chart() {
		const record = data12.find(
			(r) =>
				Number(r.year) === Number(selectedYear12) &&
				r.aacc.toLowerCase().includes(selectedCommunity12.toLowerCase())
		);

		if (!record) return;

		const ctx = document.getElementById('12Chart')?.getContext('2d');
		if (!ctx) return;

		if (chart12Instance) {
			chart12Instance.destroy();
			chart12Instance = null;
		}

		chart12Instance = new Chart(ctx, {
			type: 'radar',
			data: {
				labels: ['Electricidad', 'Gas', 'Otros'],
				datasets: [
					{
						label: `${record.aacc} - ${selectedYear12}`,
						data: [record.electricity ?? 0, record.gas ?? 0, record.other ?? 0],
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: '#36A2EB',
						pointBackgroundColor: '#fff',
						pointBorderColor: '#36A2EB'
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						labels: { color: '#fff' }
					},
					title: {
						display: true,
						text: 'Distribución del Consumo Energético',
						color: '#fff',
						font: {
							size: 20,
							weight: 'bold',
							family: 'Arial'
						}
					}
				},
				scales: {
					r: {
						pointLabels: {
							color: '#fff'
						},
						grid: {
							color: 'rgba(255,255,255,0.2)'
						},
						angleLines: {
							color: 'rgba(255,255,255,0.2)'
						},
						ticks: {
							color: '#fff',
							beginAtZero: true
						}
					}
				}
			}
		});
	}

	// Fetch API_G13
	async function get13Data() {
		loadingData = true;
		errorMessage = '';

		try {
			console.log(`Solicitando datos a: ${API_G13}`);
			const res = await fetch(API_G13, {
				method: 'GET',
				headers: { Accept: 'application/json' }
			});
			if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);

			const data = await res.json();
			data13 = data;
			console.log(`Datos recibidos: ${data13.length} parques`);
			render13Chart();
		} catch (error) {
			console.error(`ERROR al obtener datos de ${API_G13}: ${error}`);
			errorMessage = `Error al cargar datos: ${error.message}`;
		} finally {
			loadingData = false;
		}
	}

	// Render de la Grafica
	let chart13Instance;

	function render13Chart() {
		if (!data13.length) return;

		const ctx = document.getElementById('13Chart')?.getContext('2d');
		if (!ctx) return;

		if (chart13Instance) {
			chart13Instance.destroy();
			chart13Instance = null;
		}

		const labels = data13.map((p) => p.national_park);
		const data = data13.map((p) => p.current_area);

		chart13Instance = new Chart(ctx, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Superficie actual (ha)',
						data,
						backgroundColor: '#36A2EB'
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						labels: { color: '#fff' }
					},
					title: {
						display: true,
						text: 'Superficie Actual de los Parques Nacionales',
						color: '#fff',
						font: { size: 20, weight: 'bold', family: 'Arial' }
					}
				},
				scales: {
					x: {
						ticks: { color: '#fff' },
						title: {
							display: true,
							text: 'Parque Nacional',
							color: '#fff'
						}
					},
					y: {
						ticks: { color: '#fff' },
						title: {
							display: true,
							text: 'Hectáreas',
							color: '#fff'
						}
					}
				}
			}
		});
	}

	// API externa: Weather
	let weatherDatasets = [];

	async function getWeatherData() {
		const cities = ['Sevilla', 'Madrid', 'Barcelona', 'Valencia', 'Bilbao'];
		const apiKey = '55118ddd755b760e6675758a815cbb0d';

		weatherDatasets = [];

		for (const city of cities) {
			try {
				const res = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
				);
				const data = await res.json();

				if (res.ok) {
					weatherDatasets.push({
						label: city,
						data: [
							{
								x: data.main.temp,
								y: data.main.humidity,
								r: Math.max(3, data.wind.speed * 2)
							}
						],
						backgroundColor: getColorForCity(city)
					});
				} else {
					console.warn(`Error obteniendo datos para ${city}:`, data?.message);
				}
			} catch (err) {
				console.error(`Error con ${city}:`, err);
			}
		}

		renderWeatherChart();
	}

	function getColorForCity(city) {
		const colors = {
			Sevilla: '#FF6384',
			Madrid: '#36A2EB',
			Barcelona: '#FFCE56',
			Valencia: '#4BC0C0',
			Bilbao: '#9966FF'
		};
		return colors[city] || '#aaa';
	}

	// Render Graph Weather API
	let weatherChartInstance;

	function renderWeatherChart() {
		const ctx = document.getElementById('externalChart')?.getContext('2d');
		if (!ctx) return;

		if (weatherChartInstance) {
			weatherChartInstance.destroy();
		}

		weatherChartInstance = new Chart(ctx, {
			type: 'bubble',
			data: {
				datasets: weatherDatasets
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
						text: 'Condiciones climáticas en ciudades de España',
						color: '#fff',
						font: {
							size: 18,
							weight: 'bold'
						}
					}
				},
				scales: {
					x: {
						title: {
							display: true,
							text: 'Temperatura (°C)',
							color: '#fff'
						},
						ticks: { color: '#fff' }
					},
					y: {
						title: {
							display: true,
							text: 'Humedad (%)',
							color: '#fff'
						},
						ticks: { color: '#fff' }
					}
				}
			}
		});
	}

	// Llamada al proxy local de AEMET
	let aemetData = [];

	async function getAEMETData() {
		loadingData = true;
		errorMessage = '';

		try {
			const res = await fetch('/api/aemet'); // asumimos que tu +server.js está en esa ruta
			if (!res.ok) throw new Error('Error al obtener los datos del servidor proxy');

			const data = await res.json();
			aemetData = data;
			console.log(aemetData);
			renderAEMETChart(aemetData);
		} catch (error) {
			console.error('Error cargando datos AEMET:', error);
			errorMessage = 'No se pudieron cargar los datos AEMET.';
		} finally {
			loadingData = false;
		}
	}

	// Render Grahp API AEMET
	let chartAEMETInstance;

	function renderAEMETChart(data) {
		const temperaturas = data?.[0]?.prediccion?.dia?.[0]?.temperatura?.dato;

		if (!temperaturas || !Array.isArray(temperaturas) || temperaturas.length === 0) {
			console.warn('No hay datos de temperatura disponibles');
			mensaje.textContent = 'No hay datos de temperatura disponibles.';
			return;
		}

		const scatterData = temperaturas.map((t) => ({
			x: Number(t.hora),
			y: Number(t.value)
		}));

		const ctx = document.getElementById('aemetChart')?.getContext('2d');
		if (!ctx) return;

		if (chartAEMETInstance) {
			chartAEMETInstance.destroy();
			chartAEMETInstance = null;
		}

		chartAEMETInstance = new Chart(ctx, {
			type: 'scatter',
			data: {
				datasets: [
					{
						label: 'Temperatura horaria (°C)',
						data: scatterData,
						backgroundColor: '#36A2EB'
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						labels: { color: '#fff' }
					},
					title: {
						display: true,
						text: 'Temperatura Horaria en Sevilla',
						color: '#fff',
						font: { size: 20, weight: 'bold' }
					}
				},
				scales: {
					x: {
						title: { display: true, text: 'Hora', color: '#fff' },
						ticks: { color: '#fff' },
						type: 'linear',
						position: 'bottom'
					},
					y: {
						title: { display: true, text: 'Temperatura (°C)', color: '#fff' },
						ticks: { color: '#fff' }
					}
				}
			}
		});

		mensaje.textContent = '';
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

			await get15Data();
			await get20Data();
			await get12Data();
			await get13Data();
			await getWeatherData();
			await getAEMETData();
		} catch (error) {
			errorMessage = `Error cargando scripts: ${error}`;
			console.error(error);
		}
	});
</script>

<svelte:head>
	<title>Integrations - Francisco Javier</title>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="wrapper">
	<div class="container">
		<h2 style="text-align: center;">Integraciones <br /><i>Francisco Javier</i></h2>
		<hr style="width: 100%; animation: loadHrGraph 1s; transition: all 0.3s ease;" />
		<div transition:fade={{ duration: 400 }}>
			<div class="article" style="margin-top: 0;">
				<h3 style="font-size: 1.5em; text-transform: none;">
					Distribución del Uso del Suelo en Cádiz
				</h3>
				<p>
					Este gráfico representa cómo se reparte la superficie de la provincia de Cádiz entre
					distintos usos del suelo: superficie cultivada, pastos, terreno forestal y superficie no
					agraria. La visualización permite observar de forma clara qué tipo de aprovechamiento
					predomina en el territorio durante el año seleccionado.
				</p>
				<a style="color: #fff;" href={API_G15} target="_blank"><i>G15 - ocupied-grand-stats</i></a>
				<figure class="chartjs-figure" transition:fade>
					{#if loadingData}
						<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>
					{/if}
					<canvas id="15Chart"></canvas>
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
			<div class="article" style="margin-top: 0;">
				<h3 style="font-size: 1.5em; text-transform: none;">
					Distribución del Consumo Energético por Fuente
				</h3>
				<p>
					Este gráfico radar muestra cómo se reparte el consumo energético entre electricidad, gas y
					otras fuentes en Andalucía durante el año 2021. Esta visualización permite comparar
					fácilmente las prioridades energéticas regionales y su evolución temporal.
				</p>
				<a style="color: #fff;" href={API_G12} target="_blank"><i>G12 - annual-consumptions</i></a>
				<figure class="chartjs-figure" transition:fade>
					{#if loadingData}
						<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>
					{/if}
					<canvas id="12Chart"></canvas>
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
				<h3>Comparativa Climática de Varias Ciudades</h3>
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
