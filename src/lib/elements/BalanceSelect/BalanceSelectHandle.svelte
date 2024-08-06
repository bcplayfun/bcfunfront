<script lang="ts">
  import { player } from "$lib/stores/player";
  import { selectedBalance } from "$lib/stores/static";
  import { getPrecisedAmount } from ".";
  import Icon from "./Icon.svelte";

  import giftIcon from "$lib/assets/icons/gift.svg";
  import { bonusBalance } from "$lib/stores/bonus";

  import Arrow from "../Icons/Arrow.svelte";
  import { go } from "../Profile";
  import { User } from "../Icons";
  import { breakpoints } from "$lib/utils/constants";
  import { browser } from "$app/environment";

  export let loading: boolean;
  export let visible: boolean;

  let isArrowUp = true;
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    isArrowUp = !isMenuOpen;
  }

  let isMobile = browser ? window.innerWidth < breakpoints.lg : false;
</script>

{#if loading}
  <div class="balance-select-handle skeleton" />
{:else}
  <div class="balance-select-handle">
    {#if Object.keys($bonusBalance).length && !$player.bonus_balance_status}
      <img src={giftIcon} alt="Bonus balance" class="gift-icon" />
    {/if}
    {#if Object.keys($bonusBalance).length && $player.bonus_balance_status}
      <div
        class="wrap"
        on:click
        on:keydown
        class:menu-open={isMenuOpen}
        on:click={toggleMenu}
        on:keydown
      >
        <div class="img-wrap">
          <img src={giftIcon} alt="Bonus balance" class="bonus-img" />
          <div class="currency-img">
            <Icon currencyId={$bonusBalance.currency_id} />
          </div>
        </div>
        <div class="amount">
          {getPrecisedAmount(parseFloat($bonusBalance?.amount))}
        </div>
        <div class={visible ? "arrow rotate" : "arrow"}>
          <Arrow direction="down" />
        </div>
      </div>
    {:else}
      <div
        class="wrap"
        class:menu-open={isMenuOpen}
        on:click
        on:click={toggleMenu}
        on:keydown
      >
        <div class="wrap-img">
          <Icon currencyId={$player.selected_currency_id} />
        </div>
        <div
          class="amount"
          class:has-balance={parseFloat($selectedBalance?.amount) > 0}
        >
          {getPrecisedAmount(parseFloat($selectedBalance?.amount))}
        </div>
        <div class={visible ? "arrow rotate" : "arrow"}>
          <Arrow direction="down" />
        </div>
      </div>
    {/if}
  </div>
  <div
    class="wallet"
    on:click={() => {
      if (isMobile) {
        go("dashboard", "navigation");
      } else {
        go("dashboard", "my-account");
      }
    }}
    on:keydown
  >
    <User fill="white" />
  </div>
{/if}

<style lang="scss">
  .gift-icon {
    position: absolute;
    width: 24px;
    top: -12px;
    left: -12px;

    animation: tilt-shaking 0.5s;
    animation-iteration-count: infinite;
    pointer-events: none;
  }

  @keyframes tilt-shaking {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(0eg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  .wallet {
    background-color: var(--brand-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 12px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    height: 40px;
    min-width: 40px;
    @media (max-width: 768px) {
      font-size: 10px;
      height: 40px;
    }
    &:hover {
      filter: brightness(1.2);
    }
  }
  .balance-select-handle {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    cursor: pointer;
    z-index: 0;
    border: 1px solid var(--brand-stroke);
    border-radius: 8px 0 0 4px;
    transition: all 0.3s;
    &:hover {
      border-color: white;
      filter: none;
    }
    &.skeleton {
      width: 160.27px;
      border: none;
      @media (max-width: 768px) {
        width: 126.66px;
      }
      &:before {
        display: none;
      }
    }
  }

  .bonus-img {
    height: 15px;
    width: 15px;
    margin-right: 8px;
  }

  .wrap {
    display: flex;
    align-items: center;
    padding: 8px 20px;
    height: 40px;

    @include media.down(sm) {
      padding: 12px 6px;
    }
  }
  .wrap-img {
    width: 15px;
    height: 15px;
    margin-right: 8px;
  }
  .amount {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
    margin-right: 10px;
  }

  .img-wrap {
    position: relative;
  }
  .currency-img {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 7px;
    left: -2px;
  }
  .arrow {
    transition: transform 0.3s ease;
  }

  .arrow.rotate {
    transform: rotate(180deg);
  }
</style>
