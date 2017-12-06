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


	async loadUserType(title) {
      const { navigate } = this.props.navigation;
      if(title == 'Customer') {
        //navigate('MatchedDriver',{driverInfo:{phone:'222',email:'heyhey',description:'jffhj', rating:'5', firstName:'David', location:{latitude:0,longitude:0}}});
        var DEMO_TOKEN = await AsyncStorage.getItem('USER_TOKEN');
        console.log(DEMO_TOKEN);
        if (DEMO_TOKEN){
           navigate('UserPostJobScreen');
        }else{
          navigate('SignUpUserScreen');
        }
      } else {
        navigate('DriversJobsScreen');
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
