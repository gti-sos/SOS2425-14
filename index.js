const express = require("express");
const cool = require("cool-ascii-faces");
const app = express();
const path = require("path");
const PORT =  process.env.PORT || 16078;


const getJDPData = require("./src/js/functions/index-JDP.js");
const getFRMData = require("./src/js/functions/index-FRM.js");

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
    console.log("Accediendo a /samples/JDP");
    const result = getJDPData(); // Ejecuta el script
    response.json(result); // Envía el resultado como respuesta
});

app.get("/samples/FRM", (request, response )=>{
    console.log("Accediendo a /samples/FRM");
    const result = getFRMData(); // Ejecuta el script
    response.json(result); // Envía el resultado como respuesta
});

app.get("/hello", (request, response )=>{
    response.send("Hello from server");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});