import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { CommonActions, useNavigation } from '@react-navigation/native';


var widtht = Dimensions.get('window').width; //full width
var heightt = Dimensions.get('window').height; //full height

export default function Lista ({route}) {

    const [listaCarga, setlistaCarga] = useState('');
    const [click, setClick] = useState(null);
    const [productosData, setproductosData] = useState([]);
    const [borrarpar, setBorrarpar] = useState('');

    const cuandoClick = () => {

       AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          stores.map((result, i, store) => {
            console.log({ [store[i][0]]: store[i][1] });
            return true;
            });
          });
        });

    }

    async function pruebaBorrar(parametroBorrado){
        try {
          const response = await AsyncStorage.getItem(route.params.Lista);
          const result = JSON.parse(response);  
          var cant=0;
          for (var i = 0; i <= result.length - 1; i++) {
              if ( result[i][0] ==  parametroBorrado[0]) {
                  break;
              }
              cant = cant+1;
          }
          result.splice(cant, 1);
          await AsyncStorage.setItem( route.params.Lista, JSON.stringify(result) );
          setproductosData(result);
          console.log("Removido");
        }
        catch(exception) {
        }
    };


    async function botonTocado(){

      try {
        await AsyncStorage.removeItem(borrarpar);
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        setproductosData([...result]);
        console.log("Removido");
      }
      catch(exception) {
      }

    };

    const ItemView = ({item, index}) => {
      return (
        // FlatList Item
        <TouchableOpacity style={[styles.row,{backgroundColor: click===index ? 'tomato':'transparent'}]} onPress={() => {setClick(index); pruebaBorrar(item);} }>
          <View>
            <Text style={styles.rowtext}>
              {item[0]+ '  ' + item[1]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    async function cargarEnEstado() { 
      /*const keys =await AsyncStorage.getAllKeys();  
      const result = await AsyncStorage.multiGet(keys);*/
      // setlistaCarga(route.params.Lista);
      /*console.log({productosData});*/
      console.log(route.params.Lista);
      const response = await AsyncStorage.getItem(route.params.Lista);
      const result = JSON.parse(response);  
      //console.log(result);
      //result.forEach(element => (setproductosData(productosData.push(element))));
      //console.log(result);
      setproductosData(result);
      //setproductosData([...productosData, ...result]);
    }


    useFocusEffect(
      React.useCallback(() => {
          cargarEnEstado();
      }, [route])
    );


    clearAsyncStorage = async() => {
      AsyncStorage.clear();
    };

    //console.log({productosData});

    return (
      <View style={styles.container}>
        <View style={styles.inputcontainer}>
            <Text>{route.params.Lista}</Text>
        </View>
        <FlatList
        data={productosData}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        />

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    width: 200,
    marginBottom:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputdato: {
    //backgroundColor:'red',
    textAlign: 'center',
    fontSize: 15,
  },
  row: {
    width:widtht,
    height:45,
    borderWidth: 2, 
    borderColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems:'center',
    textAlign:'center'
    //backgroundColor:'blue',
  },
  rowtext:{
    fontSize:17,
  },
  inputcontainer: {
    alignItems: 'center',
    backgroundColor: '#DC5052',
    textAlign: 'center',
    width: widtht,
    fontSize: 15,
    height: 30
  }

});