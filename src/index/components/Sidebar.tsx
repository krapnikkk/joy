import * as React from 'react'
import {  Menu } from 'antd';
import './Content.css';


export default class SidebarComponent extends React.Component {
    render() {
        return (<Menu 
        theme="light" 
        mode="inline" 
        defaultSelectedKeys={['1']}
        style={{ width: 256 }}
        >
        {/* <Menu.Item key="1">账号管理</Menu.Item>
        <Menu.Item key="2">活动管理</Menu.Item>
        <Menu.Item key="3">领券中心</Menu.Item>
        <Menu.Item key="4">全局设置</Menu.Item> */}
    </Menu>)
    }
}