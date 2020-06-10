import { Layout, List, Carousel, Typography, Space, Rate, message, Popconfirm } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import axios from '../../utils/axios';
import { useHistory, useParams } from 'react-router-dom';
import './style.scss';
import { Entries } from '../Diary';
import { getStoredUserAuth, UserContext } from '../../utils';

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
  const [diaries, setDiaries] = useState([]);
  const history = useHistory();
  const { username } = useParams();
  const { isAuth } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!username || username === '') {
      axios
        .get('/my_diaries')
        .then((response) => {
          setDiaries(response.data);
        })
        .catch((error) => {
          message.error(error.message);
        });
    } else {
      axios
        .get(`/diaries_by/${username}`)
        .then((response) => {
          setDiaries(response.data);
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
    setUser(getStoredUserAuth());
  }, [username]);

  if (!isAuth()) {
    return null;
  }

  return (
    <Layout>
      <Content>
        <Title>{username || user.name}</Title>
      </Content>
      <Content>
        <Entries diaries={diaries} setDiaries={setDiaries} />
      </Content>
    </Layout>
  );
};

export { Profile };
