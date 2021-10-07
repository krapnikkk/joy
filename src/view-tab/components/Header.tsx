import * as React from 'react'
import { Layout, Menu } from 'antd'
import './Header.css';
import { GITHUB_URL } from '@src/constants';
const { Header } = Layout


export default class HeaderComponent extends React.Component {
    render() {
        return (<Header className="header">
            <section className="logo">JOY</section>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">账号管理</Menu.Item>
                <Menu.Item key="2">活动管理</Menu.Item>
                <Menu.Item key="3">领券中心</Menu.Item>
                <Menu.Item key="4">全局设置</Menu.Item>
            </Menu>
            <iframe src={GITHUB_URL} frameBorder="0" scrolling="0" width="90px" height="21px"></iframe>
        </Header>)
    }
}