<script lang="ts">
  import Item from "../Item/Item.svelte";
  import { onMount } from "svelte";
  import api from "$lib/api";
  import PromotionSlider from "$lib/elements/PromotionsSlider/PromotionSlider.svelte";
  import { promotionsStore } from "../Opened";

  let loading: boolean = true;

  onMount(async () => {
    loading = true;
    const [promotions] = await api.promotions.promotionsList();
    if (promotions.length) {
      promotionsStore.set(promotions);
    }
    loading = false;
  });
</script>

<div class="container mx-auto my-16">
  <PromotionSlider data={$promotionsStore} title="Promotions">
    <svelte:fragment slot="item" let:item>
      <Item promotion={item} {loading} />
    </svelte:fragment>
  </PromotionSlider>
</div>
