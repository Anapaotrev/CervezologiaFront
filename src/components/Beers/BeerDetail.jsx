import { Card, Typography, message, Layout, Row, Col, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './style.scss';
import { HeartFilled } from '@ant-design/icons';


const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const beerAtt = ['brewery', 'origin', 'style', 'abv', 'srm']

const BeerDetail = () => {

  const { _id } = useParams();
  const [beer, setBeer] = useState({});

  useEffect(() => {
    axios.get(`/beer/${_id}`)
      .then((response) => {
        setBeer(response.data);
      }).catch((error) => {
        message.error(error.status);
      });
  }, []);

  return (
    <Layout>
      <Header className="beers-header">
        <Title className="beers-title" level={1}>{beer.name}</Title>
      </Header>
      <Content className="beers-content">
        <Row>
          <Col sm={5} className="beer-image" style={{ backgroundImage: `url(${beer.photoUrl})`, height: "500px", marginRight: "15px" }}>
          </Col>
          <Col sm={15}>
            <Descriptions title="Informacion">
              {beerAtt.map((attribute) => (
                <Descriptions.Item label={attribute.toUpperCase()}>
                  {beer[attribute]}
                </Descriptions.Item>
              ))}

              <Descriptions.Item className = "beers-detail" label = "Color">
                <br/>
                <HeartFilled spin = {true} style={{ fontSize: '100px', color: '#BF7138'}}/>
              </Descriptions.Item>




            </Descriptions>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export { BeerDetail };
