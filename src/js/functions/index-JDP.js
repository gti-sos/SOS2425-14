// 1.Tener un archivo llamado “index-YYY.js” en el repositorio SOS2425-XX que contenga el código de una aplicación en nodejs (similar a lo que se vió en el L03) que realice el siguiente algoritmo (siendo YYY las siglas del alumno):
//      a. Inicializa un array con los datos de ejemplo pestaña individual de la ficha de trabajo.
//      b. Realice un algoritmo usando iteradores (forEach, Map, filter, …) que permita calcular la media de valores de alguna de los campos numéricos del subconjunto de filas que comparten un determinado valor en el campo de información geográfica.
//      c. Al hacer “node index-YYY.js” se muestra el resultado del cálculo.

const data = [
    {autonomous_community: "TOTAL", year: 2024, education_level: "TOTAL", activity_rate: 82.6, employment_rate: 74.17, unemployment_rate: 10.21},
    {autonomous_community: "Andalucía", year: 2023, education_level: "InferiorSecundaria", activity_rate: 70.38, employment_rate: 53.73, unemployment_rate: 23.66},
    {autonomous_community: "Andalucía", year: 2021, education_level: "InferiorSecundaria", activity_rate: 70.55, employment_rate: 51.3, unemployment_rate: 27.28},
    {autonomous_community: "Aragón", year: 2021, education_level: "E. Superior", activity_rate: 89.54, employment_rate: 83.65, unemployment_rate: 6.57},
    {autonomous_community: "Galicia", year: 2024, education_level: "Secundaria", activity_rate: 81.45, employment_rate: 74.06, unemployment_rate: 9.08},
    {autonomous_community: "Madrid", year: 2023, education_level: "Secundaria", activity_rate: 77.54, employment_rate: 67.2, unemployment_rate: 13.33},	
    {autonomous_community: "Murcia", year: 2022, education_level: "Secundaria", activity_rate: 84.87, employment_rate: 73.92, unemployment_rate: 12.9},
    { autonomous_community: "Murcia", year: 2023, education_level: "E. Superior", activity_rate: 88.94, employment_rate: 82.66, unemployment_rate: 7.07 },
    { autonomous_community: "Navarra", year: 2023, education_level: "InferiorSecundaria", activity_rate: 72.05, employment_rate: 61.86, unemployment_rate: 14.14 },
    { autonomous_community: "Navarra", year: 2024, education_level: "E. Superior", activity_rate: 91.4, employment_rate: 87.76, unemployment_rate: 3.98 },
    { autonomous_community: "Extremadura", year: 2022, education_level: "InferiorSecundaria", activity_rate: 70.69, employment_rate: 54.86, unemployment_rate: 22.39 },
    { autonomous_community: "Extremadura", year: 2024, education_level: "E. Superior", activity_rate: 89.69, employment_rate: 80.85, unemployment_rate: 9.86 },
    { autonomous_community: "Cataluña", year: 2024, education_level: "E. Superior", activity_rate: 91.55, employment_rate: 87.45, unemployment_rate: 4.48 }								
];

const ccaa = "Navarra";  //defino la constante navarra

const filteredData = data.filter(item => item.autonomous_community === ccaa);   //filteredData contiene solo las entradas con ccaa "Navarra"


const getAvg = (field) => {
    const values = filteredData.map(item => item[field]);  //En values se almacenan los datos numermicos del campo seleccionado
    const sum = values.reduce((acc, valor) => acc + valor, 0); // Calcula la suma
    return values.length > 0 ? sum / values.length : 0;  //Devuelve la media, asegurando no dividir por cero
};

const activityAvg = getAvg("activity_rate");
const employmentAvg = getAvg("employment_rate");
const unemploymentAvg = getAvg("unemployment_rate");

//Imprimimos por pantalla

console.log(`Media de la tasa de actividad en ${ccaa}: ${activityAvg}`);
console.log(`Media de la tasa de empleo en ${ccaa}: ${employmentAvg}`);
console.log(`Media de la tasa de paro en ${ccaa}: ${unemploymentAvg}`);

