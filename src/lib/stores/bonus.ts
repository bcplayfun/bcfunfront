import { writable } from "svelte/store";

export const bonusBalance = writable<any>({});
export const bonusChangeEvent = writable<boolean>(false);
