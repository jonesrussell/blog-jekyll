
import LogRocket from 'logrocket';
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import "@fortawesome/fontawesome-free/js/all.js";
import "./scss/main.scss"

LogRocket.init('herbig-haro/blog-2cuyz');

/*LogRocket.getSessionURL(function (sessionURL) {
  gtag('event', 'LogRocket', {
    hitType: 'event',
    eventCategory: 'LogRocket',
    eventAction: sessionURL,
  });
});*/

Sentry.init({
  dsn: "https://db6929703c77406ebb9da8cc7ad91fcf@o244827.ingest.sentry.io/5563615",

  // To set your release version
  release: `blog@1.0.8`,
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

});
