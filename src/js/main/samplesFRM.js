import { comunityFormRenderer } from "../renders/comunityFormRenderer.js";

function samplesFRM() {
    loadComunities();
    const form = document.getElementById('communityForm');
    form.addEventListener('submit', handleSubmit);
}

// Cargar comunidades autónomas desde la API
function loadComunities() {
    const container = document.getElementById('communityForm');
    const before = document.getElementById('before-comunities');

    fetch('/api/v1/education-data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            try {
                const communities = [...new Set(data.map(item => item.autonomous_community))];
                container.insertBefore(comunityFormRenderer.asSelect(communities), before);
            } catch (error) {
                console.error("Error al procesar las comunidades", error);
            }
        })
        .catch(error => {
            console.error("Error al cargar las comunidades desde la API", error);
        });
}

// Manejar el envío del formulario
async function handleSubmit(event) {
    event.preventDefault();
    const resultsContainer = document.getElementById('results');
    const selectedCommunity = document.getElementById('community').value;

    if (!selectedCommunity) {
        resultsContainer.innerHTML = `<p>Por favor, selecciona una comunidad autónoma</p>`;
        return;
    }

    try {
        const response = await fetch('/api/v1/education-data?autonomous_community=' + encodeURIComponent(selectedCommunity), {
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
        const basicAvg = (data.reduce((sum, entry) => sum + entry.basic_fp, 0) / data.length).toFixed(2);
        const middleAvg = (data.reduce((sum, entry) => sum + entry.middle_grade, 0) / data.length).toFixed(2);
        const higherAvg = (data.reduce((sum, entry) => sum + entry.higher_grade, 0) / data.length).toFixed(2);

        resultsContainer.innerHTML = `
            <h3>Resultados para: ${selectedCommunity}</h3>
            <ul>
                <li><strong>Promedio de Formación Básica:</strong> ${basicAvg}%</li>
                <li><strong>Promedio de Grado Medio:</strong> ${middleAvg}%</li>
                <li><strong>Promedio de Grado Superior:</strong> ${higherAvg}%</li>
            </ul>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p>Error al obtener los datos</p>`;
    }
}

document.addEventListener('DOMContentLoaded', samplesFRM);