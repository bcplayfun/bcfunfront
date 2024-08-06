<script lang="ts">
  import { browser } from "$app/environment";
  import { isProfileVisible } from "$lib/stores/website";
  import { onMount } from "svelte";
  import { closeModal } from ".";
  import ModalWrapper from "./ModalWrapper.svelte";
  import { modals, exitBeforeEnter, transitioning } from "./store";

  $: if (browser && $modals.length > 0) {
    document.body.classList.add("unscrollable");
  } else if (browser && !$isProfileVisible) {
    document.body.classList.remove("unscrollable");
  }

  onMount(() => {
    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  });

  function closeOnEscape(e: any) {
    if (e.key === "Escape") closeModal();
  }
</script>

{#each $modals as modal, i (i)}
  <div
    role="dialog"
    class="dialog"
    style:z-index={999999 + i}
    style:position={"absolute"}
  >
    <div
      class="backdrop"
      style:background={`rgba(0, 0, 0, 0.${8 - i * 2})`}
      on:click={closeModal}
      on:keydown
    />
    <ModalWrapper {modal}>
      <svelte:component
        this={modal.component}
        {...modal.props}
        on:introstart={() => {
          $exitBeforeEnter = true;
        }}
        on:outroend={() => {
          $transitioning = false;
        }}
      />
    </ModalWrapper>
    <!-- {/if} -->
  </div>
{/each}

<style lang="scss">
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    /* z-index: 999999; */
  }
</style>
