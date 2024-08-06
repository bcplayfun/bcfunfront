import type { Player } from "$lib/types/player";
import { writable } from "svelte/store";

export const vipPercent = writable(0);
export const vipTypes = writable<any>([]);

export function calculateProgress(player: Player, types: any) {
  if (player.level && Object.keys(player.level).length > 0 && types.length) {
    if (player.level.level_type_id === 5) {
      return 100;
    }
    let target = parseFloat(types[player.level.level_type_id].level_point);
    let amount = parseFloat(player.level.total_point);
    return (amount * 100) / target || 0;
  }
  return 0;
}
