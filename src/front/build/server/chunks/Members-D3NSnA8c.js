import { I as ensure_array_like, J as attr, F as escape_html, K as bind_props } from './index-C3eIXEbb.js';
import { A as Api } from './Api-Bn7RhB2A.js';

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
      image: api.image,
      text: "API"
    });
  }
  $$payload.out += `<!--]--></div></div>`;
}
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
    name: "Pablo Dominguez Galván",
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

export { ApiShowcase as A, Members as M };
//# sourceMappingURL=Members-D3NSnA8c.js.map
