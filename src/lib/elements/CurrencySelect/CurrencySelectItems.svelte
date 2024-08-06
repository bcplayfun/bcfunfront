<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BalanceSelectItem from "./CurrencySelectItem.svelte";
  import Search from "./assets/search.svg";
  import type { Currency } from "$lib/types/player";

  export let currencies: Currency[];
  export let selectedCurrency: Currency | undefined;
  export let profile: boolean;

  const dispatch = createEventDispatcher();

  export let visible: boolean;

  let searchKeyword = "";

  $: filteredBalances = currencies.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      c.code.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  $: if (!visible) {
    searchKeyword = "";
  }
</script>

<div class="balance-select-container" class:visible class:profile>
  <div class="search-container">
    <div class="search">
      <img src={Search} alt="search icon" class="search-icon" />
      <input
        type="text"
        placeholder={"Search"}
        class="search-input"
        bind:value={searchKeyword}
      />
    </div>
  </div>
  <div class="balance-select-items">
    {#each filteredBalances as currency}
      <BalanceSelectItem
        on:click={() => dispatch("select", currency)}
        {currency}
        isSelected={currency.id === selectedCurrency?.id}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  .balance-select-container {
    position: absolute;
    top: 250px;
    z-index: 999;
    width: 320px;
    height: 0;
    background: var(--layer-0);
    border-radius: 8px;
    overflow: hidden;
    right: 50%;
    transform: translateX(50%);
    @include media.down(sm) {
      top: 225px;
    }
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
  .balance-select-items {
    overflow: auto;
    width: 100%;
    max-height: 342px;
    border-radius: 8px;
    background: var(--layer-0);

    @media screen and (max-height: 845px) {
      max-height: 300px;
    }
    @media screen and (max-height: 800px) {
      max-height: 250px;
    }
  }

  .search {
    gap: 8px;
    width: 100%;
    height: 48px;
    background: #26262c;
    border-radius: 30px;
    display: flex;
    align-items: center;
    position: relative;
    @include media.down(md) {
      height: 40px;
    }
    &-container {
      display: flex;
      justify-content: center;
      margin: 20px 15px 12px;
    }
    &-icon {
      position: absolute;
      left: 15px;
      pointer-events: none;
    }
    &-input {
      padding-left: 40px;
      background: transparent;
      border: none;
      width: 100%;
      height: 100%;
      color: #ccccda;
      font-weight: 450;
      font-size: 14px;
      line-height: 15px;
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
