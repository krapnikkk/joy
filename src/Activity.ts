import { GENERIC_JR_HOST, globalInfo, USER_AGENT } from "./constants";
import { get, getReqData, localStoragePromise, post } from "./utils";

export const toWithdraw = (cookie?: string) => {
    let { environment, eid, fp, channelLv, shareUuid } = globalInfo;
    let riskDeviceInfo = JSON.stringify({
        eid,
        fp
    });
    let signData = {
        channelLv,
        environment,
        riskDeviceInfo,
        shareUuid,
    };
    let reqData = getReqData(signData)
    let url = `${GENERIC_JR_HOST}toWithdraw?reqData=${reqData}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        cookie
    };
    return get(url, header);
}

export const autoToWithdraw = async(cookie?: string) => {
    let now = new Date();
    let date = `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
    let flag = await localStoragePromise.get(date);
    if(flag){
        return toWithdraw(cookie);
    }else{
        await toDailySignIn(cookie);
        return toWithdraw(cookie);
    }

}

export const toGoldExchange = (cookie?: string) => {
    let { environment, eid, fp, channelLv, shareUuid } = globalInfo;
    let riskDeviceInfo = JSON.stringify({
        eid,
        fp
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
        cookie
    };
    return get(url, header);
}

export const toDailySignIn = (cookie?: string) => {
    let { environment, channelLv, shareUuid } = globalInfo;
    let signData = {
        channelLv,
        environment,
        shareUuid,
    };
    let reqData = getReqData(signData)
    let url = `${GENERIC_JR_HOST}toDailySignIn?reqData=${reqData}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        cookie
    };
    return get(url, header);
}

export const toDailyHome = (cookie?: string) => {
    let { environment, eid, fp, channelLv, shareUuid } = globalInfo;
    let riskDeviceInfo = JSON.stringify({
        eid,
        fp
    });
    let signData = {
        riskDeviceInfo,
        channelLv,
        environment,
        shareUuid,
    };
    let reqData = getReqData(signData, false);
    let url = `${GENERIC_JR_HOST}toDailyHome?reqData=${reqData}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
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
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return new Promise((resolve) => {
        let _key = key;
        post(url, data, header).then((res: any) => {
            userInfoMap[_key] = res.resultData.data;
            harvest(_key, cookie).then((res) => {
                resolve(res);
            });
        });
    })
}

export const harvest = (key: string, cookie?: string) => {
    let t = Date.now();
    let info = userInfoMap[key];
    let { userInfo, userToken } = info;
    let data = `reqData=${JSON.stringify({ "source": 2, "sharePin": null, "userId": userInfo, userToken })}`;
    let url = `${GENERIC_JR_HOST}harvest?_=${t}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        cookie,
        "Content-type": "application/x-www-form-urlencoded"
    };
    return new Promise((resolve) => {
        post(url, data, header).then((res) => {
            resolve(res);
        });
    })
}

export const autoHarvest = async (cookie: string, key: string) => {
    return new Promise((resolve) => {
        if (userInfoMap[key]) {
            harvest(key, cookie).then((res) => {
                resolve(res);
            });
        } else {
            login(key, cookie).then((res) => {
                resolve(res);
            });;
        }

    })
}