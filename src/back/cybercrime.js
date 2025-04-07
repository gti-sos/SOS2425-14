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
    console.log("[GET] Solicitud recibida para obtener datos con filtros");

    const {
        autonomous_community,
        year,
        from,
        to,
        criminal_ofense,
        criminal_ofense_from,
        criminal_ofense_to,
        cybersecurity,
        cybersecurity_from,
        cybersecurity_to,
        arrested_investigated,
        arrested_investigated_from,
        arrested_investigated_to,
        limit,
        offset
    } = req.query;

    const query = {};

    // Comunidad autónoma
    if (autonomous_community) {
        query.autonomous_community = new RegExp(`^${autonomous_community}$`, "i");
    }

    // Año exacto o rango
    if (year) {
        query.year = parseInt(year);
    } else if (from && to) {
        query.year = { $gte: parseInt(from), $lte: parseInt(to) };
    }

    // criminal_ofense exacto o rango
    if (criminal_ofense_from && criminal_ofense_to) {
        query.criminal_ofense = {
            $gte: parseFloat(criminal_ofense_from),
            $lte: parseFloat(criminal_ofense_to)
        };
    } else if (criminal_ofense) {
        query.criminal_ofense = parseFloat(criminal_ofense);
    }

    // cybersecurity exacto o rango
    if (cybersecurity_from && cybersecurity_to) {
        query.cybersecurity = {
            $gte: parseFloat(cybersecurity_from),
            $lte: parseFloat(cybersecurity_to)
        };
    } else if (cybersecurity) {
        query.cybersecurity = parseFloat(cybersecurity);
    }

    // arrested_investigated exacto o rango
    if (arrested_investigated_from && arrested_investigated_to) {
        query.arrested_investigated = {
            $gte: parseFloat(arrested_investigated_from),
            $lte: parseFloat(arrested_investigated_to)
        };
    } else if (arrested_investigated) {
        query.arrested_investigated = parseFloat(arrested_investigated);
    }

    // Opciones de paginación
    const options = {
        limit: limit ? parseInt(limit) : 0,
        skip: offset ? parseInt(offset) : 0
    };

    db.find(query)
        .sort({ year: 1, autonomous_community: 1 })
        .skip(options.skip)
        .limit(options.limit)
        .exec((err, docs) => {
            if (err) return res.status(500).json({ error: "Error en la base de datos" });
            const cleanedDocs = docs.map(({ _id, ...rest }) => rest);
            res.status(200).json(cleanedDocs);
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
// [GET] Devuelve registros de una comunidad autónoma con filtros y paginación
router.get("/cybercrime-data/:autonomous_community", (req, res) => {
    console.log("[GET] Solicitud para datos de cibercrimen filtrados por comunidad, años y otros campos con paginación");

    const {
        from, to,
        criminal_ofense, criminal_ofense_from, criminal_ofense_to,
        cybersecurity, cybersecurity_from, cybersecurity_to,
        arrested_investigated, arrested_investigated_from, arrested_investigated_to,
        limit, offset
    } = req.query;

    const autonomousCommunity = req.params.autonomous_community;

    if (!from || !to || isNaN(from) || isNaN(to)) {
        return res.status(400).json({ error: "Debe proporcionar un rango válido con 'from' y 'to'" });
    }

    const query = {
        autonomous_community: new RegExp(`^${autonomousCommunity}$`, "i"),
        year: { $gte: parseInt(from), $lte: parseInt(to) }
    };

    // Filtro para criminal_ofense
    if (criminal_ofense_from && criminal_ofense_to) {
        query.criminal_ofense = { $gte: parseFloat(criminal_ofense_from), $lte: parseFloat(criminal_ofense_to) };
    } else if (criminal_ofense) {
        query.criminal_ofense = parseFloat(criminal_ofense);
    }

    // Filtro para cybersecurity
    if (cybersecurity_from && cybersecurity_to) {
        query.cybersecurity = { $gte: parseFloat(cybersecurity_from), $lte: parseFloat(cybersecurity_to) };
    } else if (cybersecurity) {
        query.cybersecurity = parseFloat(cybersecurity);
    }

    // Filtro para arrested_investigated
    if (arrested_investigated_from && arrested_investigated_to) {
        query.arrested_investigated = { $gte: parseFloat(arrested_investigated_from), $lte: parseFloat(arrested_investigated_to) };
    } else if (arrested_investigated) {
        query.arrested_investigated = parseFloat(arrested_investigated);
    }

    const options = {
        limit: limit ? parseInt(limit) : 0,
        skip: offset ? parseInt(offset) : 0
    };

    db.find(query)
        .sort({ year: 1 })
        .skip(options.skip)
        .limit(options.limit)
        .exec((err, docs) => {
            if (err) return res.status(500).json({ error: "Error en la base de datos" });
            const cleanedDocs = docs.map(({ _id, ...rest }) => rest);
            res.status(200).json(cleanedDocs);
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
    const {
        autonomous_community: bodyCommunity,
        year: bodyYear,
        criminal_ofense,
        cybersecurity,
        arrested_investigated
    } = req.body;

    // Verifica coincidencia entre params y body
    if (
        !bodyCommunity || !bodyYear ||
        bodyCommunity.toLowerCase().trim() !== autonomous_community.toLowerCase().trim() ||
        parseInt(bodyYear) !== parseInt(year)
    ) {
        return res.status(400).json({ error: "Los identificadores en la URL y el cuerpo deben coincidir" });
    }

    // Validación de números
    const parsed = {
        criminal_ofense: parseFloat(criminal_ofense),
        cybersecurity: parseFloat(cybersecurity),
        arrested_investigated: parseFloat(arrested_investigated)
    };

    if (Object.values(parsed).some(isNaN)) {
        return res.status(400).json({ error: "Todos los campos numéricos deben ser válidos" });
    }

    // Validación de identificadores consistentes
    if (
        updatedEntry.autonomous_community.toLowerCase() !== autonomous_community.toLowerCase().trim() ||
        parseInt(updatedEntry.year) !== yearNum
    ) {
        return res.status(400).json({ error: "Los identificadores en la URL y el cuerpo no coinciden" });
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