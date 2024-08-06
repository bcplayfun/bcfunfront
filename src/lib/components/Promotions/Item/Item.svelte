<script lang="ts">
  import { openModal } from "$lib/elements/Modal";

  import type { Promotion } from "$lib/types/promotions";
  import { isJsonString } from "$lib/utils/string";
  import Opened from "../Opened/Opened.svelte";

  export let promotion: Promotion;
  export let loading: boolean;

  function openPromotion() {
    openModal(
      Opened,
      isJsonString(promotion.title)
        ? JSON.parse(promotion.title)
        : promotion.title,
      { promotion: promotion },
      { type: "promotion" }
    );
  }
</script>

{#if !loading}
  <div class="promotion" on:click={() => openPromotion()} on:keydown>
    <img src={promotion.url} alt={promotion.title} />
  </div>
{:else}
  <div class="promotion skeleton" />
{/if}

<style lang="scss">
  .skeleton {
    border-radius: 8px;
  }
  .promotion {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 330px;
    height: 330px;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    @media (max-width: 768px) {
      width: 270px;
      height: 270px;
    }
    img {
      object-fit: cover;
      height: 100%;
      transition: 0.2s ease-in-out;
      &:hover {
        transform: scale(1.02);
      }
    }
  }
</style>
