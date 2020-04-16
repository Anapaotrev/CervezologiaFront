import { Card, Typography, List, Descriptions } from 'antd';
import React from 'react';
import './style.scss';
const { Text, Title } = Typography;

const Navbar = (props) => {

  return (
    <Title level={1} style={{ color: "#FFFFFF", paddingTop: '5px' }}>
      Cervezologia
    </Title>
  );
};

export { Navbar };

