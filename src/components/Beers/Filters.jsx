import { Select, Row, Col } from 'antd';
import React from 'react';


const Filters = () => {

  const { Option } = Select;

  function onChangeBrewery(value) {
    console.log(`brewery selected ${value}`);
  }

  function onChangeOrigin(value) {
    console.log(`origin selected ${value}`);
  }

  function onChangeStyle(value) {
    console.log(`style selected ${value}`);
  }

  return(
    <Row>
      <Col span={8}>
        Brewery
        <Select
          showSearch
          style={{ width: 225, marginLeft: 10 }}
          mode={"multiple"}
          placeholder="Select a brewery"
          optionFilterProp="children"
          onChange={onChangeBrewery}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
          <Option value="diego">Diego</Option>
          <Option value="fer">Fer</Option>
        </Select>
      </Col>
      <Col span={8}>
        Origin
        <Select
          showSearch
          style={{ width: 225, marginLeft: 10 }}
          mode={"multiple"}
          placeholder="Select a city"
          optionFilterProp="children"
          onChange={onChangeOrigin}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Col>
      <Col span={8}>
        Style
        <Select
          showSearch
          style={{ width: 225, marginLeft: 10 }}
          mode={"multiple"}
          placeholder="Select a style"
          optionFilterProp="children"
          onChange={onChangeStyle}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Col>
    </Row>
  );
};

export { Filters };