import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class TestScreen2 extends React.Component {
  state = {
    texto: "",
  }

  guardarDato = async () => {
    try{

      /* var myCar = new Object();
      myCar.make = 'Ford';
      myCar.model = 'Mustang';
      myCar.year = 1969; */


      await AsyncStorage.setItem("textoAlmacenado", this.state.texto);
      await AsyncStorage.setItem("numeroAlmacenado", JSON.stringify(myCar));
    } catch(error){

    }
  }

  obtenerDato = async () => {
    try {
    const valor = await AsyncStorage.getItem('textoAlmacenado');    
    Alert.alert(valor);
    } catch(error){

    }
  }

  mostrarTodo = async () => {
    try {
      const keys =await AsyncStorage.getAllKeys();  
      const result = await AsyncStorage.multiGet(keys); 
      console.log(result);
      //result[0] primer array del array result
      //console.log(result[0][1]) //primer valor del array 0 del array result
      //console.log(result[0][1].year);
    } catch (error) {
      console.error(error)
    }

  }
  
  clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }

  render() {
    return (
     <View> 
       <TextInput onChangeText={ (value) => this.setState({texto: value}) } />
       <Button title="Almacenar Dato." onPress={this.guardarDato}/>
       <Button title="Mostrar Dato." onPress={this.obtenerDato}/>
       <Button title="Mostrar Todo." onPress={this.mostrarTodo}/>
       <Button title="Borrar Todo." onPress={this.clearAsyncStorage}/>
       <Text>{this.state.texto}</Text>
     </View>   
    );
  }
};

const styles = StyleSheet.create({
  
});
