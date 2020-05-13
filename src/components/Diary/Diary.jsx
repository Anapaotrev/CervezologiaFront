import { Layout, List, Carousel, Space, Rate } from 'antd';
import React from 'react';
import "./style.scss";
import { NewDiaryForm } from './NewDiaryForm';

const { Content } = Layout;

const listData = [];
for (let i = 0; i < 6; i++) {
  listData.push({
    beer: "Cerveza artesanal",
    style: "Porter",
    origin: "Monterrey",
    srm: 28,
    abv: 5.3,
    ibu: 35,
    notes: "Muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor, muy buena cerveza me gusta mucho el sabor",
    photos: ["https://i.imgur.com/B9vHlLa.jpg", "https://i.imgur.com/lyiN6PC.jpg", "https://i.imgur.com/gdJRt9v.jpg"],
    rate: 3.5
  })
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Desc = ({style, origin}) => (
  <Space>
    <b>Estilo: </b> {style} <b>Origen: </b> {origin}
  </Space>
);

const Photos = () => (
  <Carousel> 
    <div>
      <img
        alt="beer"
        src="https://i.imgur.com/B9vHlLa.jpg"
      />
    </div>
    <div>
      <img
        alt="beer"
        src="https://i.imgur.com/lyiN6PC.jpg"
      />
    </div>
    <div>
      <img
        alt="beer"
        src="https://i.imgur.com/gdJRt9v.jpg"
      />
    </div>
  </Carousel>
);

const Diary = () => {

  return (
    <Layout>
      <NewDiaryForm />
      <Content>
        <List
          className="diary-posts"
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 4,
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={
                <Photos />
              }
            >
              <List.Item.Meta
                title={item.beer}
                description={<Desc style={item.style} origin={item.origin} />}
              />
              <Rate disabled allowHalf defaultValue={item.rate} style={{marginBottom: '7px'}} /> <br></br>
              <p> <b>ABV: </b> {item.abv} <b>SRM: </b> {item.srm} <b>IBU: </b> {item.ibu} </p>
              {item.notes}
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export { Diary };