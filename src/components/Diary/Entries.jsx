import { Layout, List, Space, Rate, message, Popconfirm } from 'antd';
import { Form, Input, Modal, Comment, Tooltip, Button } from 'antd';
import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { NewDiary } from '.';
import moment from 'moment';
import axios from '../../utils/axios';
import './style.scss';

const { Content } = Layout;
const { TextArea } = Input;

const Desc = ({ style, origin }) => (
  <Space>
    <b>Estilo: </b> {style} <b>Origen: </b> {origin}
  </Space>
);

const validateMessages = {
  required: '${name} is required!',
};

const data = [
  {
    author: 'Han Solo',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(1, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
  {
    author: 'Han Solo',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(8, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
];

const Entries = ({ diaries, setDiaries }) => {
  const [visible, setVisible] = useState(false);
  const [CommentOnId, setCommentOnId] = useState('');
  
  const location = useLocation();

  function handleCancel(e) {
    setVisible(false);
  }

  function onFinish(values) {
    console.log(values);
    setVisible(false);
    console.log(CommentOnId);
  } 

  function comment(id) {
    setCommentOnId(id);
    setVisible(true);
  }

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
              <Fragment>
                <List.Item
                  key={item.title}
                  extra={<img alt="beer" src={beer.photoUrl || 'https://imgur.com/ysHDKVt.jpg'} style={{width:'180px'}}/>}
                  actions={location.pathname == "/profile" ? [
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
                  ] : []}
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
                  <br></br>
                  {location.pathname == "/diary" && (<Button
                    type="primary"
                    onClick={() => comment(item._id)}
                    className="btn-comentario"
                    style={{ backgroundColor: '#60a246', borderColor: '#60a246' }}
                  >
                    Responder
                  </Button>
                  )}
                  <List
                    className="comment-list"
                    header={`${data.length} replies`}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <li>
                        <Comment
                          author={item.author}
                          content={item.content}
                          datetime={item.datetime}
                        />
                      </li>
                    )}
                  />
                </List.Item>
                <Modal
                  title="Comentario"
                  visible={visible}
                  footer={null}
                  onCancel={handleCancel}
                  destroyOnClose={true}
                >
                  <Form onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name="comment"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" type="primary" style={{ backgroundColor: '#60a246', borderColor: '#60a246' }}>
                        Publicar comentario
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </Fragment>
            );
          }}
        />
      </Content>
    </Layout>
  );
};

export { Entries };
