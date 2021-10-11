import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

export default ModItemView =({item})=> {
   
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


   return (
      <Swipeable renderLeftActions={LeftActions}>
        <View style={{flex:1}}>
          <TouchableOpacity style={styles.boton}>
              <Text>{item}</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
   )
}

const styles = StyleSheet.create({
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