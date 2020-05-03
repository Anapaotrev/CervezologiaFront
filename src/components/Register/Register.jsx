import { Card, Typography, Input, Button, Form, Col, Row, message } from 'antd';
import React, { useContext, useState } from 'react';
import { EyeOutlined, QuestionOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../utils';
import './style.scss';
import { RegisterForm } from './RegisterForm';

const { Text, Title } = Typography;

const Register = () => {
  return (
    <Row justify="center">
      <Col md={24} lg={24} xl={16} className="shadow">
        <Row>
          <Col className="img-center" md={0} lg={12} xl={12}>
            <img
              className="img-beer"
              src={require('../../assets/logo-color.png')}
            />
          </Col>
          <Col className="form-col" lg={12} md={24} xl={12}>
            <RegisterForm />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export { Register };
