<script lang="ts">
  import { type Game, type GamesQuery, EMPTY_GAME } from "$lib/types/games";
  import api from "$lib/api";
  import Item from "$lib/components/Games/Item";
  import { Search } from "$lib/elements/Icons";
  import { onMount } from "svelte";
  import NotFound from "$lib/elements/NotFound/NotFound.svelte";
  import CircleLoading from "$lib/elements/Button/CircleLoading.svelte";
  import Input from "$lib/elements/Input/Input.svelte";

  let type: "default" | "wide" | "big" | "mini" = "mini";

  let loading: boolean = true;
  let games: Game[] = [];
  let recentgames: Game[] = Array(8).fill(EMPTY_GAME);
  let params: GamesQuery = {
    page: 1,
    limit: 12,
    group_name: "search-featured",
  };

  let isFocus: boolean = false;

  onMount(async () => {
    recentgames = await getGames(params);
  });

  async function onInput(value: string) {
    if (value) {
      params = { page: 1, limit: 50 };
      params = { ...params, keyword: value };
      games = await getGames(params);
    } else {
      games = [];
    }
  }

  let value: string = "";

  let timer: ReturnType<typeof setTimeout>;
  const debounce = (event: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      value = event.target.value;
      onInput(value);
    }, 350);
  };

  async function getGames(params: GamesQuery): Promise<Game[]> {
    loading = true;
    let resGames = (await api.games.getGames(params))[0].games;
    loading = false;
    return resGames;
  }
</script>

<div class="search-container">
  <div class="search-wrapper {isFocus && 'focused'}">
    <div class="svg">
      <Search />
    </div>
    <Input
      on:focus={() => {
        isFocus = true;
      }}
      on:blur={() => {
        isFocus = false;
      }}
      on:input={(event) => debounce(event)}
      placeholder={"Search your favorite game"}
    />
  </div>
  {#if loading}
    <div class="loading">
      <CircleLoading size={"30px"} />
    </div>
  {:else if value.length}
    {#if games.length > 0}
      <div class="games-list">
        {#each games as item}
          <Item game={item} {type} loading={false} />
        {/each}
      </div>
    {:else}
      <NotFound description={"no data"} />
    {/if}
  {:else}
    <div class="title">Recommended for you:</div>
    <div class="games-list">
      {#each recentgames as item}
        <Item game={item} {type} loading={false} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .loading {
    margin: 0 auto;
    margin-top: 20px;
  }
  .search-container {
    width: 650px;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media (max-width: 992px) {
      flex: 1 0 0;
      width: 100%;
      gap: 15px;
    }
    @media (max-width: 768px) {
      gap: 10px;
    }
  }
  .search-wrapper {
    width: 100%;
    position: relative;
    padding: 5px 15px;
    .svg {
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
    }
    &.focused .search-input {
      box-shadow: inset 0 0 0 1.5px var(--provider-tile-selected);
    }
  }
  .search-input {
    height: 50px;
    min-width: 100%;
    border: 0;
    padding: var(--brand-padding-x);
    border-radius: 8px;
    background-color: var(--chip-bg-color);
    color: white;
    font-weight: 600;
    font-size: 14px;
    transition: 0.3s ease-in-out;
    @media (max-width: 768px) {
      padding: var(--brand-padding-x);
    }
    &::placeholder {
      font-weight: 500;
      color: var(--chip-text-color);
    }
  }
  .title {
    font-size: 26px;
    font-weight: 700;
    padding: var(--brand-padding-x);
    @media (max-width: 992px) {
      font-size: 22px;
    }
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
  .games-list {
    width: 100%;
    border-radius: 8px;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: var(--brand-padding-x);
    @media (max-width: 576px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
