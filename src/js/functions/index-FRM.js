const xlsx = require('xlsx');
const fs = require('fs');
const path = require("path");

// Ruta del archivo de salida
const outputDir = path.join(__dirname, '../../json');
const outputFile = path.join(outputDir, 'data-frm.json');

// Cargar Excel y seleccionar la primera hoja
const fileXLSX = xlsx.readFile(path.join(__dirname, "../../data/data-frm.xlsx"));
const sheetName = fileXLSX.SheetNames[0];
const sheet = fileXLSX.Sheets[sheetName];

// Convertir a JSON y guardar en un archivo
const data = xlsx.utils.sheet_to_json(sheet);
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));


function getFRMData(ccaa) {
    // Cálculo de la tasa media de matriculación de cada ciclo formativo desde 2020 hasta 2023
    const filteredData = data.filter(item => item.autonomous_community === ccaa);

    if (filteredData.length === 0) {
        console.warn(`No data found for the autonomous community: ${ccaa}`);
        return {
            autonomous_community: ccaa,
            basic_training: "N/A",
            middle_grade: "N/A",
            higher_grade: "N/A"
        };
    }
    
    const totals = filteredData.reduce((acc, item) => {
        acc.basic += item.basic_fp || 0;
        acc.middle += item.middle_grade || 0;
        acc.higher += item.higher_grade || 0;
        return acc;
    }, { basic: 0, middle: 0, higher: 0 });

    const totalCount = filteredData.length;
    const avg = (total, count) => (count > 0 ? (total / count).toFixed(2) : "0.00");

    return {
        autonomous_community: ccaa,
        basic_training: avg(totals.basic, totalCount),
        middle_grade: avg(totals.middle, totalCount),
        higher_grade: avg(totals.higher, totalCount)
    };
}


module.exports = getFRMData;