import { AUTO_GET_COOKIES, CLOSE_LOGIN_WINDOW, GET_COOKIES_SUCCESS, LOGIN, LOGIN_SUCCESS } from "../Events";
import { localStoragePromise, postChromeMessage } from "@src/utils";
import { HOME_PAGE, MARK, USER_INFO_URL } from "@src/constants";
import axios from "axios";

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
                if (cookie.name == "pt_pin" || cookie.name == "pt_token" || cookie.name == "pt_key") {
                    ck += `${cookie.name}=${cookie.value}; `;
                }
            })
            if (ck) {
                // 校验ck有效性
                getUserInfo(ck).then((res: Object) => {
                    Object.assign(res, { cookie: ck, createDate: Date.now() });
                    let curPin: string = res['curPin'];
                    localStoragePromise.get("account").then((storage: any) => {
                        let account = storage.account||{};
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
        loginWindow = window.open(`${HOME_PAGE}?${MARK}`, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=375, height=677");
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
    let handler = updateHeader("cookie", cookie);
    return new Promise((resolve, reject) => {
        axios.get(USER_INFO_URL, {
        }).then((res) => {
            let data = res.data;
            console.log(data);
            removeHeader(handler);
            if (data.retcode != "0") {
                reject(new Error(data.msg));
            } else {
                resolve(data.data.userInfo.baseInfo);
            }
        }).catch((e) => {
            removeHeader(handler);
            console.warn(e);
            reject(e);
        })
    })

}

const updateHeader = (name: string, value: string) => {
    let setHeader = (details: chrome.webRequest.WebRequestHeadersDetails) => {
        details.requestHeaders.forEach((requestHeader) => {
            if (requestHeader.name.toLowerCase() === name) {
                requestHeader.value = value;
            }
        });
        return { requestHeaders: details.requestHeaders };
    }

    chrome.webRequest.onBeforeSendHeaders.addListener(
        setHeader,
        { urls: [USER_INFO_URL] },
        ["blocking", "requestHeaders", "extraHeaders"]
    );
    return setHeader;
}

const removeHeader = (callback: (details: chrome.webRequest.WebRequestHeadersDetails) => {
    requestHeaders: chrome.webRequest.HttpHeader[];
}) => {
    chrome.webRequest.onBeforeSendHeaders.removeListener(callback);
}

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
        default:
            console.log(request)
            break;
    }
});


