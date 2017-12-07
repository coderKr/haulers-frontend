import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView, UIImagePickerManager } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator } from 'react-navigation';
var base64js = require('base64-js')

export default class JobDetailsScreen extends React.Component{
	constructor(props) {
    	super(props);
      this.state = {
        jobDetails: this.props.navigation.state.params.jobInfo,
        acceptJob: this.props.navigation.state.params.acceptJob,
      }
      console.log("ACCEPT JOB", this.state.acceptJob)
      this.setUp();
    }

  async setUp(){
    var type = await AsyncStorage.getItem("TYPE");
    console.log(type)
    if(type == 'Driver'){
      typeIsDriver = true;
    }else {
      typeIsDriver = false;
    }
    this.setState({typeIsDriver: typeIsDriver});
  }

  getImage = () => {
    var options = {
      title: 'Upload image',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      returnBase64Image: true,
      returnIsVertical: false
    };
    UIImagePickerManager.showImagePicker(options, (type, response) => {
      if (type !== 'cancel') {
        var source;
        if (type === 'data') { 
          source = {uri: 'data:image/jpeg;base64,' + response, isStatic: true};
        } else { 
          source = {uri: response};
        }

        console.log("uploading image");

         fetch('server-endpoint',{
           method: 'post',
           body: "data=" + encodeURIComponent(source.uri)
         }).then(response => {
           console.log("image uploaded")
           console.log(response)
         }).catch(console.log);

        //this.setState({avatarSource:source});
      } else {
        console.log('Cancel');
      }
    });
  }

	static navigationOptions = {
		title: 'UberMover',
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
            {this.state.typeIsDriver && <Button onPress={this.state.acceptJob.bind(this,true)} title="Accept" color="#841584"/>}
            {this.state.typeIsDriver && <Button onPress={this.state.acceptJob.bind(this,false)} title="Reject" color="#841584"/>}
            <Button onPress={this.getImage.bind(this)} title="Take Selfie" color="#841584"/>
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
