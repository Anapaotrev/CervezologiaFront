import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Beers, BeerDetail } from './components/Beers';
import { Navbar } from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Login } from './components/Login';
import { Register } from './components/Register';
import UserContextProvider from './utils/userContext';
import './App.scss';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Layout>
          <Header className="header">
            <Navbar />
          </Header>
          <Content className="content" style={{ padding: '50px 150px 100px 150px' }}>
            <Switch>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>
              <Route path="/beer/:_id" exact>
                <BeerDetail />
              </Route>
              <Route path="/" exact>
                <Beers />
              </Route>
            </Switch>
          </Content>
          <Footer className="footer" />
        </Layout>
      </Router>
    </UserContextProvider>
  );
}

export default App;
