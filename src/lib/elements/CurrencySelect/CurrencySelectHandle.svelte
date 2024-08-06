<script lang="ts">
  import Arrow from "$lib/elements/Icons/Arrow.svelte";
  import type { Currency } from "$lib/types/player";
  import Icon from "./Icon.svelte";
  import CircleLoading from "$lib/elements/Button/CircleLoading.svelte";

  export let isBalanceListVisible: boolean;
  export let selectedCurrency: Currency | undefined;
  export let loading: boolean = false;
  export let profile: boolean = false;
</script>

<div
  class="balance-select-handle"
  class:profile
  class:active={isBalanceListVisible}
>
  <div class="wrap" on:click on:keydown>
    {#if !loading}
      {#if selectedCurrency}
        <div class="d-flex items-center">
          <div class="wrap-img">
            <Icon currencyId={selectedCurrency.id} />
          </div>
          <div class="amount">
            {selectedCurrency.name}
          </div>
        </div>
      {/if}
    {:else}
      <div class="loading">
        <CircleLoading size={"15px"} />
      </div>
    {/if}
    <div class="ms-auto">
      <Arrow direction={isBalanceListVisible ? "up" : "down"} />
    </div>
  </div>
</div>

<style lang="scss">
  .balance-select-handle {
    --height: 56px;

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

    &.active {
      border: 1px solid #fff;
    }

    @include media.down(md) {
      --height: 50px;
    }
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
  }

  .wrap {
    display: flex;
    align-items: center;
    padding: 6px 10px;
    height: var(--height);
    width: 100%;
  }
  .wrap-img {
    width: 28px;
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
