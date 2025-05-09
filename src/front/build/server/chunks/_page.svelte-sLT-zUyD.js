import { w as push, D as head, J as attr, y as pop } from './index-B0di9SGT.js';

function _page($$payload, $$props) {
  push();
  const API_G15 = "https://sos2425-15.onrender.com/api/v1/ocupied-grand-stats/";
  const API_G20 = "https://sos2425-20.onrender.com/api/v1/accidents-with-animals";
  const API_G12 = "https://sos2425-12.onrender.com/api/v1/annual-consumptions";
  const API_G13 = "https://sos2425-13.onrender.com/api/v2/national-parks";
  let API_EDUCATION = "/api/v1/education-data";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Integrations - Francisco Javier</title>`;
    $$payload2.out += `<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  });
  $$payload.out += `<div class="wrapper"><div class="container"><h2 style="text-align: center;">Integraciones <br><i>Francisco Javier</i></h2> <hr style="width: 55em; animation: loadHrGraph 1s; transition: all 0.3s ease;"> <div><div class="article" style="margin-top: 0;"><h3 style="font-size: 1.5em; text-transform: none;">Relación entre Uso del Suelo y Formación Profesional (2021)</h3> <p>Este gráfico tipo burbuja relaciona el uso del suelo (suelo desnudo y superficie arbolada) con 
					la tasa media de matriculación en Formación Profesional en provincias seleccionadas de Andalucía.
					El eje X representa la superficie de suelo, el eje Y la superficie arbolada y el tamaño de cada burbuja
					indica la tasa de FP promedio.</p> <a style="color: #fff;"${attr("href", API_G15)} target="_blank"><i>G15 - ocupied-grand-stats</i></a> <a style="color: #fff; margin-left:1em;"${attr("href", API_EDUCATION)} target="_blank"><i>G14-education-data</i></a> <figure class="chartjs-figure svelte-47s6as">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> <canvas id="g15EduChart"></canvas></figure></div> <div class="article" style="margin-top: 1em;"><h3 style="font-size: 1.5em; text-transform: none;">Accidentes con Animales por Grupo (2023)</h3> <p>Este gráfico muestra cuántos accidentes de tráfico con animales estuvieron relacionados
					con cada grupo animal durante el año 2023. Permite identificar qué tipos de fauna están
					más implicados en este tipo de incidentes según los registros recopilados a nivel
					nacional.</p> <a style="color: #fff;"${attr("href", API_G20)} target="_blank"><i>G20 - accidents-with-animals</i></a> <figure class="chartjs-figure svelte-47s6as">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> <canvas id="20Chart"></canvas></figure></div> <div class="article"><h3 style="font-size: 1.5em;">Consumo Energético vs Tasa de Matriculación en FP (2021)</h3> <p>Este gráfico compara el consumo total de energía en distintas comunidades autónomas con la
					tasa de matriculación en Formación Profesional. Permite observar si existe alguna relación
					entre desarrollo energético y acceso a estudios técnicos.</p> <a style="color: #fff;"${attr("href", API_G12)} target="_blank"><i>G12 - annual-consumptions</i></a> <a style="color: #fff; margin-left:1em;"${attr("href", API_EDUCATION)} target="_blank"><i>G14-education-data</i></a> <figure class="chartjs-figure svelte-47s6as">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos combinados...</p>`;
  }
  $$payload.out += `<!--]--> <canvas id="combinedChart"></canvas></figure></div> <div class="article" style="margin-top: 0;"><h3 style="font-size: 1.5em; text-transform: none;">Superficie Actual de los Parques Nacionales</h3> <p>Este gráfico muestra la superficie actual en hectáreas de los distintos parques nacionales
					de España. Permite comparar el tamaño de cada parque natural y analizar cómo varía su
					extensión a lo largo del territorio nacional.</p> <a style="color: #fff;"${attr("href", API_G13)} target="_blank"><i>G13 - national-parks</i></a> <figure class="chartjs-figure svelte-47s6as">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> <canvas id="13Chart"></canvas></figure></div> <div class="article" style="margin-top: 2em;"><h3 style="font-size: 1.5em; text-transform: none;">Comparativa Climática de Varias Ciudades (Weather)</h3> <p>Este gráfico de burbujas permite comparar en tiempo real la temperatura, humedad y
					velocidad del viento en cinco ciudades españolas: Sevilla, Madrid, Barcelona, Valencia y
					Bilbao.</p> <a style="color: #fff;" href="https://openweathermap.org/current" target="_blank"><i>API externa - OpenWeatherMap</i></a> <figure class="chartjs-figure svelte-47s6as"><canvas id="externalChart"></canvas></figure></div> <div class="article" style="margin-top: 0;"><h3 style="font-size: 1.5em; text-transform: none;">Temperatura Horaria en Sevilla (AEMET)</h3> <p>Este gráfico de dispersión representa las temperaturas registradas en distintas horas del
					día en Sevilla, según los datos proporcionados por la Agencia Estatal de Meteorología.
					Permite visualizar cómo varía la temperatura a lo largo de la jornada.</p> <a style="color: #fff;" href="https://www.aemet.es/es/eltiempo/prediccion/municipios/sevilla-id41091" target="_blank"><i>AEMET - Predicción Sevilla</i></a> <figure class="chartjs-figure svelte-47s6as"><p id="mensaje" style="color: #fff; text-align: center; font-weight: bold;"></p> <canvas id="aemetChart"></canvas></figure></div> <div class="article" style="margin-top: 0;"><h3 style="font-size: 1.5em; text-transform: none;">Comparativa de Descripciones en Publicaciones APOD (NASA)</h3> <p>Este gráfico muestra la longitud de las descripciones en los resultados de imágenes y
					vídeos de la NASA (Astronomy Picture of the Day), permitiendo una visión del nivel de
					detalle en cada contenido.</p> <a style="color: #fff;" href="https://images-api.nasa.gov" target="_blank"><i>NASA Images API</i></a> <figure class="chartjs-figure svelte-47s6as"><p id="mensaje-nasa" style="color: white; text-align: center; margin-top: 1em;"></p> <canvas id="nasaChart"></canvas></figure></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-sLT-zUyD.js.map
