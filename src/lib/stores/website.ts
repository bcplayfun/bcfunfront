import { writable, type Writable } from "svelte/store";

export const isAsideOpen: Writable<boolean> = writable(false);
export const asideMenuState = writable<"visible" | "extended" | "hidden">(
  "visible"
);
export const isBottomMenuVisible = writable(true);
export const isProfileVisible = writable(false);
