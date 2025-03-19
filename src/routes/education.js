const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataFilePath = path.join(__dirname, "../json/data-frm.json");
const initialData = require("../json/initial-frm-data.json");

//GET: Obtener datos con filtros de comunidad autónoma y año
router.get("/education-data", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos");
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        let FRMData = JSON.parse(data);
        const { autonomous_community, year, from, to } = req.query;

        if (autonomous_community) {
            FRMData = FRMData.filter(entry => entry.autonomous_community.toLowerCase() === autonomous_community.toLowerCase());
        }

        if (year) {
            FRMData = FRMData.filter(entry => entry.year == year);
        }

        if (from && to) {
            FRMData = FRMData.filter(entry => entry.year >= from && entry.year <= to);
        }
        console.log("[GET] Datos devueltos");
        res.status(200).json(FRMData);
    });
});

//GET: Cargar datos iniciales
router.get("/education-data/loadInitialData", (req, res) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        let FRMData = [];

        if (!err) {
            try {
                FRMData = JSON.parse(data);
                if (FRMData.length > 0) {
                    return res.status(200).json({ message: "Los datos ya estaban inicializados", data: FRMData });
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

// GET: Obtener datos de una comunidad autónoma en un rango de años
router.get("/education-data/:autonomous_community", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos de una comunidad autónoma en un rango de años");
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        let FRMData = JSON.parse(data);
        const { from, to } = req.query;
        const autonomousCommunity = req.params.autonomous_community;

        if (!from || !to) {
            return res.status(400).json({ error: "Debe proporcionar un rango de años con 'from' y 'to'" });
        }

        FRMData = FRMData.filter(entry =>
            entry.autonomous_community.toLowerCase() === autonomousCommunity.toLowerCase() &&
            entry.year >= from && entry.year <= to
        );

        console.log("[GET] Datos devueltos para", autonomousCommunity);
        res.status(200).json(FRMData);
    });
});

//POST: Agregar un nuevo registro
router.post("/education-data", (req, res) => {
    console.log("[POST] Solicitud recibida para agregar un nuevo registro");
    const newEntry = req.body;

    if (!newEntry.autonomous_community || !newEntry.year || newEntry.basic_fp === undefined || newEntry.middle_grade === undefined || newEntry.higher_grade === undefined) {
        return res.status(400).json({ error: "Faltan campos requeridos en el cuerpo de la solicitud" });
    }

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        let FRMData = [];

        if (!err) {
            try {
                FRMData = JSON.parse(data);
            } catch (parseError) {
                console.error("Error parseando JSON", parseError);
                return res.status(400).json({ error: "Error en el formato del archivo de datos" });
            }
        }

        FRMData.push(newEntry);

        fs.writeFile(dataFilePath, JSON.stringify(FRMData, null, 2), (err) => {
            if (err) {
                console.error("Error guardando el nuevo dato", err);
                return res.status(400).json({ error: "Error interno del servidor" });
            }
            res.status(201).json({ message: "Nuevo registro agregado correctamente", data: newEntry });
        });
    });
});

//GET: Obtener un dato específico (por comunidad autónoma y año)
router.get("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos");
    const { autonomous_community, year } = req.params;

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        const FRMData = JSON.parse(data);
        const entry = FRMData.find(entry => 
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
router.put("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[PUT] Solicitud recibida para obtener datos");
    const { autonomous_community, year } = req.params;
    const updatedEntry = req.body;

    if (!updatedEntry.autonomous_community || !updatedEntry.year || updatedEntry.basic_fp === undefined || updatedEntry.middle_grade === undefined || updatedEntry.higher_grade === undefined) {
        return res.status(400).json({ error: "Faltan campos requeridos en el cuerpo de la solicitud" });
    }

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        let FRMData = JSON.parse(data);
        const index = FRMData.findIndex(entry => 
            entry.autonomous_community.toLowerCase() === autonomous_community.toLowerCase() &&
            entry.year == year
        );

        if (index === -1) {
            return res.status(404).json({ error: "Dato no encontrado" });
        }

        FRMData[index] = updatedEntry;

        fs.writeFile(dataFilePath, JSON.stringify(FRMData, null, 2), (err) => {
            if (err) {
                console.error("Error al actualizar el dato", err);
                return res.status(400).json({ error: "Error interno del servidor" });
            }
            res.status(200).json({ message: "Dato actualizado correctamente" });
        });
    });
});

//DELETE: Eliminar un dato específico
router.delete("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[DELETE] Solicitud recibida para obtener datos");
    const { autonomous_community, year } = req.params;

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        let FRMData = JSON.parse(data);
        const newData = FRMData.filter(entry => 
            !(entry.autonomous_community.toLowerCase() === autonomous_community.toLowerCase() && entry.year == year)
        );

        if (newData.length === FRMData.length) {
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
router.all("/education-data", (req, res) => {
    if (!["GET", "POST", "DELETE"].includes(req.method)) {
        return res.status(405).json({ error: "Método no permitido" });
    }
});

module.exports = router;