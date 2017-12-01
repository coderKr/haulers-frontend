import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator } from 'react-navigation';

export default class CustomerDriverScreen extends React.Component{
	constructor(props) {
    	super(props);
    }

	static navigationOptions = {
		title: 'Welcome',
	}


	loadUserType = (title) => {
    	//this._onValueChange(STORAGE_KEY, 'test1@gmail.com');
      const { navigate } = this.props.navigation;
      if(title == 'Customer') {
    	 navigate('LoginUser');
      } else {
        navigate('DriverInterfaceScreen');
      }
  	}

	render(){
		return(
			<View style={styles.container}>
            <View>
              <Text style={styles.forText}> I am a </Text>
            </View>
              <Text ></Text>
              <Button style={styles.buttonUser} onPress={this.loadUserType.bind(this,'Customer')} title="Customer" color="#841584"/>
              <Text ></Text>
              <Button style={styles.buttonUser} onPress={this.loadUserType.bind(this,'Driver')} title="Driver" color="#841584"/>
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
