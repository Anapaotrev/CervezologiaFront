import { Select, Row, Col, Typography, Drawer, Button, Layout, message, Input } from 'antd';
import { FilterOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../utils';

const { Title } = Typography;
const { Search } = Input;
const { Header } = Layout;

const Filters = (props) => {
  const { isAuth, setUnauthStatus } = useContext(UserContext);

  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [filterBrewery, setBrewery] = useState([]);
  const [filterOrigin, setOrigin] = useState([]);
  const [filterStyle, setStyle] = useState([]);
  const [breweryOpts, setBrwOpts] = useState([]);
  const [originOpts, setOrigOpts] = useState([]);
  const [styleOpts, setStyleOpts] = useState([]);
  const [listaInteres, setListaInteres] = useState(false);

  useEffect(() => {
    axios
      .get('/beers/distinct', {
        params: {
          value: 'brewery',
        },
      })
      .then((response) => {
        setBrwOpts(response.data);
      })
      .catch((error) => {
        message.error(error.statusText);
      });
    axios
      .get('/beers/distinct', {
        params: {
          value: 'origin',
        },
      })
      .then((response) => {
        setOrigOpts(response.data);
      })
      .catch((error) => {
        message.error(error.statusText);
      });
    axios
      .get('/beers/distinct', {
        params: {
          value: 'style',
        },
      })
      .then((response) => {
        setStyleOpts(response.data);
      })
      .catch((error) => {
        message.error(error.statusText);
      });
  }, []);

  function onChangeBrewery(value) {
    setBrewery(value);
  }

  function onChangeOrigin(value) {
    setOrigin(value);
  }

  function onChangeStyle(value) {
    setStyle(value);
  }

  function onClose() {
    const filter = {
      origin: filterOrigin,
      brewery: filterBrewery,
      style: filterStyle,
    };
    props.onFilter(filter);
    setVisible(false);
  }

  function showListaInteres() {
    if (listaInteres) {
      setListaInteres(false);
      props.fullList();
    } else {
      setListaInteres(true);
      props.interestList();
    }
  }

  const BotonListaInteres = () => {
    if (listaInteres) {
      return (
        <Button
          type="primary"
          onClick={() => showListaInteres()}
          style={{ backgroundColor: '#FCB941', borderColor: '#FCB941' }}
          block
        >
          Catálogo Completo
        </Button>
      );
    }
    return (
      <Button
        type="primary"
        onClick={() => showListaInteres()}
        style={{ backgroundColor: '#FCB941', borderColor: '#FCB941' }}
        block
      >
        Lista de Interés <StarOutlined />
      </Button>
    );
  };

  return (
    <Header>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={8}>
          <h2 className="beers-title">Cervezas</h2>
        </Col>
        <Col className="gutter-row" span={8}>
          <Search
            placeholder="Buscar cerveza"
            onSearch={(value) => props.onSearch(value)}
            style={{ lineHeight: '30px' }}
          />
        </Col>
        <Col className="gutter-row" span={4}>
          <Button
            type="primary"
            className="button-text"
            onClick={() => setVisible(true)}
            style={{ backgroundColor: '#60a246', borderColor: '#60a246' }}
            block
          >
            Filtrar <FilterOutlined />
          </Button>
        </Col>
        {isAuth() && (
          <Col className="gutter-row" span={4}>
            <BotonListaInteres />
          </Col>
        )}
      </Row>
      <Drawer
        title="Filters"
        placement="top"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={150}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <Row>
          <Col span={8}>
            Cervecería
            <Select
              showSearch
              style={{ width: 250, marginLeft: 10 }}
              mode={'multiple'}
              placeholder="Selecciona una cervecería"
              optionFilterProp="children"
              onChange={onChangeBrewery}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {breweryOpts.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            Origen
            <Select
              showSearch
              style={{ width: 250, marginLeft: 10 }}
              mode={'multiple'}
              placeholder="Selecciona una ciudad"
              optionFilterProp="children"
              onChange={onChangeOrigin}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {originOpts.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            Estilo
            <Select
              showSearch
              style={{ width: 250, marginLeft: 10 }}
              mode={'multiple'}
              placeholder="Selecciona un estilo"
              optionFilterProp="children"
              onChange={onChangeStyle}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {styleOpts.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Drawer>
    </Header>
  );
};

export { Filters };
