<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/elements/Button";
  import { breakpoints } from "$lib/utils/constants";
  import Image from "$lib/elements/Image/Image.svelte";
  import { browser } from "$app/environment";
  import { isLoggedIn } from "$lib/stores/player";
  import Register from "$lib/elements/Modals/Register";
  import { openModal } from "$lib/elements/Modal";
  import { go } from "$lib/elements/Profile";

  export let banner: any = {};
  export let loading: boolean = false;

  let isMobile = browser ? window.innerWidth < breakpoints.md : false;
</script>

{#if !loading}
  <div class="banner">
    <div class="foreground">
      {#if isMobile}
        <Image url={banner.img_mobile} />
      {:else}
        <Image url={banner.img} />
      {/if}
    </div>
    <div class="background">
      {#if isMobile}
        <Image url={banner.front_img_mobile} />
      {:else}
        <Image url={banner.front_img} />
      {/if}
    </div>
    <div class="info">
      <h2 class="title">
        {@html banner.title}
      </h2>
      {#if banner?.description?.length}
        <p class="description">
          {@html banner.description}
        </p>
      {/if}
      {#if banner?.action_url?.length}
        <Button
          background="tWhite"
          transform="uppercase"
          on:click={() => {
            if (!$isLoggedIn) {
              openModal(Register, "'Sign up'", {}, { type: "new" });
              return;
            }
            if (banner?.action_url.startsWith("/")) {
              goto(banner.action_url);
            } else {
              go("dashboard", banner.action_url);
            }
          }}
        >
          {banner.action_label}
        </Button>
      {/if}
    </div>
  </div>
{:else}
  <div class="banner skeleton" />
{/if}

<style lang="scss">
  .banner {
    z-index: 1;
    position: relative;
    height: 395px;
    margin: 0 auto;
    max-width: 100%;
    border-radius: 8px;
    overflow: hidden;
    will-change: transform;
    background: var(--layer-0);

    .foreground,
    .background {
      position: absolute;
      height: 100%;
      border-radius: 18px;
    }
    .foreground {
      right: -10px;
      left: -10px;
      animation: moveFront linear 15s infinite;
      animation-play-state: paused;
    }
    .background {
      right: -10px;
      left: -10px;
      animation: moveBg linear 15s infinite;
      animation-play-state: paused;
    }
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 8px;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(255, 255, 255, 0) 70%
      );
      @include media.down(md) {
        background: linear-gradient(
          360deg,
          rgba(0, 0, 0, 0.9) 0%,
          rgba(255, 255, 255, 0) 80%
        );
      }
    }
    .info {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      top: 50%;
      transform: translateY(-50%);
      left: 80px;
      z-index: 1;
      gap: 10px;
      @media (max-width: 992px) {
        align-items: center;
        left: 50%;
        top: inherit;
        bottom: 40px;
        transform: translateX(-50%);
        width: 100%;
        padding: 0 15px;
        &.title {
          top: 80px;
        }
      }
      .title {
        font-size: 22px;
        font-weight: 700;
        max-width: 450px;
        @media (max-width: 992px) {
          font-size: 20px;
          max-width: initial;
          text-align: center;
          line-height: 24px;
        }
      }
      .description {
        font-size: 18px;
        font-weight: 500;
        margin: 0 0 5px;
        @media (max-width: 992px) {
          text-align: center;
          font-size: 14px;
          /* margin: 0 0 10px; */
        }
      }
    }
  }

  @keyframes moveFront {
    0% {
      transform: translateZ(0) rotate(0.0001deg);
    }
    25% {
      transform: translate3d(10px, 0, 0) rotate(0.0001deg);
    }
    50% {
      transform: translateZ(0) rotate(0.0001deg);
    }
    75% {
      transform: translate3d(-10px, 0, 0) rotate(0.0001deg);
    }
    100% {
      transform: translateZ(0) rotate(0.0001deg);
    }
  }
  @keyframes moveBg {
    0% {
      transform: translateZ(0) rotate(0.0001deg);
    }
    25% {
      transform: translate3d(-10px, 0, 0) rotate(0.0001deg);
    }
    50% {
      transform: translateZ(0) rotate(0.0001deg);
    }
    75% {
      transform: translate3d(10px, 0, 0) rotate(0.0001deg);
    }
    100% {
      transform: translateZ(0) rotate(0.0001deg);
    }
  }
</style>
