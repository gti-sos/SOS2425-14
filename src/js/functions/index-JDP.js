
const API_URL = window.location.origin;

async function getJDPData(ccaa) {
    try {
        const response = await fetch(`${API_URL}/api/v1/employment-data?autonomous_community=${encodeURIComponent(ccaa)}&education_level=TOTAL`);
        const data = await response.json();

        if (data.length === 0) {
            throw new Error("No se encontraron datos para la comunidad especificada");
        }

        const getAvg = (field) => {
            const values = data.map(item => item[field]);
            const sum = values.reduce((acc, valor) => acc + valor, 0);
            return values.length > 0 ? (sum / values.length).toFixed(2) : "0.00";
        };

        return {
            autonomous_community: ccaa,
            activity_rate_avg: getAvg("activity_rate"),
            employment_rate_avg: getAvg("employment_rate"),
            unemployment_rate_avg: getAvg("unemployment_rate")
        };

    } catch (error) {
        console.error("Error obteniendo datos:", error);
        return { error: "No se pudieron obtener los datos" };
    }
}

export { getJDPData };
