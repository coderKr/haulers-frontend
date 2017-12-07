import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

export default class CustomerDriverScreen extends React.Component{
	constructor(props) {
    	super(props);
    }

	static navigationOptions = {
		title: 'UberMovers',
	}
  bounceOff =  (title) => {
    if (title=="Customer") {
     return this.refs.Customer.bounce(1000).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
   } else {
     return this.refs.Driver.bounce(1000).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
   }
  }

	async loadUserType(title) {
      await this.bounceOff(title);
      console.log(title);
      this._onValueChange("TYPE", title);
      const { navigate } = this.props.navigation;
      if(title == 'Customer') {
         var USER_TOKEN = await AsyncStorage.getItem('USER_TOKEN');
         console.log("USER",USER_TOKEN)
        if (USER_TOKEN){
           navigate('UserPostJobScreen');
        }else{
          navigate('SignUpUserScreen');
        }
      } else {
         var DRIVER_TOKEN = await AsyncStorage.getItem('DRIVER_TOKEN');
         if (DRIVER_TOKEN){
           navigate('DriverAllJobsScreen');
        }else{
          navigate('DriversSignUpScreen');
        }

      }
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
			<Image
		        style={{
		          backgroundColor: 'pink',
		          flex: 1,
		          // resizeMode,
		          position: 'absolute',
		          width: '100%',
		          height: '100%',
		          justifyContent: 'center',
		        }}
		        source={{ uri: 'https://www.printelf.com/designer/images/bcard/1088x638/background/000-22.jpg' }}
		      />
            <View>
              <Text style={styles.forText}> I am a </Text>
            </View>
              <Text ></Text>
              <Animatable.View ref="Customer">
              <TouchableOpacity style={styles.buttonUser} onPress={this.loadUserType.bind(this,'Customer')}>
                  <Text style={styles.buttonText}> Customer </Text>
              </TouchableOpacity>
              </Animatable.View>
              <Animatable.View ref="Driver">
                <TouchableOpacity style={styles.buttonUser} onPress={this.loadUserType.bind(this,'Driver')}>
                  <Text style={styles.buttonText}> Driver </Text>
              </TouchableOpacity>
              </Animatable.View>
			  <Text style={styles.motto}> Lets get things moving!  </Text>
            </View>
		);
	}
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column'
  },
  buttonUser:{
    padding:2,
    backgroundColor: '#222233',
    margin:10,
	height:100,
    width:300,
	// textShadowColor: '#000',
	// textShadowOffset: {width: -1, height: 1},
	// textShadowRadius: 5
  },
  forText:{
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
	color:'#D7D7E0',
	textShadowColor: 'rgba(0, 0, 0, 0.75)',
	textShadowOffset: {width: -1, height: 1},
	textShadowRadius: 12
  },
  buttonText:{
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#D7D7E0',
	top:23,
	textShadowColor: 'rgba(0, 0, 0, 0.75)',
	textShadowOffset: {width: -1, height: 1},
	textShadowRadius: 12
},
motto:{
	fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#77EDD7',
	textShadowColor: 'rgba(0, 0, 0, 0.75)',
	textShadowOffset: {width: -1, height: 1},
	textShadowRadius: 12
}
});
