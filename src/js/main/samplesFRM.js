//use strict;

import { comunityFormRenderer } from "../renders/comunityFormRenderer.js";

function samplesFRM(){
    loadComunities();
    const form = document.getElementById('communityForm');
    form.addEventListener('submit', handleSubmit);
}

function loadComunities(){
    const container = document.getElementById('communityForm');
    const before = document.getElementById('before-comunities');
    fetch('/src/json/data-frm.json')
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
        const response = await fetch('/api/FRM', {
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
                <li><strong>Average rate for basic training:</strong> ${data.basic_training}%</li>
                <li><strong>Average rate for intermediate level</strong>: ${data.middle_grade}%</li>
                <li><strong>Average rate for higher level</strong>: ${data.higher_grade}%</li>
            </ul>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p>Error al obtener los datos</p>`;
    }
}

document.addEventListener('DOMContentLoaded', samplesFRM);