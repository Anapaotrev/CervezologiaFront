import { Layout, List, Carousel, Space, Rate, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';
import './style.scss';
import { NewDiary } from './NewDiary';

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

const Photos = () => (
  <Carousel>
    <div>
      <img alt="beer" src="https://i.imgur.com/B9vHlLa.jpg" />
    </div>
    <div>
      <img alt="beer" src="https://i.imgur.com/lyiN6PC.jpg" />
    </div>
    <div>
      <img alt="beer" src="https://i.imgur.com/gdJRt9v.jpg" />
    </div>
  </Carousel>
);

const Diary = () => {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    axios
      .get('/diaries')
      .then((response) => {
        setDiaries(response.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

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
                extra={<Photos />}
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

export { Diary };
