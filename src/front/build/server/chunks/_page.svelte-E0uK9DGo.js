import { w as push, N as store_get, D as head, J as attr, O as unsubscribe_stores, y as pop } from './index-Cf8uAw7r.js';
import { p as page } from './stores-CQAN_bzQ.js';
import './client-Cjh4wbIU.js';
import './exports-C5vMSjTI.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let autonomous_community = "";
  let year = "";
  let activity_rate = "";
  let employment_rate = "";
  let unemployment_rate = "";
  {
    const params = store_get($$store_subs ??= {}, "$page", page).params;
    autonomous_community = decodeURIComponent(params.autonomous_community);
    year = params.year;
    decodeURIComponent(params.education_level);
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Editar recurso</title>`;
  });
  $$payload.out += `<div class="wrapper dash"><div class="container dash">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <form class="create-form"><input${attr("value", autonomous_community)} readonly> <input${attr("value", year)} readonly> <select disabled><option value="" disabled selected>Nivel educativo</option><option value="SUP">Educación superior (SUP)</option><option value="SEC">Secundaria (SEC)</option><option value="INF">Inferior a secundaria (INF)</option><option value="TOTAL">Total (TOTAL)</option></select> <input${attr("value", activity_rate)} placeholder="Tasa actividad"> <input${attr("value", employment_rate)} placeholder="Tasa empleo"> <input${attr("value", unemployment_rate)} placeholder="Tasa paro"> <button type="submit" class="submit">Actualizar</button> <button type="button" class="cancel">Cancelar</button></form></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-E0uK9DGo.js.map
