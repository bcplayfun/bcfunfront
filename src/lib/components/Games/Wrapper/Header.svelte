<script lang="ts">
  import { gameFrameConfig } from "$lib/stores/gamesFrame";
  import { createEventDispatcher } from "svelte";
  import assets from "./assets";
  import GameHeaderButton from "./GameHeaderButton.svelte";
  import type { LaunchGameResult } from "$lib/types/games";
  import { aliasToTitle, exitFullScreen } from ".";
  import { toggleFavorite } from "../Item";
  import { favoriteGames } from "$lib/stores/games";
  import Games from "./assets/Games.svelte";
  import third_parties from "$lib/third_parties";
  import api from "$lib/api";
  import Heart from "$lib/elements/Icons/Heart.svelte";
  import { openModal } from "$lib/elements/Modal";
  import GamesBlock from "./Games.svelte";
  import { goto } from "$app/navigation";

  const dispatch = createEventDispatcher();

  export let launchGameResult: LaunchGameResult;
  export let isFull: boolean;

  $: isFavorite = $favoriteGames.games.find(
    (g) => g.id === launchGameResult?.game?.id
  );
  function backToHomePage() {
    $gameFrameConfig.state = "hidden";
    goto("/");

    // history.go(-1);
  }

  async function toggle(game: any) {
    await toggleFavorite(game);
    api.games.getFavGames({ page: 1, limit: 100 }).then(([games]) => {
      favoriteGames.set(games);
    });
  }

  let isOpen = false;
  async function openChat() {
    if (isOpen) {
      third_parties.intercom.setLauncherVisible(false);
      third_parties.intercom.hideChat();
    } else {
      third_parties.intercom.setLauncherVisible(true);
      third_parties.intercom.openChat();
    }
    isOpen = !isOpen;
  }

  function openGames() {
    openModal(
      GamesBlock,
      "Last played & popular games",
      { launchGameResult: launchGameResult },
      { type: "new" }
    );
  }
</script>

<div class="game-header justify-space-between">
  <div class="text-18 weight-600 d-flex items-center gap-10">
    {$gameFrameConfig.gameAlias && aliasToTitle($gameFrameConfig.gameAlias)}
  </div>
  <div class="d-flex items-center gap-14">
    <GameHeaderButton label={"For you"}>
      <div on:click={() => openGames()} on:keydown>
        <Games fill="white" />
      </div>
    </GameHeaderButton>
    <GameHeaderButton label={isFavorite ? "Remove" : "Add"}>
      <div
        class="heart {isFavorite && 'favorited'}"
        class:disabled={!launchGameResult?.game?.id}
        on:click={() => {
          toggle(launchGameResult.game);
        }}
        on:keydown
      >
        <Heart />
      </div>
    </GameHeaderButton>
    <GameHeaderButton
      on:click={() => dispatch("openFullScreen")}
      icon={assets.toggle}
      label={isFull ? "Minimize" : "Maximize"}
    />
    <GameHeaderButton
      icon={assets.close}
      label="Close game"
      isClose={true}
      on:click={() => {
        backToHomePage();
      }}
    />
  </div>
</div>

<style lang="scss">
  .game-header {
    border-radius: 8px 4px 0 0;
    height: 52px;
    background-color: var(--cp-grey-dark-2);
    display: flex;
    align-items: center;
    padding: 0 15px;

    @include media.down(lg) {
      display: none;
    }
  }

  .skeleton {
    border-radius: 50%;
    & > * {
      opacity: 0.5;
    }
  }
  .heart.disabled {
    pointer-events: none;
  }
</style>
