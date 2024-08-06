<script lang="ts">
  import { gameTypeToComponent } from ".";
  import type { Game } from "$lib/types/games";

  export let type: "default" | "big" | "wide" | "mini" = "default";
  export let game: Game | null = null;
  export let loading: boolean = true;

  export let hasFavorite: boolean = false;
</script>

{#if !loading && game}
  <svelte:component this={gameTypeToComponent[type]} {game} {hasFavorite} />
{:else if type == "mini"}
  <div class="item {type}">
    <div class="image skeleton" />
    <div class="info">
      <div class="name skeleton" />
      <div class="provider skeleton" />
    </div>
  </div>
{:else}
  <div class="d-flex gap-4 flex-column items-center">
    <div class="item skeleton {type}" />
  </div>
{/if}

<style lang="scss">
  .skeleton {
    width: 160px;
    aspect-ratio: 1.267;
    border-radius: 8px;
    &.big {
      width: 220px;
    }
    &.wide {
      width: 290px;
    }
  }
  .name {
    color: transparent;
    height: 21px;
    background: var(--skeleton-color);
  }
  .mini {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 15px;
    &:last-of-type {
      margin-bottom: 0;
    }
    .image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .info {
      flex: 1 0 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
      .name {
        width: 100%;
        height: 21px;
      }
      .provider {
        width: 90%;
        height: 21px;
      }
    }
  }
</style>
