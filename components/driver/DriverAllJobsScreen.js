import React from 'react';
import {AsyncStorage,FlatList, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button, ScrollView,TouchableOpacity, RefreshControl} from 'react-native';
import Bar from 'react-native-bar-collapsible';
import { StackNavigator } from 'react-navigation';
import base64 from "base-64";

export default class DriverAllJobsScreen extends React.Component {
  constructor(props) {
    super(props);     
    this.state = {
      activity: false,
      listdata:{},
      pendingJobData:{},
      oldJobData:{},
      showErrorPast:true,
      showErrorPending:true,
      refreshing: false,
    }
    this.setUp();
    this.loadPendingJobs();
    this.loadOldJobs();
  }


  async setUp(){
      var drivername = await AsyncStorage.getItem("drivername");
      var driverpassword = await AsyncStorage.getItem("driverpassword");
      var token = await AsyncStorage.getItem("DRIVER_TOKEN");
      var authBase64 = base64.encode(`${drivername}:${driverpassword}`);
      this.setState({username:drivername, authBase64: authBase64, token:token});
  }

  async loadOldJobs(){
     await this.setUp();
     console.log("I AM SENDINF THIS TOKEN", this.state.token)
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
     fetch(global.SERVER_URL + "/job/driver?driverEmail=" + this.state.username + "&type=past", {
      method: 'GET',
      headers: headers,
    }).then((response) => { console.log(response); return response.json();
    }).then((response) => {
        if(response.length>0){
          this.setState({pendingJobData:response});
           this.setState({showErrorPending:false});
        }
    }).catch((error) => {
      console.log("error",error);
    });
  }


  async loadPendingJobs(){
     await this.setUp();
     fetch(global.SERVER_URL + '/job/customer?driverEmail=' + this.state.username + "&type=pending", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Basic ${this.state.authBase64}`,
      }
    }).then((response) => { return response.json();
    }).then((response) => {
        if(response.length>0){
          this.setState({oldJobData:response.response});
           this.setState({showErrorPast:false});
        }
        if(response.error){
          console.log("here")
        }
        this.setState({refreshing:false});
    }).catch((error) => {
      console.log("error",error);
      this.setState({refreshing:false});
    });
  }

  acceptJob = (accepted) => {
    console.log("reached",accepted);
  }

  _onPress = (item) => {
    const { navigate } = this.props.navigation;
    navigate('JobDetailsScreen',{jobInfo: item, acceptJob: this.acceptJob});
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    this.loadPendingJobs();
    this.loadOldJobs();
  }

  renderRow = ({item}) => {
  console.log(item)
  if(!item){
    return <Text> No Jobs To Show </Text>
  }
  const status = `${item.status}`;
  const description = `${item.description}`;
 
  let actualRowComponent =
     <TouchableOpacity onPress={this._onPress.bind(this, item)}>
      <View style={styles.row}>
          <View style={styles.row_cell}>
            <Text style={styles.row_value_status}>{status}</Text>
            <Text style={styles.row_value_description}>{description}</Text>
           </View>
        </View>
        </TouchableOpacity>
  return actualRowComponent
}

  render() {
    return(
      <ScrollView contentContainerStyle={styles.contentContainer} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}/>}>
           <Bar title='Pending jobs' collapsible={true} showOnStart={true} iconCollapsed='chevron-right' iconOpened='chevron-down'>
              <View style={styles.container}>
                <FlatList style={styles.containerTable} data={this.state.pendingJobData} renderItem={this.renderRow} keyExtractor={item => item.id} />
                { this.state.showErrorPending && <Text> No Jobs to Show </Text>}
              </View>
            </Bar>
            <Bar title='Past Jobs' collapsible={true} showOnStart={true} iconCollapsed='chevron-right' iconOpened='chevron-down'>
              <View style={styles.v_container}>
                <FlatList style={styles.containerTable} data={this.state.oldJobData} renderItem={this.renderRow} keyExtractor={item => item.id}/>
                { this.state.showErrorPast && <Text> No Jobs to Show </Text>}
              </View>
            </Bar>
          </ScrollView>
          )
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


