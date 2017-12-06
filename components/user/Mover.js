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

export default class Mover extends React.Component {
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
    this.onPendingJobs();
  }


async getToken(){
  var username = await AsyncStorage.getItem("username");
  var password = await AsyncStorage.getItem("password");
  var authBase64 = base64.encode(`${username}:${password}`);
  this.setState({username:username, authBase64:authBase64});
}

 handleSubmit = () => {
     this.setState({visible:true});
     console.log(this.props.screenProps)
     location = {
      startLocation: {latitiude: this.props.screenProps.startLoc[0], longitude:this.props.screenProps.startLoc[1]},
      endLocation: {latitiude: this.props.screenProps.endLoc[0], longitude:this.props.screenProps.endLoc[1]}
     }
  
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
     var arrStr = encodeURIComponent(JSON.stringify([0,0]));
     fetch('http://100.64.4.146:8080/job?customerEmail=' + this.state.username, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Basic ${this.state.authBase64}`,
      },
      body: JSON.stringify(bodyValue)
    }).then((response) => {
      //response = JSON.stringify(response)
      console.log(response);
      if(response.status == 200){
        this.props.screenProps(response._bodyText);
       } else {
        Alert.alert(
          "No Driver Available!","",
          [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ]
          )
        this.setState({visible:false});
       }
      console.log(response.headers.map["x-auth-token"])
      this._onValueChange("USER_TOKEN", response.headers.map["x-auth-token"][0]);
      this._onValueChange("BASE", this.state.authBase64);
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

  onPendingJobs = () => {
     fetch('http://100.64.4.146:8080/job/all', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      data = JSON.parse(response._bodyText);
      this.setState({listdata:data});
    });
  }

  renderRow = ({item}) => {
  const status = `${item.status}`;
  const description = `${item.description}`;
 
  let actualRowComponent =
      <View style={styles.row}>
        <View style={styles.row_cell}>
        <Text style={styles.row_value_status}>{status}</Text>
        <Text style={styles.row_value_description}>{description}</Text>
      </View>
      </View>
  return actualRowComponent
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


