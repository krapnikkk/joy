import axios from "axios";
import { IEvent, IProperty } from "./@types";
import { GMT, MINUTE_PER_DAY } from "./constants";
declare let AAR: any;
const breakOn = (obj: {}, propertyName: string, mode: string | boolean, func: (val: any) => void) => {
    // this is directly from https://github.com/paulmillr/es6-shim
    function getPropertyDescriptor(obj: {}, name: string) {
        var property = Object.getOwnPropertyDescriptor(obj, name);
        var proto = Object.getPrototypeOf(obj);
        while (property === undefined && proto !== null) {
            property = Object.getOwnPropertyDescriptor(proto, name);
            proto = Object.getPrototypeOf(proto);
        }
        return property;
    }

    function verifyNotWritable() {
        if (mode !== 'read')
            throw "This property is not writable, so only possible mode is 'read'.";
    }

    var enabled = true;
    var originalProperty = getPropertyDescriptor(obj, propertyName) as PropertyDescriptor;
    var newProperty = { enumerable: originalProperty.enumerable } as IProperty;

    // write
    if (originalProperty.set) {// accessor property
        newProperty.set = function (val) {
            if (enabled && (!func || func && func(val)))
                debugger;

            originalProperty.set!.call(this, val);
        }
    } else if (originalProperty.writable) {// value property
        newProperty.set = function (val) {
            if (enabled && (!func || func && func(val)))
                debugger;

            originalProperty.value = val;
        }
    } else {
        verifyNotWritable();
    }

    // read
    newProperty.get = function (val: any) {
        if (enabled && mode === 'read' && (!func || func && func(val)))
            debugger;

        return originalProperty.get ? originalProperty.get.call(this, val) : originalProperty.value;
    }

    Object.defineProperty(obj, propertyName, newProperty);

    return {
        disable: function () {
            enabled = false;
        },

        enable: function () {
            enabled = true;
        }
    };
};

export const breakOnCookies = (callback: (val: any) => void) => {
    breakOn(document, 'cookie', false, function (v) {
        callback(v);
    });
}

export const injectCustomJs = (jsPath: string) => {
    return new Promise<void>((resolve, reject) => {
        let script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('charset', 'utf-8');
        script.src = chrome.extension.getURL(jsPath);
        script.onload = () => {
            document.querySelector("html").removeChild(script);
            resolve();
        }
        script.onerror = (e) => {
            document.querySelector("html").removeChild(script);
            console.warn(e);
            reject(e);
        }
        document.querySelector("html").appendChild(script);
    })

}

export const postChromeMessage = (event: IEvent) => {
    let { type, data } = event;
    chrome.runtime.sendMessage({
        type,
        data
    })
}

export const copyText = (text: string) => {
    return new Promise<void>((resolve, reject) => {
        navigator.clipboard.writeText(text).then(() => {
            resolve();
        });
    })
}

export const storagePromise = {
    // local
    local: {
        get: (keys: string | Object | string[]) => {
            const promise = new Promise((resolve, reject) => {
                chrome.storage.local.get(keys, (items) => {
                    const err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items);
                    }
                });
            });
            return promise;
        },
        set: (items: Object) => {
            const promise = new Promise<void>((resolve, reject) => {
                chrome.storage.local.set(items, () => {
                    const err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        },
        getBytesInUse: (keys: string | string[]) => {
            const promise = new Promise((resolve, reject) => {
                chrome.storage.local.getBytesInUse(keys, (items) => {
                    const err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items);
                    }
                });
            });
            return promise;
        },
        remove: (keys: string | string[]) => {
            const promise = new Promise<void>((resolve, reject) => {
                chrome.storage.local.remove(keys, () => {
                    const err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        },
        clear: () => {
            const promise = new Promise<void>((resolve, reject) => {
                chrome.storage.local.clear(() => {
                    const err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        },
    },

};

export const localStoragePromise = storagePromise.local;

export const openWindow = (url: string): Window => {
    return window.open(url, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=375, height=680");
}

export const _get = (url: string, header?: { [key: string]: string }) => {
    return new Promise(async (resolve, reject) => {
        axios.get(url).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.warn(e);
            reject(e);
        })
    })
}

export const get = async (url: string, header?: { [key: string]: string }) => {
    let handler = updateHeader(header);
    await sleep(750);
    let res = await _get(url, header);
    removeHeader(handler);
    return res;
}

export const _post = (url: string, data: {}, header?: { [key: string]: string }) => {
    return new Promise(async (resolve, reject) => {
        axios.post(url, data).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.warn(e);
            reject(e);
        })
    })
}

export const post = async (url: string, data: {}, header?: { [key: string]: string }) => {
    let handler = updateHeader(header);
    await sleep(500);
    let res = await _post(url, data);
    removeHeader(handler);
    return res;
}

export const updateHeader = (header: { [key: string]: string }, filter?: string) => {
    let setHeader = (details: chrome.webRequest.WebRequestHeadersDetails) => {
        for (let i = 0; i < details.requestHeaders.length; i++) {
            let requestHeader = details.requestHeaders[i];
            for (let [name, value] of Object.entries(header)) {
                if (value && requestHeader.name.toLowerCase() === name.toLowerCase()) {
                    requestHeader.value = value;
                    delete header[name];
                    break;
                }
            }
        }
        for (let [name, value] of Object.entries(header)) {
            if (value) {
                details.requestHeaders.push({ name, value });
            }
        }
        console.log(details);
        return { requestHeaders: details.requestHeaders };
    }

    chrome.webRequest.onBeforeSendHeaders.addListener(
        setHeader,
        { urls: [filter || "<all_urls>"] },
        ["blocking", "requestHeaders", "extraHeaders"]
    );
    return setHeader;
}

export const removeHeader = (callback: (details: chrome.webRequest.WebRequestHeadersDetails) => {
    requestHeaders: chrome.webRequest.HttpHeader[];
}) => {
    chrome.webRequest.onBeforeSendHeaders.removeListener(callback);
}

export const getResponse = () => {
    chrome.webRequest.onHeadersReceived.addListener(
        (details: chrome.webRequest.WebRequestHeadersDetails) => {
            console.log(details);
        },
        { urls: ["<all_urls>"] },
        ["responseHeaders", "extraHeaders"]
    );
}

export const getSignature = (signData: {}) => {
    let aar = new AAR();
    let nonce = aar.nonce();
    let signature = aar.sign(JSON.stringify(signData), nonce);
    return {
        nonce, signature
    }
}

export const getReqData = (signData: {}, sign: boolean = true, args: {} = {}) => {
    let signature = sign ? getSignature(signData) : null;
    Object.assign(signData, args);
    let reqData = {
        ...signData,
        "timeSign": Math.random(),
        ...signature
    };
    return JSON.stringify(reqData);
}

export const sleep = (delay: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    })
}

export const clearScheduleTask = () => {
    chrome.alarms.clearAll(() => {
    });
}

export const createAlarms = (name: string, alarmInfo: chrome.alarms.AlarmCreateInfo) => {
    chrome.alarms.create(name, alarmInfo);
}

export const dailySignIn = () => {
    let now = new Date();
    let date = `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
    let item = {};
    item[date] = true;
    localStoragePromise.set(item);
}

// 距离 0 点还剩下多少分钟，每日更新定时任务用
export const minLeftMidnight = function (): number {
    return MINUTE_PER_DAY - Math.round(timeNow() / 60) % MINUTE_PER_DAY
}

export const timeNow = () => {
    return Math.round(Date.now() / 1000) + GMT * 3600;
}

export const getRandom = (): string => {
    return Math.floor(1e6 * Math.random()).toString();
}

export const rnd = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const setUserAgent = (userAgent: string) => {
    // Works on Firefox, Chrome, Opera and IE9+
    // if (navigator["__defineGetter__"]) {
    //     navigator["__defineGetter__"]('userAgent', function () {
    //         return userAgent;
    //     });
    // } else if (Object.defineProperty) {
    Object.defineProperty(navigator, 'userAgent', {
        get: function () {
            return userAgent;
        }
    });
    // }
    // // Works on Safari
    // if (window.navigator.userAgent !== userAgent) {
    //     var userAgentProp = {
    //         get: function () {
    //             return userAgent;
    //         }
    //     };
    //     try {
    //         Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
    //     } catch (e) {
    //         window.navigator = Object.create(navigator, {
    //             userAgent: userAgentProp
    //         });
    //     }
    // }
    
}