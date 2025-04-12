import { h as head, f as ensure_array_like, i as attr, e as escape_html, j as bind_props } from './index-TGfQi5Z6.js';
import { A as ApiShowcase } from './ApiShowcase-DfBOLuZU.js';

function TeamMember($$payload, $$props) {
  let name = $$props["name"];
  let gitUser = $$props["gitUser"];
  let avatar = $$props["avatar"];
  $$payload.out += `<li class="member"><img${attr("src", avatar)}${attr("alt", `Avatar de ${gitUser}`)}> <h4>${escape_html(name)}</h4> <i>${escape_html(gitUser)}</i></li>`;
  bind_props($$props, { name, gitUser, avatar });
}
const members = [
  {
    id: 1,
    name: "Francisco Javier Rodríguez Martín",
    gitUser: "Frarodmar19",
    avatar: "https://avatars.githubusercontent.com/u/92883501?s=88&v=4"
  },
  {
    id: 2,
    name: "Jaime Duffy Panés",
    gitUser: "jaimeduffy",
    avatar: "https://avatars.githubusercontent.com/u/79634577?s=88&amp;v=4"
  },
  {
    id: 3,
    name: "Páblo Dominguez Galván",
    gitUser: "pabdomgal",
    avatar: "https://avatars.githubusercontent.com/u/92788663?s=88&v=4"
  }
];
function Members($$payload) {
  const each_array = ensure_array_like(members);
  $$payload.out += `<div class="article variant" id="team"><h3 style="text-align: center;">Team Members</h3> <ul class="members"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let member = each_array[$$index];
    TeamMember($$payload, {
      name: member.name,
      gitUser: member.gitUser,
      avatar: member.avatar
    });
  }
  $$payload.out += `<!--]--></ul></div>`;
}
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>SOS2425-14 - About Us</title>`;
    $$payload2.out += `<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  });
  $$payload.out += `<h2>About our project</h2> <hr> <div class="article"><h3>Proyect Description</h3> <p>This project aims to analyze three datasets to identify potential correlations and trends
		between different socioeconomic factors. The datasets include:</p> <ul><li><strong>Labor Market Data:</strong> Covers unemployment rates, employment rates, and activity rates
			of the active population.</li> <li><strong>Education Enrollment Data:</strong> Includes enrollment rates in Basic Vocational Training,
			Intermediate Vocational Training, and Higher Vocational Training.</li> <li><strong>Crime and Cybercrime Data:</strong> Displays the total number of criminal offenses, cybercrime-related
			incidents, and arrests or investigations related to cybercrime.</li></ul> <p>The analysis will provide insights into how these factors may be interconnected and their
		potential social implications.</p></div> <br> `;
  Members($$payload);
  $$payload.out += `<!----> `;
  ApiShowcase($$payload);
  $$payload.out += `<!----> <div class="article borderless"><h3>Check Out Our Website</h3> <p>Here’s the link to our project site! Take a look to see what we’ve been working on, learn more about our ideas, and follow our progress.</p> <a href="https://sos2425-14.onrender.com/" target="_blank">Explore</a></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dr7hTVqk.js.map
