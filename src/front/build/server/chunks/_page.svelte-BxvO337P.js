import { D as head } from './index-CAjZYzUI.js';
import { M as Members, A as ApiShowcase } from './Members-BSR_25v0.js';

function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>SOS2425-14 - About Us</title>`;
    $$payload2.out += `<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  });
  $$payload.out += `<div class="wrapper"><div class="container"><h2>About our project</h2> <hr> <div class="article"><h3>Project description</h3> <p>This project aims to analyze three datasets to identify potential correlations and trends between different socioeconomic factors. The datasets include:</p> <ul class="list-disc list-inside space-y-4"><li><strong>employment-data (developed by Jaime Duffy Panés)</strong>: Covers unemployment rates, employment rates, and activity rates of the active population.</li> <li><strong>education-data (developed by Francisco Javier Rodríguez Martín)</strong>: Includes enrollment rates in Basic Vocational Training, Intermediate Vocational Training, and Higher Vocational Training.</li> <li><strong>cybercrime-data (developed by Pablo Domínguez Galván)</strong>: Displays the total number of criminal offenses, cybercrime-related incidents, and arrests or investigations related to cybercrime.</li></ul></div> <br> `;
  Members($$payload);
  $$payload.out += `<!----> `;
  ApiShowcase($$payload);
  $$payload.out += `<!----> <div class="article borderless"><h3>Check Out Our Website</h3> <p>Here’s the link to our project site! Take a look to see what we’ve been working on, learn
				more about our ideas, and follow our progress.</p> <a href="https://sos2425-14.onrender.com/" target="_blank">Explore</a></div></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BxvO337P.js.map
