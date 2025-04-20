import { D as head } from './index-CAjZYzUI.js';
import { M as Members, A as ApiShowcase } from './Members-BSR_25v0.js';

function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>SOS2425-14</title>`;
  });
  $$payload.out += `<div class="wrapper"><div class="container"><h2>SOS2425-14</h2> <hr> <div class="article"><h3>Project description</h3> <p>This project aims to analyze three datasets to identify potential correlations and trends between different socioeconomic factors. The datasets include:</p> <ul class="list-disc list-inside space-y-4"><li><strong>employment-data (developed by Jaime Duffy Panés)</strong>: Covers unemployment rates, employment rates, and activity rates of the active population. <a href="https://sos2425-14.onrender.com/api/v1/employment-data/docs" target="_blank" class="btn" style="margin-left: 0.75rem;">Docs</a></li> <li><strong>education-data (developed by Francisco Javier Rodríguez Martín)</strong>: Includes enrollment rates in Basic Vocational Training, Intermediate Vocational Training, and Higher Vocational Training. <a href="https://sos2425-14.onrender.com/api/v1/education-data/docs" target="_blank" class="btn" style="margin-left: 0.75rem;">Docs</a></li> <li><strong>cybercrime-data (developed by Pablo Domínguez Galván)</strong>: Displays the total number of criminal offenses, cybercrime-related incidents, and arrests or investigations related to cybercrime. <a href="https://sos2425-14.onrender.com/api/v1/cybercrime-data/docs" target="_blank" class="btn" style="margin-left: 0.75rem;">Docs</a></li></ul></div> `;
  Members($$payload);
  $$payload.out += `<!----> `;
  ApiShowcase($$payload);
  $$payload.out += `<!----></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C0Vnf5H6.js.map
