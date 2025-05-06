import { w as push, D as head, y as pop } from './index-B0di9SGT.js';

function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Graphs - Analytics</title>`;
    $$payload2.out += `<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  });
  $$payload.out += `<div class="wrapper"><div class="container"><h2>Integración grupal</h2> <hr style="width: 100%; animation: loadHrGraph 1s;"> <div class="graph-container"><p>Esta gráfica integra los datos de las tres APIs. En concreto, se muestra el porcentaje de empleo, educación superior y cibercrimen por años.</p> <figure class="highcharts-figure svelte-t3krpg"><div id="container"></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Cargando datos...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></figure></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BJS_EbzT.js.map
