<script lang="ts">
  import Slider from "$lib/components/Banners";
  import Expanded from "$lib/components/Games/Expanded";
  import * as assets from "$lib/assets/banners";
  import { player } from "$lib/stores/player";
  import { goto } from "$app/navigation";

  const banners = [
    {
      title: "SCRATCH & WIN<br />40,000x THRILLS!",
      description: "",
      img: assets.carnavalB,
      img_mobile: assets.carnavalBM,
      front_img: assets.carnavalF,
      front_img_mobile: assets.carnavalFM,
      action_label: "play",
      action_url: "",
    },
  ];

  $: if ($player.bonus_balance_status) {
    goto("/bonus-wager");
  }
</script>

<svelte:head>
  <title>Instant Wins Galore: Play and Win Big with BCFUN Mini Games!</title>
</svelte:head>

<div class="d-flex flex-column">
  <Slider {banners} />
  <Expanded title={"mini games"} gameGroup={"mini-games"} />
</div>

<style lang="scss">
  .text-column {
    display: flex;
    flex-direction: column;
    background-color: var(--cp-grey-dark-2);
    width: 100%;
    padding: 50px;
    margin-top: 30px;
    border-radius: 8px;
    p {
      color: var(--gray);
      margin: 8px 0;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 8px 0;
    }
  }
</style>
