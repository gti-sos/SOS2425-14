document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('communityForm');
    const resultsContainer = document.getElementById('results');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const selectedCommunity = document.getElementById('community').value;

        try {
            // Realizamos la solicitud POST
            const response = await fetch('/api/JDP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ community: selectedCommunity }), // Enviamos la comunidad seleccionada
            });

            const data = await response.json(); // Obtener la respuesta como JSON
            
            // Mostramos los resultados en la página web
            resultsContainer.innerHTML = `
                <h3>Resultados para ${data.autonomous_community}</h3>
                <p>Media de Delitos Criminales: ${data.criminal_offense}</p>
                <p>Media de Ciberseguridad: ${data.cybersecurity}</p>
                <p>Media de Detenidos/Investigados: ${data.arrested_investigated}</p>
            `;
        } catch (error) {
            console.error('Error:', error);
            resultsContainer.innerHTML = `<p>Error al obtener los datos</p>`;
        }
    });
});
