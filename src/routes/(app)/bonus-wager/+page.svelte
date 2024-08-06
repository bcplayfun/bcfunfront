<script lang="ts">
  import Slider from "$lib/components/Banners";
  import Expanded from "$lib/components/Games/Expanded";

  import * as assets from "$lib/assets/banners";
  import Filtered from "$lib/components/Games/Filtered";

  const banners = [
    {
      title: "slots-title-1",
      description: "",
      img: assets.zeusB,
      img_mobile: assets.zeusBM,
      front_img: assets.zeusF,
      front_img_mobile: assets.zeusFM,
      action_label: "play",
      action_url: "/bonus-wager",
    },
    {
      title: "slots-title-2",
      description: "",
      img: assets.aliensB,
      img_mobile: assets.aliensBM,
      front_img: assets.aliensF,
      front_img_mobile: assets.aliensFM,
      action_label: "play",
      action_url: "/bonus-wager",
    },
  ];
</script>

<svelte:head>
  <title>BCFUN | Bonus Wagering games</title>
</svelte:head>

<div class="d-flex flex-column bonus-wager-container">
  <Slider {banners} />
  <Filtered
    gameGroup={"bonus-wager"}
    title={"Bonus Wagering"}
    url="bonus-wager"
  />
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
