type Type = {
  bonus_percentage: number;
  created_at: string | null;
  description: string;
  family_id: number;
  group_id: number;
  id: number;
  max_bet: string;
  max_deposit: string;
  max_withdrawal: string;
  min_deposit: string;
  name: any;
  updated_at: string | null;
  wager_amount: string;
  currency_id: number;
  bet_amount: number;
  game?: any;
};

export type Bonus = {
  id: number;
  type: Type;
  bonus_type_id: number;
  deposit_status: number;
  free_spin_status: number;
  ggr_counter: number;
  wager_status: number;
  player_id: number;
  real_status: number;
  comment: string;
  activated_at: string | null;
  available_at: string | null;
  canceled_at: string | null;
  completed_at: string | null;
  created_at: string | null;
  expired_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  freespin: Freespin | null;
  bonus_balance: BonusBalance | null;
};

export type BonusBalance = {
  wager_bet: string;
  wager_amount: string;
  amount: string;
  balance_amount: string;
  target_wager_amount: string;
  bonus_id: number;
  bonus_type_id: number;
  currency_id: number;
  id: number;
  is_frozen_by_funds_available: number;
  is_frozen_by_sport: number;
  player_id: number;
  created_at: string;
  expires_at: string;
  updated_at: string;
  activated_at: string;
};

export type Freespin = {
  quantity: number;
  valid_from: string;
  valid_until: string;
  bet_amount: string;
  updated_at: string;
  currency: string;
  receive_currency: number;
  game: { slug: string; name: string };
};
