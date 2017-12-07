import React from 'react';
import { StyleSheet, AsyncStorage, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import { Tabs }  from './components/user/TabView';
import { StackNavigator } from 'react-navigation';
import CustomerDriverScreen from './components/CustomerDriverScreen';
import SignUpUserScreen from './components/user/SignUpUserScreen';
import SignInUserScreen from './components/user/SignInUserScreen';
import UserPostJobScreen from './components/user/UserPostJobScreen';
import MatchedDriverScreen from './components/user/MatchedDriver';
import DriversSignUpScreen from './components/driver/DriversSignUpScreen';
import DriversSignInScreen from './components/driver/DriversSignInScreen';
import JobDetailsScreen from './components/JobDetailsScreen';
import LogOutScreen from './components/LogOutScreen';
import DriverAllJobsScreen from './components/driver/DriverAllJobsScreen';
import { NavigationActions } from 'react-navigation'
import './config';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? 
  GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

var options = {};
var STORAGE_KEY = 'user_token';

const fade = (props) => {
    const {position, scene} = props

    const index = scene.index

    const translateX = 0
    const translateY = 0

    const opacity = position.interpolate({
        inputRange: [index - 0.7, index, index + 0.7],
        outputRange: [0.3, 1, 0.3]
    })

    return {
        opacity,
        transform: [{translateX}, {translateY}]
    }
}

logout = () => {
  console.log("REACHES LOGOUT");
}


const UberApp = StackNavigator({
  CustomerDriverScreen: { screen: CustomerDriverScreen },
  SignUpUserScreen: {screen: SignUpUserScreen},
  SignInUserScreen: {screen: SignInUserScreen},
  UserPostJobScreen: {
    screen: UserPostJobScreen, 
    navigationOptions: ({ navigation }) => ({
      title: 'UberMover',
      headerRight: <Icon name='close' type='evilicon' color='red' size={35} onPress={ () => navigation.navigate('LogOutScreen') } />,
      headerLeft: null,
  })},
  MatchedDriver: {screen: MatchedDriverScreen},
  DriversSignUpScreen: {screen: DriversSignUpScreen},
  DriversSignInScreen: {screen: DriversSignInScreen},
  JobDetailsScreen:{screen:JobDetailsScreen},
  LogOutScreen:{screen:LogOutScreen},
  DriverAllJobsScreen:{screen:DriverAllJobsScreen,navigationOptions: ({ navigation }) => ({
      title: 'UberMover',
      headerRight: <Icon name='close' type='evilicon' color='red' size={35} onPress={ () => navigation.navigate('LogOutScreen') } />,
      headerLeft: null,
  })},
}, {
    transitionConfig: () => ({
        screenInterpolator: (props) => {
            return fade(props)
        }
    })
  });


export default class App extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
      activity: false,
      userType: 'Customer',
    }
  }

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


  render() {
     return <UberApp />;
  }
}


const styles = StyleSheet.create({
});


