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

export default class MapUser extends React.Component {
  state = {errorMsg:null, location: { coords: {latitude: 0, longitude: 0}}, locationDest:{latitude:0, longitude:0}, start:{}, end:{}};
  constructor(props){
    super(props);
  }
  
  componentWillMount(){
    this._getPosition();
  }

  onDragEndStart(e){
    console.log("here");
    console.log(e.nativeEvent.coordinate);
    this.props.start(e.nativeEvent.coordinate);
    
  }

  onDragEndDest(e){
     console.log(e.nativeEvent.coordinate);
    this.props.end(e.nativeEvent.coordinate);
  }

  onRegionChange = (region) => {
    console.log(this.state.start)
    locationChanged = { coords:{
      latitude:region.latitude,
      longitude:region.longitude
    }
   }
   
    this.setState({region:region, location: locationChanged});
    //this.props.screenProps(region);
  }

  onPressMarker = (e) => {
  setTimeout(() => // sadly, we need timeout to make this command run in next cycle, after map updates.
    this._markers[e.nativeEvent.id].showCallout()
    , 0);
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
     newCoords = {
      "latitude": region.latitude + 0.001,
      "longitude": region.longitude+ 0.01
    }
    this.setState({location, region, locationDest:newCoords});
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
    //this.setState({coordsDest: { "latitude": this.state.location.coords.latitude + 0.5, "longitude": this.state.location.coords.longitude + 0.5}});
    return (
      <View style={styles.wrapper}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          region={this.state.region}
          showUserLocation = {true}
          onRegionChange={this.onRegionChange}
          >
          <MapView.Marker onDragEnd={e => this.onDragEndStart(e)} draggable pinColor="blue" title={'You are here'}
            coordinate={this.state.location.coords} onPress={e => this.onPressMarker}/>
          <MapView.Marker  onDragEnd={e => this.onDragEndDest(e)} draggable key={'i291'} title={'Dest'}
            coordinate={this.state.locationDest} onPress={e => this.onPressMarker}/>
        </MapView>
      </View>
    );
  }
}
