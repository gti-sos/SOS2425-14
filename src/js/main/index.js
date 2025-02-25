const express = require("express");
const cool = require("cool-ascii-faces");
const app = express();
const path = require("path");
const PORT =  16078;

// Servir archivos estáticos desde el directorio 'src'
app.use(express.static(path.join(__dirname, '../../../')));

// Ruta raíz para servir about.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../../../', 'about.html'));
});

app.get("/cool", (request, response )=>{
    response.send(cool());
});

app.get("/hello", (request, response )=>{
    response.send("Hello from server");
});

app.listen(PORT, ()=>{
    console.log(`Server running! on port ${PORT}`);
});
