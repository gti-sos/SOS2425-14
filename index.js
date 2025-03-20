const express = require("express");
const cool = require("cool-ascii-faces");
const app = express();
const path = require("path");
const fs = require('fs');

const PORT =  process.env.PORT || 16078;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos de múltiples directorios
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

const getFRMData = require("./src/js/functions/index-FRM.js");
const getPDGData = require("./src/js/functions/index-PDG.js");

//APIS
const BASE_API = "/api/v1";

const educationRoutes = require("./src/routes/education");
app.use(BASE_API, educationRoutes);

const employmentRoutes = require("./src/routes/employment");
app.use(BASE_API, employmentRoutes);

const cybercrimeRoutes = require("./src/routes/cybercrime");
app.use(BASE_API, cybercrimeRoutes);


// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

/****************************************************
 * Rutas iniciales
 ****************************************************/

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'about.html'));
});

app.get("/about", (request, response) => {
    response.sendFile(path.join(__dirname, 'about.html'));
});

app.get("/cool", (request, response )=>{
    response.send(cool());
});

app.get("/hello", (request, response )=>{
    response.send("Hello from server");
});

/****************************************************
 * Rutas de Jaime
 ****************************************************/

app.get("/samples/JDP", (request, response )=>{
    response.sendFile(path.join(__dirname, 'samplesJDP.html'));
});



/****************************************************
 * Rutas de Fran
 ****************************************************/

app.get("/samples/FRM", (request, response )=>{
    response.sendFile(path.join(__dirname, 'samplesFRM.html'));
});

app.get("/api/FRM", (req, res) => {
    const { community } = req.query;

    if (!community) {
        return res.status(400).json({ error: "Se requiere el parámetro 'community'" });
    }

    fetch(`https://sos2425-14.onrender.com/api/v1/education-data?autonomous_community=${encodeURIComponent(community)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).json({ error: "No se encontraron datos para la comunidad especificada" });
            }

            res.json(data);
        })
        .catch(error => {
            console.error("Error obteniendo datos de la API", error);
            res.status(500).json({ error: "Error interno del servidor" });
        });
});

/****************************************************
 * Rutas de Pablo
 ****************************************************/

app.get("/samples/PDG", (request, response )=>{
    response.sendFile(path.join(__dirname, 'samplesPDG.html'));
});

// Cambiar a método POST y recibir el parámetro de comunidad
app.post("/api/PDG", (request, response) => {
    const { community } = request.body;
    if (!community) {
        return response.status(400).json({ error: "Se requiere el parámetro 'community'" });
    }
    const data = getPDGData(community);
    response.json(data);
});

/****************************************************
 * Inicio del servidor http
 ****************************************************/

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});