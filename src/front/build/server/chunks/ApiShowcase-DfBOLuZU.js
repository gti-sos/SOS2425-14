import { f as ensure_array_like, k as attr_style, e as escape_html, i as attr, j as bind_props } from './index-TGfQi5Z6.js';

function Api($$payload, $$props) {
  let api = $$props["api"];
  let description = $$props["description"];
  let path = $$props["path"];
  let image = $$props["image"];
  $$payload.out += `<div class="api"${attr_style(`background-image: url(${image});`)}><h4>${escape_html(api)}</h4> <p>${escape_html(description)}</p> <span>API</span> <a${attr("href", path)}>Explore Here</a></div>`;
  bind_props($$props, { api, description, path, image });
}
const apis = [
  {
    id: 1,
    api: "Employment Data",
    description: "Access unemployment, employment, and activity rate data for the active population with the Labor Market Data API.",
    path: "/api/v1/employment-data",
    image: "/images/labor_data.jpg"
  },
  {
    id: 2,
    api: "Education Data",
    description: "Access enrollment data for Basic, Intermediate, and Higher Vocational Training with the Education Enrollment Data API.",
    path: "/api/v1/education-data",
    image: "/images/enrollment_data.jpg"
  },
  {
    id: 3,
    api: "Crime Data",
    description: "Retrieve data on criminal offenses, cybercrime incidents, and related arrests with the Crime and Cybercrime Data API.",
    path: "/api/v1/cybercrime-data",
    image: "/images/crime_data.webp"
  }
];
function ApiShowcase($$payload) {
  const each_array = ensure_array_like(apis);
  $$payload.out += `<div class="article" style="padding: 1em 0;"><h3 style="text-align: center;">APIs Showcase</h3><br> <div class="apis-container"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let api = each_array[$$index];
    Api($$payload, {
      api: api.api,
      description: api.description,
      path: api.path,
      image: api.image
    });
  }
  $$payload.out += `<!--]--></div></div>`;
}

export { ApiShowcase as A };
//# sourceMappingURL=ApiShowcase-DfBOLuZU.js.map
