import { w as push, I as ensure_array_like, J as attr, F as escape_html, y as pop } from './index-CAjZYzUI.js';

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
  $$payload.out += `<div class="wrapper"><div class="container"><h2>Gráficas de employment-data</h2> <hr> <div class="graph-container"><h3>Selecciona la comunidad autónmoma:</h3> <select class="custom-select"><!--[-->`;
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
//# sourceMappingURL=_page.svelte-DiPH74M2.js.map
