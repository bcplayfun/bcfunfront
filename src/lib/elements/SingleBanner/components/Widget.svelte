<script lang="ts">
  import Button from "$lib/elements/Button";
  import { currencies } from "$lib/stores/static";
  import Dropdown from "./Dropdown.svelte";
  import Icon from "$lib/components/Profile/components/BalanceSelect/Icon.svelte";
  import * as assets from "./assets";
  import { openModal } from "$lib/elements/Modal";
  import Register from "$lib/elements/Modals/Register/Register.svelte";

  let activeCurrencyID: number = 0;

  let promo_code = "";

  function openRegister() {
    localStorage.removeItem("bonus_id");
    localStorage.removeItem("promo_code");
    // if (activePack.bonus_id) {
    //   localStorage.setItem("bonus_id", activePack.bonus_id.toString());
    // } else if (activePack.key === "promo") {
    //   localStorage.setItem("promo_code", promo_code);
    // }
    openModal(Register, "Sign up", {}, { type: "new" });
  }

  let fillForm = {
    amount: "5",
  };

  function selectSuggestion(val: number) {
    fillForm.amount = val.toString();
  }
</script>

<div class="widget">
  <div class="title">Quick Deposit & Play</div>
  <Dropdown bind:activeCurrencyID />
  <!-- {#if activePack.currency === "BRL"}
    <Input
      type="number"
      bind:value={fillForm.amount}
      placeholder="Amount"
      nativePlaceholder="5"
    >
      <div class="min-deposit" style:font-weight="500">
        Min. Deposit: {activePack.min_deposit} BRL
      </div>
    </Input>
    <div class="suggestions">
      {#each suggestions as suggestion}
        <div
          class="item"
          class:active={parseInt(fillForm.amount) == suggestion}
          on:click={() => selectSuggestion(suggestion)}
          on:keydown
        >
          {suggestion}
        </div>
      {/each}
    </div>
  {/if}
  {#if activePack.key === "promo"}
    <Input bind:value={promo_code} type="text" placeholder="Promo code" />
    <div class="text" style:margin-top="10px">
      {@html activePack.description}
    </div>
  {/if}
  {#if "description" in activePack && activePack.key !== "promo"}
    <div class="text" style:margin-top="37.5px">
      {@html activePack.description}
    </div>
  {/if} -->
  <div class="mt-auto">
    <Button
      w100
      size="large"
      transform="uppercase"
      on:click={() => openRegister()}>Start Playing</Button
    >
  </div>
  <div class="methods mb-10 gap-10 justify-center">
    <!-- <div class="item d-flex justify-flex-end" style:width="48%">
      <img src={assets.pixFull} alt="pix" width="100px" />
    </div> -->
    <div class="item d-flex items-center justify-center" style:width="100%">
      <img src={assets.moonpay} alt="moonpay" width="100px" />
    </div>
    {#if $currencies.length}
      {#each $currencies.filter((c) => c.is_crypto) as currency}
        <div class="item">
          <Icon currencyId={currency.id} />
        </div>
      {/each}
    {:else}
      {#each Array(9) as _}
        <div class="item loading"></div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .text {
    font-size: 14px;
    color: white;
    text-align: center;
    font-weight: 500;
  }
  .widget {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 80%;
    background: var(--dialog-background-color);
    transition: 0.3s ease-in-out;
    border-radius: 8px;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .title {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      margin: 10px 0 10px;
    }
    .sub-title {
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }
    .methods {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .item {
        width: 30px;
        height: 30px;
        &.loading {
          border-radius: 50%;
          background-color: #394f69;
        }
      }
    }
  }
  .min-deposit {
    color: var(--brand-primary);
    font-size: 12px;
    font-weight: 600;
    line-height: 120%;
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    right: 12px;
    bottom: -6px;
    background-color: var(--dialog-background-color);
    padding: 1px 5px;
    font-size: 10px;

    @include media.down(md) {
      font-size: 10px;
      gap: 4px;
      img {
        width: 13px;
      }
    }
  }
  .suggestions {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    .item {
      background-color: transparent;
      border: 1px solid var(--input-border-color);
      border-radius: 8px;
      text-align: center;
      padding: 10px 0;
      font-weight: 500;
      font-size: 14px;
      transition: 0.1s ease-in-out;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: transparent;
        border-color: var(--input-primary-highlight);
      }
    }
  }
</style>
