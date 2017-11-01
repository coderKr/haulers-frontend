import React from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native';

import someRenderFunction from './myLib';

import MapView from 'react-native-maps';
import MyMap from './MyMap';

// Possible Screen States (JS doesn't have Enum's)
const ENTER_PHONE = 'ep';
const ENTER_CODE  = 'ec';
const ENTER_JOB   = 'ej';
const SEARCHING   = 'sr';


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
      screen: ENTER_PHONE
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


  // This function is the main render function for the whole application.
  // We really just SWITCH between different views.
  // Probably all the views should really be defined in individual components
  // where each component represents a page of the application
  render() {

    // Copying state into a CONST really makes it clear that it is not possible
    // to change state directly (you must use setState() at the appropriate time and place!)
    const {screen} = this.state;


    switch(screen) {
      case ENTER_JOB:
        return (
          <View style={styles.container}>
            <View style={styles.map}>
              <MyMap/>
            </View>
            <View style={{flex: 3}}>
              <Text>Other Components to go here</Text>
            </View>
          </View>
        );
        break;

      case ENTER_CODE:
         // This is just to show how you don't have to have all your JSX in-line, but
         // you can call other functions (even in other libraries!) that return JSX
         return someRenderFunction();
         break;

      case ENTER_PHONE:
      default:
        return (
            <KeyboardAvoidingView behavior={'padding'} style={[styles.centeredView, {backgroundColor: 'black', padding: 40}]}>
              <Text style={{color: 'white'}}>
                 Welcome. In order to connect you with hundreds of nearby helpers,
                 let's to make sure you can receive SMS Messages.
              </Text>
              <TextInput keyboardType={'numeric'} maxLength={12} style={styles.phoneNumberInput} onEndEditing={this.onPhoneNumber} editable={!this.state.activity}/>
              <ActivityIndicator animating={this.state.activity} size={'large'} style={{margin: 20}}/>
            </KeyboardAvoidingView>
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
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#222'
  },
  centeredView: {
    flex:1,
    alignItems:'stretch',
    justifyContent:'center'
  },

  // Probably this style should get moved into a dedicated PhoneValidation component.
  phoneNumberInput: {
    marginTop: 20,
    fontSize: 45,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#222'
  }
});


