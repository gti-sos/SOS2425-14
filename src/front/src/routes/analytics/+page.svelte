<style>
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 360px;
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-description {
        margin: 10px;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #ebebeb;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }

    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }

    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }

    .highcharts-data-table td,
    .highcharts-data-table th,
    .highcharts-data-table caption {
        padding: 0.5em;
    }

    .highcharts-data-table thead tr,
    .highcharts-data-table tbody tr:nth-child(even) {
        background: #f8f8f8;
    }

    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }


</style>

<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment"; 

    let DEVEL_HOST = "http://localhost:16078";
    let API_EMPLOYMENT = "/api/v1/employment-data?autonomous_community=TOTAL&education_level=TOTAL";
    let API_EDUCATION = "/api/v1/education-data?autonomous_community=TOTAL";
    let API_CYBERCRIME = "/api/v1/cybercrime-data?autonomous_community=TOTAL";

    if(dev){
        API_EMPLOYMENT = DEVEL_HOST + API_EMPLOYMENT;
        API_EDUCATION = DEVEL_HOST + API_EDUCATION;
        API_CYBERCRIME = DEVEL_HOST + API_CYBERCRIME;
    }

    // @ts-ignore
    let empData = [];
    // @ts-ignore
    let eduData = [];
    // @ts-ignore
    let cybData = [];
    /**
     * @type {number[]}
     */
    let years = [];
    let loadingData = true;
    let errorMessage = "";

    //Esta funcion carga los scripts en vez de svelte:head
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

   
    async function getData() {
        loadingData = true;
        errorMessage = "";
        
        // Construir la URL con el parámetro de la comunidad seleccionada
        
        try {
            console.log(`Solicitando datos a: ${API_EMPLOYMENT}`);
            const empRes = await fetch(API_EMPLOYMENT, {method: "GET"});
            if (!empRes.ok) {
                throw new Error(`Error en la respuesta: ${empRes.status}`);
            }

            console.log(`Solicitando datos a: ${API_EDUCATION}`);
            const eduRes = await fetch(API_EDUCATION, {method: "GET"});
            if (!eduRes.ok) {
                throw new Error(`Error en la respuesta: ${eduRes.status}`);
            }

            console.log(`Solicitando datos a: ${API_CYBERCRIME}`);
            const cybRes = await fetch(API_CYBERCRIME, {method: "GET"});
            if (!cybRes.ok) {
                throw new Error(`Error en la respuesta: ${cybRes.status}`);
            }
  
            empData = await empRes.json();
            console.log(`Datos recibidos: ${empData.length} registros`);
            eduData = await eduRes.json();
            console.log(`Datos recibidos: ${eduData.length} registros`);
            cybData = await cybRes.json();
            console.log(`Datos recibidos: ${cybData.length} registros`);
            
            // Extraer años únicos
            // @ts-ignore
            const empYears = [...new Set(empData.map(item => item.year))];
            // @ts-ignore
            const eduYears = [...new Set(eduData.map(item => item.year))];
            // @ts-ignore
            const cybYears = [...new Set(cybData.map(item => item.year))];
            
            // Merge and sort all unique years
            years = [...new Set([...empYears, ...eduYears, ...cybYears])].sort();
            
            renderChart();
        } catch (error) {
            console.error(`ERROR fetching data: ${error}`);
            // @ts-ignore
            errorMessage = `Error loading data: ${error.message}`;
        } finally {
            loadingData = false;
        }
    }

    function renderChart() {
        if (years.length === 0) {
            console.log("No hay datos disponibles");
            errorMessage = "No hay datos disponibles";
            return;
        }

        // @ts-ignore
        const seriesData = [];
        
        years.forEach(year => {
            // @ts-ignore
            const empRecord = empData.find(item => item.year === year && item.education_level === "TOTAL");
            // @ts-ignore
            const eduRecord = eduData.find(item => item.year === year);
            // @ts-ignore
            const cybRecord = cybData.find(item => item.year === year);
            
            let cybSecurityPercentage = null;
            if (
            cybRecord &&
            !isNaN(parseFloat(cybRecord.cybersecurity)) &&
            !isNaN(parseFloat(cybRecord.criminal_ofense)) &&
            parseFloat(cybRecord.criminal_ofense) > 0
            ) {
            cybSecurityPercentage =
                (parseFloat(cybRecord.cybersecurity) / parseFloat(cybRecord.criminal_ofense)) * 100;
            }

            seriesData.push({
                name: year.toString(),
                data: [
                    empRecord && !isNaN(empRecord.employment_rate) ? parseFloat(empRecord.employment_rate) : null,
                    eduRecord && !isNaN(eduRecord.higher_grade) ? parseFloat(eduRecord.higher_grade) : null,
                    cybSecurityPercentage ?? null
                    ]
            });
            console.log({
            year,
            emp: empRecord?.employment_rate,
            edu: eduRecord?.higher_grade,
            cyb: cybRecord,
            cybSecurityPercentage
            });
        });

        // Check if we have valid data for the chart
        // @ts-ignore
        if (seriesData.length === 0 || seriesData.every(s => s.data.every(d => d === null))) {
            console.error("No hay datos válidos para visualizar");
            errorMessage = "No hay datos válidos para visualizar";
            return;
        }
        
        // Create the chart
        // @ts-ignore
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Datos Integrados',
                align: 'left',
                style: {
                    fontSize: '1.2em'
                }
            },
            subtitle: {
                text: 'Comparativa por años en España'
            },
            xAxis: {
                categories: ['Tasa de Empleo', 'Educación Superior', 'Tasa de cibercrimen'],
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'Porcentaje'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                             '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    grouping: true,
                    shadow: false,
                    borderWidth: 0
                }
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                floating: true,
                backgroundColor: 'white',
                shadow: false
            },
            // @ts-ignore
            series: seriesData,
            colors: ['#5f4b8b', '#e0bbff', '#88c0d0', '#4c566a', '#bf616a', '#a3be8c', '#ebcb8b', '#d08770', '#b48ead'],
            credits: {
                enabled: false
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

            await getData();
        } catch (err) {
            errorMessage = `Error cargando scripts de Highcharts: ${err}`;
            console.error(err);
        }
    });

</script>


<div class="wrapper">
    <div class="container">
        <h2>Integración grupal</h2>
        <hr style="width: 100%; animation: loadHrGraph 1s;"/>
        
        <div class="graph-container">
            <p>
                Esta gráfica integra los datos de las tres APIs. En concreto, se muestra el porcentaje de empleo, educación superior y cibercrimen por años.
            </p>
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
</div>