const danio = require('../constantes/danioPociones.constante');
import {Alert} from 'react-native';
import * as React from 'react';
var arregloClonPociones: any;
var arregloPociones: any;
var arregloMesclaPociones: any;
var arregloMesclas: any = [];
export function calculoDanioPocionesBrujo(arregloPocionesBrujo: any):any {
    arregloClonPociones = [];
    arregloPociones = [];
    arregloMesclaPociones = []
    if (arregloPocionesBrujo.length > 0) {
        arregloPocionesBrujo
            .forEach(
                (pocion: any) => {
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
                    (pocion: any) => {
                        let keyPocion: any = Object.keys(pocion);
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

    var respuestaUno = 'Respuesta 1:'+'\n';
    var respuestaDos = 'Respuesta 2:'+'\n';
    var respuestaFinal = '';
    let ataqueOpcionUno = construccionRespuesta(respuetaOpcionUno);
    console.log('Respuesta 1:')
    ataqueOpcionUno
        .respuestaMesclas
        .forEach((item, indice) => {
            console.log(`Ataque ${indice + 1}: ${item}`)
            respuestaUno += `Ataque ${indice + 1}: ${item}`+'\n';
        })
        respuestaUno += `Total: el brujo ha causado un ${ataqueOpcionUno.totalDanioPociones}% de daño.`
    console.log(`Total: el brujo ha causado un ${ataqueOpcionUno.totalDanioPociones}% de daño.`);

    var ataqueOpcionDos = construccionRespuesta(respuetaOpcionDos)
    console.log('Respuesta 2:')
    ataqueOpcionDos
        .respuestaMesclas
        .forEach((item, indice) => {
            respuestaDos += `Ataque ${indice + 1}: ${item}`+'\n';
            console.log(`Ataque ${indice + 1}: ${item}`)
        })
        respuestaDos += `Total: el brujo ha causado un ${ataqueOpcionDos.totalDanioPociones}% de daño.`;
    console.log(`Total: el brujo ha causado un ${ataqueOpcionDos.totalDanioPociones}% de daño.`);
    if (ataqueOpcionUno.totalDanioPociones > ataqueOpcionDos.totalDanioPociones) {
        respuestaFinal = `Por lo tanto la respuesta correcta en estas combinaciones es la 1er.`
        console.log(`Por lo tanto la respuesta correcta en estas combinaciones es la 1er.`)
    } else {
        respuestaFinal = `Por lo tanto la respuesta correcta en estas combinaciones es la 2da.`
        console.log(`Por lo tanto la respuesta correcta en estas combinaciones es la 2da.`)
    }
    console.log(respuestaUno);
    console.log(respuestaDos);
    
    Alert.alert(
        respuestaUno + '\n' + respuestaDos,        
        respuestaFinal,                
    )
}

function construccionRespuesta(opcionAtaque: any) {
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
                    var key: any = Object.keys(itemPociones);
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

