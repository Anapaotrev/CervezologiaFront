import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Entries } from '.';
import axios from '../../utils/axios';
import './style.scss';


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
