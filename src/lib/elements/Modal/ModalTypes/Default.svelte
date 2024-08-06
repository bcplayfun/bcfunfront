<script lang="ts">
  import Button from "$lib/elements/Button/Button.svelte";
  import { closeModal } from "..";
  import * as assets from "../assets";
  import type { StoredModal } from "../store";

  export let modal: StoredModal;
</script>

<div class="modal-default">
  <div class="header">
    <div class="title">{modal.title}</div>
    <Button
      on:click={closeModal}
      round
      background="brand-secondary"
      size="small"
    >
      <img src={assets.close_icon} alt="Close" />
    </Button>
  </div>
  <slot />
</div>

<style lang="scss">
  .modal-default {
    border-radius: 15px;
    background-color: var(--dialog-background-color);
    max-width: 80%;
    min-width: 20%;
    max-height: 90vh;
    overflow-y: auto;
    height: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000000;

    @media (max-width: 992px) {
      min-width: 100%;
      min-height: 100%;
      border-radius: 0;
    }
  }
  .header {
    height: 60px;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
      padding: 0 15px;
    }
    .title {
      font-size: 20px;
      line-height: 24px;
      font-weight: 600;
    }
  }
</style>
