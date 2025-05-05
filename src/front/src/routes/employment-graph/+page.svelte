
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
    let BASE_API = "/api/v1/employment-data";

    if(dev){
        BASE_API = DEVEL_HOST + BASE_API;
    }

    /**
     * @type {any[]}
     */
    let myData = [];
    /**
     * @type {string[]}
     */
    let educationLevels = ["INF", "SEC", "SUP", "TOTAL"];
    /**
     * @type {number[]}
     */
    let years = [];
    let loadingData = true;
    let errorMessage = "";
    
    // Lista de comunidades autónomas españolas
    const communities = [
        "Andalucía",
        "Aragón",
        "Asturias",
        "Baleares",
        "Canarias",
        "Cantabria",
        "Castilla-La Mancha",
        "Castilla y León",
        "Cataluña",
        "Comunitat Valenciana",
        "Extremadura",
        "Galicia",
        "Madrid",
        "Murcia",
        "Navarra",
        "País Vasco",
        "La Rioja",
        "Ceuta y Melilla",
        "TOTAL"
    ];

    let quickChartUrl = "";
    
    // Valor por defecto
    let selectedCommunity = "Andalucía";


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
        const API = `${BASE_API}?autonomous_community=${encodeURIComponent(selectedCommunity)}`;
        
        try {
            console.log(`Solicitando datos a: ${API}`);
            const res = await fetch(API, {method: "GET"});
            if (!res.ok) {
                throw new Error(`Error en la respuesta: ${res.status}`);
            }
  
            const data = await res.json();
            myData = data;
            console.log(`Datos recibidos: ${myData.length} registros para ${selectedCommunity}`);
            
            // Extraer años y niveles educativos únicos
            years = [...new Set(myData.map(item => item.year))].sort();
            //educationLevels = [...new Set(myData.map(item => item.education_level))];
            
            renderChart();
            generateQuickChartUrl();
        } catch (error) {
            console.error(`ERROR al obtener datos de ${API}: ${error}`);
            // @ts-ignore
            errorMessage = `Error al cargar datos: ${error.message}`;
        } finally {
            loadingData = false;
        }
    }

    function renderChart() {
        if (myData.length === 0) {
            console.log("No hay datos para mostrar");
            errorMessage = "No hay datos disponibles para la comunidad seleccionada";
            return;
        }

        // @ts-ignore
        const chartData = [];
        educationLevels.forEach((level, levelIndex) => {
            years.forEach((year, yearIndex) => {
                const dataPoint = myData.find(item => 
                    item.education_level === level && item.year === year
                );
                
                if (dataPoint) {
                    chartData.push([
                        yearIndex,
                        levelIndex,
                        dataPoint.employment_rate
                    ]);
                }
            });
        });

        // Verificar si hay datos para el gráfico
        if (chartData.length === 0) {
            console.error("No se encontraron puntos de datos para el gráfico");
            errorMessage = "No hay datos disponibles para generar el gráfico para la comunidad seleccionada";
            return;
        }

        console.log(`Generando gráfico con ${chartData.length} puntos de datos`);
        
        // Crear el gráfico
        // @ts-ignore
        Highcharts.chart('container', {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },

            title: {
                text: `Tasa de empleo por nivel educativo en ${selectedCommunity}`,
                style: {
                    fontSize: '1.2em'
                }
            },

            xAxis: {
                categories: years.map(String),
                title: {
                    text: 'Año'
                }
            },

            yAxis: {
                categories: educationLevels,
                title: {
                    text: 'Nivel Educativo'
                },
                reversed: true
            },

            colorAxis: {
                min: 40,
                max: 100,
                minColor: '#e0bbff',
                maxColor: '#5f4b8b'   
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },

            tooltip: {
                // @ts-ignore
                formatter: function() {
                    // @ts-ignore
                    return `<b>Año: ${years[this.point.x]}</b><br>` +
                           // @ts-ignore
                           `<b>Nivel educativo: ${educationLevels[this.point.y]}</b><br>` +
                           // @ts-ignore
                           `<b>Tasa de empleo: ${this.point.value.toFixed(2)}%</b>`;
                }
            },

            series: [{
                name: 'Tasa de empleo',
                borderWidth: 0,
                // @ts-ignore
                data: chartData,
                dataLabels: {
                    enabled: true,
                    color: '#ffffff'
                }
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        yAxis: {
                            labels: {
                                style: {
                                    fontSize: '10px'
                                }
                            }
                        },
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal',
                            y: 0
                        }
                    }
                }]
            }
        });
    }

    // Función que se ejecuta cuando se cambia la comunidad seleccionada
    function handleCommunityChange() {
        errorMessage = "";
        getData();
    }

    function generateQuickChartUrl() {
        const unemploymentByYear = {};
        
        myData.forEach(d => {
            // @ts-ignore
            if (d.education_level === "TOTAL" && !unemploymentByYear[d.year]) {
                // @ts-ignore
                unemploymentByYear[d.year] = d.unemployment_rate;
            }
        });


        const labels = Object.keys(unemploymentByYear);
        const data = Object.values(unemploymentByYear).map(rate => parseFloat(rate.toFixed(2)));

        const chartConfig = {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Tasa de paro (%)",
                        data: data,
                        backgroundColor: "rgba(138, 43, 226, 0.7)"
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: `Tasa de paro en ${selectedCommunity} por año`
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 30
                        }
                    }]
                }
            }
        };

        quickChartUrl = `https://quickchart.io/chart?w=500&h=300&c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
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
        <h2>Gráficas de employment-data</h2>
        <hr style="width: 100%; animation: loadHrGraph 1s;"/>
        
        <div class="graph-container">
            <h3>
                Selecciona la comunidad autónmoma:
            </h3>
            <select class= "custom-select" bind:value={selectedCommunity} on:change={handleCommunityChange}>
                {#each communities as community}
                    <option value={community}>{community}</option>
                {/each}
            </select>
        </div>

        <div class="article">
			<h3>Gráfica de la tasa de empleo</h3>
			<p>
			Esta gráfica permite visualizar los datos de empleo por año y nivel educativo. Puedes seleccionar la comunidad autónoma en específico. 
			</p>
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

        <div class="article">
			<h3>Gráfica de la tasa de paro</h3>
			<p>
			Esta gráfica permite visualizar la tasa de paro por años según la comunidad autónoma elegida.
			</p>
		</div>
        
        <div class="graph-container">
            {#if quickChartUrl}
                <img src={quickChartUrl} alt="Gráfica de tasa de paro" />
            {/if}
        </div>
        
    </div>
</div>