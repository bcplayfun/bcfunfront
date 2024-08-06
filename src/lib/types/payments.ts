export type Payment = {
  image: string;
  title: string;
  type: string;
  fee: string;
  time: string;
  limit: string;
};

export type DepositCryptoTr = {
  address: string;
  amount: string;
  created_at: string;
  currency: string;
  fee_amount: string;
  id: number;
  is_payed: number;
  status: string;
  transaction_id: number;
  tx_id: string;
  type: string;
  updated_at: string;
};
