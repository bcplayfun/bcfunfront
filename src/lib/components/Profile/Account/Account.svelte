<script lang="ts">
  import { cfIpCountry, player } from "$lib/stores/player";
  import BalanceSelect from "../components/BalanceSelect";
  import CryptoDisplay from "./components/CryptoDisplay";
  import { sortCurrencies } from "$lib/utils/currency";
  import type { Balance } from "$lib/types/player";
  import api from "$lib/api";
  import CircleLoading from "$lib/elements/Button/CircleLoading.svelte";
  import Alert from "$lib/elements/Alert";
  import { profileKeyStore } from "$lib/elements/Profile";
  import Changelly from "$lib/components/Changelly/Changelly.svelte";
  // import Pix from "$lib/components/Pix/Pix.svelte";
  import { openModal } from "$lib/elements/Modal";
  import * as assets from "./../assets";

  let selectedBalance: Balance | undefined = undefined;
  let loaded = false;
  let loading = false;

  function onSelectBalance(balance: Balance) {
    selectedBalance = balance;
    if (selectedBalance?.currency.is_crypto && !selectedBalance.address) {
      generateAddress(selectedBalance.currency.name);
    }
  }

  async function generateAddress(currency: string) {
    if (loading) {
      return;
    }
    loading = true;
    const [_, err] = await api.players.setAddress(currency);
    if (err) {
      loading = false;
      return;
    }
    await api.players.info();
    selectedBalance = $player.real_balances?.find(
      (balance) => balance.currency.name === currency
    );
    Alert.success(`The ${currency} address has been created`);
    loading = false;
  }

  function onResetDepositAddress() {
    Alert.error("You need at least one deposit.");
    // if (selectedBalance?.currency.name) {
    //   generateAddress(selectedBalance?.currency.name);
    // }
  }

  $: if ($player?.id && !loaded && "currency" in $profileKeyStore) {
    selectedBalance = $player.real_balances?.find(
      (balance) => balance.currency.id === $profileKeyStore.currency
    );
    if (selectedBalance?.currency.is_crypto && !selectedBalance.address) {
      generateAddress(selectedBalance.currency.name);
    }
    profileKeyStore.set({});
    loaded = true;
  } else if ($player?.id && !loaded) {
    selectedBalance = $player.real_balances?.find(
      (balance) => balance.currency_id === $player.selected_currency_id
    );
    if (selectedBalance?.currency.is_crypto && !selectedBalance.address) {
      generateAddress(selectedBalance.currency.name);
    }
    loaded = true;
  }
</script>

<div class="component-title">My Account</div>
{#if $cfIpCountry !== "GB"}
  <div class="top gap-10">
    <button
      type="submit"
      title="Changelly buy crypto with card"
      on:click={() => openModal(Changelly, "", {}, { type: "new" })}
    >
      <img src={assets.changelly} alt="" class="mr-6" />
      Buy crypto
    </button>
  </div>
{/if}
<div class="account">
  <div class="select-boxes">
    <BalanceSelect
      balances={$player?.real_balances.filter(
        (balance) => balance.currency.is_active
      )}
      showAmount
      on:select={({ detail }) => onSelectBalance(detail)}
      bind:selectedBalance
    />
  </div>
  <!-- || selectedBalance?.currency.name === "GBP" -->
  {#if selectedBalance?.currency.is_crypto}
    {#if loading && !selectedBalance.address}
      <div class="loading">
        <CircleLoading size="30px" />
      </div>
    {:else if selectedBalance.address}
      <CryptoDisplay bind:selectedBalance {onResetDepositAddress} />
    {/if}
  {/if}
</div>

<style lang="scss">
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 0;
  }

  .text {
    font-size: 14px;
    color: var(--text-secondary);
    text-align: center;
    font-weight: 500;
    margin: 25px 0;
  }

  .top {
    display: flex;
    padding-right: 15px;
    margin: 15px 0 0;
  }
  .account {
    padding-right: 15px;
    margin: 15px 0 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1 0 0;

    //TODO moifikre
    overflow: auto;
  }

  .balance {
    height: 250px;
    width: 100%;
    background-color: var(--color-1);
    border-radius: 8px;
    padding-right: 15px;
  }

  .select-boxes {
    display: flex;
    gap: 20px;
    max-width: 100%;

    @include media.down("md") {
      flex-direction: column;
      gap: 12px;
    }
  }
  button {
    min-width: 100px;
    display: flex;
    align-items: center;
    gap: 6px;
    border: 0;
    border-radius: 8px;
    user-select: none;
    background: var(--brand-primary);
    padding: 5px 12px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 1.15px;

    width: 100%;
    justify-content: center;

    &:hover {
      filter: brightness(1.2);
    }
    img {
      width: 32px;
    }
    &.green {
      background: var(--green);
    }
  }
</style>
