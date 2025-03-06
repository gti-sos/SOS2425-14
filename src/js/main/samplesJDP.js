//use strict;

import { comunityFormRenderer } from "../renders/comunityFormRenderer.js";

function samplesJDP(){
    loadComunities();
    const form = document.getElementById('communityForm');
    form.addEventListener('submit', handleSubmit);
}

function loadComunities(){
    const container = document.getElementById('communityForm');
    const before = document.getElementById('before-comunities');
    fetch('/src/json/data-jdp.json')
        .then(response => response.json())
        .then(data => {
            try {
                const communities = [...new Set(data.map(item => item.autonomous_community))];
                container.insertBefore(comunityFormRenderer.asSelect(communities), before);
            } catch (error) {
                console.error("Error al cargar las comunidades", error);
            }
        })
}

async function handleSubmit(event) {
    const resultsContainer = document.getElementById('results');
    
    event.preventDefault();
    const selectedCommunity = document.getElementById('community').value;

    try {
        const response = await fetch('/api/JDP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ community: selectedCommunity }),
        });

        const data = await response.json();
        const resultsContainer = document.getElementById('results');
        
        resultsContainer.innerHTML = `
            <h3>Results for: ${data.autonomous_community}</h3>
            <ul>
                <li><strong>Activity rate:</strong> ${data.activity_rate_avg}%</li>
                <li><strong>Employment rate</strong>: ${data.employment_rate_avg}%</li>
                <li><strong>Unemployment rate</strong>: ${data.unemployment_rate_avg}%</li>
            </ul>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p>Error al obtener los datos</p>`;
    }
}

document.addEventListener('DOMContentLoaded', samplesJDP);