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
