import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator } from 'react-navigation';
import MyMap from './user/MyMap';
import { Tabs }  from './user/TabView';

export default class UserInterfaceScreen extends React.Component{
	constructor(props) {
    	super(props);
    }

	static navigationOptions = {
		title: 'Welcome',
	}

	goToDriverInfo = () => {
		const { navigate } = this.props.navigation;
    	navigate('MatchedDriver');
  	}

	render(){
		return(
          <View style={styles.container}>
            <View style={styles.map}>
              <MyMap/>
            </View>
            <View style={{flex: 3, flexDirection: 'row'}}>
              <Tabs screenProps={this.goToDriverInfo}/>
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
