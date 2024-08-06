export const load = async (event) => {
  const isLoggedIn = event.locals.loginStatus;
  const cfIpCountry = event.locals.headers.get("CF-IPCountry");
  const long = event.locals.headers.get("cf-iplongitude");
  const lat = event.locals.headers.get("cf-iplatitude");
  const region = event.locals.headers.get("cf-region-code");
  const ip = event.locals.headers.get("cf-connecting-ip");

  const { pathname } = event.url;

  let locale = (event.cookies.get("lang") || "en").toLowerCase();

  // Get user preferred locale

  if (!locale) {
    locale = `${`${event.request.headers.get("accept-language")}`.match(
      /[a-zA-Z]+?(?=-|_|,|;)/
    )}`.toLowerCase();
    if (cfIpCountry == "BR" || cfIpCountry == "PT") {
      locale = "pt";
    }
  }

  return {
    i18n: { locale, route: pathname },
    isLoggedIn,
    cfIpCountry: cfIpCountry || "GB",
    location: { long: long, lat: lat, region: region, ip: ip },
  };
};
