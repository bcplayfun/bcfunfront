<script lang="ts">
  import { player } from "$lib/stores/player";
  import { configToQuerystring, getConfig } from ".";
  import { onMount } from "svelte";
  import CircleLoading from "$lib/elements/Button/CircleLoading.svelte";
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";

  let source = ``;
  let selectedBalance = $player.real_balances.find(
    (balance) => balance.currency.name === "USDTT"
  );

  onMount(() => {
    init(selectedBalance);
  });

  async function generateAddress(currency: string) {
    const [_, err] = await api.players.setAddress(currency);
    if (err) {
      loading = false;
      return;
    }
    await api.players.info();
    selectedBalance = $player.real_balances.find(
      (balance) => balance.currency.name === "USDTT"
    );
    Alert.success(`The ${currency} address has been created`);
    init(selectedBalance);
  }

  let loading = false;
  async function init(balance: any) {
    loading = true;
    if (!balance) {
      return;
    }
    if (!balance.address) {
      await generateAddress(balance.currency.name);
      return;
    }
    const config = getConfig(
      balance.address!,
      balance.currency.code.toLowerCase()
    );

    source = `https://widget.changelly.com?${configToQuerystring(config)}`;
  }

  function handleOnLoad() {
    loading = false;
  }
</script>

<div class="changelly">
  {#if loading}
    <div class="loading">
      <CircleLoading size="40px" />
    </div>
  {/if}
  <iframe
    title="Changelly"
    width="100%"
    height="400px"
    frameborder="none"
    allow="camera"
    src={source}
    on:load={handleOnLoad}>Can't load widget</iframe
  >
</div>

<style lang="scss">
  .changelly {
    min-width: 500px;
    min-height: 400px;
    padding: 32px 15px 0;

    @include media.down(md) {
      min-width: 350px;
    }

    iframe {
      border-radius: 8px;
      /* opacity: 0;
      visibility: hidden;
      transition: 0.2s ease-in-out;
      &.loading {
        opacity: 1;
        visibility: visible;
      } */
    }

    .loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .error {
    margin-top: 10px;
    color: #ffffffa1;
    font-size: 14px;
    margin-bottom: -8px;
    display: flex;
    gap: 8px;
    align-items: flex-start;

    img {
      display: inline;
      max-width: none;
      margin-top: 2px;
    }

    span {
      text-align: left;
    }
  }
</style>
