const express = require("express");
const cool = require("cool-ascii-faces");
const app = express();
const path = require("path");
const PORT =  process.env.PORT || 16078;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos de múltiples directorios
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

const getJDPData = require("./src/js/functions/index-JDP.js");
const getFRMData = require("./src/js/functions/index-FRM.js");
const getPDGData = require("./src/js/functions/index-PDG.js");


// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

// Ruta raíz para servir about.html
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'about.html'));
});

app.get("/about", (request, response) => {
    response.sendFile(path.join(__dirname, 'about.html'));
});

app.get("/cool", (request, response )=>{
    response.send(cool());
});

app.get("/samples/JDP", (request, response )=>{
    response.sendFile(path.join(__dirname, 'samplesJDP.html'));
});

// Cambiar a método POST y recibir el parámetro de comunidad
app.post("/api/JDP", (request, response) => {
    const { community } = request.body;
    const data = getJDPData(community);
    response.json(data);
});

app.get("/samples/FRM", (request, response )=>{
    response.sendFile(path.join(__dirname, 'samplesFRM.html'));
});

// Cambiar a método POST y recibir el parámetro de comunidad
app.post("/api/FRM", (request, response) => {
    const { community } = request.body;
    const data = getFRMData(community);
    response.json(data);
});

app.get("/samples/PDG", (request, response )=>{
    response.sendFile(path.join(__dirname, 'samplesPDG.html'));
});

// Cambiar a método POST y recibir el parámetro de comunidad
app.post("/api/PDG", (request, response) => {
    const { community } = request.body;
    const data = getPDGData(community);
    response.json(data);
});

app.get("/hello", (request, response )=>{
    response.send("Hello from server");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});