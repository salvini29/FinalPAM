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


    async function cargarEnEstado() { 
      const keys =await AsyncStorage.getAllKeys();  
      setResultados(keys);
    }

    const LeftActions = () => {
     return (
       <View
         style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center' }}>
         <Text
           style={{
             color: 'white',
             paddingHorizontal: 10,
             fontWeight: '600'
           }}>
           Left Action
         </Text>
       </View>
     )
    }

    const ItemView = ({item}) => {
      return (
      <Swipeable renderLeftActions={LeftActions}>
        <View style={{flex:1}}>
          <TouchableOpacity style={styles.boton} onPress={ () => navigation.navigate('Lista', {Lista:item }) }>
              <Text>{item}</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
      );
    };

    useFocusEffect(
      React.useCallback(() => {
          cargarEnEstado();
      })
    );


    return (
      <View style={styles.container}>
          <FlatList
          data={resultados}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
          />
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
    }
});
