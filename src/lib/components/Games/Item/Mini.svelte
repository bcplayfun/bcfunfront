<script lang="ts">
  import Arrow from "$lib/elements/Icons/Arrow.svelte";
  import Image from "$lib/elements/Image/Image.svelte";

  export let game: any | null = null;
  export let hasFavorite: boolean = false;
</script>

<a href="/game/{game.slug}" class="item" style:text-decoration="none">
  <div class="image">
    <Image url={game?.file?.url} name={game.name} />
  </div>
  <div class="info">
    <div class="name">{game.name}</div>
    <div class="provider no-translate">
      {game.provider}
    </div>
  </div>
  <Arrow direction="right" width={20} height={20} />
</a>

<style lang="scss">
  .item {
    position: relative;
    width: 100%;
    cursor: pointer;
    transition-property: box-shadow;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 15px;
    min-height: 73.8px;
    transition: box-shadow 0.3s ease-in-out;

    .image {
      border-radius: 8px;
      width: 80px;
    }
    &:hover {
      box-shadow: inset 0 0 0 1.5px var(--provider-tile-selected);
    }
    .info {
      flex: 1 0 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
      .name {
        font-size: 14px;
        font-weight: 600;
        color: white;
      }
      .provider {
        font-size: 12px;
        font-weight: 700;
        color: var(--search-vendor-color);
      }
    }
  }
</style>
