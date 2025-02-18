// 1.Tener un archivo llamado “index-YYY.js” en el repositorio SOS2425-XX que contenga el código de una aplicación en nodejs (similar a lo que se vió en el L03) que realice el siguiente algoritmo (siendo YYY las siglas del alumno):
//      a. Inicializa un array con los datos de ejemplo pestaña individual de la ficha de trabajo.
//      b. Realice un algoritmo usando iteradores (forEach, Map, filter, …) que permita calcular la media de valores de alguna de los campos numéricos del subconjunto de filas que comparten un determinado valor en el campo de información geográfica.
//      c. Al hacer “node index-YYY.js” se muestra el resultado del cálculo.

const data = [
    { ccaa: "Andalucía", poblacion: 8400000, pib: 160000, desempleo: 18.5 },
    { ccaa: "Cataluña", poblacion: 7700000, pib: 260000, desempleo: 12.3 },
    { ccaa: "Madrid", poblacion: 6800000, pib: 240000, desempleo: 11.0 },
    { ccaa: "Valencia", poblacion: 5000000, pib: 130000, desempleo: 14.8 },
    { ccaa: "Galicia", poblacion: 2700000, pib: 62000, desempleo: 10.5 },
    { ccaa: "Castilla y León", poblacion: 2400000, pib: 59000, desempleo: 9.7 },
    { ccaa: "País Vasco", poblacion: 2200000, pib: 75000, desempleo: 8.9 },
    { ccaa: "Canarias", poblacion: 2200000, pib: 49000, desempleo: 20.1 },
    { ccaa: "Aragón", poblacion: 1300000, pib: 41000, desempleo: 9.3 },
    { ccaa: "Castilla-La Mancha", poblacion: 2000000, pib: 52000, desempleo: 12.0 }
];

// Calcular media de desempleo
const mediaDesempleo = () => {
    let sumDesempleo = 0;
    let media = 0;
    data.forEach(ca => {
        sumDesempleo+=ca.desempleo;
    })
    media = sumDesempleo / data.length
    return media;
}

// Calcular ccaa que superan la media de desemppleo
const ccaaMasDesempleo = () => {
    let media = mediaDesempleo();
    let ccaa = [];
    data.forEach(ca => {
        if(ca.desempleo > media){
            ccaa.push(ca.ccaa);
        }
    })
    console.log(`CCAA por encima de la media de desempleo: ${ccaa} \n`);
}

ccaaMasDesempleo();

//Insertar dato: Total de España (si no se encuentra)
const totalEspaña = () => {
    const ccaa = "España";
    let poblacion = 0;
    let pib = 0;
    data.forEach(ca => {
        poblacion += ca.poblacion;
        pib += ca.pib;
    })
    if(!data.some(ca => ca.ccaa === ccaa)){
        data.push({
            'ccaa':ccaa,
            'poblacion':poblacion,
            'pib':pib,
            'desempleo':mediaDesempleo()
        })
        return true;
    }else{
        return false;
    }
}
console.log(`Media de desempleo: ${mediaDesempleo}`);
console.log(totalEspaña() ? `Se han añadido correctamente los datos\n` : `Los datos ya existen \n`);