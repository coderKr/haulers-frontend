import React from 'react';
import {AsyncStorage, Alert, DatePickerAndroid, TimePickerAndroid, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
const t = require('tcomb-form-native');
var _ = require('lodash');
var moment = require('moment');
var STORAGE_KEY = 'id_token';


const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Form = t.form.Form;
//Form.templates.datepicker = TimePickerAndroid.open({is24Hour: true});

var JobInfo = t.struct({
  capacity: t.Number,              // a required string
  description: t.maybe(t.String),  // an optional string
  end: t.Date,              
  price: t.Number,
  start: t.Date
});
// stylesheet.formGroup.normal.flexDirection = 'row';
// stylesheet.formGroup.error.flexDirection = 'row';
// stylesheet.textbox.normal.flex = 1;
// stylesheet.textbox.error.flex = 1;

//const myFormatFunction = format => date => formatDate(format, date)
//const myFormat1 = 'yyyy-mm-d h:f:s'

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

export default class Mover extends React.Component {
  constructor(props) {
    super(props);      
    this.state = {
      activity: false,
      visible: false,
    }
  }

  // onPress = () => {
  //   this.setState({visible:false});
  // }


 async handleSubmit() {
     var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
     console.log(DEMO_TOKEN);
     var value = this.refs.form.getValue();
     console.log(value);
     fetch('http://100.64.4.146:8080/job?userEmail=' + DEMO_TOKEN , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value, "email":DEMO_TOKEN)
    }).then((response) => {
      console.log(response);
      if(response.status == 200){
        console.log("SUCCESS");
       } else {
        Alert.alert(
          "No Driver Available!","",
          [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ]
          )
       }
    }).catch((error) => {
      console.log("error",error);
    });
     console.log("DEMO", DEMO_TOKEN);
  }

  render() {
    return(
     <ScrollView contentContainerStyle={styles.contentContainer}>
     <Bar title='Post a new job' collapsible={true} showOnStart={true} iconCollapsed='chevron-right' iconOpened='chevron-down'>
      <View style={styles.container}>
        {}           
        <Form ref="form" type={JobInfo} options={options} />
      </View>
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View>
      <Button onPress={this.handleSubmit.bind(this)} title="Submit" color="#841584"/>
      </Bar>
       <Bar title='Pending Jobs' collapsible={true} showOnStart={true} iconCollapsed='chevron-right' iconOpened='chevron-down'>
          <View style={styles.content}>
            <Text>Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs</Text>
          </View>
     </Bar>
     </ScrollView>
    );
  }
};


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
});


