import { json } from '@sveltejs/kit';

const NASA_API_URL = 'https://api.nasa.gov/planetary/apod?api_key=zHLP9F2ydxnSkBuSXHtfsGT1gePf2LIvaBApkYhB&count=10';

export async function GET() {
	try {
		const response = await fetch(NASA_API_URL);

		if (!response.ok) {
			return json({ error: 'Error al conectar con la API de NASA' }, { status: 500 });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Error en el proxy de NASA:', error);
		return json({ error: 'Fallo al recuperar datos de la NASA' }, { status: 500 });
	}
}
