<script lang="ts">
  import clickOutside from "$lib/utils/clickOutside";
  import BalanceSelectHandle from "./BalanceSelectHandle.svelte";
  import BalanceSelectItems from "./BalanceSelectItems.svelte";
  import type { Balance } from "$lib/types/player";
  import { createEventDispatcher } from "svelte";
  import api from "$lib/api";
  import { player } from "$lib/stores/player";

  const dispatch = createEventDispatcher();

  export let balances: Balance[];
  export let selectedBalance: Balance | undefined;
  export let showAmount: boolean = false;
  export let loading: boolean = false;
  export let profile: boolean = false;

  let isBalanceListVisible: boolean = false;
  let isBalanceUpdating = false;

  $: loading = isBalanceUpdating;

  function onOpenBalance() {
    isBalanceListVisible = !isBalanceListVisible;
  }

  async function onSelectBalance({
    detail: balance,
  }: {
    detail: Balance;
  }): Promise<void> {
    dispatch("select", balance);
    selectedBalance = balance;
    isBalanceListVisible = false;

    isBalanceUpdating = true;
    isBalanceListVisible = false;
    if (!$player.bonus_balance_status) {
      await api.players.setCurrency(balance.currency_id);
      await api.players.info();
    }
    isBalanceUpdating = false;
  }
</script>

<div
  class="balance-select-container"
  use:clickOutside
  on:click_outside={() => (isBalanceListVisible = false)}
>
  <div class="balance-select-container--item">
    <BalanceSelectHandle
      on:click={onOpenBalance}
      on:keydown={onOpenBalance}
      {showAmount}
      {isBalanceListVisible}
      {selectedBalance}
      {loading}
      {profile}
      balance={balances.find(
        (balance) => balance.currency_id == selectedBalance?.currency_id
      )?.amount || 0}
    />
  </div>
  <BalanceSelectItems
    on:select={onSelectBalance}
    {balances}
    showAmount={false}
    {selectedBalance}
    visible={isBalanceListVisible}
    {profile}
  />
</div>

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
