import React from 'react';
import { Layout } from 'antd';
import { Beers, BeerDetail } from './components/Beers';
import { Navbar } from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Navbar/>
      </Header>
      <Content style={{ padding: '100px 150px 100px 150px' }}>
        <Router>
          <Switch>
            <Route path="/beer/:_id" exact>
              <BeerDetail />
            </Route>
            <Route path="/" exact>
              <Beers />
            </Route>
          </Switch>
        </Router>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
