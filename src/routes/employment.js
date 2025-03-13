const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataFilePath = path.join(__dirname, "../json/data-jdp.json");
const initialData = require("../json/initial-jdp-data.json");

router.get("/employment-data", (req, res) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        try {
            res.json(JSON.parse(data));
        } catch (parseError) {
            console.error("Error parseando JSON", parseError);
            res.status(500).json({ error: "Error en el formato de los datos almacenados" });
        }
    });
});

router.get("/employment-data/loadInitialData", (req, res) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        let JDPData = [];

        if (!err) {
            try {
                JDPData = JSON.parse(data);
                if (JDPData.length > 0) {
                    return res.status(200).json({ message: "Los datos ya estaban inicializados", data: JDPData });
                }
            } catch (parseError) {
                console.error("Error parseando JSON, inicializando array vacío.");
            }
        }

        // Guardar los datos iniciales directamente
        fs.writeFile(dataFilePath, JSON.stringify(initialData, null, 2), (err) => {
            if (err) {
                console.error("Error guardando datos iniciales", err);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
            res.status(201).json({ message: "Datos inicializados correctamente", data: initialData });
        });
    });
});

module.exports = router;