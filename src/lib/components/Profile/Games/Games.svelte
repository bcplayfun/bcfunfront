<script lang="ts">
  import Item from "$lib/components/Games/Item";
  import NotFound from "$lib/elements/NotFound/NotFound.svelte";
  import { favoriteGames } from "$lib/stores/games";

  let loading: boolean = false;
</script>

<div class="component-title">My games</div>
{#if $favoriteGames.games.length > 0}
  <div style:padding="5px">
    <div class="games games--expanded">
      {#each $favoriteGames.games as game}
        <Item {game} {loading} hasFavorite={true} />
      {/each}
    </div>
  </div>
{:else}
  <NotFound description={"no data"} />
{/if}

<style lang="scss">
  .games {
    flex: 1 0 0;
    overflow: auto;
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 5px 12px 5px 0;

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
