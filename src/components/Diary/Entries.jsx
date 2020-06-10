import { Layout, List, Carousel, Space, Rate, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { NewDiary } from '.';
import axios from '../../utils/axios';
import './style.scss';
import { getStoredUserAuth } from '../../utils';

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
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getStoredUserAuth());
  }, [diaries]);

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
                  <div style={{ maxWidth: '180px' }}>
                    <img
                      alt="beer"
                      src={beer.photoUrl || 'https://imgur.com/ysHDKVt.jpg'}
                      style={{ width: '100%' }}
                    />
                  </div>
                }
                actions={[
                  user._id === item.createdBy._id && (
                    <Popconfirm
                      key="borrar"
                      placement="bottom"
                      title={'Deseas borrar esta entrada?'}
                      onConfirm={() => deleteDiary(item._id)}
                      okText="Borrar"
                      cancelText="Cancelar"
                    >
                      <DeleteOutlined style={{ fontSize: 20 }} />
                    </Popconfirm>
                  ),
                ]}
              >
                <List.Item.Meta
                  title={
                    <p style={{ fontSize: 24 }}>
                      {beer.name}{' '}
                      <a
                        style={{ fontSize: 16, color: 'grey' }}
                        href={`/profile/${item.createdBy.name}`}
                      >
                        {item.createdBy.name}
                      </a>
                    </p>
                  }
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
