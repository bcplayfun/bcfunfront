import type { GamesQuery } from "$lib/types/games";
import { writable } from "svelte/store";
export { default } from "./Filters.svelte";

export const filters = writable<GamesQuery>({});
export const isFiltersCalculated = writable(false);

export type GameType = {
  title: string;
  key: string;
};

export const gameTypes: GameType[] = [
  {
    title: "New Slots",
    key: "new-slots",
  },
  {
    title: "Bonus buy",
    key: "bonus-buy",
  },
  {
    title: "Megaways",
    key: "megaways",
  },
  {
    title: "Free Spins",
    key: "freespins",
  },
  {
    title: "Book of Games",
    key: "book-of",
  },
  {
    title: "Bingo",
    key: "bingo",
  },
  {
    title: "Jackpots",
    key: "jackpots",
  },
  {
    title: "Scratchcards",
    key: "scratchcards",
  },
];

export const liveGameTypes: GameType[] = [
  {
    title: "New Live",
    key: "new-live",
  },
  {
    title: "Top Live",
    key: "top-live",
  },
  {
    title: "Blackjack",
    key: "blackjack",
  },
  {
    title: "roulette",
    key: "roulette",
  },
  {
    title: "baccarat",
    key: "baccarat",
  },
  {
    title: "Live poker",
    key: "poker",
  },
  {
    title: "Game Shows",
    key: "game-shows",
  },
];
