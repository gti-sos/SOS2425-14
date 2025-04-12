import { p as push, f as ensure_array_like, e as escape_html, c as pop } from './index-TGfQi5Z6.js';

function _page($$payload, $$props) {
  push();
  let education = [];
  const each_array = ensure_array_like(education);
  $$payload.out += `<div class="wrapper dash"><div class="container dash">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="header"><h3>Education</h3> <div class="actions"><button class="green"><i class="fas fa-plus"></i> Add New Record</button> <button class="green"><i class="fas fa-sync-alt"></i> Reload Initial Data</button> <button class="red"><i class="fas fa-trash-alt"></i> Delete All</button></div></div> <div class="seeker"></div> <div class="table-container"><table><thead><tr><th>Autonomous Community</th><th>Year</th><th>Basic FP</th><th>Middle Grade</th><th>Higher Grade</th><th>Actions</th></tr></thead></table> <div class="scroll-body"><table><tbody><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let record = each_array[$$index];
    $$payload.out += `<tr><td>${escape_html(record.autonomous_community)}</td><td>${escape_html(record.year)}</td><td>${escape_html(record.basic_fp)}</td><td>${escape_html(record.middle_grade)}</td><td>${escape_html(record.higher_grade)}</td><td class="actions"><button class="edit" title="Edit record"><i class="fas fa-pen"></i></button>  <button class="delete" title="Delete record"><i class="fas fa-times"></i></button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CTT_rjFh.js.map
