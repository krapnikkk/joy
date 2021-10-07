import { IEvent, IProperty } from "./@types";

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