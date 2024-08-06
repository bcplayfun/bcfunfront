import type { Player } from "$lib/types/player";
import { writable, type Writable } from "svelte/store";

export const isLoggedIn: Writable<boolean> = writable(false);

const EMPTY_PLAYER = {
  b_tag: null,
  real_balances: [],
  birth_date: null,
  email: "",
  email_verified_at: null,
  first_name: "",
  g_auth_activated: 0,
  g_auth_secret: null,
  gender: "",
  global_notification_seen: 0,
  id: 0,
  kyc_status: 0,
  language: "en",
  last_name: "",
  phone_code: null,
  phone_country: null,
  phone_number: null,
  selected_currency_id: 0,
  selected_bonus_id: 0,
  terms_accepted: 0,
  two_fa_activated: 0,
  username: "",
  bonus_balance_status: 0,
  intercom_hash: "",
  successful_transactions_count: 0,
};

// is_vip: false,
// is_affiliate: false,
// is_our_member: false,
// is_streamer: false,

export const player = writable<Player>({
  ...EMPTY_PLAYER,
});

export const clearPlayer = () => {
  player.update(() => {
    return { ...EMPTY_PLAYER };
  });
};

export const cfIpCountry = writable<any>();
