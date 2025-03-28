
import { comunityFormRenderer } from "../renders/comunityFormRenderer.js";
import { getJDPData } from "../functions/index-JDP.js";

function samplesJDP(){
    loadComunities();
    const form = document.getElementById('communityForm');
    form.addEventListener('submit', handleSubmit);
}

async function loadComunities() {
    const container = document.getElementById('communityForm');
    const before = document.getElementById('before-comunities');

    try {
        // Obtener comunidades desde la API
        const response = await fetch('/api/v1/employment-data');
        const data = await response.json();


        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("No se encontraron comunidades autónomas.");
        }

        // Extraer las comunidades autónomas únicas
        const communities = [...new Set(data.map(item => item.autonomous_community))].filter(c => c);

        if (communities.length === 0) {
            throw new Error("No hay datos de comunidades disponibles.");
        }

        // Insertar el desplegable antes del botón
        container.insertBefore(comunityFormRenderer.asSelect(communities), before);

    } catch (error) {
        console.error("Error al cargar las comunidades:", error);
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    
    const resultsContainer = document.getElementById('results');
    const selectedCommunity = document.getElementById('community').value;

    try {
        // Llamar a la función getJDPData() para obtener los datos desde la API
        const data = await getJDPData(selectedCommunity);

        if (data.error) {
            resultsContainer.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        resultsContainer.innerHTML = `
            <h3>Results for: ${data.autonomous_community}</h3>
            <ul>
                <li><strong>Activity rate:</strong> ${data.activity_rate_avg}%</li>
                <li><strong>Employment rate</strong>: ${data.employment_rate_avg}%</li>
                <li><strong>Unemployment rate:</strong> ${data.unemployment_rate_avg}%</li>
            </ul>
        `;

    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p>Error al obtener los datos</p>`;
    }
}

document.addEventListener('DOMContentLoaded', samplesJDP);