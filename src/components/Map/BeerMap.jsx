import { Layout, Row, Col, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import "./style.scss";
import { message } from 'antd';
import axios from 'axios';

const { Header } = Layout;

const BeerMap = () => {

  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState([])
  
   useEffect(() => {
    axios.get('/places', {
      params: {
        category: filter
      }
    })
    .then((response) => {
      setPlaces(response.data)
    }).catch((error) => {
      message.error(error.statusText);
    });
  }, [filter]);

  function onChange(checkedValues) {
    if (checkedValues.length == 0) {
      setFilter(['.'])
    } else {
      setFilter(checkedValues);
    }
  }

  return (
    <Layout>
      <Header>
        <Row>
          <Col span={17}>
            <h2 className="map-title">Mapa</h2>
          </Col>
          <Col span={7}>
            <Checkbox.Group onChange={onChange} defaultValue={['Cerveceria', 'Deposito', 'Bar']}>
                <Checkbox style={{color: "white"}} value="Cerveceria">Cervecerías</Checkbox>
                <Checkbox style={{color: "white"}} value="Deposito">Depósitos</Checkbox>
                <Checkbox style={{color: "white"}} value="Bar">Bares</Checkbox>
            </Checkbox.Group>
          </Col>
        </Row>
      
      </Header>
      <MapContainer places={places}/>
    </Layout>
  );
};

export { BeerMap };
