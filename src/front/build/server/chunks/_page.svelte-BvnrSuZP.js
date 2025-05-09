import { w as push, D as head, J as attr, y as pop } from './index-B0di9SGT.js';

function _page($$payload, $$props) {
  push();
  const API_G18 = "https://sos2425-18.onrender.com/api/v2/dana-grants-subsidies-stats";
  const API_G17 = "https://sos2425-17.onrender.com/api/v2/university-academic-performance";
  const API_G11 = "https://sos2425-11.onrender.com/api/v1/autonomy-dependence-applications";
  const API_G13 = "https://sos2425-13.onrender.com/api/v1/water-supply-improvements";
  const API_G10 = "https://sos2425-10.onrender.com/api/v1/radars-stats";
  let API_EMPLOYMENT = "/api/v1/employment-data";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Integrations - Jaime Duffy Panés</title>`;
    $$payload2.out += `<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.css" rel="stylesheet">`;
  });
  $$payload.out += `<div class="wrapper"><div class="container"><h2 style="text-align: center;">Integraciones <br><i>Jaime Duffy Panés</i></h2> <hr style="width: 100%; animation: loadHrGraph 1s; transition: all 0.3s ease;"> <div><div class="article"><h3 style="font-size: 1.5em; text-transform: none;">Widget: Distribución de ayudas DANA por municipios</h3> <p>Este gráfico representa cómo se reparte la ayuda por la dana para cada municipio.</p> <a style="color: #fff;"${attr("href", API_G18)} target="_blank"><i>G18-dana-grants-subsidies-stats</i></a> <div class="chart-container svelte-sihtrb"><figure class="highcharts-figure"><div id="container"></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></figure></div></div> <div class="article"><h3 style="font-size: 1.5em; text-transform: none;">Integración: Número de multas por tasa de paro</h3> <p>Este gráfico nos muestra el número de multas de las comunidades autónomas junto con la tasa de paro.</p> <a style="color: #fff; margin-right: 1rem;"${attr("href", API_G10)} target="_blank"><i>G10-radars-stats</i></a> <a style="color: #fff;"${attr("href", API_EMPLOYMENT)} target="_blank"><i>API: Datos de Empleo</i></a> <div class="chart-container svelte-sihtrb"><div id="chart10" style="max-width: 800px; margin: auto;"></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="article"><h3 style="font-size: 1.5em; text-transform: none;">Integración: Número de proyectos y tasa de actividad</h3> <p>Este gráfico mustra el numero de proyectos y la tasa de actividad en andalucía según los años.</p> <a style="color: #fff; margin-right: 1rem;"${attr("href", API_G13)} target="_blank"><i>G13-water-supply-improvements</i></a> <a style="color: #fff;"${attr("href", API_EMPLOYMENT)} target="_blank"><i>API: Datos de Empleo</i></a> <div class="chart-container svelte-sihtrb"><div id="andaluciaChart" style="max-width: 700px; margin: auto;"></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="article"><h3 style="font-size: 1.5em; text-transform: none;">Widget: Distribución de Estudiantes por Grado Universitario</h3> <p>Este gráfico en formato donut muestra la proporción de estudiantes matriculados en los distintos grados universitarios, destacando los seis con mayor volumen. Los grados restantes se agrupan en la categoría “Otras” para facilitar la visualización comparativa.</p> <a style="color: #fff; margin-right: 1rem;"${attr("href", API_G17)} target="_blank"><i>G17-university-academic-performance</i></a> <div class="chart-container svelte-sihtrb"><div id="chart17" style="max-width: 600px; margin: auto;"></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="article"><h3 style="font-size: 1.5em; text-transform: none;">Widget: Comparativa de Solicitudes de Autonomía y Dependencia por Comunidad Autónoma</h3> <p>Este gráfico de barras muestra la comparación entre el número de solicitudes de autonomía y de dependencia realizadas por diferentes comunidades autónomas en los años 2023 y 2024. Permite visualizar la relación entre ambas necesidades sociales y observar la distribución geográfica del apoyo solicitado.</p> <a style="color: #fff; margin-right: 1rem;"${attr("href", API_G11)} target="_blank"><i>G11-autonomy-dependence-applications</i></a> <div class="chart-container svelte-sihtrb"><div id="chart11" style="max-width: 600px; margin: auto;"></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BvnrSuZP.js.map
