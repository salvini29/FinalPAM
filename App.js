import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Perfil from './screens/Perfil';
import TestScreen2 from './screens/TestScreen2';
import Agregar from './screens/Agregar';
import Lista from './screens/Lista';
import TestScreen5 from './screens/TestScreen5';
import Listas from './screens/Listas';
import ListaCarrito from './components/ListaProductos'
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen() {
  return (
    <View>
      <ScrollView>
        <ListaCarrito/>
      </ScrollView>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }} >
        <Tab.Screen name="Listas" component={Listas} options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'bank' : 'bank-outline'} color={color} size={size} />
          ),
          }}/>
        <Tab.Screen name="Lista" component={Lista} options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'format-list-bulleted-square' : 'format-list-checkbox'} color={color} size={size} />
          ),
          }}/>
        <Tab.Screen name="Agregar" component={Agregar} options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'pencil-box' : 'pencil-box-outline'} color={color} size={size} />
          ),
          }}/>
        <Tab.Screen name="Perfil" component={Perfil} options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color={color} size={size} />
          ),
          }}/>
        <Tab.Screen name="TEST" component={TestScreen5} options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color={color} size={size} />
          ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}