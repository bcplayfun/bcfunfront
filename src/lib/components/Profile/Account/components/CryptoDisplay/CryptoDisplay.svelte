<script lang="ts">
  import Qr from "$lib/elements/Qr.svelte";
  import * as assets from "$lib/components/Profile/assets";
  import type { Balance } from "$lib/types/player";
  import { CONFIRMATIONS_LIMITS } from "$lib/utils/currency";
  import { copyString } from "$lib/utils/string";

  export let selectedBalance: Balance | undefined;

  export let onResetDepositAddress: () => void;

  function selectAddress(e: any) {
    e.target.select();
  }

  $: selectedAddress = selectedBalance?.address || null;
</script>

<div class="address-display">
  {#if selectedAddress}
    <div class="title">
      <span>
        Your
        <span style:font-weight="700" style:color="#00BC3D"
          >{selectedBalance && selectedBalance.currency.name}</span
        >
        Deposit address
      </span>
    </div>
    <div class="address-wrapper">
      <input
        bind:value={selectedAddress}
        on:focus={(e) => selectAddress(e)}
        type="text"
        class="address"
        readonly
      />
    </div>
    <div class="d-flex gap-8">
      <div class="d-flex flex-column justify-space-between">
        <span class="min-deposit">
          Min. Deposit: {selectedBalance &&
            CONFIRMATIONS_LIMITS[selectedBalance.currency.code].min_deposit}
        </span>
        <div class="hint">
          Please send only <span style:font-weight="700" style:color="#00BC3D"
            >{selectedBalance && selectedBalance.currency.name}</span
          >
          to the specified address.
          <span style:font-weight="700" style:color="#00BC3D"
            >{selectedBalance &&
              CONFIRMATIONS_LIMITS[selectedBalance.currency.code].confirmations}
            confirmation</span
          > is required to confirm receipt. Do not send any other cryptocurrencies.
          Thank you for your cooperation.
        </div>
        <div class="action-buttons d-flex">
          <button
            on:click={() => copyString(selectedAddress, "address")}
            class="primary"
          >
            Copy
            <img src={assets.copy} alt="Copy address" />
          </button>
          <button on:click={() => onResetDepositAddress()} class="grey"
            >Reset
            <img src={assets.reset} alt="Copy address" /></button
          >
        </div>
      </div>
      <div class="qr-section">
        {#if selectedAddress}
          <Qr className="qrcode" size={"150"} value={selectedAddress} />
        {:else}
          <img src={assets.mockQR} alt="Select currency and network" />
        {/if}
      </div>
    </div>
  {:else}
    <div class="title-info text-center">
      <!-- and network -->
      In order to deposit, you need to select the currency
    </div>
  {/if}
</div>

<style lang="scss">
  .qr-section {
    min-width: 150px;
    height: 150px;
    border-radius: 8px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    @include media.down("md") {
      display: none;
    }
  }
  .hint {
    font-size: 11px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
  }

  .min-deposit {
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    @include media.down("md") {
      font-size: 13px;
      margin: 5px auto 0;
    }
  }

  .address-display {
    display: flex;
    gap: 15px;
    flex-direction: column;
    flex-wrap: wrap;
    @include media.down(md) {
      width: 100%;
    }
  }

  .title {
    color: #fff;
    font-weight: 600;
    line-height: 120%;
    text-transform: capitalize;
    font-size: 14px;
    display: flex;
    justify-content: center;
    @include media.down("md") {
      margin: 0 auto 10px;
    }
  }

  .title-info {
    color: #fff;
    font-weight: 600;
    line-height: 120%;
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    height: 44px;
    @include media.down("md") {
      position: relative;
      margin: 10px auto 0;
    }
  }

  .generate-mobile {
    cursor: pointer;
    color: #a9a9a9;
    font-size: 12px;
    font-weight: 600;
    line-height: 120%; /* 14.4px */
    text-decoration-line: underline;
  }

  .address {
    width: 100%;
    color: #a9a9a9;
    background-color: transparent;
    border: 0;
    font-weight: 600;
    line-height: 120%;
    font-size: 13px;
    text-align: center;
    @include media.down("md") {
      font-size: 12px;
      text-align: center;
      padding-left: 0;
    }
  }

  .address-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--layer-1);
    height: 44px;
    border-radius: 8px;
    width: 100%;
    padding: 0 10px;
    @include media.down("md") {
      justify-content: center;
      padding-left: 0;
      height: 40px;
    }
  }

  .address-section {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    @include media.down("md") {
      gap: 0;
      width: 100%;
    }
  }

  button {
    flex: 0 0 49%;
    height: 44px;
    flex-shrink: 0;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: 120%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0 10px;
    transition: 0.2s ease-in-out;
    outline: 2px solid transparent;
    @include media.down(md) {
      font-size: 12px;
      height: 40px;
    }

    &.grey {
      background-color: transparent;
      border: 1px solid var(--brand-stroke);
      &:hover {
        border-color: white;
        filter: none;
      }
    }

    &.primary {
      background-color: rgba(0, 139, 44, 0.7);
      background-image: conic-gradient(
        from 1turn,
        rgb(0, 188, 61),
        rgb(0, 139, 44)
      );
      &:hover {
        filter: brightness(1.1);
        outline: 2px solid #29292f;
      }
    }

    img {
      height: 12px;
    }
  }
</style>
