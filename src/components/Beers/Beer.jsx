import { EyeOutlined } from '@ant-design/icons';
import { Card, List, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';

const { Text } = Typography;

const Beer = ({ beer }) => {
  const history = useHistory();

  const actions = [<EyeOutlined onClick={() => history.push(`/beer/${beer._id}`)} />];

  const beerImage = () => (
    <div className="beer-image-container">
      <img
        src={beer.photoUrl || 'https://i.imgur.com/7rFuhpb.jpg'}
        alt={beer.name}
        className="beer-image"
      />
    </div>
  );

  return (
    <List.Item>
      <Card actions={actions} cover={beerImage()}>
        <Card.Meta
          title={beer.name === '-' ? `${beer.style} ${beer.origin}` : beer.name}
          description={beer.style}
        />
        {beer.origin}
      </Card>
    </List.Item>
  );
};

export { Beer };

