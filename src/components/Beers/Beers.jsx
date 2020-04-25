import { Layout, List, message, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Beer } from './Beer';
import "./style.scss";
import { Filters } from './Filters';

const { Content, Footer } = Layout;

const Beers = () => {

  const [beers, setBeers] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
  axios.get('/beers', {
    params: {
      origin: filter.origin,
      brewery: filter.brewery,
      style: filter.style
    }
  })
  .then((response) => {
    setBeers(response.data);
  }).catch((error) => {
    message.error(error.statusText)
  });
  }, [filter]);

  return (
    <Layout>
      <Filters onSearch={setFilter}/>
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

