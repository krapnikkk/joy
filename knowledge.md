# 突破cos限制的一些方法

## Access-Control-Allow-Origin

## 强制篡改和构造添加Referer

## cookie隔离

## 302重定向 & 获取 set-cookie

chrome.webRequest.onBeforeRedirect

chrome.webRequest.onHeadersReceived.addListener(
    (details: chrome.webRequest.WebRequestHeadersDetails) => {
        
    },
    { urls: ["<all_urls>"] },
    ["responseHeaders","extraHeaders"]
);

## 使用外部链接的行内脚本或者iframe