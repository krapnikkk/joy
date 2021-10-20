import { Avatar, Button, Drawer, Input, List, message, PageHeader, Tooltip } from 'antd';
import * as React from 'react'
import './Account.css';
import { QuestionCircleOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { AUTO_GET_COOKIES, GET_COOKIES_SUCCESS, LOGIN } from '@src/Events';
import { copyText, localStoragePromise } from '@src/utils';
import { IAccount } from '@src/@types';
import TextArea from 'antd/lib/input/TextArea';

interface IState {
  accountInfo: IAccount[];
  visibile: boolean;
}
interface IProps {
}

export default class Account extends React.Component<IProps, IState, {}> {
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.state = {
      accountInfo: [],
      visibile: false
    };
    this.addEvent();
    this.getAccountInfoAsync();
  }

  public componentDidMount() {
    // console.log("componentDidMount");
  }


  addEvent() {
    chrome.runtime.onMessage.addListener((request, _sender: chrome.runtime.MessageSender, sendResponse) => {
      console.log(request);
      switch (request.type) {
        case GET_COOKIES_SUCCESS:
          this.getAccountInfoAsync(false);
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
            <Button key="0" onClick={this.autoGetCK.bind(this)}>
              自动获取
              <Tooltip
                placement="bottom"
                title="自动获取当前登录账号的cookies信息（如果尚未登录账号会引导登录获取）"
              ><QuestionCircleOutlined />
              </Tooltip>
            </Button>,
            <Button key="1" onClick={this.login.bind(this)}>
              添加账号
              <Tooltip
                placement="bottom"
                title="登录新的账号并获取该账号的cookies信息（不会覆盖当前登录账号）"
              ><QuestionCircleOutlined />
              </Tooltip>
            </Button>,
            <Button key="2" onClick={this.clearAllCookie.bind(this)}>
              清空列表
              <Tooltip
                placement="bottom"
                title="清空缓存下的所有cookie信息"
              ><QuestionCircleOutlined />
              </Tooltip>
            </Button>,
            <Button key="3" onClick={this.showDrawer.bind(this)}>
              文本导入
              <Tooltip
                placement="bottom"
                title="复制粘贴有效的cookies（支持多个账号批量导入）"
              ><QuestionCircleOutlined />
              </Tooltip>
            </Button>,
            <Button key="4" disabled>
              文本导出
              <Tooltip
                placement="bottom"
                title="批量导出当前已导入的账号cookie"
              ><QuestionCircleOutlined />
              </Tooltip>
            </Button>,
            <Button key="5" disabled>
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
          dataSource={this.state.accountInfo}
          renderItem={(item, index) => (
            // <List.Item actions={[<a key="list-update">更新</a>, <a key="list-delete">删除</a>]}>this.copyText()
            <List.Item actions={[<a key="list-copy" onClick={this.copyText.bind(this, index)}>复制</a>, <a key="list-delete" onClick={this.deleteCookie.bind(this, index)}>删除</a>]}>
              <List.Item.Meta
                avatar={<Avatar src={item.headImageUrl} />}
                title={<>昵称：{item.nickname}</>}
                description={<>cookie:
                  <Input.Password
                    value={item.cookie}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </>}
              />
            </List.Item>
          )}
        />

        <Drawer title="请输入你的cookie"
          placement="bottom"
          height="350"
          onClose={this.onClose.bind(this)}
          visible={this.state.visibile}>
          <TextArea rows={6} placeholder={"回车键换行，一行一个账号进行解析"} />
          <Button style={{ marginTop: "10px" }} type="primary" onClick={this.importCookie.bind(this)}>批量导入</Button>
        </Drawer>
      </section>
    )
  }

  onClose() {
    this.setState({
      visibile: false
    })
  }

  showDrawer() {
    this.setState({
      visibile: true
    })
  }

  importCookie() {

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

  copyText(index: number) {
    let text = this.state.accountInfo[index].cookie;
    copyText(text).then(() => {
      this.showMessage("复制成功！");
    })

  }

  showMessage(content: string, duration: number = 1) {
    message.success({ content, duration });
  }

  getAccountInfoAsync(tips: boolean = true) {
    localStoragePromise.get("account").then((res: { [key: string]: IAccount }) => {
      let data = [];
      let { account } = res;
      for (let key in account) {
        data.push(account[key]);
      }
      console.log(data);
      this.setState(
        {
          accountInfo: data
        },
        tips ? () => {
          this.showMessage("获取缓存数据成功!");
        } : null
      );
    })
  }



  deleteCookie(index: number) {
    let curPin = this.state.accountInfo[index].curPin;
    localStoragePromise.get("account").then((res: any) => {
      let { account } = res;
      delete account[curPin];
      localStoragePromise.set({
        account
      })
      this.showMessage("删除成功！");
      this.getAccountInfoAsync(false);
    })
  }

  clearAllCookie() {
    localStoragePromise.set({
      account: {}
    });
    this.showMessage("已清空所有账号cookie");
    this.setState(
      {
        accountInfo: []
      });
  }
}