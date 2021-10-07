import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './App';
if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: "https://b24c68a8384646f0b2b8bc4237e7f125@o643154.ingest.sentry.io/5996737",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}
// var _hmt:string[] = _hmt || [];
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "https://hm.baidu.com/hm.js?3f46885080d327e37b00c5879a6f0fb5";
//   var s = document.getElementsByTagName("script")[0]; 
//   s.parentNode.insertBefore(hm, s);
// })();

ReactDOM.render(<App />, document.getElementById("view-tab"));