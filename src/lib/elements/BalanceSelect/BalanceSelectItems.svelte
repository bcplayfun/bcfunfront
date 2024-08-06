<script lang="ts">
  // import api from "$lib/api";
  import { player } from "$lib/stores/player";
  // import { createQuery } from "@tanstack/svelte-query";
  import { createEventDispatcher } from "svelte";
  import BalanceSelectItem from "./BalanceSelectItem.svelte";
  import Search from "./assets/search.svg";
  import { sortCurrencies } from "$lib/utils/currency";
  import { selectedBalance } from "$lib/stores/static";
  import { bonusBalance } from "$lib/stores/bonus";

  export let isListFixedOnSM: boolean;

  const dispatch = createEventDispatcher();

  export let visible: boolean;

  let searchQuery = "";

  function handleSearch(e: any) {
    searchQuery = e.target.value.toLowerCase();
  }
</script>

<div
  class="balance-select-container"
  class:visible
  class:fixed-on-sm={isListFixedOnSM}
>
  <div class="search-container">
    <div class="search">
      <img src={Search} alt="search icon" class="search-icon" />
      <input
        type="text"
        placeholder={"Search"}
        class="search-input"
        on:input={(e) => handleSearch(e)}
      />
    </div>
  </div>
  <div class="balance-select-items">
    {#if Object.keys($bonusBalance).length}
      <BalanceSelectItem
        on:click={() => dispatch("select", $bonusBalance)}
        balance={$bonusBalance}
        isBonus={true}
      />
    {/if}

    {#each sortCurrencies( $player?.real_balances.filter((balance) => balance.currency.is_active), $selectedBalance ) as balance}
      <BalanceSelectItem
        on:click={() => {
          if ($player.bonus_balance_status) {
            return;
          }
          dispatch("select", balance);
        }}
        {balance}
        isBonus={false}
        {searchQuery}
        disable={$player.bonus_balance_status === 1}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  .balance-select-container {
    position: absolute;
    top: 70px;
    right: 0;
    z-index: 999;
    width: 398px;
    height: 0;
    background: var(--layer-0);
    border-radius: 8px;
    overflow: hidden;

    @include media.down(sm) {
      width: 330px;
      left: 50%;
      transform: translate(-50%);

      &.fixed-on-sm {
        position: fixed;
      }
    }
    &.visible {
      border: 1px solid #2f2f37;
      height: 420px;
    }
  }
  .balance-select-items {
    overflow: auto;
    top: 85px;
    right: 0;
    z-index: 999;
    width: 100%;
    height: 342px;
    border-radius: 8px;
    background: var(--layer-0);
  }

  .search {
    gap: 8px;
    width: 100%;
    height: 48px;
    background: #26262c;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
    &-container {
      display: flex;
      justify-content: center;
      margin: 25px 21px 5px;
      @media (max-width: 768px) {
        margin: 25px 15px 5px;
      }
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
  }
  ::-webkit-scrollbar-thumb {
    background: var(--brand-stroke);
    border-radius: 1px;
  }
  ::-webkit-scrollbar {
    width: 4px;
  }
</style>
