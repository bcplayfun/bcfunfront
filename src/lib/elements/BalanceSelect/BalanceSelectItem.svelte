<script lang="ts">
  import giftIcon from "$lib/assets/icons/gift.svg";
  import { currencyIdToCurrency } from "$lib/stores/static";
  import Icon from "./Icon.svelte";
  import { getPrecisedAmount } from ".";

  export let balance: any;
  export let isBonus = false;
  export let disable = false;

  function getName(id: number) {
    return $currencyIdToCurrency[id]?.name;
  }
  function getCode(id: number) {
    return $currencyIdToCurrency[id]?.code;
  }

  function searchCurrency(balance: any, searchQuery: string) {
    const currencyName = getName(balance.currency_id)?.toLowerCase();
    const currencyCode = getCode(balance.currency_id)?.toLowerCase();

    return (
      currencyName?.includes(searchQuery) || currencyCode?.includes(searchQuery)
    );
  }

  export let searchQuery: string = "";
</script>

{#if isBonus}
  <div class="balance-select-item">
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <li class="balance-select-item-list" on:click on:keydown>
      <div class="d-flex items-center">
        <div class="img-wrap">
          <img src={giftIcon} alt="Bonus balance" class="bonus-img" />
          <div class="currency-img">
            <Icon currencyId={balance.currency_id} />
          </div>
        </div>
        <div class="currency-name bonus">
          {getCode(balance.currency_id)}&nbsp;
        </div>
        <div class="currency-name">Bonus</div>
      </div>
      <div class="amount text-14">
        <span class="right-side"
          >{getPrecisedAmount(parseFloat(balance.amount)).split(".")[0]}</span
        >
        <span class="dot">.</span>
        <span class="left-side active"
          >{getPrecisedAmount(parseFloat(balance.amount)).split(".")[1]}</span
        >
      </div>
    </li>
  </div>
{:else if searchCurrency(balance, searchQuery)}
  <div class="balance-select-item" class:disable>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <li class="balance-select-item-list" on:click on:keydown>
      <div class="d-flex balance-select-item-content">
        <div class="img">
          <Icon currencyId={balance.currency_id} />
        </div>
        <div class="currency-name">
          {#if balance.currency.code == "usdtt"}
            USDT (TRC-20)
          {:else if balance.currency.code == "usdte"}
            USDT (ERC-20)
          {:else}
            {getName(balance.currency_id)}
          {/if}
        </div>
      </div>
      <div>
        {#if parseFloat(balance.amount) == 0}
          <span class="left-side">0.00</span>
        {:else}
          <span class="amount">
            <span class="right-side"
              >{balance.currency.is_crypto
                ? getPrecisedAmount(parseFloat(balance.amount)).split(".")[0]
                : getPrecisedAmount(parseFloat(balance.amount), 2).split(
                    "."
                  )[0]}</span
            >
            .
            <span class="left-side active"
              >{balance.currency.is_crypto
                ? getPrecisedAmount(parseFloat(balance.amount)).split(".")[1]
                : getPrecisedAmount(parseFloat(balance.amount), 2).split(
                    "."
                  )[1]}</span
            >
          </span>
        {/if}
      </div>
    </li>
  </div>
{/if}

<style lang="scss">
  .balance-select-item-content {
    display: flex;
    align-items: center;
    .img {
      width: 31px;
      height: 31px;
      margin-right: 12px;
    }
  }
  .balance-select-item {
    position: relative;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    gap: 32px;
    height: 56px;
    cursor: pointer;
    &.disable {
      opacity: 0.3;
      pointer-events: none;
    }

    .bonus-img {
      height: 31px;
      width: 31px;
      margin-right: 8px;
    }

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
  }

  .currency-name {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 120%;
    color: #d6d6d6;
    text-transform: uppercase;
  }
  .amount {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 120%;
  }
  .currency-img {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 24px;
  }

  .balance-select-item:last-child {
    margin-bottom: 5px;
  }

  .bonus-img {
    width: 31px;
    height: 31px;
  }

  .bonus {
    padding-left: 10px;
  }
  .left-side {
    color: #757583;
    &.active {
      color: #d6d6d6;
    }
  }

  .right-side {
    color: #d6d6d6;
  }
</style>
