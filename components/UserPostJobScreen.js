import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator } from 'react-navigation';
import MyMap from './user/MyMapUser';
import { Tabs }  from './user/TabView';
var base64js = require('base64-js')

export default class UserInterfaceScreen extends React.Component{
	constructor(props) {
    	super(props);
      this.state = {
        startLoc:[0,0],
        endLoc:[0,0]
      }
    }

	goToDriverInfo = (driverInfo) => {
		const { navigate } = this.props.navigation;
    	navigate('MatchedDriver',{driverInfo: dr});
  }

  goToJobDetails = (item) => {
     const { navigate } = this.props.navigation;
     navigate('JobDetailsScreen', {jobInfo: item});
  }

  startLocation = (coord) => {
    this.setState({startLoc:[coord.latitude,coord.longitude]})
  }

  endLocation = (coord) => {
    this.setState({endLoc:[coord.latitude,coord.longitude]})
  }

	render(){
		return(
          <View style={styles.container}>
            <View style={styles.map}>
              <MyMap start={this.startLocation} end={this.endLocation}/>
            </View>
            <View style={{flex: 3, flexDirection: 'row'}}>
              <Tabs screenProps={{"driver":this.goToDriverInfo, "startLoc":this.state.startLoc, "endLoc": this.state.endLoc, "jobDetails":this.goToJobDetails}}/>
            </View>
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
});
