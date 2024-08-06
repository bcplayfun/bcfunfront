<script lang="ts">
  import { currencyIdToCurrency } from "$lib/stores/static";
  import Icon from "./Icon.svelte";
  import type { Currency } from "$lib/types/player";

  export let currency = {} as Currency;
  export let isSelected: boolean;

  function getCode(id: number) {
    return $currencyIdToCurrency[id]?.code;
  }
</script>

<div class="balance-select-item">
  <li
    class="balance-select-item-list"
    class:selected={isSelected}
    on:click
    on:keydown
  >
    <div class="d-flex balance-select-item-content">
      <div class="img">
        <Icon currencyId={currency.id} />
      </div>
      <div class="currency-name">
        {#if currency.code == "usdtt"}
          USDT (TRC-20)
        {:else if currency.code == "usdte"}
          USDT (ERC-20)
        {:else}
          {getCode(currency.id)}
        {/if}
      </div>
    </div>
  </li>
</div>

<style lang="scss">
  .left-side {
    color: #757583;
    &.active {
      color: #d6d6d6;
    }
  }

  .right-side {
    color: #d6d6d6;
  }

  .balance-select-item-content {
    display: flex;
    align-items: center;
    .img {
      width: 31px;
      height: 31px;
      margin-right: 10px;
    }
  }
  .balance-select-item {
    position: relative;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    gap: 32px;
    height: 50px;
    margin-bottom: 8px;
    cursor: pointer;
    text-transform: uppercase;
    transition: background 0.5s;

    @media (max-width: 768px) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 15px;
      /* max-width: 82px; */
    }
  }
  .balance-select-item-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 11px;
    &:hover {
      background: var(--layer-1);
      border-radius: 8px;
    }

    &.selected {
      background: var(--highlight);
      border-radius: 8px;
      .currency-name {
        color: white;
      }
    }
  }
  .currency-name {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    color: #d6d6d6;
  }
  .amount {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    color: #d6d6d6;
  }
  .balance-select-item:last-child {
    margin-bottom: 5px;
  }
</style>
