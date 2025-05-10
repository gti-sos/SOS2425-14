import { D as head, E as slot, w as push, y as pop } from './index-C3eIXEbb.js';
import './client-BFUYEV2e.js';
import './exports-ClNMMJ3E.js';

function Navbar($$payload, $$props) {
  push();
  $$payload.out += `<header id="navbar"><h1>SOS2425-14</h1> <nav><ul><li><a href="/">Home</a></li> <li class="dropdown" id="dash"><a id="dashboard-link" style="cursor: pointer;">Dashboards<span class="dropdown-arrow"></span></a> <ul class="dropdown-content"><li><a href="/education">Education</a></li> <li><a href="/employment">Employment</a></li> <li><a href="/cybercrime">Crime</a></li></ul></li> <li class="dropdown" id="graphs"><a id="graphs-link" style="cursor: pointer;">Graphs<span class="dropdown-arrow"></span></a> <ul class="dropdown-content"><li><a href="/education-graph">Education</a></li> <li><a href="/employment-graph">Employment</a></li> <li><a href="/cybercrime-graph">Crime</a></li> <li><a href="/analytics">Group</a></li></ul></li> <li><a href="/integrations">Integrations</a></li> <li class="dropdown" id="apis"><a id="apis-link" style="cursor: pointer;">APIs<span class="dropdown-arrow"></span></a> <ul class="dropdown-content"><li><a href="/api/v1/education-data/docs">Education</a></li> <li><a href="/api/v1/employment-data/docs">Employment</a></li> <li><a href="/api/v1/cybercrime-data/docs">Crime</a></li></ul></li> <li><a href="/about">About</a></li></ul></nav> <i class="fas fa-bars" id="menu-icon-open"></i></header>`;
  pop();
}
function Menu($$payload, $$props) {
  push();
  $$payload.out += `<div id="menu"><i class="fas fa-times" id="menu-icon-close"></i> <div class="menu-container"><h2>SOS2425-14</h2> <ul><li><a href="/">Home</a></li> <li><a href="/api/v1/education-data">Eduaction Data</a></li> <li><a href="/api/v1/employment-data">Employment Data</a></li> <li><a href="/api/v1/cybercrime-data">Crime Data</a></li> <li><a href="/about">About</a></li></ul></div></div>`;
  pop();
}
function Footer($$payload) {
  $$payload.out += `<footer id="footer"><div class="footer-container"><ul><h5>Menu</h5> <li><a href="/">Home</a></li> <li><a href="/apis">Apis</a></li> <li><a href="/about">About</a></li></ul> <ul><h5>APIs</h5> <li><a href="/api/v1/education-data/docs">Education</a></li> <li><a href="/api/v1/employment-data/docs">Employment</a></li> <li><a href="/api/v1/cybercrime-data/docs">Cybercrime</a></li></ul> <ul><h5>GitHub</h5> <li><a href="https://github.com/gti-sos" target="_blank">gti-sos</a></li> <li><a href="https://github.com/gti-sos/SOS2425-14" target="_blank">SOS2425-14</a></li> <li><a href="https://github.com/gti-sos/SOS2425" target="_blank">SOS2425</a></li></ul> <div class="media"><h5>SOS2425-14</h5> <p>Un proyecto realizado por alumnos de la <a style="font-size: 90%;" href="https://www.informatica.us.es/" target="_blank">ETSII</a></p> <a href="https://github.com/gti-sos/SOS2425-14" target="_blank" aria-label="Visitar el repositorio de GitHub SOS2425-14"><i class="fab fa-github"></i></a></div></div></footer>`;
}
function GitHub($$payload) {
  $$payload.out += `<a href="https://github.com/gti-sos/SOS2425-14" class="btn-github" target="_blank" aria-label="Visitar el repositorio de GitHub SOS2425-14"><i class="fab fa-github"></i></a>`;
}
function _layout($$payload, $$props) {
  head($$payload, ($$payload2) => {
    $$payload2.out += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <link rel="icon" href="/favicon.png" type="image/x-icon"> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  });
  Navbar($$payload);
  $$payload.out += `<!----> `;
  Menu($$payload);
  $$payload.out += `<!----> `;
  GitHub($$payload);
  $$payload.out += `<!----> <!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CYbRTdH2.js.map
