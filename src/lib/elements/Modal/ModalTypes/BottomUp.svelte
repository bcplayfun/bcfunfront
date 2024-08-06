<script lang="ts">
  import type { StoredModal } from "../store";
  import Button from "$lib/elements/Button";
  import * as assets from "../assets";
  import { closeModal } from "..";

  export let modal: StoredModal;
</script>

<div class="modal-bottom-up">
  <div class="header">
    <div class="title">{modal.title}</div>
    <Button round background="brand-secondary" on:click={closeModal}>
      <img src={assets.close_icon} alt="Close" />
    </Button>
  </div>
  <slot />
</div>

<style lang="scss">
  .modal-bottom-up {
    position: fixed;
    bottom: 0;
    background-color: var(--dialog-background-color);
    border-radius: 15px 15px 0 0;
    width: 100%;
    min-width: 20%;
    max-height: 90vh;
    overflow-y: auto;
    height: auto;
    left: 50%;

    transform: translate(-50%, 0);
    z-index: 1000000;
  }

  .header {
    height: 60px;
    border-bottom: 1px solid rgba(58, 59, 60, 0.2);
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 24px;
      font-weight: 700;
    }
  }
</style>
