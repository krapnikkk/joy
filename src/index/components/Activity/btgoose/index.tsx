import { Button, Card, message, PageHeader, Radio, Switch, Tooltip } from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as React from 'react';
import { AUTO_GET_COOKIES, GET_COOKIES_SUCCESS, LOGIN } from '@src/Events';
import { copyText, localStoragePromise, openWindow } from '@src/utils';
import { IAccount, IActivityResData } from '@src/@types';
import { Content } from 'antd/lib/layout/layout';
import './index.css';
import TextArea from 'antd/lib/input/TextArea';
import { autoToWithdraw, toDailyHome, toGoldExchange } from '@src/Activity';
import { DateTime } from 'luxon';

interface IState {
    accountInfo: IAccount[];
    log: string;
}
interface IProps {
}

export default class Goose extends React.Component<IProps, IState, {}> {
    constructor(props: IProps | Readonly<IProps>) {
        super(props);
        this.state = {
            accountInfo: [],
            log: ""
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
                        <Button key="1" type={'primary'} onClick={() => {
                            openWindow("https://active.jd.com/forever/btgoose/#/")
                        }}>跳转活动</Button>,
                    ]}
                ></PageHeader>
                <Content>
                    <Card>
                        <section className="setting-item">
                            <p>
                                <Button type="primary" onClick={() => {
                                    this.toDailyHome();
                                }}>
                                    查看信息
                                </Button>
                                <Button type="primary" onClick={() => {
                                    this.toGoldExchange();
                                }}>
                                    兑换积分
                                </Button>
                                <Button type="primary">
                                    每日签到
                                </Button>
                                <Button type="primary" onClick={() => {
                                    this.toWithdraw();
                                }}>
                                    提鹅收蛋
                                </Button>
                                <Button type="primary">
                                    领取任务
                                </Button>
                            </p>
                            <TextArea rows={10} value={this.state.log} />
                        </section>
                        <section className="setting-item">
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
                        </section>
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

    async toDailyHome() {
        let res = await toDailyHome() as IActivityResData;
        let resultData = res.resultData.data;
        let { userLevelDto, availableTotal } = resultData;
        let { level, levelName, levelEggNum, userHaveEggNum } = userLevelDto;
        let data = `当前等级:${level} 等级称号:${levelName} 升级进度:${userHaveEggNum}/${levelEggNum} 我的鹅蛋数量:${availableTotal} `
        this.logOutput(data);
    }

    async toWithdraw() {
        let res = await autoToWithdraw() as IActivityResData;
        let resultData = res.resultData.data;
        let { userLevelDto, eggTotal } = resultData;
        let { level, levelName, levelEggNum, userHaveEggNum } = userLevelDto;
        let data = `当前等级:${level} 等级称号:${levelName} 升级进度:${userHaveEggNum}/${levelEggNum}  我的鹅蛋数量:${eggTotal}`
        this.logOutput(data);
    }

    async toGoldExchange(){
        let res = await toGoldExchange() as IActivityResData;
        let resultData = res.resultData.data;
        let data = "";
        if(resultData){
            let { goldTotal, cnumber,rate,availableTotal } = resultData;
            data = `兑换成功！兑换比例:${rate} 已兑金币:${cnumber} 当前金币:${goldTotal} 剩余鹅蛋数量:${availableTotal}`
        }else{
            data = res.resultData.msg;
        }
        this.logOutput(data);
    }

    logOutput(text: string) {
        let time = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
        let temp = this.state.log;
        let log = `==${time}==\n${text}${temp}`;
        temp ? null : `\n` + log;
        this.setState({
            log
        })
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