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
        console.log(arregloMesclas);
    }
}

var compraPocionesBrujo = [
    { azul: 2 },
    { azul: 2 },
    { azul: 2 },
    { azul: 1 },
    { azul: 1 },
]

calculoDanioPocionesBrujo(compraPocionesBrujo)