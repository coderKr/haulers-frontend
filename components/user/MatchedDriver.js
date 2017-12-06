import React from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements';
import MatchedDriverMap from './showDriverMap';
import '../../config';

export default class MatchedDriverScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)      
    this.state = {
       driverInfo: this.props.navigation.state.params.driverInfo,
    }
  }

  onPress = () => {
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
          <Text style={{width:200}}>{this.state.driverInfo.firstName} {this.state.driverInfo.lastName} accepted this:</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', height:50}}>
          <Text style={{width:100, alignSelf: 'center'}}>Rating:</Text>
          <Text style={{width:100, alignSelf: 'center'}}>{this.state.driverInfo.rating}</Text>
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


