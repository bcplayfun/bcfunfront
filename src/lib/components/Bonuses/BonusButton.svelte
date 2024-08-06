<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/elements/Button/Button.svelte";
  import type { Bonus } from "$lib/types/bonuses";

  import { go, profileKeyStore } from "$lib/elements/Profile";
  import api from "$lib/api";
  import { player } from "$lib/stores/player";

  export let key: string = "";
  export let type: string = "";
  export let bonus: Bonus;
  export let activateBonus: () => void;

  let loading = false;

  $: slug = bonus?.type?.game?.slug;

  async function runGame() {
    if (
      (bonus.type.family_id === 101 || bonus.type.family_id === 102) &&
      $player.selected_currency_id !== bonus?.type?.currency_id
    ) {
      loading = true;
      await api.players.setCurrency(bonus?.type?.currency_id);
      await api.players.info();
      goto(`/game/${slug}`);
      loading = false;
    } else if ($player.selected_currency_id === bonus?.type?.currency_id) {
      goto(`/game/${slug}`);
    }
  }
</script>

{#if type === "canceled"}
  <Button background="grey" size="large" disabled>Canceled</Button>
{:else if type === "completed"}
  <Button background="grey" size="large" disabled>Completed</Button>
{:else if type === "expired"}
  <Button background="grey" size="large" disabled>Expired</Button>
{:else if type === "freespin"}
  <Button size="large" {loading} on:click={() => runGame()}>Play</Button>
{:else if type === "wager"}
  <Button size="large" on:click={() => goto("/bonus-wager")}
    >Wager {parseInt(bonus.type.wager_amount)}X</Button
  >
{:else if type === "ggr"}
  <Button size="large" on:click={() => goto("/slots")}>Play</Button>
{:else if type === "deposit"}
  <Button
    size="large"
    on:click={() => {
      go("dashboard", "my-account");
      profileKeyStore.set({ currency: bonus.type.currency_id });
    }}>DEPOSIT FROM {key}</Button
  >
{:else if type === "activate"}
  <Button background="white" size="large" on:click={activateBonus}
    >ACTIVATE</Button
  >
{/if}
