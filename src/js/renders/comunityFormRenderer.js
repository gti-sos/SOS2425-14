"use strict";

import { parseHTML } from "../utils/parseHTML.js";

const comunityFormRenderer = {
    asOption: function(comunity){
        const html = `
            <option value="${comunity}">${comunity}</option>
        `;

        return parseHTML(html);
    },

    asSelect: function(data){
        const container = parseHTML('<select id="community" name="community"></select>');
        for(let c of data){
            container.appendChild(comunityFormRenderer.asOption(c));
        }
        return container;
    }
}

export {comunityFormRenderer};