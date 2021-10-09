import * as React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { Routes } from './router';
import { Affix, Button, Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { GITHUB_URL } from '@src/constants';
import './App.css';

const App: React.FC = () => (
  <div className="Container">
    <Header className="header">
      <section className="logo">JOY</section>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/account">账号管理</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/activity">活动管理</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/coupon">领券中心</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/setting">全局设置</Link></Menu.Item>
      </Menu>
      <section>
        <img src="https://profile-counter.glitch.me/joy/count.svg" alt="visitcount" width="100" />
        <iframe src={GITHUB_URL} frameBorder="0" scrolling="0" width="90px" height="21px"></iframe>
      </section>
    </Header>
    <Content className="content">
      <Redirect to="/activity" />
      {
        Routes.map((route, index) =>
          <Route key={index} path={route.path} component={route.component} />
        )
      }
    </Content>
    <Affix style={{ position: 'absolute', bottom: "230px", right: "50px" }}>
        <Button type="primary" onClick={() => {}}>
          Affix top
        </Button>
      </Affix>
  </div>
);

export default App;



