import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component, } from 'react';
import { Descriptions } from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';

const mapStyle = {
  width: '79.2%',
  height: '65%'
};

const mapStyles = [{
  "featureType": "poi",
  "elementType": "labels.icon",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
}]

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
        styles={mapStyles}
        initialCenter={{
         lat: 25.686613,
         lng: -100.316116
        }}
        onClick={this.onClose}
      >
        {this.props.places.map((place, index) => {
          var color;
          switch(place.category) {
            case "Bar":
              color = "orange";
              break;
            case "Deposito":
              color = "green";
              break;
            case "Cerveceria":
              color = "yellow";
              break;
            default:
              color = "red";
          }
          const icon = `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`
          return (
            <Marker key={index} id={index} 
            position={{
              lat: place.lat,
              lng: place.lng,
            }}
            icon= { icon }
            onClick={this.onMarkerClick}
            name={place.name}
            category={place.category} 
            instagram={place.instagram}
            schedule={place.schedule}
            website={place.website}
            address={place.address}
            phoneNo={place.phoneNo}
            />
          )
        })}
        <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
        >
          <div>
            <h2>{this.state.selectedPlace.name}</h2>
            <h1>{this.state.selectedPlace.category}</h1>
            { this.state.selectedPlace.schedule != "-" && <h4>Horario: {this.state.selectedPlace.schedule}</h4> }
            <h4>Instagram: 
              <a href={`https://www.instagram.com/${this.state.selectedPlace.instagram}`} target="_blank">
                {this.state.selectedPlace.instagram}
              </a>
            </h4>
            { this.state.selectedPlace.website != "-" && 
              <h4>Website: 
                <a href={this.state.selectedPlace.website} target="_blank">{this.state.selectedPlace.website}</a>
              </h4>
            }
            { this.state.selectedPlace.address != "-" && <h4>Dirección: {this.state.selectedPlace.address}</h4> }
            { this.state.selectedPlace.phoneNo != "-" && <h4>Contacto: {this.state.selectedPlace.phoneNo}</h4> }
          </div>
          {/* <Descriptions title={this.state.selectedPlace.name}>
            <DescriptionsItem label="Teléfono">{this.state.selectedPlace.phoneNo}</DescriptionsItem>
            <DescriptionsItem label="Instagram">
              <a href={`https://www.instagram.com/${this.state.selectedPlace.instagram}`} target="_blank">
                {this.state.selectedPlace.instagram}
              </a>
            </DescriptionsItem>
            <DescriptionsItem label="Website">
              <a href={this.state.selectedPlace.website} target="_blank">{this.state.selectedPlace.website}</a>
            </DescriptionsItem>
            <DescriptionsItem label="Dirección">{this.state.selectedPlace.address}</DescriptionsItem>
            <DescriptionsItem label="Horario">{this.state.selectedPlace.schedule}</DescriptionsItem>
            <DescriptionsItem label="Categoría">{this.state.selectedPlace.category}</DescriptionsItem>
          </Descriptions> */}
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);