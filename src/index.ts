import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://db6929703c77406ebb9da8cc7ad91fcf@o244827.ingest.sentry.io/5563615",

  // To set your release version
  release: `blog@${process.env.npm_package_version}`,
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

});
