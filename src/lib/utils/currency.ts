export const CONFIRMATIONS_LIMITS: any = {
  eur: {
    min_deposit: 5,
    min_withdrawal: 20,
  },
  usd: {
    min_deposit: 20,
    min_withdrawal: 50,
  },
  gbp: {
    min_deposit: 20,
    min_withdrawal: 100,
  },
  btc: {
    confirmations: 1,
    min_deposit: 0.0001,
    min_withdrawal: 0.001,
  },
  eth: {
    confirmations: 10,
    min_deposit: 0.01,
    min_withdrawal: 0.02,
  },
  ltc: {
    confirmations: 6,
    min_deposit: 0.01,
    min_withdrawal: 1,
  },
  usdc: {
    confirmations: 10,
    min_deposit: 10,
    min_withdrawal: 50,
  },
  usdte: {
    confirmations: 10,
    min_deposit: 5,
    min_withdrawal: 50,
  },
  usdtt: {
    confirmations: 19,
    min_deposit: 5,
    min_withdrawal: 50,
  },
  bch: {
    confirmations: 6,
    min_deposit: 0.001,
    min_withdrawal: 0.2,
  },
  doge: {
    confirmations: 6,
    min_deposit: 1,
    min_withdrawal: 500,
  },
  bnb: {
    confirmations: "Almost Instant",
    min_deposit: 0.01,
    min_withdrawal: 0.15,
  },
  busd: {
    confirmations: 25,
    min_deposit: 5,
    min_withdrawal: 50,
  },
  brl: {
    confirmations: 1,
    min_deposit: 1,
    min_withdrawal: 100,
  },
};

export function sortCurrencies(array: Array<any>, balance: any = null) {
  const sortOrder = [
    { code: "gbp", order: 1 },
    { code: "eur", order: 2 },
    { code: "btc", order: 3 },
    { code: "usdtt", order: 4 },
    { code: "eth", order: 5 },
    { code: "ltc", order: 6 },
    { code: "bnb", order: 7 },
    { code: "usdte", order: 8 },
    { code: "usdc", order: 9 },
    { code: "doge", order: 10 },
    { code: "bch", order: 11 },
    { code: "brl", order: 12 },
    { code: "usd", order: 13 },
  ];
  const sortedArray = array.slice().sort((a, b) => {
    if (balance && a.currency_id === balance?.currency_id) {
      return -1;
    }

    const aSortInfo = sortOrder.find(
      (item) => item.code === ("currency" in a ? a.currency.code : a.code)
    );
    const bSortInfo = sortOrder.find(
      (item) => item.code === ("currency" in b ? b.currency.code : b.code)
    );

    if (aSortInfo && bSortInfo) {
      return aSortInfo.order - bSortInfo.order;
    }

    return 0;
  });

  return sortedArray;
}
