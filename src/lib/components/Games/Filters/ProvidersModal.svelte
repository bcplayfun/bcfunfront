<script lang="ts">
  import type { Provider } from "$lib/types/provider";
  import { sortProviders } from "$lib/utils/providers";

  export let onChoose = (p: any) => {};
  export let providers: Provider[];
  export let selectedProviders: string = "";
  export let url: string;

  function chooseProvider(provider: Provider) {
    onChoose(provider);
  }
</script>

<div class="filter-container">
  <div class="list">
    {#each sortProviders(providers, url) as provider}
      <div
        class="list-item"
        on:click={() => chooseProvider(provider)}
        on:keydown={() => chooseProvider(provider)}
      >
        <div
          class="provider {selectedProviders == provider.id.toString() &&
            'active'}"
          style="background-image: url({provider?.file?.url});"
        />
        <!-- {provider.name} -->
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .filter-container {
    width: 700px;
    padding: 30px;
    max-width: 100%;
    overflow: auto;
    @media (max-width: 992px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      padding: 50px 15px;
    }
  }
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .provider {
    position: relative;
    display: block;
    height: 53px;
    padding: 10px;
    border-radius: 8px;
    background-color: var(--provider-tile-bg);
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out;
    &:hover,
    &.active {
      box-shadow: inset 0 0 0 1.5px var(--provider-tile-selected);
    }
  }
</style>
