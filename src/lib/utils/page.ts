import { writable } from "svelte/store";

export const isClient = typeof window !== "undefined" ? true : false;

export const getLoggedIn = (cookies: any) => {
  if (cookies.get("auth")) {
    return true;
  } else {
    return false;
  }
};

export const langStore = writable<"en" | "pt">("en");
