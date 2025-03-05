document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('communityForm');
    const resultsContainer = document.getElementById('results');

    form.addEventListener('submit', async (event) => {
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
            
            resultsContainer.innerHTML = `
                <h3>Resultados para ${data.autonomous_community}</h3>
                <p>Tasa de Actividad: ${data.activity_rate_avg}%</p>
                <p>Tasa de Empleo: ${data.employment_rate_avg}%</p>
                <p>Tasa de Desempleo: ${data.unemployment_rate_avg}%</p>
            `;
        } catch (error) {
            console.error('Error:', error);
            resultsContainer.innerHTML = `<p>Error al obtener los datos</p>`;
        }
    });
});