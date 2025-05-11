import { json } from '@sveltejs/kit';

export async function GET() {
    const url = 'https://jsonplaceholder.typicode.com/posts'; // URL de JSONPlaceholder

    try {
        const res = await fetch(url); // Realizamos la solicitud
        if (!res.ok) {
            throw new Error('Error al obtener datos desde JSONPlaceholder');
        }
        const data = await res.json(); // Convertimos la respuesta en JSON
        return json(data); // Enviamos los datos al frontend
    } catch (error) {
        console.error('Error al obtener los datos de JSONPlaceholder:', error);
        return json({ error: 'No se pudieron obtener los datos' }, { status: 500 });
    }
}
