import { w as push, N as store_get, D as head, J as attr, O as unsubscribe_stores, y as pop } from './index-Cf8uAw7r.js';
import { p as page } from './stores-CQAN_bzQ.js';
import './client-Cjh4wbIU.js';
import './exports-C5vMSjTI.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let autonomous_community = "";
  let year = "";
  let basic_fp = "";
  let middle_grade = "";
  let higher_grade = "";
  {
    const params = store_get($$store_subs ??= {}, "$page", page).params;
    autonomous_community = decodeURIComponent(params.autonomous_community);
    year = params.year;
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Editar recurso</title>`;
  });
  $$payload.out += `<div class="wrapper dash"><div class="container dash">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <form class="create-form"><input${attr("value", autonomous_community)} readonly> <input${attr("value", year)} readonly> <input type="number"${attr("value", basic_fp)} placeholder="Formación Profesional Básica" step="any"> <input type="number"${attr("value", middle_grade)} placeholder="Grado Medio" step="any"> <input type="number"${attr("value", higher_grade)} placeholder="Grado Superior" step="any"> <button type="submit" class="submit">Actualizar</button> <button type="button" class="cancel">Cancelar</button></form></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BX6JngyS.js.map
