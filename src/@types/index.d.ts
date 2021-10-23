import * as React from react;

export interface IProperty extends PropertyDescriptor {
    enumerable: boolean | undefined;
    set?: (v: any) => void;
    get?: (v?: any) => void;
}

export interface IEvent {
    type: string;
    data?: {}
}

export interface ILocalStorageData {
    account: {
        [key: string]: IAccount
    }
}

export interface IAccount {
    accountType: string;
    baseInfoStatus: string;
    cookie: string;
    curPin: string;
    definePin: string;
    headImageUrl: string;
    levelName: string;
    nickname: string;
    pinlist: string;
    userLevel: string;
    createDate: number;
}

export interface IAffixData {
    name: string;
    icon: string;
    href: string;
    hover: boolean;
    image: string;
    width: number;
}

export interface IActivity {
    name: string;
    component: React.ComponentType
}

export interface IActivityResData {
    channelEncrypt: number;
    resultCode: number;
    resultData: IResultData;
    resultMsg: string;
}

export interface IResultData {
    code: string;
    data: { [key: string]: Record };
    msg: srting;
}

// action_activity
export interface IBaseResData {
    code: number;
    data: IActionData;
    msg: string;
}

export interface IActionData {
    bizCode: number;
    bizMsg: string;
    result: { [key: string]: Record };
    success: boolean;
}

export interface IMiMission {
    trades: ITrade[],
    level: ILevel,
    views: IView[]
}

export interface ITrade {
    missionId: number,
    subTitle: string,
    frequencyType: number,
    icon: string,
    channel: string,
    position: number,
    title: string,
    url: string,
    status: number,
    coin: number
}

export interface ILevel {
    total: number,
    complete: number,
    levelStatus: levelStatus[]
}

export interface IView {
    missionId: number,
    icon: string,
    channel: string,
    title: string,
    url: string,
    total: number,
    subTitle: string,
    complete: number,
    status: number
}

export interface ILevelStatus {
    missions: number,
    status: number
}

// 

export interface IConfig {
    affix: IAffix[];
    version: string;
    info: IInfo;
}

export interface IInfo {
    verison: string;
    download: string;
    content: string;
}

export interface IAffix {
    name; string;
    icon?: string;
    href?: string;
    hover?: boolean;
    image?: string;
    width?: number
}


declare global {
    export interface IProps {
        [key: string]: any
    }
}
