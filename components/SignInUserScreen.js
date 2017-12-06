import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
const t = require('tcomb-form-native');
var Form = t.form.Form;
var User = t.struct({
  username: t.String,              // a required string
  password: t.String,  // an optional string
});
var options = {
    fields:{
   password: {
    password: true,
    secureTextEntry: true
  }
}
};
var STORAGE_KEY = 'USER_TOKEN';


export default class LoginUserScreen extends React.Component{
	static navigationOptions = {
		title: 'Welcome',
	}

	onPress = () => {
    var value = this.refs.form.getValue();
    console.log(value.email);
    fetch('http://100.64.4.146:8080/customer', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": value.email,
        "password": value.password
      })
    }).then((response) => {
      console.log(response);
      this._onValueChange(STORAGE_KEY, response.header.token);
      console.log(response);
      if(response.status == 200){
      	const { navigate } = this.props.navigation;
    	navigate('UserPostJobScreen');
       }
    }).catch((error) => {
      console.log("error",error);
    });
    
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
            {}           
            <Form ref="form" type={User} options={options} />
            <Button onPress={this.onPress} title="SIGN IN" color="#841584"></Button>
          </View>
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
  });