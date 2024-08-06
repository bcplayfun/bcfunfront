import type { GamesWithCount } from "$lib/types/games";
import { writable } from "svelte/store";

export const favoriteGames = writable<GamesWithCount>({
  count: 0,
  games: [],
});
