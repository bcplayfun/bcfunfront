<script lang="ts">
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";

  import "@splidejs/svelte-splide/css";

  import Arrow from "../Icons/Arrow.svelte";

  export let data: any[] = [];
  export let title: string = "Promos";
</script>

<div class="banner-slider">
  <div class="head d-flex items-center justify-space-between">
    <div class="title">{title}</div>
  </div>
  {#if data?.length}
    <Splide
      hasTrack={false}
      options={{
        autoWidth: true,
        gap: "10px",
        drag: "free",
        snap: true,
        arrows: false,
        pagination: false,
        focus: 0,
        omitEnd: true,
      }}
    >
      <div class="splide__arrows">
        <button class="splide__arrow splide__arrow--prev">
          <Arrow width={15} height={15} />
        </button>
        <button class="splide__arrow splide__arrow--next">
          <Arrow width={15} height={15} direction="right" />
        </button>
      </div>
      <SplideTrack>
        {#each data as item}
          <SplideSlide>
            <slot name="item" {item} />
          </SplideSlide>
        {/each}
      </SplideTrack>
    </Splide>
  {/if}
</div>

<style lang="scss">
  :global(.splide__arrow svg) {
    fill: none;
  }
  .splide__arrow {
    width: 40px;
    height: 40px;
    top: -40px;
    background: transparent;
    border: 2px solid var(--brand-stroke);
    border-radius: 8px;
    transition: all 0.3s;
    @media (max-width: 992px) {
      display: none;
    }
    &:hover {
      border-color: white;
    }
    &:disabled {
      opacity: 0.2;
      pointer-events: none;
    }
    &--prev {
      left: initial;
      right: 158px;
    }
    &--next {
      right: 110px;
    }
  }
  .head {
    margin-bottom: 20px;
    & > .title {
      font-size: 22px;
      line-height: 28px;
      font-weight: 700;
      color: white;
      @media (max-width: 1440px) {
        font-size: 18px;
        line-height: 24px;
      }
    }
  }
</style>
