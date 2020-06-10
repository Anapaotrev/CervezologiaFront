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
    axios
      .get('/my_diaries')
      .then((response) => {
        setDiaries(response.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
    setUser(getStoredUserAuth());
  }, []);

  if (!isAuth()) {
    return null;
  }

  return (
    <Layout>
      <Content className="profile-box">
        <Title>{user.name}</Title>
        {user.email}
      </Content>
      <Content>
        <Entries diaries={diaries} />
      </Content>
    </Layout>
  );
};

export { Profile };
