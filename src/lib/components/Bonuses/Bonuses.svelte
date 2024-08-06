<script lang="ts">
  import BonusItem from "./BonusItem.svelte";
  import type { Bonus } from "$lib/types/bonuses";
  import { createEventDispatcher } from "svelte";
  import CircleLoading from "$lib/elements/Button/CircleLoading.svelte";
  import NotFound from "$lib/elements/NotFound/NotFound.svelte";

  const dispatch = createEventDispatcher();

  export let bonuses: Bonus[] = [];
  export let loading: boolean = false;
  export let history: boolean = false;
</script>

<div class="bonuses">
  <div class="body" class:history>
    {#if !loading}
      {#if bonuses.length}
        {#each bonuses as bonus}
          <BonusItem {bonus} on:refetch={() => dispatch("refetch")} />
          <!-- {bonusBalance} -->
        {/each}
      {:else}
        <NotFound description={"no data"} />
      {/if}
    {:else}
      <div class="loading">
        <CircleLoading size={"20px"} />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .bonuses {
    display: flex;
    flex-direction: column;
    .loading {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
    }
    .body {
      color: var(--text-color-primary);
      border-radius: 8px;
      &.history {
        opacity: 0.5;
      }
    }
  }
</style>
