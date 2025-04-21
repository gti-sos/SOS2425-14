import { w as push, N as store_get, D as head, J as attr, O as unsubscribe_stores, y as pop } from './index-Cf8uAw7r.js';
import { p as page } from './stores-CQAN_bzQ.js';
import './client-Cjh4wbIU.js';
import './exports-C5vMSjTI.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let autonomous_community = "";
  let year = "";
  let criminal_ofense = "";
  let cybersecurity = "";
  let arrested_investigated = "";
  {
    const params = store_get($$store_subs ??= {}, "$page", page).params;
    autonomous_community = decodeURIComponent(params.autonomous_community);
    year = params.year;
    criminal_ofense = decodeURIComponent(params.criminal_ofense);
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Editar recurso</title>`;
  });
  $$payload.out += `<div class="wrapper dash"><div class="container dash">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <form class="create-form"><input${attr("value", autonomous_community)} readonly> <input${attr("value", year)} readonly> <input${attr("value", criminal_ofense)} placeholder="Número de delitos"> <input${attr("value", cybersecurity)} placeholder="Número de ciberseguridad"> <input${attr("value", arrested_investigated)} placeholder="Número de arrestados/investigados"> <button type="submit" class="submit">Actualizar</button> <button type="button" class="cancel">Cancelar</button></form></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BfRNzVIB.js.map
