<script lang="ts">
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";

  import { Arrow } from "$lib/elements/Icons";
  import { tick } from "svelte";

  export let data: any[] = [];

  function onPagMount(e: any) {
    e.detail.data.list.classList.add("splide__pagination--banner");
  }
</script>

<div class="banner-slider">
  {#if data?.length}
    <Splide
      hasTrack={false}
      options={{
        rewind: true,
        drag: data.length == 1 ? false : true,
        arrows: data.length == 1 ? false : true,
        type: "loop",
        autoplay: true,
        interval: 10000,
      }}
      on:paginationMounted={(e) => {
        onPagMount(e);
      }}
    >
      <SplideTrack>
        {#each data as item}
          <SplideSlide>
            <slot name="item" {item} />
          </SplideSlide>
        {/each}
      </SplideTrack>
      <div class="splide__arrows">
        <button class="splide__arrow splide__arrow--prev">
          <Arrow width={15} height={15} />
        </button>
        <button class="splide__arrow splide__arrow--next">
          <Arrow width={15} height={15} direction="right" />
        </button>
      </div>
    </Splide>
  {/if}
</div>

<style lang="scss">
  :global(.splide__arrow svg) {
    fill: none;
  }
  .banner-slider {
    &:hover {
      .splide__arrow {
        opacity: 1;
      }
    }
    .splide__arrow {
      transition: 0.2s ease-in-out;
      opacity: 0;
    }
  }
  .splide__arrow {
    width: 30px;
    height: 50px;
    background: var(--layer-0);
    &:hover {
      filter: brightness(1.1);
    }
    &--prev {
      left: 0;
      border-radius: 0 4px 4px 0;
    }
    &--next {
      right: 0;
      border-radius: 8px 0 0 4px;
    }
  }
  :global(.splide__pagination--banner .splide__pagination__page) {
    width: 9px;
    height: 9px;
    opacity: 1;
    background: var(--layer-0);
    border: 1px solid white;
    border-radius: 2px;
  }
  :global(.splide__pagination--banner .splide__pagination__page.is-active) {
    border: 1px solid white;
    background: white;
  }
</style>
