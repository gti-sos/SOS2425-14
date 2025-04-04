const express = require("express");
const Datastore = require("nedb");
const path = require("path");

const router = express.Router();
const db = new Datastore(); // Base de datos en memoria
const initialData = require("../json/data-jdp.json");

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
 * GET - Lista todos los datos (con posibilidad de filtrado)
 ****************************************************/
router.get("/employment-data", (req, res) => {
    const { autonomous_community, year, from, to, education_level } = req.query;

    if (year && (from || to)) {
        return res.status(400).json({ error: "No se pueden usar 'from' y 'to' junto con 'year'. Usa solo uno." });
    }

    const query = {};

    applyNumericFilters(req, query, [
        "activity_rate",
        "employment_rate",
        "unemployment_rate"
    ]);

    if (autonomous_community) query.autonomous_community = new RegExp(`^${autonomous_community}$`, 'i');
    if (education_level) query.education_level = new RegExp(`^${education_level}$`, 'i');

    if (year) {
        const yearNum = parseInt(year);
        if (isNaN(yearNum)) return res.status(400).json({ error: "El parámetro 'year' debe ser un año válido." });
        query.year = yearNum;
    } else if (from && to) {
        const fromYear = parseInt(from);
        const toYear = parseInt(to);
        if (isNaN(fromYear) || isNaN(toYear)) {
            return res.status(400).json({ error: "'from' y 'to' deben ser años válidos." });
        }
        if (fromYear > toYear) {
            return res.status(400).json({ error: "'from' debe ser menor o igual que 'to'." });
        }
        query.year = { $gte: fromYear, $lte: toYear };
    }

    const limit = parseInt(req.query.limit) || 0;
    const offset = parseInt(req.query.offset) || 0;

    db.find(query, { _id: 0 })
        .skip(offset)
        .limit(limit)
        .exec((err, docs) => {
            if (err) return res.status(500).json({ error: "Error interno del servidor" });
            res.status(200).json(docs);
    });
});


/****************************************************
 * GET - Reinicia la base de datos con los datos iniciales
 ****************************************************/
router.get("/employment-data/loadInitialData", (req, res) => {
    db.remove({}, { multi: true }, (err) => {
        if (err) return res.status(500).json({ error: "Error al eliminar datos existentes" });

        db.insert(initialData, (err, newDocs) => {
            if (err) return res.status(500).json({ error: "Error al insertar datos iniciales" });

            // Filtrar el _id
            const cleanDocs = newDocs.map(({ _id, ...rest }) => rest);

            res.status(201).json({
                message: `Datos iniciales restaurados correctamente (${cleanDocs.length} registros)`,
                data: cleanDocs
            });
        });
    });
});

//Redirigir al docs de la API
router.get("/employment-data/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/42370803/2sAYkLkbwf");
});

/****************************************************
 * GET - Para una comunidad autonoma en concreto (con posibilidad de filtrado por query). Respuesta de tipo ARRAY.
 ****************************************************/
router.get("/employment-data/:autonomous_community", (req, res) => {
    const { autonomous_community } = req.params;
    const { year, from, to, education_level } = req.query;

    const query = {
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i')
    };

    applyNumericFilters(req, query, [
    "activity_rate",
    "employment_rate",
    "unemployment_rate"
    ]);

    if (education_level) {
        query.education_level = new RegExp(`^${education_level}$`, 'i');
    }

    if (year && (from || to)) {
        return res.status(400).json({ error: "No se pueden usar 'from' y 'to' junto con 'year'. Usa solo uno." });
    }

    if (year) {
        const yearNum = parseInt(year);
        if (isNaN(yearNum)) {
            return res.status(400).json({ error: "El parámetro 'year' debe ser un año válido." });
        }
        query.year = yearNum;
    } else if (from && to) {
        const fromYear = parseInt(from);
        const toYear = parseInt(to);
        if (isNaN(fromYear) || isNaN(toYear)) {
            return res.status(400).json({ error: "'from' y 'to' deben ser años válidos." });
        }
        if (fromYear > toYear) {
            return res.status(400).json({ error: "'from' debe ser menor o igual que 'to'." });
        }
        query.year = { $gte: fromYear, $lte: toYear };
    }

    const limit = parseInt(req.query.limit) || 0;
    const offset = parseInt(req.query.offset) || 0;
    
    db.find(query, { _id: 0 })
      .skip(offset)
      .limit(limit)
      .exec((err, docs) => {
          if (err) return res.status(500).json({ error: "Error al acceder a la base de datos" });
          res.status(200).json(docs);
      });
});

/****************************************************
 * GET - Comunidad y año específicos (todos los niveles)
 ****************************************************/
router.get("/employment-data/:autonomous_community/:year", (req, res) => {
    const { autonomous_community, year } = req.params;
    const yearNum = parseInt(year);

    if (isNaN(yearNum)) {
        return res.status(400).json({ error: "El año debe ser un número válido" });
    }

    const query = {
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i'),
        year: yearNum
    };

    applyNumericFilters(req, query, [
        "activity_rate",
        "employment_rate",
        "unemployment_rate"
    ]);

    db.find(query, { _id: 0 }, (err, docs) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });

        if (!docs || docs.length === 0) {
            return res.status(404).json({ error: "No se encontraron datos para esa comunidad y año" });
        }

        res.status(200).json(docs);
    });
});

/****************************************************
 * POST - Crea un nuevo dato para employment-data
 ****************************************************/
router.post("/employment-data", (req, res) => {
    const newData = req.body;

    const requiredFields = [
        "autonomous_community",
        "year",
        "education_level",
        "activity_rate",
        "employment_rate",
        "unemployment_rate"
    ];

    // Validar que todos los campos estén presentes
    if (!requiredFields.every(field => newData.hasOwnProperty(field))) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Validar y convertir los datos
    const year = parseInt(newData.year);
    const activity_rate = parseFloat(newData.activity_rate);
    const employment_rate = parseFloat(newData.employment_rate);
    const unemployment_rate = parseFloat(newData.unemployment_rate);

    if (
        isNaN(year) || isNaN(activity_rate) ||
        isNaN(employment_rate) || isNaN(unemployment_rate)
    ) {
        return res.status(400).json({ error: "Los campos numéricos deben contener valores válidos" });
    }

    const record = {
        autonomous_community: newData.autonomous_community,
        year,
        education_level: newData.education_level,
        activity_rate,
        employment_rate,
        unemployment_rate
    };

    // Verificar si ya existe ese recurso
    db.findOne({
        autonomous_community: new RegExp(`^${record.autonomous_community}$`, 'i'),
        year: record.year,
        education_level: new RegExp(`^${record.education_level}$`, 'i')
    }, (err, existing) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });
        if (existing) {
            return res.status(409).json({ error: "Ya existe un recurso con los mismos identificadores" });
        }

        // Insertar en la base de datos
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
router.put("/employment-data", (req, res) => {
    res.status(405).json({ error: "Método no permitido para colecciones de recursos." });
});


/****************************************************
 * DELETE - Borra todos los datos de empleo (o posibilidad de filtrado)
 ****************************************************/
router.delete("/employment-data", (req, res) => {
    const { autonomous_community, year, education_level } = req.query;
    const query = {};

    if (autonomous_community) query.autonomous_community = new RegExp(`^${autonomous_community}$`, 'i');
    if (education_level) query.education_level = new RegExp(`^${education_level}$`, 'i');
    if (year) {
        const yearNum = parseInt(year);
        if (isNaN(yearNum)) return res.status(400).json({ error: "El año debe ser un número válido" });
        query.year = yearNum;
    }

    db.remove(query, { multi: true }, (err, numRemoved) => {
        if (err) return res.status(500).json({ error: "Error al eliminar los datos" });

        if (numRemoved === 0) {
            return res.status(404).json({ error: "No se encontraron registros que coincidan" });
        }

        res.status(200).json({ message: `Se han eliminado ${numRemoved} registros` });
    });
});



/****************************************************
 * GET - Obtener un recuso en específico. Respuesta de tipo OBJECT
 ****************************************************/
router.get("/employment-data/:autonomous_community/:year/:education_level", (req, res) => {
    const { autonomous_community, year, education_level } = req.params;
    
    const yearNum = parseInt(year);
    if (isNaN(yearNum)) {
        return res.status(400).json({ error: "El año debe ser un número válido" });
    }

    db.findOne({
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i'),
        year: yearNum,
        education_level: new RegExp(`^${education_level}$`, 'i')
    }, (err, doc) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });

        if (!doc) {
            return res.status(404).json({ error: "Recurso no encontrado" });
        }

        const { _id, ...cleaned } = doc;
        res.status(200).json(cleaned);
    });
});


/****************************************************
 * POST - NO PERMITIDO PARA RECURSO ESPECIFICO
 ****************************************************/
//Backlog: Si se intenta usar alguno de los métodos no permitidos por la tabla azul se debe devolver el código 405.
router.post("/employment-data/:autonomous_community/:year/:education_level", (req, res) => {
    res.status(405).json({ error: "Método no permitido en un recurso específico. Use PUT para actualizar" });
});


/****************************************************
 * PUT - Actualiza un dato específico
 ****************************************************/
router.put("/employment-data/:autonomous_community/:year/:education_level", (req, res) => {
    const { autonomous_community, year, education_level } = req.params;
    const updateData = req.body;

    // Validar que no se cambian los identificadores
    if (
        updateData.autonomous_community !== undefined &&
        updateData.autonomous_community !== autonomous_community
    ) {
        return res.status(400).json({ error: "No se puede modificar 'autonomous_community'" });
    }

    if (
        updateData.year !== undefined &&
        parseInt(updateData.year) !== parseInt(year)
    ) {
        return res.status(400).json({ error: "No se puede modificar 'year'" });
    }

    if (
        updateData.education_level !== undefined &&
        updateData.education_level !== education_level
    ) {
        return res.status(400).json({ error: "No se puede modificar 'education_level'" });
    }

    // Validar numéricos
    const parsedData = {
        activity_rate: parseFloat(updateData.activity_rate),
        employment_rate: parseFloat(updateData.employment_rate),
        unemployment_rate: parseFloat(updateData.unemployment_rate)
    };

    if (
        isNaN(parsedData.activity_rate) ||
        isNaN(parsedData.employment_rate) ||
        isNaN(parsedData.unemployment_rate)
    ) {
        return res.status(400).json({ error: "Todos los campos numéricos deben ser válidos" });
    }

    const query = {
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i'),
        year: parseInt(year),
        education_level: new RegExp(`^${education_level}$`, 'i')
    };

    const update = {
        $set: parsedData
    };

    db.update(query, update, {}, (err, numUpdated) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });

        if (numUpdated === 0) {
            return res.status(404).json({ error: "Recurso no encontrado" });
        }

        res.status(200).json({ message: "Recurso actualizado correctamente" });
    });
});

/****************************************************
 * DELETE - Elimina un dato específico
 ****************************************************/
router.delete("/employment-data/:autonomous_community/:year/:education_level", (req, res) => {
    const { autonomous_community, year, education_level } = req.params;

    const yearNum = parseInt(year);
    if (isNaN(yearNum)) {
        return res.status(400).json({ error: "El año debe ser un número válido" });
    }

    const query = {
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i'),
        year: yearNum,
        education_level: new RegExp(`^${education_level}$`, 'i')
    };

    db.remove(query, {}, (err, numRemoved) => {
        if (err) return res.status(500).json({ error: "Error al eliminar el recurso" });

        if (numRemoved === 0) {
            return res.status(404).json({ error: "Recurso no encontrado" });
        }

        res.status(200).json({ message: "Recurso eliminado correctamente" });
    });
});

module.exports = router;