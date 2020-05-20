import { Form, Input, Button, Rate, Slider, Upload, Layout, Row, Col, Modal, message } from 'antd';

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

const NewDiaryForm = (props) => {
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    const diaryPost = values;
    if (values.newBeer && values.newBeer.photos) {
      const photos = values.newBeer.photos.map(function (o) {
        return o.thumbUrl;
      });
      diaryPost.newBeer.photos = photos;
    }

    if (props.beer) {
      diaryPost.beer = props.beer;
    }

    axios
      .post('/diary', diaryPost)
      .then((response) => {
        message.success("Cerveza agregada correctamente!");
      })
      .catch((error) => {
        message.error(error.statusText);
      });

    setVisible(false);
  };

  const beerInput = props.beer ? (
    <>
      <Form.Item label="Cerveza">
        <Input value={props.name} disabled />
      </Form.Item>
    </>
  ) : (
    <>
      <Form.Item
        name={['newBeer', 'name']}
        label="Cerveza"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={['newBeer', 'style']} label="Estilo">
        <Input />
      </Form.Item>
      <Form.Item name={['newBeer', 'origin']} label="Origen">
        <Input />
      </Form.Item>
      <Form.Item name={['newBeer', 'srm']} label="SRM">
        <Slider
          max={40}
          marks={{
            0: '0',
            10: '10',
            20: '20',
            30: '30',
            40: '40',
          }}
        />
      </Form.Item>
      <Form.Item name={['newBeer', 'abv']} label="ABV">
        <Slider
          max={20}
          step={0.1}
          marks={{
            0: '0',
            5: '5',
            10: '10',
            15: '15',
            20: '20',
          }}
        />
      </Form.Item>
      <Form.Item name={['newBeer', 'ibu']} label="IBU">
        <Slider
          marks={{
            0: '0',
            20: '20',
            40: '40',
            60: '60',
            80: '80',
            100: '100',
          }}
        />
      </Form.Item>
      <Form.Item
        name={['newBeer', 'photos']}
        label="Foto"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="photos"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
        >
          <Button>
            <UploadOutlined /> Subir imagen
          </Button>
        </Upload>
      </Form.Item>
    </>
  );

  return (
    <Form {...layout} name="entrada-diario" onFinish={onFinish} validateMessages={validateMessages}>
      {beerInput}
      <Form.Item name="notes" label="Notas">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="rating" label="Calificación">
        <Rate allowHalf />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 17 }}>
        <Button type="primary" htmlType="submit">
          Publicar
        </Button>
      </Form.Item>
    </Form>
  );
};

export { NewDiaryForm };