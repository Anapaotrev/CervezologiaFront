import { Layout, List, Carousel, Space, Rate, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Entries } from '.';
import axios from '../../utils/axios';
import './style.scss';

const { Content } = Layout;

const Diary = () => {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    axios
      .get('/diaries')
      .then((response) => {
        setDiaries(response.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  return <Entries diaries={diaries} setDiaries={setDiaries} />;
};

export { Diary };
