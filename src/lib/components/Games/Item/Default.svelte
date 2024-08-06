<script lang="ts">
  import PlayButton from "./PlayButton.svelte";
  import Heart from "$lib/elements/Icons/Heart.svelte";
  import { modifyName, toggleFavorite } from ".";
  import api from "$lib/api";
  import { favoriteGames } from "$lib/stores/games";
  import Image from "$lib/elements/Image/Image.svelte";

  export let game: any | null = null;
  export let hasFavorite: boolean = false;

  async function toggle(game: any) {
    await toggleFavorite(game);
    api.games.getFavGames({ page: 1, limit: 100 }).then(([games]) => {
      favoriteGames.set(games);
    });
  }
</script>

<div class="wrap">
  <div class="item" title={game.name}>
    {#if hasFavorite}
      <div
        class="heart {hasFavorite && 'favorited'}"
        class:disabled={game?.id}
        on:click={() => {
          toggle(game);
        }}
        on:keydown
      >
        <Heart />
      </div>
    {/if}
    <Image url={game?.file?.url} name={game.name} />
    <a href="/game/{game.slug}" class="overlay">
      <div class="play-button">
        <PlayButton />
      </div>
    </a>
  </div>
  <p class="name no-translate" title={game.name}>
    {modifyName(game.name).length > 18
      ? modifyName(game.name).substring(0, 18) + "..."
      : modifyName(game.name)}
  </p>
</div>

<style lang="scss">
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .name {
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .item {
    position: relative;
    width: 160px;
    aspect-ratio: 1.49;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    user-select: none;
    transition: 0.2s ease-out;
    &:hover {
      & > .overlay {
        opacity: 1;
      }
    }
  }
  .overlay {
    transition: opacity 0.3s ease-in-out;
    width: 100%;
    height: 100%;
    background-color: rgba(36, 37, 38, 0.6);
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 8px;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .heart {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background-color: var(--layer-0);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
