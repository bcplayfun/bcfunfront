import Alert from "$lib/elements/Alert";
import axios from "$lib/network/axios";
import type {
  GamesQuery,
  GamesWithCount,
  LaunchGameResult,
  Game,
} from "$lib/types/games";
import { isClient } from "$lib/utils/page";

const EMPTY_GAMES: GamesWithCount = {
  games: [],
  count: 0,
};

function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export function objectToUrlSearchParams(
  obj: Record<any, any>
): URLSearchParams {
  const urlSearchParams = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (!val && key != "is_mobile") {
      urlSearchParams.delete(key);
    } else if (isArray(val)) {
      val.forEach((item) => {
        urlSearchParams.append(key, item);
      });
    } else {
      urlSearchParams.set(key, val);
    }
  });

  return urlSearchParams;
}

export default {
  async getGames(params: GamesQuery): Promise<[GamesWithCount, any?]> {
    if (isClient && window.innerWidth > 992) {
      params.is_mobile = 0; //desktop
    } else {
      params.is_mobile = 1; //mobile
    }
    const searchParams = objectToUrlSearchParams(params);
    try {
      const res = await axios.get("/game/list", {
        params: searchParams,
      });
      const gamesWithCount: GamesWithCount = res.data;

      if (!gamesWithCount) {
        // When games are empty, backend return null instead of empty object
        return [
          {
            count: 0,
            games: [],
          },
        ];
      } else {
        // const filteredGames = gamesWithCount.games.filter(
        //   (game) => !game
        // );
        // gamesWithCount.games = filteredGames;
        return [gamesWithCount];
      }
    } catch (error: any) {
      // Alert.error(error);
      return [EMPTY_GAMES, error];
    }
  },
  async getFavGames(params: GamesQuery): Promise<[GamesWithCount, any?]> {
    if (isClient && window.innerWidth > 992) {
      params.is_mobile = 0; //desktop
    } else {
      params.is_mobile = 1; //mobile
    }
    const searchParams = objectToUrlSearchParams(params);
    try {
      const res = await axios.get("/player/favorite/list?", {
        params: searchParams,
      });
      const gamesWithCount: GamesWithCount = !res?.data?.games
        ? false
        : res.data;
      if (!gamesWithCount) {
        // When games are empty, backend return null instead of empty object
        return [
          {
            count: 0,
            games: [],
          },
        ];
      } else {
        // const filteredGames = gamesWithCount.games.filter(
        //   (game) => !game
        // );
        // gamesWithCount.games = filteredGames;
        return [gamesWithCount];
      }
    } catch (error: any) {
      // Alert.error(error);
      return [EMPTY_GAMES, error];
    }
  },
  async launchGame(slug: string, params: any) {
    // : Promise<[LaunchGameResult | null, any?]>
    try {
      const url = `/game/init`;
      // if (isDemo) {
      //   const res = await axios.get(url, {
      //     params,
      //   });
      //   return [res.data.data];
      // } else {
      const res = await axios.post(url, { slug });
      return [res.data];
      // }
    } catch (error: any) {
      Alert.error(error.response.data.response);
      return [null, error];
    }
  },
};
