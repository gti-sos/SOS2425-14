import express from "express";
import Datastore from "nedb";
import initialData from "../json/data-frm.json" assert { type: "json" };

const db = new Datastore();
const router = express.Router();

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

// [GET] Devuelve todos los registros con filtros por todos los campos y paginación
router.get("/education-data", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos con filtros y paginación");

    const query = {};
    const {
        autonomous_community,
        year,
        from,
        to,
        basic_fp,
        basic_fp_from,
        basic_fp_to,
        middle_grade,
        middle_grade_from,
        middle_grade_to,
        higher_grade,
        higher_grade_from,
        higher_grade_to,
        limit,
        offset
    } = req.query;

    // Filtros comunes
    if (autonomous_community) query.autonomous_community = new RegExp(`^${autonomous_community}$`, "i");
    if (year) query.year = parseInt(year);
    if (from && to) query.year = { $gte: parseInt(from), $lte: parseInt(to) };

    // Filtros exactos o por rango para basic_fp
    if (basic_fp_from && basic_fp_to) {
        query.basic_fp = { $gte: parseFloat(basic_fp_from), $lte: parseFloat(basic_fp_to) };
    } else if (basic_fp) {
        query.basic_fp = parseFloat(basic_fp);
    }

    // Filtros exactos o por rango para middle_grade
    if (middle_grade_from && middle_grade_to) {
        query.middle_grade = { $gte: parseFloat(middle_grade_from), $lte: parseFloat(middle_grade_to) };
    } else if (middle_grade) {
        query.middle_grade = parseFloat(middle_grade);
    }

    // Filtros exactos o por rango para higher_grade
    if (higher_grade_from && higher_grade_to) {
        query.higher_grade = { $gte: parseFloat(higher_grade_from), $lte: parseFloat(higher_grade_to) };
    } else if (higher_grade) {
        query.higher_grade = parseFloat(higher_grade);
    }

    // Paginación
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

// [GET] Devuelve registros de una comunidad autónoma en un rango de años, con filtros y paginación
router.get("/education-data/:autonomous_community", (req, res) => {
    console.log("[GET] Solicitud para datos filtrados por comunidad y otros campos, con paginación");

    const {
        from, to,
        basic_fp, basic_fp_from, basic_fp_to,
        middle_grade, middle_grade_from, middle_grade_to,
        higher_grade, higher_grade_from, higher_grade_to,
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

    // Filtro para basic_fp
    if (basic_fp_from && basic_fp_to) {
        query.basic_fp = { $gte: parseFloat(basic_fp_from), $lte: parseFloat(basic_fp_to) };
    } else if (basic_fp) {
        query.basic_fp = parseFloat(basic_fp);
    }

    // Filtro para middle_grade
    if (middle_grade_from && middle_grade_to) {
        query.middle_grade = { $gte: parseFloat(middle_grade_from), $lte: parseFloat(middle_grade_to) };
    } else if (middle_grade) {
        query.middle_grade = parseFloat(middle_grade);
    }

    // Filtro para higher_grade
    if (higher_grade_from && higher_grade_to) {
        query.higher_grade = { $gte: parseFloat(higher_grade_from), $lte: parseFloat(higher_grade_to) };
    } else if (higher_grade) {
        query.higher_grade = parseFloat(higher_grade);
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

// [GET] Devuelve un único registro por comunidad y año
router.get("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[GET] Solicitud para obtener un dato específico por comunidad y año");

    const { autonomous_community, year } = req.params;
    const parsedYear = parseInt(year);

    if (!autonomous_community || isNaN(parsedYear)) {
        return res.status(400).json({ error: "Parámetros inválidos en la URL" });
    }

    db.findOne({
        autonomous_community: new RegExp(`^${autonomous_community}$`, "i"),
        year: parsedYear
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
        console.log("[POST] Rechazada solicitud con parámetros en la URL:", req.query);
        return res.status(405).json({ error: "Método no permitido con parámetros en la URL" });
    }
    next();
});

// [POST] Agrega un nuevo registro si no existe ya en la base de datos
router.post("/education-data", (req, res) => {
    console.log("[POST] Solicitud para agregar un nuevo registro");
    const newEntry = { ...req.body };

    // Normalizar campos clave
    if (typeof newEntry.autonomous_community === "string") {
        newEntry.autonomous_community = newEntry.autonomous_community.trim();
    }
    newEntry.year = parseInt(newEntry.year);

    // Validar existencia y tipo de los campos
    const camposObligatorios = ["autonomous_community", "year", "basic_fp", "middle_grade", "higher_grade"];
    const faltanCampos = camposObligatorios.some(
        campo => newEntry[campo] === undefined || newEntry[campo] === null
    );
    if (faltanCampos || !newEntry.autonomous_community || isNaN(newEntry.year)) {
        return res.status(400).json({ error: "Faltan campos requeridos o tienen formato inválido" });
    }

    // Validación de que los valores de FP son numéricos finitos
    if (
        !Number.isFinite(newEntry.basic_fp) ||
        !Number.isFinite(newEntry.middle_grade) ||
        !Number.isFinite(newEntry.higher_grade)
    ) {
        return res.status(400).json({ error: "Los valores de formación deben ser números válidos" });
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
    console.log("[POST] Método no permitido en ruta específica. Debe usarse PUT para actualizar recursos.");
    res.status(405).json({
        error: "Método POST no permitido en un recurso específico. Use PUT para actualizar un registro existente."
    });
});

// ----------------------------------------------------------
// MÉTODO PUT
// ----------------------------------------------------------

// [PUT] Actualiza un dato específico por comunidad y año
router.put("/education-data/:autonomous_community/:year", (req, res) => {
    console.log("[PUT] Solicitud para actualizar un dato existente");

    const { autonomous_community, year } = req.params;
    const updatedEntry = { ...req.body };
    const yearNum = parseInt(year);

    // Normalización de comunidad
    if (typeof updatedEntry.autonomous_community === "string") {
        updatedEntry.autonomous_community = updatedEntry.autonomous_community.trim();
    }

    // Validación básica de campos requeridos
    if (
        !updatedEntry.autonomous_community ||
        updatedEntry.year === undefined ||
        updatedEntry.basic_fp === undefined ||
        updatedEntry.middle_grade === undefined ||
        updatedEntry.higher_grade === undefined
    ) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // Validación de identificadores consistentes
    if (
        updatedEntry.autonomous_community.toLowerCase() !== autonomous_community.toLowerCase().trim() ||
        parseInt(updatedEntry.year) !== yearNum
    ) {
        return res.status(400).json({ error: "Los identificadores en la URL y el cuerpo no coinciden" });
    }

    // Validación de tipos numéricos
    if (
        !Number.isFinite(updatedEntry.basic_fp) ||
        !Number.isFinite(updatedEntry.middle_grade) ||
        !Number.isFinite(updatedEntry.higher_grade)
    ) {
        return res.status(400).json({ error: "Los valores deben ser números válidos" });
    }

    db.update(
        {
            autonomous_community: new RegExp(`^${autonomous_community}$`, "i"),
            year: yearNum
        },
        updatedEntry,
        {},
        (err, numReplaced) => {
            if (err) return res.status(500).json({ error: "Error al actualizar el dato" });
            if (numReplaced === 0) return res.status(404).json({ error: "Dato no encontrado" });

            console.log("[PUT] Registro actualizado con éxito");
            res.status(200).json({ message: "Dato actualizado correctamente" });
        }
    );
});

// ----------------------------------------------------------
// MÉTODOS DELETE
// ----------------------------------------------------------

// [DELETE] Elimina todos los registros (solo si no hay parámetros en la URL)
router.delete("/education-data", (req, res) => {
    console.log("[DELETE] Solicitud para eliminar todos los registros");

    if (Object.keys(req.query).length > 0) {
        console.warn("[DELETE] Bloqueado intento de eliminar con parámetros:", req.query);
        return res.status(405).json({
            error: "DELETE con parámetros no está permitido en esta ruta. Use DELETE /education-data/:autonomous_community/:year para eliminar un recurso específico."
        });
    }

    db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            console.error("[DELETE] Error al eliminar todos los datos", err);
            return res.status(500).json({ error: "Error interno al eliminar los datos" });
        }

        console.log(`[DELETE] Se eliminaron ${numRemoved} registros`);
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

/****************************************************
 * Exportar el backend
 ****************************************************/
export function loadBackendFRM(app) {
    app.use("/api/v1", router);

    db.count({}, (err, count) => {
        if (err) {
            console.error("[education] Error al contar registros en NeDB:", err);
            return;
        }

        if (count === 0) {
            db.insert(initialData, (err, newDocs) => {
                if (err) {
                    console.error("[education] Error al insertar datos iniciales en NeDB:", err);
                } else {
                    console.log(`[education] Se han insertado ${newDocs.length} registros iniciales.`);
                }
            });
        } else {
            console.log(`[education] La base ya contiene ${count} registros.`);
        }
    });
}