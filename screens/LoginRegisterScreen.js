import React, { useEffect, useCallback, useRef, useState } from 'react';
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
  Modal,
  Alert,
  Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import {connect} from 'react-redux';

class LoginRegisterScreen extends React.Component {
	constructor()
	{
		super();
		this.state={
			name:'',
			lastname:'',
			email:'',
			password:'',
			modalVisible: false,
			loggedIn: false
		}
	}

	setModalVisible = (visible) => {
    	this.setState({ modalVisible: visible });
  	}

	registro()
	{
		let data = {
		  method: 'POST',
		  credentials: 'same-origin',
		  mode: 'same-origin',
		  body: JSON.stringify({
	            name: this.state.name,
	            lastname: this.state.lastname,
	            email: this.state.email,
	            password: this.state.password
		  }),
		  headers: {
		    'Accept':       'application/json',
		    'Content-Type': 'application/json',
		  }
		}
		this.setModalVisible({modalVisible: false})
		return fetch('http://10.0.2.2:8000/createUser', data)
		        .then(response => response.json())  // promise
		        .then(json => {console.log(json);})
	}
	login()
	{
		let responseApi;
		let data = {
		  method: 'POST',
		  credentials: 'same-origin',
		  mode: 'same-origin',
		  body: JSON.stringify({
	            email: this.state.email,
	            password: this.state.password
		  }),
		  headers: {
		    'Accept':       'application/json',
		    'Content-Type': 'application/json',
		  }
		}
		fetch('http://10.0.2.2:8000/loginUser', data)
		        .then(response => response.json())  // promise
		        .then(json => { 

		        	if( json == true )
		        	{
		        		this.props.estaLogeado();
		        		return console.log("Pass correcta");
		        	}
		        	else
		        	{
		        		return console.log("Pass incorrecta");
		        	}	

		        	})
	}
	submitGet()
	{
		fetch('http://10.0.2.2:8000/getUsers').then((response) => response.json()).then((json) => {
		    console.log(json);
		}).catch((error) => {
		    console.error(error);
		});
	}
	render(){
		const { modalVisible } = this.state;
		const componenteDeslogueado = 
		<View style={{margin:20, marginTop:100}}>

			<Modal
	          animationType="slide"
	          transparent={true}
	          visible={modalVisible}
	          onRequestClose={() => {
	            Alert.alert("Modal has been closed.");
	            this.setModalVisible(!modalVisible);
	          }}
	        >
	          <View style={styles.centeredView}>
	            <View style={styles.modalView}>
	            	<Text style={{ fontWeight: "bold", fontSize: 20 }}>Registro:</Text>
	             	<TextInput
						placeholder="Nombre"
						onChangeText={(text) => {this.setState({name:text})}}
						style={{ borderWidth: 2, borderColor:'#FF6365', margin: 20, width: 200 }}
					/>
					<TextInput
						placeholder="Apellido"
						onChangeText={(text) => {this.setState({lastname:text})}}
						style={{ borderWidth: 2, borderColor:'#FF6365', margin: 20, width: 200 }}
					/>
					<TextInput
						placeholder="Email"
						onChangeText={(text) => {this.setState({email:text})}}
						style={{ borderWidth: 2, borderColor:'#FF6365', margin: 20, width: 200 }}
					/>
					<TextInput
						placeholder="Contraseña"
						secureTextEntry = {true}
						onChangeText={(text) => {this.setState({password:text})} }
						style={{ borderWidth: 2, borderColor:'#FF6365', margin: 20, width: 200 }}
					/>
					<Button title="Registrarse" onPress={()=>{this.registro()}} color="#DC5052" width="200"/>
	              <Pressable
	                style={[styles.button, styles.buttonClose]}
	                onPress={() => this.setModalVisible(!modalVisible)}
	              >
	                <Text style={styles.textStyle}>Cerrar</Text>
	              </Pressable>
	            </View>
	          </View>
	        </Modal>
	        <View style={styles.centeredView2}>
	        	<Text style={{ fontWeight: "bold", fontSize: 20 }}>Login:</Text>
	        </View>
			<TextInput
				placeholder="Email"
				onChangeText={(text) => {this.setState({email:text})}}
				style={{ borderWidth: 2, borderColor:'#FF6365', margin: 20 }}
			/>
			<TextInput
				placeholder="Contraseña"
				secureTextEntry = {true}
				onChangeText={(text) => {this.setState({password:text})} }
				style={{ borderWidth: 2, borderColor:'#FF6365', margin: 20 }}
			/>
			<View style={styles.buttonCambio}>
	        	<Button title="LOGUEARSE" onPress={()=>{this.login()}} color="#DC5052"/>
	        </View>
			<Pressable
	          style={[styles.button, styles.buttonOpen]}
	          onPress={() => this.setModalVisible(true)}
	        >
	          <Text style={styles.textStyle}>REGISTRESE AQUI</Text>
	        </Pressable>

		</View>;

		const componenteLogeado = <View style={{ justifyContent: "center", alignItems: "center" }}><Text style={{ fontWeight: "bold", fontSize: 20, marginTop:300 }}> Bienvenido {this.state.email}! </Text></View>;
		let componenteMostrado;
        if (this.props.loggedIn == true) {
            componenteMostrado = componenteLogeado
        } else {
            componenteMostrado = componenteDeslogueado
        }

		return(
	        <View>{componenteMostrado}</View>
		)
	}
}

function mapStateToProps(state){
	return {
		loggedIn: state.loggedIn
	}
}

function mapDispatchToProps(dispatch){
	return {
		estaLogeado: () => dispatch({type:'ESTA_LOGEADO'}),
		noestaLogeado: () => dispatch({type:'NOESTA_LOGEADO'}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterScreen)

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  centeredView2: {
    justifyContent: "center",
    alignItems: "center",
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