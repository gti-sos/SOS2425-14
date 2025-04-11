import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import { handler } from './src/front/build/handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar los módulos backend
import { loadBackendJDP } from "./src/back/employment.js";
import { loadBackendPDG } from "./src/back/cybercrime.js";
import { loadBackendFRM } from "./src/back/education.js";

const app = express();
const PORT = process.env.PORT || 16078;

// Middlewares
app.use(express.json());

// Rutas estáticas
app.use(handler);

// Cargar los módulos backend
loadBackendJDP(app);
loadBackendPDG(app);
loadBackendFRM(app);

// Rutas iniciales
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/about", (request, response) => {
    response.sendFile(path.join(__dirname, 'about.html'));
});

// Inicio servidor
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});