import { Card, Typography, message, Layout, Row, Col, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './style.scss';
import 'antd/dist/antd.css';
import { Progress } from 'antd';

import {ArrowLeftOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const beerAtt = ['brewery', 'origin', 'style']

const beercolors = ["#F3F993", "#F5F75C",'#F6F513','#EAE615','#E0D01B','#D5BC26'
,'#CDAA37','#C1963C','#BE8C3A','#BE823A','#C17A37','#BF7138','#BC6733','#B26033'
,'#A85839','#985336','#8D4C32','#7C452D','#6B3A1E','#5D341A','#4E2A0C','#4A2727'
,'#361F1B','#261716','#231716','#19100F','#16100F','#120D0C','#100B0A','#050B0A']



function fillMissingValues(val){
  if(!val){
    return "N/D"
  }
  else{
    return val
  }
}


const BeerDetail = () => {

<<<<<<< Updated upstream
=======
  /*expand to top for general, scrolls to top of the window*/
  useEffect(() => {
  window.scrollTo(0, 0)
  }, [])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const history = useHistory();

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    if(!beer.srm || beer.srm >= 30){
      beerColor = beercolors[0]
    }
    else{
      beerColor = beercolors[Math.floor(beer.srm - 1)];
    }
=======
  if (!beer.srm) {
    beerColor = beercolors[0];
  } else if(beer.srm >= 30){
    beerColor = beercolors[29];
  }
  else{
    beerColor = beercolors[Math.floor(beer.srm - 1)];
  }
>>>>>>> Stashed changes

  const actions = [<ArrowLeftOutlined onClick={() => history.push(`/beers`)} />];

  return (
    <Layout>
<<<<<<< Updated upstream
      <Header className="beers-header">
        <Title className="beers-title" level={1}>{beer.name}</Title>
      </Header>
      <Content className="beers-content">
        <Row>
          <Col sm={5} className="beer-image" style={{ backgroundImage: `url(${beer.photoUrl})`, height: "500px", marginRight: "15px" }}>
          </Col>
=======
      <Title className="beers-title" level={1}>
        <ArrowLeftOutlined onClick={() => history.push(``)} style = {{marginRight: '50px'}}/>
        {beer.name}
      </Title>
      <Content className="beers-box">
        <Row>
          <Col
            sm={5}
            className="beer-image-detail"
            style={{
              backgroundImage: `url(${beer.photoUrl || 'https://i.imgur.com/7rFuhpb.jpg'})`,
              height: '500px',
              marginRight: '15px',
            }}
          ></Col>
>>>>>>> Stashed changes
          <Col sm={15}>
            <Descriptions title="Información">
              {beerAtt.map((attribute) => (
                <Descriptions.Item className = "beers-detail" label={attribute.toUpperCase()}>
                  {beer[attribute]}
                </Descriptions.Item>
              ))}

<<<<<<< Updated upstream
              <Descriptions.Item className = "beers-detail">
                  <Progress type = "circle" width = {166} strokeWidth= {8} strokeColor = {beerColor} percent={(beer.srm/30)*100} format={percent => `SRM: ${fillMissingValues(beer.srm)} `} />
              </Descriptions.Item>

              <Descriptions.Item className = "beers-detail">
                  <Progress type="circle" width = {166} strokeWidth= {8} strokeColor = {beerColor} percent={beer.abv} format={percent => `ABV: ${fillMissingValues(beer.abv)}%`} />
=======
              <Descriptions.Item className="beers-graph">
                <Progress
                  type="circle"
                  width={230}
                  strokeWidth={8}
                  strokeColor={beerColor}
                  percent={(beer.srm / 30) * 100}
                  format={(percent) => `SRM: ${fillMissingValues(beer.srm)} `}
                />
              </Descriptions.Item>

              <Descriptions.Item className="beers-graph">
                <Progress
                  type="circle"
                  width={230}
                  strokeWidth={8}
                  strokeColor={beerColor}
                  percent={(beer.abv*100/15)%100}
                  format={(percent) => `ABV: ${fillMissingValues(beer.abv)}%`}
                />
>>>>>>> Stashed changes
              </Descriptions.Item>

            </Descriptions>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export { BeerDetail };
