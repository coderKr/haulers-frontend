import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  // This tells the wrapping element to stretch to fill the width
  // of the parent element.  I choose a background color for debugging
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#222'
  },

  // This style tells the map element to fill the entire space of its parent
  map: {
    ...StyleSheet.absoluteFillObject
  },
});

export default class MyMap extends React.Component {
  render() {
    // TODO: Get this from the Device GPS
    let [lat, lng] = [40.755644, -73.956097];

    return (
      <View style={styles.wrapper}>
        <MapView
          style={styles.map}
          customMapStyle={require('./gmap_style.json')}
          region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <MapView.Circle center={{latitude: lat, longitude: lng}} radius={100} strokeWidth={10} strokeColor={'rgba(200, 200, 255, .4)'}/>
        </MapView>
      </View>
    );
  }
}
