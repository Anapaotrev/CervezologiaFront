import { Button, Form, Input, message, Typography } from 'antd';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../utils';
import './style.scss';

const { Text, Title } = Typography;

const RegisterForm = (props) => {
  const history = useHistory();
  const { setAuthStatus } = useContext(UserContext);

  const onSubmit = (values) => {
    axios
      .post(`/register`, values)
      .then(() => {
        history.push('./login');
      })
      .catch((error) => {
        message.error(error.response.data.error);
      });
  };

  return (
    <Form
      onFinish={onSubmit}
      style={{ padding: '150px 20px 100px 20px' }}
      wrapperCol={{ offset: 3, span: 17 }}
    >
      <Form.Item wrapperCol={{ offset: 3, span: 17 }} style={{textAlign: "center"}}>
        <Title style={{ color: '#4a2328' }} level={2}>
          ¡Registrate!
        </Title>
      </Form.Item>
      <Form.Item name="name">
        <Input placeholder="Usuario" />
      </Form.Item>
      <Form.Item name="email">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password placeholder="Contraseña" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 3, span: 17 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: '100%',
            backgroundColor: '#f28e1c',
            borderColor: '#f4a33f',
            color: '#FFFFFF',
          }}
        >
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
};

export { RegisterForm };

