<script lang="ts">
  import clickOutside from "$lib/utils/clickOutside";
  import BalanceSelectHandle from "./BalanceSelectHandle.svelte";
  import BalanceSelectItems from "./BalanceSelectItems.svelte";
  import { player, isLoggedIn } from "$lib/stores/player";
  import type { Balance } from "$lib/types/player";
  import api from "$lib/api";
  import { createQuery } from "@tanstack/svelte-query";
  import type { BonusBalance } from "$lib/types/bonuses";
  import { bonusBalance } from "$lib/stores/bonus";

  export let isListFixedOnSM = false;

  const activeBonuses = createQuery({
    queryKey: ["active-bonuses"],
    queryFn: async () => {
      const [res] = await api.bonuses.bonusBalance();
      if (Object.keys(res).length != 0) {
        bonusBalance.set(res);
        if (!$player.bonus_balance_status) {
          isBalanceUpdating = true;
          isBalanceListVisible = false;
          await api.players.setCurrency(res.currency_id);
          await api.bonuses.selectBonusBalance();
          await api.players.info();
          isBalanceUpdating = false;
        }
      } else {
        bonusBalance.set({});
        if ($player.bonus_balance_status) {
          await api.players.cancelBonusBalanceStatus();
          await api.players.info();
        }
      }
      return res;
    },
  });

  let isBalanceListVisible: boolean = false;
  let isBalanceUpdating = false;

  $: loading = isBalanceUpdating || $activeBonuses.isLoading;

  function onOpenBalance() {
    isBalanceListVisible = !isBalanceListVisible;
  }

  async function onSelectBalance({
    detail: balance,
  }: {
    detail: Balance | BonusBalance;
  }) {
    if ("balance_amount" in balance) {
      isBalanceUpdating = true;
      isBalanceListVisible = false;
      await api.players.setCurrency(balance.currency_id);
      await api.bonuses.selectBonusBalance();
      await api.players.info();
      isBalanceUpdating = false;
    } else {
      isBalanceUpdating = true;
      isBalanceListVisible = false;
      await api.players.setCurrency(balance.currency_id);
      await api.players.info();
      isBalanceUpdating = false;
    }
  }
</script>

{#if $isLoggedIn && $player.real_balances}
  <div
    class="balance-select-container"
    use:clickOutside
    on:click_outside={() => (isBalanceListVisible = false)}
  >
    <div class="balance-select-container-item">
      <BalanceSelectHandle
        on:click={onOpenBalance}
        on:keydown={onOpenBalance}
        {loading}
        visible={isBalanceListVisible}
      />
    </div>
    <BalanceSelectItems
      on:select={onSelectBalance}
      visible={isBalanceListVisible}
      {isListFixedOnSM}
    />
  </div>
{/if}

<style lang="scss">
  div {
    position: relative;
    z-index: 9;
    display: flex;
    align-items: center;
  }

  .balance-select-container {
    display: flex;
    justify-content: center;
  }
</style>
