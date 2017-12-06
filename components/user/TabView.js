import React from 'react';
import { TabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Icon } from 'react-native-elements';

import Mover from './Mover';
import Hauler from './Hauler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export const Tabs = TabNavigator({
  Mover: {
    screen: Mover,
    navigationOptions: {
      tabBarLabel: 'New Job',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    },
  },
  Hauler: {
    screen: Hauler,
    navigationOptions: {
      tabBarLabel: 'Old Jobs',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
  },
}

}, {lazy:true});
