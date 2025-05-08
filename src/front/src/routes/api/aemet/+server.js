import { json } from '@sveltejs/kit';

const endpoint = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/41091';
const AEMET_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmcmFucm9tYXIyMDAyQGdtYWlsLmNvbSIsImp0aSI6IjBmMzRlYTY3LTBjYTItNDkxOC1hYjMwLTZiZTY2MDYzMWJlYyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzQ2NzA3NDYwLCJ1c2VySWQiOiIwZjM0ZWE2Ny0wY2EyLTQ5MTgtYWIzMC02YmU2NjA2MzFiZWMiLCJyb2xlIjoiIn0.bvWaWrzVBpnrGKDRuoXPT0ctddHdcDMA4fVaPw-jcUM';

export async function GET() {
	try {
		const res = await fetch(endpoint, {
			headers: {
				Accept: 'application/json',
				api_key: AEMET_API_KEY
			}
		});

		const data = await res.json();

		if (data.estado === 200) {
			const realRes = await fetch(data.datos);
			const prediccion = await realRes.json();
			return json(prediccion);
		} else {
			return json({ error: 'Error en la API de AEMET' }, { status: 500 });
		}
	} catch (err) {
		console.error('Error al conectar con AEMET:', err);
		return json({ error: 'Error interno' }, { status: 500 });
	}
}
