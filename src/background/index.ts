import { AUTO_GET_COOKIES, CLOSE_LOGIN_WINDOW, GET_COOKIES_SUCCESS, LOGIN, LOGIN_SUCCESS, REQUEST } from "../Events";
import { createAlarms, get, localStoragePromise, openWindow, postChromeMessage } from "@src/utils";
import { ACTIVITY_TASK_INTERVAL, COOKIE_KEYS, GENERIC_JR_HOST, HOME_PAGE, MARK, USER_AGENT, USER_INFO_URL } from "@src/constants";
// import axios from "axios";
declare let AAR: any;

chrome.browserAction.onClicked.addListener(function () {
    const index = chrome.extension.getURL('view-tab.html');
    chrome.tabs.query({ url: index }, function (tabs) {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, { active: true });
            chrome.windows.update(tabs[0].windowId, { focused: true });
        } else {
            chrome.tabs.create({ url: index });
        }
    });
});

chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
        // install
        // chrome.tabs.create({url: 'disclaimer.html'})
    }
    if (details.reason === 'update') {
        // 更新事件
    }

});

let loginWindow: Window;
let tempCookies: chrome.cookies.Cookie[] = [];
let loginFlag: boolean = false;//是否开启cookie隔离模式
const getCookie = () => {
    return new Promise<void>((resolve, reject) => {
        chrome.cookies.getAll({ 'domain': '.jd.com' }, function (cookies) {
            let ck = "";
            cookies.forEach((cookie) => {
                if (COOKIE_KEYS.includes(cookie.name)) {
                    ck += `${cookie.name}=${cookie.value}; `;
                }
            })
            if (ck) {
                // 校验ck有效性
                getUserInfo(ck).then((res: Object) => {
                    Object.assign(res, { cookie: ck, createDate: Date.now() });
                    let curPin: string = res['curPin'];
                    localStoragePromise.get("account").then((storage: any) => {
                        let account = storage.account || {};
                        if (account[curPin]) {
                            console.log("覆盖");
                        }
                        account[curPin] = res;
                        localStoragePromise.set({
                            account
                        }).then(() => {
                            postChromeMessage({ type: GET_COOKIES_SUCCESS });
                        });
                    });

                }).catch((e) => {
                    console.warn(e);
                    // todo
                });
            } else {
                openLoginWindow();
            }
            resolve();
        });
    })
}

const openLoginWindow = (login: boolean = false) => {
    if (loginWindow) {
        loginWindow.blur();
    } else {
        loginWindow = openWindow(`${HOME_PAGE}?${MARK}`);
    }
}


const resetCookies = () => {
    return new Promise<void>((resolve) => {
        chrome.cookies.getAll({ 'domain': '.jd.com' }, (cookies) => {
            tempCookies = cookies;
            for (let i = 0; i < cookies.length; i++) {
                let prefix = "https://";
                let url = prefix + cookies[i].domain + cookies[i].path;
                chrome.cookies.remove({ 'url': url, 'name': cookies[i].name });
            }
            resolve();
        });
    })
}

const restoreCookies = () => {
    tempCookies.forEach((details) => {
        let { value, domain, path, name, storeId, sameSite, secure, httpOnly, expirationDate } = details;
        let url = "https://plogin.m.jd.com"; // domain
        let setDetails = {
            url,
            domain,
            name,
            storeId,
            value,
            expirationDate,
            path,
            httpOnly,
            secure,
            sameSite
        };
        chrome.cookies.set(setDetails);
    });
    loginFlag = false;
    tempCookies.length = 0;
}

const getUserInfo = (cookie: string) => {
    return get(USER_INFO_URL, { cookie }).then((res: any) => {
        return res.data.userInfo.baseInfo;
    });
}

// const queueTask = (task:Function) => {

// }

const toWithdraw = (cookie?:string) => {
    var environment = "other";//"jrApp",
    var eid = "";
    var fp = "";
    var channelLv = "clv";
    var shareUuid = "uuid";
    var riskDeviceInfo = JSON.stringify({
        eid,
        fp
    });
    var signData = {
        channelLv,
        environment,
        riskDeviceInfo,
        shareUuid,
    };
    var aar = new AAR(); // 1，new对象
    var nonce = aar.nonce(); // 2，产生nonce
    var signature = aar.sign(JSON.stringify(signData), nonce); // 3，对signData签名
    var reqData = {
        ...signData,
        "timeSign": Math.random(),
        nonce,
        signature
    };
    let url = `${GENERIC_JR_HOST}toDailyHome?reqData=${JSON.stringify(reqData)}`;
    let header = {
        "User-Agent": USER_AGENT,
        "Referer": "https://active.jd.com/",
        cookie
    };
    return get(url, header);
}
chrome['toWithdraw'] = toWithdraw;
toWithdraw();



// 事件监听
chrome.runtime.onMessage.addListener((request, _sender: chrome.runtime.MessageSender, sendResponse) => {
    console.log(request);
    switch (request.type) {
        case AUTO_GET_COOKIES:
            getCookie();
            break;
        case LOGIN:
            loginFlag = true; // 开启隔离
            if (!loginWindow) {
                resetCookies().then(() => {
                    openLoginWindow();
                });
            } else {
                loginWindow.focus()
            }
            break;
        case LOGIN_SUCCESS:
            loginWindow = null;
            getCookie().then(() => {
                restoreCookies();
                postChromeMessage({ type: GET_COOKIES_SUCCESS });
            });
            break;
        case CLOSE_LOGIN_WINDOW:
            loginWindow = null;
            if (loginFlag) {
                restoreCookies();
            }
            break;
        case REQUEST:
            break;
        default:
            console.log(request)
            break;
    }
});

// 定时任务
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name == "activity") {
        toWithdraw();
    }
})

const startScheduleTask = () => {
    createAlarms("activity", {
        periodInMinutes: ACTIVITY_TASK_INTERVAL
    });
}
startScheduleTask();


