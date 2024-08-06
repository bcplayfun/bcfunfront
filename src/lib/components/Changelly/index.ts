import type { Currency } from "$lib/types/currencies";

export { default } from "./Changelly.svelte";

const currencyCodeToChangellyCode: Record<string, string> = {
  btc: "btc",
  eth: "eth",
  busd: "busdbsc",
  ltc: "ltc",
  usdtt: "usdtrx",
  usdt: "usdt20",
  matic: "maticpolygon",
};

const toAddresses = ["usdtrx"] as const;

type Config = {
  from: "*";
  to: string;
  amount: number;
  address: string;
  fromDefault: string;
  toDefault: string;
  merchant_id: string;
  payment_id: string;
  v: 3;
  type: "no-rev-share";
  color: "089ee1";
  headerId: 1;
  logo: "hide";
  buyButtonTextId: 2;
  readOnlyDestinationAddress: true;
};

const config: Config = {
  from: "*",
  to: "usdtrx",
  //   to: toAddresses.join("%2C"),
  amount: 150,
  address: "",
  fromDefault: "eur",
  toDefault: "usdtrx",
  merchant_id: "0LDGatu5fo_g0WYn",
  payment_id: "",
  v: 3,
  type: "no-rev-share",
  color: "089ee1",
  headerId: 1,

  logo: "hide",
  buyButtonTextId: 2,
  readOnlyDestinationAddress: true,
};

export function getConfig(address: string, currency: string): Config {
  let currencyCode = currencyCodeToChangellyCode?.[currency];
  if (!currencyCode) {
    currencyCode = currency;
  }

  return {
    ...config,
    address,
    toDefault: currencyCode,
    to: currencyCode,
  };
}

export function configToQuerystring(config: Config): string {
  return Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}
