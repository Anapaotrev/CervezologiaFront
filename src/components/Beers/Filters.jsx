import { Select, Row, Col, Typography, Drawer, Button, Layout, message } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const { Title } = Typography;
const { Header } = Layout;

const Filters = (props) => {

  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [filterBrewery, setBrewery] = useState([]);
  const [filterOrigin, setOrigin] = useState([]);
  const [filterStyle, setStyle] = useState([]);
  const [breweryOpts, setBrwOpts] = useState([]);
  const [originOpts, setOrigOpts] = useState([]);
  const [styleOpts, setStyleOpts] = useState([]);

  useEffect(() => {
    axios.get('/beers/distinct', {
      params: {
        value: "brewery"
      }
    })
    .then((response) => {
      setBrwOpts(response.data);
    }).catch((error) => {
      message.error(error.statusText)
    });
    axios.get('/beers/distinct', {
      params: {
        value: "origin"
      }
    })
    .then((response) => {
      setOrigOpts(response.data);
    }).catch((error) => {
      message.error(error.statusText)
    });
    axios.get('/beers/distinct', {
      params: {
        value: "style"
      }
    })
    .then((response) => {
      setStyleOpts(response.data);
    }).catch((error) => {
      message.error(error.statusText)
    });
  }, []);

  function onChangeBrewery(value) {
    setBrewery(value);
  }

  function onChangeOrigin(value) {
    setOrigin(value);
  }

  function onChangeStyle(value) {
    setStyle(value)
  }

  function onClose() {
    const filter = {
      origin: filterOrigin,
      brewery: filterBrewery,
      style: filterStyle
    }
    props.onSearch(filter);
    setVisible(false)
  }

  return(
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
        onClose={onClose}
        visible={visible}
        height={150}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <Row>
          <Col span={8}>
            Brewery
            <Select
              showSearch
              style={{ width: 250, marginLeft: 10 }}
              mode={"multiple"}
              placeholder="Select a brewery"
              optionFilterProp="children"
              onChange={onChangeBrewery}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {breweryOpts.map(item => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            Origin
            <Select
              showSearch
              style={{ width: 250, marginLeft: 10 }}
              mode={"multiple"}
              placeholder="Select a city"
              optionFilterProp="children"
              onChange={onChangeOrigin}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {originOpts.map(item => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            Style
            <Select
              showSearch
              style={{ width: 250, marginLeft: 10 }}
              mode={"multiple"}
              placeholder="Select a style"
              optionFilterProp="children"
              onChange={onChangeStyle}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {styleOpts.map(item => (
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