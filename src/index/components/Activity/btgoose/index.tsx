import * as React from 'react';
import { Button, Card, Dropdown, Menu, message, PageHeader, Radio, Switch, Tooltip } from 'antd';
import { QuestionCircleOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { localStoragePromise, openWindow } from '@src/utils';
import { IAccount, IActivityResData } from '@src/@types';
import { Content } from 'antd/lib/layout/layout';
import './index.css';
import TextArea from 'antd/lib/input/TextArea';
import { autoToWithdraw, toDailyHome, toDailySignIn, toGoldExchange } from '@src/Activity';
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
        this.getAccountInfo();
    }

    public componentDidMount() {
        // console.log("componentDidMount");
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
                            <section className="operation">
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
                                {/* <Button type="primary"onClick={() => {
                                    this.toGoldExchange();
                                }}>
                                    每日签到
                                </Button> */}
                                <Button type="primary" onClick={() => {
                                    this.toWithdraw();
                                }}>
                                    提鹅收蛋
                                </Button>
                                {/* <Button type="primary">
                                    领取任务
                                </Button> */}
                                当前账号：<Dropdown overlay={() => {
                                    return (<Menu onClick={this.handleMenuClick.bind(this)}>
                                        {
                                            this.state.accountInfo.map((account,idx) => (
                                                <Menu.Item key={idx} icon={<UserOutlined />}>
                                                    {account.nickname}
                                                </Menu.Item>
                                            ))
                                        }
                                    </Menu>)
                                }} trigger={['click']}>
                                    <Button>
                                        全部账号 <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </section>
                            <TextArea rows={10} value={this.state.log} />
                        </section>
                        <section className="setting-item">
                            <p>
                                开启后台任务：
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
                                定时间隔(分)：
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
                                <Radio value={1}>5</Radio>
                                <Radio value={2}>10</Radio>
                            </Radio.Group>
                        </section>
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
        let { resultData } = res;
        let { code, msg } = resultData;
        let log = "";
        if (code == "0000") {
            let data = resultData.data;
            let { userLevelDto, eggTotal } = data;
            let { level, levelName, levelEggNum, userHaveEggNum } = userLevelDto;
            log = `${msg} 当前等级:${level} 等级称号:${levelName} 升级进度:${userHaveEggNum}/${levelEggNum}  我的鹅蛋数量:${eggTotal}`
        } else {
            log = msg;
        }
        this.logOutput(log);
    }

    async toGoldExchange() {
        let res = await toGoldExchange() as IActivityResData;
        let resultData = res.resultData.data;
        let data = "";
        if (resultData) {
            let { goldTotal, cnumber, rate, availableTotal } = resultData;
            data = `兑换成功！兑换比例:${rate} 已兑金币:${cnumber} 当前金币:${goldTotal} 剩余鹅蛋数量:${availableTotal}`
        } else {
            data = res.resultData.msg;
        }
        this.logOutput(data);
    }

    async toDailySignIn() {
        let res = await toDailySignIn() as IActivityResData;
        let { resultData } = res;
        let { code, msg } = resultData;
        let log = "";
        if (code == "0000") {
            // let data = resultData.data;

        } else {
            log = msg;
        }
        this.logOutput(log);

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

    showMessage(type: string, content: string, duration: number = 1) {
        message[type]({ content, duration });
    }

    async getAccountInfo() {
        let accountInfo = await localStoragePromise.get("account").then((res: { [key: string]: IAccount }) => {
            let data = [];
            let { account } = res;
            for (let key in account) {
                data.push(account[key]);
            }
            return data;
        });
        if (accountInfo.length == 0) {
            this.showMessage("warning", "请先导入账号！")
        }
        this.setState({
            accountInfo
        })
    }
    handleMenuClick(idx:number) {
        console.log(idx);
    }
}