import { j as json } from './index2-BIAFQWR9.js';

async function GET() {
  const url = "http://api.open-notify.org/astros.json";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error al obtener datos desde Open Notify");
    }
    const data = await res.json();
    return json(data);
  } catch (error) {
    console.error("Error al obtener datos de Open Notify:", error);
    return json({ error: "No se pudieron obtener los datos" }, { status: 500 });
  }
}

export { GET };
//# sourceMappingURL=_server-4L0jmJkq.js.map
