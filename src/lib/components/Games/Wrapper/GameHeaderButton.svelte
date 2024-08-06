<script lang="ts">
  import { gameFrameConfig } from "$lib/stores/gamesFrame";

  export let icon: any = null;
  export let label: string;
  export let isClose: boolean = false;
</script>

<div class="game-tooltip" class:isClose on:click on:keydown>
  {#if $$slots?.default}
    <slot />
  {:else}
    <img
      src={icon}
      alt={label}
      width={isClose ? 18 : 20}
      height={isClose ? 18 : 20}
    />
  {/if}
  <div
    class={`text ${$gameFrameConfig.state === "minimized" ? "top" : ""}`}
    class:close={isClose}
  >
    {label}
  </div>
</div>

<style lang="scss">
  .game-tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;

    &.isClose {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      background-color: rgba(231, 47, 53, 0.2);
      border-radius: 8px;
    }

    .text {
      transition: all 0.3s;
      visibility: hidden;
      opacity: 0;
      top: 40px;
      background-color: white;
      color: black;
      height: 32px;
      border-radius: 8px;
      padding: 0 10px;
      font-weight: 600;
      font-size: 12px;
      white-space: nowrap;
      /* Position the tooltip */
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;

      &::after {
        content: "";
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent white transparent;

        &.top {
          top: 10px;
          border-color: white transparent transparent transparent;
        }
      }
      &.close {
        right: -10px;
        left: initial;
        transform: none;

        &:after {
          left: initial;
          transform: none;
          right: 19px;
        }
      }
      &.top {
        top: -50px;

        &::after {
          top: 32px;
          border-color: white transparent transparent transparent;
        }
      }
    }
    &:hover {
      .text {
        visibility: visible;
        opacity: 1;
      }
    }
  }
</style>
