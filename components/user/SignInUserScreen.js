import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView,Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
const t = require('tcomb-form-native');
import base64 from "base-64";

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
		title: 'UberMover',
	}

	onPress = () => {
    var value = this.refs.form.getValue();
    var authBase64 = base64.encode(`${value.username}:${value.password}`);
    bodyValue = {
      "rating": 0,
      "startLocation": {},
      "endLocation": {},
      "capacity":0,
      "description": "",
      "end":"",
      "start":"",
      "price":0
     }
    fetch(global.SERVER_URL + '/job?customerEmail=' + value.username, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Basic ${authBase64}`,
      },
      body: JSON.stringify(bodyValue)
    }).then((response) => {
      console.log(response);
       if(response.headers && response.status!=401){
        this._onValueChange("USER_TOKEN", response.headers.map["x-auth-token"][0]);
        this._onValueChange("username", value.username);
        this._onValueChange("BASE", authBase64);
        const { navigate } = this.props.navigation;
        navigate('UserPostJobScreen');
    } else {
       Alert.alert(
          "Invalid User!","",
          [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ]
          )
      console.log(response.headers.map["x-auth-token"])
    }
    }).catch((error) => {
      console.log("error",error);
    });

  }

   async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
      console.log(await AsyncStorage.getItem("username"))
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


	render(){
		return(
          <View style={styles.container}>
            {}
            <Form ref="form" type={User} options={options} />
            <Button onPress={this.onPress} title="Sign in" color="#222233"></Button>
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
