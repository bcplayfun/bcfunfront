<script lang="ts">
  import clickOutside from "$lib/utils/clickOutside";
  import CurrencySelectHandle from "./CurrencySelectHandle.svelte";
  import CurrencySelectItems from "./CurrencySelectItems.svelte";
  import type { Currency } from "$lib/types/player";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let currencies: Currency[];
  export let selectedCurrency: Currency | undefined;
  export let loading: boolean = false;
  export let profile: boolean = false;

  let isBalanceListVisible: boolean = false;
  let isBalanceUpdating = false;

  $: loading = isBalanceUpdating;

  function onOpenBalance() {
    isBalanceListVisible = !isBalanceListVisible;
  }

  async function onSelectBalance({
    detail: currency,
  }: {
    detail: Currency;
  }): Promise<void> {
    dispatch("select", currency);
    isBalanceListVisible = false;
  }
</script>

<div
  class="balance-select-container"
  use:clickOutside
  on:click_outside={() => (isBalanceListVisible = false)}
>
  <div class="balance-select-container--item">
    <CurrencySelectHandle
      on:click={onOpenBalance}
      on:keydown={onOpenBalance}
      {isBalanceListVisible}
      {selectedCurrency}
      {loading}
      {profile}
    />
  </div>
</div>

<CurrencySelectItems
  on:select={onSelectBalance}
  {currencies}
  {selectedCurrency}
  visible={isBalanceListVisible}
  {profile}
/>

<style lang="scss">
  .balance-select-container {
    position: relative;
    z-index: 10;
    flex: 1;

    &--item {
      width: 100%;
    }
  }
</style>
