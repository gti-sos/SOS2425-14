import express from "express";
import path from "path";

// Importar los módulos backend
import { loadBackendJDP } from "./src/back/employment.js";
import { loadBackendPDG } from "./src/back/cybercrime.js";
import { loadBackendFRM } from "./src/back/education.js";

const app = express();
const PORT = process.env.PORT || 16078;

// Middlewares
app.use(express.json());

// Rutas estáticas
app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname)));

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