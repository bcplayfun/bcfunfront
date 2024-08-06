import { get } from "svelte/store";
import {
  action,
  exitBeforeEnter,
  modals,
  transitioning,
  type LazySvelteModalComponent,
  type ModalType,
  type StoredModal,
  type SvelteModalComponent,
} from "./store";

export { default } from "./Modal.svelte";

export function openModal<Props extends Record<string, any> = any>(
  component:
    | SvelteModalComponent<Props, any, any>
    | LazySvelteModalComponent<Props, any, any>,
  title = "",
  props?: Props,
  options: {
    replace?: boolean;
    type: ModalType;
    callbacks?: {
      onBeforeClose: () => void;
    } | null;
  } = {
    type: "default",
    replace: false,
    callbacks: null,
  }
): void {
  if (get(transitioning)) {
    return;
  }

  action.set("push");

  if (get(exitBeforeEnter) && get(modals).length) {
    transitioning.set(true);
  }
  exitBeforeEnter.set(false);

  if (options?.replace) {
    modals.update(
      (prev) =>
        [
          ...prev.slice(0, prev.length - 1),
          {
            component,
            props,
            type: options.type,
            title,
            callbacks: options.callbacks,
          },
        ] as StoredModal[]
    );
  } else {
    modals.update(
      (prev) =>
        [
          ...prev,
          {
            component,
            props,
            type: options?.type,
            title,
            callbacks: options.callbacks,
          },
        ] as StoredModal[]
    );
  }
}

export function closeAllModals(): boolean {
  const modalsLength = get(modals).length;
  const currentModal = get(modals)[modalsLength - 1];

  if (currentModal?.callbacks?.onBeforeClose) {
    if (currentModal?.callbacks?.onBeforeClose() === false) {
      return false;
    }
  }

  modals.set([]);

  return true;
}

export function closeModals(amount = 1): boolean {
  const modalsLength = get(modals).length;
  const currentModal = get(modals)[modalsLength - 1];

  if (get(transitioning)) {
    return false;
  }

  if (currentModal?.callbacks?.onBeforeClose) {
    if (currentModal?.callbacks?.onBeforeClose() === false) {
      return false;
    }
  }

  if (get(exitBeforeEnter) && modalsLength > 0) {
    transitioning.set(true);
  }
  exitBeforeEnter.set(false);

  action.set("pop");

  pop(amount);

  return true;
}

export function closeModal(): boolean {
  return closeModals(1);
}

export function onBeforeClose(callback: () => boolean | void): void {
  modals.update((prev) => {
    const modal = prev[prev.length - 1];
    modal.callbacks = {
      ...modal.callbacks,
      onBeforeClose: callback,
    };

    return prev;
  });
}

function pop(amount = 1) {
  modals.update((prev) => prev.slice(0, Math.max(0, prev.length - amount)));
}
