"use strict";

import { membersRenderer } from "../renders/teamRenderer.js";

function about() {
    loadTeam();
}

function loadTeam(){
    const container = document.getElementById('team');
    fetch('/src/json/members.json')
        .then(response => response.json())
        .then(teamData => {
            try {
                container.appendChild(membersRenderer.asMembers(teamData));
            } catch (error) {
                console.error("Error al cargar el equipo", error);
            }
        })
        .catch(error => console.error("Error al cargar el archivo JSON", error));
}

document.addEventListener('DOMContentLoaded', about);