import React from 'react';
import {FlatList, AsyncStorage, Alert, DatePickerAndroid, TimePickerAndroid, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Bar from 'react-native-bar-collapsible';
import MatchDriver from './MatchedDriver';
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


// Possible Screen States (JS doesn't have Enum's)
const DRIVER_INFO= 'di';
const JOB_INFO = 'ji';
const listData = {}

export default class Mover extends React.Component {
  constructor(props) {
    super(props);      
    this.state = {
      activity: false,
      visible: false,
      screen: JOB_INFO,
      listdata:[]
    }
    this.onPendingJobs();
  }


 async handleSubmit() {
     this.setState({visible:true});
     DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
     console.log(DEMO_TOKEN);
     var value = this.refs.form.getValue();
     console.log(value);
     fetch('http://100.64.4.146:8080/job?userEmail=' + DEMO_TOKEN , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value, "rating":0)
    }).then((response) => {
      console.log(response);
      if(response.status == 200){
        console.log("SUCCESS");
        this.setState({visible:false, screen:DRIVER_INFO});
       } else {
        Alert.alert(
          "No Driver Available!","",
          [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ]
          )
        this.setState({visible:false, screen:DRIVER_INFO});
        console.log(this.props.screenProps);
        this.props.screenProps();
       }
    }).catch((error) => {
      console.log("error",error);
    });
     console.log("DEMO", DEMO_TOKEN);
  }

  goback = () => {
    this.setState({screen:JOB_INFO});
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
    const {screen} = this.state;
    console.log("STATE", this.state.listdata);
    switch(screen) {
      case JOB_INFO:
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
              <View style={styles.v_container}>
                <FlatList style={styles.containerTable} data={this.state.listdata} renderItem={this.renderRow} keyExtractor={item => item.start}/>
              </View>
            </Bar>
          </ScrollView>
          )
        break;

      case DRIVER_INFO:
        default:
          return(
            <View style={styles.container}>
              <View>
                <MatchDriver/>
              </View>
              <Button onPress={this.goback.bind(this)} title="Go Back" color="#841584"/>
            </View>
            );
    }}
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


