import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator } from 'react-navigation';
import MyMap from './user/MyMapUser';
import { Tabs }  from './user/TabView';
var base64js = require('base64-js')

export default class JobDetailsScreen extends React.Component{
	constructor(props) {
    	super(props);
      this.state = {
        jobDetails: this.props.navigation.state.params.jobInfo,
      }
    }

	static navigationOptions = {
		title: 'Welcome',
	}


	render(){
		return(
         <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <View style={{flex: 1, flexDirection: 'row', height:50}}>
              <Text style={{width:200, alignSelf: 'center'}}> Job Status: </Text>
              <Text style={{width:200, alignSelf: 'center'}}> {this.state.jobDetails.status} </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', height:50}}>
              <Text style={{width:200, alignSelf: 'center'}}> Driver Email: </Text>
              <Text style={{width:200, alignSelf: 'center'}}> {this.state.jobDetails.driverEmail} </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', height:50}}>
              <Text style={{width:200, alignSelf: 'center'}}> Job Description: </Text>
              <Text style={{width:200, alignSelf: 'center'}}> {this.state.jobDetails.description} </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', height:50}}>
              <Text style={{width:200, alignSelf: 'center'}}> Capacity: </Text>
              <Text style={{width:200, alignSelf: 'center'}}> {this.state.jobDetails.capacity} </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', height:50}}>
              <Text style={{width:200, alignSelf: 'center'}}> Price: </Text>
              <Text style={{width:200, alignSelf: 'center'}}> {this.state.jobDetails.price} </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', height:50}}>
              <Text style={{width:200, alignSelf: 'center'}}> Start: </Text>
              <Text style={{width:200, alignSelf: 'center'}}> {this.state.jobDetails.start} </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', height:50}}>
              <Text style={{width:200, alignSelf: 'center'}}> End: </Text>
              <Text style={{width:200, alignSelf: 'center'}}> {this.state.jobDetails.end} </Text>
            </View>
             <View style={{flex: 1, flexDirection: 'row', height:50}}>
              <Text style={{width:200, alignSelf: 'center'}}> Start Location: </Text>
              <Text style={{width:200, alignSelf: 'center'}}> {this.state.jobDetails.startLocation} </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', height:50}}>
              <Text style={{width:200, alignSelf: 'center'}}> End Location: </Text>
              <Text style={{width:200, alignSelf: 'center'}}> {this.state.jobDetails.endLocation} </Text>
            </View>
      </View>
     </ScrollView>
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
});
