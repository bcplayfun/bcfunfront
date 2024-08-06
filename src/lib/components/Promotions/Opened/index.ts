import { EMPTY_PROMOTION, type Promotion } from "$lib/types/promotions";
import { writable } from "svelte/store";

export { default } from "./Opened.svelte";

export const promotionsStore = writable<Promotion[]>([
  EMPTY_PROMOTION,
  EMPTY_PROMOTION,
  EMPTY_PROMOTION,
  EMPTY_PROMOTION,
]);
