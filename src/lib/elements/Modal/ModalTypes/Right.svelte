<script lang="ts">
  import type { StoredModal } from "../store";
  import Button from "$lib/elements/Button";
  import * as assets from "../assets";
  import { closeModal } from "..";

  export let modal: StoredModal;
</script>

<div class="modal-right">
  <div class="header">
    <div class="title">{modal.title}</div>
    <Button on:click={closeModal} round background="brand-secondary">
      <img src={assets.close_icon} alt="Close" />
    </Button>
  </div>
  <slot />
</div>

<style lang="scss">
  .modal-right {
    position: fixed;
    background-color: var(--dialog-background-color);
    z-index: 1000000;

    max-height: 100%;
    height: 100%;
    min-width: 520px;
    max-width: 520px;
    right: 0;
    top: 0;
    border-radius: 0;

    @media (max-width: 992px) {
      min-width: 100%;
      max-width: 100%;
    }
  }

  .header {
    height: 60px;
    border-bottom: 1px solid rgba(58, 59, 60, 0.2);
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-weight: 600;
    }
  }
</style>
