import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

export default class LogOutScreen extends React.Component{
	constructor(props) {
    	super(props);
    }

	static navigationOptions = {
		title: 'Welcome',
	}

  async logOut() {
     fetch(global.SERVER_URL + '/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((response) => {
        this._onValueChange("USER_TOKEN", "");
        this._onValueChange("username", "");
        this._onValueChange("password", "");
         this._onValueChange("DRIVER_TOKEN", "");
        this._onValueChange("drivername", "");
        this._onValueChange("driverpassword", "");
        this._onValueChange("authbase64", "");
        const { navigate } = this.props.navigation;
        navigate('CustomerDriverScreen');
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
          <Text> We are sad to see you go..... </Text>
          <Button style={styles.buttonUser} onPress={this.logOut.bind(this)} title="SIGN OUT" color="#841584"/>
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
