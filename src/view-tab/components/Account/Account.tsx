import { Avatar, Button, List, message, PageHeader, Tooltip } from 'antd';
import * as React from 'react'
import './Account.css';
import { QuestionCircleOutlined } from "@ant-design/icons";
import { AUTO_GET_COOKIES, GET_COOKIES_SUCCESS, LOGIN } from '@src/Events';
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
  public componentDidMount() {
    console.log("componentDidMount");
    this.addEvent();
  }

  addEvent() {
    chrome.runtime.onMessage.addListener((request, _sender: chrome.runtime.MessageSender, sendResponse) => {
      console.log(request);
      switch (request.type) {
        case GET_COOKIES_SUCCESS:
          message.success('获取cookies成功！');
          break;
        default:
          console.log(request)
          break;
      }
    });
  }

  render() {
    return (
      <section className="Account">
        <PageHeader
          title="账号管理"
          className="site-page-header"
          extra={[
            <Button key="1" onClick={this.autoGetCK.bind(this)}>
              自动获取
              <Tooltip
                placement="bottom"
                title="自动获取当前登录账号的cookies信息（如果尚未登录账号会引导登录获取）"
              ><QuestionCircleOutlined />
              </Tooltip>
            </Button>,
            <Button key="2" onClick={this.login.bind(this)}>
              添加账号
              <Tooltip
                placement="bottom"
                title="登录新的账号并获取该账号的cookies信息（不会覆盖当前登录账号）"
              ><QuestionCircleOutlined />
              </Tooltip>
            </Button>,
            <Button key="3">
              文本导入
              <Tooltip
                placement="bottom"
                title="复制粘贴有效的cookies（支持多个账号批量导入）"
              ><QuestionCircleOutlined />
              </Tooltip>
            </Button>,
            <Button key="4">
              文本导出
              <Tooltip
                placement="bottom"
                title="批量导出当前已导入的账号cookie"
              ><QuestionCircleOutlined />
              </Tooltip>
            </Button>,
            <Button key="5">
              一键更新
              <Tooltip
                placement="bottom"
                title="通过接口请求验证该ck是否有效"
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </Button>,
          ]}
        ></PageHeader>
        <List
          itemLayout="horizontal"
          split={true}
          dataSource={data}
          renderItem={item => (
            <List.Item actions={[<a key="list-update">更新</a>, <a key="list-delete">删除</a>]}>
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

  autoGetCK() {
    chrome.runtime.sendMessage({
      type: AUTO_GET_COOKIES
    })
  }

  login() {
    chrome.runtime.sendMessage({
      type: LOGIN
    })
  }


}