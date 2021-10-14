import { IAccount } from "@src/@types";
import { AUTO_GET_COOKIES, CLOSE_LOGIN_WINDOW, GET_COOKIES_SUCCESS, LOGIN, LOGIN_SUCCESS, REQUEST } from "../Events";
import { createAlarms, get, localStoragePromise, openWindow, postChromeMessage, sleep, updateHeader } from "@src/utils";
import { ACTIVITY_TASK_INTERVAL, COOKIE_KEYS, HOME_PAGE, MARK, USER_INFO_URL } from "@src/constants";
import { autoHarvest, autoToWithdraw, pigPetOpenBox, toDailyHome, toDailySignIn, toGoldExchange } from "@src/Activity";

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

chrome['autoToWithdraw'] = autoToWithdraw;
chrome['toGoldExchange'] = toGoldExchange;
chrome['toDailySignIn'] = toDailySignIn;
chrome['toDailyHome'] = toDailyHome;
chrome['pigPetOpenBox'] = pigPetOpenBox;
chrome['autoHarvest'] = autoHarvest;
chrome['queueTask'] = queueTask;
// queueTask(autoHarvest);
// toWithdraw();

// 事件监听
chrome.runtime.onMessage.addListener((request, _sender: chrome.runtime.MessageSender, sendResponse) => {
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
chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name == "activity") {
        await queueTask(autoToWithdraw);
        await queueTask(pigPetOpenBox);
        await queueTask(autoHarvest);
    }
})

const startScheduleTask = () => {
    createAlarms("activity", {
        periodInMinutes: ACTIVITY_TASK_INTERVAL
    });
}

const dailySignIn = () => {
    let now = new Date();
    let date = `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
    let item = {};
    item[date] = true;
    localStoragePromise.set(item);
}

updateHeader({ "Access-Control-Allow-Origin": "*" });
dailySignIn();
startScheduleTask();


