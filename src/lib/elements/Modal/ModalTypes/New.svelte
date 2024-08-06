<script lang="ts">
  import { closeModal } from "..";
  import * as assets from "../assets";
  import type { StoredModal } from "../store";

  export let modal: StoredModal;

  let height: number;
  let width: number;
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<div
  class="modal-new"
  style:max-height="{height - 80}px"
  class:country={modal.title === "Country Modal"}
  class:register={modal.title == "'Sign up'"}
>
  <div class="top d-flex items-center">
    <div class="title">{modal.title}</div>
    <button on:click={closeModal} class="close-button">
      <img src={assets.close_icon} alt="Close" />
    </button>
  </div>
  <slot />
</div>

<style lang="scss">
  .modal-new {
    background-color: var(--dialog-background-color);
    border-radius: 8px;
    width: fit-content;

    display: flex;
    flex-direction: column;
    max-width: 100%;
    min-width: 20%;
    height: auto;
    position: fixed;
    left: 50%;

    top: 70px;
    transform: translate(-50%, 0);

    z-index: 1000000;

    padding-bottom: 15px;

    &.register {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    &.country:before {
      content: "";
      position: absolute;
      width: 515px;
      height: 100%;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      pointer-events: none;
    }
    @include media.down(lg) {
      width: calc(100% - 32px);
      top: 40px;
      height: 100%;
      &.country:before {
        display: none;
      }
    }
  }
  .top {
    padding: 15px 15px 32px;
    position: relative;
    @include media.down(lg) {
      padding: 15px;
    }
  }
  .title {
    font-weight: 700;
    font-size: 22px;
    @include media.down(lg) {
      font-size: 20px;
    }
  }
  .close-button {
    background: var(--layer-0);
    width: 33px;
    height: 33px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 15px;
    top: 15px;
    transition: all 0.3s ease-in-out;

    @include media.down(lg) {
      right: 6px;
      top: 8px;
    }

    &:hover {
      transform: rotate(90deg);
      filter: brightness(1.1);
    }
  }
</style>
