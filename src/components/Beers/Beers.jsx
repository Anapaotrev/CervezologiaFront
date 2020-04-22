import { Col, Layout, List, message, Row, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Beer } from './Beer';
import "./style.scss";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const Beers = () => {

  const [beers, setBeers] = useState([]);

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
        <Title className="beers-title" level={1}>Cervezas</Title>
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

