<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Button from "$lib/elements/Button/Button.svelte";
  import { openModal } from "$lib/elements/Modal";
  import Login from "$lib/elements/Modals/Login";
  import Register from "$lib/elements/Modals/Register";
  import { isLoggedIn, player } from "$lib/stores/player";

  import BalanceSelect from "$lib/elements/BalanceSelect";
  import logo from "$lib/assets/logo-test.png";
  import logoMobile from "$lib/assets/logo-mobile.png";
  import { selectedBalance } from "$lib/stores/static";

  import { isAsideOpen } from "$lib/stores/website";
  import * as assets from "$lib/elements/Icons";
  import SearchModal from "$lib/elements/Modals/Search/SearchModal.svelte";
  import Search from "$lib/elements/Icons/Search.svelte";
  import { comingTransaction } from "$lib/stores/payments";
  import BonusWheel from "$lib/elements/BonusWheel";
  import Addon from "$lib/elements/BonusWheel/Addon.svelte";

  const menuItems = [
    {
      icon: assets.Home,
      name: "home",
      url: "/",
    },
    {
      icon: assets.SlotMachine,
      name: "slots",
      url: "/slots",
    },
    {
      icon: assets.Live,
      name: "live casino",
      url: "/live",
    },
    {
      icon: assets.Games,
      name: "mini games",
      url: "/mini",
    },
    {
      icon: assets.Promotions,
      name: "promos",
      url: "/promotions",
    },
  ];

  function openSignIn() {
    openModal(Login, "Log in", {}, { type: "new" });
  }
  function openSignUp() {
    openModal(Register, "Sign up", {}, { type: "new" });
  }
  let scrollY: number;
  let toggleDropdown: boolean = false;

  function openSearch() {
    isAsideOpen.set(false);
    openModal(SearchModal, "Search", {}, { type: "new" });
  }

  $: if (!$isLoggedIn) {
    toggleDropdown = false;
  }

  $: $selectedBalance = $player.real_balances.find(
    (balance) => balance.currency_id === $player.selected_currency_id
  )!;

  const gameUrl = `/game/`;

  function openWheel() {
    openModal(
      BonusWheel,
      "",
      {
        tries:
          $player?.wheel_spin?.find((item) => item.wheel_type_id === 3)
            ?.total_tickets || 0,
        activeTab: 3,
        cb: () => {},
      },
      { type: "blank" }
    );
  }
</script>

<svelte:window bind:scrollY />

<header class={`${scrollY > 0 && "scroll"}`}>
  <div
    class="d-flex items-center flex-row
    {$page.url.pathname.includes(gameUrl)
      ? 'container-fluid px-16'
      : 'container mx-auto'}"
  >
    <div class="logo" on:click={() => goto("/")} on:keydown>
      <img src={logo} alt="bcfun logo" class="logo-desktop" />
      <img src={logoMobile} alt="bcfun logo" class="logo-mobile" />
    </div>
    <nav>
      <ul>
        {#each menuItems as item}
          <li
            class={`${$page.url.pathname === item.url && "active"}`}
            class:level={item.name === "level up"}
          >
            <a
              data-sveltekit-preload-data="hover"
              href={item.url}
              style:width="100%"
              style:height="100%"
              style:color="inherit"
              style:text-decoration="none"
            >
              <!-- {#if item.name === "level up"}{/if} -->
              {item.name}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
    <div class="wheel-container me-12" on:click={() => openWheel()} on:keydown>
      <Addon />
    </div>
    <div class="search me-12" on:click={() => openSearch()} on:keydown>
      <Search />
    </div>
    {#if $isLoggedIn}
      {#if $selectedBalance && $player.real_balances}
        <div class="balance-wrap">
          {#if $comingTransaction && !toggleDropdown}
            <div class="coming" />
          {/if}
          <BalanceSelect isListFixedOnSM />
        </div>
      {/if}
    {:else}
      <div class="auth gap-12">
        <Button background="transparent" on:click={openSignIn}
          >{"Log in"}</Button
        >
        <Button background="blue" on:click={openSignUp}>{"Sign up"}</Button>
      </div>
    {/if}
  </div>
</header>

<style lang="scss">
  .select {
    @include media.down(md) {
      display: none;
    }
  }
  :global(.search-icon) {
    fill: #9698a1;
  }
  header {
    width: 100%;
    background: var(--layer-0);
    position: fixed;
    display: flex;
    z-index: 9;
    flex-direction: column;

    padding: 10px 0;

    transition: 0.2s ease-in-out;

    &.shrink {
      width: calc(100% - 350px);
    }
    @media (max-width: 992px) {
      /* padding: 0 15px; */
    }
    .chat {
      cursor: pointer;

      position: relative;

      .dot {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--green);
        top: -2px;
        right: -2px;
      }
    }
    .search {
      cursor: pointer;
      border-radius: 8px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      // border: 1px solid var(--brand-stroke);
      transition: 0.2s ease-in-out;
      &:hover {
        filter: brightness(1.2);
      }
    }
    .wheel-container {
      position: relative;
      @media (max-width: 992px) {
        margin-left: auto;
      }
    }
    .vip-container {
      position: relative;
      margin-left: auto;
      @media (max-width: 992px) {
        display: none;
      }
    }
    .logo {
      user-select: none;
      width: 100px;
      cursor: pointer;
      position: relative;
      @media (max-width: 768px) {
        width: 40px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .logo-desktop {
        display: flex;
        @media (max-width: 768px) {
          display: none;
        }
      }
      .logo-mobile {
        display: none;
        @media (max-width: 768px) {
          display: block;
        }
      }
    }
    .auth {
      display: flex;
      justify-content: flex-end;
      @media (max-width: 992px) {
        width: initial;
      }
    }
    nav {
      display: flex;
      padding-top: 0;
      margin: 0 0 0 15px;
      flex: 1 0 0;
      transition: 0.2s ease-in-out;
      @media (max-width: 992px) {
        display: none;
      }
      ul {
        display: flex;
        align-items: center;
        gap: 10px;
        @media (max-width: 1200px) {
          gap: 10px;
        }
      }
    }
    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-right: 10px;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--gray);
      font-size: 13px;
      border-radius: 8px;
      gap: 10px;
      @include media.down(xl) {
        margin-right: 5px;
        font-size: 12px;
      }
      a {
        padding: 5px 10px;
        @include media.down(xl) {
          padding: 5px;
        }
      }
      &.level {
        color: var(--brand-primary);
      }
      &.active {
        background-color: var(--brand-primary);
        color: white;
        pointer-events: none;
      }
      &:hover {
        filter: brightness(1.4);
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
    .game-menu {
      display: flex;
      align-items: center;
      flex: 1 0 0;
      padding-left: 15px;
      li {
        background-color: transparent;
        padding: 0 5px;
        transition: 0.2s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
  .profile-button {
    width: 40px;
    height: 40px;
    color: white;
    border: 2px solid var(--brand-stroke);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 500;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    transition: filter 0.3s ease;
    &:hover {
      filter: brightness(1.2);
    }
    &:after {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      border-bottom: 2px solid var(--dropdown-indicator-color);
      border-left: 2px solid var(--dropdown-indicator-color);
      transform: rotate(-45deg);
      transition: transform 0.3s ease;
      right: -15px;
      display: none;
    }
  }
  .coming {
    position: absolute;
    left: -4px;
    top: -4px;
    width: 10px;
    height: 10px;
    background-color: var(--yellow);
    border-radius: 50%;
    z-index: 99;
    animation: coming 1.5s ease-in-out infinite;
  }
  @keyframes coming {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }
  .balance-wrap {
    display: flex;
    align-items: center;
    position: relative;
  }
</style>
