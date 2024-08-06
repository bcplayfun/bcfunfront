<script lang="ts">
  import { page } from "$app/stores";
  import { aliasToTitle } from "$lib/components/Games/Wrapper";
  import { closeModal } from "$lib/elements/Modal";
  import GamesWrapper from "$lib/components/Games/Wrapper";
  import { gameFrameConfig } from "$lib/stores/gamesFrame";
  import { onDestroy, onMount } from "svelte";
  import third_parties from "$lib/third_parties";
  import { isClient } from "$lib/utils/page";

  $: updateGameFrameConfig($page?.params?.slug as string);

  function updateGameFrameConfig(alias: string) {
    if (
      $gameFrameConfig.state !== "minimized" ||
      $gameFrameConfig.gameAlias !== alias
    ) {
      gameFrameConfig.update((oldConfig) => ({
        ...oldConfig,
        gameAlias: alias,
        state: "normal",
      }));
    }
  }

  onMount(() => {
    if (isClient) {
      third_parties.intercom.setLauncherVisible(false);
    }
    closeModal();
  });

  onDestroy(() => {
    if (isClient) {
      third_parties.intercom.setLauncherVisible(true);
    }
  });
</script>

<svelte:head>
  <title>{aliasToTitle($page?.params?.slug)} - BCFUN</title>
</svelte:head>

<GamesWrapper />
