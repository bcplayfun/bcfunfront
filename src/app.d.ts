// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onloaded?: () => void;
    onclick_outside?: () => void;
  }
}

namespace App {
  // interface Error {}
  interface Locals {
    loginStatus: boolean;
    headers: any;
  }
  // interface PageData {}
  // interface Platform {}
}
