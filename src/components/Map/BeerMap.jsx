import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import "./style.scss";
import { message } from 'antd';
import axios from 'axios';

const { Header } = Layout;

const BeerMap = () => {

  const [places, setPlaces] = useState([{
    name: "Beer For Us",
    category: "Deposito",
    lat: "25.643647",
    lng: "-100.276135"
  }, {
    name: "Feroz",
    category: "Bar",
    lat: "25.689537",
    lng: "-100.332932"
  }]);
  
  // useEffect(() => {
  //   axios.get('/places', {})
  //   .then((response) => {
  //     setPlaces(response.data)
  //   }).catch((error) => {
  //     message.error(error.statusText);
  //   });
  // }, []);

  return (
    <Layout>
      <Header>
      <h2 class="map-title">Mapa</h2>
      </Header>
      <MapContainer places={places}/>
    </Layout>
  );
};

export { BeerMap };
