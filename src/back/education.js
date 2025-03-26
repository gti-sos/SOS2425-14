const express = require("express");
const Datastore = require("nedb");
const path = require("path");

const router = express.Router();
const db = new Datastore();
const initialData = require("../json/initial-frm-data.json");

// Carga automática de datos iniciales al iniciar la API
db.count({}, (err, count) => {
    if (err) {
        console.error("Error al contar registros en NeDB", err);
        return;
    }
    if (count === 0) {
        db.insert(initialData, (err, newDocs) => {
            if (err) console.error("Error al insertar datos iniciales en NeDB", err);
            else console.log(`Se han insertado ${newDocs.length} registros iniciales en memoria.`);
        });
    } else {
        console.log(`La base de datos ya tiene ${count} registros.`);
    }
});

// GET: Obtener datos con filtros de comunidad autónoma y año
router.get("/education-data", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos");

    const query = {};
    const { autonomous_community, year, from, to } = req.query;

    if (autonomous_community) query.autonomous_community = new RegExp(`^${autonomous_community}$`, "i");
    if (year) query.year = parseInt(year);
    if (from && to) query.year = { $gte: parseInt(from), $lte: parseInt(to) };

    db.find(query, (err, docs) => {
        if (err) {
            console.error("Error en la consulta a NeDB", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        console.log("[GET] Datos devueltos");
        res.status(200).json(docs);
    });
});

// GET: Cargar datos iniciales
router.get("/education-data/loadInitialData", (req, res) => {
    console.log("[GET] Solicitud recibida para cargar datos iniciales");

    db.count({}, (err, count) => {
        if (err) {
            console.error("[GET] Error al verificar datos existentes", err);
            return res.status(500).json({ error: "Error al verificar datos existentes" });
        }

        if (count > 0) {
            db.find({}, (err, docs) => {
                if (err) {
                    console.error("[GET] Error al obtener datos existentes", err);
                    return res.status(500).json({ error: "Error al obtener datos" });
                }
                console.log("[GET] Datos ya estaban inicializados. Total:", docs.length);
                res.status(200).json({ message: "Los datos ya estaban inicializados", data: docs });
            });
        } else {
            db.insert(initialData, (err, newDocs) => {
                if (err) {
                    console.error("[GET] Error al insertar datos iniciales", err);
                    return res.status(500).json({ error: "Error al insertar datos" });
                }
                console.log(`[GET] Datos inicializados correctamente con ${newDocs.length} registros`);
                res.status(201).json({ message: "Datos inicializados correctamente", data: newDocs });
            });
        }
    });
});

// GET: Obtener datos de una comunidad autónoma en un rango de años
router.get("/education-data/:autonomous_community", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos de una comunidad autónoma en un rango de años");
    const { from, to } = req.query;
    const autonomousCommunity = req.params.autonomous_community;

    if (!from || !to) {
        return res.status(400).json({ error: "Debe proporcionar un rango de años con 'from' y 'to'" });
    }

    db.find({
        autonomous_community: new RegExp(`^${autonomousCommunity}$`, "i"),
        year: { $gte: parseInt(from), $lte: parseInt(to) }
    }, (err, docs) => {
        if (err) return res.status(500).json({ error: "Error en la base de datos" });
        console.log("[GET] Datos devueltos");
        res.status(200).json(docs);
    });
});

// Rechazar POST si vienen query parameters
router.post("/education-data", (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        console.log("[POST] Error: Parámetros de consulta no permitidos en esta ruta");
        return res.status(405).json({ error: "Método no permitido en esta URL con parámetros. Use PUT o GET." });
    }
    next();
});

// POST: Agregar un nuevo registro
router.post("/education-data", (req, res) => {
    console.log("[POST] Solicitud recibida para agregar un nuevo registro");
    const newEntry = req.body;

    if (!newEntry.autonomous_community || !newEntry.year ||
        newEntry.basic_fp === undefined || newEntry.middle_grade === undefined || newEntry.higher_grade === undefined) {
        console.log("[POST] Error: Faltan campos requeridos en el cuerpo de la solicitud");
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    db.findOne({
        autonomous_community: new RegExp(`^${newEntry.autonomous_community}$`, "i"),
        year: parseInt(newEntry.year)
    }, (err, doc) => {
        if (err) {
            console.error("[POST] Error al consultar la base de datos", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (doc) {
            console.log(`[POST] Error: Ya existe el registro para ${newEntry.autonomous_community}, ${newEntry.year}`);
            return res.status(409).json({ error: "El recurso ya existe" });
        }

        db.insert(newEntry, (err, inserted) => {
            if (err) {
                console.error("[POST] Error al insertar el nuevo dato", err);
                return res.status(500).json({ error: "Error al insertar el nuevo dato" });
            }
            console.log("[POST] Registro agregado correctamente:", inserted);
            res.status(201).json({ message: "Registro agregado correctamente", data: inserted });
        });
    });
});

// POST no permitido a recurso específico
router.post("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[POST] Error: No se permite POST en recurso específico");
    res.status(405).json({ error: "Método no permitido en un recurso específico. Use PUT para actualizar" });
});

// GET: Obtener un dato específico (por comunidad autónoma y año)
router.get("/education-data/:autonomous_community/:year", (req, res) => {
    console.log(`[GET] Solicitud recibida para obtener dato específico: ${req.params.autonomous_community}, ${req.params.year}`);
    const { autonomous_community, year } = req.params;

    db.findOne({
        autonomous_community: new RegExp(`^${autonomous_community}$`, "i"),
        year: parseInt(year)
    }, (err, doc) => {
        if (err) {
            console.error("[GET] Error al consultar la base de datos", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (!doc) {
            console.log("[GET] Dato no encontrado");
            return res.status(404).json({ error: "Dato no encontrado" });
        }

        console.log("[GET] Dato encontrado:", doc);
        res.status(200).json(doc);
    });
});

// PUT: Actualizar un dato específico
router.put("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[PUT] Solicitud recibida para actualizar un dato");
    const { autonomous_community, year } = req.params;
    const updatedEntry = req.body;
    const yearNum = parseInt(year);

    if (!updatedEntry.autonomous_community || !updatedEntry.year ||
        updatedEntry.basic_fp === undefined || updatedEntry.middle_grade === undefined || updatedEntry.higher_grade === undefined) {
            console.log("[PUT] Error: Faltan campos requeridos en el cuerpo de la solicitud");
            return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    if (updatedEntry.autonomous_community.toLowerCase().trim() !== autonomous_community.toLowerCase().trim() ||
        updatedEntry.year !== yearNum) {
            console.log("[PUT] Error: Los identificadores en la URL y el cuerpo de la solicitud no coinciden");
            return res.status(400).json({ error: "Los identificadores no coinciden" });
    }

    if (isNaN(updatedEntry.basic_fp) || isNaN(updatedEntry.middle_grade) || isNaN(updatedEntry.higher_grade)) {
        console.log("[PUT] Error: Los valores de formación deben ser números");
        return res.status(400).json({ error: "Los valores deben ser numéricos" });
    }

    db.update({
        autonomous_community: new RegExp(`^${autonomous_community}$`, "i"),
        year: yearNum
    }, updatedEntry, {}, (err, numReplaced) => {
        if (err) return res.status(500).json({ error: "Error al actualizar el dato" });
        if (numReplaced === 0) return res.status(404).json({ error: "Dato no encontrado" });
        console.log("[PUT] Dato actualizado correctamente", updatedEntry);
        res.status(200).json({ message: "Dato actualizado correctamente" });
    });
});


// DELETE: Eliminar todos los datos
router.delete("/education-data", (req, res) => {
    console.log("[DELETE] Solicitud recibida para eliminar todos los datos");

    db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            console.error("[DELETE] Error al eliminar todos los datos", err);
            return res.status(500).json({ error: "Error al eliminar datos" });
        }
        console.log(`[DELETE] Todos los datos han sido eliminados. Total eliminados: ${numRemoved}`);
        res.status(200).json({ message: "Todos los datos han sido eliminados correctamente" });
    });
});

// DELETE: Eliminar un dato específico
router.delete("/education-data/:autonomous_community/:year", (req, res) => {
    console.log(`[DELETE] Solicitud recibida para eliminar dato: ${req.params.autonomous_community}, ${req.params.year}`);
    const { autonomous_community, year } = req.params;

    db.remove({
        autonomous_community: new RegExp(`^${autonomous_community}$`, "i"),
        year: parseInt(year)
    }, {}, (err, numRemoved) => {
        if (err) {
            console.error("[DELETE] Error al eliminar el dato", err);
            return res.status(500).json({ error: "Error al eliminar el dato" });
        }
        if (numRemoved === 0) {
            console.log("[DELETE] Dato no encontrado");
            return res.status(404).json({ error: "Dato no encontrado" });
        }

        console.log("[DELETE] Dato eliminado correctamente");
        res.status(200).json({ message: "Dato eliminado correctamente" });
    });
});

//Manejo de métodos no permitidos
router.all("/education-data", (req, res) => {
    if (!["GET", "POST", "DELETE"].includes(req.method)) {
        return res.status(405).json({   error: "Método no permitido" });
    }
});

module.exports = router;