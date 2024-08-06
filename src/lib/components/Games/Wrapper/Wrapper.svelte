<script lang="ts">
  import { breakpoints } from "$lib/utils/constants";
  import { isClient } from "$lib/utils/page";
  import { gameFrameConfig } from "$lib/stores/gamesFrame";
  import { player } from "$lib/stores/player";
  import type { LaunchGameResult } from "$lib/types/games";
  import QuickDepositButton from "./QuickDepositButton.svelte";
  import {
    launchGame,
    isGameWrapperVisible,
    openFullScreen,
    exitFullScreen,
  } from ".";
  import Header from "./Header.svelte";
  import { browser } from "$app/environment";
  import { onDestroy, onMount } from "svelte";
  import api from "$lib/api";

  let innerWidth = 0;
  let launchConfig: any = {
    gameAlias: null,
    state: "hidden",
    selected_currency_id: null,
    selected_bonus_id: null,
  };
  let launchGameResult: LaunchGameResult | null = null;
  let loading: boolean = false;
  let iframeRef: HTMLIFrameElement | null = null;

  let isOpen: boolean = false;

  $: if (
    $player.selected_currency_id &&
    ($player.selected_currency_id != launchConfig.selected_currency_id ||
      $player.bonus_balance_status != launchConfig.bonus_balance_status ||
      $gameFrameConfig.gameAlias != launchConfig.gameAlias) &&
    $gameFrameConfig.gameAlias &&
    $isGameWrapperVisible
  ) {
    loading = true;
    launchConfig = {
      ...$gameFrameConfig,
      selected_currency_id: $player.selected_currency_id,
      bonus_balance_status: $player.bonus_balance_status,
    };

    launchGame($gameFrameConfig.gameAlias, false).then(([res]) => {
      launchGameResult = res[0];
      loading = false;
    });
    isOpen = false;
    hide = false;
  } else if (!launchGameResult) {
    $gameFrameConfig.gameAlias;
    loading = true;
  }

  $: if (!$isGameWrapperVisible) {
    launchGameResult = null;
    launchConfig.gameAlias = null;
  }

  let isFull = false;
  function toggleFullScreen() {
    if (browser && wrapper && innerWidth < breakpoints.lg && isFull) {
      exitFullScreen();
    } else if (browser && wrapper && innerWidth < breakpoints.lg && !isFull) {
      openFullScreen(wrapper);
    }
    isFull = !isFull;
  }

  let wrapper: any;
  let hide = false;
  function openFull() {
    if (browser && wrapper && innerWidth < breakpoints.lg) {
      openFullScreen(wrapper);
      hide = true;
    }
  }

  //TODO droebit
  let interval: any;
  onMount(async () => {
    interval = setInterval(async () => {
      await api.bonuses.bonusBalance();
    }, 120000);
  });
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<svelte:window bind:innerWidth />

{#if $isGameWrapperVisible}
  <div bind:this={wrapper} class="game-wrapper" class:full={isFull}>
    {#if !hide}
      <div class="openFull" on:click={openFull} on:keydown />
    {/if}
    {#if innerWidth < breakpoints.lg && isClient}
      <QuickDepositButton
        bind:isOpen
        {launchGameResult}
        bind:wrapper
        on:openFullScreen={() => openFull()}
      />
    {/if}
    {#if loading}
      <div class="skeleton" />
    {:else if launchGameResult}
      <div class="iframe-wrapper">
        <Header
          {launchGameResult}
          on:openFullScreen={() => toggleFullScreen()}
          {isFull}
        />
        <iframe
          title="game"
          class:full={isFull}
          src={launchGameResult?.game?.provider_id === 30 ||
          launchGameResult?.game?.provider_id === 31 ||
          launchGameResult?.game?.provider_id === 46 ||
          launchGameResult?.game?.provider_id === 47 ||
          launchGameResult?.game?.provider_id === 21 ||
          launchGameResult?.game?.provider_id === 38 ||
          launchGameResult?.game?.provider_id === 26 ||
          launchGameResult?.game?.provider_id === 14 ||
          launchGameResult?.game?.provider_id === 16 ||
          launchGameResult?.game?.provider_id === 7 ||
          launchGameResult?.game?.provider_id === 15 ||
          launchGameResult?.game?.provider_id === 28 ||
          launchGameResult?.game?.provider_id === 8 ||
          launchGameResult?.game?.provider_id === 51
            ? `https://game-services-s4-datacenter23.BCFUN.com/?url=${launchGameResult.launch_game}`
            : launchGameResult.launch_game}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-popups"
          frameborder="0"
          bind:this={iframeRef}
        />
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .resize {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: var(--layer-0);
    border-radius: 8px;
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 1;

    img {
      height: 25px;
    }
  }
  .openFull {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9999;
    display: none;
    @media (max-width: 992px) {
      display: flex;
    }
  }
  .iframe-wrapper {
    width: 100%;
    min-height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    background-color: rgb(44, 44, 49);
    border-radius: 8px;
    position: relative;
    overflow: hidden;

    @include media.down(lg) {
      width: 100%;
      min-height: 100%;
    }
  }

  iframe {
    width: 100%;
    flex: 1 0 0;
    border-radius: 0 0 4px 4px;
    @include media.down(lg) {
      width: 100%;
    }
  }

  .skeleton {
    width: 100%;
    min-height: calc(100% - 40px);
    border-radius: 8px;
    @include media.down(lg) {
      min-height: 100%;
      width: 100%;
    }
    &:before {
      width: 200px;
      height: 91.49px;
    }
  }

  .game-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 15px;
    background-color: var(--layer-0);

    &.full {
      justify-content: flex-start;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 9999;
      padding: 0;
      .iframe-wrapper {
        min-height: 100%;
        aspect-ratio: initial;
      }
      iframe {
        min-height: calc(100% - 52px);
      }
    }

    @include media.down(lg) {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 1000;
      justify-content: flex-start;
      padding: 0;
    }
  }
</style>
