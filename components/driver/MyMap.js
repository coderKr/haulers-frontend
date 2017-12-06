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

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class MyMap extends React.Component {
  state = {errorMsg:null, location: { coords: {latitude: 0, longitude: 0}}};
  constructor(props){
    super(props);
  }
  
  componentWillMount(){
    this._getPosition();
  }

  onDragEnd = (e) =>{
    console.log(e);
  }

  onRegionChange = (region) => {
    locationChanged = { coords:{
      latitude:region.latitude,
      longitude:region.longitude
    }
   }
    this.setState({region:region, location: locationChanged});
    this.props.screenProps(region);
  }

  async _getPosition(){
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS).then((location) => {
        this.locationChanged(location);
        this.map.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 200)
      }).catch((e) => {
         alert(e + ' Please make sure your location (GPS) is turned on.');
      });
    } else {
      throw new Error('Location permission not granted');
    }
  }

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05
    };
    console.log(this.state.location);
    this.setState({location, region});
  }

 
  render() {
    let [lat, lng] = [0, 0];
    //let region = {latitude:0, longitude:0, latitudeDelta: 0.1, longitudeDelta: 0.05};
    let text = "";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if(this.state.location){
      lat = this.state.location.coords.latitude;
      lng = this.state.location.coords.longitude;
    }
    return (
      <View style={styles.wrapper}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          region={this.state.region}
          showUserLocation = {true}
          onRegionChange={this.onRegionChange}>
          <MapView.Circle center={{latitude: lat, longitude: lng}} radius={100} strokeWidth={10} strokeColor={'rgba(200, 200, 255, .4)'}/>
          <MapView.Marker draggable
            coordinate={this.state.location.coords}/>
          <MapView.Marker draggable
            coordinate={this.state.location.coords}/>
        </MapView>
      </View>
    );
  }
}
