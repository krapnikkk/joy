import { Avatar, Button, List, PageHeader } from 'antd';
import * as React from 'react'
import './Account.css';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export default class AccountComponent extends React.Component {
  render() {
    return (
      <section className="Account">
        <PageHeader
          title="账号管理"
          className="site-page-header"
          extra={[
            <Button key="3">导入CK</Button>,
            <Button key="2">登录账号</Button>,
            <Button key="1">自动获取</Button>,
          ]}
        ></PageHeader>
        <List
          itemLayout="horizontal"
          split={true}
          dataSource={data}
          header={<div>Header</div>}
          renderItem={item => (
            <List.Item
              actions={[<a key="list-update">更新</a>, <a key="list-delete">删除</a>]}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </section>
    )
  }
}