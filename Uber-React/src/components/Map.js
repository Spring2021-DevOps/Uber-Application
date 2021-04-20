import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '62%',
  height: '60%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 42.332489,
            lng: -71.109189
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ''

})(MapContainer);