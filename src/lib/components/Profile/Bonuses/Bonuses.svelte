<script lang="ts">
  import Bonuses from "$lib/components/Bonuses/Bonuses.svelte";
  import api from "$lib/api";
  import { onMount } from "svelte";
  import type { Bonus } from "$lib/types/bonuses";
  import dayjs from "dayjs";
  import { bonusChangeEvent } from "$lib/stores/bonus";

  let bonuses: Bonus[] = [];
  let activeBonuses: Bonus[] = [];
  let availableBonuses: Bonus[] = [];
  let historyBonuses: Bonus[] = [];
  let loading: boolean = false;

  async function fetchBonuses() {
    loading = true;
    [bonuses] = await api.bonuses.bonuses();
    if (bonuses) {
      activeBonuses = bonuses.filter((bonus) => {
        const now = dayjs();
        let diff = now.diff(dayjs(bonus.created_at).add(7, "day"));
        return (
          bonus.activated_at &&
          !(
            bonus.canceled_at ||
            bonus.completed_at ||
            (bonus.expired_at && diff > 0)
          )
        );
      });
      availableBonuses = bonuses.filter((bonus) => {
        const now = dayjs();
        let diff = now.diff(dayjs(bonus.created_at).add(7, "day"));
        return (
          !bonus.activated_at &&
          !(
            bonus.canceled_at ||
            bonus.expired_at ||
            diff > 0 ||
            bonus.completed_at
          )
        );
      });
    }
    loading = false;
  }
  $: if ($bonusChangeEvent) {
    fetchBonuses();
    bonusChangeEvent.set(false);
  }
  onMount(async () => {
    await fetchBonuses();
  });
</script>

<div class="component-title">My bonuses</div>
<div class="bonuses-profile">
  <h2 class="title">Active</h2>
  <Bonuses on:refetch={fetchBonuses} bonuses={activeBonuses} {loading} />
  <h2 class="title">Available</h2>
  <Bonuses on:refetch={fetchBonuses} bonuses={availableBonuses} {loading} />
</div>

<style lang="scss">
  .bonuses-profile {
    padding-right: 15px;
    margin: 30px 0 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1 0 0;
    overflow: auto;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    color: white;
    height: 33px;
  }
</style>
