import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '80%',
  height: '80%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{
         lat: 25.686613,
         lng: -100.316116
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);