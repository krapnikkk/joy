import * as React from 'react';
import { Button, Card, Divider, Dropdown, Menu, message, PageHeader, Popover, Radio, RadioChangeEvent, Switch, Image } from 'antd';
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { getRandom, localStoragePromise, openWindow, rnd, sleep } from '@src/utils';
import { IAccount, IActivityResData, IBaseResData, ILocalStorageData } from '@src/@types';
import { Content } from 'antd/lib/layout/layout';
import TextArea from 'antd/lib/input/TextArea';
import { collectAtuoScore, collectScore, getBadgeAward, getFeedDetail, getHomeData, getPKHomeData, getTaskDetail, JoinGroup, miMissions, raise, sign } from '@src/Activity';
import { DateTime } from 'luxon';
import { IAddProductVos, ICollectAtuoScore, ICollectScore, IMiMission, IMyAwardVos, IRaise, ISignRes, ITaskDetail, ITaskVos } from './typing';
import { DEFAULT_ACTIVITY_HOST, JDAPP_USER_AGENT, JDJRAPP_USER_AGENT, TEAM_TRAVEL_INVITE, TRAVEL_INVITE, TRAVEL_URL } from '@src/constants';
import { MenuInfo } from 'rc-menu/lib/interface';
import * as QRCode from 'qrcode'

interface IState {
    accountInfo: IAccount[];
    accountMap: { [key: string]: IAccount };
    secretpMap: { [key: string]: string };
    groupInfoMap: { [key: string]: string };
    currentAccount: string;
    taskDetailMap: { [key: string]: ITaskDetail };
    miMissionMap: { [key: string]: IMiMission };
    log: string;
    scheduleSwitch: boolean;
    scheduleSpan: number;
    autoTaskSwitch: boolean,
    autoTaskSpan: number,
    currentUserAgent: string;
    currentGetInvitedIdx: number;
    currentGetInvitedAccount: string;
    currentDoInvitedIdx: number;
    currentDoInvitedAccount: string;
    currentDoTeamInvitedIdx: number;
    currentDoTeamInvitedAccount: string;
    inviteURL: string;
    teamInviteURL: string;
    currentGetTeamInvitedIdx: number,
    currentGetTeamInvitedAccount: string,
    teamInviteURLQrCode: string,
    inviteURLQrCode: string
}
interface IProps {
}

export default class Journey extends React.Component<IProps, IState, {}> {
    constructor(props: IProps | Readonly<IProps>) {
        super(props);
        this.state = {
            accountInfo: [],
            currentAccount: "",
            accountMap: {},
            secretpMap: {},
            groupInfoMap: {},
            taskDetailMap: {},
            miMissionMap: {},
            log: "",
            scheduleSwitch: false,
            scheduleSpan: 1,
            autoTaskSwitch: false,
            autoTaskSpan: 1,
            currentUserAgent: JDAPP_USER_AGENT,
            currentGetInvitedIdx: -1,
            currentGetInvitedAccount: "选择账号",
            currentGetTeamInvitedIdx: -1,
            currentGetTeamInvitedAccount: "选择账号",
            currentDoInvitedIdx: -1,
            currentDoInvitedAccount: "选择账号",
            currentDoTeamInvitedIdx: -1,
            currentDoTeamInvitedAccount: "选择账号",
            inviteURL: "",
            teamInviteURL: "",
            teamInviteURLQrCode: "",
            inviteURLQrCode: ""
        };
    }

    public async componentDidMount() {
        await this.getAccountInfo();
        await this.getTaskDetail(false);
    }

    render() {
        return (
            <section>
                <PageHeader
                    ghost={true}
                    title="热爱奇旅"
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
                            <Divider>任务相关</Divider>
                            <section>
                                <Button type="primary" onClick={() => {
                                    this.autoTask();
                                }}>
                                    一键完成
                                </Button>
                                {/* <Button type="primary" onClick={() => {
                                    this.autoTask(MINIPROGRAM_USER_AGENT);
                                }}>
                                    一键完成【小程序端】
                                </Button>
                                <Button type="primary"
                                    disabled={true} onClick={() => {
                                        this.autoTask(JDJRAPP_USER_AGENT);
                                    }}>
                                    一键完成【金融端】
                                </Button> */}
                            </section>
                            <section>
                                {/* <Button type="primary"
                                    onClick={() => {
                                        this.raise();
                                    }}>
                                    查看账号信息
                                </Button> */}
                                <Button type="primary"
                                    onClick={() => {
                                        this.raise();
                                    }}>
                                    消耗金币抽奖
                                </Button>
                                <Button type="primary"
                                    onClick={() => {
                                        this.collectAtuoScore();
                                    }}>
                                    收取金币
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
                                    <Radio value={1}>240</Radio>
                                    <Radio value={2}>300</Radio>
                                </Radio.Group>
                                定时收取金币：
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
                                    <Radio value={1}>120</Radio>
                                    <Radio value={2}>300</Radio>
                                </Radio.Group>
                                定时一键完成：
                                <Switch
                                    size="small"
                                    checked={this.state.autoTaskSwitch}
                                    defaultChecked={this.state.autoTaskSwitch}
                                    onChange={this.onAutoTaskSwitchChange.bind(this)}
                                />
                            </section>
                            <Divider>助力相关</Divider>
                            <section>
                                <Dropdown overlay={() => {
                                    return (<Menu onClick={this.handleInvitedClick.bind(this)}>
                                        {
                                            this.state.accountInfo.map((account, idx) => (
                                                <Menu.Item key={idx} icon={<UserOutlined />}>
                                                    {account.curPin}
                                                </Menu.Item>
                                            ))
                                        }
                                    </Menu>)
                                }} trigger={['click']}>
                                    <Button>
                                        {this.state.currentGetInvitedAccount}
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Button type="primary"
                                    disabled={this.state.currentGetInvitedIdx == -1 ? true : false}
                                    onClick={() => {
                                        this.getInviteId();
                                    }}>
                                    获取助力链接
                                </Button>
                            </section>
                            <section>
                                助力链接：<input value={this.state.inviteURL} readOnly={true}></input>
                                <Popover placement="bottom"
                                    content={(<Image
                                        preview={false}
                                        src={this.state.inviteURLQrCode}
                                        width={200}
                                    />)
                                    } title="" trigger="hover">
                                    <Button
                                        type="primary"
                                        disabled={this.state.inviteURLQrCode ? false : true}
                                    >
                                        使用京东APP扫码
                                    </Button>
                                </Popover>
                                <Dropdown overlay={() => {
                                    return (
                                        <Menu onClick={this.handleDoInvitedClick.bind(this)}>
                                            {
                                                this.state.accountInfo.map((account, idx) => (
                                                    <Menu.Item key={idx} icon={<UserOutlined />}>
                                                        {account.curPin}
                                                    </Menu.Item>
                                                ))
                                            }
                                        </Menu>
                                    )
                                }} trigger={['click']}>
                                    <Button>
                                        {this.state.currentDoInvitedAccount}
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Button type="primary"
                                    disabled={this.state.inviteURL && this.state.currentDoInvitedIdx != -1 ? false : true}
                                    onClick={() => {
                                        if(this.state.currentDoInvitedIdx == this.state.currentGetInvitedIdx){
                                            this.logOutput("不能自己为自己助力!",false);
                                            return;
                                        }
                                        this.invited();
                                    }}>
                                    帮ta助力
                                </Button>
                            </section>
                            <Divider>组队相关</Divider>
                            <section>
                                <Dropdown overlay={() => {
                                    return (<Menu onClick={this.handleTeamInvitedClick.bind(this)}>
                                        {
                                            this.state.accountInfo.map((account, idx) => (
                                                <Menu.Item key={idx} icon={<UserOutlined />}>
                                                    {account.curPin}
                                                </Menu.Item>
                                            ))
                                        }
                                    </Menu>)
                                }} trigger={['click']}>
                                    <Button>
                                        {this.state.currentGetTeamInvitedAccount}
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Button type="primary"
                                    disabled={this.state.currentGetTeamInvitedIdx == -1 ? true : false}
                                    onClick={() => {
                                        this.getTeamInvitedId();
                                    }}>
                                    获取组队链接
                                </Button>
                            </section>
                            <section>
                                组队链接：<input value={this.state.teamInviteURL} readOnly={true}></input>
                                <Popover placement="bottom"
                                    content={(<Image
                                        preview={false}
                                        src={this.state.teamInviteURLQrCode}
                                        width={200}
                                    />)
                                    } title="" trigger="hover">
                                    <Button
                                        type="primary"
                                        disabled={this.state.teamInviteURLQrCode ? false : true}
                                    >
                                        使用京东APP扫码
                                    </Button>
                                </Popover>

                                <Dropdown overlay={() => {
                                    return (
                                        <Menu onClick={this.handleDoTeamInvitedClick.bind(this)}>
                                            {
                                                this.state.accountInfo.map((account, idx) => (
                                                    <Menu.Item key={idx} icon={<UserOutlined />}>
                                                        {account.curPin}
                                                    </Menu.Item>
                                                ))
                                            }
                                        </Menu>
                                    )
                                }} trigger={['click']}>
                                    <Button>
                                        {this.state.currentDoTeamInvitedAccount}
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Button type="primary"
                                    disabled={this.state.teamInviteURL && this.state.currentDoTeamInvitedIdx != -1 ? false : true}
                                    onClick={() => {
                                        if(this.state.currentDoTeamInvitedIdx == this.state.currentGetTeamInvitedIdx){
                                            this.logOutput("不能自己加入自己的队伍!",false);
                                            return;
                                        }
                                        this.joinGroup();
                                    }}>
                                    加入队伍
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

    async getPKHomeData(cookie?: string) {
        let { currentGetTeamInvitedAccount, groupInfoMap } = this.state;
        let res = await getPKHomeData(cookie, this.state.currentUserAgent) as IBaseResData;
        let result = res.data.result;
        let { groupInfo } = result;
        let { groupJoinInviteId } = groupInfo;
        groupInfoMap[currentGetTeamInvitedAccount] = groupJoinInviteId;
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
                log = `签到成功！获得金币：${score} 总获得金币：${totalScore}`;
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
            let body = await this.getSourceRes(cookie, { "scenceId": 1 });
            let res = await raise(body, cookie) as IBaseResData;
            let { success } = res.data;
            let log = "";
            if (success) {
                let result = res.data.result as IRaise;
                let { levelUpAward } = result;
                // let { totalScore, usedScore } = raiseInfo;

                let { couponInfo, redpacketInfo, type, card } = levelUpAward;
                let { name } = card;
                log = `抽奖成功！获得卡片：【${name}】`;
                if (type == 4) {
                    let { value } = redpacketInfo;
                    log += `\n获得红包：${value}`
                } else if (type == 2) {
                    let { usageThreshold, quota } = couponInfo;
                    log += `\n获得优惠券：${usageThreshold}-${quota}`
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
                let log = "";
                if (lotteryTaskVos) {
                    let { badgeAwardVos } = lotteryTaskVos[0];//看起来只有一个的样子
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
                                log = `领取成功！获得金币：${score}`;
                            } else {
                                log = res.data.bizMsg;
                            }
                            this.logOutput(log);
                        }
                    }
                } else {
                    this.logOutput(`暂无奖励`);
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

    async getTaskDetail(log: boolean = true) {
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
            if (log) {
                this.logOutput(data);
            }
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
                log = `已收取金币：${produceScore}`;
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
                    log = `任务进度：${j + 1}/${maxTimes} 获得金币：${score} 总获得金币：${userScore}`;
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
            sceneid: "RAhomePageh5"
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
            log = "已开启定时自动收取金币";
        } else {
            window.clearInterval(this.scheduleTimer);
            log = "已关闭定时自动收取金币";
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
            // let 
            let timeout = this.state.scheduleSpan == 1 ? 30 * 60 * 1000 : 60 * 60 * 1000;
            this.autoTaskTimer = window.setInterval(() => {
                this.autoTask();
            }, timeout);
            log = "已开启定时自动完成任务";
        } else {
            window.clearInterval(this.autoTaskTimer);
            log = "已关闭定时自动完成任务";
        }
        this.logOutput(log, false);
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    handleInvitedClick(info: MenuInfo) {
        let { key } = info;
        let currentGetInvitedIdx = +key;
        let currentGetInvitedAccount = this.state.accountInfo[currentGetInvitedIdx].curPin;
        this.setStateAsync({
            currentGetInvitedIdx,
            currentGetInvitedAccount
        })
    }

    handleTeamInvitedClick(info: MenuInfo) {
        let { key } = info;
        let currentGetTeamInvitedIdx = +key;
        let currentGetTeamInvitedAccount = this.state.accountInfo[currentGetTeamInvitedIdx].curPin;
        this.setStateAsync({
            currentGetTeamInvitedIdx,
            currentGetTeamInvitedAccount
        })
    }

    async getInviteId() {
        let inviteId = this.state.taskDetailMap[this.state.currentGetInvitedAccount].inviteId;
        let inviteURL = `${DEFAULT_ACTIVITY_HOST}${TRAVEL_URL}${TRAVEL_INVITE}${inviteId}`
        QRCode.toDataURL(inviteURL, (err, inviteURLQrCode) => {
            if (err) {
                console.warn(err);
                return;
            }
            this.setStateAsync({
                inviteURLQrCode
            });
        })
        this.setStateAsync({
            inviteURL
        });
    }

    async getTeamInvitedId() {
        let { currentGetTeamInvitedAccount, accountMap } = this.state;
        let { cookie } = accountMap[currentGetTeamInvitedAccount];
        await this.getPKHomeData(cookie);// 获取当前选择ck的账号
        let inviteId = this.state.groupInfoMap[this.state.currentGetTeamInvitedAccount];
        let teamInviteURL = `${DEFAULT_ACTIVITY_HOST}${TRAVEL_URL}${TEAM_TRAVEL_INVITE}${inviteId}`
        QRCode.toDataURL(teamInviteURL, (err, teamInviteURLQrCode) => {
            if (err) {
                console.warn(err);
                return;
            }
            this.setStateAsync({
                teamInviteURLQrCode
            });
        })
        this.setStateAsync({
            teamInviteURL
        });
    }

    handleDoInvitedClick(info: MenuInfo) {
        let { key } = info;
        let currentDoInvitedIdx = +key;
        let currentDoInvitedAccount = this.state.accountInfo[currentDoInvitedIdx].curPin;
        this.setStateAsync({
            currentDoInvitedIdx,
            currentDoInvitedAccount
        })
    }

    handleDoTeamInvitedClick(info: MenuInfo) {
        let { key } = info;
        let currentDoTeamInvitedIdx = +key;
        let currentDoTeamInvitedAccount = this.state.accountInfo[currentDoTeamInvitedIdx].curPin;
        this.setStateAsync({
            currentDoTeamInvitedIdx,
            currentDoTeamInvitedAccount
        })
    }

    async invited() {
        let { cookie } = this.state.accountInfo[this.state.currentDoInvitedIdx];
        let inviteId = this.state.taskDetailMap[this.state.currentGetInvitedAccount].inviteId;
        let body = await this.getSourceRes(cookie, { inviteId });
        let res = await collectScore(body, cookie) as IBaseResData;
        let { success } = res.data;
        let log = "";
        if (success) {
            let result = res.data.result as ICollectScore;
            let { userScore, score } = result;
            log = `助力成功：获得金币：${score} 总获得金币：${userScore}`;
        } else {
            log = res.data.bizMsg;
        }
        this.logOutput(log, false);
    }

    async joinGroup() {
        let { cookie } = this.state.accountInfo[this.state.currentDoTeamInvitedIdx];
        let inviteId = this.state.groupInfoMap[this.state.currentGetTeamInvitedAccount];
        let body = await this.getSourceRes(cookie, { inviteId, confirmFlag: 1 });
        let res = await JoinGroup(body, cookie) as IBaseResData;
        let { success } = res.data;
        let log = "";
        if (success) {
            let result = res.data.result as ICollectScore;
            // let { userScore, score } = result;
            log = `组队结果：${JSON.stringify(result)}`;
        } else {
            log = res.data.bizMsg;
        }
        this.logOutput(log, false);
    }

    async autoTask() {
        let currentUserAgent: string = JDAPP_USER_AGENT;

        // 重复自动任务五次
        this.logOutput("开始一键完成任务！", false);
        for (let i = 0; i < 5; i++) {
            await this.setStateAsync({
                currentUserAgent
            });

            if (currentUserAgent == JDJRAPP_USER_AGENT) {
                await this.miMissions();
            } else {
                await this.getTaskDetail();
                await this.taskHandler();
            }
            if (currentUserAgent == JDAPP_USER_AGENT) { // todo 
                await this.getBadgeAward();
            }
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
                    log = `任务进度：${j + 1}/${maxTimes} 获得金币：${score} 总获得金币：${userScore}`;
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
                    log = `任务进度：${times}/${maxTimes} 获得金币：${score} 总获得金币：${userScore}`;
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
            log = `任务进度：${times}/${maxTimes} 获得金币：${score} 总获得金币：${userScore}`;
        } else {
            log = res.data.bizMsg;
        }


        log = "当前账号已经完成该任务啦！";
        this.logOutput(log);
    }

    async throlle(delay?: number) {
        if (!delay) {
            delay = rnd(10, 12);
        }
        let log = `随机模拟等待中,${delay}秒后提交~`;
        this.logOutput(log);
        await sleep(delay * 1000);
    }

}