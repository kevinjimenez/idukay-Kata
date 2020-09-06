const danio = require('./constantes/danioPociones.constante');
var arregloClonPociones;
var arregloPociones;
var arregloMesclaPociones;
var arregloMesclas = [];
function calculoDanioPocionesBrujo(arregloPocionesBrujo) {
    arregloClonPociones = [];
    arregloPociones = [];
    arregloMesclaPociones = []
    if (arregloPocionesBrujo.length > 0) {
        arregloPocionesBrujo
            .forEach(
                pocion => {
                    var clonPocionBrujo = Object.assign({}, pocion);
                    var keyPocionBrujo = Object.keys(pocion)[0];
                    if (pocion[keyPocionBrujo] > 1) {
                        pocion[keyPocionBrujo] = pocion[keyPocionBrujo] - 1;
                        clonPocionBrujo[keyPocionBrujo] = 1;
                        arregloClonPociones.push(clonPocionBrujo);
                        arregloPociones.push(pocion);
                    } else {
                        arregloMesclaPociones.push(pocion);
                    }
                });
        arregloMesclaPociones = [...arregloMesclaPociones, ...arregloClonPociones];
        arregloMesclas.push(arregloMesclaPociones);
        return calculoDanioPocionesBrujo(arregloPociones);
    } else {
        var respuetaOpcionUno = [];
        var respuetaOpcionDos = [];
        var acumuladorPocionesMescla = 0;
        var acumuladorPocionesIndividual = 0;
        for (const mesclasArreglo of arregloMesclas) {
            acumuladorPocionesMescla = 0;
            acumuladorPocionesIndividual = 0;
            mesclasArreglo
                .forEach(
                    (pocion) => {
                        let keyPocion = Object.keys(pocion);
                        let numeroPociones = pocion[keyPocion];
                        let valorDanio = danio.danioPociones[numeroPociones];
                        acumuladorPocionesMescla += numeroPociones;
                        acumuladorPocionesIndividual += valorDanio;
                    });
            let danioMescla = danio.danioPociones[acumuladorPocionesMescla];

            if (danioMescla > acumuladorPocionesIndividual) {
                respuetaOpcionUno
                    .push({ mescla: { danio: danioMescla, arreglo: mesclasArreglo } });
            } else {
                respuetaOpcionUno
                    .push({ individual: { danio: acumuladorPocionesIndividual, arreglo: mesclasArreglo } });
            }


            if (danioMescla < acumuladorPocionesIndividual) {                
                respuetaOpcionDos
                .push({ mescla: { danio: danioMescla, arreglo: mesclasArreglo } });
            } else if (danioMescla > acumuladorPocionesIndividual) {                
                respuetaOpcionDos
                .push({ mescla: { danio: danioMescla, arreglo: mesclasArreglo } });
            }else {            
                respuetaOpcionDos
                .push({ individual: { danio: acumuladorPocionesIndividual, arreglo: mesclasArreglo } });
            }
        }
    }    

    let ataqueOpcionUno = construccionRespuesta(respuetaOpcionUno);
    console.log('Respuesta 1:')
    ataqueOpcionUno
        .respuestaMesclas
        .forEach((item, indice) => {
            console.log(`Ataque ${indice + 1}: ${item}`)
        })
    console.log(`Total: el brujo ha causado un ${ataqueOpcionUno.totalDanioPociones}% de daño.`);

    var ataqueOpcionDos = construccionRespuesta(respuetaOpcionDos)
    console.log('Respuesta 2:')
    ataqueOpcionDos
        .respuestaMesclas
        .forEach((item, indice) => {
            console.log(`Ataque ${indice + 1}: ${item}`)
        })
    console.log(`Total: el brujo ha causado un ${ataqueOpcionDos.totalDanioPociones}% de daño.`);
    if (ataqueOpcionUno.totalDanioPociones > ataqueOpcionDos.totalDanioPociones) {
        console.log(`Por lo tanto la respuesta correcta en estas combinaciones es la 1er.`)
    } else {
        console.log(`Por lo tanto la respuesta correcta en estas combinaciones es la 2da.`)
    }
}

function construccionRespuesta(opcionAtaque) {
    let totalDanioPociones = 0;
    let respuestaMesclas = [];
    for (const item of opcionAtaque) {
        var keyJsonOpciones = Object.keys(item)[0];
        var arregloPociones = item[keyJsonOpciones].arreglo
        var valorJsonOpciones = item[keyJsonOpciones].danio
        switch (keyJsonOpciones) {
            case 'mescla':
                var mescla = `usar ${arregloPociones.length} pociones distintas causan un ${valorJsonOpciones}% de daño.`
                respuestaMesclas.push(mescla)
                totalDanioPociones += valorJsonOpciones;
                continue;
            case 'individual':
                for (const itemPociones of arregloPociones) {
                    var key = Object.keys(itemPociones);
                    var danioAtque = danio.danioPociones[itemPociones[key]];
                    var individual = `usar 1 poción causa un ${danio.danioPociones[itemPociones[key]]}% de daño.`
                    respuestaMesclas.push(individual)
                    totalDanioPociones += danioAtque;
                }
                break;
        }
    }
    return { respuestaMesclas, totalDanioPociones };
}

var compraPocionesBrujo = [
    { azul: 2 },
    { azul: 2 },
    { azul: 2 },
    { azul: 1 },
    { azul: 1 },
]

calculoDanioPocionesBrujo(compraPocionesBrujo)