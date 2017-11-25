import React from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements';

export default class MatchedDriver extends React.Component {
  constructor(props) {
    super(props);      
    this.state = {
    }
  }

  onPress = () => {
  }


  render() {
    return(
     <ScrollView contentContainerStyle={styles.contentContainer}>
     <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row', height:50}}>
          <Text style={{width:200, alignSelf: 'center'}}> Jeff Accepts this: </Text>
        </View>
        <Image style={{height:50}} source={require('../../assets/goldfish.png')}/>
        <View style={{flex: 1, flexDirection: 'row', height:50}}>
          <Icon  name='sc-telegram' type='evilicon' color='#ffffff'/>
          <Text style={{width:200, alignSelf: 'center'}}> End Time </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', height:50}}>
          <Icon  name='sc-telegram' type='evilicon' color='#ffffff'/>
          <Text style={{width:200, alignSelf: 'center'}}> End Time </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', height:50}}>
           <Icon  name='sc-telegram' type='evilicon' color='#ffffff'/>
          <Text style={{width:200, alignSelf: 'center'}}> End Time </Text>
        </View>
      </View>
     </ScrollView>
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
});


