import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import cors from "cors";
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
app.use(cors());

// Cargar los módulos backend
loadBackendJDP(app);
loadBackendPDG(app);
loadBackendFRM(app);

// Rutas estáticas
app.use(handler);

// Inicio servidor
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});