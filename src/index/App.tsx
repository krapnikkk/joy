import * as React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { Routes } from './router';
import { Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { EXTENSION_VERSION, GITHUB_URL } from '@src/constants';
import { Provider } from 'mobx-react'
import AppStore from './store'
import './App.css';
import Affix from './components/Affix';
import Modal from './components/Modal';

const App: React.FC = () => (
  <Provider AppStore={AppStore}>
    <div className="Container">
      <Header className="header">
        <section className="logo"><h1>JOY</h1><sub> v_{EXTENSION_VERSION}</sub></section>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/account">账号管理</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/activity">活动管理</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/coupon">领券中心</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/setting">全局设置</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/about">关于</Link></Menu.Item>
        </Menu>
        <section>
          { process.env.NODE_ENV !== 'development' ? <img src="https://profile-counter.glitch.me/joy/count.svg" alt="visitcount" style={{ display: "none" }} /> : null}
          <iframe src={GITHUB_URL} frameBorder="0" scrolling="0" width="90px" height="21px"></iframe>
        </section>
      </Header>
      <Content className="content">
        <Redirect to="/account" />
        {
          Routes.map((route, index) =>
            <Route key={index} path={route.path} component={route.component} />
          )
        }
      </Content>
      <Affix />
      <Modal />
    </div>
  </Provider>
);

export default App;



