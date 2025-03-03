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


function getFRMData() {
    // Calculo de la tasa media de matriculación de cada ciclo formativo desde 2020 a 2023
    const ccaa = "TOTAL";
    const filteredData = data.filter(item => item.autonomous_community.includes(ccaa));
    let totalFP = 0.;
    let totalGM = 0.;
    let totalGS = 0.;
    filteredData.forEach(item => {
        totalFP += item.basic_fp;
        totalGM += item.middle_grade;
        totalGS += item.higher_grade;
    });
    res = {
        autonomous_community: ccaa,
        basic_fp: totalFP/filteredData.length,
        middle_grade: totalGM/filteredData.length,
        higher_grade: totalGS/filteredData.length
    };
    return res;
}
module.exports = getFRMData;