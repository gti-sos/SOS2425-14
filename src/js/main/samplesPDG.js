//use strict;

import { comunityFormRenderer } from "../renders/comunityFormRenderer.js";

function samplesPDG() {
    loadCommunities();  // Función para cargar las comunidades
    const form = document.getElementById('communityForm');
    form.addEventListener('submit', handleSubmit);
}

// Función para cargar las comunidades desde la API
function loadCommunities() {
    const container = document.getElementById('communityForm');
    const before = document.getElementById('before-communities');

    fetch('/api/v1/cybercrime-data')
        .then(response => response.json())
        .then(data => {
            try {
                // Extraer comunidades únicas
                const communities = [...new Set(data.map(item => item.autonomous_community))];
                
                // Insertar el <select> en el formulario
                container.insertBefore(comunityFormRenderer.asSelect(communities), before);
            } catch (error) {
                console.error("Error al procesar las comunidades", error);
            }
        })
        .catch(error => {
            console.error("Error al cargar datos desde la API externa", error);
        });
}


// Función para manejar el evento de enviar el formulario
async function handleSubmit(event) {
    event.preventDefault();
    const resultsContainer = document.getElementById('results');
    const selectedCommunity = document.getElementById('community').value;

    if (!selectedCommunity) {
        resultsContainer.innerHTML = `<p>Por favor, selecciona una comunidad autónoma</p>`;
        return;
    }

    try {
        const response = await fetch('/api/v1/cybercrime-data?autonomous_community=' + encodeURIComponent(selectedCommunity), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            resultsContainer.innerHTML = `<p>No se encontraron datos para ${selectedCommunity}</p>`;
            return;
        }

        // Calcular promedios
        const offenseAvg = (data.reduce((sum, entry) => sum + parseFloat(entry.criminal_ofense), 0) / data.length).toFixed(2);
        const cybersecurityAvg = (data.reduce((sum, entry) => sum + parseFloat(entry.cybersecurity), 0) / data.length).toFixed(2);
        const arrestedAvg = (data.reduce((sum, entry) => sum + parseFloat(entry.arrested_investigated), 0) / data.length).toFixed(2);

        resultsContainer.innerHTML = `
            <h3>Resultados para: ${selectedCommunity}</h3>
            <ul>
                <li><strong>Promedio de Delitos:</strong> ${offenseAvg}</li>
                <li><strong>Promedio de Ciberseguridad:</strong> ${cybersecurityAvg}</li>
                <li><strong>Promedio de Detenidos/Investigados:</strong> ${arrestedAvg}</li>
            </ul>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p>Error al obtener los datos</p>`;
    }
}

// Esperamos a que se cargue el DOM para inicializar la función
document.addEventListener('DOMContentLoaded', samplesPDG);
