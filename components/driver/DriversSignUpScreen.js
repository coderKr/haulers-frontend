import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView, KeyboardAvoidingView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
const t = require('tcomb-form-native');
import { StackNavigator } from 'react-navigation';

import MapDriver from './MapDriver';
var Form = t.form.Form;
var User = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  email: t.String,              
  phone: t.Number,        // a boolean,
  password: t.String,
});
var options = {fields:{
   password: {
    password: true,
    secureTextEntry: true
  }}};
var STORAGE_KEY = 'DRIVER_TOKEN';


export default class DriversSignUpScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {latitude:0, longitude: 0};
  }
  
	static navigationOptions = {
		title: 'UberMover ',
	}

  goToSignIn = () => {
      const { navigate } = this.props.navigation;
      navigate('DriversSignInScreen');
  }

	onPress = () => {
    var value = this.refs.form.getValue();
    fetch(global.SERVER_URL + '/driver/signup?password=' + value.password , {
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
        "location":[this.state.latitude, this.state.longitude]
      })
    }).then((response) => {
      //this._onValueChange(STORAGE_KEY, value.email);
      console.log(response);
      if(response.status == 200){
        console.log(this.props);
        this._onValueChange("drivername", value.email);
        this._onValueChange("driverpassword", value.password);
      	const { navigate } = this.props.navigation;
    	  navigate('DriverAllJobsScreen');
      }
    }).catch((error) => {
      console.log("error",error);
    });
    
  }

  getCoordinates = (coordinates) => {
    console.log(coordinates);
    this.setState({latitude: coordinates.latitude, longitude: coordinates.longitude});
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
              <MapDriver screenProps={this.getCoordinates}/>
            </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {}           
            <Form ref="form" type={User} options={options} />
            <Button onPress={this.onPress} title="SIGN UP" color="#841584"></Button>
            <Text style={{color: 'blue'}} onPress={this.goToSignIn}>Already a member</Text>
          </ScrollView>
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
  contentContainer: {
    paddingVertical: 2
  },
  map: {
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