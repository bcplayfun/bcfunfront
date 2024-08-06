import api from "$lib/api";
import { favoriteGames } from "$lib/stores/games";
// import type { Game } from "$lib/types/games";
import { get } from "svelte/store";
import Default from "./Default.svelte";
import Big from "./Big.svelte";
import Wide from "./Wide.svelte";
import Mini from "./Mini.svelte";

export const gameTypeToComponent = {
  default: Default,
  big: Big,
  wide: Wide,
  mini: Mini,
};

export { default } from "./Item.svelte";

export async function toggleFavorite(game: any) {
  const isFavorite = get(favoriteGames).games.find((g) => g.id === game.id);

  if (isFavorite) {
    favoriteGames.update((gamesWithCount) => {
      return {
        count: gamesWithCount.count - 1,
        games: gamesWithCount.games.filter((g) => g.id !== game.id),
      };
    });
    const [_, err] = await api.players.removeFavoriteGame(game.id);
    if (err) {
      favoriteGames.update((gamesWithCount) => ({
        count: gamesWithCount.count + 1,
        games: [...gamesWithCount.games, game],
      }));
    }
  } else {
    favoriteGames.update((gamesWithCount) => ({
      count: gamesWithCount.count + 1,
      games: [...gamesWithCount.games, game],
    }));
    const [_, err] = await api.players.addFavoriteGame(game.id);
    if (err) {
      favoriteGames.update((gamesWithCount) => ({
        count: gamesWithCount.count - 1,
        games: gamesWithCount.games.filter((g) => g.id !== game.id),
      }));
    }
  }
}

export function modifyName(name: string | undefined) {
  if (name && name.includes("Mobile")) {
    name = name.split(" Mobile")[0];
  }
  return name || "";
}
