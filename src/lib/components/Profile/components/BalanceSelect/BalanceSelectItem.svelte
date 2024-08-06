<script lang="ts">
  import { currencyIdToCurrency } from "$lib/stores/static";
  import Icon from "./Icon.svelte";
  import type { Balance } from "$lib/types/player";
  import { getPrecisedAmount } from ".";

  export let balance = {} as Balance;
  export let isSelected: boolean;
  export let showAmount: boolean;

  function getCode(id: number) {
    return $currencyIdToCurrency[id]?.code;
  }
</script>

<div class="balance-select-item">
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <li
    class="balance-select-item-list"
    class:selected={isSelected}
    on:click
    on:keydown
  >
    <div class="d-flex balance-select-item-content">
      <div class="img">
        <Icon currencyId={balance.currency_id} />
      </div>
      <div class="currency-name">
        {#if balance.currency.code == "usdtt"}
          USDT
          <br />
          <span>(TRC-20)</span>
        {:else if balance.currency.code == "usdte"}
          USDT
          <br />
          <span>(ERC-20)</span>
        {:else}
          {getCode(balance.currency_id)}
        {/if}
      </div>
    </div>
    {#if showAmount}
      <div class="amount">
        {#if parseFloat(balance.amount) == 0}
          <span class="left-side">0.00</span>
        {:else}
          <span class="right-side"
            >{balance.currency.is_crypto
              ? getPrecisedAmount(parseFloat(balance.amount)).split(".")[0]
              : getPrecisedAmount(parseFloat(balance.amount), 2).split(
                  "."
                )[0]}</span
          >
          <span>.</span>
          <span class="left-side active"
            >{balance.currency.is_crypto
              ? getPrecisedAmount(parseFloat(balance.amount)).split(".")[1]
              : getPrecisedAmount(parseFloat(balance.amount), 2).split(
                  "."
                )[1]}</span
          >
        {/if}
      </div>
    {/if}
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
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  }
  .balance-select-item {
    flex: 0 0 24%;
    position: relative;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    height: 45px;
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
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
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
    display: flex;
    flex-direction: column;
    span {
      font-size: 10px;
      color: var(--brand-primary);
    }
  }
  .amount {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    color: #d6d6d6;
  }
</style>
