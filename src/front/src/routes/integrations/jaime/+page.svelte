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
    async function renderChart18() {
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

    function renderChart17() {
        if (!Array.isArray(data17) || data17.length === 0) {
            errorMessage = "No hay datos disponibles de universidades para mostrar el gráfico.";
            return;
        }

        const grouped = {};

        data17.forEach(item => {
            const name = item.degree || "Desconocido";
            if (!grouped[name]) grouped[name] = 0;
            grouped[name] += item.cohortStudents || 0;
        });

        const sortedEntries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
        const topUniversities = sortedEntries.slice(0, 6);
        const otherSum = sortedEntries.slice(6).reduce((acc, [, value]) => acc + value, 0);
        if (otherSum > 0) topUniversities.push(['Otras', otherSum]);

        // Generar el array requerido por C3.js
        const columns = topUniversities.map(([label, value]) => [label, value]);

        // Generar el gráfico
        c3.generate({
            bindto: '#chart17',
            data: {
                type: 'donut',
                columns: columns
            },
            donut: {
                title: "Estudiantes por universidad"
            },
        });
    }



   
    async function renderChart13() {
        await tick();

        const andaluciaData = {};

        // Unificar datos por año
        employmentDataG13.forEach(item => {
            if (item.autonomous_community?.toLowerCase() === 'andalucía' && item.education_level === 'TOTAL') {
                const year = item.year.toString();
                if (!andaluciaData[year]) {
                    andaluciaData[year] = { activity_rate: null, project_count: null };
                }
                andaluciaData[year].activity_rate = item.activity_rate;
            }
        });

        data13.forEach(item => {
            if (item.autonomous_community?.toLowerCase() === 'andalucía' || item.autonomous_community?.toLowerCase() === 'andalucia') {
                const year = item.year.toString();
                if (!andaluciaData[year]) {
                    andaluciaData[year] = { activity_rate: null, project_count: null };
                }
                andaluciaData[year].project_count = item.project_count;
            }
        });

        const years = Object.keys(andaluciaData).sort();

        const activityRateSeries = ['Tasa de Actividad (%)'];
        const projectCountSeries = ['Número de Proyectos'];

        years.forEach(year => {
            const data = andaluciaData[year];
            activityRateSeries.push(data.activity_rate ?? 0);
            projectCountSeries.push(data.project_count ?? 0);
        });

        // Renderizar el gráfico con c3.js
        c3.generate({
            bindto: '#andaluciaChart',
            data: {
                x: 'x',
                columns: [
                    ['x', ...years],
                    activityRateSeries,
                    projectCountSeries
                ],
                types: {
                    'Tasa de Actividad (%)': 'area-spline',
                    'Número de Proyectos': 'area-spline'
                },
                labels: true
            },
            axis: {
                x: {
                    type: 'category',
                    label: 'Año'
                },
                y: {
                    label: 'Valores'
                }
            },
            title: {
                text: 'Evolución de Proyectos y Tasa de Actividad en Andalucía'
            },
            legend: {
                position: 'right'
            }
        });
    }


    function renderChart11() {
        if (!Array.isArray(data11) || data11.length === 0) {
            errorMessage = "No hay datos disponibles para mostrar el gráfico.";
            return;
        }

        const etiquetas = [...new Set(data11.map(d => `${d.place} ${d.year}`))];

        const autonomia = ['Autonomía'];
        const dependencia = ['Dependencia'];

        etiquetas.forEach(label => {
            const [place, year] = label.split(/ (?=\d{4}$)/);
            const entry = data11.find(d => d.place === place && d.year.toString() === year);
            autonomia.push(entry?.request || 0);
            dependencia.push(entry?.dependent_population || 0);
        });

        c3.generate({
            bindto: '#chart11',
            data: {
                x: 'x',
                columns: [
                    ['x', ...etiquetas],
                    autonomia,
                    dependencia
                ],
                type: 'bar',
                labels: true
            },
            axis: {
                x: {
                    type: 'category',
                    label: {
                        text: 'Comunidad y Año',
                        position: 'outer-center'
                    },
                    tick: {
                        rotate: 45,
                        multiline: false
                    }
                },
                y: {
                    label: {
                        text: 'Solicitudes',
                        position: 'outer-middle'
                    }
                }
            },
            title: {
                text: 'Comparativa de Solicitudes de Autonomía y Dependencia por Comunidad Autónoma y Año'
            },
            legend: {
                position: 'right'
            },
            tooltip: {
                grouped: false
            }
        });
    }

    function renderChart10() {
        if (data10.length === 0 || employmentData.length === 0) {
            errorMessage = "No hay datos disponibles para mostrar el gráfico";
            return;
        }

        const normalizeCommunityNames = {
            "Madrid": "Madrid (Comunidad de)",
            "Navarra": "Navarra (Comunidad Foral de)"
        };

        function normalize(name) {
            return normalizeCommunityNames[name] || name;
        }

        const chartData = [];

        const xs = {};
        const columns = [
            ['x'], // x-axis (multas)
            ['Tasa de Paro (%)'] // y-axis
        ];

        const communities = [];

        const uniqueCommunities = [...new Set(data10.map(item => normalize(item.autonomousCommunity)))];

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
                communities.push(community);
                columns[0].push(totalComplaints);
                columns[1].push(unemploymentEntry.unemployment_rate);
            }
        });

        console.log("Datos:", columns);

        c3.generate({
            bindto: '#chart10',
            data: {
                xs: {
                    'Tasa de Paro (%)': 'x'
                },
                columns: columns,
                type: 'scatter',
                labels: true
            },
            axis: {
                x: {
                    label: 'Número de multas',
                    tick: {
                        fit: false
                    }
                },
                y: {
                    label: 'Tasa de paro (%)'
                }
            },
            tooltip: {
                format: {
                    title: function (_, i) {
                        return communities[i];
                    },
                    value: function (value, ratio, id) {
                        return `${id === 'x' ? 'Multas' : 'Paro'}: ${value}`;
                    }
                }
            },
            title: {
                text: 'Relación entre tasa de paro (2023) y número de multas por Comunidad Autónoma'
            },
            legend: {
                position: 'right'
            }
        });
    }



    onMount(async () => {
        try {
            await loadScript('https://code.highcharts.com/highcharts.js');
            await loadScript('https://code.highcharts.com/modules/heatmap.js');
            await loadScript('https://code.highcharts.com/modules/exporting.js');
            await loadScript('https://code.highcharts.com/modules/export-data.js');
            await loadScript('https://code.highcharts.com/modules/accessibility.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.min.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.js');

            await getData18();
            await getDataG13();
            await getDataG10();
            await getDataG17();
            await getDataG11();

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
    <link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.css" rel="stylesheet">
</svelte:head>

<div class="wrapper">
    <div class="container">
        <h2 style="text-align: center;">Integraciones <br><i>Jaime Duffy Panés</i></h2>
        <hr style="width: 100%; animation: loadHrGraph 1s; transition: all 0.3s ease;" />
        <div transition:fade={{ duration: 400 }}>
            <!-- Widget G18-dana-grants-subsidies-stats -->
            <div class="article">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Widget: Distribución de ayudas DANA por municipios
                </h3>
                <p>
					Este gráfico representa cómo se reparte la ayuda por la dana para cada municipio.
				</p>
                <a style="color: #fff;" href={API_G18} target="_blank"><i>G18-dana-grants-subsidies-stats</i></a>
                <div class="chart-container">
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
                    <div id="chart10" style="max-width: 800px; margin: auto;"></div>
                    {#if loadingData}
                        <p>Cargando datos...</p>
                    {/if}
                    {#if errorMessage}
                        <p style="color: red">{errorMessage}</p>
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
                    <div id="andaluciaChart" style="max-width: 700px; margin: auto;"></div>
                    {#if loadingData}
                        <p>Cargando datos...</p>
                    {/if}
                    {#if errorMessage}
                        <p style="color: red">{errorMessage}</p>
                    {/if}
                </div>
            </div>
            <!-- Widget G17-university-academic-performance --> 
            <div class="article">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Widget: Distribución de Estudiantes por Grado Universitario
                </h3>
                <p>
                    Este gráfico en formato donut muestra la proporción de estudiantes matriculados en los distintos grados universitarios, destacando los seis con mayor volumen. Los grados restantes se agrupan en la categoría “Otras” para facilitar la visualización comparativa.
                </p>
                <a style="color: #fff; margin-right: 1rem;" href={API_G17} target="_blank">
                    <i>G17-university-academic-performance</i>
                </a>
                <div class="chart-container">
                    <div id="chart17" style="max-width: 600px; margin: auto;"></div>
                    {#if loadingData}
                        <p>Cargando datos...</p>
                    {/if}
                    {#if errorMessage}
                        <p style="color: red">{errorMessage}</p>
                    {/if}
                </div>
            </div>
            <!-- Widget G11-autonomy-dependence-applications --> 
            <div class="article">
                <h3 style="font-size: 1.5em; text-transform: none;">
                    Widget: Comparativa de Solicitudes de Autonomía y Dependencia por Comunidad Autónoma
                </h3>
                <p>
                    Este gráfico de barras muestra la comparación entre el número de solicitudes de autonomía y de dependencia realizadas por diferentes comunidades autónomas en los años 2023 y 2024. Permite visualizar la relación entre ambas necesidades sociales y observar la distribución geográfica del apoyo solicitado.
                </p>
                <a style="color: #fff; margin-right: 1rem;" href={API_G11} target="_blank">
                    <i>G11-autonomy-dependence-applications</i>
                </a>
                <div class="chart-container">
                    <div id="chart11" style="max-width: 600px; margin: auto;"></div>
                    {#if loadingData}
                        <p>Cargando datos...</p>
                    {/if}
                    {#if errorMessage}
                        <p style="color: red">{errorMessage}</p>
                    {/if}
                </div>
            </div>
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
.c3 text {
  fill: black !important;
}

.c3-legend-item text {
  fill: black !important;
}

.c3-tooltip {
  background-color: white !important;
  color: black !important;
  border: 1px solid #333;
}

.c3-axis path,
.c3-axis line {
  stroke: #555;
}
/* Fuerza texto de C3.js a negro */
.c3-chart text,
.c3-legend-item text,
.c3-axis text {
  fill: black !important;
}

/* Tooltips C3.js */
.c3-tooltip {
  background-color: white !important;
  color: black !important;
  border: 1px solid #333;
}

</style>