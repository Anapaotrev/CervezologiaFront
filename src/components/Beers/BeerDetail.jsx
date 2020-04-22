import { Card, Typography, message, Layout, Row, Col, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './style.scss';
import { HeartFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Progress } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const beerAtt = ['brewery', 'origin', 'style']

const beercolors = ["#F3F993", "#F5F75C",'#F6F513','#EAE615','#E0D01B','#D5BC26'
,'#CDAA37','#C1963C','#BE8C3A','#BE823A','#C17A37','#BF7138','#BC6733','#B26033'
,'#A85839','#985336','#8D4C32','#7C452D','#6B3A1E','#5D341A','#4E2A0C','#4A2727'
,'#361F1B','#261716','#231716','#19100F','#16100F','#120D0C','#100B0A','#050B0A']

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

    var beerColor

    if(!beer.srm || beer.srm >= 30){
      beerColor = beercolors[0]
    }
    else{
      beerColor = beercolors[beer.srm - 1];
    }

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

              <Descriptions.Item label = {"SRM"}>
                <div>
                  <Progress type = "circle" strokeColor = {beerColor} percent={(beer.srm/30)*100} format={percent => `${beer.srm} `} />
                </div>
              </Descriptions.Item>

              <Descriptions.Item label = {"ABV"}>
                <div>
                  <Progress type="circle" strokeColor = {beerColor} percent={beer.abv} />
                </div>
              </Descriptions.Item>

            </Descriptions>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export { BeerDetail };
