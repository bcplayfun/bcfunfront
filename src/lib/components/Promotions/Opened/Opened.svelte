<script lang="ts">
  import Button from "$lib/elements/Button/Button.svelte";
  import { closeModal, openModal } from "$lib/elements/Modal";
  import type { Promotion } from "$lib/types/promotions";
  import { goto } from "$app/navigation";
  import { isJsonString } from "$lib/utils/string";

  import { go } from "$lib/elements/Profile";
  import { promotionsStore } from ".";
  import { Arrow } from "$lib/elements/Icons";
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  import { close_icon } from "$lib/elements/Modal/assets";
  import { isLoggedIn } from "$lib/stores/player";
  import Register from "$lib/elements/Modals/Register";

  export let promotion: Promotion;

  let width: any;
  let height: any;

  function onPagMount(e: any) {
    e.detail.data.list.classList.add("splide__pagination--banner");
  }

  let mySlider: Splide;
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

{#if $promotionsStore?.length}
  <Splide
    bind:this={mySlider}
    hasTrack={false}
    options={{
      perPage: 1,
      type: "fade",
      start: $promotionsStore?.findIndex((p) => p.id === promotion.id),
    }}
    on:paginationMounted={(e) => {
      onPagMount(e);
    }}
  >
    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev splide__arrow--opened">
        <Arrow />
      </button>
      <button class="splide__arrow splide__arrow--next splide__arrow--opened">
        <Arrow direction="right" />
      </button>
    </div>
    <SplideTrack>
      {#each $promotionsStore as promotion}
        <SplideSlide>
          <div
            class="opened-promotion hide-scrollbar"
            style:width="{width - 32}px"
            style:max-height="{height - 90}px"
          >
            <img src={promotion.url} alt={promotion.title} class="banner" />
            <div
              class="wrapper"
              style:max-height={width > 992
                ? `${(width - 32 - 100 - 24) / 2}px`
                : `${height - 90}px`}
            >
              <button on:click={closeModal} class="close-button">
                <img src={close_icon} alt="Close" />
              </button>
              <div class="content hide-scrollbar">
                <p class="description">
                  {#if isJsonString(promotion.description)}
                    {@html JSON.parse(promotion.description)}
                  {:else}
                    {@html promotion.description}
                  {/if}
                </p>
              </div>
              {#if promotion?.action_url}
                <div class="bottom">
                  <Button
                    w100
                    size="large"
                    on:click={() => {
                      closeModal();
                      if (!$isLoggedIn) {
                        openModal(
                          Register,
                          "Sign up",
                          {
                            onSuccess: () => {
                              if (promotion.action_url?.startsWith("/")) {
                                goto(promotion.action_url);
                              } else {
                                go("dashboard", promotion.action_url);
                              }
                            },
                          },
                          { type: "new" }
                        );
                        return;
                      }
                      if (promotion.action_url?.startsWith("/")) {
                        goto(promotion.action_url);
                      } else {
                        go("dashboard", promotion.action_url);
                      }
                    }}
                  >
                    {!$isLoggedIn ? "Register now" : promotion.action_title}
                  </Button>
                </div>
              {/if}
            </div>
          </div>
        </SplideSlide>
      {/each}
    </SplideTrack>
  </Splide>
{/if}

<style lang="scss">
  .close-button {
    background: var(--dialog-background-color);
    width: 33px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 0.3s ease-in-out;
    z-index: 1;

    &:hover {
      transform: rotate(90deg);
      filter: brightness(1.1);
    }
  }
  :global(.splide__arrow--opened svg) {
    width: 28px;
    height: 28px;
  }
  :global(.splide__pagination) {
    bottom: -30px;
  }
  .splide__arrows {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    bottom: -22.5px;
  }
  .splide__arrow {
    background: transparent;
    transition: all 0.3s;
    color: white;
    top: initial;
    right: initial;
    left: initial;
    transform: none;
    user-select: none;
    // @media (max-width: 992px) {
    //   display: none;
    // }
    &:hover {
      border-color: white;
    }
    &:disabled {
      opacity: 0;
      pointer-events: none;
    }
    &--prev {
      left: -60px;
    }
    &--next {
      right: -60px;
    }
  }

  .opened-promotion {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 0 50px;
    overflow-y: auto;
    margin: 0 auto;
    max-width: 1450px;
    @media (max-width: 992px) {
      padding: 0 15px;
      display: flex;
      flex-direction: column;
    }
    @media (max-width: 768px) {
      padding: 0;
    }
    .banner {
      object-fit: cover;
      @media (max-width: 992px) {
        order: 1;
      }
    }
    .wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: var(--layer-0);
      @media (max-width: 992px) {
        order: 0;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      padding: 32px 32px 10px;
      overflow-y: auto;
      font-size: 15px;
      font-weight: 400;
      margin-bottom: auto;
      @media (max-width: 992px) {
        font-size: 14px;
        padding: 35px 15px 10px;
      }
      @media (max-width: 768px) {
        font-size: 12px;
        padding: 35px 10px 10px;
      }
    }
    .bottom {
      padding: 0 32px;
      margin: 10px 0 15px;
      @media (max-width: 992px) {
        padding: 0 15px;
        margin: 0;
      }
      @media (max-width: 768px) {
        padding: 10px;
      }
    }
  }
</style>
