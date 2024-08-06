<script lang="ts">
  import gift from "./assets/gift.svg";
  import Icon from "$lib/elements/CurrencySelect/Icon.svelte";
  import { isJsonString } from "$lib/utils/string";

  import Switch from "$lib/elements/Switch/Switch.svelte";

  export let selectedCurrency: any;
  export let activeBonus: any;

  export let onChange: (val: string) => void;

  let sliderValue: string = "on";
  $: {
    onChange(sliderValue);
  }
</script>

<div class="gift-box">
  <div class="d-flex items-center gap-16">
    <div class="icon">
      <img src={gift} class="gift" alt="gift box" />
      {#if selectedCurrency?.id}
        <div class="c-image">
          <Icon currencyId={selectedCurrency.id} />
        </div>
      {/if}
    </div>
    <div class="info">
      <h4>
        {#if isJsonString(activeBonus.name)}
          {@html JSON.parse(activeBonus.name)}
        {:else}
          {@html activeBonus.name}
        {/if}
      </h4>
      <p>
        {#if isJsonString(activeBonus.description)}
          {@html JSON.parse(activeBonus.description)}
        {:else}
          {@html activeBonus.description}
        {/if}
      </p>
    </div>
  </div>
  <div class="d-flex">
    <Switch bind:value={sliderValue} fontSize={20} design="slider" />
  </div>
</div>

<style lang="scss">
  .gift-box {
    --height: 90px;

    border-radius: 8px;
    height: var(--height);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;

    z-index: 0;
    border: 1px solid #545463;
    transition: all 0.2s ease-in-out;

    padding: 0 15px;

    @include media.down(md) {
      padding: 0 10px;
    }

    .icon {
      position: relative;
      @include media.down(md) {
        display: none;
      }
      .gift {
        width: 40px;
        height: 40px;
      }
      .c-image {
        width: 25px;
        height: 25px;
        position: absolute;
        bottom: -5px;
        right: -5px;
        z-index: 9;
      }
    }

    .info {
      display: flex;
      flex-direction: column;

      h4 {
        font-size: 15px;
        @include media.down(md) {
          display: none;
        }
      }
      p {
        color: var(--text-secondary);
        font-size: 13px;
        max-width: 300px;
      }
    }
  }
</style>
