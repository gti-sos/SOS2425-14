import { w as push, D as head, J as attr, y as pop } from './index-C3eIXEbb.js';

function _page($$payload, $$props) {
  push();
  const API_G15 = "https://sos2425-15.onrender.com/api/v1/precipitation-stats/";
  const API_G20 = "https://sos2425-20.onrender.com/api/v1/fines/";
  let API_CYBERCRIME = "/api/v1/cybercrime-data";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Integrations - Pablo Dominguez</title>`;
    $$payload2.out += `<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  });
  $$payload.out += `<div class="wrapper"><div class="container"><h2 style="text-align: center;">Integraciones <br><i>Pablo</i></h2> <hr style="width: 55em; animation: loadHrGraph 1s; transition: all 0.3s ease;"> <div><div class="article" style="margin-top: 0;"><h3 style="font-size: 1.5em; text-transform: none;">Relación entre Precipitación y Cibercriminalidad (2021)</h3> <p>Este gráfico de columnas relaciona la precipitación anual con la tasa de delitos de cibercrimen en
                    provincias seleccionadas de Andalucía.</p> <a style="color: #fff;"${attr("href", API_G15)} target="_blank"><i>G15 - precipitation-stats</i></a> <a style="color: #fff; margin-left:1em;"${attr("href", API_CYBERCRIME)} target="_blank"><i>G14-cybercrime-data</i></a> <figure class="chartjs-figure svelte-wpvc02">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> <div id="g15CrimeChart"></div></figure></div> <div class="article" style="margin-top: 3em;"><h3 style="font-size: 1.5em; text-transform: none;">Relación entre Infracciones y Cibercriminalidad por Comunidad (2023)</h3> <p>Este gráfico de barras muestra la relación entre las infracciones (ITV) y los delitos de cibercriminalidad por comunidades en el año 2023.</p> <a style="color: #fff;"${attr("href", API_G20)} target="_blank"><i>G20 - fines-data</i></a> <a style="color: #fff; margin-left:1em;"${attr("href", API_CYBERCRIME)} target="_blank"><i>G14-cybercrime-data</i></a> <figure class="chartjs-figure svelte-wpvc02">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p style="color: #fff; text-align: center; font-weight: bold;">Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> <div id="combinedChart"></div></figure></div> <div class="article" style="margin-top: 2em;"><h3 style="font-size: 1.5em; text-transform: none;">Noticias</h3> <p>Este gráfico de burbujas permite comparar en tiempo real las noticias.</p> <a style="color: #fff;" href="https://openweathermap.org/current" target="_blank"><i>API externa - NewsApi</i></a> <figure class="chartjs-figure svelte-wpvc02"><canvas id="externalChart"></canvas></figure></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DXylBg1X.js.map
