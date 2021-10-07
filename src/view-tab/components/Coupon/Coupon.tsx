import {message } from 'antd';
import * as React from 'react'
import { AUTO_GET_COOKIES, LOGIN } from '@src/Events';
import { copyText, localStoragePromise } from '@src/utils';
import { IAccount } from '@src/@types';

interface IState {
  accountInfo: IAccount[];
}
interface IProps {
}

export default class Coupon extends React.Component<IProps, IState, {}> {
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.state = {
      accountInfo: []
    };
    this.addEvent();
  }

  public componentDidMount() {
    // console.log("componentDidMount");
  }


  addEvent() {
    chrome.runtime.onMessage.addListener((request, _sender: chrome.runtime.MessageSender, sendResponse) => {
      console.log(request);
      switch (request.type) {
        default:
          console.log(request)
          break;
      }
    });
  }


  render() {
    return (
      <section>
        页面施工中👷
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