import { w as push, F as escape_html, y as pop, G as getContext } from './index-C3eIXEbb.js';
import { s as stores } from './client-BFUYEV2e.js';
import './exports-ClNMMJ3E.js';

({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-CA2LlOYW.js.map
