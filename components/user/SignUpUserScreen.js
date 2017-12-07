import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator } from 'react-navigation';
const t = require('tcomb-form-native');
var Form = t.form.Form;
var User = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  email: t.String,
  phone: t.Number ,
   password: t.String,        // a boolean
});
var options = {
  fields:{
   password: {
    password: true,
    secureTextEntry: true
  }
}

};
var STORAGE_KEY = 'user_token';


export default class SignUpUserScreen extends React.Component{
	static navigationOptions = {
		title: 'UberMover',
	}

	onPress = () => {
    var value = this.refs.form.getValue();
    fetch(global.SERVER_URL + '/customer/signup?password='+value.password, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": value.email,
        "firstName": value.name,
        "lastName": value.surname,
        "phone": value.phone
      })
    }).then((response) => {
      this._onValueChange("username", value.email);
      this._onValueChange("password", value.password);
      //this._onValueChange("username", "kripa");
      //this._onValueChange("password", "kripa");
      console.log(response);
      if(response.status == 200 || response.status == 201){
      	const { navigate } = this.props.navigation;
    	  navigate('UserPostJobScreen');
       } else {
        Alert.alert(
          "There is some problem with sign up!","",
          [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ]
          )
       }
    }).catch((error) => {
      console.log("error",error);
      Alert.alert(
          error,"",
          [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ]
          )
    });

  }

   async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  goToSignIn = () => {
      const { navigate } = this.props.navigation;
      navigate('SignInUserScreen');
  }

	render(){
		return(
          <KeyboardAvoidingView keyboardVerticalOffset={-50} behavior="padding" style={styles.container}>
            {}
            <Form style={styles.formStyle} ref="form" type={User} options={options} />
            <Button onPress={this.onPress} title="Sign up" color="#222233"></Button>
            <Text style={styles.alreadyAMember} onPress={this.goToSignIn}>Already a member? Sign in.</Text>
          </KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
  },
  alreadyAMember:{
      color: '#0A8B8C',
      marginTop: 10,
      fontSize: 15,
  },
  formStyle:{
      height:700,
      width:300,
  }
  });
