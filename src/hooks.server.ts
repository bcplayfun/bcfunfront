import { redirect, type Handle } from "@sveltejs/kit";
import { getLoggedIn } from "$lib/utils/page";

// Sentry.init({
//   dsn: "https://da469fc28f7e93c861a028a6b984d209@o4505766227476480.ingest.sentry.io/4505766315819008",
//   tracesSampleRate: 1,
// });
// Sentry.sentryHandle(),
export const handle: Handle = ({ event, resolve }) => {
  event.locals.loginStatus = getLoggedIn(event.cookies);
  event.locals.headers = event.request.headers;
  if (
    event.url.pathname.startsWith("/user") ||
    event.url.pathname.startsWith("/game")
  ) {
    if (!event.locals.loginStatus) {
      throw redirect(303, "/");
    }
  }

  return resolve(event);
};

// export const handleError = Sentry.handleErrorWithSentry();
