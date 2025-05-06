import { w as push, I as ensure_array_like, D as head, J as attr, F as escape_html, y as pop } from './index-B0di9SGT.js';

function _page($$payload, $$props) {
  push();
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
  const each_array = ensure_array_like(communities);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Graphs - Employment Data</title>`;
    $$payload2.out += `<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  });
  $$payload.out += `<div class="wrapper"><div class="container"><h2>Gráficas de employment-data</h2> <hr style="width: 100%; animation: loadHrGraph 1s;"> <div class="graph-container"><h3>Selecciona la comunidad autónmoma:</h3> <select class="custom-select"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let community = each_array[$$index];
    $$payload.out += `<option${attr("value", community)}>${escape_html(community)}</option>`;
  }
  $$payload.out += `<!--]--></select></div> <div class="article"><h3>Gráfica de la tasa de empleo</h3> <p>Esta gráfica permite visualizar los datos de empleo por año y nivel educativo. Puedes seleccionar la comunidad autónoma en específico.</p></div> <div class="graph-container"><figure class="highcharts-figure svelte-t3krpg"><div id="container"></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></figure></div> <div class="article"><h3>Gráfica de la tasa de paro</h3> <p>Esta gráfica permite visualizar la tasa de paro por años según la comunidad autónoma elegida.</p></div> <div class="graph-container">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BlCCTg5x.js.map
