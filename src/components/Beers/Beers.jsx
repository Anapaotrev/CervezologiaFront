import { Layout, List, message, Row, Col } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Beer } from './Beer';
import './style.scss';
import { Filters } from './Filters';
import { UserContext } from '../../utils';

const { Content, Footer } = Layout;

const Beers = () => {
  const { isAuth, setUnauthStatus } = useContext(UserContext);

  const [beers, setBeers] = useState([]);
  const [beersCopy, setBeersCopy] = useState([]);
  const [modified, setModified] = useState(false);
  const [fullCatalogue, setFullCatalogue] = useState([]);
  const [filter, setFilter] = useState({});
  const [listaIds, setListaIds] = useState([]);

  function search(beer, value) {
    return beer.name.toLowerCase().includes(value.toLowerCase());
  }

  function searchBeer(value) {
    if (value != '') {
      if (!modified) {
        setModified(true);
        setBeersCopy(beers);
      }
      const filteredBeers = beers.filter((beer) => search(beer, value));
      setBeers(filteredBeers);
    } else {
      setModified(false);
      setBeers(beersCopy);
    }
  }

  function showInterestList() {
    const interestListBeers = beers.filter((beer) => listaIds.includes(beer._id));
    setBeersCopy(beers);
    setBeers(interestListBeers);
  }

  function showFullList() {
    setBeers(fullCatalogue);
  }

  useEffect(() => {
    axios
      .get('/beers', {
        params: {
          origin: filter.origin,
          brewery: filter.brewery,
          style: filter.style,
        },
      })
      .then((response) => {
        setBeers(response.data);
        setBeersCopy(response.data);
        setFullCatalogue(response.data);
      })
      .catch((error) => {
        message.error(error.statusText);
      });
    if (isAuth()) {
      axios
        .get('/favorites', {})
        .then((response) => {
          setListaIds(response.data);
        })
        .catch((error) => {
          message.error(error.statusText);
        });
    }
  }, [filter]);

  return (
    <Layout>
      <Filters
        onFilter={setFilter}
        onSearch={searchBeer}
        interestList={showInterestList}
        fullList={showFullList}
      />
      <Content className="beers-content">
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col sm={24}>
            <List
              grid={{
                gutter: 16,
                column: 6,
              }}
              itemLayout="vertical"
              dataSource={beers}
              pagination={{
                pageSize: 18,
                showSizeChanger: false,
              }}
              renderItem={(beer) => <Beer beer={beer} listaIds={listaIds} onChange={setListaIds} />}
            />
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export { Beers };
