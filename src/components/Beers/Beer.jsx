import { EyeOutlined, FormOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Card, List, Tooltip, Modal, message } from 'antd';
import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NewDiaryForm } from '../Diary';
import { UserContext } from '../../utils';
import './style.scss';
import axios from '../../utils/axios';

const Beer = ({ beer, listaIds, onChange }) => {
  const history = useHistory();

  const { isAuth, setUnauthStatus } = useContext(UserContext);

  const [visible, setVisible] = useState(false);

  const InterestList = () => {
    if (listaIds.includes(beer._id)) {
      return (
        <Tooltip title="Eliminar de la lista de interés">
          <StarFilled onClick={() => removeFromInterest()} />
        </Tooltip>
      );
    }
    return (
      <Tooltip title="Agregar a lista de interés">
        <StarOutlined onClick={() => addToInterest()} />
      </Tooltip>
    );
  };

  function addToInterest() {
    const updatedIds = listaIds.concat(beer._id);
    onChange(updatedIds);

    axios
      .put('/user', { favorites: updatedIds })
      .then(() => {})
      .catch((error) => {
        message.error(error.statusText);
      });
  }

  function removeFromInterest() {
    const index = listaIds.indexOf(beer._id);
    if (index > -1) {
      listaIds.splice(index, 1);
    }
    onChange(listaIds);
    console.log(listaIds);
    axios
      .put('/user', { favorites: listaIds })
      .then(() => {})
      .catch((error) => {
        message.error(error.statusText);
      });

    const fixingIds = listaIds.concat('1');
    onChange(fixingIds);
    fixingIds.pop();
    onChange(fixingIds);
  }

  const actions = isAuth()
    ? [
        <Tooltip title="Ver detalle">
          <EyeOutlined
            onClick={() =>
              history.push({
                pathname: `/beer/${beer._id}`,
                state: { ids: listaIds },
              })
            }
          />
        </Tooltip>,
        <Tooltip title="Agregar al diario">
          <FormOutlined onClick={() => setVisible(true)} />
        </Tooltip>,
        <InterestList />,
      ]
    : [
        <Tooltip title="Ver detalle">
          <EyeOutlined
            onClick={() =>
              history.push({
                pathname: `/beer/${beer._id}`,
                state: { ids: listaIds },
              })
            }
          />
        </Tooltip>
      ];

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
    <Fragment>
      <Modal footer={null} visible={visible} onCancel={() => setVisible(false)}>
        <NewDiaryForm beer={beer._id} name={beer.name} />
      </Modal>
      <List.Item>
        <Card actions={actions} cover={beerImage()}>
          <Card.Meta
            title={beer.name === '-' ? `${beer.style} ${beer.origin}` : beer.name}
            description={beer.style}
          />
          {beer.origin}
        </Card>
      </List.Item>
    </Fragment>
  );
};

export { Beer };
