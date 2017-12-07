import React from 'react';
import {Alert, AsyncStorage, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
var base64js = require('base64-js')

export default class JobDetailsScreen extends React.Component{
	constructor(props) {
    	super(props);
      this.state = {
        jobDetails: this.props.navigation.state.params.jobInfo,
        acceptJob: this.props.navigation.state.params.acceptJob,
      }
      console.log("CONSOLE JOB DETAILS", this.state.jobDetails);
      console.log("ACCEPT JOB", this.state.acceptJob)
      this.setUp();
    }

  async setUp(){
    var type = await AsyncStorage.getItem("TYPE");
    var token = await AsyncStorage.getItem("DRIVER_TOKEN")
    console.log(type)
    if(type == 'Driver'){
      typeIsDriver = true;
    }else {
      typeIsDriver = false;
    }
    this.setState({typeIsDriver: typeIsDriver, token:token});
  }

  async acceptJob(shouldAccept) {
    await this.setUp();
    var status = shouldAccept ? 'MATCHED' : 'DECLINED';
    bodyValue = {
        'driverEmail': this.state.jobDetails.driverEmail,
        'jobId':this.state.jobDetails.id,
        'response': status
      }
    console.log("BODY", bodyValue)
    fetch(global.SERVER_URL + '/job/driver/respond', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-auth-token': this.state.token,
      },
      body:JSON.stringify(bodyValue)
    }).then((response) => {
          this.setState({oldJobData:response.response});
          this.setState({showErrorPast:false});
          this.state.acceptJob();
          const { navigate } = this.props.navigation;
          navigate('DriverAllJobsScreen');
        this.setState({refreshing:false});
    }).catch((error) => {
      console.log("error",error);
      this.setState({refreshing:false});
    });
  }

  // getImage = () => {
  //   var options = {
  //     title: 'Upload image',
  //     cancelButtonTitle: 'Cancel',
  //     takePhotoButtonTitle: 'Take Photo...',
  //     chooseFromLibraryButtonTitle: 'Choose from Library...',
  //     returnBase64Image: true,
  //     returnIsVertical: false
  //   };
  //   ImagePicker.showImagePicker(options, (type, response) => {
  //     if (type !== 'cancel') {
  //       var source;
  //       if (type === 'data') { 
  //         source = {uri: 'data:image/jpeg;base64,' + response, isStatic: true};
  //       } else { 
  //         source = {uri: response};
  //       }

  //       console.log("uploading image");

  //        fetch(global.SERVER_URL + '/customer/images',{
  //          method: 'POST',
  //          body: "data=" + encodeURIComponent(source.uri)
  //        }).then(response => {
  //          console.log("image uploaded")
  //          console.log(response)
  //        }).catch(console.log);

  //       //this.setState({avatarSource:source});
  //     } else {
  //       console.log('Cancel');
  //     }
  //   });
  // }

	static navigationOptions = {
		title: 'UberMover',
	}


	render(){
		return(
         <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <Text> REQUESTED JOB DETAILS: </Text>
            <View style={{flexDirection: 'row', height:50}}>
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
            {this.state.typeIsDriver && <Button onPress={this.acceptJob.bind(this,true)} title="Accept" color="#841584"/>}
            {this.state.typeIsDriver && <Button onPress={this.acceptJob.bind(this,false)} title="Reject" color="#841584"/>}
      </View>
     </ScrollView>
		);
	}
} 

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    width:400,
  },
});
