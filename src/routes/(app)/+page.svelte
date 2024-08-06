<script lang="ts">
  import Slider from "$lib/components/Banners";
  import GamesBlock from "$lib/components/Games/Block";
  import PromotionsBlock from "$lib/components/Promotions/Block";
  import ProvidersBlock from "$lib/components/Providers/Block";

  import * as assets from "$lib/assets/banners";
  import { player } from "$lib/stores/player";
  import PaymentBanner from "$lib/components/PaymentBanner";

  const banners = [
    {
      title:
        "Get 250% Crypto Welcome Combo<br/>Bonus + 150 FreeSpins - UP TO <span style='color: #00bc3d; font-weight: bolder;'>1 BTC</span>",
      description: "",
      img: assets.londonB,
      img_mobile: assets.londonMB,
      front_img: assets.london,
      front_img_mobile: assets.londonM,
      action_label: "deposit",
      action_url: "my-account",
    },
  ];

  const blocks: any = [
    {
      title: "Top Live",
      type: "default",
      gameGroup: "live-casino",
      cols: 2,
    },
    {
      title: "Megaways",
      type: "big",
      gameGroup: "megaways",
    },
    {
      title: "Instant",
      type: "default",
      gameGroup: "mini-games",
      cols: 2,
    },
    // {
    //   title: "Scratchcards",
    //   type: "wide",
    //   gameGroup: "scratchcards",
    // },
    {
      title: "Table Games",
      type: "default",
      gameGroup: "table-games",
    },
  ];
  let blocksVisibility: any = [];

  let y: number = 0;

  let _refs: any = [];

  $: if (_refs.length) {
    onScroll(y);
  }
  function onScroll(y: number) {
    if (blocksVisibility.length > blocks.length) {
      return;
    }
    _refs.map((ref: any, i: number) => {
      if (
        !blocksVisibility.includes(i) &&
        y >= ref.offsetTop - window.innerHeight
      ) {
        blocksVisibility = [...blocksVisibility, i];
      }
    });
  }

  let isWagering = false;
  $: if ($player.bonus_balance_status) {
    isWagering = true;
  } else {
    isWagering = false;
  }
</script>

<svelte:window bind:scrollY={y} />

<svelte:head>
  <title>BCFUN | Embark on a Divine Journey to Riches!</title>
</svelte:head>

<div class="d-flex flex-column">
  <Slider {banners} />
  {#if isWagering}
    <GamesBlock
      title={"Bonus Wagering"}
      type={"big"}
      gameGroup={"bonus-wager"}
      cols={2}
    />
  {/if}
  <PaymentBanner />
  <GamesBlock
    title={"New Games"}
    type={"default"}
    gameGroup={"new-games"}
    cols={2}
  />
  <GamesBlock
    title={"Popular"}
    type={"default"}
    gameGroup={"popular"}
    cols={2}
  />
  <PromotionsBlock />
  <ProvidersBlock />
  <GamesBlock title={"Bonus Buy"} type={"big"} gameGroup={"bonus-buy"} />
  {#each blocks as block, index}
    <div bind:this={_refs[index]}>
      <GamesBlock {...block} visibility={blocksVisibility.includes(index)} />
    </div>
  {/each}
</div>
