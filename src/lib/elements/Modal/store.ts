import type { SvelteComponentTyped } from "svelte";

import { writable } from "svelte/store";

export const exitBeforeEnter = writable(false);
export const transitioning = writable<boolean | null>(null);
export const modals = writable<StoredModal[]>([]);
export const action = writable<null | "push" | "pop">(null);

export type StoredModal = {
  component: SvelteModalComponent<any> | LazySvelteModalComponent<any>;
  props?: Record<string, unknown>;
  callbacks?: {
    onBeforeClose?: () => boolean | void;
  };
  type?: ModalType;
  title?: string;
};

export type SvelteModalComponent<
  Props extends Record<string, any> = any,
  Events extends Record<string, any> = any,
  Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponentTyped<Props, Events, Slots>;

export type LazySvelteModalComponent<
  Props extends Record<string, any> = any,
  Events extends Record<string, any> = any,
  Slots extends Record<string, any> = any
> = () => Promise<{ default: SvelteModalComponent<Props, Events, Slots> }>;

export type ModalType =
  | "default"
  | "full-screen"
  | "bottom-up"
  | "right"
  | "sign-up"
  | "blank"
  | "new"
  | "promotion";
