import { Card, Typography, Input, Button, Form, Col, Row, message } from 'antd';
import React, { useContext, useState } from 'react';
import { EyeOutlined, QuestionOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../utils';
import './style.scss';

const { Text, Title } = Typography;

const RegisterForm = (props) => {
  const history = useHistory();
  const { setAuthStatus } = useContext(UserContext);

  const [values, setValues] = useState({ user: '', password: '' });

  const onSubmit = (values) => {
    axios
      .post(`/register`, values)
      .then((response) => {
        setAuthStatus({ ...response.user, token: response.token });
      })
      .catch((error) => {
        message.error(error.response.data.error);
      });
  };

  return (
    <Form
      onFinish={onSubmit}
      style={{ padding: '150px 75px 100px 10px' }}
      wrapperCol={{ offset: 6, span: 16 }}
    >
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Title style={{ color: '#4a2328' }} level={2}>
          Registrate!
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
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
};

export { RegisterForm };
