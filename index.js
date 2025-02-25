const express = require("express");
const cool = require("cool-ascii-faces");
const app = express();
const path = require("path");
const PORT =  process.env.PORT || 16078;

// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

// Ruta raíz para servir about.html
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'about.html'));
});

app.get("/cool", (request, response )=>{
    response.send(cool());
});

app.get("/hello", (request, response )=>{
    response.send("Hello from server");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
