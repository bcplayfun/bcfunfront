import { page } from "$app/stores";
import api from "$lib/api";
import { gameFrameConfig } from "$lib/stores/gamesFrame";

import { derived } from "svelte/store";

export { default } from "./Wrapper.svelte";

export const isGameWrapperVisible = derived(
  [page, gameFrameConfig],
  ([$page, $gameFrameConfig]) => {
    const validUrl = `/game/`;
    return (
      $page.url.pathname.includes(validUrl) ||
      $gameFrameConfig.state === "minimized"
    );
  }
);

export async function launchGame(slug: string, isMobile: boolean) {
  const params = {
    is_mobile: isMobile,
  } as any;

  // const [, canLaunchGameError] = await api.games.canLaunchGame(
  //   alias,
  //   params,
  //   isDemo
  // );

  // if (canLaunchGameError) {
  //   console.error("launch game error", canLaunchGameError);
  //   return [null, canLaunchGameError];
  // }

  const [game, _] = await api.games.launchGame(slug, params);
  const launchGameResult = [
    {
      launch_game: game?.url,
      provider_name: game?.game?.provider_name,
      game_id: game?.game?.id,
      game_name: game?.game?.name,
      game_ratio: "",
      game: game?.game,
    },
  ];

  return [launchGameResult];
  // if (!error) {
  //   return [launchGameResult];
  // } else {
  //   return [null, "error"];
  // }
}

export function openFullScreen(element: any) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
}

export function exitFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

export function aliasToTitle(alias: string): string {
  let title: string = "";
  if (alias) {
    if (alias.includes("-mobile")) {
      alias = alias.split("-mobile")[0];
    }
    let arr: Array<string> = alias.split("-");
    arr.forEach((word: string) => {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      title += word + " ";
    });
  }
  return title;
}
