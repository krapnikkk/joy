export const EXTENSION_NAME: string = "joy";
export const LOGIN_PAGE: string = "https://plogin.m.jd.com/login/login";
export const HOME_PAGE: string = "https://home.m.jd.com/myJd/newhome.action";
export const USER_INFO_URL: string = "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion";
export const GITHUB_URL: string = `https://ghbtns.com/github-btn.html?user=krapnikkk&repo=${EXTENSION_NAME}&type=star`;
export const MARK: string = "type=mark";
export const SCENE_VAL: string = `sceneval=2&ufc=&${MARK}`;
export const ACTIVITY_TASK_INTERVAL: number = 5;
export const MINUTE_PER_DAY:number = 1440;
export const GMT: number = +8;
export const USER_AGENT:string= "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";
export const COOKIE_KEYS:string[] = ["pt_pin","pt_token","pt_key"]; // "3AB9D23F7A4B3C9B"   
export const GENERIC_JR_HOST:string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";

export const EXTENSION_VERSION: string = "0.0.1";
export const CONFIG_DATA_URL:string = "https://krapnik.cn/json/setting.json";

//activity
export const globalInfo = {
    environment: "other",//"jrApp",
    eid: "",
    fp: "",
    channelLv: "clv",
    shareUuid: "uuid",
};

export const EVENT_UPDATE_CONFIG = "EVENT_UPDATE_CONFIG";
export const EVENT_UPDATE_INFO = "EVENT_UPDATE_INFO";