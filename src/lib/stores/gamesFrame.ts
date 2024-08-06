import { writable } from "svelte/store";

export type GameFrameType = {
  gameAlias?: string;
  state: "hidden" | "minimized" | "normal" | "fullscreen";
  groups: Array<string>;
};
export const gameFrameConfig = writable<GameFrameType>({
  state: "normal",
  groups: [],
});
