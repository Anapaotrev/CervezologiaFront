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

  return (
    <Header>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={19}>
          <h2 className="header-title">Diario Cervecero</h2>
        </Col>
        <Col className="gutter-row" span={5}>
          <Button 
            type="primary" 
            onClick={() => setVisible(true)} 
            style={{ backgroundColor: '#FCB941', borderColor: '#FCB941' }}
            block
          >
            <p className="text-overflow">
              <FormOutlined />  Nueva entrada
            </p>
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
