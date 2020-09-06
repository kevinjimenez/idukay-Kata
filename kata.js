const danio = require('./constantes/danioPociones.constante');
var arrego

function calculoDanioPocionesBrujo(arregloPocionesBrujo) {
    if (arregloPocionesBrujo.length > 0) {
        arregloPocionesBrujo
            .forEach(
                pocion => {
                    let clonItemPocionBrujo = Object.assign({}, pocion);
                    let keyPocionBrujo = Object.keys(pocion);
                    let numeroPocionesBrujo = pocion[keyPocionBrujo];
                    let numeroClonPocionesBrujo = clonItemPocionBrujo[keyPocionBrujo];
                    if(numeroPocionesBrujo > 0){
                        numeroPocionesBrujo--;
                        numeroClonPocionesBrujo = 1
                    }else{

                    }
                });

    } else {

    }
}
