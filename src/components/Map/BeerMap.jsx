import { Layout } from 'antd';
import React from 'react';
import MapContainer from './MapContainer';

const { Content } = Layout;

const BeerMap = () => {

  return (
    <Layout>
      <Content>
        <MapContainer />
      </Content>
    </Layout>
  );
};

export { BeerMap };