<script lang="ts">
  import { onMount } from "svelte";
  import Item from "../Item";
  import api from "$lib/api";
  import { goto } from "$app/navigation";
  import { type Game, type GamesQuery, EMPTY_GAME } from "$lib/types/games";
  import GameSlider from "$lib/elements/GameSlider/GameSlider.svelte";

  export let type: "default" | "wide" | "big" | "mini" = "default";
  export let title: string = "";
  export let gameGroup: string = "";
  export let cols: number = 1;

  export let visibility = true;

  let games: Game[] = Array(18).fill(EMPTY_GAME);

  let loading: boolean = true;

  export let params: GamesQuery = {
    page: 1,
    limit: 60,
  };

  let groupGames: Game[][];
  let load = false;
  $: if (visibility && !load) {
    (async () => {
      params = { ...params, group_name: gameGroup };
      games = (await api.games.getGames(params))[0].games;

      loading = false;
      load = true;
    })();
  }

  $: if (cols == 2) {
    groupGames = games.reduce(
      (result: Game[][], currentObject: Game, index) => {
        if (index % 2 === 0) {
          // Start a new pair when the index is even
          result.push([currentObject]);
        } else {
          // Add the current object to the last pair when the index is odd
          result[result.length - 1].push(currentObject);
        }
        return result;
      },
      []
    );
  }
</script>

<div class="container mx-auto my-16">
  {#if cols == 2}
    <GameSlider data={groupGames} {title} cols={2}>
      <svelte:fragment slot="item1" let:item>
        <Item game={item} {type} {loading} />
      </svelte:fragment>
      <svelte:fragment slot="item2" let:item>
        <Item game={item} {type} {loading} />
      </svelte:fragment>
    </GameSlider>
  {:else}
    <GameSlider data={games} {title}>
      <svelte:fragment slot="item" let:item>
        <Item game={item} {type} {loading} />
      </svelte:fragment>
    </GameSlider>
  {/if}
</div>
