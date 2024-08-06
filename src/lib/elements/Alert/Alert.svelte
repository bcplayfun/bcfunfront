<script lang="ts">
  import * as icons from "./assets";
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let type: "error" | "warning" | "success" = "success";
  export let dismissible = true;

  function onClose() {
    dispatch("dismiss");
  }
</script>

<article
  class={`alert ${type} gap-10`}
  role="alert"
  in:fly={{ y: 200, duration: 2000 }}
  out:fade={{ duration: 500 }}
>
  <div class="d-flex items-center gap-8">
    <div class={`type ${type}`}>
      <img src={icons[type]} alt={type} />
    </div>

    <div class="text">
      <slot />
    </div>
  </div>
  <!-- {#if dismissible}
    <div on:click={onClose} on:keydown={onClose} class="close">
      <img src={icons.close} alt="close" />
    </div>
  {/if} -->
</article>

<style lang="scss">
  .alert {
    position: relative;
    padding: 0.75rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-width: 300px;
    background-color: var(--panel-background-color-primary);
    box-shadow: 0px 12px 12px 0 rgba(0, 0, 0, 0.25);

    & .type {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    & .text {
      font-size: 14px;
      line-height: 24px;
      font-weight: 600;
    }
    & > .close {
      cursor: pointer;
    }
  }

  .success {
    color: var(--green);
  }
  .error {
    color: var(--red);
  }
  .warning {
    color: var(--yellow);
  }
</style>
