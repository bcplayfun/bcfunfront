<script lang="ts">
  import { currencies } from "$lib/stores/static";
  import type { Balance } from "$lib/types/player";
  import { getPrecisedAmount } from ".";
  import Icon from "./Icon.svelte";
  import CircleLoading from "$lib/elements/Button/CircleLoading.svelte";

  export let isBalanceListVisible: boolean;
  export let selectedBalance: Balance | undefined;
  export let showAmount: boolean = false;
  export let loading: boolean = false;
  export let profile: boolean = false;
  export let balance: any;
</script>

<div
  class="balance-select-handle"
  class:profile
  class:active={isBalanceListVisible}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#if selectedBalance && !loading}
    <div class="wrap" on:click on:keydown>
      <div class="wrap-img">
        <Icon currencyId={selectedBalance.currency_id} />
      </div>
      <div class="amount">
        {#if showAmount}
          {selectedBalance.currency.is_crypto
            ? getPrecisedAmount(parseFloat(balance))
            : getPrecisedAmount(parseFloat(balance), 2)}
        {:else}
          {$currencies.find(({ id }) => id === selectedBalance?.currency_id)
            ?.name || ""}
        {/if}
      </div>
    </div>
  {:else}
    <div class="loading">
      <CircleLoading size={"15px"} />
    </div>
  {/if}
</div>

<style lang="scss">
  .balance-select-handle {
    --height: 46px;

    border-radius: 8px;
    height: var(--height);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    cursor: pointer;
    z-index: 0;
    border: 1px solid #545463;
    transition: all 0.2s ease-in-out;
    &.profile {
      border-radius: 8px 0 0 4px;
    }

    // &.active {
    //   border: 1px solid #fff;
    // }
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }

  .wrap {
    display: flex;
    align-items: center;
    padding: 6px 10px;
    height: var(--height);
    width: 100%;
  }
  .wrap-img {
    width: 26px;
    margin-right: 10px;
  }
  .amount {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    margin-right: 5px;
  }
</style>
