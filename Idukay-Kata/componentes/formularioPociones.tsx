import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import { calculoDanioPocionesBrujo } from '../funciones/kata';
import { pociones } from '../constantes/pociones.constantes';


export const PocionesFormulario = ({campos}: any)=> {
    const keysCampo = Object.keys(campos);
    const pocionesValores:any[] = [] ;    

    const escucharCambios = (valor: string, posicion: number = 0) => {                
        let pocion:{[key: string]: number} = {}
        pocion[pociones[posicion]] = +valor
        pocionesValores.push(pocion)                
    };

    return (
        <View>
            {keysCampo.map((llave) => {
                const campo = campos[llave];
                return (
                    <View key={llave}>
                        <Text>{campo.label}</Text>
                        <TextInput
                            {...campo.input}
                            keyboardType={'numeric'}
                            onChangeText={
                                (texto) => escucharCambios(texto, campo.input.posicion)
                            }
                        />
                    </View>
                )
            })}
            <Button
                title={'Encontrar mejor combinación'}
                onPress={
                    () => calculoDanioPocionesBrujo(pocionesValores)
                }
            />
        </View>
    )
}