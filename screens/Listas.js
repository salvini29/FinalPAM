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
  Image,
  Modal, 
  Pressable,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { CommonActions, useNavigation } from '@react-navigation/native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Perfil from './Perfil';
import TestScreen2 from './TestScreen2';
import Agregar from './Agregar';
import Lista from './Lista';


var widtht = Dimensions.get('window').width; //full width
var heightt = Dimensions.get('window').height; //full height


export default function Listas ({navigation}) {

    const [resultados, setResultados] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [listaABorrrar, setlistaABorrrar] = useState('');


    async function cargarEnEstado() { 
      const keys =await AsyncStorage.getAllKeys();  
      setResultados(keys);
    }

    async function borrarItem() {
      try {
          await AsyncStorage.removeItem(listaABorrrar);
          setModalVisible(false);
          return true;
      }
      catch(exception) {
          return false;
      }
    }

    const ItemView = ({item}) => {
      return (
        <View style={{flex:1}}>
          <TouchableOpacity style={styles.boton} onPress={ () => navigation.navigate('Lista', {Lista:item }) }>
              <Text>{item}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    useFocusEffect(
      React.useCallback(() => {
          cargarEnEstado();
      })
    );


    return (
      <View style={styles.container}>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Borrado:</Text>

                <TextInput
                  placeholder="Nombre lista"
                  onChangeText={text => setlistaABorrrar(text)}
                  style={{ borderWidth: 2, borderColor:'#FF6365', margin: 20, width: 200 }}
                />

                <Button title="Borrar" onPress={()=>{ borrarItem() }} color="#DC5052" width="200"/>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <FlatList
          data={resultados}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
          />
          <Pressable style={styles.imagencontainer} onPress={() => setModalVisible(true)} >
            <Image style={styles.imagen} source={require('../img/delete.png')} />
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
  boton:{
    height: 100,
    width:300, 
    marginTop: 10, 
    alignItems: 'center', 
    backgroundColor: '#DC5052', 
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },
  imagen: {
    width: 60,
    height: 60,
  },
  imagencontainer: {
    marginTop:5,
    marginBottom:10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 1,
    padding: 10,
    elevation: 2
  },
  buttonCambio: {
    width: 310,
    marginLeft:21
  },
  buttonOpen: {
    marginTop:200,
    backgroundColor: "#DC5052",
    width: 310,
    marginLeft:21
  },
  buttonClose: {
    backgroundColor: "#808080",
    borderRadius: 20,
    marginTop:20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});
