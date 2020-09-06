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
                    let clonPocionBrujo = Object.assign({}, pocion);
                    let keyPocionBrujo = Object.keys(pocion);
                    let numeroPocionesBrujo = pocion[keyPocionBrujo];
                    let numeroClonPocionesBrujo = clonPocionBrujo[keyPocionBrujo];
                    if (numeroClonPocionesBrujo > 1) {
                        pocion[keyPocionBrujo] = numeroClonPocionesBrujo - 1;
                        numeroClonPocionesBrujo = 1;
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
        let respuetaOpcionUno = [];
        let respuetaOpcionDos = [];
        let acumuladorPocionesMescla = 0;
        let acumuladorPocionesIndividual = 0;
        let ataque = {};
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
                ataque = {
                    mescla: {
                        arreglo: mesclasArreglo,
                        danio: danioMescla,
                    }
                }
                respuetaOpcionUno.push(ataque);
            } else {
                ataque = {
                    individual: {
                        arreglo: mesclasArreglo,
                        danio: acumuladorPocionesIndividual,
                    }
                }
                respuetaOpcionUno.push(ataque);
            }


            if (danioMescla < acumuladorPocionesIndividual) {
                ataque = {
                    mescla: {
                        arreglo: mesclasArreglo,
                        danio: danioMescla,
                    }
                }
                respuetaOpcionDos.push(ataque);
            } else if (danioMescla > acumuladorPocionesIndividual) {
                ataque = {
                    mescla: {
                        arreglo: mesclasArreglo,
                        danio: danioMescla,
                    }
                }
                respuetaOpcionDos.push(ataque);
            } else {
                ataque = {
                    individual: {
                        arreglo: mesclasArreglo,
                        danio: acumuladorPocionesIndividual,
                    }
                }
                respuetaOpcionDos.push(ataque);
            }
        }
    }
}

function construccionRespuesta(opcionAtaque) {
let totalDanioPociones = 0;
let respuestaMesclas = [];
}

var compraPocionesBrujo = [
    { azul: 2 },
    { azul: 2 },
    { azul: 2 },
    { azul: 1 },
    { azul: 1 },
]

calculoDanioPocionesBrujo(compraPocionesBrujo)