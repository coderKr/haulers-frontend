import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
const t = require('tcomb-form-native');
import MyMap from './user/MyMap';
var Form = t.form.Form;
var User = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  email: t.String,              
  phone: t.Number,        // a boolean,

});
var options = {};
var STORAGE_KEY = 'id_token';


export default class DriverInterfaceScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {latitude:0, longitude: 0};
  }
  
	static navigationOptions = {
		title: 'Welcome',
	}

	onPress = () => {
    var value = this.refs.form.getValue();
    console.log(value.email);
    fetch('http://100.64.4.146:8080/driver', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": value.email,
        "firstName": value.name,
        "lastName": value.surname,
        "phone": value.phone,
        "latitude":this.state.latitude
      })
    }).then((response) => {
      //this._onValueChange(STORAGE_KEY, value.email);
      console.log(response);
      if(response.status == 200){
      	const { navigate } = this.props.navigation;
    	navigate('UserInterface');
       }
    }).catch((error) => {
      console.log("error",error);
    });
    
  }

  getCoordinates = (coordinates) => {
    console.log(coordinates);
    this.setState({latitude: coordinates.latitude, longitude: coordinates.longitude});
    //console.log(this.refs.form.getValue());
    //this.refs.form.getComponent('latitude').refs.input = coordinates.latitude; 
  }

   async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


	render(){
		return(
      <View style={styles.container}>
            <View style={styles.map}>
              <MyMap screenProps={this.getCoordinates}/>
            </View>
          <View>
            {}           
            <Form ref="form" type={User} options={options} />
            <Button onPress={this.onPress} title="SEND CODE" color="#841584"></Button>
          </View>
      </View>
		);
	}
} 

const styles = StyleSheet.create({
   container:{
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection:'column'
  },
  map: {
    flex:1 ,
    alignSelf: 'stretch',
    backgroundColor: '#222',
    height:200,
    flexDirection: 'row',
  },
  centeredView: {
    flex:1,
    alignItems:'stretch',
    justifyContent:'center'
  },
  });