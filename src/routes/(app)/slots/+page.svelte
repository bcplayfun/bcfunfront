<script lang="ts">
  import Slider from "$lib/components/Banners";
  import Filtered from "$lib/components/Games/Filtered";
  import * as assets from "$lib/assets/banners";
  import { player } from "$lib/stores/player";
  import { goto } from "$app/navigation";

  const banners = [
    {
      title: "UNLOCK ADVENTURES NOW!",
      description: "",
      img: assets.zeusB,
      img_mobile: assets.zeusBM,
      front_img: assets.zeusF,
      front_img_mobile: assets.zeusFM,
      action_label: "play now",
      action_url: "/slots?limit=96&page=1&provider_id=30",
    },
    {
      title: "15,000x WIN CLAIM NOW!",
      description: "",
      img: assets.aliensB,
      img_mobile: assets.aliensBM,
      front_img: assets.aliensF,
      front_img_mobile: assets.aliensFM,
      action_label: "play now",
      action_url: "/slots?limit=96&page=1&provider_id=5",
    },
  ];

  $: if ($player.bonus_balance_status) {
    goto("/bonus-wager");
  }
</script>

<svelte:head>
  <title>BCFUN Slots | Unleash the Power of 3500+ Thrilling Games!</title>
</svelte:head>

<div class="d-flex flex-column">
  <Slider {banners} />
  <Filtered gameGroup={"slots"} title={"All Slots"} />
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
      color: var(--white);
      margin: 8px 0;
    }
  }
</style>
