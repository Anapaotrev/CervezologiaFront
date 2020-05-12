import { Layout, Row, Col, Button, Modal } from 'antd';
import React from 'react';
import "./style.scss";
import { NewDiaryForm } from './NewDiaryForm';

const { Content } = Layout;

const Diary = () => {

  return (
    <Layout>
      <NewDiaryForm />
      <Content>
        <p>Diary posts</p>
      </Content>
    </Layout>
  );
};

export { Diary };