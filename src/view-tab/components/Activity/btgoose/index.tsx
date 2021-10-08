import { Button, Card, message, PageHeader, Radio, Switch, Tooltip } from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as React from 'react';
import { AUTO_GET_COOKIES, GET_COOKIES_SUCCESS, LOGIN } from '@src/Events';
import { copyText, localStoragePromise, openWindow } from '@src/utils';
import { IAccount } from '@src/@types';
import { Content } from 'antd/lib/layout/layout';
import './index.css';

interface IState {
    accountInfo: IAccount[];
}
interface IProps {
}

export default class Goose extends React.Component<IProps, IState, {}> {
    constructor(props: IProps | Readonly<IProps>) {
        super(props);
        this.state = {
            accountInfo: []
        };
        // this.addEvent();
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
            <section>
                <PageHeader
                    ghost={true}
                    title="天天提鹅"
                    extra={[
                        <Button key="1" onClick={()=>{
                            openWindow("https://active.jd.com/forever/btgoose/#/")
                        }}>跳转活动</Button>,
                    ]}
                ></PageHeader>
                <Content>
                    <Card>
                        <div className="setting-item">
                            <p>
                                调度开关：
                                <Tooltip
                                    placement="top"
                                    title="控制是否使用当前账号接受服务器指令调度浏览指定帖子的开关"
                                >
                                    <QuestionCircleOutlined />
                                </Tooltip>
                                <Switch
                                size="small"
                                checked={false}
                                defaultChecked={false}
                                // onChange={this.onScheduleSwitchChange.bind(this)}
                            />
                            </p>
                            
                        </div>
                        <div className="setting-item">
                            <p>
                                调度次数：
                                <Tooltip
                                    placement="top"
                                    title="每天接受服务器指令调度浏览帖子的次数(零点重置次数)"
                                >
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </p>
                            <Radio.Group
                                size="small"
                                // onChange={this.onScheduleTimeChange.bind(this)}
                                value="value"
                                disabled={false}
                            >
                                <Radio value={1}>1</Radio>
                                <Radio value={2}>2</Radio>
                            </Radio.Group>
                        </div>
                        <div className="setting-item">
                            <p>
                                调度间隔(分)：
                                <Tooltip
                                    placement="top"
                                    title="每次接受服务器指令调度浏览帖子的时间间隔"
                                >
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </p>
                            <Radio.Group
                                size="small"
                                // onChange={this.onScheduleSpanChange.bind(this)}
                                value="{this.state.scheduleSpan}"
                                disabled={false}
                            >
                                <Radio value={1}>1</Radio>
                                <Radio value={2}>2</Radio>
                            </Radio.Group>
                        </div>
                        <p>
                            调度时间：
                            <Tooltip
                                placement="top"
                                title="指定的时间范围内接受服务器调度浏览帖子的指令(开始时间和结束时间相同即不限制时间段)"
                            >
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </p>
                    </Card>
                </Content>
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