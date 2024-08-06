<script lang="ts">
  import NotFound from "$lib/elements/NotFound";
  import Item from "../Item/Item.svelte";
  import api from "$lib/api";
  import type { Game, GamesWithCount } from "$lib/types/games";
  import Filters, { filters, isFiltersCalculated } from "../Filters";
  import CircleLoading from "$lib/elements/Button/CircleLoading.svelte";

  export let type: "default" | "wide" | "big" | "mini" = "default";
  export let gameGroup: string = "";
  export let title: string = "";
  export let url = "slots";

  let loading: boolean = true;
  let data: GamesWithCount = {
    count: 0,
    games: [],
  };

  let existingGames: Game[] = [];

  let eachSlice: number = 1;
  let loadingLoadMore: boolean = false;
  let disableLoadMore: boolean = false;

  let clearExistingGames: boolean = true;

  $: if ($isFiltersCalculated) onFiltersUpdate($filters);
  async function onFiltersUpdate(newFilters: typeof $filters) {
    if (clearExistingGames) {
      loading = true;
      newFilters.page = 1;
      existingGames = [];
    }
    if (!newFilters.group_name) {
      newFilters.group_name = gameGroup;
    }
    if (newFilters.provider_id) {
      newFilters.group_name = "";
    }
    [data] = await api.games.getGames({
      ...newFilters,
    });
    existingGames = [...existingGames, ...data.games];
    checkLoadMore(data.count);
    loading = false;
    loadingLoadMore = false;
    clearExistingGames = true;
  }

  function loadMore() {
    loadingLoadMore = true;
    clearExistingGames = false;
    if (data.count > $filters.page! * eachSlice + eachSlice) {
      $filters.page = $filters.page! + eachSlice;
    } else {
      let rN = data.count - $filters.page!;
      $filters.page = $filters.page! + rN;
    }
  }
  function checkLoadMore(count: number) {
    if (count <= existingGames.length) {
      disableLoadMore = true;
    } else {
      loadingLoadMore = false;
      disableLoadMore = false;
    }
  }
</script>

<div class="container mx-auto">
  <div class="title">{title}</div>
  <div class="sticky">
    <Filters {url} />
  </div>
  <div class="games games--filtered">
    {#if loading}
      {#each Array(18) as _}
        <Item {type} loading={true} />
      {/each}
    {:else if existingGames.length > 0}
      {#each existingGames as game}
        <Item {game} {type} {loading} />
      {/each}
    {/if}
  </div>
  {#if !loading && existingGames.length == 0}
    <NotFound description={"no data"} />
  {/if}
</div>
{#if data.count}
  <div class={`load-more ${loadingLoadMore ? "loading" : ""}`}>
    <div class="counter">
      Displaying
      {existingGames.length}
      of
      {data.count}
      games
    </div>
    <div
      class={`${disableLoadMore ? "disabled" : ""} load-more--btn`}
      on:click={() => loadMore()}
      on:keydown={() => loadMore()}
    >
      {#if loadingLoadMore}
        <div class="d-flex">
          <CircleLoading color={"white"} size={"20px"} />
        </div>
      {:else}Load more{/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .sticky {
    position: sticky;
    top: 71px;
    z-index: 5;
    background-color: var(--layer-0);
    @media (max-width: 992px) {
      top: 56px;
      padding-top: 10px;
    }
  }
  .title {
    font-size: 24px;
    color: var(--white);
    font-weight: 700;
    margin: 10px 0;
  }
  .games {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;
    @media (max-width: 1280px) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .load-more {
    margin: 25px 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .counter {
      font-size: 14px;
      line-height: 15px;
      color: white;
      opacity: 0.9;
      margin-bottom: 13px;
    }
    &--btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 40px;
      font-size: 15px;
      font-weight: 600;
      color: white;
      background-color: transparent;
      border: 2px solid var(--brand-stroke);
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      &.disabled {
        display: none;
      }
      &:hover {
        background: var(--brand-primary);
        border-color: var(--brand-primary);
      }
    }
    &.loading {
      pointer-events: none;
    }
  }
</style>
