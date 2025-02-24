"use strict";

import { parseHTML } from "../utils/parseHTML.js";

const membersRenderer = {
    asMember: function(data){
        const name = data.name;
        const gitUser = data.gitUser;
        const avatar = data.avatar;
        const html = `
        <li class="member" onclick="window.open('https://github.com/${gitUser}', '_blank');">
            <img src=${avatar} alt="Avatar de ${gitUser}">
            <h4>${name}</h4>
            <i>${gitUser}</i>
        </li>
        `;

        return parseHTML(html);
    },

    asMembers: function(data){
        const container = parseHTML('<ul class="members"></ul>');
        for(let d of data){
            container.appendChild(membersRenderer.asMember(d));
        }
        return container;
    }
}

export {membersRenderer};