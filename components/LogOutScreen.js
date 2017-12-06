import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator } from 'react-navigation';
import base64 from "base-64";

export default class LogOutScreen extends React.Component{
	constructor(props) {
    	super(props);
    }

	static navigationOptions = {
		title: 'Welcome',
	}

  async logOut() {
    var username = await AsyncStorage.getItem("username");
    var password = await AsyncStorage.getItem("password");
    var authBase64 = base64.encode(`${username}:${password}`);
    console.log("LOG OUT CLICKED");
     fetch(global.SERVER_URL + 'logOut?customerEmail=' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Basic ${authBase64}`,
      }
    }).then((response) => {
      if(response.status == 200){
        this._onValueChange("USER_TOKEN", "");
        this._onValueChange("username", "");
        this._onValueChange("password", "");
        this._onValueChange("authbase64", "");
       }
    }).catch((error) => {
      console.log("error",error);
    });
  }

   async _onValueChange(item, selectedValue) {
    console.log("called async", item, selectedValue);
    try {
      await AsyncStorage.setItem(item, selectedValue);
      console.log("one setting");
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

	render(){
		return(
			<View style={styles.container}>
          <Button style={styles.buttonUser} onPress={this.logOut} title="SIGN OUT" color="#841584"/>
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
  buttonUser:{
    flex: 1,
    marginTop: 5,
    padding:5,
    width:200,
  },
  forText:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
