import { Layout, List, message, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Beer } from './Beer';
import "./style.scss";
import { Filters } from './Filters';

const { Content, Footer } = Layout;

const Beers = () => {

  
  const [beers, setBeers] = useState([]);
  const [beersCopy, setBeersCopy] = useState([]);
  const [filter, setFilter] = useState({});

  function search(beer, value) {
    return beer.name.toLowerCase().includes(value.toLowerCase());
  }

  function searchBeer(value) {
    if (value != "") {
      setBeersCopy(beers);
      var filteredBeers = beers.filter((beer) => search(beer, value));
      setBeers(filteredBeers);
    } else {
      setBeers(beersCopy);
    }
  }

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
    setBeersCopy(response.data);
  }).catch((error) => {
    message.error(error.statusText)
  });
  }, [filter]);

  return (
    <Layout>
      <Filters onFilter={setFilter} onSearch={searchBeer}/>
      <Content className="beers-content">
        <Row>
          <Col>

          </Col>
        </Row>
        <Row>
          <Col sm={24}>
            <List
              grid={{
                gutter: 16,
                column: 6
              }}
              itemLayout="vertical"
              dataSource={beers}
              pagination={{
                pageSize: 18,
                showSizeChanger: false
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
