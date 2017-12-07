import React from 'react';
import {FlatList, AsyncStorage, Alert, DatePickerAndroid, TimePickerAndroid, StyleSheet, Text, TextInput, View, Button, ScrollView,KeyboardAvoidingView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MatchDriver from './MatchedDriver';
import base64 from "base-64";
const t = require('tcomb-form-native');
var _ = require('lodash');
var moment = require('moment');
var STORAGE_KEY = 'id_token';


const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Form = t.form.Form;
var DEMO_TOKEN = "";

var JobInfo = t.struct({
  capacity: t.Number,              // a required string
  description: t.maybe(t.String),  // an optional string
  end: t.Date,              
  price: t.Number,
  start: t.Date
});

const options = {
  stylesheet: stylesheet,
  fields: {
    capacity: {
      label: 'Number of Rooms to Move',
      error: 'Cannot be blank',
    },
    start: {
      label: 'Start Time',
      mode: 'datetime',
      config: {
        format: (date) => {
          const formatedDate = moment(date).format('yyyy-MM-dd HH:mm:ss');
          return formatedDate;
        },
        dialogMode: 'spinner',
      },
      attrs:{
        style: 'color:red',
      }
    },
    end: {
      label: 'End Time',
      mode: 'datetime',
      config: {
        format: (date) => {
          const formatedDate = moment(date).format('yyyy-MM-dd HH:mm:ss');
          return formatedDate;
        },
        dialogMode: 'spinner',
      }
    },
    description:{
      multiline: true,
         stylesheet: {
          ...Form.stylesheet,
          textbox: {
            ...Form.stylesheet.textbox,
            normal: {
              ...Form.stylesheet.textbox.normal,
              height: 100
            },
            error: {
              ...Form.stylesheet.textbox.error,
              height: 100
          }
        }
      }
    }
  }
};

const listData = {}

export default class PostNewJobTabView extends React.Component {
  constructor(props) {
    super(props);      
    this.state = {
      activity: false,
      visible: false,
      listdata:[],
      username:"",
      authBase64:"",
    }
    this.getToken();
  }


async getToken(){
  var username = await AsyncStorage.getItem("username");
  console.log("USERNAME", username)
  var password = await AsyncStorage.getItem("password");
  var token = await AsyncStorage.getItem("USER_TOKEN");
  console.log("TOKEN", token)
  var authBase64 = base64.encode(`${username}:${password}`);
  this.setState({username:username, authBase64:authBase64, token:token});
}

 handleSubmit = () => {
     this.setState({visible:true});
     console.log(this.props.screenProps)
     location = {
      startLocation: {latitude: this.props.screenProps.startLoc[0], longitude:this.props.screenProps.startLoc[1]},
      endLocation: {latitude: this.props.screenProps.endLoc[0], longitude:this.props.screenProps.endLoc[1]}
     }
     console.log("AUTH0", this.state.authBase64);
     var value = this.refs.form.getValue();
     console.log("VALUE", this.refs.form.getValue())
     bodyValue = {
      "rating": 0,
      "startLocation": location.startLocation,
      "endLocation": location.endLocation,
      "capacity":value.capacity,
      "description": value.description,
      "end":value.end,
      "start":value.start,
      "price":value.price
     }
     console.log(bodyValue)
     if(!this.state.token){
      headers ={
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Basic ${this.state.authBase64}`,
      }
     } else {
      headers ={
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-auth-token': this.state.token,
      }
     }
     console.log("HEADERS", headers)
     var arrStr = encodeURIComponent(JSON.stringify([0,0]));
     fetch(global.SERVER_URL + '/job?customerEmail=' + this.state.username, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(bodyValue)
    }).then((response) => {
      //response = JSON.stringify(response)
      //console.log("this",this.props.screenProps.driver());
      console.log(response);
      if(response.status == 200){
        console.log(this.props.screenProps);
        //this.props.screenProps.driver(JSON.parse(response._bodyText));
       } 
        Alert.alert(
          "DRIVER REQUESTED!","",
          [
          {text: 'Cool', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ]
          )
        this.setState({visible:false});
       if(response.headers){
      this._onValueChange("USER_TOKEN", response.headers.map["x-auth-token"][0]);
      this._onValueChange("BASE", this.state.authBase64);
    }
      console.log(response.headers.map["x-auth-token"])
    }).catch((error) => {
      console.log("error",error);
    });
     console.log("DEMO", DEMO_TOKEN);
  }

   async _onValueChange(item, selectedValue) {
    console.log("called async", item, selectedValue);
    try {
      await AsyncStorage.setItem(item, selectedValue);
      console.log("one setting");
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


  render() {
    return(
          <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.container}>
              {}           
              <Form ref="form" type={JobInfo} options={options} />
               <Button onPress={this.handleSubmit} title="Submit" color="#841584"/>
              </View>
              <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
              </View>
          </ScrollView>
          )
     }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    padding:10,

  },
  contentContainer: {
    paddingVertical: 2
  },
  v_container: {
      flex: 1,
      padding: 8,
      backgroundColor: 'white',
      flexDirection: 'column', // main axis
      alignItems: 'center', // cross axis
    },
  containerTable: {
      marginTop: 14,
      alignSelf: "stretch",
    },
    row: {
      elevation: 1,
      borderRadius: 2,
      backgroundColor: '#FFFFF0',
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 6,
    },
    row_cell: {
      flex: 1,
      flexDirection: 'row',
    },
    row_value_status:{
      color: 'red',
      textAlignVertical: 'top',
      includeFontPadding: false,
      flex: 1,
    },
     row_value_description:{
      color: 'black',
      textAlignVertical: 'top',
      includeFontPadding: false,
      flex: 1,
    },
});


