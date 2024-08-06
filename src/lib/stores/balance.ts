// import { player } from "$lib/stores/player";
// import type { Balance } from "$lib/types/player";
// import { currencies } from "$lib/stores/static";
// import type Currency from "$lib/types/currencies";
// import { derived, writable } from "svelte/store";

// export interface BalanceWithCurrency extends Balance {
//   currency: Currency;
// }

// export const BalancesWithCurrency = derived(
//   [player, currencies],
//   ([$player, $currencies]) => {
//     let _balances = $player.real_balances as Array<Balance>;
//     const activeCurrencyIds = $currencies.map((c) => c.id);
//     _balances = _balances
//       .filter((b) => activeCurrencyIds.includes(b.currency_id))
//       .map((b: Balance) => {
//         const currency = $currencies.find((c) => c.id === b.currency_id);
//         if (currency) {
//           b.currency = currency;
//         }
//         return b;
//       });

//     // if (!$player.is_our_member) {
//     // 	_balances = _balances.filter((balance) => ![41].includes(balance.currency_id));
//     // }

//     return _balances;
//   }
// );

// export const selectedBalanceWithCurrency = writable<Balance>();
