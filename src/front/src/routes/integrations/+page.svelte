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

    const API_G18 = "https://sos2425-18.onrender.com/api/v2/dana-grants-subsidies-stats";
    // @ts-ignore
    let myData = [];
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

   
    async function getData() {
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
            myData = data;
            console.log(`Datos recibidos: ${myData.length} registros`);
            console.log("Muestra de datos:", myData.slice(0, 2));
            
            renderChart();
        } catch (error) {
            console.error(`ERROR al obtener datos: ${error}`);
            // @ts-ignore
            errorMessage = `Error al cargar datos: ${error.message}`;
        } finally {
            loadingData = false;
        }
    }

    function renderChart() {
        // @ts-ignore
        if (!myData || myData.length === 0) {
            console.log("No hay datos para mostrar");
            errorMessage = "No hay datos disponibles";
            return;
        }

        // @ts-ignore
        console.log("Estructura de los primeros datos:", JSON.stringify(myData[0], null, 2));
        
        const municipalityData = {};
        
        // @ts-ignore
        myData.forEach(item => {
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
        <h2>Integraciones</h2>
        <hr />

        <div class="article">
			<h3>Distribución de ayudas DANA por municipios</h3>
		</div>
        
        <div class="graph-container">
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