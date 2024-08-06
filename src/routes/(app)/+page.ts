// import api from "$lib/api";
// import type { PageLoad } from "./$types";

// const params = {
//   page: 1,
//   limit: 30,
// };

// import * as assets from "$lib/assets/banners";
// const banners = [
//   {
//     title: "Where Minutes Mean Mega Wins!",
//     description: "Win big with these 10 min jackpots",
//     img: assets.freespinBackground,
//     img_mobile: assets.freespinBackgroundMobile,
//     front_img: assets.freespinForeground,
//     front_img_mobile: assets.freespinForegroundMobile,
//     action_label: "play now",
//     action_url: "/slots",
//   },
//   {
//     title: "Purchase Power!<br/>Instant Bonuses, Bigger Wins!",
//     description: "Win big with these 10 min jackpots",
//     img: assets.bonusBackground,
//     img_mobile: assets.bonusBackgroundMobile,
//     front_img: assets.bonusForegroundHades,
//     front_img2: assets.bonusForegroundZeus,
//     front_img_mobile: assets.bonusForegroundHadesMobile,
//     front_img2_mobile: assets.bonusForegroundZeusMobile,
//     action_label: "play now",
//     action_url: "",
//     three: true,
//   },
//   {
//     title: "Unleash the Fun<br />Mighty Mini-Games!",
//     description: "Win big with these 10 min jackpots",
//     img: assets.welcomeBackground,
//     img_mobile: assets.welcomeBackgroundMobile,
//     front_img: assets.welcomeForeground,
//     front_img_mobile: assets.welcomeForegroundMobile,
//     action_label: "play now",
//     action_url: "/mini",
//   },
//   {
//     title: "Unlock Mini Adventures,<br />Win Mega Treasures!",
//     description: "Win big with these 10 min jackpots",
//     img: assets.cashbackBackground,
//     img_mobile: assets.cashbackBackgroundMobile,
//     front_img: assets.cashbackForeground,
//     front_img_mobile: assets.cashbackForegroundMobile,
//     action_label: "play now",
//     action_url: "",
//   },
//   {
//     title: "Coming Soon!",
//     description: "Win big with these 10 min jackpots",
//     img: assets.sportBackground,
//     img_mobile: assets.sportBackgroundMobile,
//     front_img: assets.sportForeground,
//     front_img_mobile: assets.sportForegroundMobile,
//     action_label: "play now",
//     action_url: "",
//   },
// ];
// export const load = (async () => {
//   const [[popular], [bonus], [promotions]] = await Promise.all([
//     await api.games.getGames({
//       ...params,
//       group_id: "20",
//     }),
//     await api.games.getGames({
//       ...params,
//       group_id: "22",
//     }),
//     await api.promotions.promotionsList(),
//   ]);
//   //   await api.games.getGames({
//   //     ...params,
//   //     group_id: "21",
//   //   }),
//   return {
//     promotions,
//     popular,
//     bonus,
//     banners,
//   };
//   // live,
// }) satisfies PageLoad;

// // export const ssr = true;
