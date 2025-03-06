const xlsx = require('xlsx');
const fs = require('fs');
const path = require("path");

// Ruta del archivo de salida
const outputDir = path.join(__dirname, '../../json');
const outputFile = path.join(outputDir, 'data-pdg.json');

// Cargar Excel y seleccionar la primera hoja
const fileXLSX = xlsx.readFile(path.join(__dirname, "../../data/data-pdg.xlsx"));
const sheetName = fileXLSX.SheetNames[0];
const sheet = fileXLSX.Sheets[sheetName];

// Convertir a JSON y guardar en un archivo
const data = xlsx.utils.sheet_to_json(sheet);
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));

// Función para calcular las medias
function getPDGData(ccaa) {
    // Filtramos los datos por comunidad autónoma (ccaa)
    const filteredData = data.filter(item => item.autonomous_community === ccaa);

    if (filteredData.length === 0) {
        console.warn(`No data found for the autonomous community: ${ccaa}`);
        return {
            autonomous_community: ccaa,
            criminal_ofense_avg: "N/A",
            cybersecurity_avg: "N/A",
            arrested_investigated_avg: "N/A"
        };
    }
    
    // Inicializamos las sumas de cada campo
    const totals = filteredData.reduce((acc, item) => {
        acc.criminal_ofense += item.criminal_ofense || 0;
        acc.cybersecurity += item.cybersecurity || 0;
        acc.arrested_investigated += item.arrested_investigated || 0;
        return acc;
    }, { criminal_ofense: 0, cybersecurity: 0, arrested_investigated: 0 });

    // Contamos el total de registros para la comunidad autónoma
    const totalCount = filteredData.length;
    
    // Función para calcular la media
    const avg = (total, count) => (count > 0 ? (total / count).toFixed(2) : "0.00");

    // Devolvemos el objeto con los resultados
    return {
        autonomous_community: ccaa,
        criminal_ofense_avg: avg(totals.criminal_ofense, totalCount),
        cybersecurity_avg: avg(totals.cybersecurity, totalCount),
        arrested_investigated_avg: avg(totals.arrested_investigated, totalCount)
    };
}

module.exports = getPDGData;
