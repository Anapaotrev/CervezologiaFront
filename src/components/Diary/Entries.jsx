import { Layout, List, Carousel, Space, Rate, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { NewDiary } from '.';
import axios from '../../utils/axios';
import './style.scss';

const { Content } = Layout;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Desc = ({ style, origin }) => (
  <Space>
    <b>Estilo: </b> {style} <b>Origen: </b> {origin}
  </Space>
);

const Entries = ({ diaries, setDiaries }) => {
  const deleteDiary = (id) => {
    axios
      .delete(`/diary/${id}`)
      .then((response) => {
        setDiaries(diaries.filter((entry) => entry._id != id));
        message.info('Entrada borrada');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <Layout>
      <NewDiary />
      <Content>
        <List
          className="diary-posts"
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 4,
          }}
          dataSource={diaries}
          renderItem={(item) => {
            let { beer } = item;
            if (!beer) {
              beer = item.newBeer;
            }
            return (
              <List.Item
                key={item.title}
                extra={
                  <img
                    alt="beer"
                    src={beer.photoUrl || 'https://imgur.com/ysHDKVt.jpg'}
                    style={{ width: '180px' }}
                  />
                }
                actions={[
                  <Popconfirm
                    key="borrar"
                    placement="bottom"
                    title={'Deseas borrar esta entrada?'}
                    onConfirm={() => deleteDiary(item._id)}
                    okText="Borrar"
                    cancelText="Cancelar"
                  >
                    <DeleteOutlined style={{ fontSize: 20 }} />
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={beer.name}
                  description={<Desc style={beer.style} origin={beer.origin} />}
                />
                <Rate
                  disabled
                  allowHalf
                  defaultValue={item.rating}
                  style={{ marginBottom: '7px' }}
                />
                <br></br>
                <p>
                  <b>ABV: </b> {beer.abv} <b>SRM: </b> {beer.srm} <b>IBU: </b> {beer.ibu}
                </p>
                {item.notes}
              </List.Item>
            );
          }}
        />
      </Content>
    </Layout>
  );
};

export { Entries };
