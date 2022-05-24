import { ACTION_HOST, GENERIC_JR_HOST, globalInfo, USER_AGENT, JDAPP_USER_AGENT, JDJRAPP_USER_AGENT, MINIPROGRAM_USER_AGENT } from "./constants";
import { get, getReqData, post } from "./utils";

export const toWithdraw = (cookie?: string) => {
    let { environment, eid, fp, channelLv, shareUuid,token } = globalInfo;
    let riskDeviceInfo = JSON.stringify({
        eid,
        fp,token
    });
    let signData = {
        channelLv,
        environment,
        riskDeviceInfo,
        shareUuid,
    };
    let reqData = getReqData(signData,true)
    let url = `${GENERIC_JR_HOST}toWithdraw?reqData=${reqData}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        "origin": "https://active.jd.com/",
        cookie
    };
    return get(url, header);
}

export const autoToWithdraw = async (cookie?: string) => {
    await toDailyHome(cookie);
    await toDailySignIn(cookie);
    return toWithdraw(cookie);
}

export const toGoldExchange = (cookie?: string) => {
    let { environment, eid, fp, channelLv, shareUuid,token } = globalInfo;
    let riskDeviceInfo = JSON.stringify({
        eid,
        fp,
        token
    });
    let signData = {
        channelLv,
        environment,
        riskDeviceInfo,
        shareUuid,
    };
    let reqData = getReqData(signData)
    let url = `${GENERIC_JR_HOST}toGoldExchange?reqData=${reqData}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        "origin": "https://active.jd.com/",
        cookie
    };
    return get(url, header);
}

export const toDailySignIn = (cookie?: string) => {
    let { environment, eid, fp, channelLv, shareUuid,token } = globalInfo;
    let riskDeviceInfo = JSON.stringify({
        eid,
        fp,
        token
    });
    let signData = {
        channelLv,
        environment,
        riskDeviceInfo,
        shareUuid,
    };
    // let reqData = getReqData(signData, true, { riskDeviceInfo });
    let reqData = getReqData(signData, true);
    let url = `${GENERIC_JR_HOST}toDailySignIn?reqData=${reqData}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        "origin": "https://active.jd.com/",
        cookie
    };
    return get(url, header);
}

export const toDailyHome = (cookie?: string) => {
    let { environment, eid, fp, channelLv, shareUuid,token } = globalInfo;
    let riskDeviceInfo = JSON.stringify({
        eid,
        fp,token
    });
    let signData = {
        channelLv,
        environment,
        riskDeviceInfo,
        shareUuid,
    };
    let reqData = getReqData(signData, true);
    let url = `${GENERIC_JR_HOST}toDailyHome?reqData=${reqData}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        "origin": "https://active.jd.com/",
        cookie
    };
    return get(url, header);
}

// 养猪猪

export const pigPetOpenBox = (cookie?: string) => {
    let t = Date.now();
    let data = `reqData=${JSON.stringify({ "source": 0, "channelLV": "yqs", "riskDeviceParam": "{}", "t": `${t}` })}`;
    let url = `${GENERIC_JR_HOST}pigPetOpenBox?_=${t}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        "origin": "https://active.jd.com/",
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const pigPetLotteryPlay = (cookie?: string) => {

}

// 金果树

const userInfoMap = {

};
export const login = (key: string, cookie?: string) => {
    let t = Date.now();
    let data = `reqData=${JSON.stringify({ "sharePin": "", "shareType": "1", "source": 2, "riskDeviceParam": "{\"fp\":\"\",\"eid\":\"\",\"sdkToken\":\"\",\"sid\":\"\"}" })}`;
    let url = `${GENERIC_JR_HOST}login?_=${t}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        "origin": "https://active.jd.com/",
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };

    return post(url, data, header);
}

export const harvest = (key: string, cookie?: string) => {
    let t = Date.now();
    let info = userInfoMap[key];
    if (!info) {
        return "info undefined";
    }
    let { userInfo, userToken } = info;
    let data = `reqData=${JSON.stringify({ "source": 2, "sharePin": null, "userId": userInfo, userToken })}`;
    let url = `${GENERIC_JR_HOST}harvest?_=${t}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        "origin": "https://active.jd.com/",
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const autoHarvest = async (cookie: string, key: string) => {
    let res = await login(key, cookie) as any;
    userInfoMap[key] = res.resultData.data;
    return harvest(key, cookie);

}

// 热爱环游记
export const getHomeData = async (cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_getHomeData";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let body = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ?{"appSign":"2"}:{};
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${JSON.stringify(body)}`;
    let url = `${ACTION_HOST}${api}=${functionId}`;
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        ...args,
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const getPKHomeData = async (cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_pk_getHomeData";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let body = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ?{"appSign":"2"}:{};
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${JSON.stringify(body)}`;
    let url = `${ACTION_HOST}${api}=${functionId}`;
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        ...args,
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const JoinGroup = async (body: string,cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_pk_joinGroup";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${body}`;
    let url = `${ACTION_HOST}${api}=${functionId}`
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        ...args,
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}
export const getTaskDetail = async (cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_getTaskDetail";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let body = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ?{"appSign":"2"}:{};
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${JSON.stringify(body)}`;
    let url = `${ACTION_HOST}${api}=${functionId}`;
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        ...args,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const collectScore = async (body: string, cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_collectScore";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${body}`;
              //functionId=promote_getHomeData&client=m&clientVersion=-1&appid=signed_wh5&body={}
    let url = `${ACTION_HOST}${api}=${functionId}`
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        ...args,
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}


export const collectAtuoScore = async (body: string, cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_collectAutoScore";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${body}`;
    let url = `${ACTION_HOST}${api}=${functionId}`;
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        ...args,
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const getFeedDetail = async (taskId: number, cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_getFeedDetail";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${JSON.stringify({ taskId })}`;
    let url = `${ACTION_HOST}${api}=${functionId}`;
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        ...args,
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const raise = async (body:string,cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_raise";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${body}`;
    let url = `${ACTION_HOST}${api}=${functionId}`;
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        ...args,
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const sign = async (body: string, cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_sign";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${body}`;
    let url = `${ACTION_HOST}${api}=${functionId}`;
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        ...args,
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const getBadgeAward = async (body: string, cookie?: string, userAgent: string = JDAPP_USER_AGENT) => {
    let functionId = "promote_getBadgeAward";
    let api = userAgent.indexOf(MINIPROGRAM_USER_AGENT) > -1 ? "dev" : "functionId";
    let data = `functionId=${functionId}&client=m&clientVersion=-1&appid=signed_wh5&body=${body}`;
    let url = `${ACTION_HOST}${api}=${functionId}`;
    let args = userAgent == JDJRAPP_USER_AGENT ? { "X-Requested-With": "com.jd.jrapp" } : {};
    let header = {
        "User-Agent": userAgent,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        ...args,
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}

export const miMissions = async (cookie?: string) => {
    let reqData = "miMissions";
    let data = `reqData=${JSON.stringify(reqData)}`;
    let url = `${GENERIC_JR_HOST}miMissions`;
    let header = {
        "User-Agent": JDJRAPP_USER_AGENT,
        "Referer": "https://wbbny.m.jd.com/",
        "origin": "https://wbbny.m.jd.com/",
        "X-Requested-With": "com.jd.jrapp",
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return post(url, data, header);
}
