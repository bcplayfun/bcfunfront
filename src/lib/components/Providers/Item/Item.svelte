<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Provider } from "$lib/types/provider";

  export let provider: Provider;
</script>

{#if provider?.file?.url}
  <div
    class="provider"
    style="background-image: url({provider?.file?.url});"
    on:click={() => goto(`/slots?limit=57&page=1&provider_id=${provider.id}`)}
    on:keydown
  />
{:else}
  <div class="provider skeleton" />
{/if}

<style lang="scss">
  .provider {
    display: flex;
    width: 150px;
    height: 74px;
    border-radius: 8px;
    background-color: var(--provider-tile-bg);
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    transition-duration: 0.3s;
    transition-property: box-shadow;
    transition-timing-function: ease-in-out;
    cursor: pointer;
    &:hover {
      box-shadow: inset 0 0 0 2px var(--provider-tile-selected);
    }
  }
</style>
