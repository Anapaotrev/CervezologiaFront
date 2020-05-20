import { Form, Input, Button, Rate, Slider, Upload, Layout, Row, Col, Modal, message } from 'antd';
import { NewDiaryForm } from "./";
import { UploadOutlined, FormOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import axios from '../../utils/axios';

const { Header } = Layout;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
};

function normFile(e) {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

const NewDiary = () => {
  const [visible, setVisible] = useState(false);

  function handleCancel(e) {
    setVisible(false);
  }

  const onFinish = (values) => {
    const diaryPost = values;
    if (values.newBeer.photoUrl) {
      const photo = values.newBeer.photoUrl[0].thumbUrl
      diaryPost.newBeer.photoUrl = photo;
    }

    axios
      .post('/diary', diaryPost)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        message.error(error.statusText);
      });
  };

  return (
    <Header>
      <Row>
        <Col span={21}>
          <h2 className="header-title">Diario Cervecero</h2>
        </Col>
        <Col span={3}>
          <Button type="primary" onClick={() => setVisible(true)}>
            Nueva entrada
            <FormOutlined onFinish={onFinish} />
          </Button>
        </Col>
      </Row>
      <Modal
        title="Nueva entrada al diario"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <NewDiaryForm />
      </Modal>
    </Header>
  );
};

export { NewDiary };
