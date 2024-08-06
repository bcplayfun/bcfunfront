export type Game = {
  uuid: string;
  slug: string;
  name: string;
  image: string;
  provider: string;
  id: number;
  is_mobile: number;
  has_freespins: number;
  has_lobby: number;
  has_tables: number;
  restrictions: unknown;
  favorite?: boolean;
  provider_id: number;
};

export type GamesWithCount = {
  games: Game[];
  count: number;
};

export type GamesQuery = {
  page?: number;
  limit?: number;
  provider_id?: string;
  group_name?: string;
  keyword?: string;
  is_mobile?: number;
};

export const EMPTY_GAME: Game = {
  uuid: "",
  slug: "",
  name: "",
  image: "",
  provider: "",
  id: 0,
  has_freespins: 0,
  has_lobby: 0,
  has_tables: 0,
  is_mobile: 0,
  restrictions: "",
  provider_id: 0,
};

export type GameItemType = "small" | "normal" | "large" | "separated";

export type LaunchGameResult = {
  game_id: number;
  game_name: string;
  game_ratio: string;
  launch_game: string;
  provider_name: string;
  game: Game;
};
