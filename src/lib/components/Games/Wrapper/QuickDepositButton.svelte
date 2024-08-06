<script context="module" lang="ts">
  import { writable } from "svelte/store";

  export const isQuickDepositButtonMoving = writable(false);
</script>

<script lang="ts">
  import Button from "$lib/elements/Button";
  import assets from "./assets";

  import { draggable } from "@neodrag/svelte";
  import { sineIn } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { goto } from "$app/navigation";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { isClient } from "$lib/utils/page";
  import SearchModal from "$lib/elements/Modals/Search";
  import { openModal } from "$lib/elements/Modal";
  import clickOutside from "$lib/utils/clickOutside";
  import type { LaunchGameResult } from "$lib/types/games";

  import { exitFullScreen, openFullScreen } from ".";
  import { go } from "$lib/elements/Profile";
  import { Heart } from "$lib/elements/Icons";
  import { favoriteGames } from "$lib/stores/games";
  import { toggleFavorite } from "../Item";
  import api from "$lib/api";

  const dispatch = createEventDispatcher();

  let WIDTH = window.innerWidth;
  let HEIGHT = window.innerHeight;
  const BUTTON_SIZE = 56;
  let DEFAULT_X = WIDTH / 2 - BUTTON_SIZE / 2;
  let DEFAULT_Y = 100;

  let x = tweened(DEFAULT_X, { easing: sineIn });
  let y = tweened(DEFAULT_Y, { easing: sineIn });

  function onResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    DEFAULT_X = WIDTH / 2 - BUTTON_SIZE / 2;
    DEFAULT_Y = 100;

    x = tweened(DEFAULT_X, { easing: sineIn });
    y = tweened(DEFAULT_Y, { easing: sineIn });
  }

  onMount(() => {
    if (isClient) {
      window.addEventListener("resize", onResize);
    }
  });

  onDestroy(() => {
    if (isClient) {
      window.removeEventListener("resize", onResize);
    }
  });

  export let isOpen = false;
  export let wrapper: any;
  export let launchGameResult: LaunchGameResult | null;

  function onClose() {
    isOpen = false;
    openFullScreen(wrapper);
  }

  function openSearch() {
    openModal(SearchModal, "Search", {}, { type: "new" });
  }

  $: isFavorite = $favoriteGames.games.find(
    (g) => g.id === launchGameResult?.game?.id
  );

  async function toggle(game: any) {
    await toggleFavorite(game);
    api.games.getFavGames({ page: 1, limit: 100 }).then(([games]) => {
      favoriteGames.set(games);
    });
  }
</script>

{#if isOpen}
  <div class="bg open">
    <div
      class="actions quick-actions"
      use:clickOutside
      on:click_outside={() => {
        isOpen = false;
      }}
    >
      <div class="item">
        <Button on:click={() => goto("/")}>
          <img src={assets.home} alt="Home" />
        </Button>
        <span>Home</span>
      </div>
      <div class="item">
        <Button on:click={() => go("dashboard", "navigation")}>
          <img src={assets.user} alt="Dashboard navigation" width="18" />
        </Button>
      </div>
      <div class="item">
        <Button on:click={() => openSearch()}>
          <img src={assets.search} alt="Search" />
        </Button>
      </div>
      <div class="item">
        <Button
          on:click={() => {
            toggle(launchGameResult?.game);
          }}
          on:keydown
        >
          <div
            class="heart {isFavorite && 'favorited'}"
            class:disabled={!launchGameResult?.game?.id}
            style:min-width="18px"
          >
            <Heart />
          </div>
        </Button>
      </div>
      <div class="item">
        <Button on:click={onClose}>
          <img src={assets.closeWhite} alt="Close" width="14" height="14" />
        </Button>
      </div>
    </div>
  </div>
{/if}
{#if !isOpen}
  <div
    use:draggable={{ bounds: ".wrapper" }}
    use:draggable={{ position: { y: $y, x: $x } }}
    on:neodrag={(e) => {
      x.set(e.detail.offsetX, { duration: 0 });
      y.set(e.detail.offsetY, { duration: 0 });
    }}
    on:neodrag:end={() => {
      if ($x > 0) {
        $x = WIDTH / 2 - BUTTON_SIZE / 2;
      } else {
        $x = -WIDTH / 2 + BUTTON_SIZE / 2;
      }
    }}
    class="quick-deposit-fab"
    class:isOpen
  >
    <div
      on:click={() => {
        exitFullScreen();
        isOpen = true;
      }}
      on:keydown
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <rect width="56" height="56" rx="28" fill="black" fill-opacity="0.6" />
        <rect
          x="8"
          y="8"
          width="40"
          height="40"
          rx="20"
          fill="white"
          fill-opacity="0.9"
        />
        <path
          d="M27.6264 36.792C27.8106 36.792 27.9818 36.7423 28.1402
                36.6429C28.3059 36.5435 28.4348 36.4146 28.5269 36.2562C28.6263
                36.0978 28.676 35.9303 28.676 35.7535V29.6768L34.7472
                29.6823C35.0271 29.6823 35.2683 29.5773 35.4709 29.3674C35.6808
                29.1575 35.7858 28.9089 35.7858 28.6216C35.7858 28.3344 35.6827
                28.0876 35.4764 27.8814C35.2702 27.6752 35.0271 27.572 34.7472
                27.572L28.676 27.5665V21.5009C28.6797 21.2246 28.5766 20.9816
                28.3667 20.7717C28.1568 20.5617 27.91 20.4586 27.6264
                20.4623C27.3392 20.4623 27.0906 20.5673 26.8807 20.7772C26.6707
                20.9797 26.5658 21.221 26.5658 21.5009L26.5713
                27.572H20.4946C20.3178 27.572 20.1502 27.6218 19.9919
                27.7212C19.8335 27.8133 19.7028 27.9403 19.5997 28.1024C19.5002
                28.2607 19.4523 28.4338 19.456 28.6216C19.4597 28.8168 19.5094
                28.9955 19.6052 29.1575C19.7009 29.3122 19.828 29.4392 19.9864
                29.5387C20.1484 29.6344 20.3178 29.6823 20.4946 29.6823L26.5658
                29.6768V35.7535C26.5694 35.9339 26.6192 36.1052 26.7149
                36.2672C26.8107 36.4219 26.9377 36.549 27.0961 36.6484C27.2581
                36.7442 27.4349 36.792 27.6264 36.792Z"
          fill="black"
        />
        <defs>
          <filter
            id="filter0_b_6599_13302"
            x="-4"
            y="-4"
            width="64"
            height="64"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_6599_13302"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_6599_13302"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_b_6599_13302"
            x="-8"
            y="-8"
            width="72"
            height="72"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="8" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_6599_13302"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_6599_13302"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  </div>
{/if}

<style>
  :global(.quick-actions .item > button) {
    padding: 0;
    width: 40px;
  }
  .actions {
    top: auto;
    left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    position: absolute;
    padding: 0 15px;
    height: 75px;
    border-radius: 8px;
    background-color: rgb(0 0 0 / 16%);
    transform: translate(-50%, 0);
    top: calc(100% - 245px);
    left: 50%;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .item > span {
    font-size: 10px;
    display: none;
  }
  .bg {
    opacity: 0;
    transition: all 1s;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 14000;
    backdrop-filter: blur(10px);
    background: rgba(36, 37, 38, 0.69);
  }
  .bg.open {
    opacity: 1;
    top: 0;
  }

  .quick-deposit-fab {
    position: absolute;
    z-index: 100000000;
    width: 56px;
  }
</style>
