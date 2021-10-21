import { Card } from 'antd';
import * as React from 'react'
import { Content } from 'antd/lib/layout/layout';

export default class About extends React.Component {
    constructor(props: IProps | Readonly<IProps>) {
        super(props);
    }



    render() {
        return (
            <Content>
                <Card>
                    <h2>本项目仅供个人学习和研究chrome浏览器插件相关技术和特性, 请勿用于商业用途，下载后请于24小时内删除!</h2>
                </Card>
            </Content>
        )
    }
}