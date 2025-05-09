<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { dev } from '$app/environment';

	let DEVEL_HOST = 'http://localhost:16078';

	const API_G15 = 'https://sos2425-15.onrender.com/api/v1/ocupied-grand-stats/';
	const API_G20 = 'https://sos2425-20.onrender.com/api/v1/accidents-with-animals';
	const API_G12 = 'https://sos2425-12.onrender.com/api/v1/annual-consumptions';
	const API_G13 = 'https://sos2425-13.onrender.com/api/v2/national-parks';

	let API_EDUCATION = '/api/v1/education-data';
	if (dev) {
		API_EDUCATION = DEVEL_HOST + API_EDUCATION;
	}

	let data15 = [];
	let data20 = [];
	let data12 = [];
	let data13 = [];

	let loadingData = true;
	let errorMessage = '';

	// Fetch a API_G15 proxy local
	async function get15AndEducationData() {
		loadingData = true;
		errorMessage = '';

		try {
			console.log(`Solicitando datos a: ${API_G15}`);
			const resG15 = await fetch('/api/g15');
			if (!resG15.ok) throw new Error('Error al obtener datos de G15');
			const dataG15 = await resG15.json();

			console.log(`Solicitando datos a: ${API_EDUCATION}`);
			const resEdu = await fetch(API_EDUCATION);
			if (!resEdu.ok) throw new Error('Error al obtener datos de education-data');
			const dataEdu = await resEdu.json();

			const year = 2021;
			const provinciasSeleccionadas = ['cadiz', 'sevilla', 'granada'];

			const combinedData = provinciasSeleccionadas.map((provincia) => {
				const suelo = dataG15.find(
					(r) => r.province.toLowerCase() === provincia && r.year === year
				);

				// FP media por comunidad autónoma según provincia
				const comunidad =
					provincia === 'cadiz' || provincia === 'sevilla' || provincia === 'granada'
						? 'Andalucia'
						: null;

				const educ = dataEdu.find(
					(r) => r.autonomous_community.toLowerCase() === comunidad.toLowerCase() && r.year === year
				);

				const fpRate = educ ? (educ.basic_fp + educ.middle_grade + educ.higher_grade) / 3 : 0;

				return {
					province: provincia,
					x: suelo?.ground ?? 0,
					y: suelo?.wooded ?? 0,
					r: fpRate
				};
			});
			console.log(`Datos recibidos: ${combinedData.length} registros`);
			renderBubbleChart(combinedData);
		} catch (err) {
			console.error('Error combinando datos G15 + Education:', err);
			errorMessage = 'No se pudieron cargar los datos integrados.';
		} finally {
			loadingData = false;
		}
	}

	// Render de la grafica
	let chartG15EduInstance;

	function renderBubbleChart(data) {
		const ctx = document.getElementById('g15EduChart')?.getContext('2d');
		if (!ctx) return;

		if (chartG15EduInstance) {
			chartG15EduInstance.destroy();
			chartG15EduInstance = null;
		}

		chartG15EduInstance = new Chart(ctx, {
			type: 'bubble',
			data: {
				datasets: data.map((d) => ({
					label: d.province.toUpperCase(),
					data: [{ x: d.x, y: d.y, r: d.r }],
					backgroundColor: 'rgba(255, 99, 132, 0.5)'
				}))
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Relación entre Suelo y Tasa FP (2021)',
						color: '#fff',
						font: { size: 20, weight: 'bold' }
					},
					legend: { labels: { color: '#fff' } }
				},
				scales: {
					x: {
						title: { display: true, text: 'Superficie de Suelo (ground)', color: '#fff' },
						ticks: { color: '#fff' }
					},
					y: {
						title: { display: true, text: 'Superficie Arbolada (wooded)', color: '#fff' },
						ticks: { color: '#fff' }
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
	async function get12AndEducationData() {
		let loadingData = true;
		errorMessage = '';

		try {
			// G12
			console.log(`Solicitando datos a: ${API_G12}`);
			const resG12 = await fetch(API_G12);
			if (!resG12.ok) throw new Error('Error al obtener datos de G12');
			const dataG12Raw = await resG12.json();
			// EDUCATION
			console.log(`Solicitando datos a: ${API_EDUCATION}`);
			const resEdu = await fetch(API_EDUCATION);
			if (!resEdu.ok) throw new Error('Error al obtener datos de education-data');
			const dataEduRaw = await resEdu.json();
			// Año y comunidades seleccionadas
			const year = 2021;
			const comunidades = ['Andalucia', 'Madrid', 'Cataluña', 'Galicia', 'Comunitat Valenciana'];

			const combinedData = comunidades.map((comunidad) => {
				const g12 = dataG12Raw.find(
					(r) => r.aacc.toLowerCase().includes(comunidad.toLowerCase()) && r.year === year
				);

				const edu = dataEduRaw.find(
					(r) =>
						r.autonomous_community.toLowerCase().includes(comunidad.toLowerCase()) &&
						r.year === year
				);
				return {
					comunidad,
					consumo: g12?.total_consumption ?? 0,
					tasaMatriculacion:
						((edu?.basic_fp ?? 0) + (edu?.middle_grade ?? 0) + (edu?.higher_grade ?? 0)) * 10000
				};
			});
			console.log(`Datos recibidos: ${combinedData.length} registros`);
			renderCombinedChart(combinedData);
		} catch (err) {
			console.error('Error integrando G12 + Education:', err);
			errorMessage = 'Error cargando datos combinados.';
		} finally {
			loadingData = false;
		}
	}

	// Render del Grafico
	let chartCombinedInstance;

	function renderCombinedChart(data) {
		const ctx = document.getElementById('combinedChart')?.getContext('2d');
		if (!ctx) return;

		if (chartCombinedInstance) {
			chartCombinedInstance.destroy();
			chartCombinedInstance = null;
		}

		const labels = data.map((d) => d.comunidad);
		const consumos = data.map((d) => d.consumo);
		const tasas = data.map((d) => d.tasaMatriculacion);

		chartCombinedInstance = new Chart(ctx, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Consumo Energético (MWh)',
						data: consumos,
						backgroundColor: 'rgba(75, 192, 192, 0.6)',
						yAxisID: 'y'
					},
					{
						label: 'Tasa de Matriculación en FP (esc. ×10⁴)',
						data: tasas,
						backgroundColor: 'rgba(255, 99, 132, 0.6)',
						yAxisID: 'y1'
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: { labels: { color: '#fff' } },
					title: {
						display: true,
						text: 'Consumo Energético vs Tasa de Matriculación en FP (2021)',
						color: '#fff',
						font: { size: 20 }
					}
				},
				scales: {
					y: {
						type: 'linear',
						position: 'left',
						ticks: { color: '#fff' }
					},
					y1: {
						type: 'linear',
						position: 'right',
						grid: { drawOnChartArea: false },
						ticks: { color: '#fff' }
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
		weatherDatasets = [];

		try {
			console.log(`Solicitando datos a: /api/openweather`);
			const res = await fetch('/api/openweather');
			if (!res.ok) throw new Error('Error al obtener datos del servidor proxy');

			const allData = await res.json();

			for (const data of allData) {
				weatherDatasets.push({
					label: data.name,
					data: [
						{
							x: data.main.temp,
							y: data.main.humidity,
							r: Math.max(3, data.wind.speed * 2)
						}
					],
					backgroundColor: getColorForCity(data.name)
				});
			}
			console.log(`Datos recibidos: ${weatherDatasets.length} registros`);
			renderWeatherChart();
		} catch (error) {
			console.error('Error al obtener datos del clima:', error);
		}
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
			console.log(`Solicitando datos a: /api/aemet`);
			const res = await fetch('/api/aemet');
			if (!res.ok) throw new Error('Error al obtener los datos del servidor proxy');
			const data = await res.json();
			aemetData = data;
			console.log(`Datos recibidos: ${aemetData.length} registros`);
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

	// Fetch API externa: NASA proxy local
	let nasaData = [];

	async function getNASAData() {
		const mensaje = document.getElementById('mensaje-nasa');
		if (mensaje) mensaje.textContent = 'Cargando datos...';

		try {
			console.log(`Solicitando datos a: /api/nasa`);
			const res = await fetch('/api/nasa');
			const data = await res.json();
			nasaData = data;
			console.log(`Datos recibidos: ${nasaData.length} registros`);
			renderNASAChart(nasaData);
			if (mensaje) mensaje.textContent = '';
		} catch (err) {
			console.error('Error al obtener datos de NASA:', err);
			if (mensaje) mensaje.textContent = 'Error al obtener datos de NASA.';
		}
	}

	// Render Graph NASA
	let chartNASAInstance;

	function renderNASAChart(data) {
		const topItems = data.slice(0, 5);

		const labels = topItems.map((item) => item.title);
		const descLengths = topItems.map((item) => item.explanation.length);

		const ctx = document.getElementById('nasaChart')?.getContext('2d');
		if (!ctx) return;

		if (chartNASAInstance) {
			chartNASAInstance.destroy();
			chartNASAInstance = null;
		}

		chartNASAInstance = new Chart(ctx, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Longitud de la explicación',
						data: descLengths,
						backgroundColor: '#36A2EB'
					}
				]
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				plugins: {
					legend: {
						labels: {
							color: '#fff'
						}
					},
					title: {
						display: true,
						text: 'Longitud de las descripciones en APOD (NASA)',
						color: '#fff',
						font: {
							size: 20,
							weight: 'bold'
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: '#fff'
						},
						title: {
							display: true,
							text: 'Número de caracteres',
							color: '#fff'
						}
					},
					y: {
						ticks: {
							color: '#fff'
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

			await get15AndEducationData();
			await get20Data();
			await get12AndEducationData();
			await get13Data();
			await getWeatherData();
			await getAEMETData();
			await getNASAData();
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
		<hr style="width: 55em; animation: loadHrGraph 1s; transition: all 0.3s ease;" />
		<div transition:fade={{ duration: 400 }}>
			<div class="article" style="margin-top: 0;">
				<h3 style="font-size: 1.5em; text-transform: none;">
					Relación entre Uso del Suelo y Formación Profesional (2021)
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
					<canvas id="g15EduChart"></canvas>
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
