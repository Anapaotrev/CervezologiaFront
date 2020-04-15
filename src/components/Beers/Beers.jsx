import { Typography, Layout, List, message,
  Button, Row, Col, Drawer } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Beer } from './Beer';
import "./style.scss";
import { Filters } from './Filters';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const Beers = () => {

  const [beers, setBeers] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get('/beers')
      .then((response) => {
        setBeers(response.data);
      }).catch((error) => {
        message.error(error.statusText)
      });
  }, []);

  return (
    <Layout>
      <Header className="beers-header">
          <Row>
            <Col span={20}>
              <Title className="beers-title" level={1}>Cervezas</Title>
            </Col>
            <Col span={4}>
                <Button type="primary" onClick={() => setVisible(true)}>Filter <FilterOutlined /></Button>
            </Col>
          </Row>
          <Drawer
            title="Filters"
            placement="top"
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            height={150}
            getContainer={false}
            style={{ position: 'absolute' }}
          >
            <Filters />
          </Drawer>
        </Header>
      <Content className="beers-content">
        <Row>
          <Col>
            
          </Col>
        </Row>
        <Row>
          <Col sm={24}>
            <List
              itemLayout="vertical"
              dataSource={beers}
              pagination={{
                pageSize: 10,
              }}
              renderItem={(beer) => (
                <Beer beer={beer} />
              )}
            />
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export { Beers };

