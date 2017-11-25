import React from 'react';
import { StyleSheet, AsyncStorage, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button, TouchableHighlight } from 'react-native';

import MapView from 'react-native-maps';
import MyMap from './components/user/MyMap';
import MatchDriver from './components/user/MatchedDriver';
import { Tabs }  from './components/user/TabView';
const t = require('tcomb-form-native');

// Possible Screen States (JS doesn't have Enum's)
const ENTER_DRIVER_OR_USER = 'du';
const ENTER_PHONE = 'ep';
const ENTER_CODE  = 'ec';
const ENTER_JOB   = 'ej';
const SEARCHING   = 'sr';
const MATCH_DRIVER = 'md';
var Form = t.form.Form;
var User = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  email: t.String,              
  phone: t.Number        // a boolean
});
var options = {};
var STORAGE_KEY = 'id_token';

// This is the main application class.
// 'export' means it can be accessed via an 'import' in another file
// 'export default' is the idiomatic way to package a component in RN
export default class App extends React.Component {

  // This is how you implement a class constructor in ES6
  constructor(props) {
    super(props);  // this is idiomatic boilerplate for Component Constructor

    // Application state currently only consists of
    // 1. Which SCREEN are we looking at (see the SWITCH stmt in render())
    // 2. If some loading or similar ACTIVITY is happening
    //
    // We may expect to extend the state significantly as the app grows,
    // Although much state should be encapsulated in individual components
    this.state = {
      activity: false,
      screen: ENTER_DRIVER_OR_USER,
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

   onPress = () => {
    var value = this.refs.form.getValue();
    // if (value) { // if validation fails, value will be null
    //   console.log(value); // value here is an instance of Person
    // }
    console.log(value.email);
    fetch('http://100.64.4.146:8080/customer', {
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
      this._onValueChange(STORAGE_KEY, value.email);
      if(response.status == 200){
         this.setState({
          activity: false,
          screen: ENTER_JOB,
        });
       }
    }).catch((error) => {
      console.log("error",error);
    });
    
  }

  loadUserType = (title) => {
    this._onValueChange(STORAGE_KEY, 'test1@gmail.com');
    console.log("type", title);
    this.setState({
      userType:title,
      activity: false,
      screen: ENTER_JOB,
    });
  }

  async onPressSubmit() {
     var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
     fetch('http://100.64.4.146:8080/job', {
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
      this._onValueChange(STORAGE_KEY, value.email);
      if(response.status == 200){
         this.setState({
          activity: false,
          screen: ENTER_JOB,
        });
       }
    }).catch((error) => {
      console.log("error",error);
    });
     console.log("DEMO", DEMO_TOKEN);
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  goToDriverInfo = () => {
    this.setState({
          activity: false,
          screen: MATCH_DRIVER,
        });
  }

  goBackToEnterJob = () => {
     this.setState({
          activity: false,
          screen: ENTER_JOB,
        });
  }

  // This function is the main render function for the whole application.
  // We really just SWITCH between different views.
  // Probably all the views should really be defined in individual components
  // where each component represents a page of the application
  render() {

    // Copying state into a CONST really makes it clear that it is not possible
    // to change state directly (you must use setState() at the appropriate time and place!)
    const {screen} = this.state;


    switch(screen) {
      case ENTER_DRIVER_OR_USER:
        return (
            <View style={styles.container}>
              <Text> I am a </Text>
              <Button style={styles.buttonUser} onPress={this.loadUserType.bind(this,'Customer')} title="Customer" color="#841584"/>
              <Button style={styles.buttonUser} onPress={this.loadUserType.bind(this,'Driver')} title="Driver" color="#841584"/>
            </View>
          )
        break;

      case ENTER_JOB:
        return (
          <View style={styles.container}>
            <View style={styles.map}>
              <MyMap/>
            </View>
            <View style={{flex: 3, flexDirection: 'row'}}>
              <Tabs screenProps={this.goToDriverInfo}/>
            </View>
          </View>

        );
        break;

      case ENTER_CODE:
        return(
        <KeyboardAvoidingView behavior={'padding'} style={[styles.centeredView, {backgroundColor: 'white', padding: 40}]}>
          <TextInput placeholder="Enter Code" keyboardType={'numeric'} maxLength={12} style={styles.phoneNumberInput} editable={!this.state.activity}/>
          <Button onPress={this.onJoin} title="JOIN" color="#841584" accessibilityLabel="Learn more about this purple button"/>
          <ActivityIndicator animating={this.state.activity} size={'large'} style={{margin: 20}}/>
        </KeyboardAvoidingView>
        );
        break;

      case MATCH_DRIVER:
        return(
          <View style={styles.container}>
            <View>
              <MatchDriver/>
            </View>
            <Button onPress={this.goBackToEnterJob} title="Go back!" color="#841584"/>
          </View>
        );
        break;
        
      case ENTER_PHONE:
      default:
        return (
          <View style={styles.container}>
            {}           
            <Form ref="form" type={User} options={options} />
            <Button onPress={this.onPress} title="SEND CODE" color="#841584"></Button>
          </View>
        );
    }
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
  buttonUser:{
    margin: 20,
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


