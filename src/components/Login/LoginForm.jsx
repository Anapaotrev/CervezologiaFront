import { Button, Form, Input, message, Typography } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../utils';
import { useHistory, Link } from 'react-router-dom';
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
      .catch((error) => {
        message.error(error.response.data.error);
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
      style={{ padding: '150px 75px 100px 10px' }}
      wrapperCol={{ offset: 6, span: 16 }}
    >
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Title style={{ color: '#4a2328' }} level={2}>
          Cervezologia
        </Title>
      </Form.Item>
      <Form.Item name="email">
        <Input placeholder="Usuario" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password placeholder="Contraseña" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
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
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Text style={{ fontWeight: '400' }} level={2}>
          ¿No eres un miembro? <Link to="/register">¡Regístrate ya!</Link>
        </Text>
      </Form.Item>
    </Form>
  );
};

export { LoginForm };
