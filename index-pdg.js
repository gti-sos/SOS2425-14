// 1.Tener un archivo llamado “index-YYY.js” en el repositorio SOS2425-XX que contenga el código de una aplicación en nodejs (similar a lo que se vió en el L03) que realice el siguiente algoritmo (siendo YYY las siglas del alumno):
//      a. Inicializa un array con los datos de ejemplo pestaña individual de la ficha de trabajo.
//      b. Realice un algoritmo usando iteradores (forEach, Map, filter, …) que permita calcular la media de valores de alguna de los campos numéricos del subconjunto de filas que comparten un determinado valor en el campo de información geográfica.
//      c. Al hacer “node index-YYY.js” se muestra el resultado del cálculo.

// 1. Inicializamos la array con los datos de ejemplo
const data = [
    { ccaa: "TOTAL", criminal_ofense: 1766779, cybersecurity: 287963, arrested_investigated: 11280, year: 2020 },
    { ccaa: "Andalucía", criminal_ofense: 287594, cybersecurity: 39157, arrested_investigated: 2104, year: 2020 },
    { ccaa: "Aragón", criminal_ofense: 36024, cybersecurity: 7826, arrested_investigated: 297, year: 2020 },
    { ccaa: "Asturias, Principado de", criminal_ofense: 24324, cybersecurity: 6225, arrested_investigated: 191, year: 2020 },
    { ccaa: "Baleares, Illes", criminal_ofense: 59750, cybersecurity: 11800, arrested_investigated: 167, year: 2020 },
    { ccaa: "Canarias", criminal_ofense: 83635, cybersecurity: 14449, arrested_investigated: 512, year: 2020 },
    { ccaa: "Cantabria", criminal_ofense: 16585, cybersecurity: 2885, arrested_investigated: 93, year: 2020 },
    { ccaa: "Castilla y León", criminal_ofense: 65025, cybersecurity: 15457, arrested_investigated: 531, year: 2020 },
    { ccaa: "Castilla-La Mancha", criminal_ofense: 61908, cybersecurity: 9963, arrested_investigated: 751, year: 2020 },
    { ccaa: "Cataluña", criminal_ofense: 353052, cybersecurity: 48794, arrested_investigated: 647, year: 2020 },
    { ccaa: "Andalucía", criminal_ofense: 314894, cybersecurity: 42493, arrested_investigated: 2212, year: 2021 },
    { ccaa: "Aragón", criminal_ofense: 41796, cybersecurity: 8461, arrested_investigated: 345, year: 2021 },
    { ccaa: "Andalucía", criminal_ofense: 379133, cybersecurity: 56908, arrested_investigated: 2607, year: 2022 }
];

// 2. definimos el algoritmo para calcular la media de un campo númerico filtrando por comunidad autónoma
const getAverage = (ca, field) => {
    const filteredData = data.filter(entry => entry.ccaa === ca);// Filtramos los datos que coinciden con la ccaa seleccionada
    if (filteredData.length === 0) {     // Si no hay datos, devolver 0
        console.log(`No hay datos para la comunidad autónoma: ${ca}`);
        return 0;
    }

    // Extraemos los valor del campo seleccionado y calculamos la media
    const values = filteredData.map(entry => entry[field]);
    const sum = values.reduce((acc, value) => acc + value, 0);
    const average = sum / values.length;

    return average;
};

//Seleccionamos la comunidad autónoma
const ca = "Andalucía";  // probamos con Andalucía

//Realizamos el calculo de las medias
const avgCriminalOffense = getAverage(ca, "criminal_ofense");
const avgCybersecurity = getAverage(ca, "cybersecurity");
const avgArrestedInvestigated = getAverage(ca, "arrested_investigated");

// Mostramos los resultados por pantalla
console.log(`Media de delitos criminales en ${ca}: ${avgCriminalOffense}`);
console.log(`Media de ciberseguridad en ${ca}: ${avgCybersecurity}`);
console.log(`Media de detenidos/investigados en ${ca}: ${avgArrestedInvestigated}`);
