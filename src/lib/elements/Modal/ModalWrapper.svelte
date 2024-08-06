<script lang="ts">
  import getModalLayout from "./ModalTypes";
  import type { StoredModal } from "./store";

  export let modal: StoredModal;
</script>

<svelte:component this={getModalLayout(modal?.type || "new")} {modal}>
  <slot />
</svelte:component>
