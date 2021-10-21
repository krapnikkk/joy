import * as React from 'react';
import { Button, Card, message, PageHeader, Radio, RadioChangeEvent, Switch } from 'antd';
import { getRandom, localStoragePromise, openWindow, rnd, sleep } from '@src/utils';
import { IAccount, IBaseResData, ILocalStorageData } from '@src/@types';
import { Content } from 'antd/lib/layout/layout';
import TextArea from 'antd/lib/input/TextArea';
import { collectAtuoScore, collectScore, getFeedDetail, getHomeData, getTaskDetail, raise, sign } from '@src/Activity';
import { DateTime } from 'luxon';
import { IAddProductVos, ICollectAtuoScore, ICollectScore, ISignRes, ITaskDetail, ITaskVos } from './typing';

interface IState {
    accountInfo: IAccount[];
    accountMap: { [key: string]: IAccount };
    secretpMap: { [key: string]: string };
    currentAccount: string;
    taskVosMap: { [key: string]: ITaskVos[] };
    log: string;
    addProductDisable: boolean;
    browseShopDisable: boolean;
    browsePlaceDisable: boolean;
    browseActivityDisable: boolean;
    browseBrandDisable: boolean;
    browsemarketingDisable: boolean;
    scheduleSwitch: boolean;
    scheduleSpan: number;

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
            taskVosMap: {},
            log: "",
            addProductDisable: true,
            browseShopDisable: true,
            browsePlaceDisable: true,
            browseActivityDisable: true,
            browseBrandDisable: true,
            browsemarketingDisable: true,
            scheduleSwitch: false,
            scheduleSpan: 1
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
                        <h3>使用说明：任务是动态分配的，需要更新任务再手动点击完成对应的任务类型，可多次点击更新任务！</h3>
                        <h3>首次参与活动需要自行开启活动,不提供入会任务操作</h3>
                    </Card>
                    <Card>
                        <section className="setting-item">
                            <section>
                                <Button type="primary" onClick={() => {
                                    this.getTaskDetail();
                                }}>
                                    更新任务
                                </Button>
                                <Button type="primary" onClick={() => {
                                    this.collectAtuoScore();
                                }}>
                                    收取金币
                                </Button>
                                <Button type="primary" onClick={() => {
                                    this.sign();
                                }}>
                                    每日签到
                                </Button>
                                <Button type="primary" disabled={this.state.addProductDisable} onClick={() => {
                                    this.addProduct();
                                }}>
                                    浏览商品
                                </Button>
                                <Button type="primary" disabled={this.state.browseShopDisable} onClick={() => {
                                    this.browseShop();
                                }}>
                                    浏览店铺
                                </Button>
                                <Button type="primary" disabled={this.state.browsePlaceDisable} onClick={() => {
                                    this.browsePlace();
                                }}>
                                    浏览会场
                                </Button>
                                <Button type="primary" disabled={this.state.browseActivityDisable} onClick={() => {
                                    this.browseActivity(3);
                                }}>
                                    浏览活动
                                </Button>
                                <Button type="primary" disabled={this.state.browseBrandDisable} onClick={() => {
                                    this.browseBrand();
                                }}>
                                    品牌店铺
                                </Button>
                                <Button type="primary" disabled={this.state.browsemarketingDisable} onClick={() => {
                                    this.browseActivity(26);
                                }}>
                                    营销活动
                                </Button>
                            </section>
                            <section>
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
                                    onChange={this.onScheduleSpanChange.bind(this)}
                                    value={this.state.scheduleSpan}
                                    disabled={this.state.scheduleSwitch}
                                >
                                    <Radio value={1}>30</Radio>
                                    <Radio value={2}>60</Radio>
                                </Radio.Group>
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
        let res = await getHomeData(cookie) as IBaseResData;
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
            let res = await sign(body, cookie) as IBaseResData;
            let { success } = res.data;
            let data = "";
            if (success) {
                let result = res.data.result as ISignRes;
                let { scoreResult } = result;
                let { score, totalScore } = scoreResult;
                data = `签到成功！获得金币：${score} 当前金币：${totalScore}`;
            } else {
                data = `当前账号今天已签到`;
            }
            this.logOutput(data);
        }
        this.showMessage("success", "签到完成！");
    }

    async raise() {
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            await raise(cookie);
            // let res = await raise(cookie) as IBaseResData;
            // let result = res.data.result as ITaskDetail;
            // let { taskVos } = result;
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
            let { cookie } = account
            await this.setStateAsync({ currentAccount });
            // await sleep(3000);
            let res = await getTaskDetail(cookie) as IBaseResData;
            let result = res.data.result as ITaskDetail;
            let { taskVos } = result;
            let taskVosMap = this.state.taskVosMap;
            taskVosMap[currentAccount] = taskVos;
            await this.setStateAsync({ taskVosMap });
            let data = this.initTaskVos(taskVos);
            this.logOutput(data);
        }
    }

    initTaskVos(taskVos: ITaskVos[]) {
        let data = "当前任务情况：\n";
        for (let i = 0; i < taskVos.length; i++) {
            let taskVo = taskVos[i]
            let { taskType, maxTimes, times, taskName } = taskVo;
            if (maxTimes > times) {
                switch (taskType) {
                    case 2:
                        data += "========点击【浏览商品】按钮即可完成以下任务========\n";
                        this.setState({
                            addProductDisable: false
                        })
                        break;
                    case 7:
                        data += "========点击【浏览店铺】按钮即可完成以下任务========\n";
                        this.setState({
                            browseShopDisable: false
                        })
                        break;
                    case 9:
                        data += "========点击【浏览会场】按钮即可完成以下任务========\n";
                        this.setState({
                            browsePlaceDisable: false
                        })
                        break;
                    case 3:
                        data += "========点击【浏览活动】按钮即可完成以下任务========\n";
                        this.setState({
                            browseActivityDisable: false
                        })
                        break;
                    case 5:
                        data += "========点击【品牌店铺】按钮即可完成以下任务========\n";
                        this.setState({
                            browseBrandDisable: false
                        })
                        break;
                    case 26:
                        data += "========点击【营销活动】按钮即可完成以下任务========\n";
                        this.setState({
                            browsemarketingDisable: false
                        })
                        break;
                    case 29:
                        // todo

                        break;
                    // case 21:
                    //     入会
                    //     break;
                    default:
                        break;
                }
            }

            data += `【${taskName}】 任务进度：${times}/${maxTimes}\n`;
        }

        return data;
    }

    async collectAtuoScore() {
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let body = await this.getSourceRes(cookie);
            let res = await collectAtuoScore(body, cookie) as IBaseResData;

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

    async addProduct() {
        this.setState({
            addProductDisable: true
        })
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let taskVos = this.state.taskVosMap[currentAccount];
            for (let k = 0; k < taskVos.length; k++) {
                let taskVo = taskVos[k];
                let { taskId, taskType, taskName } = taskVo;
                if (taskType == 2) {
                    let log = `开始任务:【${taskName}】`;
                    this.logOutput(log);
                    // 获取商品列表
                    let res = await getFeedDetail(taskId, cookie) as IBaseResData;
                    let result = res.data.result as IAddProductVos;
                    let { productInfoVos, maxTimes, times } = result.addProductVos[0]; // 数组默认只有一个值
                    if (maxTimes <= times) {
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    } else {
                        for (let j = 0; j < maxTimes; j++) {
                            let product = productInfoVos[j];
                            let { taskToken } = product;
                            let body = await this.getSourceRes(cookie, { taskId, taskToken });
                            let delay = rnd(1, 3) * 1000;
                            await sleep(delay);
                            let res = await collectScore(body, cookie) as IBaseResData;
                            let { success } = res.data;
                            if (success) {
                                let result = res.data.result as ICollectScore;
                                let { userScore, maxTimes, times, score } = result;
                                log = `任务进度：${times}/${maxTimes} 获得金币：${score} 当前金币：${userScore}`;
                            } else {
                                log = res.msg;
                            }
                            this.logOutput(log);
                        }
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    }
                }
            }
        }
        this.showMessage("success", "任务已完成！");
    }

    async browseShop() {
        this.setState({
            browseShopDisable: true
        })
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let taskVos = this.state.taskVosMap[currentAccount];
            for (let k = 0; k < taskVos.length; k++) {
                let taskVo = taskVos[k];
                let { taskType } = taskVo;
                if (taskType == 7) {
                    // 获取店铺列表
                    let { taskId, browseShopVo, taskName, maxTimes, times } = taskVo;
                    let log = `开始任务:【${taskName}】`;
                    this.logOutput(log);
                    if (maxTimes <= times) {
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    } else {
                        for (let j = 0; j < maxTimes; j++) {
                            let shop = browseShopVo[j];
                            let { taskToken, shopName } = shop;
                            let body = await this.getSourceRes(cookie, { taskId, taskToken, actionType: 1 });
                            let delay = rnd(1, 3) * 1000;
                            await sleep(delay);
                            await collectScore(body, cookie) as IBaseResData;
                            log = `任务：【${shopName}】浏览中，模拟浏览8s中`;
                            this.logOutput(log);
                            await sleep(8000); // 等待10s
                            body = await this.getSourceRes(cookie, { taskId, taskToken });
                            let res = await collectScore(body, cookie) as IBaseResData;
                            let { success } = res.data;
                            if (success) {
                                let result = res.data.result as ICollectScore;
                                let { userScore, score } = result;
                                log = `任务进度：${j + 1}/${maxTimes} 获得金币：${score} 当前金币：${userScore}`;
                            } else {
                                log = res.msg;
                            }
                            this.logOutput(log);
                        }
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    }
                }
            }
        }
        this.showMessage("success", "任务已完成！");
    }

    async browsePlace() {
        this.setState({
            browsePlaceDisable: true
        })
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let taskVos = this.state.taskVosMap[currentAccount];
            for (let k = 0; k < taskVos.length; k++) {
                let taskVo = taskVos[k];
                let { taskType } = taskVo;
                if (taskType == 9) {
                    // 获取会场列表
                    let { taskId, shoppingActivityVos, taskName, maxTimes, times } = taskVo;
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
                            let delay = rnd(1, 3) * 1000;
                            await sleep(delay);
                            await collectScore(body, cookie) as IBaseResData;
                            log = `任务：【${title}】浏览中，模拟浏览8s中`;
                            this.logOutput(log);
                            await sleep(8000); // 等待10s
                            body = await this.getSourceRes(cookie, { taskId, taskToken });
                            let res = await collectScore(body, cookie) as IBaseResData;
                            let { success } = res.data;
                            if (success) {
                                let result = res.data.result as ICollectScore;
                                let { userScore, score } = result;
                                log = `任务进度：${j + 1}/${maxTimes} 获得金币：${score} 当前金币：${userScore}`;
                            } else {
                                log = res.msg;
                            }
                            this.logOutput(log);
                        }
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    }
                }
            }
        }
        this.showMessage("success", "任务已完成！");
    }

    async browseActivity(type: number) {
        if (type == 26) {
            this.setState({
                browsemarketingDisable: true,

            })
        }
        if (type == 3) {
            this.setState({
                browseActivityDisable: true,

            })
        }
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let taskVos = this.state.taskVosMap[currentAccount];
            for (let k = 0; k < taskVos.length; k++) {
                let taskVo = taskVos[k];
                let { taskType } = taskVo;
                if (taskType == type) {
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
                            let delay = rnd(1, 3) * 1000;
                            await sleep(delay);
                            log = `任务：【${title}】浏览中，随机延时提交中`;
                            this.logOutput(log);

                            let res = await collectScore(body, cookie) as IBaseResData;
                            if (waitDuration != 0) {
                                body = await this.getSourceRes(cookie, { taskId, taskToken });
                                res = await collectScore(body, cookie) as IBaseResData;
                            }
                            let { success } = res.data;
                            if (success) {
                                let result = res.data.result as ICollectScore;
                                let { userScore, score } = result;
                                log = `任务进度：${j + 1}/${maxTimes} 获得金币：${score} 当前金币：${userScore}`;
                            } else {
                                log = res.msg;
                            }
                            this.logOutput(log);
                        }
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    }
                }
            }
        }
        this.showMessage("success", "任务已完成！");
    }

    async browseBrand() {
        this.setState({
            browseBrandDisable: true
        })
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let taskVos = this.state.taskVosMap[currentAccount];
            for (let k = 0; k < taskVos.length; k++) {
                let taskVo = taskVos[k];
                let { taskId, taskType, taskName } = taskVo;
                if (taskType == 5) {
                    let log = `开始任务:【${taskName}】`;
                    this.logOutput(log);
                    // 获取商品列表
                    let res = await getFeedDetail(taskId, cookie) as IBaseResData;
                    let result = res.data.result as IAddProductVos;
                    let { browseShopVo, maxTimes, times } = result.taskVos[0]; // 数组默认只有一个值
                    if (maxTimes <= times) {
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    } else {
                        for (let j = 0; j < maxTimes; j++) {
                            let shop = browseShopVo[j];
                            let { taskToken } = shop;
                            let body = await this.getSourceRes(cookie, { taskId, taskToken });
                            let delay = rnd(1, 3) * 1000;
                            await sleep(delay);
                            let res = await collectScore(body, cookie) as IBaseResData;
                            let { success } = res.data;
                            if (success) {
                                let result = res.data.result as ICollectScore;
                                let { userScore, maxTimes, times, score } = result;
                                log = `任务进度：${times}/${maxTimes} 获得金币：${score} 当前金币：${userScore}`;
                            } else {
                                log = res.msg;
                            }
                            this.logOutput(log);
                        }
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    }
                }
            }
        }
        this.showMessage("success", "任务已完成！");
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

    timer: number = 0;
    onScheduleSpanChange(e: RadioChangeEvent) {
        let scheduleSpan = e.target.value;
        this.setState({ scheduleSpan });
    }

    onScheduleSwitchChange(checked: boolean) {
        this.setState({ scheduleSwitch: checked });
        let log = "";
        if (checked) {
            let timeout = this.state.scheduleSpan == 1 ? 30 * 60 * 1000 : 60 * 60 * 1000;
            this.timer = window.setInterval(() => {
                this.collectAtuoScore();
            }, timeout);
            log = "已开启定时自动收取金币";
        } else {
            window.clearInterval(this.timer);
            log = "已关闭定时自动收取金币";
        }
        this.logOutput(log, false);
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    async autoTask() {
        for (let i = 0; i < this.state.accountInfo.length; i++) {
            let account = this.state.accountInfo[i];
            let currentAccount = account.curPin;
            await this.setStateAsync({ currentAccount });
            let { cookie } = this.state.accountMap[currentAccount];
            let taskVos = this.state.taskVosMap[currentAccount];
            for (let k = 0; k < taskVos.length; k++) {
                let taskVo = taskVos[k];
                let { taskId, taskType, taskName } = taskVo;
                if (taskType == 2) {
                    let log = `开始任务:【${taskName}】`;
                    this.logOutput(log);
                    // 获取商品列表
                    let res = await getFeedDetail(taskId, cookie) as IBaseResData;
                    let result = res.data.result as IAddProductVos;
                    let { productInfoVos, maxTimes, times } = result.addProductVos[0]; // 数组默认只有一个值
                    if (maxTimes <= times) {
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    } else {
                        for (let j = 0; j < maxTimes; j++) {
                            let product = productInfoVos[j];
                            let { taskToken } = product;
                            let body = await this.getSourceRes(cookie, { taskId, taskToken });
                            let delay = rnd(1, 3) * 1000;
                            await sleep(delay);
                            let res = await collectScore(body, cookie) as IBaseResData;
                            let { success } = res.data;
                            if (success) {
                                let result = res.data.result as ICollectScore;
                                let { userScore, maxTimes, times, score } = result;
                                log = `任务进度：${times}/${maxTimes} 获得金币：${score} 当前金币：${userScore}`;
                            } else {
                                log = res.msg;
                            }
                            this.logOutput(log);
                        }
                        log = "当前账号已经完成该任务啦！";
                        this.logOutput(log);
                    }
                }
            }
        }
        this.showMessage("success", "任务已完成！");
    }

}