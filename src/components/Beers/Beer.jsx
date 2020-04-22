import { Card, Typography, List, Descriptions, Empty } from 'antd';
import React from 'react';
import { EyeOutlined, QuestionOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './style.scss';
const { Text } = Typography;

const Beer = ({ beer }) => {

  const history = useHistory();

  const actions = [
    <EyeOutlined onClick={() => history.push(`/beer/${beer._id}`)}/>
  ];

  const beerImage = () => {

    if (!beer.photoUrl) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} style={{ paddingRight: '75px' }} />;
    }

    return <div className="beer-image-container"><img src={beer.photoUrl} alt={beer.name} className="beer-image" /></div>
  }

  return (
    <List.Item
    actions={actions}
    extra={
      beerImage()
    }>
      <List.Item.Meta
        title={beer.name === "-" ? (beer.style + " " + beer.origin) : beer.name}
        description={beer.style}
      />
      {beer.origin}
    </List.Item>
  );
};

export { Beer };

