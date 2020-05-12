import { Form, Input, Button, Rate, Slider, Upload } from 'antd';
import { Layout, Row, Col, Modal } from 'antd';
import { UploadOutlined, FormOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

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
};
 
const NewDiaryForm = () => {

  const [visible, setVisible] = useState(false);

  function handleCancel(e) {
    console.log(e);
    setVisible(false);
  };

  const onFinish = values => {
    console.log(values);
    setVisible(false);
  };

  return (
    <Header>
      <Row>
        <Col span={21}>
          <h2 className="header-title">Diario Cervecero</h2>
        </Col>
        <Col span={3}>
            <Button type="primary" onClick={() => setVisible(true)}>Nueva entrada<FormOutlined /></Button>
        </Col>
      </Row>
      <Modal
        title="Nueva entrada al diario"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form {...layout} 
        name="entrada-diario" 
        onFinish={onFinish} 
        validateMessages={validateMessages}
        >
          <Form.Item
            name='beer'
            label="Cerveza"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='style'
            label="Estilo"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='origin'
            label="Origen"
          >
            <Input />
          </Form.Item>
          <Form.Item name="srm" label="SRM">
            <Slider
              max={40}
              marks={{
                0: '0',
                10: '10',
                20: '20',
                30: '30',
                40: '40'
              }}
            />
          </Form.Item>
          <Form.Item name="abv" label="ABV">
            <Slider
              max={20}
              step={0.1}
              marks={{
                0: '0',
                5: '5',
                10: '10',
                15: '15',
                20: '20'
              }}
            />
          </Form.Item>
          <Form.Item name="ibu" label="IBU">
            <Slider
              marks={{
                0: '0',
                20: '20',
                40: '40',
                60: '60',
                80: '80',
                100: '100'
              }}
            />
          </Form.Item>
          <Form.Item name="notes" label="Notas">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="photos"
            label="Foto"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="photos" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture">
              <Button>
                <UploadOutlined /> Subir imagen
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="rate" label="Calificación">
            <Rate allowHalf />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 17 }}>
            <Button type="primary" htmlType="submit">
              Publicar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Header>
  );
};

export { NewDiaryForm };