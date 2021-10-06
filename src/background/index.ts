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

let tempCookies: chrome.cookies.Cookie[] = [];
chrome.cookies.getAll({ 'domain': '.jd.com' }, function (cookies) {
    tempCookies = cookies;
    // for (let i = 0; i < cookies.length; i++) {

    //     var prefix = "https://";

    //     var url = prefix + cookies[i].domain + cookies[i].path;
    //     // if (cookies[i].name == "pt_pin" || cookies[i].name == "pt_pin") {

    //     chrome.cookies.remove({ 'url': url, 'name': cookies[i].name }, function (cookie) {
    //         // console.log("clear:",cookies[i].name);
    //     });
    //     // }
    // }
    // setTimeout(() => {
    //     console.log("restore");
    //     tempCookies.forEach((details) => {
    //         let { value,domain, path,name,storeId,sameSite,secure,httpOnly,expirationDate } = details;
    //         let url = "https://plogin.m.jd.com";
    //         let setDetails = {
    //             url,
    //             domain,
    //             name,
    //             storeId,
    //             value,
    //             expirationDate,
    //             path,
    //             httpOnly,
    //             secure,
    //             sameSite
    //         };
    //         console.log("setDetails:",setDetails);
    //         chrome.cookies.set(setDetails);
    //     })
    // }, 5000);
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