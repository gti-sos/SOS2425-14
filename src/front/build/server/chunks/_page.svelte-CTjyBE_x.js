import { w as push, P as store_get, D as head, J as attr, Q as unsubscribe_stores, y as pop } from './index-C3eIXEbb.js';
import { p as page } from './stores-D-b5ummx.js';
import './client-BFUYEV2e.js';
import './exports-ClNMMJ3E.js';

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
//# sourceMappingURL=_page.svelte-CTjyBE_x.js.map
