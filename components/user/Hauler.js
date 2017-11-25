import React from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button } from 'react-native';

export default class Hauler extends React.Component {
  constructor(props) {
    super(props);      
    this.state = {
      activity: false
    }
  }

  render() {
    return(<Text>Enters Hauler</Text>);
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


