import express from "express";
import Datastore from "nedb";
import fs from "fs";
import fetch from "node-fetch";

const initialData = JSON.parse(fs.readFileSync(new URL("../json/data-jdp.json", import.meta.url)));

const db = new Datastore();
const router = express.Router();

let comunidadesValidas = [];
let nivelesEducativosValidos = [];

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

    if (!comunidadesValidas.includes(newData.autonomous_community)) {
        return res.status(400).json({ error: "Comunidad Autónoma no válida." });
      }
      
    if (!nivelesEducativosValidos.includes(newData.education_level)) {
        return res.status(400).json({ error: "Nivel educativo no válido." });
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
    const updatedData = req.body;

    // Validar que todos los campos están presentes
    const requiredFields = [
        "autonomous_community",
        "year",
        "education_level",
        "activity_rate",
        "employment_rate",
        "unemployment_rate"
    ];

    if (!requiredFields.every(field => updatedData.hasOwnProperty(field))) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Validar que no se cambian los identificadores
    if (
        updatedData.autonomous_community !== autonomous_community ||
        parseInt(updatedData.year) !== parseInt(year) ||
        updatedData.education_level !== education_level
    ) {
        return res.status(400).json({ error: "No se pueden modificar los identificadores del recurso" });
    }

    // Validar y convertir los campos numéricos
    const yearNum = parseInt(updatedData.year);
    const activity_rate = parseFloat(updatedData.activity_rate);
    const employment_rate = parseFloat(updatedData.employment_rate);
    const unemployment_rate = parseFloat(updatedData.unemployment_rate);

    if (
        isNaN(yearNum) ||
        isNaN(activity_rate) ||
        isNaN(employment_rate) ||
        isNaN(unemployment_rate)
    ) {
        return res.status(400).json({ error: "Los campos numéricos deben contener valores válidos" });
    }

    const query = {
        autonomous_community: new RegExp(`^${autonomous_community}$`, 'i'),
        year: yearNum,
        education_level: new RegExp(`^${education_level}$`, 'i')
    };

    const newData = {
        autonomous_community: updatedData.autonomous_community,
        year: yearNum,
        education_level: updatedData.education_level,
        activity_rate,
        employment_rate,
        unemployment_rate
    };

    db.update(query, { $set: newData }, {}, (err, numUpdated) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });

        if (numUpdated === 0) {
            return res.status(404).json({ error: "Recurso no encontrado" });
        }

        res.status(200).json({ message: "Recurso actualizado correctamente", data: newData });
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

/****************************************************
 * PROXY - Redirige a la API de frutas externa (con fetch)
 ****************************************************/
router.get("/proxy/fruits", async (req, res) => {
    try {
        const externalRes = await fetch("https://www.fruityvice.com/api/fruit/all");

        if (!externalRes.ok) {
            return res.status(externalRes.status).json({ error: "Error al obtener frutas" });
        }

        const data = await externalRes.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Error interno al conectar con la API externa", details: err.message });
    }
});



/****************************************************
 * Función para exportar el backend
 ****************************************************/
export function loadBackendJDP(app) {
    app.use("/api/v1", router);

    // Carga automática solo si la base está vacía
    db.count({}, (err, count) => {
        if (err) {
            console.error("[employment] Error al contar registros en NeDB:", err);
            return;
        }

        if (count === 0) {
            db.insert(initialData, (err, newDocs) => {
                if (err) {
                  console.error("[employment] Error al insertar datos iniciales en NeDB:", err);
                } else {
                  console.log(`[employment] Se han insertado ${newDocs.length} registros iniciales.`);
              
                  comunidadesValidas = [...new Set(newDocs.map(d => d.autonomous_community))];
                  nivelesEducativosValidos = [...new Set(newDocs.map(d => d.education_level))];
                }
              });
        } else {
            console.log(`[employment] La base ya contiene ${count} registros.`);
        }
    });
}