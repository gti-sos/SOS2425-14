const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataFilePath = path.join(__dirname, "../json/data-jdp.json");
const initialData = require("../json/initial-jdp-data.json");

router.get("/employment-data", (req, res) => {
    // Obtener parámetros de consulta
    const autonomousCommunity = req.query.autonomous_community;
    const year = req.query.year;
    const educationLevel = req.query.education_level;

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        try {
            console.log(`GET request to /employment-data with query params: ${JSON.stringify(req.query)}`);
            let jsonData = JSON.parse(data);
            
            // Aplicar filtros si existen
            if (autonomousCommunity) {
                jsonData = jsonData.filter(item => 
                    item.autonomous_community && 
                    item.autonomous_community.toLowerCase() === autonomousCommunity.toLowerCase()
                );
            }
            
            if (year) {
                // Convertir a número si year está como string
                const yearNum = parseInt(year);
                jsonData = jsonData.filter(item => item.year === yearNum);
            }
            
            if (educationLevel) {
                jsonData = jsonData.filter(item => 
                    item.education_level && 
                    item.education_level.toLowerCase() === educationLevel.toLowerCase()
                );
            }
            
            res.json(jsonData);
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