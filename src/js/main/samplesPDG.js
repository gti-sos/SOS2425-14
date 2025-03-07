//use strict;

import { comunityFormRenderer } from "../renders/comunityFormRenderer.js";

function samplesPDG() {
    loadCommunities();  // Función para cargar las comunidades
    const form = document.getElementById('communityForm');
    form.addEventListener('submit', handleSubmit);
}

// Función para cargar las comunidades
function loadCommunities() {
    const container = document.getElementById('communityForm');
    const before = document.getElementById('before-communities');
    fetch('/src/json/data-pdg.json')  
        .then(response => response.json())
        .then(data => {
            try {
                const communities = [...new Set(data.map(item => item.autonomous_community))];
                container.insertBefore(comunityFormRenderer.asSelect(communities), before);
            } catch (error) {
                console.error("Error al cargar las comunidades", error);
            }
        });
}

// Función para manejar el evento de enviar el formulario
async function handleSubmit(event) {
    const resultsContainer = document.getElementById('results');
    
    event.preventDefault();
    const selectedCommunity = document.getElementById('community').value;  // Obtenemos la comunidad seleccionada

    try {
        // Realizamos la solicitud POST
        const response = await fetch('/api/PDG', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ community: selectedCommunity }),  // Enviamos la comunidad seleccionada
        });

        // Obtenemos la respuesta del servidor como JSON
        const data = await response.json();
        
        // Mostramos los resultados en la página web
        resultsContainer.innerHTML = `
            <h3>Results for: ${data.autonomous_community}</h3>
            <ul>
                <li><strong>Average Criminal Offenses:</strong> ${data.criminal_ofense}</li>
                <li><strong>Average Cybersecurity:</strong> ${data.cybersecurity}</li>
                <li><strong>Average Arrested/Investigated:</strong> ${data.arrested_investigated}</li>
            </ul>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p>Error al obtener los datos</p>`;  // Mensaje de error si algo falla
    }
}

// Esperamos a que se cargue el DOM para inicializar la función
document.addEventListener('DOMContentLoaded', samplesPDG);
