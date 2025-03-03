"use strict";

import { membersRenderer } from "../renders/teamRenderer.js";

function about() {
    loadTeam();
    
    const samplesLink = document.getElementById('samples-link');
    const dropdown = document.querySelector('.dropdown');

    samplesLink.addEventListener('click', function(event) {
        event.preventDefault(); // Evita la redirección
        dropdown.classList.toggle('show');
    });
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