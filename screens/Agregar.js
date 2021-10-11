import React, { useEffect, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  Animated,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';


export default function Agregar() {
    
  const margenLeft = useRef(new Animated.Value(0)).current;

  animate = () => {

    /*Animated.timing(margenLeft, {
      toValue: -300,
      duration: 500,
      useNativeDriver: false,
    }).start(margenLeft.resetAnimation());*/
    
    Animated.timing(margenLeft, {
      toValue: -300,
      duration: 500,
      useNativeDriver: false,
    }).start( ()=> {
        margenLeft.setValue(0); 
    } );

  };

  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback(formData => {
    guardarDatos(formData);
    animate();
  }, []);

  guardarDatos = async ( datos ) => {
    try{
      const response = await AsyncStorage.getItem(datos['lista']);
      const result = JSON.parse(response);
      if ( result == null )
      {
        await AsyncStorage.setItem( datos['lista'], JSON.stringify([[datos['producto'],datos['cantidad']]]) );
      }
      else
      {
        const resultSumado = [datos['producto'],datos['cantidad']];
        result.push(resultSumado);
        await AsyncStorage.setItem( datos['lista'], JSON.stringify(result) );
      }
      const response2 = await AsyncStorage.getItem(datos['lista']);
      console.log(response2);
    /*await AsyncStorage.removeItem(datos['lista']);
      const response = await AsyncStorage.getItem(datos['lista']);
      const result = JSON.parse(response);*/
      /*const resultSumado = [datos['producto'],datos['cantidad']];
      result.push(resultSumado);
      console.log(result);
      await AsyncStorage.setItem( datos['lista'], JSON.stringify(result) )*/
      /*await AsyncStorage.setItem( 'Lista1', JSON.stringify([[datos['producto'],datos['cantidad']]]) );
      const response = await AsyncStorage.getItem('Lista1');
      const result = JSON.parse(response);
      console.log(result);*/
    } catch(error){

    }
  }
  
  const onChangeField = useCallback(
    name => text => {
      setValue(name, text);
    },
    []
  );

  useEffect(() => {
    register('lista');
    register('producto');
    register('cantidad');
  }, [register]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCompleteType="off"
        placeholder="Lista para agregar producto"
        onChangeText={onChangeField('lista')}
      />
      <TextInput
        style={styles.input}
        autoCompleteType="off"
        placeholder="Producto a comprar"
        onChangeText={onChangeField('producto')}
      />
      <TextInput
        style={styles.input}
        autoCompleteType="off"
        placeholder="Cantidad"
        keyboardType= "numeric"
        onChangeText={onChangeField('cantidad')}
      />
      <View style={styles.submit}>
        <Button title="Agregar" onPress={handleSubmit(onSubmit)} color="#DC5052"/>
      </View>
      
      <Animated.View style={[styles.imagencontainer,{marginLeft:margenLeft}]}>
        <Image style={styles.imagen} source={require('../img/cart.png')} />
        
      </Animated.View>

    </View>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagen: {
      width: 60,
      height: 60,
    },
    imagencontainer: {
      marginTop:15,
    },
    input: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 15,
    },
    submit: {
      width: 200,
    },
    onSubmit: {
      color: 'red',
    },
  });