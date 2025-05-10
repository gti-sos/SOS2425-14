import { j as json } from './index2-BIAFQWR9.js';

async function GET() {
  const res = await fetch("https://sos2425-15.onrender.com/api/v1/precipitation-stats");
  const data = await res.json();
  return json(data);
}

export { GET };
//# sourceMappingURL=_server-D3YymV2S.js.map
