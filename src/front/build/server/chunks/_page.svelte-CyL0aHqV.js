import { w as push, D as head, J as attr, y as pop } from './index-B0di9SGT.js';

function _page($$payload, $$props) {
  push();
  const API_G18 = "https://sos2425-18.onrender.com/api/v2/dana-grants-subsidies-stats";
  const API_G13 = "https://sos2425-13.onrender.com/api/v1/water-supply-improvements";
  const API_G10 = "https://sos2425-10.onrender.com/api/v1/radars-stats";
  let API_EMPLOYMENT = "/api/v1/employment-data";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Integrations - Jaime Duffy Panés</title>`;
    $$payload2.out += `<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  });
  $$payload.out += `<div class="wrapper"><div class="container"><h2 style="text-align: center;">Integraciones <br><i>Jaime Duffy Panés</i></h2> <hr style="width: 100%; animation: loadHrGraph 1s; transition: all 0.3s ease;"> <div><div class="article"><h3 style="font-size: 1.5em; text-transform: none;">Distribución de ayudas DANA por municipios</h3> <p>Este gráfico representa cómo se reparte la ayuda por la dana para cada municipio.</p> <a style="color: #fff;"${attr("href", API_G18)} target="_blank"><i>G18-dana-grants-subsidies-stats</i></a> <figure class="highcharts-figure"><div id="container"></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></figure></div> <div class="article"><h3 style="font-size: 1.5em; text-transform: none;">Integración: Número de multas por tasa de paro</h3> <p>Este gráfico nos muestra el número de multas de las comunidades autónomas junto con la tasa de paro.</p> <a style="color: #fff; margin-right: 1rem;"${attr("href", API_G10)} target="_blank"><i>G10-radars-stats</i></a> <a style="color: #fff;"${attr("href", API_EMPLOYMENT)} target="_blank"><i>API: Datos de Empleo</i></a> <div class="chart-container svelte-1dhmy21">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="loading">Cargando datos...</div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="article"><h3 style="font-size: 1.5em; text-transform: none;">Integración: Número de proyectos y tasa de actividad</h3> <p>Este gráfico mustra el numero de proyectos y la tasa de actividad en andalucía según los años.</p> <a style="color: #fff; margin-right: 1rem;"${attr("href", API_G13)} target="_blank"><i>G13-water-supply-improvements</i></a> <a style="color: #fff;"${attr("href", API_EMPLOYMENT)} target="_blank"><i>API: Datos de Empleo</i></a> <div class="chart-container svelte-1dhmy21">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="loading">Cargando datos...</div>`;
  }
  $$payload.out += `<!--]--></div></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CyL0aHqV.js.map
