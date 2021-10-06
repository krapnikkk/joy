import * as React from 'react'
import { Layout } from 'antd';
// import Menu from "./Menu";
// import View from "./View";
import './Content.css';
import Account from './Account/Account';
// import Description from './Description';
const { Content } = Layout;


export default class ContentComponent extends React.Component {
    render() {
        return (<Content className="content">
            <Account />
            {/* <section>
                <View />
                <Description />
            </section>
            <Menu /> */}
        </Content>)
    }
}