import { json } from '@sveltejs/kit';

export async function GET() {
    const url = 'http://api.open-notify.org/astros.json';

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Error al obtener datos desde Open Notify');
        }
        const data = await res.json(); // Parseamos la respuesta en JSON
        return json(data); // Devolvemos los datos al cliente
    } catch (error) {
        console.error('Error al obtener datos de Open Notify:', error);
        return json({ error: 'No se pudieron obtener los datos' }, { status: 500 });
    }
}