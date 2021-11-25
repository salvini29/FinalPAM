import * as React from 'react';
import { useState,useEffect,useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
  Pressable,
  ToastAndroid,
  Image,
  Alert,
  AppState
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Perfil from './Perfil';
import TestScreen2 from './TestScreen2';
import Agregar from './Agregar';
import Lista from './Lista';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';


export default function Ubicacion ({ navigation }) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [initialPosition, setinitialPosition] = useState([]);
  const iconMarket = useRef(new Animated.Value(0)).current;
  const [listaTrack, setListaTrack] = useState('');
  
  animate = () => {

    Animated.spring(iconMarket, {
      toValue: -100,
      duration: 2000,
      friction: 1,
      tension:20,
      useNativeDriver: true
    }).start();

  };

  var rad = function(x) {
    return x * Math.PI / 180;
  };

  var getDistance = function(p2lat, p2long) {
    var R = 6378137;
    var dLat = rad(p2lat - initialPosition[0]);
    var dLong = rad(p2long - initialPosition[1]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(initialPosition[0])) * Math.cos(rad(p2lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returna distancia en metros
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
  
  const superArrival = async () => {

    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setinitialPosition(oldArray => [...oldArray, (position.coords).latitude]);
        setinitialPosition(oldArray => [...oldArray, (position.coords).longitude]);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      }
    );

    animate();
  
  };

  const listaTrackempty = async () => {
      try {
        const valueLista = await AsyncStorage.getItem(listaTrack);
        const cantLista = (JSON.parse(valueLista)).length;
        console.log(cantLista);
        if (cantLista >0 ) {
          return true;
        }
        else
        {
          return false;
        }
      } catch (error) {
        console.error(error)
      }
  
  };

  const getCurrentLatLong = async () => {
    const opt = {
      maximumAge:0,
      accuracy: { ios: "best", android: "high" },
      distanceFilter:1,
      showLocationDialog: true,
      forceRequestLocation: true,
    };
    const getCurrentPosition = () => new Promise((resolve, error) => Geolocation.getCurrentPosition(resolve, error, opt));

    try {
       const Data = await getCurrentPosition();
      const Latlong = `${Data?.coords?.latitude}, ${Data?.coords?.longitude}`;
      const ListToTrack = listaTrack;
      //console.log(Latlong);
      //console.log(ListToTrack);
      return { Status: true, Data, Latlong, ListToTrack };
    } catch (error) {
      console.log("getCurrentLatLong::catcherror =>", error);
      return { Status: false, Message: Strings.Geolocation.Error(error.code) };
    }
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    await Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        return position;
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        maximumAge: 0,
        distanceFilter: 1,
      },
    );
  };

  useEffect( async () => {  

    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        //console.log("App esta activa!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      //console.log("AppState", appState.current);
      const resu = await getCurrentLatLong();
      var p2lat = resu.Data.coords.latitude;
      var p2long = resu.Data.coords.longitude;
      var listoToTrackName = resu.ListToTrack;

      var resu2 = getDistance(p2lat,p2long);
      if (Number.isNaN(resu2)){
        //console.log("-");
      }
      else if(resu2>=1000)
      {
        if(listoToTrackName != "")
        {
          const valueLista = await AsyncStorage.getItem(listoToTrackName);
          const cantLista = (JSON.parse(valueLista)).length;
          if (cantLista > 0) {
            console.log("Le falta quitar productos de la Lista y esta a mas de 1000 metros del super");
          }
          else
          {
            console.log("Compro todo y dejo el super");
          }
        }
      }
      else
      {
        console.log("Esta a menos de 1000 metros del super");
      }

    });

    return () => {
      subscription.remove();
    };


  }, [navigation, initialPosition]);

  return (
      <View style={styles.container}>
          <Animated.View style={[styles.imagencontainer,{translateY:iconMarket}]}>
            <Image style={styles.imagen} source={require('../img/grocerystore.png')} />
          </Animated.View>
          <TextInput
            autoCompleteType="off"
            placeholder="Lista que va a usar"
            value={listaTrack}
            style={{ borderWidth: 2, borderColor:'#FF6365', marginTop: 5, marginBottom: 10, width: 300 }}
            onChangeText={text => setListaTrack(text)}
          />
          <Pressable style={styles.submit} onPress={() => superArrival()}>
            <Text style={styles.textStyle}>LLEGUE AL SUPER</Text>
          </Pressable>

      </View>
    );
};

const styles = StyleSheet.create({
    imagen: {
      width: 150,
      height: 150,
    },
    imagencontainer: {
    },
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    submit: {
      width: 300,
      backgroundColor: '#DC5052',
      borderRadius: 1,
      marginTop:5,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
});