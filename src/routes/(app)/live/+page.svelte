<script lang="ts">
  import Slider from "$lib/components/Banners";
  import * as assets from "$lib/assets/banners";
  import { player } from "$lib/stores/player";
  import { goto } from "$app/navigation";
  import Filtered from "$lib/components/Games/Filtered";

  const banners = [
    {
      title: "CANDY LAND<br />BIG WINS AWAIT!",
      description: "",
      img: assets.wheelB,
      img_mobile: assets.wheelBM,
      front_img: assets.wheelF,
      front_img_mobile: assets.wheelFM,
      action_label: "promotions",
      action_url: "",
    },
    {
      title: "COIN FLIP EXCITEMENT<br />MEGA PRIZES!",
      description: "",
      img: assets.liveB,
      img_mobile: assets.liveBM,
      front_img: assets.liveF,
      front_img_mobile: assets.liveFM,
      action_label: "promotions",
      action_url: "",
    },
  ];

  $: if ($player.bonus_balance_status) {
    goto("/bonus-wager");
  }
</script>

<svelte:head>
  <title
    >BCFUN Live | Elevate Your Gaming Experience with Live Action Excitement!</title
  >
</svelte:head>

<div class="d-flex flex-column">
  <Slider {banners} />
  <Filtered gameGroup={"live-casino-page"} title={"All Live"} url="live" />
</div>
