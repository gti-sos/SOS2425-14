const express = require("express");
const Datastore = require("nedb");
const path = require("path");

const router = express.Router();
const db = new Datastore();
const initialData = require("../json/data-pdg.json");

/****************************************************
 * Carga automática de datos iniciales al iniciar la API
 ****************************************************/
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
/**********************************************************************
 * Función auxiliar para aplicar los filtros de las columnas numéricas
 **********************************************************************/
function applyNumericFilters(req, query, fields) {
    fields.forEach(field => {
        const min = parseFloat(req.query[`${field}Min`]);
        const max = parseFloat(req.query[`${field}Max`]);
        if (!isNaN(min) && !isNaN(max)) {
            query[field] = { $gte: min, $lte: max };
        } else if (!isNaN(min)) {
            query[field] = { $gte: min };
        } else if (!isNaN(max)) {
            query[field] = { $lte: max };
        }
    });
}
/****************************************************
 * GET - Lista todos los datos (con posibilidad de filtrado y paginación)
 ****************************************************/
router.get("/cybercrime-data", (req, res) => {
    const { autonomous_community, year, from, to } = req.query;
    const query = {};

    if (autonomous_community) query.autonomous_community = new RegExp(`^${autonomous_community}$`, 'i');

    if (year && (from || to)) {
        return res.status(400).json({ error: "No se pueden usar 'from' y 'to' junto con 'year'. Usa solo uno." });
    }

    if (year) {
        const yearNum = parseInt(year);
        if (isNaN(yearNum)) return res.status(400).json({ error: "El parámetro 'year' debe ser un año válido." });
        query.year = yearNum;
    } else if (from && to) {
        const fromYear = parseInt(from);
        const toYear = parseInt(to);
        if (isNaN(fromYear) || isNaN(toYear)) return res.status(400).json({ error: "'from' y 'to' deben ser años válidos." });
        if (fromYear > toYear) return res.status(400).json({ error: "'from' debe ser menor o igual que 'to'." });
        query.year = { $gte: fromYear, $lte: toYear };
    }

    applyNumericFilters(req, query, ["criminal_ofense", "cybersecurity", "arrested_investigated"]);

    const limit = parseInt(req.query.limit) || 0;
    const offset = parseInt(req.query.offset) || 0;

    db.find(query, { _id: 0 }).skip(offset).limit(limit).exec((err, docs) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });
        res.status(200).json(docs);
    });
});

/****************************************************
 * GET - Reinicia la base de datos con los datos iniciales
 ****************************************************/
router.get("/cybercrime-data/loadInitialData", (req, res) => {
    db.remove({}, { multi: true }, (err) => {
        if (err) return res.status(500).json({ error: "Error al eliminar datos existentes" });
        db.insert(initialData, (err, newDocs) => {
            if (err) return res.status(500).json({ error: "Error al insertar datos iniciales" });
            const cleanDocs = newDocs.map(({ _id, ...rest }) => rest);
            res.status(201).json({ message: `Datos restaurados correctamente (${cleanDocs.length} registros)`, data: cleanDocs });
        });
    });
});

router.get("/cybercrime-data/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/42335764/2sB2cU9hj3");
});

/****************************************************
 * GET - Comunidad específica (con filtros)
 ****************************************************/
router.get("/cybercrime-data/:autonomous_community", (req, res) => {
    const { autonomous_community } = req.params;
    const { year, from, to } = req.query;

    const query = {
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i')
    };

    applyNumericFilters(req, query, ["criminal_ofense", "cybersecurity", "arrested_investigated"]);

    if (year && (from || to)) {
        return res.status(400).json({ error: "No se pueden usar 'from' y 'to' junto con 'year'." });
    }

    if (year) {
        const yearNum = parseInt(year);
        if (isNaN(yearNum)) return res.status(400).json({ error: "El parámetro 'year' debe ser un año válido." });
        query.year = yearNum;
    } else if (from && to) {
        const fromYear = parseInt(from);
        const toYear = parseInt(to);
        if (isNaN(fromYear) || isNaN(toYear)) return res.status(400).json({ error: "'from' y 'to' deben ser años válidos." });
        if (fromYear > toYear) return res.status(400).json({ error: "'from' debe ser menor o igual que 'to'." });
        query.year = { $gte: fromYear, $lte: toYear };
    }

    const limit = parseInt(req.query.limit) || 0;
    const offset = parseInt(req.query.offset) || 0;

    db.find(query, { _id: 0 }).skip(offset).limit(limit).exec((err, docs) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });
        res.status(200).json(docs);
    });
});

/****************************************************
 * GET - Recurso exacto
 ****************************************************/
router.get("/cybercrime-data/:autonomous_community/:year", (req, res) => {
    const { autonomous_community, year } = req.params;
    const yearNum = parseInt(year);
    if (isNaN(yearNum)) return res.status(400).json({ error: "El año debe ser un número válido" });

    db.findOne({
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i'),
        year: yearNum
    }, { _id: 0 }, (err, doc) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });
        if (!doc) return res.status(404).json({ error: "Recurso no encontrado" });
        res.status(200).json(doc);
    });
});

/****************************************************
 * POST - Inserta nuevo recurso
 ****************************************************/
router.post("/cybercrime-data", (req, res) => {
    const { autonomous_community, year, criminal_ofense, cybersecurity, arrested_investigated } = req.body;

    if (!autonomous_community || !year || criminal_ofense === undefined || cybersecurity === undefined || arrested_investigated === undefined) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const yearNum = parseInt(year);
    const co = parseFloat(criminal_ofense);
    const cs = parseFloat(cybersecurity);
    const ai = parseFloat(arrested_investigated);

    if ([yearNum, co, cs, ai].some(isNaN)) {
        return res.status(400).json({ error: "Los valores numéricos no son válidos" });
    }

    const record = { autonomous_community, year: yearNum, criminal_ofense: co, cybersecurity: cs, arrested_investigated: ai };

    db.findOne({ autonomous_community: new RegExp(`^${autonomous_community}$`, 'i'), year: yearNum }, (err, existing) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });
        if (existing) return res.status(409).json({ error: "Recurso ya existente" });

        db.insert(record, (err, created) => {
            if (err) return res.status(500).json({ error: "Error al guardar el recurso" });
            const { _id, ...cleaned } = created;
            res.status(201).json(cleaned);
        });
    });
});

/****************************************************
 * PUT - NO SE PERMITE HACER POST PARA COLECCIONES DE RECURSOS.
 ****************************************************/

//Backlog: Si se intenta usar alguno de los métodos no permitidos por la tabla azul se debe devolver el código 405
router.put("/cybercrime-data", (req, res) => {
    res.status(405).json({ error: "Método no permitido para colecciones de recursos." });
});

/****************************************************
 * DELETE - Borra todos los datos de cybercrime
 ****************************************************/
router.delete("/cybercrime-data", (req, res) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar los datos" });
        }

        res.status(200).json({
            message: `Se han eliminado ${numRemoved} registros correctamente`
        });
    });
});
/****************************************************
 * POST - NO PERMITIDO PARA RECURSO ESPECIFICO
 ****************************************************/
//Backlog: Si se intenta usar alguno de los métodos no permitidos por la tabla azul se debe devolver el código 405.
router.post("/cybercrime-data/:autonomous_community/:year", (req, res) => {
    res.status(405).json({ error: "Método no permitido en un recurso específico. Use PUT para actualizar" });
});
/****************************************************
 * PUT - Actualiza un recurso existente
 ****************************************************/
router.put("/cybercrime-data/:autonomous_community/:year", (req, res) => {
    const { autonomous_community, year } = req.params;
    const { criminal_ofense, cybersecurity, arrested_investigated } = req.body;

    const parsed = {
        criminal_ofense: parseFloat(criminal_ofense),
        cybersecurity: parseFloat(cybersecurity),
        arrested_investigated: parseFloat(arrested_investigated)
    };

    if (Object.values(parsed).some(isNaN)) {
        return res.status(400).json({ error: "Todos los campos numéricos deben ser válidos" });
    }

    db.update({
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i'),
        year: parseInt(year)
    }, { $set: parsed }, {}, (err, numUpdated) => {
        if (err) return res.status(500).json({ error: "Error al actualizar" });
        if (numUpdated === 0) return res.status(404).json({ error: "Recurso no encontrado" });
        res.status(200).json({ message: "Recurso actualizado correctamente" });
    });
});

/****************************************************
 * DELETE - Elimina un recurso exacto
 ****************************************************/
router.delete("/cybercrime-data/:autonomous_community/:year", (req, res) => {
    const { autonomous_community, year } = req.params;
    const yearNum = parseInt(year);
    if (isNaN(yearNum)) return res.status(400).json({ error: "El año debe ser válido" });

    db.remove({
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i'),
        year: yearNum
    }, {}, (err, numRemoved) => {
        if (err) return res.status(500).json({ error: "Error al eliminar el recurso" });
        if (numRemoved === 0) return res.status(404).json({ error: "Recurso no encontrado" });
        res.status(200).json({ message: "Recurso eliminado correctamente" });
    });
});

module.exports = router;