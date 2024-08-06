<script lang="ts">
  import PlayButton from "./PlayButton.svelte";
  import { modifyName } from ".";
  import Image from "$lib/elements/Image/Image.svelte";

  export let game: any | null = null;
  export let hasFavorite: boolean = false;
</script>

<div class="wrap">
  <div class="item">
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
    width: 220px;
    aspect-ratio: 1.49;
    border-radius: 8px;
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
    transition: opacity 0.3s;
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
</style>
