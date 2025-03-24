const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataFilePath = path.join(__dirname, "../json/data-pdg.json");
const initialData = require("../json/initial-pdg-data.json");

// GET: Obtener datos con filtros de comunidad autónoma y año
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
        console.log("[GET] Datos devueltos");
        res.status(200).json(PDGData);
    });
});

// GET: Cargar datos iniciales
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

// GET: Obtener datos de una comunidad autónoma en un rango de años
router.get("/cybercrime-data/:autonomous_community", (req, res) => {
    console.log("[GET] Solicitud recibida para obtener datos de una comunidad autónoma en un rango de años");
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(400).json({ error: "Error interno del servidor" });
        }

        let PDGData = JSON.parse(data);
        const { from, to } = req.query;
        const autonomousCommunity = req.params.autonomous_community;

        if (!from || !to) {
            return res.status(400).json({ error: "Debe proporcionar un rango de años con 'from' y 'to'" });
        }

        PDGData = PDGData.filter(entry =>
            entry.autonomous_community.toLowerCase() === autonomousCommunity.toLowerCase() &&
            entry.year >= from && entry.year <= to
        );

        console.log("[GET] Datos devueltos para", autonomousCommunity);
        res.status(200).json(PDGData);
    });
});

// POST: Agregar un nuevo registro
router.post("/cybercrime-data", (req, res) => {
    console.log("[POST] Solicitud recibida para agregar un nuevo registro");
    const newEntry = req.body;

    if (!newEntry.autonomous_community || !newEntry.year || 
        newEntry.criminal_ofense === undefined || newEntry.cybersecurity === undefined || newEntry.arrested_investigated === undefined) {
        console.log("[POST] Error: Datos incompletos en la solicitud");
        return res.status(400).json({ error: "Faltan campos requeridos en el cuerpo de la solicitud" });
    }

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        let PDGData = [];

        if (!err) {
            try {
                PDGData = JSON.parse(data);
            } catch (parseError) {
                console.error("[POST] Error parseando JSON", parseError);
                return res.status(400).json({ error: "Error en el formato del archivo de datos" });
            }
        }

        const exists = PDGData.some(entry => 
            entry.autonomous_community.toLowerCase() === newEntry.autonomous_community.toLowerCase() &&
            entry.year == newEntry.year
        );

        if (exists) {
            console.log(`[POST] Conflicto: El recurso ya existe (${newEntry.autonomous_community}, ${newEntry.year})`);
            return res.status(409).json({ error: "El recurso ya existe en la base de datos" });
        }

        PDGData.push(newEntry);
        console.log("[POST] Nuevo registro agregado correctamente", newEntry);

        fs.writeFile(dataFilePath, JSON.stringify(PDGData, null, 2), (err) => {
            if (err) {
                console.error("[POST] Error guardando el nuevo dato", err);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
            res.status(201).json({ message: "Nuevo registro agregado correctamente", data: newEntry });
        });
    });
});

// GET: Obtener un dato específico (por comunidad autónoma y año)
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

// PUT: Actualizar un dato específico
router.put("/cybercrime-data/:autonomous_community/:year", (req, res) => {
    console.log("[PUT] Solicitud recibida para actualizar un dato");
    const { autonomous_community, year } = req.params;
    const updatedEntry = req.body;
    const yearNum = parseInt(year);

    // Verificar que los campos requeridos estén en el body
    if (!updatedEntry.autonomous_community || 
        !updatedEntry.year || 
        updatedEntry.criminal_ofense === undefined || 
        updatedEntry.cybersecurity === undefined || 
        updatedEntry.arrested_investigated === undefined) {
        
        console.log("[PUT] Error: Faltan campos requeridos en el cuerpo de la solicitud");
        return res.status(400).json({ error: "Faltan campos requeridos en el cuerpo de la solicitud" });
    }

    // Verificar que los identificadores en la URL y en el body coincidan
    if (updatedEntry.autonomous_community.toLowerCase().trim() !== autonomous_community.toLowerCase().trim() ||
        updatedEntry.year !== yearNum) {
        console.log("[PUT] Error: Los identificadores en la URL y el cuerpo de la solicitud no coinciden");
        return res.status(400).json({ error: "Los identificadores en la URL y el cuerpo de la solicitud deben coincidir" });
    }

    // Verificar que los valores numéricos sean realmente números
    if (isNaN(updatedEntry.criminal_ofense) || isNaN(updatedEntry.cybersecurity) || isNaN(updatedEntry.arrested_investigated)) {
        console.log("[PUT] Error: Los valores de los delitos deben ser números");
        return res.status(400).json({ error: "Los valores de criminal_ofense, cybersecurity y arrested_investigated deben ser numéricos" });
    }

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        let PDGData = JSON.parse(data);

        // Buscar el índice del dato en el JSON
        const index = PDGData.findIndex(entry => 
            entry.autonomous_community.toLowerCase().trim() === autonomous_community.toLowerCase().trim() &&
            entry.year === yearNum
        );

        // Si no se encuentra el dato, devolver 404
        if (index === -1) {
            console.log("[PUT] Error: No se encontró el dato para actualizar");
            return res.status(404).json({ error: "Dato no encontrado" });
        }

        // Actualizar el dato en el JSON
        PDGData[index] = updatedEntry;

        // Escribir los datos actualizados en el archivo
        fs.writeFile(dataFilePath, JSON.stringify(PDGData, null, 2), (err) => {
            if (err) {
                console.error("Error actualizando el archivo JSON", err);
                return res.status(500).json({ error: "Error interno del servidor" });
            }

            res.status(200).json({ message: "Dato actualizado correctamente", data: updatedEntry });
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


// DELETE: Eliminar todos los datos
router.delete("/cybercrime-data", (req, res) => {
    console.log("[DELETE] Solicitud recibida para eliminar todos los datos");

    fs.writeFile(dataFilePath, JSON.stringify([], null, 2), (err) => {
        if (err) {
            console.error("Error al eliminar todos los datos", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        console.log("[DELETE] Todos los datos han sido eliminados correctamente");
        res.status(200).json({ message: "Todos los datos han sido eliminados correctamente" });
    });
});


/****************************************************
 * DELETE - Elimina un dato específico
 ****************************************************/

router.delete("/employment-data/:autonomous_community/:year/:education_level", (req, res) => {
    const { autonomous_community, year } = req.params;

    // Backlog: Si se recibe un dato (JSON) que no tiene los campos esperados se debe devolver el código 400
    if (!autonomous_community || !year ) {
        return res.status(400).json({ 
            error: "Se requieren todos los parámetros (autonomous_community, year, education_level)" 
        });
    }
    
    const yearNum = parseInt(year);
    if (isNaN(yearNum)) {
        return res.status(400).json({ error: "El año debe ser un valor numérico" });
    }
    
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        
        try {
            console.log(`DELETE request for employment data: ${autonomous_community}/${year}`);
            let jsonData = JSON.parse(data);
            
            const initialLength = jsonData.length;
            jsonData = jsonData.filter(item => 
                !(item.autonomous_community.toLowerCase() === autonomous_community.toLowerCase() &&
                item.year === yearNum 
            ));
            
            // Backlog: Error 404, Si se intenta eliminar un recurso inexistente.
            if (jsonData.length === initialLength) {
                return res.status(404).json({ error: "No se encontró el dato para eliminar" });
            }
            
            fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error("Error guardando los datos", err);
                    return res.status(500).json({ error: "Error interno del servidor" });
                }
                
                res.status(200).json({ message: "Dato eliminado correctamente" });
            });
        } catch (parseError) {
            console.error("Error parseando JSON", parseError);
            res.status(500).json({ error: "Error en el formato de los datos almacenados" });
        }
    });
});



//Manejo de métodos no permitidos
router.all("/cybercrime-data", (req, res) => {
    if (!["GET", "POST", "DELETE"].includes(req.method)) {
        return res.status(405).json({ error: "Método no permitido" });
    }
});

module.exports = router;
