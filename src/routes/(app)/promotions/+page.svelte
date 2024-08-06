<script lang="ts">
  import Item from "$lib/components/Promotions/Item/Item.svelte";
  import { onMount } from "svelte";
  import api from "$lib/api";
  import { promotionsStore } from "$lib/components/Promotions/Opened";

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

<svelte:head>
  <title
    >BCFUN Rewards Hub | Unlock Exclusive Promotions and Claim Your Bonuses
    Today!</title
  >
</svelte:head>

<div class="container mx-auto">
  <div class="promotions promotions--expanded">
    {#if $promotionsStore?.length}
      {#each $promotionsStore as promotion}
        <Item {promotion} {loading} />
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .top {
    display: flex;
    flex-direction: column;
    position: relative;
    .overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.3) 100%
      );
    }
    .banner {
      width: 100%;
      height: 225px;
      object-fit: cover;
      border-radius: 8px;
      @media (max-width: 768px) {
        height: 200px;
      }
    }
    .info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
    .title {
      font-size: 40px;
      font-weight: 700;
      color: white;
      text-transform: uppercase;
      text-align: center;
      @media (max-width: 992px) {
        font-size: 35px;
      }
      @media (max-width: 768px) {
        font-size: 28px;
      }
    }
  }
  .promotions {
    margin: 30px 0 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    @media (max-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 820px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 560px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
