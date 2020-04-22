import { Card, Typography } from 'antd';
import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './style.scss';
const { Text } = Typography;

const Beer = ({ _id, name, image, origin, brewery, style }) => {

  const history = useHistory();

  const actions = [
    <EyeOutlined onClick={() => history.push(`/beer/${_id}`)}/>
  ];

  return (
    <Card title={name} className="beer-card" actions={actions}>
      {/* <div alt={name} className="beer-image" style={{ backgroundImage: `url(${photoUrl})`}} ></div> */}
    </Card>
  );
};

export { Beer };
