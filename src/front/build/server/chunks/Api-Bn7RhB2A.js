import { O as attr_style, F as escape_html, J as attr, K as bind_props } from './index-C3eIXEbb.js';

function Api($$payload, $$props) {
  let api = $$props["api"];
  let description = $$props["description"];
  let path = $$props["path"];
  let image = $$props["image"];
  let text = $$props["text"];
  $$payload.out += `<div class="api"${attr_style(`background-image: url(${image});`)}><h4>${escape_html(api)}</h4> <p>${escape_html(description)}</p> <span>${escape_html(text)}</span> <a${attr("href", path)}>Explore Here</a></div>`;
  bind_props($$props, { api, description, path, image, text });
}

export { Api as A };
//# sourceMappingURL=Api-Bn7RhB2A.js.map
