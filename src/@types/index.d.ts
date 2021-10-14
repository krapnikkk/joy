import * as React from "react";

export interface IProperty extends PropertyDescriptor {
    enumerable: boolean | undefined;
    set?: (v: any) => void;
    get?: (v?: any) => void;
}

export interface IEvent {
    type: string;
    data?: {}
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
    createDate:number;
}

export interface IAffixData{
    name: string;
    icon: string;
    href: string;
    hover: boolean;
    image: string;
    width: number;
}

export interface IActivity{
    name:string;
    component:React.ComponentType
}
