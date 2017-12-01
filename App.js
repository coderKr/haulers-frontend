import React from 'react';
import { StyleSheet, AsyncStorage, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button, TouchableHighlight } from 'react-native';

import MapView from 'react-native-maps';
import MyMap from './components/user/MyMap';
import { Tabs }  from './components/user/TabView';
import { StackNavigator } from 'react-navigation';
import CustomerDriverScreen from './components/CustomerDriverScreen';
import LoginUserScreen from './components/LoginUserScreen';
import UserInterfaceScreen from './components/UserInterfaceScreen';
import MatchedDriverScreen from './components/user/MatchedDriver';
import DriverInterfaceScreen from './components/DriverInterfaceScreen';

var options = {};
var STORAGE_KEY = 'id_token';

const UberApp = StackNavigator({
  CustomerDriverScreen: { screen: CustomerDriverScreen },
  LoginUser: {screen: LoginUserScreen},
  UserInterface: {screen: UserInterfaceScreen},
  MatchedDriver: {screen: MatchedDriverScreen},
  DriverInterfaceScreen: {screen: DriverInterfaceScreen},
});


export default class App extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
      activity: false,
      userType: 'Customer',
    }
  }

  // This function gets called when someone finishes entering their number.
  // It should probably get moved into a Component like
  // PhoneVerification in PhoneVerification.js for example
  onPhoneNumber = (inputText) => {

    // We immediately indicate some activity is happening
    this.setState({activity: true});

    // And second we initiate the activity.  This should be a `fetch` api call,
    // however for now we'll just use a Timeout
    setTimeout(() => {
       // When the timeout completes, we indicate activity no longer happening,
       // and we change screens.  See my SWITCH statement in the render() func.
       this.setState({
         activity: false,
         screen: ENTER_CODE,
       });
    }, 1500);
  }


  onJoin = (inputText) => {
    this.setState({activity: true});
    setTimeout(() => {
        this.setState({
         activity: false,
         screen: ENTER_JOB,

       });
    }, 1500);
  }


  // async onPressSubmit() {
  //    var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
  //    fetch('http://100.64.4.146:8080/job', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       "email": value.email,
  //       "firstName": value.name,
  //       "lastName": value.surname,
  //       "phone": value.phone
  //     })
  //   }).then((response) => {
  //     this._onValueChange(STORAGE_KEY, value.email);
  //     if(response.status == 200){
  //        this.setState({
  //         activity: false,
  //         screen: ENTER_JOB,
  //       });
  //      }
  //   }).catch((error) => {
  //     console.log("error",error);
  //   });
  //    console.log("DEMO", DEMO_TOKEN);
  // }

  // async _onValueChange(item, selectedValue) {
  //   try {
  //     await AsyncStorage.setItem(item, selectedValue);
  //   } catch (error) {
  //     console.log('AsyncStorage error: ' + error.message);
  //   }
  //}


  render() {
     return <UberApp />;
  }
}


const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor: '#eee',
    alignItems: 'stretch',
    padding:10,
    marginTop:300,

  },
  container1:{
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection:'column'
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
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

  // Probably this style should get moved into a dedicated PhoneValidation component.
  phoneNumberInput: {
    marginTop: 20,
    marginBottom:20,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    lineHeight:20,
    height:40,
    backgroundColor: 'white'
  }
});


