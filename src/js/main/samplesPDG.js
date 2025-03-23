import { comunityFormRenderer } from "../renders/comunityFormRenderer.js";

function samplesPDG() {
    loadCommunities();
    const form = document.getElementById('communityForm');
    form.addEventListener('submit', handleSubmit);
}

// Cargar comunidades autónomas desde la API
function loadCommunities() {
    const container = document.getElementById('communityForm');
    const before = document.getElementById('before-communities');

    fetch('/api/v1/cybercrime-data')
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
        const response = await fetch(`/api/v1/cybercrime-data?autonomous_community=${encodeURIComponent(selectedCommunity)}`, {
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
        const criminalAvg = (data.reduce((sum, entry) => sum + entry.criminal_ofense, 0) / data.length).toFixed(2);
        const cybersecurityAvg = (data.reduce((sum, entry) => sum + entry.cybersecurity, 0) / data.length).toFixed(2);
        const arrestedAvg = (data.reduce((sum, entry) => sum + entry.arrested_investigated, 0) / data.length).toFixed(2);

        resultsContainer.innerHTML = `
            <h3>Resultados para: ${selectedCommunity}</h3>
            <ul>
                <li><strong>Promedio de Delitos:</strong> ${criminalAvg}</li>
                <li><strong>Promedio de Ciberseguridad:</strong> ${cybersecurityAvg}</li>
                <li><strong>Promedio de Detenidos/Investigados:</strong> ${arrestedAvg}</li>
            </ul>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p>Error al obtener los datos</p>`;
    }
}


document.addEventListener('DOMContentLoaded', samplesPDG);
