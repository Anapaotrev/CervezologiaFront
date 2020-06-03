import { Button, Form, Input, message, Typography } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../../utils';
import './style.scss';

const { Text, Title } = Typography;

const LoginForm = () => {
  const { isAuth, setAuthStatus } = useContext(UserContext);

  const history = useHistory();

  const onSubmit = (values) => {
    axios
      .post(`/login`, values)
      .then((response) => {
        setAuthStatus({ ...response.data.user, token: response.data.token });
        history.push('/');
      })
      .catch(() => {
        message.error('Unauthorized Login');
      });
  };

  useEffect(() => {
    if (isAuth()) {
      history.push('/');
    }
  }, []);

  return (
    <Form
      onFinish={onSubmit}
      style={{ padding: '150px 20px 100px 20px' }}
      wrapperCol={{ offset: 3, span: 17 }}
    >
      <Form.Item wrapperCol={{ offset: 3, span: 17 }}>
        <Title style={{ color: '#4a2328' }} level={2}>
          Cervezología MX
        </Title>
      </Form.Item>
      <Form.Item name="email">
        <Input placeholder="Usuario" />
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
          Ingresar
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 3 }}>
        <Text style={{ fontWeight: '400' }} level={2}>
          ¿No eres un miembro? <Link to="/register">¡Regístrate ya!</Link>
        </Text>
      </Form.Item>
    </Form>
  );
};

export { LoginForm };
