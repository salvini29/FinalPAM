import * as React from 'react';
import { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
  Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { CommonActions, useNavigation } from '@react-navigation/native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Perfil from './Perfil';
import TestScreen2 from './TestScreen2';
import Agregar from './Agregar';
import Lista from './Lista';
import { useForm } from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';


var widtht = Dimensions.get('window').width; //full width
var heightt = Dimensions.get('window').height; //full height


export default function Compartir({navigation}) {

    const [codigo, setCodigo] = useState('');
    const [lista, setLista] = useState('');
    const [alista, setAlista] = useState('');

    async function testfun(key) { 
        try {
          var value = await AsyncStorage.getItem(key);
          //console.log(JSON.parse(value))
          return true;
        }
        catch(exception) {
          return false;
        }
    }

    async function crearLista()
    {
      var listaSeleccionada = await AsyncStorage.getItem(lista);
      let responseApi;
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          codigo: codigo,
          nombre: lista,
          lista: listaSeleccionada
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }
      fetch('http://10.0.2.2:8000/createLista', data)
              .then(response => response.json())  // promise
              .then(json => { 
                  
                  Alert.alert(
                    "Enhorabuena",
                    "La lista se puede compartir!",
                    [
                      { text: "OK" }
                    ]
                  );

                  return console.log(json);  
                })
    }
    async function agregarLista()
    {
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
            'codigob': alista
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }
      return fetch('http://10.0.2.2:8000/searchLista', data)
              .then(response => response.json())  // promise
              .then(json => {
                //console.log(json["lista"]);
                AsyncStorage.removeItem("Lista6");
                AsyncStorage.removeItem("Test4");
                AsyncStorage.setItem(json["nombre"],json["lista"]);

                Alert.alert(
                    "Enhorabuena",
                    "La lista se ha agregado!",
                    [
                      { text: "OK" }
                    ]
                );

              })
    }

    return (
      <View style={styles.container}>
          <TextInput
            style={styles.input}
            autoCompleteType="off"
            placeholder="Codigo"
            value={codigo}
            style={{ borderWidth: 2, borderColor:'#FF6365', margin: 5, width: 300 }}
            onChangeText={text => setCodigo(text)}
          />
          <TextInput
            style={styles.input}
            autoCompleteType="off"
            placeholder="Lista"
            value={lista}
            style={{ borderWidth: 2, borderColor:'#FF6365', margin: 20, width: 300 }}
            onChangeText={text => setLista(text)}
          />
          <Pressable style={styles.submit} onPress={() => crearLista()}>
            <Text style={styles.textStyle}>COMPARTIR LISTA</Text>
          </Pressable>

          <TextInput
            style={styles.input}
            autoCompleteType="off"
            placeholder="Codigo lista a agregar"
            value={alista}
            style={{ borderWidth: 2, borderColor:'#FF6365', marginTop: 100, marginBottom: 20, width: 300 }}
            onChangeText={text => setAlista(text)}
          />
          <Pressable style={styles.submit} onPress={() => agregarLista()}>
            <Text style={styles.textStyle}>AGREGAR</Text>
          </Pressable>
      </View> 
    );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent: 'center',
    },
    submit: {
      width: 300,
      backgroundColor: '#DC5052',
      borderRadius: 1,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
});
