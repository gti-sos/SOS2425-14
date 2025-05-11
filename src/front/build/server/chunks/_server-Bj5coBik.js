import { j as json } from './index2-BIAFQWR9.js';

async function GET() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error al obtener datos desde JSONPlaceholder");
    }
    const data = await res.json();
    return json(data);
  } catch (error) {
    console.error("Error al obtener los datos de JSONPlaceholder:", error);
    return json({ error: "No se pudieron obtener los datos" }, { status: 500 });
  }
}

export { GET };
//# sourceMappingURL=_server-Bj5coBik.js.map
