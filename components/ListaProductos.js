import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
   
class List extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Ben',
         },
         {
            id: 1,
            name: 'Susan',
         },
         {
            id: 2,
            name: 'Robert',
         },
         {
            id: 3,
            name: 'Mary',
         },
         {
            id: 4,
            name: 'Robert',
         },
         {
            id: 5,
            name: 'Robert',
         },
         {
            id: 6,
            name: 'Robert',
         },
         {
            id: 7,
            name: 'Robert',
         },
         {
            id: 8,
            name: 'Robert',
         },
         {
            id: 9,
            name: 'Robert',
         },
         {
            id: 10,
            name: 'Robert',
         },
         {
            id: 11,
            name: 'Robert',
         },
         {
            id: 12,
            name: 'Robert',
         },
         {
            id: 13,
            name: 'Robert',
         },
         {
            id: 14,
            name: 'Robert',
         },
         {
            id: 15,
            name: 'Mary',
         }
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <View>
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
            }
         </View>
      )
   }
}
export default List

const styles = StyleSheet.create ({
   container: {
      padding: 30,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   }
})