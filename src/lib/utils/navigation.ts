// // TODO: save every state to check if user canGoBack();
// import { browser } from "$app/environment";
// import { page } from "$app/stores";
// import { openModal } from "$lib/elements/Modal";
// import Login from "$lib/elements/Modals/Login/Login.svelte";
// import { isLoggedIn } from "$lib/stores/player";
// // import Login from '$lib/elements/Modal/Login/Login.svelte';
// // import { EMPTY_PAGE, type Page } from '$lib/types/page';
// import { get, writable, derived } from "svelte/store";
// // import { findPageByPath, optimovePageVisit } from './page';

// if (browser) {
//   window.onpopstate = () => {
//     currentPath.set(document.location.pathname);
//   };
// }

// export function goto(
//   url: string,
//   params = {
//     scrollTop: true,
//   }
// ) {
//   const { href, origin } = window.location;
//   const path = href.slice(origin.length);
//   if (url === path) {
//     return;
//   }

//   const _isLoggedIn: boolean = get(isLoggedIn);
//   //   const _page = get(page);

//   if ((url.startsWith("/user") || url.startsWith("/game")) && !_isLoggedIn) {
//     openModal(Login, "Log in", {
//       onSuccess() {
//         window.history.pushState({}, "", url);
//         currentPath.set(url);
//       },
//     });
//     return;
//   }

//   window.history.pushState({}, "", url);
//   currentPath.set(url);

//   if (params.scrollTop) {
//     window.scrollTo({ top: 0 });
//   }
// }

// export const currentPath = writable<string>("");
// // export const currentPageComponentsData = writable([]);
// export const currentPage = derived(currentPath, ($currentPath) => {
//   const pages = get(page).data.pages;
//   let returnPage = EMPTY_PAGE;

//   if (!resultPage) {
//     returnPage.layout = "Error";
//     return returnPage;
//   }

//   const _isLoggedIn: boolean = get(isLoggedIn);
//   returnPage = resultPage;

//   if (returnPage.expiration_date) {
//     const currentDate: Date = new Date();
//     const expirationDate: Date = new Date(returnPage.expiration_date);
//     if (expirationDate < currentDate) {
//       returnPage.layout = "Error";
//       return returnPage;
//     }
//   }

//   if (resultPage.requires_authorization && !_isLoggedIn) {
//     if (browser) {
//       goto(`/?loginRedirectTo=${window.location.pathname}`);
//     }
//     return findPageByPath("/", pages)[0];
//   }

//   if (browser) {
//     returnPage.searchParams = new URLSearchParams(window.location.search);

//     if (returnPage.searchParams.get("loginRedirectTo")) {
//       const savedUrl: string | null =
//         returnPage.searchParams.get("loginRedirectTo");
//       if (!savedUrl) {
//         return;
//       }
//       openModal(Login, "Log in", {
//         onSuccess() {
//           goto(savedUrl);
//         },
//       });
//     }
//   }
//   returnPage.params = params;
//   return returnPage;
// });
