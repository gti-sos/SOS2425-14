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
                    Relación entre Precipitacion y Cibercriminalidad (2021)
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
