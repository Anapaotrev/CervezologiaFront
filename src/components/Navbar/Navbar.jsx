import { Card, Typography, List, Descriptions, Button, Row, Col, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../utils';
import './style.scss';

const { Text, Title } = Typography;

const Navbar = (props) => {
  
  const { isAuth, setUnauthStatus } = useContext(UserContext);
  const location = useLocation();
  const [currentKey, setCurrentKey] = useState(location.pathname);

  return (
    <Row align="middle">
      <Col span={16}>
        <img src={ require('../../assets/logo-color.png') } className="logo"/>
        <Text style={{ paddingTop: '5px', fontWeight: '800', fontSize: '20px', color: '#000000' }}>
          Cervezología MX
        </Text>
      </Col>
      <Menu 
        onClick={(e) => setCurrentKey(e.key)} 
        mode="horizontal" 
        selectedKeys={[currentKey]} 
        style={{ backgroundColor: 'rgb(240,242,245)'}}
      >
        <Menu.Item key='/'> 
          <Link to="/" className="link">HOME</Link>
        </Menu.Item>
        <Menu.Item key='/map'>
          <Link to="/map" className="link">MAPA</Link>
        </Menu.Item>
        { isAuth() && 
        <Menu.Item key='/diary'>
          <Link to="/diary" className="link">DIARIO</Link>
        </Menu.Item>
        }
        <Menu.Item key='/login'>
        {isAuth() ? (
          <Link onClick={() => setUnauthStatus()}>LOGOUT</Link>
        ) : (
          <Link to="/login" className="login-button">LOGIN</Link>
        )}
        </Menu.Item>
      </Menu>
    </Row>
  );
};

export { Navbar };
