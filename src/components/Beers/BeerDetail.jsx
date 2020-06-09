import { ArrowLeftOutlined, FormOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Layout, message, Modal, Progress, Row, Typography } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../utils';
import { NewDiaryForm } from '../Diary';
import './style.scss';

const { Content } = Layout;
const { Title } = Typography;

const beerAtt = [
  ['brewery', 'Cervecería'],
  ['origin', 'Origen'],
  ['style', 'Estilo'],
];

const beercolors = [
  '#F3F993',
  '#F5F75C',
  '#F6F513',
  '#EAE615',
  '#E0D01B',
  '#D5BC26',
  '#CDAA37',
  '#C1963C',
  '#BE8C3A',
  '#BE823A',
  '#C17A37',
  '#BF7138',
  '#BC6733',
  '#B26033',
  '#A85839',
  '#985336',
  '#8D4C32',
  '#7C452D',
  '#6B3A1E',
  '#5D341A',
  '#4E2A0C',
  '#4A2727',
  '#361F1B',
  '#261716',
  '#231716',
  '#19100F',
  '#16100F',
  '#120D0C',
  '#100B0A',
  '#050B0A',
];

function fillMissingValues(val) {
  if (!val) {
    return 'N/D';
  }

  return val;
}

const BeerDetail = () => {
  const history = useHistory();

  const { isAuth } = useContext(UserContext);
  const { _id } = useParams();
  const [beer, setBeer] = useState({});
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const addToInterest = () =>
    axios
      .put('/user', { favorites: favorites.concat(_id) })
      .then((response) => {
        setFavorites(response.data.favorites);
        setEnabled(true);
      })
      .catch((error) => {
        message.error(error.statusText);
      });

  const removeInterest = () =>
    axios
      .put('/user', { favorites: favorites.filter((id) => id !== _id) })
      .then((response) => {
        setFavorites(response.data.favorites);
        setEnabled(false);
      })
      .catch((error) => {
        message.error(error.statusText);
      });

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`/beer/${_id}`)
      .then((response) => {
        setBeer(response.data);
      })
      .catch((error) => {
        message.error(error.status);
      });
    if (!isAuth()) {
      return;
    }
    axios.get('/user').then((response) => {
      setFavorites(response.data.favorites);
      if (response.data.favorites.includes(_id)) {
        setEnabled(true);
      }
    });
  }, []);

  const interestButton = () =>
    enabled ? (
      <Button type="default" style={{ width: '156.7px' }} onClick={removeInterest}>
        Eliminar de Interes
        <StarFilled />
      </Button>
    ) : (
      <Button type="default" style={{ width: '156.7px' }} onClick={addToInterest}>
        Lista de interés
        <StarOutlined />
      </Button>
    );

  let beerColor;

  if (!beer.srm) {
    beerColor = beercolors[0];
  } else if (beer.srm >= 30) {
    beerColor = beercolors[29];
  } else {
    beerColor = beercolors[Math.floor(beer.srm - 1)];
  }

  return (
    <Layout>
      <Modal footer={null} visible={visible} onCancel={() => setVisible(false)}>
        <NewDiaryForm beer={beer._id} name={beer.name} />
      </Modal>
      <Title className="beers-title" level={1}>
        <ArrowLeftOutlined onClick={() => history.push(``)} style={{ marginRight: '50px' }} />
        {beer.name}
      </Title>
      <Content className="beers-box">
        <Row>
          <Col sm={4} className="beer-image-detail">
            <img
              src={beer.photoUrl || 'https://imgur.com/ysHDKVt.jpg'}
              style={{ height: '270px' }}
            />
          </Col>
          <Col sm={5}>
            <Descriptions title="Información" column={1} style={{ marginTop: '25px' }}>
              {beerAtt.map((attribute) => (
                <Descriptions.Item key={attribute[1]} className="beers-detail" label={attribute[1]}>
                  {beer[attribute[0]]}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
          <Col sm={11}>
            <Progress
              className="circular-progress"
              type="circle"
              width={135}
              strokeWidth={6}
              strokeColor={beerColor}
              percent={((beer.abv * 100) / 20) % 100}
              format={() => `ABV: ${fillMissingValues(beer.abv)}%`}
            />

            <Progress
              className="circular-progress"
              type="circle"
              width={135}
              strokeWidth={6}
              strokeColor={beerColor}
              percent={(beer.srm / 40) * 100}
              format={() => `SRM: ${fillMissingValues(beer.srm)} `}
            />

            <Progress
              className="circular-progress"
              type="circle"
              width={135}
              strokeWidth={6}
              strokeColor={beerColor}
              percent={beer.ibu}
              format={() => `IBU: ${fillMissingValues(beer.ibu)} `}
            />
          </Col>
          {isAuth() && (
            <Col sm={3} className="buttons-detail">
              <Button
                type="default"
                style={{ marginBottom: '10px' }}
                onClick={() => setVisible(true)}
              >
                Agregar al diario
                <FormOutlined />
              </Button>
              {interestButton()}
            </Col>
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export { BeerDetail };
