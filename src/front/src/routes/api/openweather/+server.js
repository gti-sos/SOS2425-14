import { json } from '@sveltejs/kit';

const API_KEY = '55118ddd755b760e6675758a815cbb0d';
const cities = ['Sevilla', 'Madrid', 'Barcelona', 'Valencia', 'Bilbao'];

export async function GET() {
	const results = [];

	for (const city of cities) {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
			);

			if (!res.ok) {
				console.warn(`Error al obtener datos para ${city}: ${res.status}`);
				continue;
			}

			const data = await res.json();
			results.push(data);
		} catch (err) {
			console.error(`Error con la ciudad ${city}:`, err);
		}
	}

	return json(results);
}
