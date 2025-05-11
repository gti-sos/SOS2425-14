import { json } from '@sveltejs/kit';

const API_KEY = '6c9141ca1a96465691c20e4a91f33005'; //API Key de NewsAPI
const categories = ['technology', 'business', 'sports', 'health', 'entertainment']; // Cambiar las categorías a las que quieras acceder

export async function GET() {
	const results = [];

	for (const category of categories) {
		try {
			const res = await fetch(
				`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`
			);

			if (!res.ok) {
				console.warn(`Error al obtener datos para la categoría ${category}: ${res.status}`);
				continue;
			}

			const data = await res.json();
			results.push({ category, articles: data.articles }); // Guardamos los artículos para cada categoría
		} catch (err) {
			console.error(`Error con la categoría ${category}:`, err);
		}
	}

	return json(results);
}
