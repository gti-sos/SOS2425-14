import { I as ensure_array_like } from './index-B0di9SGT.js';
import { A as Api } from './Api-CetGqfUO.js';

const data = [
  {
    id: 1,
    api: "Jaime",
    description: "Visualización de las APIs porpuestas por Jaime Duffy Panés",
    path: "/integrations/jaime",
    image: "/images/labor_data.jpg"
  },
  {
    id: 2,
    api: "Fran",
    description: "Visualización de las APIs porpuestas por Francisco Javier Rodríguez Martín",
    path: "/integrations/fran",
    image: "/images/enrollment_data.jpg"
  },
  {
    id: 3,
    api: "Pablo",
    description: "Visualización de las APIs porpuestas por Pablo Dominguez Galván",
    path: "/integrations/pablo",
    image: "/images/crime_data.webp"
  }
];
function _page($$payload) {
  const each_array = ensure_array_like(data);
  $$payload.out += `<div class="wrapper"><div class="container"><h2>Integraciones</h2> <hr> <div class="article"><h3 style="text-align: center;">Integrations Showcase</h3> <div class="apis-container"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let card = each_array[$$index];
    Api($$payload, {
      api: card.api,
      description: card.description,
      path: card.path,
      image: card.image,
      text: "Integrations"
    });
  }
  $$payload.out += `<!--]--></div></div></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DQsAHw_r.js.map
