import { j as json } from './index2-BIAFQWR9.js';

const API_KEY = "6c9141ca1a96465691c20e4a91f33005";
const categories = ["technology", "business", "sports", "health", "entertainment"];
async function GET() {
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
      results.push({ category, articles: data.articles });
    } catch (err) {
      console.error(`Error con la categoría ${category}:`, err);
    }
  }
  return json(results);
}

export { GET };
//# sourceMappingURL=_server-CDTUelUw.js.map
