/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ data }) => {
  const { i18n } = data;

  return {
    i18n,
    isLoggedIn: data.isLoggedIn,
    cfIpCountry: data.cfIpCountry,
    location: { ...data.location },
  };
};
