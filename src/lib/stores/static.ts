import type { Balance } from "$lib/types/player";

import type { Currency } from "$lib/types/currencies";
import { derived, writable } from "svelte/store";

export const currencies = writable<Currency[]>([]);
export const selectedBalance = writable<Balance>();
export const currencyIdToCurrency = derived(currencies, ($currencies) =>
  $currencies?.reduce(
    (acc: any, curr: any) => ({ ...acc, [curr.id]: curr }),
    {} as Record<number, Currency>
  )
);
