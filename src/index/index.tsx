import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
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

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("view-tab"));