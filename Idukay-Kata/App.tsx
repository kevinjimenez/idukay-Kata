import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PocionesFormulario } from './componentes/formularioPociones';
import * as pociones from './constantes//pociones.constantes';

export default function App() {
  return (
    <View style={styles.container}>
    <PocionesFormulario
        campos={{
          roja: {
            label: pociones.pociones[0],
            input: {
              posicion: 0,
              placeholder: 'Ingrese el número de pociones rojas'
            }
          },
          azul: {
            label: pociones.pociones[1],
            input: {
              posicion: 1,
              placeholder: 'Ingrese el número de pociones azules'
            }
          },
          verde: {
            label: pociones.pociones[2],
            input: {
              posicion: 2,
              placeholder: 'Ingrese el número de pociones verdes'
            }
          },
          amarilla: {
            label: pociones.pociones[3],
            input: {
              posicion: 3,
              placeholder: 'Ingrese el número de pociones amarillas'
            }
          },
          gris: {
            label: pociones.pociones[4],
            input: {
              posicion: 4,
              placeholder: 'Ingrese el número de pociones grises'
            }
          }
        }}
    />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
