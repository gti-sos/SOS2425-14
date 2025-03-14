const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataFilePath = path.join(__dirname, "../json/data-jdp.json");
const initialData = require("../json/initial-jdp-data.json");


/****************************************************
 * GET - Lista todos los datos de employment-data (con posibilidad de filtrado por query). Respuesta de tipo ARRAY.
 ****************************************************/

router.get("/employment-data", (req, res) => {
    //Obtener parametros de consulta tipo "?" 
    const autonomousCommunity = req.query.autonomous_community;
    const year = req.query.year;
    const fromYear = parseInt(req.query.from);
    const toYear = parseInt(req.query.to);
    const educationLevel = req.query.education_level;

    // Validar los parámetros de consulta
    if (year && (fromYear || toYear)) {
        return res.status(400).json({ error: "No se pueden usar 'from' y 'to' junto con 'year'. Usa solo uno." });
    }

    if (year && isNaN(parseInt(year))) {
        return res.status(400).json({ error: "El parámetro 'year' debe ser un año válido." });
    }

    if ((fromYear || toYear) && (isNaN(fromYear) || isNaN(toYear))) {
        return res.status(400).json({ error: "Los parámetros 'from' y 'to' deben ser años válidos." });
    }

    if (fromYear > toYear) {
        return res.status(400).json({ error: "El parámetro 'from' debe ser menor o igual que 'to'." });
    }

    // Leer el archivo JSON
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        try {
            console.log(`GET request to /employment-data with query params: ${JSON.stringify(req.query)}`);
            let jsonData = JSON.parse(data);

            // Aplicar filtros si existen

            if (autonomousCommunity) {
                jsonData = jsonData.filter(item => 
                    item.autonomous_community && 
                    item.autonomous_community.toLowerCase() === autonomousCommunity.toLowerCase()
                );
            }

            if (year) {
                const yearNum = parseInt(year);
                jsonData = jsonData.filter(item => item.year === yearNum);
            } 
            else if (fromYear && toYear) {
                jsonData = jsonData.filter(item => 
                    item.year >= fromYear && item.year <= toYear
                );
            }

            if (educationLevel) {
                jsonData = jsonData.filter(item => 
                    item.education_level && 
                    item.education_level.toLowerCase() === educationLevel.toLowerCase()
                );
            }

            res.json(jsonData);
        } catch (parseError) {
            console.error("Error parseando JSON", parseError);
            res.status(500).json({ error: "Error en el formato de los datos almacenados" });
        }
    });
});

/****************************************************
 * GET - Para una comunidad autonoma en concreto (con posibilidad de filtrado por query). Respuesta de tipo ARRAY.
 ****************************************************/

router.get("/employment-data/:autonomous_community", (req, res) => {
    const autonomousCommunity = req.params.autonomous_community;
    const fromYear = parseInt(req.query.from);
    const toYear = parseInt(req.query.to);
    const singleYear = parseInt(req.query.year);
    const educationLevel = req.query.education_level;

    // Validar los parámetros de consulta
    if (singleYear && (fromYear || toYear)) {
        return res.status(400).json({ error: "No se pueden usar 'from' y 'to' junto con 'year'. Usa solo uno." });
    }

    if (singleYear && isNaN(singleYear)) {
        return res.status(400).json({ error: "El parámetro 'year' debe ser un año válido." });
    }

    if ((fromYear || toYear) && (isNaN(fromYear) || isNaN(toYear))) {
        return res.status(400).json({ error: "Los parámetros 'from' y 'to' deben ser años válidos." });
    }

    if (fromYear > toYear) {
        return res.status(400).json({ error: "El parámetro 'from' debe ser menor o igual que 'to'." });
    }

    // Leer el archivo JSON
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        try {
            const jsonData = JSON.parse(data);

            // Filtrar los datos para la comunidad autónoma
            let filteredData = jsonData.filter(item => 
                item.autonomous_community.toLowerCase() === autonomousCommunity.toLowerCase()
            );

            // Aplicar filtro por año único si se proporciona
            if (singleYear) {
                filteredData = filteredData.filter(item => item.year === singleYear);
            } 
            // Aplicar filtro por rango de años si se proporciona
            else if (fromYear && toYear) {
                filteredData = filteredData.filter(item => 
                    item.year >= fromYear && item.year <= toYear
                );
            }

            // Aplicar filtro por nivel educativo si se proporciona
            if (educationLevel) {
                filteredData = filteredData.filter(item => 
                    item.education_level.toLowerCase() === educationLevel.toLowerCase()
                );
            }

            res.json(filteredData);
        } catch (parseError) {
            console.error("Error parseando JSON", parseError);
            res.status(500).json({ error: "Error en el formato de los datos almacenados" });
        }
    });
});


/****************************************************
 * POST - Crea un nuevo dato para employment-data
 ****************************************************/

router.post("/employment-data", (req, res) => {
    
    const newData = req.body;
    
    // Verificar que se proporcionen todos los campos obligatorios
    if (!newData.autonomous_community || !newData.year || !newData.education_level||
        !newData.activity_rate || !newData.employment_rate || !newData.unemployment_rate) {
        return res.status(400).json({ 
            error: "Datos incompletos. Se requieren todos los datos para poder realizar el POST."
        });
    }

    // Verificar que los campos numéricos sean realmente números
    if (isNaN(newData.year) || isNaN(newData.activity_rate) || 
        isNaN(newData.employment_rate) || isNaN(newData.unemployment_rate)) {
        return res.status(400).json({ 
            error: "Los campos numéricos (year, activity_rate, employment_rate, unemployment_rate) deben ser valores numéricos."
        });
    }
    
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        
        try {
            console.log("POST request to /employment-data");
            let jsonData = JSON.parse(data);
            
            // Comprobar si ya existe un registro con los mismos identificadores
            const exists = jsonData.some(item => 
                item.autonomous_community.toLowerCase() === newData.autonomous_community.toLowerCase() &&
                item.year === newData.year &&
                item.education_level.toLowerCase() === newData.education_level.toLowerCase()
            );
            
            //Backlog: No se puede hacer un POST con un recurso que ya existe; en el caso contrario se debe devolver el código 409.
            if (exists) {
                return res.status(409).json({ 
                    error: "Ya existe un registro con estos identificadores" 
                });
            }

            // Convertir los campos numéricos a números
            newData.year = parseInt(newData.year);
            newData.activity_rate = parseFloat(newData.activity_rate);
            newData.employment_rate = parseFloat(newData.employment_rate);
            newData.unemployment_rate = parseFloat(newData.unemployment_rate);
            
            // Añadir el nuevo registro
            jsonData.push(newData);
            
            // Guardar los datos actualizados.
            fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error("Error guardando los datos", err);
                    return res.status(500).json({ error: "Error interno del servidor" });
                }
                
                // Devolver código 201 CREATED sin datos
                res.status(201).send();
            });
        } catch (parseError) {
            console.error("Error parseando JSON", parseError);
            res.status(500).json({ error: "Error en el formato de los datos almacenados" });
        }
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
 * DELETE - Borra todos los datos de empleo
 ****************************************************/

router.delete("/employment-data", (req, res) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        
        try {
            console.log("DELETE request to /employment-data");
            
            // Sobrescribir con un array vacío
            fs.writeFile(dataFilePath, JSON.stringify([], null, 2), (err) => {
                if (err) {
                    console.error("Error guardando los datos", err);
                    return res.status(500).json({ error: "Error interno del servidor" });
                }
                
                res.status(200).json({ message: "Todos los datos han sido eliminados" });
            });
        } catch (parseError) {
            console.error("Error parseando JSON", parseError);
            res.status(500).json({ error: "Error en el formato de los datos almacenados" });
        }
    });
});


/****************************************************
 * GET - Obtener un recuso en específico. Respuesta de tipo OBJECT
 ****************************************************/

router.get("/employment-data/:autonomous_community/:year/:education_level", (req, res) => {
    // Obtener parámetros de la URL
    const { autonomous_community, year, education_level } = req.params;

    // Backlog: Si se recibe un dato (JSON) que no tiene los campos esperados se debe devolver el código 400
    if (!autonomous_community || !year || !education_level) {
        return res.status(400).json({ 
            error: "Se requieren todos los parámetros (autonomous_community, year, education_level)" 
        });
    }
    
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        
        try {
            console.log(`GET request to specific employment data: ${autonomous_community}/${year}/${education_level}`);
            const jsonData = JSON.parse(data);
            
            const yearNum = parseInt(year);
            
            const specificData = jsonData.find(item => 
                item.autonomous_community.toLowerCase() === autonomous_community.toLowerCase() &&
                item.year === yearNum &&
                item.education_level.toLowerCase() === education_level.toLowerCase()
            );
            
            //Backlog: Si se intenta acceder a un recurso inexistente se debe devolver el código 404
            if (specificData) {
                res.json(specificData);
            } else {
                res.status(404).json({ error: "No se encontraron datos para los criterios especificados" });
            }
        } catch (parseError) {
            console.error("Error parseando JSON", parseError);
            res.status(500).json({ error: "Error en el formato de los datos almacenados" });
        }
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
    const yearNum = parseInt(year);
    const updatedData = req.body;
    

    // Backlog: Si se recibe un dato (JSON) que no tiene los campos esperados se debe devolver el código 400
    if (!autonomous_community || !year || !education_level) {
        return res.status(400).json({ 
            error: "Se requieren todos los parámetros (autonomous_community, year, education_level)" 
        });
    }
    // Verificar que el año sea un número válido
    if (isNaN(yearNum)) {
        return res.status(400).json({ error: "El año debe ser un valor numérico" });
    }
    
    // Backlog:Un dato pasado con un PUT debe contener el mismo id del recurso al que se especifica en la URL; en caso contrario se debe devolver el código 400.
    if (updatedData.autonomous_community || updatedData.year || updatedData.education_level) {
        return res.status(400).json({ 
            error: "No se pueden modificar los campos identificadores (autonomous_community, year, education_level)" 
        });
    }

    // Verificar que los campos numéricos sean realmente números
    if ((updatedData.activity_rate !== undefined && isNaN(updatedData.activity_rate)) || 
        (updatedData.employment_rate !== undefined && isNaN(updatedData.employment_rate)) || 
        (updatedData.unemployment_rate !== undefined && isNaN(updatedData.unemployment_rate))) {
        return res.status(400).json({ 
            error: "Los campos numéricos (activity_rate, employment_rate, unemployment_rate) deben ser valores numéricos." 
        });
    }
    
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo JSON", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        
        try {
            console.log(`PUT request to update employment data: ${autonomous_community}/${year}/${education_level}`);
            let jsonData = JSON.parse(data);
            
            const index = jsonData.findIndex(item => 
                item.autonomous_community.toLowerCase() === autonomous_community.toLowerCase() &&
                item.year === yearNum &&
                item.education_level.toLowerCase() === education_level.toLowerCase()
            );
            
            //Backlog: Error 404, Si se intenta actualizar un recurso inexistente
            if (index === -1) {
                return res.status(404).json({ error: "No se encontró el dato para actualizar" });
            }

            // Convertir los campos numéricos a números
            if (updatedData.activity_rate !== undefined) updatedData.activity_rate = parseFloat(updatedData.activity_rate);
            if (updatedData.employment_rate !== undefined) updatedData.employment_rate = parseFloat(updatedData.employment_rate);
            if (updatedData.unemployment_rate !== undefined) updatedData.unemployment_rate = parseFloat(updatedData.unemployment_rate);
            
            jsonData[index] = { 
                ...jsonData[index], 
                ...updatedData 
            };
            
            fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error("Error guardando los datos", err);
                    return res.status(500).json({ error: "Error interno del servidor" });
                }
                
                res.status(200).json({ message: "Dato actualizado correctamente" });
            });
        } catch (parseError) {
            console.error("Error parseando JSON", parseError);
            res.status(500).json({ error: "Error en el formato de los datos almacenados" });
        }
    });
});


/****************************************************
 * DELETE - Elimina un dato específico
 ****************************************************/

router.delete("/employment-data/:autonomous_community/:year/:education_level", (req, res) => {
    const { autonomous_community, year, education_level } = req.params;

    // Backlog: Si se recibe un dato (JSON) que no tiene los campos esperados se debe devolver el código 400
    if (!autonomous_community || !year || !education_level) {
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
            console.log(`DELETE request for employment data: ${autonomous_community}/${year}/${education_level}`);
            let jsonData = JSON.parse(data);
            
            const initialLength = jsonData.length;
            jsonData = jsonData.filter(item => 
                !(item.autonomous_community.toLowerCase() === autonomous_community.toLowerCase() &&
                item.year === yearNum &&
                item.education_level.toLowerCase() === education_level.toLowerCase())
            );
            
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


/****************************************************
 * GET - Cargar datos iniciales desde initial-jdp-data.json si el archivo de datos está vacío
 ****************************************************/

router.get("/employment-data/loadInitialData", (req, res) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            // Si hay un error al leer el archivo, asumimos que el archivo no existe o está vacío
            console.error("Error leyendo el archivo JSON, inicializando con datos iniciales.", err);
        } else {
            try {
                const JDPData = JSON.parse(data);
                if (JDPData.length > 0) {
                    // Si el archivo ya tiene datos, devolver un mensaje y los datos existentes
                    return res.status(200).json({ message: "Los datos ya estaban inicializados", data: JDPData });
                }
            } catch (parseError) {
                // Si hay un error al parsear el JSON, asumimos que el archivo está corrupto
                console.error("Error parseando JSON, inicializando con datos iniciales.", parseError);
            }
        }

        // Guardar los datos iniciales directamente
        fs.writeFile(dataFilePath, JSON.stringify(initialData, null, 2), (err) => {
            if (err) {
                console.error("Error guardando datos iniciales", err);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
            // Devolver un mensaje de éxito y los datos iniciales
            res.status(201).json({ message: "Datos inicializados correctamente", data: initialData });
        });
    });
});

module.exports = router;