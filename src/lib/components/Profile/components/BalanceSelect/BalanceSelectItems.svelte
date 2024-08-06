<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BalanceSelectItem from "./BalanceSelectItem.svelte";
  import type { Balance } from "$lib/types/player";
  import { currencyIdToCurrency } from "$lib/stores/static";
  import CircleLoading from "$lib/elements/Button/CircleLoading.svelte";

  export let balances: Balance[];
  export let selectedBalance: Balance | undefined;
  export let showAmount: boolean;
  export let profile: boolean;

  const dispatch = createEventDispatcher();

  export let visible: boolean;

  let searchKeyword = "";

  $: filteredBalances =
    (Object.keys($currencyIdToCurrency).length &&
      balances.filter((balance) => {
        return (
          getName(balance)
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          getCode(balance).toLowerCase().includes(searchKeyword.toLowerCase())
        );
      })) ||
    null;

  $: if (!visible) {
    searchKeyword = "";
  }

  function getName(balance: Balance) {
    return $currencyIdToCurrency[balance.currency_id]?.name;
  }

  function getCode(balance: Balance) {
    return $currencyIdToCurrency[balance.currency_id]?.code;
  }
</script>

<div class="balance-select-container" class:visible class:profile>
  <div class="balance-select-items">
    {#if filteredBalances}
      {#each filteredBalances.filter((balance) => balance.currency.is_crypto) as balance}
        <BalanceSelectItem
          on:click={() => dispatch("select", balance)}
          {balance}
          {showAmount}
          isSelected={balance.currency_id === selectedBalance?.currency_id}
        />
      {/each}
    {:else}
      <div class="center">
        <CircleLoading color="white" size="20px" />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .balance-select-container {
    margin-top: 15px;
    width: 100%;
    background: var(--layer-0);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #2f2f37;
    padding: 5px;
    &.profile {
      right: -54.8px;
      transform: translateX(0);
      @include media.down(md) {
        right: -91px;
      }
    }

    &.visible {
      border: 1px solid #2f2f37;
      height: fit-content;
    }
  }
  .center {
    width: 100%;
    height: 95px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .balance-select-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    border-radius: 8px;
    background: var(--layer-0);
    gap: 5px;

    @media screen and (max-height: 845px) {
      max-height: 300px;
    }
    @media screen and (max-height: 800px) {
      max-height: 250px;
    }
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    margin: 50px 0;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--brand-stroke);
  }
  ::-webkit-scrollbar {
    width: 4px;
  }
</style>
