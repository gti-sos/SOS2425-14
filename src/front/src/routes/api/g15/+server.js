import { json } from '@sveltejs/kit';

export async function GET() {
	const res = await fetch('https://sos2425-15.onrender.com/api/v1/ocupied-grand-stats');
	const data = await res.json();
	return json(data);
}