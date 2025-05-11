import { w as push, I as ensure_array_like, D as head, J as attr, F as escape_html, y as pop } from './index-C3eIXEbb.js';

function _page($$payload, $$props) {
  push();
  const communities = [
    "Andalucia",
    "Aragon",
    "Asturias",
    "Baleares",
    "Canarias",
    "Cantabria",
    "Castilla-La Mancha",
    "Castilla y Leon",
    "Cataluña",
    "Comunitat Valenciana",
    "Extremadura",
    "Galicia",
    "Madrid",
    "Murcia",
    "Navarra",
    "Pais Vasco",
    "La Rioja",
    "Ceuta y Melilla",
    "TOTAL"
  ];
  const each_array = ensure_array_like(communities);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Graphs - Cybercrime Data</title>`;
    $$payload2.out += `<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  });
  $$payload.out += `<div class="wrapper"><div class="container"><h2>Gráficas de cybercrime-data</h2> <hr style="width: 55em; animation: loadHrGraph 1s; transition: all 0.3s ease;"> <div class="graph-container" style="background: none; box-shadow: none; padding: 0.5em 0;"><h3>Selecciona la comunidad autónoma:</h3> <select class="custom-select" style="width: 150%;"><option disabled value="">Selecciona una comunidad</option><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let community = each_array[$$index];
    $$payload.out += `<option${attr("value", community)}>${escape_html(community)}</option>`;
  }
  $$payload.out += `<!--]--></select></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-e-P3FyTt.js.map
