import React from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, Button } from 'react-native';

export default function() {
  return (
  	<KeyboardAvoidingView behavior={'padding'} style={[styles.centeredView, {backgroundColor: 'white', padding: 40}]}>
  		<TextInput placeholder="Enter Code" keyboardType={'numeric'} maxLength={12} style={styles.phoneNumberInput} editable={!this.state.activity}/>
        <Button onPress={this.onJoin} title="JOIN" color="#841584" accessibilityLabel="Learn more about this purple button"/>
        <ActivityIndicator animating={this.state.activity} size={'large'} style={{margin: 20}}/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#222'
  },
  centeredView: {
    flex:1,
    alignItems:'stretch',
    justifyContent:'center'
  },

  // Probably this style should get moved into a dedicated PhoneValidation component.
  phoneNumberInput: {
    marginTop: 20,
    marginBottom:20,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    lineHeight:20,
    height:40,
    backgroundColor: 'white'
  }
});