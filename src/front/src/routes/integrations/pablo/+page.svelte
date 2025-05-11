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
                type: 'bar',
                backgroundColor: '#052a42'
            },
            title: {
                text: 'Infracciones ITV vs Cibercrimen en Madrid (2023)',
                style: {
                    color: '#fff',
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                categories: ['Madrid'],
                title: {
                    text: null
                },
                labels: {
                    style: { color: '#fff' }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Cantidad',
                    style: { color: '#fff' }
                },
                labels: {
                    style: { color: '#fff' }
                }
            },
            legend: {
                reversed: true,
                itemStyle: {
                    color: '#fff'
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#fff',
                            fontWeight: 'bold'
                        }
                    }
                }
            },
            tooltip: {
                shared: true,
                style: {
                    color: '#fff'
                }
            },
            series: [{
                name: 'Cibercrimen',
                data: data.map(d => d.cybercrime),
                color: '#ff6384'
            }, {
                name: 'Infracciones ITV',
                data: data.map(d => d.fines),
                color: '#36a2eb'
            }]
        });
    }


//API EXTERNA: news api
let newsDatasets = [];

async function getNewsData() {
    try {
        console.log(`Solicitando datos a: /api/newsapi`);
        const res = await fetch('/api/newsapi');
        if (!res.ok) throw new Error('Error al obtener datos del servidor proxy');

        const allData = await res.json();
        const titles = [];
        const wordCounts = [];
        const colors = [];

        for (const categoryGroup of allData) {
            for (const article of categoryGroup.articles) {
                const title = article.title;
                const wordCount = title.split(' ').length;

                titles.push(title);
                wordCounts.push(wordCount);
                colors.push(getColorForCategory(article.source.name));
            }
        }

        console.log(`Noticias procesadas: ${titles.length}`);
        renderNewsChart(titles, wordCounts, colors);
    } catch (error) {
        console.error('Error al obtener datos de las noticias:', error);
    }
}

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

let newsChartInstance;

function renderNewsChart(labels, data, colors) {
    const ctx = document.getElementById('externalChart')?.getContext('2d');
    if (!ctx) return;

    if (newsChartInstance) {
        newsChartInstance.destroy();
    }

    newsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nº de palabras en el título',
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                },
                title: {
                    display: true,
                    text: 'Cantidad de palabras por título de noticia',
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
                        text: 'Número de palabras',
                        color: '#fff'
                    },
                    ticks: { color: '#fff' }
                },
                y: {
                    ticks: {
                        color: '#fff',
                        callback: function(value, index) {
                            const label = this.getLabelForValue(index);
                            return label.length > 60 ? label.slice(0, 57) + '...' : label;
                        }
                    }
                }
            }
        }
    });
}


    // API EXTERNA: JSONPlaceholder
    let jsonPlaceholderData = [];  // Aquí almacenaremos los datos de JSONPlaceholder

    // Función para obtener los datos de JSONPlaceholder
    async function getJsonPlaceholderData() {
        try {
            console.log(`Solicitando datos a: /api/jsonplaceholder`);
            const res = await fetch('/api/jsonplaceholder'); // URL de la API proxy
            if (!res.ok) throw new Error('Error al obtener datos del servidor proxy');

            const allData = await res.json(); // Convertimos la respuesta en JSON
            
            // Limitar a solo los primeros 10 posts
            const limitedData = allData.slice(0, 10);

            const titles = [];
            const wordCounts = [];
            const colors = [];

            for (const post of limitedData) {
                const title = post.title;
                const wordCount = title.split(' ').length;  // Contamos las palabras en el título

                titles.push(title);
                wordCounts.push(wordCount);

                // Asignamos un color arbitrario para cada título
                colors.push(getColorForPost(post.id));
            }

            console.log(`Posts procesados: ${titles.length}`);
            renderPostChart(titles, wordCounts, colors);  // Renderizamos el gráfico
        } catch (error) {
            console.error('Error al obtener los datos de JSONPlaceholder:', error);
        }
    }


// Función para asignar colores arbitrarios a cada post según su ID
function getColorForPost(postId) {
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF5733', '#C70039', '#900C3F', '#581845'
    ];
    return colors[postId % colors.length]; // Usamos el ID del post para seleccionar un color
}

let postChartInstance;

// Función para renderizar el gráfico de barras con los títulos y la cantidad de palabras
function renderPostChart(labels, data, colors) {
    const ctx = document.getElementById('postChart')?.getContext('2d');
    if (!ctx) return;

    // Si ya existe un gráfico, lo destruimos antes de crear uno nuevo
    if (postChartInstance) {
        postChartInstance.destroy();
    }

    // Creamos el gráfico de barras
    postChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nº de palabras en el cuerpo',
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                },
                title: {
                    display: true,
                    text: 'Cantidad de palabras en los cuerpos de posts',
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
                        text: 'Número de palabras',
                        color: '#fff'
                    },
                    ticks: { color: '#fff' }
                },
                y: {
                    ticks: {
                        color: '#fff',
                        callback: function(value, index) {
                            const label = this.getLabelForValue(index);
                            return label.length > 60 ? label.slice(0, 57) + '...' : label;
                        }
                    }
                }
            }
        }
    });
}

//Api opennotify astros
// API EXTERNA: Open Notify (Astronautas en el espacio)
// Función para obtener los datos de astronautas desde OpenNotify
// API EXTERNA: Open Notify (Astronautas en el espacio)
// Función para obtener los datos de astronautas desde OpenNotify
async function getAstronautsData() {
    try {
        console.log(`Solicitando datos a: /api/opennotify`);
        const res = await fetch('/api/opennotify', { method: 'GET' }); // Confirmamos que es un GET
        if (!res.ok) throw new Error('Error al obtener datos del servidor proxy');

        const data = await res.json(); // Convertimos la respuesta en JSON

        // No limitamos los astronautas, mostramos todos
        const astronautNames = [];
        const craftCounts = []; // Contamos la cantidad de astronautas por nave
        const colors = [];

        const craftCountMap = {};

        for (const astronaut of data.people) { // Recorremos todos los astronautas
            astronautNames.push(astronaut.name); // Almacenamos el nombre del astronauta

            const craft = astronaut.craft;
            craftCountMap[craft] = (craftCountMap[craft] || 0) + 1;

            colors.push(getColorForAstronaut(craft)); // Asignamos un color para cada astronauta
        }

        const craftLabels = Object.keys(craftCountMap);
        const craftData = Object.values(craftCountMap);

        console.log(`Astronautas procesados: ${astronautNames.length}`);
        renderAstronautsChart(craftLabels, craftData, colors);  // Renderizamos el gráfico
    } catch (error) {
        console.error('Error al obtener los datos de astronautas:', error);
    }
}

let astronautChartInstance;

// Función para renderizar el gráfico tipo dona con la cantidad de astronautas por nave
function renderAstronautsChart(labels, data, colors) {
    const ctx = document.getElementById('astronautChart')?.getContext('2d');
    if (!ctx) return;

    // Si ya existe un gráfico, lo destruimos antes de crear uno nuevo
    if (astronautChartInstance) {
        astronautChartInstance.destroy();
    }

    // Creamos el gráfico de dona
    astronautChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Número de astronautas por nave',
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                },
                title: {
                    display: true,
                    text: 'Distribución de astronautas por nave',
                    color: '#fff',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

// Función para asignar colores a cada astronauta basado en la nave
function getColorForAstronaut(craft) {
    const colors = {
        'ISS': '#FF6384',
        'Tiangong': '#FFC300',
    };

    return colors[craft] || '#FFCE56'; // Si no tiene color asignado, ponemos un color predeterminado
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
        await loadScript('https://cdn.jsdelivr.net/npm/chart.js');


        await get15AndCrimeData();
        await getFinesAndCybercrimeData();
        await getNewsData();
        await getJsonPlaceholderData();
        await getAstronautsData();

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
            <!--news api-->
            <div class="article" style="margin-top: 2em;">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Noticias
                </h3>
                <p>
                    Este gráfico de burbujas permite comparar en tiempo real las noticias.
                </p>
                <a style="color: #fff;" href="https://openweathermap.org/current" target="_blank">
                    <i>API externa - NewsApi</i>
                </a>
                <figure class="chartjs-figure" transition:fade>
                    <canvas id="externalChart"></canvas>
                </figure>
            </div>
            <!-- Sección Gráfico JSONPlaceholder -->
            <div class="article" style="margin-top: 2em;">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Publicaciones de JSONPlaceholder
                </h3>
                <p>
                    Este gráfico de barras muestra el número de palabras en el título de cada publicación de JSONPlaceholder.
                </p>
                <a style="color: #fff;" href="https://jsonplaceholder.typicode.com" target="_blank">
                    <i>API externa - JSONPlaceholder</i>
                </a>
                <figure class="chartjs-figure" transition:fade>
                    <canvas id="postChart"></canvas> <!-- Aquí usamos 'postChart' en lugar de 'externalChart' -->
                 </figure>
            </div>
            <!-- Sección Gráfico Open Notify (Astronautas) -->
            <div class="article" style="margin-top: 2em;">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Astronautas en el espacio
                </h3>
                <p>
                    Este gráfico de barras muestra el número de astronautas en cada nave espacial actualmente en órbita.
                </p>
                <a style="color: #fff;" href="http://api.open-notify.org/astros.json" target="_blank">
                    <i>API externa - Open Notify</i>
                </a>
                <figure class="chartjs-figure" transition:fade>
                    <canvas id="astronautChart"></canvas> <!-- Aquí usamos 'astronautChart' en lugar de 'postChart' -->
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
