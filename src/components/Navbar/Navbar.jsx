import { Card, Typography, List, Descriptions, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../../utils';
import './style.scss';

const { Text, Title } = Typography;

const Navbar = (props) => {
  const { isAuth, setUnauthStatus } = useContext(UserContext);
  return (
    <Row justify="end" align="middle">
      <Col span={22}>
        <Text style={{ paddingTop: '5px', fontWeight: '800', fontSize: '20px', color: '#000000' }}>
          Cervezologia
        </Text>
      </Col>
      <Col span={1}>
        <Link to="/" className="link">HOME</Link>
      </Col>
      <Col span={1} justify="end">
        {isAuth() ? (
          <Link onClick={() => setUnauthStatus()}>LOGOUT</Link>
        ) : (
          <Link to="/login" className="login-button">
            LOGIN
          </Link>
        )}
      </Col>
    </Row>
  );
};

export { Navbar };
