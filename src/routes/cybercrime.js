const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataFilePath = path.join(__dirname, "../json/data-pdg.json");
const initialData = require("../json/initial-pdg-data.json");

//GET: Obtener datos con filtros de comunidad autónoma y año
router.get("/cybercrime-data", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos");
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        let PDGData = JSON.parse(data);
        const { autonomous_community, year, from, to } = req.query;

        if (autonomous_community) {
            PDGData = PDGData.filter(entry => entry.autonomous_community.toLowerCase() === autonomous_community.toLowerCase());
        }

        if (year) {
            PDGData = PDGData.filter(entry => entry.year == year);
        }

        if (from && to) {
            PDGData = PDGData.filter(entry => entry.year >= from && entry.year <= to);
        }

        res.status(200).json(PDGData);
    });
});

//GET: Cargar datos iniciales
router.get("/cybercrime-data/loadInitialData", (req, res) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        let PDGData = [];

        if (!err) {
            try {
                PDGData = JSON.parse(data);
                if (PDGData.length > 0) {
                    return res.status(200).json({ message: "Los datos ya estaban inicializados", data: PDGData });
                }
            } catch (parseError) {
                console.error("Error parseando JSON, inicializando array vacío.");
            }
        }

        fs.writeFile(dataFilePath, JSON.stringify(initialData, null, 2), (err) => {
            if (err) {
                console.error("Error guardando datos iniciales", err);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
            res.status(201).json({ message: "Datos inicializados correctamente", data: initialData });
        });
    });
});

//POST: Agregar un nuevo registro
router.post("/cybercrime-data", (req, res) => {
    console.log("[POST] Solicitud recibida para agregar un nuevo registro");
    const newEntry = req.body;

    if (!newEntry.autonomous_community || !newEntry.year || newEntry.criminal_ofense === undefined || newEntry.cybersecurity === undefined || newEntry.arrested_investigated === undefined) {
        return res.status(400).json({ error: "Faltan campos requeridos en el cuerpo de la solicitud" });
    }

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        let PDGData = [];

        if (!err) {
            try {
                PDGData = JSON.parse(data);
            } catch (parseError) {
                console.error("Error parseando JSON", parseError);
                return res.status(400).json({ error: "Error en el formato del archivo de datos" });
            }
        }

        PDGData.push(newEntry);

        fs.writeFile(dataFilePath, JSON.stringify(PDGData, null, 2), (err) => {
            if (err) {
                console.error("Error guardando el nuevo dato", err);
                return res.status(400).json({ error: "Error interno del servidor" });
            }
            res.status(201).json({ message: "Nuevo registro agregado correctamente", data: newEntry });
        });
    });
});

//GET: Obtener un dato específico (por comunidad autónoma y año)
router.get("/cybercrime-data/:autonomous_community/:year", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos");
    const { autonomous_community, year } = req.params;

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        const PDGData = JSON.parse(data);
        const entry = PDGData.find(entry => 
            entry.autonomous_community.toLowerCase() === autonomous_community.toLowerCase() &&
            entry.year == year
        );

        if (!entry) {
            return res.status(404).json({ error: "Dato no encontrado" });
        }

        res.status(200).json(entry);
    });
});

//PUT: Actualizar un dato específico
router.put("/cybercrime-data/:autonomous_community/:year", (req, res) => {
    console.log("[PUT] Solicitud recibida para obtener datos");
    const { autonomous_community, year } = req.params;
    const updatedEntry = req.body;

    if (!updatedEntry.autonomous_community || !updatedEntry.year || updatedEntry.criminal_ofense === undefined || updatedEntry.cybersecurity === undefined || updatedEntry.arrested_investigated === undefined) {
        return res.status(400).json({ error: "Faltan campos requeridos en el cuerpo de la solicitud" });
    }

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        let PDGData = JSON.parse(data);
        const index = PDGData.findIndex(entry => 
            entry.autonomous_community.toLowerCase() === autonomous_community.toLowerCase() &&
            entry.year == year
        );

        if (index === -1) {
            return res.status(404).json({ error: "Dato no encontrado" });
        }

        PDGData[index] = updatedEntry;

        fs.writeFile(dataFilePath, JSON.stringify(PDGData, null, 2), (err) => {
            if (err) {
                console.error("Error al actualizar el dato", err);
                return res.status(400).json({ error: "Error interno del servidor" });
            }
            res.status(200).json({ message: "Dato actualizado correctamente" });
        });
    });
});

//DELETE: Eliminar un dato específico
router.delete("/cybercrime-data/:autonomous_community/:year", (req, res) => {
    console.log("[DELETE] Solicitud recibida para obtener datos");
    const { autonomous_community, year } = req.params;

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        let PDGData = JSON.parse(data);
        const newData = PDGData.filter(entry => 
            !(entry.autonomous_community.toLowerCase() === autonomous_community.toLowerCase() && entry.year == year)
        );

        if (newData.length === PDGData.length) {
            return res.status(404).json({ error: "Dato no encontrado" });
        }

        fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), (err) => {
            if (err) {
                console.error("Error al eliminar el dato", err);
                return res.status(400).json({ error: "Error interno del servidor" });
            }
            res.status(200).json({ message: "Dato eliminado correctamente" });
        });
    });
});

//Manejo de métodos no permitidos
router.all("/cybercrime-data", (req, res) => {
    if (!["GET", "POST", "DELETE"].includes(req.method)) {
        return res.status(405).json({ error: "Método no permitido" });
    }
});

module.exports = router;
