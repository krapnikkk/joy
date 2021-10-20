export interface ICollectAtuoScore {
    produceScore: number;
    time: number;
}

export interface IRaskRes {
    activityInfo: {
        activityEndTime: number,
        activityStartTime: number,
        awardStartTime: number,
        nowTime: number,
        waitLotteryStartTime: number
    },
    levelUp: number,
    levelUpAward: {
        awardCoins: number,
        canFirstShare: boolean,
        couponInfo: {
            batchId: string,
            desc: string,
            name: string,
            quota: string,
            usageThreshold: string
        },
        firstShareAwardCoins: number,
        score: string,
        type: number
    },
    raiseInfo: {
        cityConfig: {
            backgroundImage: string,
            cityId: number,
            cityName: string,
            cityPostCard: string,
            cityType: number,
            clockNeedsCoins: number,
            points: IPoint[],
            wholeMapFinishPic: string
        },
        curLevelStartScore: string,
        finishTime: number,
        flag: number,
        fullFlag: false,
        nextLevelScore: string,
        remainScore: string,
        scoreLevel: number,
        totalScore: string,
        usedScore: string
    }
}

export interface IPoint {
    awardCoins: number,
    cityId: number,
    finishedPic: string,
    pointId: number,
    pointName: string,
    pointPic: string,
    pointType: number,
    status: number,
    unFinishedPic: string
}

export interface ISignRes {
    awardResult: {}
    awardType: number
    nextRedPacketDays: number
    progress: number
    scoreResult: { score: string, totalScore: string }
    score: string
    totalScore: string
    todayStatus: number
}

export interface ICollectScore {
    acquiredScore: string;
    maxTimes: number;
    score: string;
    taskStatus: number;
    taskType: number;
    times: number;
    userScore: string;
}

export interface IAddProductVos { // 加购列表数据
    taskVos: ITaskVos[];
    addProductVos: ITaskVos[];
}

export interface IBrandMemberVos{ // 入会

}

export interface IProductInfoVos {
    backUpWords: string[],
    biclk: string,
    groupId: string,
    itemId: string,
    jdPrice: string,
    label: string,
    mcInfo: string,
    plusPrice: string,
    skuId: string,
    skuImage: string,
    skuName: string,
    status: number,
    taskToken: string
}

export interface ITaskDetail {
    countdownSwitch: ICountdownSwitch;
    inviteId: string;
    lotteryTaskVos: ILotteryTaskVos[];
    parentUserScore: string;
    taskVos: ITaskVos[];
    userScore: string;
}

export interface ICountdownSwitch {
    android: number,
    ios: number
}

export interface ILotteryTaskVos {
    badgeAwardVos: IBadgeAwardVos[];
    maxTimes: number;
    times: number;
}

export interface IBadgeAwardVos {
    awardId: string;
    awardName: string;
    awardToken: string;
    requireIndex: number;
    status: number;
}

export interface ITaskVos {
    groupId?: string;
    advGroupId?: string;
    browseShopVo?: IBrowseTaskVos[], // 浏览任务
    assistTaskDetailVo?: IAssistTaskDetailVo, // 邀请助力
    shoppingActivityVos?: IShoppingActivityVos[],// 浏览会场
    productInfoVos?: IProductInfoVos[], // 浏览商品
    ext: {
        channel: string;
    },
    icon: string,
    maxTimes: number,
    score: string,
    scoreRuleVos: IScoreRuleVos[],
    status: number,
    subTitleName: string,
    taskBeginTime: number,
    taskEndTime: number,
    taskId: number,
    taskName: string,
    taskTimesType: number,
    taskType: number, // 2：常规浏览任务【浏览商品】 3:大型活动 7：浏览参会店铺 9：购物会场 14:邀请好友助力
    times: number,
    waitDuration: number
}

export interface IBrowseTaskVos {
    advGroupId: string,
    advertId: string,
    comments: string[],
    ext: { [key: string]: string },
    itemId: string,
    label: string,
    shopId: string,
    shopImage: string,
    shopName: string,
    status: number,
    taskToken: string,
    url: string,
    venderId: string
}

export interface IShoppingActivityVos {
    advGroupId: string,
    advId: string,
    biclk: string,
    comments: string[],
    [key: string]: string | number | string[]
    icon: string,
    itemId: string,
    mcInfo: string,
    status: number,
    subtitle: string,
    taskToken: string,
    title: string,
    url: string
}

export interface IAssistTaskDetailVo {
    itemId: string,
    taskToken: string;
}

export interface IScoreRuleVos {
    score: string,
    scoreRuleType: number
}