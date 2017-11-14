import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

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

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeInterval:1, maximumAge:1};

export default class MyMap extends React.Component {
  state = {errorMsg:null, locationResult: null};
  constructor(props){
    super(props);
    this.state = {locationResult: null, errorMsg:null}
  }
  
  componentWillMount(){
    //Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    this.locationChanged();
  }

  locationChanged = async() => {
    console.log("CALLED")
    let { status } = await Permissions.getAsync(Permissions.LOCATION);
    console.log("STATUS",status)
    if (!status || status !== 'granted') {
      this.setState({
        errorMsg: 'Permission to access location was denied',
      });
    } else {
    let location = await Location.getCurrentPositionAsync({});
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    },
    this.setState({locationResult:region})
  }
  }

  render() {
    // TODO: Get this from the Device GPS
    let [lat, lng] = [0, 0];
    let text = ""
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if(this.state.locationResult){
      lat = this.state.locationResult.latitude;
      lng = this.state.locationResult.longitude;
    }
    console.log("IS STATE", lat);
    //let [lat, lng] = [40.755644, -73.956097];

    return (
      <View style={styles.wrapper}>
        <Text>{text}</Text>
        <MapView
          style={styles.map}
          customMapStyle={require('./gmap_style.json')}
          region={this.state.locationResult}
        >
          <MapView.Circle center={{latitude: lat, longitude: lng}} radius={100} strokeWidth={10} strokeColor={'rgba(200, 200, 255, .4)'}/>
        </MapView>
      </View>
    );
  }
}
