import * as React from 'react';
import { Button, Card, Divider, Dropdown, Menu, message, PageHeader, Radio, RadioChangeEvent, Switch } from 'antd';
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { getRandom, localStoragePromise, openWindow, rnd, sleep } from '@src/utils';
import { IAccount, IActivityResData, IBaseResData, ILocalStorageData } from '@src/@types';
import { Content } from 'antd/lib/layout/layout';
import TextArea from 'antd/lib/input/TextArea';
import { collectAtuoScore, collectScore, getBadgeAward, getFeedDetail, getHomeData, getTaskDetail, miMissions, raise, sign } from '@src/Activity';
import { DateTime } from 'luxon';
import { IAddProductVos, ICollectAtuoScore, ICollectScore, IMiMission, IMyAwardVos, IRaise, ISignRes, ITaskDetail, ITaskVos } from './typing';
import { JDAPP_USER_AGENT, JDJRAPP_USER_AGENT, MINIPROGRAM_USER_AGENT } from '@src/constants';

interface IState {
    accountInfo: IAccount[];
    accountMap: { [key: string]: IAccount };
    secretpMap: { [key: string]: string };
    currentAccount: string;
    taskDetailMap: { [key: string]: ITaskDetail };
    miMissionMap: { [key: string]: IMiMission };
    log: string;
    scheduleSwitch: boolean;
    scheduleSpan: number;
    autoTaskSwitch: boolean,
    autoTaskSpan: number,
    currentUserAgent: string;
}
interface IProps {
}

export default class Travel extends React.Component<IProps, IState, {}> {
    constructor(props: IProps | Readonly<IProps>) {
        super(props);
        this.state = {
            accountInfo: [],
            currentAccount: "",
            accountMap: {},
            secretpMap: {},
            taskDetailMap: {},
            miMissionMap: {},
            log: "",
            scheduleSwitch: false,
            scheduleSpan: 1,
            autoTaskSwitch: false,
            autoTaskSpan: 1,
            currentUserAgent: JDAPP_USER_AGENT
        };
    }

    public componentDidMount() {
        this.getAccountInfo();
    }

    render() {
        return (
            <section>
                <PageHeader
                    ghost={true}
                    title="热爱环游记"
                    extra={[
                        <Button key="1" type={'primary'} onClick={() => {
                            openWindow("https://wbbny.m.jd.com/babelDiy/Zeus/2vVU4E7JLH9gKYfLQ5EVW6eN2P7B/index.html")
                        }}>跳转活动</Button>,
                    ]}
                ></PageHeader>
                <Content>
                    <Card>
                        <h3>使用说明：任务是动态分配的，需要点击多次【一键完成】！</h3>
                        <h3>首次参与活动需要自行开启活动,不提供入会任务操作！执行任务时请不要执行其他操作！</h3>
                    </Card>
                    <Card>
                        <section className="setting-item">
                            <section>
                                <Button type="primary" onClick={() => {
                                    this.autoTask(JDAPP_USER_AGENT);
                                }}>
                                    一键完成【商城端】
                                </Button>
                                <Button type="primary" onClick={() => {
                                    this.autoTask(MINIPROGRAM_USER_AGENT);
                                }}>
                                    一键完成【小程序端】
                                </Button>
                                <Button type="primary"
                                    disabled={true} onClick={() => {
                                        this.autoTask(JDJRAPP_USER_AGENT);
                                    }}>
                                    一键完成【金融端】
                                </Button>
                            </section>
                            <section>
                                <Button type="primary"
                                    onClick={() => {
                                        this.raise();
                                    }}>
                                    打卡领红包
                                </Button>
                                <Button type="primary"
                                    onClick={() => {
                                        this.collectAtuoScore();
                                    }}>
                                    收取汪汪币
                                </Button>
                                <Button type="primary" onClick={() => {
                                    this.getTaskDetail();
                                }}>
                                    查看任务情况
                                </Button>
                                <Button type="primary" onClick={() => {
                                    this.getBadgeAward();
                                }}>
                                    领取任务奖励
                                </Button>
                                <Button type="primary" onClick={() => {
                                    this.sign();
                                }}>
                                    每日签到
                                </Button>
                            </section>
                            <section>
                                定时间隔(分)：
                                <Radio.Group
                                    size="small"
                                    onChange={this.onScheduleSpanChange.bind(this)}
                                    value={this.state.scheduleSpan}
                                    disabled={this.state.scheduleSwitch}
                                >
                                    <Radio value={1}>30</Radio>
                                    <Radio value={2}>60</Radio>
                                </Radio.Group>
                                定时收取汪汪币：
                                <Switch
                                    size="small"
                                    checked={this.state.scheduleSwitch}
                                    defaultChecked={this.state.scheduleSwitch}
                                    onChange={this.onScheduleSwitchChange.bind(this)}
                                />
                            </section>
                            <section>
                                定时间隔(分)：
                                <Radio.Group
                                    size="small"
                                    onChange={this.onAutoTaskSpanChange.bind(this)}
                                    value={this.state.autoTaskSpan}
                                    disabled={this.state.autoTaskSwitch}
                                >
                                    <Radio value={1}>15</Radio>
                                    <Radio value={2}>30</Radio>
                                </Radio.Group>
                                定时一键完成：
                                <Switch
                                    size="small"
                                    checked={this.state.autoTaskSwitch}
                                    defaultChecked={this.state.autoTaskSwitch}
                                    onChange={this.onAutoTaskSwitchChange.bind(this)}
                                />
                            </section>
                            <Divider />
                            <section>
                                已选账号：<Dropdown overlay={() => {
                                    return (<Menu>
                                        {
                                            this.state.accountInfo.map((account, idx) => (
                                                <Menu.Item key={idx} icon={<UserOutlined />}>
                                                    {account.nickname}
                                                </Menu.Item>
                                            ))
                                        }
                                    </Menu>)
                                }} trigger={['click']}>
                                    <Button>
                                        选择账号 <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Button type="primary"
                                    disabled={true}
                                    onClick={() => {
                                        // this.autoTask();
                                    }}>
                                    获取分享链接
                                </Button>
                                <input></input>
                                已选账号：<Dropdown overlay={() => {
                                    return (
                                        // <Menu onClick={this.handleMenuClick.bind(this)}>
                                        <Menu>
                                            {
                                                this.state.accountInfo.map((account, idx) => (
                                                    <Menu.Item key={idx} icon={<UserOutlined />}>
                                                        {account.nickname}
                                                    </Menu.Item>
                                                ))
                                            }
                                        </Menu>
                                    )
                                }} trigger={['click']}>
                                    <Button>
                                        选择账号 <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Button type="primary"
                                    disabled={true}
                                    onClick={() => {
                                        // this.autoTask();
                                    }}>
                                    帮ta助力
                                </Button>
                            </section>
                            <TextArea rows={10} value={this.state.log} />
                        </section>

                    </Card>
                </Content>
            </section>
        )
    }

    async getHomeData(cookie?: string) {
        let { currentAccount, secretpMap } = this.state;
        let res = await getHomeData(cookie, this.state.currentUserAgent) as IBaseResData;
        let result = res.data.result;
        let { homeMainInfo } = result;
        let { secretp } = homeMainInfo;
        secretpMap[currentAccount] = secretp;
        return secretp;
    }

    async sign() {
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let body = await this.getSourceRes(cookie);
            let res = await sign(body, cookie, this.state.currentUserAgent) as IBaseResData;
            let { success } = res.data;
            let log = "";
            if (success) {
                let result = res.data.result as ISignRes;
                let { scoreResult } = result;
                let { score, totalScore } = scoreResult;
                log = `签到成功！获得汪汪币：${score} 总获得汪汪币：${totalScore}`;
            } else {
                log = res.data.bizMsg;
            }
            this.logOutput(log);
        }
        this.showMessage("success", "签到完成！");
    }

    async raise() {
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let body = await this.getSourceRes(cookie);
            let res = await raise(body, cookie) as IBaseResData;
            let { success } = res.data;
            let log = "";
            if (success) {
                let result = res.data.result as IRaise;
                let { raiseInfo, levelUpAward} = result;
                let {totalScore,usedScore} = raiseInfo;
                let {score,couponInfo,redpacketInfo,type} = levelUpAward;
                log = `打卡成功！获得汪汪币：${score} 当前汪汪币：${+totalScore - (+usedScore)}`;
                if(type == 4){
                    let {value} = redpacketInfo;
                    log += `\n获得红包：${value}`
                }else if(type == 8){
                    let {name,usageThreshold,quota} = couponInfo;
                    log += `\n获得优惠券：【${name}】${usageThreshold}-${quota}`
                }
            } else {
                log = res.data.bizMsg;
            }
            this.logOutput(log);

            
            // let { taskVos } = result;
        }
    }

    async getBadgeAward() {
        if (JSON.stringify(this.state.taskDetailMap) == "{}") {
            this.showMessage("warn", "请先获取任务和完成任务后再领取奖励！")
        } else {
            for (let i = 0; i < this.state.accountInfo.length; i++) {
                let account = this.state.accountInfo[i];
                let currentAccount = account.curPin;
                await this.setStateAsync({ currentAccount });
                let { cookie } = this.state.accountMap[currentAccount];

                let taskDetail = this.state.taskDetailMap[currentAccount];
                let { lotteryTaskVos } = taskDetail;
                let { badgeAwardVos } = lotteryTaskVos[0];//看起来只有一个的样子
                let log = "";

                for (let j = 0; j < badgeAwardVos.length; j++) {
                    let badgeAwardVo = badgeAwardVos[j];
                    let { status, awardName } = badgeAwardVo;
                    if (status != 3) {
                        log = `任务【${awardName}】未达标或已经领取啦！`;
                        this.logOutput(log);
                    } else {
                        let { awardToken } = badgeAwardVo;
                        let body = await this.getSourceRes(cookie, { awardToken });
                        log = `任务：【${awardName}】领取中`;
                        this.logOutput(log);
                        let res = await getBadgeAward(body, cookie, this.state.currentUserAgent) as IBaseResData;

                        await this.throlle();
                        let { success } = res.data;
                        if (success) {
                            let myAwardVo = res.data.result.myAwardVos[0] as IMyAwardVos;
                            let { score } = myAwardVo.pointVo;
                            log = `领取成功！获得汪汪币：${score}`;
                        } else {
                            log = res.data.bizMsg;
                        }
                        this.logOutput(log);
                    }
                }

            }

        }
    }

    async getSecretp(cookie?: string) {
        let { currentAccount, secretpMap } = this.state;
        let secretp = secretpMap[currentAccount];
        if (!secretp) {
            secretp = await this.getHomeData(cookie);
        }
        return secretp;
    }

    async getTaskDetail() {
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            let { cookie } = account;
            let res = await getTaskDetail(cookie, this.state.currentUserAgent) as IBaseResData;
            let taskDetail = res.data.result as ITaskDetail;
            let taskDetailMap = this.state.taskDetailMap;
            taskDetailMap[currentAccount] = taskDetail;
            await this.setStateAsync({ taskDetailMap, currentAccount });
            let { taskVos } = taskDetail;
            let data = this.initTaskVos(taskVos);
            this.logOutput(data);
        }
    }

    async miMissions() {
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            let { cookie } = account;
            let res = await miMissions(cookie) as IActivityResData;
            let miMission = res.resultData.data as IMiMission;
            let miMissionMap = this.state.miMissionMap;
            miMissionMap[currentAccount] = miMission;
            await this.setStateAsync({ miMissionMap, currentAccount });
            let data = this.initMiMissions(miMission);
            this.logOutput(data);
        }
    }

    initTaskVos(taskVos: ITaskVos[]) {
        let data = "当前任务情况：\n";
        for (let i = 0; i < taskVos.length; i++) {
            let taskVo = taskVos[i]
            let { maxTimes, times, taskName } = taskVo;
            data += `【${taskName}】 任务进度：${times}/${maxTimes}\n`;
        }
        return data;
    }

    initMiMissions(miMission: IMiMission) {
        // let {views,trades} = miMission;
        let data = "当前任务情况：\n";
        // for (let i = 0; i < views.length; i++) {
        //     let view = views[i]
        //     let { complete, title } = view;
        //     data += `【${title}】 任务进度：${complete?"未开始":"已完成"}\n`;
        // }
        // for (let i = 0; i < trades.length; i++) {
        //     let trade = trades[i]
        //     let { complete, title } = trade;
        //     data += `【${title}】 任务进度：${complete?"未开始":"已完成"}\n`;
        // }
        return data;
    }

    async collectAtuoScore() {
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let body = await this.getSourceRes(cookie);
            let res = await collectAtuoScore(body, cookie, this.state.currentUserAgent) as IBaseResData;

            let log = "";
            let { success } = res.data;
            if (success) {
                let result = res.data.result as ICollectAtuoScore;
                let { produceScore } = result;
                log = `已收取汪汪币：${produceScore}`;
            } else {
                log = res.data.bizMsg;
            }

            this.logOutput(log);
        }
        this.showMessage("success", "任务已完成！");
    }

    async browseActivitySingle(taskVo: ITaskVos, cookie: string) {
        // 获取活动列表
        let { taskId, shoppingActivityVos, taskName, maxTimes, times, waitDuration } = taskVo;
        let log = `开始任务:【${taskName}】`;
        this.logOutput(log);
        if (maxTimes <= times) {
            log = "当前账号已经完成该任务啦！";
            this.logOutput(log);
        } else {
            for (let j = 0; j < maxTimes; j++) {
                let shop = shoppingActivityVos[j];
                let { taskToken, title } = shop;
                let body = await this.getSourceRes(cookie, { taskId, taskToken, actionType: 1 });
                log = `任务：【${title}】浏览中。。。`;
                let res = await collectScore(body, cookie, this.state.currentUserAgent) as IBaseResData;
                this.logOutput(log);
                await this.throlle();
                if (waitDuration != 0) {
                    body = await this.getSourceRes(cookie, { taskId, taskToken });
                    res = await collectScore(body, cookie, this.state.currentUserAgent) as IBaseResData;
                }
                let { success } = res.data;
                if (success) {
                    let result = res.data.result as ICollectScore;
                    let { userScore, score } = result;
                    log = `任务进度：${j + 1}/${maxTimes} 获得汪汪币：${score} 总获得汪汪币：${userScore}`;
                } else {
                    log = res.data.bizMsg;
                }
                this.logOutput(log);
            }
            log = "当前账号已经完成该任务啦！";
            this.logOutput(log);
        }
    }

    logOutput(text: string, withName: boolean = true) {
        let log = "";
        let time = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
        log = `==${time}==\n`;
        if (withName) {
            let { currentAccount, accountMap } = this.state;
            let { nickname } = accountMap[currentAccount];
            log += `【${nickname}】`
        }
        log += `${text}\n${this.state.log}`;
        this.setState({ log })
    }

    showMessage(type: string, content: string, duration: number = 1) {
        message[type]({ content, duration });
    }

    async getAccountInfo() {
        let accountInfo = await localStoragePromise.get("account").then(async (res: ILocalStorageData) => {
            let data = [];
            let { account } = res;
            await this.setStateAsync({ accountMap: account });
            for (let key in account) {
                data.push(account[key]);
            }
            return data;
        });
        if (accountInfo.length == 0) {
            this.showMessage("warning", "请先导入账号！")
        }
        await this.setStateAsync({ accountInfo })
    }

    setStateAsync(state: Readonly<IProps>) {
        return new Promise<void>((resolve) => {
            this.setState(state, resolve)
        });
    }

    async getSourceRes(cookie: string, args?: {}) {
        let secretp = await this.getSecretp(cookie);
        let random = getRandom();
        let extraData = {
            log: "",
            sceneid: "HYJhPageh5"
        };
        let ss = {
            extraData,
            secretp,
            random
        }
        let body = {
            ...args,
            ss: JSON.stringify(ss)
        }
        return JSON.stringify(body);
    }

    scheduleTimer: number = 0;
    onScheduleSpanChange(e: RadioChangeEvent) {
        let scheduleSpan = e.target.value;

        this.setState({ scheduleSpan });
    }

    onScheduleSwitchChange(checked: boolean) {
        this.setState({ scheduleSwitch: checked });
        let log = "";
        if (checked) {
            let timeout = this.state.scheduleSpan == 1 ? 30 * 60 * 1000 : 60 * 60 * 1000;
            this.scheduleTimer = window.setInterval(() => {
                this.collectAtuoScore();
            }, timeout);
            log = "已开启定时自动收取汪汪币";
        } else {
            window.clearInterval(this.scheduleTimer);
            log = "已关闭定时自动收取汪汪币";
        }
        this.logOutput(log, false);
    }

    autoTaskTimer: number = 0;
    onAutoTaskSpanChange(e: RadioChangeEvent) {
        let autoTaskSpan = e.target.value;

        this.setState({ autoTaskSpan });
    }

    onAutoTaskSwitchChange(checked: boolean) {
        this.setState({ autoTaskSwitch: checked });
        let log = "";
        if (checked) {
            let timeout = this.state.scheduleSpan == 1 ? 30 * 60 * 1000 : 60 * 60 * 1000;
            this.autoTaskTimer = window.setInterval(() => {
                this.collectAtuoScore();
            }, timeout);
            log = "已开启定时自动收取汪汪币";
        } else {
            window.clearInterval(this.autoTaskTimer);
            log = "已关闭定时自动收取汪汪币";
        }
        this.logOutput(log, false);
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    async autoTask(currentUserAgent: string) {
        console.log(currentUserAgent);
        await this.setStateAsync({
            currentUserAgent
        });
        this.logOutput("开始一键完成任务！", false);
        if (currentUserAgent == JDJRAPP_USER_AGENT) {
            await this.miMissions();
        } else {
            await this.getTaskDetail();
            await this.taskHandler();
        }
        if (currentUserAgent == JDAPP_USER_AGENT) { // todo 
            await this.getBadgeAward();
        }
        this.logOutput(`结束一键完成任务！`, false);
        this.showMessage("success", "任务已完成！");
    }

    async taskHandler(type?: number) {
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let taskVos = this.state.taskDetailMap[currentAccount].taskVos;
            for (let k = 0; k < taskVos.length; k++) {
                let taskVo = taskVos[k];
                let { taskType } = taskVo;
                if (type && taskType == type) {
                    await this.doTask(type, taskVo, cookie);
                } else {
                    await this.doTask(taskType, taskVo, cookie);
                }
            }
        }
    }

    async doTask(taskType: number, taskVo: ITaskVos, cookie: string) {
        switch (taskType) {
            case 2:
            case 5:
                await this.browseBrandSingle(taskType, taskVo, cookie);
                break;
            case 7:
            case 9:
                await this.browseShopSingle(taskType, taskVo, cookie);
                break;
            case 3:
            case 26:
                await this.browseActivitySingle(taskVo, cookie);
                break;
            case 0:
                await this.browseSimple(taskVo, cookie)
                break;
            default:
                break;
        }
    }

    async browseShopSingle(type: number, taskVo: ITaskVos, cookie: string) {
        // 获取店铺列表
        let { taskId, browseShopVo, shoppingActivityVos, taskName, maxTimes, times, waitDuration } = taskVo;
        let log = `开始任务:【${taskName}】`;
        this.logOutput(log);
        if (maxTimes <= times) {
            log = "当前账号已经完成该任务啦！";
            this.logOutput(log);
        } else {
            for (let j = 0; j < maxTimes; j++) {
                let shop = null;
                let taskName = "";
                if (type == 7) {
                    shop = browseShopVo[j];
                    taskName = shop.shopName;

                } else if (type == 9) {
                    shop = shoppingActivityVos[j];
                    taskName = shop.title;
                }
                let { taskToken } = shop;

                let body = "";
                body = await this.getSourceRes(cookie, { taskId, taskToken, actionType: 1 });
                await this.throlle();
                log = `任务：【${taskName}】浏览中。。。`;
                this.logOutput(log);
                await collectScore(body, cookie, this.state.currentUserAgent) as IBaseResData;
                await this.throlle(waitDuration);
                body = await this.getSourceRes(cookie, { taskId, taskToken });
                let res = await collectScore(body, cookie, this.state.currentUserAgent) as IBaseResData;
                let { success } = res.data;
                if (success) {
                    let result = res.data.result as ICollectScore;
                    let { userScore, score } = result;
                    log = `任务进度：${j + 1}/${maxTimes} 获得汪汪币：${score} 总获得汪汪币：${userScore}`;
                } else {
                    log = res.data.bizMsg;
                }
                this.logOutput(log);
            }
            log = "当前账号已经完成该任务啦！";
            this.logOutput(log);
        }
    }

    async browseBrandSingle(type: number, taskVo: ITaskVos, cookie: string) {
        let { taskId, taskName } = taskVo;
        let log = `开始任务:【${taskName}】`;
        this.logOutput(log);
        // 获取商品列表
        let res = await getFeedDetail(taskId, cookie, this.state.currentUserAgent) as IBaseResData;
        let result = res.data.result as IAddProductVos;
        let taskVos;
        if (type == 5) {
            taskVos = result.taskVos[0]
        } else if (type == 2) {
            taskVos = result.addProductVos[0];
        }
        let { browseShopVo, productInfoVos, maxTimes, times } = taskVos; // 数组默认只有一个值

        if (maxTimes <= times) {
            log = "当前账号已经完成该任务啦！";
            this.logOutput(log);
        } else {
            for (let j = 0; j < maxTimes; j++) {
                let item;
                if (type == 5) {
                    item = browseShopVo[j];
                } else if (type == 2) {
                    item = productInfoVos[j];
                }
                let { taskToken } = item;
                let body = await this.getSourceRes(cookie, { taskId, taskToken });
                await this.throlle();

                let res = await collectScore(body, cookie, this.state.currentUserAgent) as IBaseResData;
                let { success } = res.data;
                if (success) {
                    let result = res.data.result as ICollectScore;
                    let { userScore, maxTimes, times, score } = result;
                    log = `任务进度：${times}/${maxTimes} 获得汪汪币：${score} 总获得汪汪币：${userScore}`;
                } else {
                    log = res.data.bizMsg;
                }
                this.logOutput(log);
            }
            log = "当前账号已经完成该任务啦！";
            this.logOutput(log);
        }
    }

    async browseSimple(taskVo: ITaskVos, cookie: string) {
        let { taskId, taskName, simpleRecordInfoVo } = taskVo;
        let log = `开始任务:【${taskName}】`;
        this.logOutput(log);
        let { taskToken } = simpleRecordInfoVo;
        let body = await this.getSourceRes(cookie, { taskId, taskToken });
        await this.throlle();

        let res = await collectScore(body, cookie, this.state.currentUserAgent) as IBaseResData;
        let { success } = res.data;
        if (success) {
            let result = res.data.result as ICollectScore;
            let { userScore, maxTimes, times, score } = result;
            log = `任务进度：${times}/${maxTimes} 获得汪汪币：${score} 总获得汪汪币：${userScore}`;
        } else {
            log = res.data.bizMsg;
        }


        log = "当前账号已经完成该任务啦！";
        this.logOutput(log);
    }

    async throlle(delay?: number) {
        if (!delay) {
            delay = rnd(1, 3);
        }
        let log = `随机模拟等待中,${delay}秒后提交~`;
        this.logOutput(log);
        await sleep(delay * 1000);
    }

}