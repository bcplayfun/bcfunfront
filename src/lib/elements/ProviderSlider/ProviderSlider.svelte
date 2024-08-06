<script lang="ts">
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

  import "@splidejs/svelte-splide/css";

  export let data: any[] = [];
  export let title: string = "";
</script>

<div class="banner-slider">
  <div class="head d-flex items-center justify-space-between">
    <div class="title">{title}</div>
  </div>
  {#if data?.length}
    <Splide
      hasTrack={false}
      extensions={{ AutoScroll }}
      options={{
        type: "loop",
        autoWidth: true,
        gap: "10px",
        drag: "free",
        snap: true,
        arrows: false,
        pagination: false,
        focus: 0,
        omitEnd: true,
        autoScroll: {
          speed: 0.2,
        },
      }}
    >
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
