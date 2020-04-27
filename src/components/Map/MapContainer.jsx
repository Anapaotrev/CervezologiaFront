import React, { Component, } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


const mapStyle = {
  width: '79.2%',
  height: '65%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker      
  };
  
  onMarkerClick = (props, marker, e) => 
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyle}
        initialCenter={{
         lat: 25.686613,
         lng: -100.316116
        }}
      >
        {console.log("PLACES:")}
        {console.log(this.props.places)}
        {this.props.places.map((place, index) => {
          {console.log(place.name)}
          return (
            <Marker key={index} id={index} position={{
              lat: place.lat,
              lng: place.lng
            }}
            onClick={this.onMarkerClick}
            name={place.name}
            category={place.category} 
            />
          )
        })}
        <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <h5>{this.state.selectedPlace.category}</h5>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);