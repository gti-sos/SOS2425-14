const express = require("express");
const Datastore = require("nedb");
const path = require("path");

const router = express.Router();
const db = new Datastore();
const initialData = require("../json/data-frm.json");

// education-data.routes.js
// ----------------------------------------------------------
// RUTAS PARA GESTIÓN DE DATOS DE EDUCACIÓN PROFESIONAL EN NeDB
// ----------------------------------------------------------
// Métodos:
// - GET: Consultas con y sin filtros, carga inicial de datos.
// - POST: Inserción de nuevos registros y control de errores.
// - PUT: Actualización de registros existentes.
// - DELETE: Eliminación de registros individuales o totales.

// Inicializa la base de datos con datos por defecto si está vacía
// Esto se ejecuta automáticamente al arrancar el servidor

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

//Redirigir al docs de la API
router.get("/education-data/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/42127625/2sB2cShj72");
});

// ----------------------------------------------------------
// MÉTODOS GET
// ----------------------------------------------------------

// [GET] Devuelve todos los registros, con posibilidad de filtrar por comunidad, año o rango de años
router.get("/education-data", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos");
    const query = {};
    const { autonomous_community, year, from, to } = req.query;

    if (autonomous_community) query.autonomous_community = new RegExp(`^${autonomous_community}$`, "i");
    if (year) query.year = parseInt(year);
    if (from && to) query.year = { $gte: parseInt(from), $lte: parseInt(to) };

    db.find(query, (err, docs) => {
        if (err) return res.status(500).json({ error: "Error en la base de datos" });
        const cleanedDocs = docs.map(({ _id, ...rest }) => rest);
        res.status(200).json(cleanedDocs);
    });
});

// [GET] Carga los datos iniciales si la base está vacía o reinicia si ?reset=true
router.get("/education-data/loadInitialData", (req, res) => {
    console.log("[GET] Solicitud recibida para cargar datos iniciales");
    const reset = req.query.reset === "true";

    if (reset) {
        db.remove({}, { multi: true }, (err) => {
            if (err) return res.status(500).json({ error: "Error al eliminar datos existentes" });
            db.insert(initialData, (err, newDocs) => {
                if (err) return res.status(500).json({ error: "Error al insertar datos iniciales" });
                res.status(201).json({ message: "Datos reinicializados correctamente", data: newDocs.map(({ _id, ...rest }) => rest) });
            });
        });
    } else {
        db.count({}, (err, count) => {
            if (err) return res.status(500).json({ error: "Error al verificar datos existentes" });
            if (count > 0) {
                db.find({}, (err, docs) => {
                    if (err) return res.status(500).json({ error: "Error al obtener datos" });
                    res.status(200).json({ message: "Los datos ya estaban inicializados", data: docs.map(({ _id, ...rest }) => rest) });
                });
            } else {
                db.insert(initialData, (err, newDocs) => {
                    if (err) return res.status(500).json({ error: "Error al insertar datos" });
                    res.status(201).json({ message: "Datos inicializados correctamente", data: newDocs.map(({ _id, ...rest }) => rest) });
                });
            }
        });
    }
});

// [GET] Devuelve registros de una comunidad autónoma en un rango de años
router.get("/education-data/:autonomous_community", (req, res) => {
    console.log("[GET] Solicitud para datos filtrados por comunidad y rango de años");
    const { from, to } = req.query;
    const autonomousCommunity = req.params.autonomous_community;

    if (!from || !to) return res.status(400).json({ error: "Debe proporcionar 'from' y 'to'" });

    db.find({
        autonomous_community: new RegExp(`^${autonomousCommunity}$`, "i"),
        year: { $gte: parseInt(from), $lte: parseInt(to) }
    }, (err, docs) => {
        if (err) return res.status(500).json({ error: "Error en la base de datos" });
        const cleanedDocs = docs.map(({ _id, ...rest }) => rest);
        res.status(200).json(cleanedDocs);
    });
});

// [GET] Devuelve un único registro por comunidad y año
router.get("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[GET] Solicitud para obtener un dato específico");
    const { autonomous_community, year } = req.params;

    db.findOne({
        autonomous_community: new RegExp(`^${autonomous_community}$`, "i"),
        year: parseInt(year)
    }, (err, doc) => {
        if (err) return res.status(500).json({ error: "Error en la base de datos" });
        if (!doc) return res.status(404).json({ error: "Dato no encontrado" });
        const { _id, ...cleanDoc } = doc;
        res.status(200).json(cleanDoc);
    });
});

// ----------------------------------------------------------
// MÉTODOS POST
// ----------------------------------------------------------

// [POST] Rechaza solicitudes con parámetros en la URL (control de errores)
router.post("/education-data", (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        return res.status(405).json({ error: "Método no permitido con parámetros en la URL" });
    }
    next();
});

// [POST] Agrega un nuevo registro si no existe ya en la base de datos
router.post("/education-data", (req, res) => {
    console.log("[POST] Solicitud para agregar un nuevo registro");
    const newEntry = req.body;

    // Normalizar entradas
    if (typeof newEntry.autonomous_community === "string") {
        newEntry.autonomous_community = newEntry.autonomous_community.trim();
    }

    newEntry.year = parseInt(newEntry.year);
    const { basic_fp, middle_grade, higher_grade } = newEntry;

    // Validación de campos requeridos y tipo correcto
    if (!newEntry.autonomous_community || isNaN(newEntry.year) ||
        basic_fp === undefined || middle_grade === undefined || higher_grade === undefined) {
        return res.status(400).json({ error: "Faltan campos requeridos o tienen formato inválido" });
    }

    if (typeof basic_fp !== "number" || typeof middle_grade !== "number" || typeof higher_grade !== "number") {
        return res.status(400).json({ error: "Los valores de formación deben ser numéricos" });
    }

    // Comprobación de duplicado
    db.findOne({
        autonomous_community: new RegExp(`^${newEntry.autonomous_community}$`, "i"),
        year: newEntry.year
    }, (err, doc) => {
        if (err) return res.status(500).json({ error: "Error en la base de datos" });
        if (doc) return res.status(409).json({ error: "El recurso ya existe" });

        db.insert(newEntry, (err, inserted) => {
            if (err) return res.status(500).json({ error: "Error al insertar el nuevo dato" });
            const { _id, ...cleanData } = inserted;
            res.status(201).json({ message: "Registro agregado correctamente", data: cleanData });
        });
    });
});


// [POST] Ruta bloqueada para evitar POST en un recurso específico
router.post("/education-data/:autonomous_community/:year", (req, res) => {
    res.status(405).json({ error: "Método no permitido en un recurso específico. Use PUT." });
});

// ----------------------------------------------------------
// MÉTODO PUT
// ----------------------------------------------------------

// [PUT] Actualiza un dato específico por comunidad y año
router.put("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[PUT] Solicitud para actualizar un dato existente");
    const { autonomous_community, year } = req.params;
    const updatedEntry = req.body;
    const yearNum = parseInt(year);

    if (!updatedEntry.autonomous_community || !updatedEntry.year ||
        updatedEntry.basic_fp === undefined || updatedEntry.middle_grade === undefined || updatedEntry.higher_grade === undefined) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    if (updatedEntry.autonomous_community.toLowerCase().trim() !== autonomous_community.toLowerCase().trim() ||
        updatedEntry.year !== yearNum) {
        return res.status(400).json({ error: "Los identificadores no coinciden" });
    }

    if (isNaN(updatedEntry.basic_fp) || isNaN(updatedEntry.middle_grade) || isNaN(updatedEntry.higher_grade)) {
        return res.status(400).json({ error: "Los valores deben ser numéricos" });
    }

    db.update({
        autonomous_community: new RegExp(`^${autonomous_community}$`, "i"),
        year: yearNum
    }, updatedEntry, {}, (err, numReplaced) => {
        if (err) return res.status(500).json({ error: "Error al actualizar el dato" });
        if (numReplaced === 0) return res.status(404).json({ error: "Dato no encontrado" });
        res.status(200).json({ message: "Dato actualizado correctamente" });
    });
});

// ----------------------------------------------------------
// MÉTODOS DELETE
// ----------------------------------------------------------

// [DELETE] Elimina todos los registros (solo si no hay parámetros)
router.delete("/education-data", (req, res) => {
    console.log("[DELETE] Solicitud para eliminar todos los registros");

    if (Object.keys(req.query).length > 0) {
        return res.status(405).json({ error: "DELETE con parámetros no está permitido. Use un recurso específico." });
    }

    db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) return res.status(500).json({ error: "Error al eliminar datos" });
        res.status(200).json({ message: "Todos los datos han sido eliminados correctamente" });
    });
});


// [DELETE] Elimina un único registro por comunidad y año
router.delete("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[DELETE] Solicitud para eliminar un dato específico");
    const { autonomous_community, year } = req.params;

    db.remove({
        autonomous_community: new RegExp(`^${autonomous_community}$`, "i"),
        year: parseInt(year)
    }, {}, (err, numRemoved) => {
        if (err) return res.status(500).json({ error: "Error al eliminar el dato" });
        if (numRemoved === 0) return res.status(404).json({ error: "Dato no encontrado" });
        res.status(200).json({ message: "Dato eliminado correctamente" });
    });
});

// ----------------------------------------------------------
// MANEJO DE MÉTODOS NO PERMITIDOS
// ----------------------------------------------------------

router.all("/education-data", (req, res) => {
    if (!["GET", "POST", "DELETE"].includes(req.method)) {
        return res.status(405).json({ error: "Método no permitido" });
    }
});

module.exports = router;