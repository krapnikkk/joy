import { IAccount } from "@src/@types";
import { AUTO_GET_COOKIES, CLOSE_LOGIN_WINDOW, EXPORT, GET_COOKIES_SUCCESS, LOGIN, LOGIN_SUCCESS, REQUEST } from "../Events";
import { createAlarms, get, localStoragePromise, minLeftMidnight, openWindow, postChromeMessage, sleep } from "@src/utils";
import { ACTIVITY_TASK_INTERVAL, COOKIE_KEYS, HOME_PAGE, MARK, MINUTE_PER_DAY, USER_INFO_URL } from "@src/constants";
import { autoHarvest, autoToWithdraw, pigPetOpenBox, toDailyHome, toDailySignIn, toGoldExchange, toWithdraw } from "@src/Activity";

chrome.browserAction.onClicked.addListener(function () {
    const index = chrome.extension.getURL('index.html');
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
        chrome.tabs.create({url: 'index.html#/about'})
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
        chrome.cookies.getAll({ 'domain': '.jd.com' }, async function (cookies) {
            let ck = "";
            cookies.forEach((cookie) => {
                if (COOKIE_KEYS.includes(cookie.name)) {
                    ck += `${cookie.name}=${cookie.value}; `;
                }
            })
            if (ck) {
                // 校验ck有效性
                await checkCookie(ck);
            } else {
                openLoginWindow();
            }
            resolve();
        });
    })
}

const checkCookie = (cookie: string) => {
    return new Promise<void>((resolve) => {
        getUserInfo(cookie).then((res: Object) => {
            Object.assign(res, { cookie, createDate: Date.now() });
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
                resolve();
            });
        }).catch((e) => {
            console.warn(e);
        });
    })
}

const exportCookie = async (value: string) => {
    let cookies = value.split("\n");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        if (cookie) {
            await checkCookie(cookie);
        }
    }
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

const queueTask = (task: Function) => {
    return new Promise<void>((resolve) => {
        localStoragePromise.get("account").then(async (res: { [key: string]: IAccount }) => {
            let { account } = res;
            for (let key in account) {
                let user = account[key];
                let { cookie } = user;
                let info = await task(cookie, key);
                await sleep(500);
                console.log(info);
            }
            resolve();
        })
    })
}



// 事件监听
chrome.runtime.onMessage.addListener((request, _sender: chrome.runtime.MessageSender, sendResponse) => {
    let { data, type } = request;
    console.log(type);
    switch (type) {
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
            }else{
                postChromeMessage({ type: CLOSE_LOGIN_WINDOW });
            }
            break;
        case EXPORT:
            exportCookie(data);
            break;
        case REQUEST:
            break;
        default:
            console.log(request)
            break;
    }
});

// 定时任务
let dailySignInFlag = false;
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name == "activity") {
        startActivityTask();
    } else if (alarm.name == "mignight_clear") { // 零点重置
        dailySignInFlag = false;
    }
})

const startScheduleTask = () => {
    createAlarms("activity", {
        periodInMinutes: ACTIVITY_TASK_INTERVAL
    });
    createAlarms("mignight_clear", { delayInMinutes: minLeftMidnight(), periodInMinutes: MINUTE_PER_DAY })
}


const startActivityTask = async () => {
    if (!dailySignInFlag) {
        // await queueTask(autoToWithdraw);
        dailySignInFlag = true;
    } else {
        // await queueTask(toWithdraw);
    }
    // await queueTask(pigPetOpenBox);
    // await queueTask(autoHarvest);
}

// updateHeader({ "Access-Control-Allow-Origin": "*" });


startScheduleTask();

// for test
chrome['autoToWithdraw'] = autoToWithdraw;
chrome['toWithdraw'] = toWithdraw;
chrome['toGoldExchange'] = toGoldExchange;
chrome['toDailySignIn'] = toDailySignIn;
chrome['toDailyHome'] = toDailyHome;
chrome['pigPetOpenBox'] = pigPetOpenBox;
chrome['autoHarvest'] = autoHarvest;
chrome['queueTask'] = queueTask;
chrome['startActivityTask'] = startActivityTask;
// queueTask(autoHarvest);
// toWithdraw();


