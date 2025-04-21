import { w as push, I as ensure_array_like, D as head, F as escape_html, y as pop } from './index-Cf8uAw7r.js';
import './client-Cjh4wbIU.js';
import './exports-C5vMSjTI.js';

function _page($$payload, $$props) {
  push();
  let cybercrime = [];
  const each_array = ensure_array_like(cybercrime);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Datos de Ciberdelincuencia</title>`;
  });
  $$payload.out += `<div class="wrapper dash"><div class="container dash">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="header"><h3>Datos de ciberdelincuencia</h3> <div class="actions"><button class="btn"><i class="fas fa-search"></i> Búsqueda</button> <button class="btn"><i class="fas fa-plus"></i> Nuevo registro</button> <button class="btn"><i class="fas fa-sync-alt"></i> Recargar los datos iniciales</button> <button class="btn"><i class="fas fa-trash-alt"></i> Eliminar todos los datos</button></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="seeker"></div> <div class="table-container"><table><thead><tr><th>Comunidad Autónoma</th><th>Año</th><th>Delitos Informáticos</th><th>Delitos Ciberseguridad</th><th>Detenidos / Investigados</th><th>Acciones</th></tr></thead></table> <div class="scroll-body"><table><tbody><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let entry = each_array[$$index];
    $$payload.out += `<tr><td>${escape_html(entry.autonomous_community)}</td><td>${escape_html(entry.year)}</td><td>${escape_html(entry.criminal_ofense)}</td><td>${escape_html(entry.cybersecurity)}</td><td>${escape_html(entry.arrested_investigated)}</td><td class="actions"><button class="btn-circle" title="Editar Registro"><i class="fas fa-pen"></i></button> <button class="btn-circle" title="Eliminar Registro"><i class="fas fa-times"></i></button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B-v7QQ-j.js.map
