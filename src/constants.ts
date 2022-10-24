export interface IEidJoint {
    eid: string;
    fp: string
}

declare function getEidJoint(): IEidJoint;
export const EXTENSION_NAME: string = "joy";
export const LOGIN_PAGE: string = "https://plogin.m.jd.com/login/login";
export const HOME_PAGE: string = "https://home.m.jd.com/myJd/newhome.action";
export const USER_INFO_URL: string = "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion";
export const GITHUB_URL: string = `https://ghbtns.com/github-btn.html?user=krapnikkk&repo=${EXTENSION_NAME}&type=star`;
export const MARK: string = "mark";
export const SCENE_VAL: string = `${MARK}`;
export const ACTIVITY_TASK_INTERVAL: number = 5;
export const MINUTE_PER_DAY:number = 1440;
export const GMT: number = +8;
export const USER_AGENT:string= "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";
export const JDAPP_USER_AGENT:string = "jdapp;android;11.3.0;;;appBuild/98413;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1666578773332%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJS%3D%22%2C%22ad%22%3A%22DNCyDtZwDzOzDzYmCNHrYq%3D%3D%22%2C%22od%22%3A%22YJG2C2G1ENLsENLwZJc3CG%3D%3D%22%2C%22ov%22%3A%22CzO%3D%22%2C%22ud%22%3A%22DNCyDtZwDzOzDzYmCNHrYq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 12; MI 9 Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046033 Mobile Safari/537.36"
export const MINIPROGRAM_USER_AGENT:string = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat"
export const JDJRAPP_USER_AGENT:string = "Mozilla/5.0 (Linux; Android 11; MI 9 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36/application=JDJR-App&clientType=android&eufv=1&src=xiaomi&version=6.2.50&clientVersion=6.2.50&osVersion=11&osName=MI 9&isUpdate=0&HiClVersion=6.2.50&netWork=1&netWorkType=4&CpayJS=UnionPay/1.0 JDJR&sPoint=&*#@jdPaySDK*#@jdPayChannel=jdFinance&jdPayChannelVersion=6.2.50&jdPaySdkVersion=4.00.12.00&androidBrand=Xiaomi&androidManufacturer=Xiaomi&jdPayClientName=Android*#@jdPaySDK*#@"

export const COOKIE_KEYS:string[] = ["pt_pin","pt_token","pt_key","3AB9D23F7A4B3C9B"]; // "3AB9D23F7A4B3C9B"   
export const GENERIC_JR_HOST:string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
export const ACTION_HOST:string = "https://api.m.jd.com/client.action?";

export const EXTENSION_VERSION: string = "0.0.9";
export const CONFIG_DATA_URL:string = "https://krapnik.cn/json/setting.json";

export const DEFAULT_ACTIVITY_HOST:string = "https://wbbny.m.jd.com/";
export const TRAVEL_URL:string = "babelDiy/Zeus/3rFiv8Sdkn7BPhk8Pw8xrgMWH6mT/index.html";
export const TRAVEL_INVITE:string = "?babelChannel=gjsyicon&shareType=taskHelp&inviteId=";
export const TEAM_TRAVEL_INVITE:string = "?babelChannel=&shareType=team&inviteId=";


//activity
export const globalInfo = {
    environment: "other",//"jrApp",
    // eid: getEidJoint()['eid'],
    eid: "",
    token:"",
    fp: getEidJoint()['fp'],
    channelLv: "ttte",
    shareUuid: "uuid",
};

export const EVENT_UPDATE_CONFIG = "EVENT_UPDATE_CONFIG";
export const EVENT_UPDATE_INFO = "EVENT_UPDATE_INFO";


