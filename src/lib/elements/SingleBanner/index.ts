export { default } from "./SingleBanner.svelte";

export type Pack = {
  id: number;
  name: string;
  key: string;
  bonus_id: number;
  currency?: string;
  min_deposit?: string;
  bonus_amount?: number;
  description?: string;
};

export const packs = [];
