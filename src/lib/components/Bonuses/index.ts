export { default } from "./Bonuses.svelte";

import { player } from "$lib/stores/player";
import type { Bonus, Freespin } from "$lib/types/bonuses";
import dayjs from "dayjs";
import { get } from "svelte/store";

export function generateState(bonus: Bonus): string {
  const playerD = get(player);
  const now = dayjs();
  let diff = now.diff(dayjs(bonus.created_at).add(7, "day"));
  if (bonus.canceled_at) {
    return "canceled";
  }
  if (bonus.completed_at) {
    return "completed";
  }
  if (diff > 0) {
    return "expired";
  }
  if (
    bonus.free_spin_status &&
    !playerD.bonus_balance_status &&
    bonus.deposit_status
  ) {
    return "freespin";
  } else if (
    bonus.free_spin_status &&
    playerD.bonus_balance_status &&
    bonus.deposit_status
  ) {
    return "wager";
  }
  if (bonus.deposit_status) {
    return "wager";
  }
  if (bonus.activated_at) {
    return "deposit";
  }
  if (!bonus.activated_at) {
    return "activate";
  }
  return "";
}

export function getFreespinUntilDate(
  freespin: Freespin | null,
  key: string
): string {
  let unixTimestamp;
  if (key === "from") {
    unixTimestamp = parseInt(freespin?.valid_from!);
  } else {
    unixTimestamp = parseInt(freespin?.valid_until!);
  }
  if (unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    return formattedDate;
  } else {
    return "";
  }
}
