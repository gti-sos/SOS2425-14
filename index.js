const express = require("express");
const app = express();
const path = require("path");


const PORT =  process.env.PORT || 16078;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos de múltiples directorios

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));


//APIS

const BASE_API = "/api/v1";

const educationRoutes = require("./src/back/education");
app.use(BASE_API, educationRoutes);

const employmentRoutes = require("./src/back/employment");
app.use(BASE_API, employmentRoutes);

const cybercrimeRoutes = require("./src/back/cybercrime");
app.use(BASE_API, cybercrimeRoutes);


// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));


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