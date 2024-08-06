import type { Provider } from "$lib/types/provider";
import { writable } from "svelte/store";

export const providers = writable<Provider[]>([]);
