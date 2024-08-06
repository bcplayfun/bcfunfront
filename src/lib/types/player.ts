export type RegistrationForm = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};
// first_name: string;
//   last_name: string;
// phone_country: string;
// phone_code: string;
// phone_number: string;

export const EMPTY_REGISTRATION_FORM = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};
// first_name: "",
// last_name: "",
// phone_country: "",
// phone_code: "",
// phone_number: "",

export type LoginForm = {
  email?: string;
  username?: string;
  password: string;
};

export const EMPTY_LOGIN_FORM = {
  email: "",
  username: "",
  password: "",
};

export type Balance = {
  id: number;
  address: string | null;
  amount: string;
  currency_id: number;
  is_active: number;
  currency: Currency;
  last_deposit_amount: string;
};

export type Currency = {
  bonus_min_usable_amount: string;
  code: string;
  id: number;
  is_active: number;
  is_crypto: number;
  min_usable_amount: string;
  name: string;
  withdrawal_min_amount: string;
};

export type Player = {
  b_tag: any;
  real_balances: Balance[];
  birth_date: any;
  email: string;
  email_verified_at: any;
  first_name: any;
  g_auth_activated: any;
  g_auth_secret: any;
  gender: any;
  global_notification_seen: number;
  id: number;
  kyc_status: number;
  language: string;
  last_name: string;
  phone_code: any;
  phone_country: any;
  phone_number: any;
  selected_currency_id: any;
  selected_bonus_id: any;
  bonus_balance_status: any;
  terms_accepted: any;
  two_fa_activated: any;
  username: string;
  intercom_hash: string;
  successful_transactions_count: number;
  wheel_spin?: Wheel[] | null;
  level?: any;
};

type Wheel = {
  id: number;
  wheel_type_id: number;
  spin_date: string | null;
  total_tickets: number;
};

export type ChangePassword = {
  password: string;
  new_password: string;
  confirm_password: string;
};
