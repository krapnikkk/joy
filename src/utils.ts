import axios from "axios";
import { IEvent, IProperty } from "./@types";
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
            document.head.removeChild(script);
            resolve();
        }
        script.onerror = (e) => {
            document.head.removeChild(script);
            console.warn(e);
            reject(e);
        }
        document.head.appendChild(script);
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
    // sync
    sync: {
        get: (keys: string) => {
            const promise = new Promise((resolve, reject) => {
                chrome.storage.sync.get(keys, (items) => {
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
                chrome.storage.sync.set(items, () => {
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
                chrome.storage.sync.getBytesInUse(keys, (items) => {
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
                chrome.storage.sync.remove(keys, () => {
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
                chrome.storage.sync.clear(() => {
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

    // managed
    managed: {
        get: (keys: string | string[]) => {
            const promise = new Promise((resolve, reject) => {
                chrome.storage.managed.get(keys, (items) => {
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
                chrome.storage.managed.set(items, () => {
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
                chrome.storage.managed.getBytesInUse(keys, (items) => {
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
                chrome.storage.managed.remove(keys, () => {
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
                chrome.storage.managed.clear(() => {
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

    // onChanged
    onChanged: {
        addListener: () => {
            const promise = new Promise((resolve, reject) => {
                chrome.storage.onChanged.addListener((changes) => {
                    const err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(changes);
                    }
                });
            });
            return promise;
        },
    },
};

export const localStoragePromise = storagePromise.local;
export const syncStoragePromise = storagePromise.sync;

export const openWindow = (url: string): Window => {
    return window.open(url, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=375, height=680");
}

export const get = (url: string, header?: { [key: string]: string }) => {
    return new Promise(async (resolve, reject) => {
        let handler = updateHeader(header);
        await sleep(100); // fix updateHeader
        axios.get(url).then((res) => {
            removeHeader(handler);
            let data = res.data;
            if (data.retcode != "0" && data.resultCode != 0) {
                reject(new Error(data));
            } else {
                resolve(data);
            }
        }).catch((e) => {
            removeHeader(handler);
            console.warn(e);
            reject(e);
        })
    })
}

export const updateHeader = (header: { [key: string]: string }, filter?: string) => {
    let setHeader = (details: chrome.webRequest.WebRequestHeadersDetails) => {
        details.requestHeaders.forEach((requestHeader) => {
            for (let [name, value] of Object.entries(header)) {
                if (value && requestHeader.name.toLowerCase() === name.toLowerCase()) {
                    requestHeader.value = value;
                    delete header[name];
                    break;
                }
            }
        });
        for (let [name, value] of Object.entries(header)) {
            if (value) {
                details.requestHeaders.push({ name, value });
            }
        }
        return { requestHeaders: details.requestHeaders };
    }

    chrome.webRequest.onBeforeSendHeaders.addListener(
        setHeader,
        { urls: ["<all_urls>"] },
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

export const getReqData = (signData: {},sign:boolean = true) => {
    let signature = sign ? getSignature(signData) : null;
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