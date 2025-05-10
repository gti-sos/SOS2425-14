<script>
// @ts-nocheck
import { onMount } from 'svelte';
import { fade } from 'svelte/transition';
import { dev } from '$app/environment';

let DEVEL_HOST = 'http://localhost:16078';

const API_G15 = 'https://sos2425-15.onrender.com/api/v1/precipitation-stats/';
const API_G20 = 'https://sos2425-20.onrender.com/api/v1/fines/';


let API_CYBERCRIME = '/api/v1/cybercrime-data';
if (dev) {
    API_CYBERCRIME = DEVEL_HOST + API_CYBERCRIME;
}

let data15 = [];
let data20 = [];

let loadingData = true;
let errorMessage = '';

// Fetch API G15 + datos criminales
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

            return { province: provincia, x: meteo?.annual_precipitation ?? 0, y: meteo?.deviation ?? 0, r: cyberRate };
        });
        console.log(`Datos combinados: ${combinedData.length} registros`);
        renderColumnChart(combinedData);
    } catch (err) {
        console.error('Error combinando datos G15 + Criminalidad:', err);
        errorMessage = 'No se pudieron cargar los datos meteorológicos y criminales.';
    } finally {
        loadingData = false;
    }
}

// Render de la gráfica de Precipitación vs Criminalidad (Gráfico de Columnas)
function renderColumnChart(data) {
    Highcharts.chart('g15CrimeChart', {
        chart: {
            type: 'column',
            backgroundColor: '#052a42', // Fondo oscuro
        },
        title: {
            text: 'Relación entre Precipitación y Cibercriminalidad (2020)',
            style: { 
                color: '#fff', 
                fontWeight: 'bold' 
            }
        },
        xAxis: {
            categories: data.map(d => d.province),
            title: { 
                text: 'Provincias', 
                style: { 
                    color: '#fff' 
                } 
            },
            labels: { 
                style: { 
                    color: '#fff' 
                } 
            },
        },
        yAxis: {
            min: 0,
            title: { 
                text: 'Precipitación Anual (mm)', 
                style: { 
                    color: '#fff' 
                } 
            },
            labels: { 
                style: { 
                    color: '#fff' 
                } 
            }
        },
        tooltip: {
            pointFormat: 'Precipitación: {point.y} mm, Tasa de Cibercriminalidad: {point.r}',
            style: {
                color: '#fff'
            }
        },
        series: [{
            name: 'Provincias',
            data: data.map(d => ({ 
                name: d.province, 
                y: d.x, 
                r: d.r 
            })),
            color: '#36a2eb',
            dataLabels: {
                enabled: true, // Habilitar las etiquetas
                format: '{point.y} mm', // Mostrar el valor de la precipitación en cada barra
                style: {
                    color: '#fff',
                    fontWeight: 'bold'
                }
            }
        }],
        legend: { 
            itemStyle: { 
                color: '#fff' 
            }
        }
    });
}

// Fetch API G20
async function getFinesAndCybercrimeData() {
    let loadingData = true;
    errorMessage = '';

    try {
        // Solicitar datos de la API de tu compañero
        console.log(`Solicitando datos a: ${API_G20}`);
        const resG20 = await fetch(API_G20);
        if (!resG20.ok) throw new Error('Error al obtener datos de API_G20');
        const dataG20Raw = await resG20.json();

        // Solicitar datos de tu API
        console.log(`Solicitando datos a: ${API_CYBERCRIME}`);
        const resCrime = await fetch(API_CYBERCRIME);
        if (!resCrime.ok) throw new Error('Error al obtener datos de API_CYBERCRIME');
        const dataCrimeRaw = await resCrime.json();

        // Año y comunidades seleccionadas
        const year = 2023;
        const comunidades = ['Madrid']; // Comunidades seleccionadas

        const combinedData = comunidades.map((comunidad) => {
            // Buscar el año y comunidad correspondiente en los datos de tu compañero
            const finesData = dataG20Raw.find(
                (r) => r.city.toLowerCase().includes(comunidad.toLowerCase()) && r.year === year
            );

            // Buscar el año y comunidad correspondiente en tus datos (cybercrime)
            const cybercrimeData = dataCrimeRaw.find(
                (r) => r.autonomous_community.toLowerCase().includes(comunidad.toLowerCase()) && r.year === year
            );

            // Combinar la información de ambas fuentes
            return {
                comunidad,
                fines: finesData ? finesData.itv : 0, // Suponiendo que 'itv' es el número de infracciones
                cybercrime: cybercrimeData ? cybercrimeData.criminal_ofense : 0 // Suponiendo que 'criminal_ofense' es el número de delitos cibernéticos
            };
        });

        console.log(`Datos combinados: ${combinedData.length} registros`);
        renderCombinedChart(combinedData); // Llamamos a la función para renderizar la gráfica
    } catch (err) {
        console.error('Error al combinar datos de fines y cybercrime:', err);
        errorMessage = 'Error cargando los datos combinados.';
    } finally {
        loadingData = false;
    }
}

// Render gráfico combinado para G20 (Fines vs Cybercrime)
function renderCombinedChart(data) {
    Highcharts.chart('combinedChart', {
        chart: {
            backgroundColor: '#052a42'
        },
        title: {
            text: 'Infracciones vs Delitos Cibernéticos por Comunidad (2023)',
            style: {
                color: '#fff',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: data.map(d => d.comunidad),
            title: {
                text: 'Comunidades',
                style: {
                    color: '#fff'
                }
            },
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },
        yAxis: [{
            min: 0,
            title: {
                text: 'Cantidad',
                style: {
                    color: '#fff'
                }
            },
            labels: {
                style: {
                    color: '#fff'
                }
            }
        }],
        tooltip: {
            shared: true,
            style: {
                color: '#fff'
            }
        },
        series: [{
            name: 'Infracciones',
            type: 'column',
            data: data.map(d => d.fines),
            color: '#36a2eb',
            dataLabels: {
                enabled: true,
                format: '{point.y}',
                style: {
                    color: '#fff',
                    fontWeight: 'bold'
                }
            }
        }, {
            name: 'Delitos Cibernéticos',
            type: 'area',
            data: data.map(d => d.cybercrime),
            color: '#ff6384',
            fillOpacity: 0.4,
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: true,
                format: '{point.y}',
                style: {
                    color: '#fff',
                    fontWeight: 'bold'
                }
            }
        }],
        legend: {
            itemStyle: {
                color: '#fff'
            }
        }
    });
}

//API EXTERNA: news api
    let newsDatasets = [];

    async function getNewsData() {
        // Ciudades o temas que quieras investigar, como en el clima pero con categorías o fuentes para las noticias
        const categories = ['business', 'technology', 'sports', 'entertainment', 'health'];
        newsDatasets = [];

        try {
            console.log(`Solicitando datos a: /api/newsapi`);
            const res = await fetch('/api/newsapi');  // Aquí debería ir la llamada al servidor proxy
            if (!res.ok) throw new Error('Error al obtener datos del servidor proxy');

            const allData = await res.json();

            for (const data of allData.articles) {
                // Llenamos el array con los datos que queremos mostrar
                newsDatasets.push({
                    label: data.title, // Título de la noticia
                    data: [
                        {
                            x: Math.random() * 100,  // Esto se reemplaza con la posición X, podemos usar algo aleatorio o relevante
                            y: Math.random() * 100,  // Lo mismo para el eje Y
                            r: 10  // Representación del "tamaño", que puede ser un valor estático o dinámico
                        }
                    ],
                    backgroundColor: getColorForCategory(data.source.name)  // Color dependiendo de la fuente
                });
            }

            console.log(`Datos recibidos: ${newsDatasets.length} registros`);
            renderNewsChart();  // Función para renderizar el gráfico
        } catch (error) {
            console.error('Error al obtener datos de las noticias:', error);
        }
    }

    // Asignamos un color a las noticias dependiendo de la fuente o categoría
    function getColorForCategory(source) {
        const colors = {
            'BBC News': '#FF6384',
            'CNN': '#36A2EB',
            'Reuters': '#FFCE56',
            'TechCrunch': '#4BC0C0',
            'ESPN': '#9966FF'
        };
        return colors[source] || '#aaa';
    }

    // Renderizamos el gráfico con las noticias
    let newsChartInstance;

    function renderNewsChart() {
        const ctx = document.getElementById('externalChart')?.getContext('2d');
        if (!ctx) return;

        if (newsChartInstance) {
            newsChartInstance.destroy();
        }

        newsChartInstance = new Chart(ctx, {
            type: 'bubble',  // Mantenemos el tipo de gráfico de burbujas
            data: {
                datasets: newsDatasets  // Los datos de las noticias se pasan aquí
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
                        text: 'Noticias populares por fuente',
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
                            text: 'Posición aleatoria (X)',
                            color: '#fff'
                        },
                        ticks: { color: '#fff' }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Posición aleatoria (Y)',
                            color: '#fff'
                        },
                        ticks: { color: '#fff' }
                    }
                }
            }
        });
    }



// Esta función carga los scripts en vez de svelte:head
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
        // Cargar Highcharts
        await loadScript('https://code.highcharts.com/highcharts.js');
        
        await get15AndCrimeData();
        await getFinesAndCybercrimeData();

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
            <div class="article" style="margin-top: 0;">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Relación entre Precipitación y Cibercriminalidad (2021)
                </h3>
                <p>
                    Este gráfico de columnas relaciona la precipitación anual con la tasa de delitos de cibercrimen en
                    provincias seleccionadas de Andalucía.
                </p>
                <a style="color: #fff;" href={API_G15} target="_blank"><i>G15 - precipitation-stats</i></a>
                <a style="color: #fff; margin-left:1em;" href={API_CYBERCRIME} target="_blank"><i> G14-cybercrime-data</i></a>
                <figure class="chartjs-figure" transition:fade>
                    {#if loadingData}
                        <p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>
                    {/if}
                    <div id="g15CrimeChart"></div>
                </figure>
            </div>

            <!-- Sección del gráfico G20 -->
            <div class="article" style="margin-top: 3em;">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Relación entre Infracciones y Cibercriminalidad por Comunidad (2023)
                </h3>
                <p>
                    Este gráfico de barras muestra la relación entre las infracciones (ITV) y los delitos de cibercriminalidad por comunidades en el año 2023.
                </p>
                <a style="color: #fff;" href={API_G20} target="_blank"><i>G20 - fines-data</i></a>
                <a style="color: #fff; margin-left:1em;" href={API_CYBERCRIME} target="_blank"><i> G14-cybercrime-data</i></a>
                <figure class="chartjs-figure" transition:fade>
                    {#if loadingData}
                        <p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>
                    {/if}
                    <div id="combinedChart"></div> <!-- Aquí se renderiza el gráfico G20 -->
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
