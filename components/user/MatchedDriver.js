import React from 'react';
import { AsyncStorage,StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements';
import MatchedDriverMap from './showMatchedDriverMap';
import '../../config';

export default class MatchedDriverScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)      
    this.state = {
       driverInfo: this.props.navigation.state.params.driverInfo,
    }
    this.state.driverInfo.location = [0,0];
   this.getAllDriverInfo()
  }


   async setUp(){
      var username = await AsyncStorage.getItem("username");
      var token = await AsyncStorage.getItem("USER_TOKEN");
      var authBase64 = await AsyncStorage.getItem("BASE")
      console.log(token)
      this.setState({username:username, token:token, authBase64: authBase64});
  }


  onPress = () => {
  }

  async getAllDriverInfo() {
     await this.setUp();
     fetch(global.SERVER_URL + '/driver?email=' + this.state.driverInfo.driverEmail, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-auth-token': this.state.token,
      }
    }).then((response) => { console.log(response); return response.json();
    }).then((response) => {
        this.setState({driverInfo:response});
        this.setState({showErrorPast:false});
        if(response.error){
          console.log("here")
        }
        this.setState({refreshing:false, showErrorPast:true});
    }).catch((error) => {
      console.log("error",error);
      this.setState({refreshing:false, showErrorPast:true});
    });
  }

  goBack = () => {
    const { navigate } = this.props.navigation;
    navigate('UserPostJobScreen');
  }

  render() {
    return(
    <View style={styles.container}>
            <View style={styles.map}>
              <MatchedDriverMap driverLocation={this.state.driverInfo.location} />
            </View>
     <ScrollView contentContainerStyle={styles.contentContainer}>
     <View>
        <View style={{flex: 1, flexDirection: 'row', height:50}}>
          <Text style={{width:200}}>{this.state.driverInfo.firstName} {this.state.driverInfo.lastName} accepted this! </Text>
          <Text>Please find contact details below:</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', height:50}}>
          <Icon  name='pencil' type='evilicon' color='red'/>
          <Text style={{width:200, alignSelf: 'center'}}> {this.state.driverInfo.phone} </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', height:50}}>
          <Icon  name='envelope' type='evilicon' color='red'/>
          <Text style={{width:200, alignSelf: 'center'}}> {this.state.driverInfo.email} </Text>
        </View>
      </View>
       <Button onPress={this.goBack} title="Ok" color="#841584"/>
     </ScrollView>
    </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#eee',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  contentContainer: {
    paddingVertical: 20
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


