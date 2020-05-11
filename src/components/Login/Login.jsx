import { Col, Row } from 'antd';
import React from 'react';
import { LoginForm } from './LoginForm';
import './style.scss';

const Login = () => (
  <Row justify="center" className="top-row">
    <Col md={24} lg={24} xl={16} className="shadow">
      <Row>
        <Col className="img-center" md={0} lg={12} xl={12}>
          <img
            className="img-beer"
            src={require('../../assets/logo-color.png')}
          />
        </Col>
        <Col className="form-col" lg={12} md={24} xl={12}>
          <LoginForm />
        </Col>
      </Row>
    </Col>
  </Row>
);

export { Login };
