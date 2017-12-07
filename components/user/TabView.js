import React from 'react';
import { TabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Icon } from 'react-native-elements';

import PostNewJobTabView from './PostNewJobTabView';
import AllJobsTabView from './AllJobsTabView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export const Tabs = TabNavigator({
  PostNewJobTabView: {
    screen: PostNewJobTabView,
    navigationOptions: {
      tabBarLabel: 'New Job',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    },
  },
  AllJobsTabView: {
    screen: AllJobsTabView,
    navigationOptions: {
      tabBarLabel: 'Old Jobs',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
  },
}

}, {lazy:true});
