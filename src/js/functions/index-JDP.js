const fs = require("fs");    //modulo de node.js para manejar archivos
const Papa = require("papaparse");  //librería para convertir csv a JSON

// Ruta del archivo CSV
const fileCSV = "../../datafiles/data-jdp.csv";

// Función para leer el CSV y convertirlo a un array de objetos
function readCSV(fileroute) {

    const content = fs.readFileSync(fileroute, "utf8");

    // Parsear el CSV a JSON
    const result = Papa.parse(content, {
        header: true,  // Usa la primera fila como nombres de clave
        skipEmptyLines: true // Omitir líneas vacías
    });

    // Convertir cada fila en el formato deseado
    return result.data.map(fila => ({
        autonomous_community: fila["autonomous_community"] || "",
        year: !isNaN(parseInt(fila["year"], 10)) ? parseInt(fila["year"], 10) : null,
        education_level: fila["education_level"] || "",
        activity_rate: !isNaN(parseFloat(fila["activity_rate"])) ? parseFloat(fila["activity_rate"]) : null,
        employment_rate: !isNaN(parseFloat(fila["employment_rate"])) ? parseFloat(fila["employment_rate"]) : null,
        unemployment_rate: !isNaN(parseFloat(fila["unemployment_rate"])) ? parseFloat(fila["unemployment_rate"]) : null
    }));
}

// Leer y mostrar los datos en el formato deseado
const data = readCSV(fileCSV);


const ccaa = "Navarra";  //defino la constante navarra

const filteredData = data.filter(item => item.autonomous_community.includes(ccaa));   //filteredData contiene solo las entradas con ccaa "Navarra"

const getAvg = (field) => {
    const values = filteredData.map(item => item[field]);  //En values se almacenan los datos numermicos del campo seleccionado
    const sum = values.reduce((acc, valor) => acc + valor, 0); // Calcula la suma
    return values.length > 0 ? sum / values.length : 0;  //Devuelve la media, asegurando no dividir por cero
};

const activityAvg = getAvg("activity_rate");
const employmentAvg = getAvg("employment_rate");
const unemploymentAvg = getAvg("unemployment_rate");

//Imprimimos por pantalla

console.log(`Media de la tasa de actividad en ${ccaa}: ${activityAvg.toFixed(2)}`);
console.log(`Media de la tasa de empleo en ${ccaa}: ${employmentAvg.toFixed(2)}`);
console.log(`Media de la tasa de paro en ${ccaa}: ${unemploymentAvg.toFixed(2)}`);

