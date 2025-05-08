<script>
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
    import { dev } from "$app/environment"; 
    import { tick } from 'svelte';

    let DEVEL_HOST = "http://localhost:16078";

    const API_G18 = "https://sos2425-18.onrender.com/api/v2/dana-grants-subsidies-stats";
    const API_G17 = 'https://sos2425-17.onrender.com/api/v2/university-academic-performance';
	const API_G11 = 'https://sos2425-11.onrender.com/api/v1/autonomy-dependence-applications';
	const API_G13 = 'https://sos2425-13.onrender.com/api/v1/water-supply-improvements';
	const API_G10 = 'https://sos2425-10.onrender.com/api/v1/radars-stats';
    let API_EMPLOYMENT = "/api/v1/employment-data";

    if(dev){
        API_EMPLOYMENT = DEVEL_HOST + API_EMPLOYMENT;
    }
    // @ts-ignore
	let data17 = [];
	// @ts-ignore
	let data11 = [];
	// @ts-ignore
	let data13 = [];
    // @ts-ignore
    let data10 = [];
    // @ts-ignore
    let data18 = [];
    // @ts-ignore
    let employmentData = [];
    // @ts-ignore
    let employmentDataG13 = [];

    let loadingData = true;
    let errorMessage = "";

    // @ts-ignore
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`);
            // @ts-ignore
            if (existing) return resolve();

            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /*
    FETCH a las APIS
    */
   //Fetch grupo 11
   async function getDataG11() {
        loadingData = true;
        errorMessage = "";
        data11 = [];
        try {
            console.log(`Solicitando datos a: ${API_G11}`);
            let res = await fetch(API_G11, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error(`Error en la respuesta: ${res.status}`);
            }

            let data = await res.json();

            data11 = data;
            console.log(`Datos recibidos: ${data11.length} registros`);

            renderChart11();

        } catch (error) {
            console.error(`ERROR G11: ${error}`);
            // @ts-ignore
            errorMessage = `Error al cargar datos G11: ${error.message}`;
        } finally {
            loadingData = false;
        }
    }

    //Fetch grupo 13- Integración
    async function getDataG13() {
        loadingData = true;
        errorMessage = "";
        data13 = [];
        employmentDataG13 = [];

        try {
            let emp = await fetch(API_EMPLOYMENT, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!emp.ok) {
                throw new Error(`Error en la respuesta: ${emp.status}`);
            }

            let empData = await emp.json();
            employmentDataG13 = empData;

            console.log(`Solicitando datos a: ${API_G13}`);
            let res = await fetch(API_G13, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error(`Error en la respuesta: ${res.status}`);
            }

            let data = await res.json();

            // Si no hay datos, intenta cargar los iniciales y vuelve a hacer fetch
            if (data.length === 0) {
                console.warn("No hay datos. Cargando datos iniciales...");
                const loadRes = await fetch(`${API_G13}/loadInitialData`, {
                    method: "GET"
                });

                if (!loadRes.ok) {
                    throw new Error("No se pudo cargar datos iniciales");
                }

                // Espera para reintentar obtener los datos
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Nuevo fetch después de cargar datos
                res = await fetch(API_G13, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error("Error al obtener datos tras la carga inicial");
                }

                data = await res.json();
            }

            data13 = data;
            console.log(`Datos recibidos: ${data13.length} registros`);

            renderChart13();

        } catch (error) {
            console.error(`ERROR G13: ${error}`);
            // @ts-ignore
            errorMessage = `Error al cargar datos G13: ${error.message}`;
        } finally {
            loadingData = false;
        }
    }

    //Fetch grupo 17
    async function getDataG17() {
        loadingData = true;
        errorMessage = "";
        data17 = [];

        try {
            console.log(`Solicitando datos a: ${API_G17}`);
            let res = await fetch(API_G17, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error(`Error en la respuesta: ${res.status}`);
            }

            let data = await res.json();

            // Si no hay datos, intenta cargar los iniciales y vuelve a hacer fetch
            if (data.length === 0) {
                console.warn("No hay datos. Cargando datos iniciales...");
                const loadRes = await fetch(`${API_G17}/loadInitialData`, {
                    method: "GET"
                });

                if (!loadRes.ok) {
                    throw new Error("No se pudo cargar datos iniciales");
                }

                // Espera para reintentar obtener los datos
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Nuevo fetch después de cargar datos
                res = await fetch(API_G17, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error("Error al obtener datos tras la carga inicial");
                }

                data = await res.json();
            }

            data17 = data;
            console.log(`Datos recibidos: ${data17.length} registros`);

            renderChart17();

        } catch (error) {
            console.error(`ERROR G17: ${error}`);
            // @ts-ignore
            errorMessage = `Error al cargar datos G17: ${error.message}`;
        } finally {
            loadingData = false;
        }
    }

    //fetch grupo 10- Integración
    async function getDataG10() {
        loadingData = true;
        errorMessage = "";
        data10 = [];
        employmentData = [];
        
        try {
            let emp = await fetch(API_EMPLOYMENT, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!emp.ok) {
                throw new Error(`Error en la respuesta: ${emp.status}`);
            }

            let empData = await emp.json();
            employmentData = empData;
            console.log(`Solicitando datos a: ${API_G10}`);
            const res = await fetch(API_G10, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!res.ok) {
                throw new Error(`Error en la respuesta: ${res.status}`);
            }
  
            const data = await res.json();
            data10 = data;
            console.log(`Datos recibidos: ${data10.length} registros`);
            
            renderChart10();
            
        } catch (error) {
            console.error(`ERROR G10: ${error}`);
            // @ts-ignore
            errorMessage = `Error al cargar datos G10: ${error.message}`;
            loadingData = false;
        }
    }

    //Fetch grupo 18
    async function getData18() {
        loadingData = true;
        errorMessage = "";
        
        try {
            console.log(`Solicitando datos a: ${API_G18}`);
            const res = await fetch(API_G18, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!res.ok) {
                throw new Error(`Error en la respuesta: ${res.status}`);
            }
  
            const data = await res.json();
            data18 = data;
            console.log(`Datos recibidos: ${data18.length} registros`);
            
            renderChart18();
        } catch (error) {
            console.error(`ERROR al obtener datos: ${error}`);
            // @ts-ignore
            errorMessage = `Error al cargar datos: ${error.message}`;
        } finally {
            loadingData = false;
        }
    }

    // Grafica widget grupo 18
    function renderChart18() {
        // @ts-ignore
        console.log("Estructura de los primeros datos:", JSON.stringify(data18[0], null, 2));
        
        const municipalityData = {};
        
        // @ts-ignore
        data18.forEach(item => {
            const municipality = item.mun_name
            const amount = item.amt_granted
            
            // @ts-ignore
            if (!municipalityData[municipality]) {
                // @ts-ignore
                municipalityData[municipality] = 0;
            }
            // @ts-ignore
            municipalityData[municipality] += amount;
        });
        
        console.log("Datos agrupados por municipio:", municipalityData);
        
        const chartData = Object.entries(municipalityData)
            .map(([name, value]) => ({
                name,
                y: value
            }))
            .sort((a, b) => b.y - a.y);
        
        console.log("Datos preparados para el gráfico:", chartData);
        
        if (chartData.length === 0) {
            errorMessage = "No se pudieron encontrar datos válidos de municipios y cantidades";
            return;
        }
        
        // Limitar a los 10 principales municipios para mejor visualización
        // y agrupar el resto como "Otros"
        let finalData = chartData.slice(0, 10);
        
        if (chartData.length > 10) {
            const othersMunicipalities = chartData.slice(10);
            const othersSum = othersMunicipalities.reduce((acc, item) => acc + item.y, 0);
            
            finalData.push({
                name: 'Otros municipios',
                y: othersSum
            });
        }
        // @ts-ignore
        Highcharts.chart('container', {
            chart: {
                type: 'pie',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            },
            title: {
                text: 'Distribución de ayudas por municipios',
                align: 'center',
                style: {
                    fontWeight: 'bold',
                    fontSize: '18px'
                }
            },
            subtitle: {
                text: 'Fuente: G18-dana-grants-subsidies-stats',
                align: 'center'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                        style: {
                            fontSize: '12px'
                        }
                    },
                    showInLegend: true
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.0f}€</b> ({point.percentage:.1f}%)'
            },
            legend: {
                enabled: true,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            accessibility: {
                point: {
                    valueSuffix: '€'
                }
            },
            series: [{
                name: 'Importe total',
                colorByPoint: true,
                data: finalData
            }],
            credits: {
                enabled: true,
                text: 'G18-dana-grants-subsidies-stats'
            }
        });
    }

   
    async function renderChart13() {
        await tick(); 
        const andaluciaData = {};
        
        // @ts-ignore
        employmentDataG13.forEach(item => {
        if (item.autonomous_community?.toLowerCase() === 'andalucía' && 
            item.education_level === 'TOTAL') {
            
            const year = item.year.toString();
            
            // @ts-ignore
            if (!andaluciaData[year]) {
                // @ts-ignore
                andaluciaData[year] = {
                    activity_rate: null,
                    project_count: null
                };
            }
            // @ts-ignore
            andaluciaData[year].activity_rate = item.activity_rate;
        }
        });
        
        // @ts-ignore
        data13.forEach(item => {
        if (item.autonomous_community?.toLowerCase() === 'andalucía' || 
            item.autonomous_community?.toLowerCase() === 'andalucia') {
            
            const year = item.year.toString();
            
            // @ts-ignore
            if (!andaluciaData[year]) {
            // @ts-ignore
            andaluciaData[year] = {
                activity_rate: null,
                project_count: null
            };
            }
            // @ts-ignore
            andaluciaData[year].project_count = item.project_count;
        }
        });
        
        // Preparar datos para el gráfico
        const years = Object.keys(andaluciaData).sort();
        // @ts-ignore
        const activityRates = years.map(year => andaluciaData[year].activity_rate);
        // @ts-ignore
        const projectCounts = years.map(year => andaluciaData[year].project_count);
        
        const ctx = document.getElementById('andaluciaChart');
        if (!ctx) {
            console.error("No se encontró el canvas 'andaluciaChart'");
            return;
        }

        console.log("Datos del gráfico:", activityRates, projectCounts);
        // @ts-ignore
        new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
            {
                label: 'Tasa de Actividad (%)',
                data: activityRates,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            },
            {
                label: 'Número de Proyectos',
                data: projectCounts,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Datos de Andalucía por Año',
                    font: { weight: 'bold', size: 18 }
                },
                subtitle: {
                    display: true,
                    text: 'Fuente: API G13 y API Empleo'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
        });
    }
    
    async function renderChart10() {
        loadingData = false;
        await tick();

        const ctx = document.getElementById('chart10');
        if (!ctx) {
            console.error("No se encontró el canvas 'chart10'");
            return;
        }

        const context = /** @type {HTMLCanvasElement} */ (ctx).getContext('2d');
        if (!context) {
            console.error("No se pudo obtener el contexto 2D del canvas");
            return;
        }

        if (data10.length === 0 || employmentData.length === 0) {
            errorMessage = "No hay datos disponibles para mostrar el gráfico";
            return;
        }

        // Mapa de normalización
        const normalizeCommunityNames = {
            "Madrid": "Madrid (Comunidad de)",
            "Navarra": "Navarra (Comunidad Foral de)"
        };

        function normalize(name) {
            return normalizeCommunityNames[name] || name;
        }

        const uniqueCommunities = [...new Set(data10.map(item => normalize(item.autonomousCommunity)))];
        const chartData = [];

        uniqueCommunities.forEach(community => {
            const totalComplaints = data10
                .filter(item => normalize(item.autonomousCommunity) === community)
                .reduce((sum, item) => sum + (item.complaint || 0), 0);

            const unemploymentEntry = employmentData.find(item =>
                normalize(item.autonomous_community) === community &&
                item.year === 2023 &&
                item.education_level === "TOTAL"
            );

            if (unemploymentEntry) {
                chartData.push({
                    x: totalComplaints,
                    y: unemploymentEntry.unemployment_rate,
                    community
                });
            }
        });

        // Crear el gráfico
        new Chart(context, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Tasa de paro vs. Número de multas por Comunidad',
                    data: chartData,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    pointRadius: 8,
                    pointHoverRadius: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const point = context.raw;
                                return `${point.community}: ${point.x} multas, ${point.y}% paro`;
                            }
                        }
                    },
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Relación entre tasa de paro (2023) y número de multas por Comunidad Autónoma'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Número de multas'
                        },
                        beginAtZero: true
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Tasa de paro (%)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });

        console.log("Datos del gráfico:", chartData);
    }


    onMount(async () => {
        try {
            await loadScript('https://code.highcharts.com/highcharts.js');
            await loadScript('https://code.highcharts.com/modules/heatmap.js');
            await loadScript('https://code.highcharts.com/modules/exporting.js');
            await loadScript('https://code.highcharts.com/modules/export-data.js');
            await loadScript('https://code.highcharts.com/modules/accessibility.js');
            await loadScript('https://cdn.jsdelivr.net/npm/chart.js');

            await getData18();
            await getDataG13();
            await getDataG10();

        } catch (err) {
            errorMessage = `Error cargando scripts de Highcharts: ${err}`;
            console.error(err);
        }
    });

</script>

<svelte:head>
	<title>Integrations - Jaime Duffy Panés</title>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="wrapper">
    <div class="container">
        <h2 style="text-align: center;">Integraciones <br><i>Jaime Duffy Panés</i></h2>
        <hr style="width: 100%; animation: loadHrGraph 1s; transition: all 0.3s ease;" />
        <div transition:fade={{ duration: 400 }}>
            <!-- Widget G18-dana-grants-subsidies-stats -->
            <div class="article">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Distribución de ayudas DANA por municipios
                </h3>
                <p>
					Este gráfico representa cómo se reparte la ayuda por la dana para cada municipio.
				</p>
                <a style="color: #fff;" href={API_G18} target="_blank"><i>G18-dana-grants-subsidies-stats</i></a>
                <figure class="highcharts-figure">
                    <div id="container"></div>
                    {#if loadingData}
                        <p>Cargando datos...</p>
                    {/if}
                    {#if errorMessage}
                        <p style="color: red">{errorMessage}</p>
                    {/if}
                </figure>
            </div>
            <!-- Integración G10-radars-stats -->
            <div class="article">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Integración: Número de multas por tasa de paro
                </h3>
                <p>
                    Este gráfico nos muestra el número de multas de las comunidades autónomas junto con la tasa de paro. 
                </p>
                <a style="color: #fff; margin-right: 1rem;" href={API_G10} target="_blank">
                    <i>G10-radars-stats</i>
                </a>
                <a style="color: #fff;" href={API_EMPLOYMENT} target="_blank">
                    <i>API: Datos de Empleo</i>
                </a>
                <div class="chart-container">
                    {#if loadingData}
                      <div class="loading">Cargando datos...</div>
                    {:else if errorMessage}
                      <div class="error">{errorMessage}</div>
                    {:else}
                      <canvas id="chart10" width="800" height="400"></canvas>
                    {/if}
                </div>                
            </div>
            <!-- Widget G13-water-supply-improvements -->
            <div class="article">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Integración: Número de proyectos y tasa de actividad
                </h3>
                <p>
                    Este gráfico mustra el numero de proyectos y la tasa de actividad en andalucía según los años.
                </p>
                <a style="color: #fff; margin-right: 1rem;" href={API_G13} target="_blank">
                    <i>G13-water-supply-improvements</i>
                </a>
                <a style="color: #fff;" href={API_EMPLOYMENT} target="_blank">
                    <i>API: Datos de Empleo</i>
                </a>
                <div class="chart-container">
                    {#if loadingData}
                      <div class="loading">Cargando datos...</div>
                    {:else if errorMessage}
                      <div class="error">{errorMessage}</div>
                    {:else}
                      <canvas id="andaluciaChart" width="800" height="400"></canvas>
                    {/if}
                </div>
            </div>
            <!-- Widget G17-university-academic-performance --> 
            <!-- API EXTERNA PROXY -->
            <!-- API EXTERNA -->
            <!-- API EXTERNA -->
        </div>
    </div>
</div>


<style>
.chart-container {
    max-width: 45em;
    margin: 2em auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.473);
    padding: 1em;
    background: #052a42;
    border-radius: 10px;
    min-height: 400px;
}

canvas {
    display: block;
    width: 100% !important;
    height: auto !important;
}

</style>