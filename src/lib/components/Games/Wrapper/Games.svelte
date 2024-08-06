<script lang="ts">
  import api from "$lib/api";
  import { onMount } from "svelte";
  import type { Game, GamesQuery, LaunchGameResult } from "$lib/types/games";

  import Item from "$lib/components/Games/Item";
  import { goto } from "$app/navigation";
  import { closeModal, closeModals } from "$lib/elements/Modal";

  export let launchGameResult: LaunchGameResult;
  let type: "default" | "wide" | "big" | "mini" = "default";
  let loading = false;
  let games: Game[];
  let params: GamesQuery = {
    page: 1,
    limit: 50,
    group_name: "popular",
  };
  onMount(async () => {
    loading = true;
    const [lData] = await api.players.lastPlayedGames();
    const [data] = await api.games.getGames(params);
    const allGames = [...lData, ...data.games];
    games = [...new Set(allGames.map((game) => game.id))].map((id) =>
      allGames.find((game) => game.id === id)
    );
    loading = false;
  });
</script>

<div class="games games--expanded py-16">
  {#if loading}
    {#each Array(20) as _}
      <Item {type} loading={true} />
    {/each}
  {:else if games?.length > 0}
    {#each games.filter((game) => game.id !== launchGameResult?.game_id) as game}
      <Item {game} {type} {loading} />
    {/each}
  {/if}
</div>

<style lang="scss">
  .games {
    width: 900px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;
    padding: var(--brand-padding-x);
    overflow: auto;
    @media (max-width: 1280px) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 992px) {
      width: 100%;
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
