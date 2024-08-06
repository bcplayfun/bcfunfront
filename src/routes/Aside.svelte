<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Search, Burger } from "$lib/elements/Icons";
  import { isAsideOpen } from "$lib/stores/website";
  import clickOutside from "$lib/utils/clickOutside";
  import * as assets from "$lib/elements/Icons";
  import { openModal } from "$lib/elements/Modal";
  import SearchModal from "$lib/elements/Modals/Search/SearchModal.svelte";
  import logo from "$lib/assets/logo.png";
  import logoMobile from "$lib/assets/logo-mobile.png";

  function toggleAside() {
    if (!$isAsideOpen) {
      isAsideOpen.set(true);
    } else {
      isAsideOpen.set(false);
    }
  }

  let menuRef: HTMLDivElement;
  type MenuItem = {
    icon: any;
    name: string;
    url: string;
    disabled?: boolean;
  };

  const mainMenu: MenuItem[] = [
    { icon: assets.Home, name: "home", url: "/" },
    { icon: assets.SlotMachine, name: "slots", url: "/slots" },
    { icon: assets.Live, name: "live casino", url: "/live" },
    { icon: assets.Games, name: "mini games", url: "/mini" },
    { icon: assets.Promotions, name: "promotions", url: "/promotions" },
  ];
  const secondaryMenu: MenuItem[] = [
    { icon: assets.Rewards, name: "Rewards", url: "/rewards", disabled: true },
    // { icon: assets.VIP, name: "VIP", url: "/vip", disabled: true },
    // {
    //   icon: assets.PaymentOptions,
    //   name: "payment options",
    //   url: "/payment-options",
    // },
    { icon: assets.FAQ, name: "faq", url: "/faq" },
    { icon: assets.GetInTouch, name: "get in touch", url: "/contact-us" },
    {
      icon: assets.Security,
      name: "Security & Privacy policy",
      url: "/privacy",
    },
    // { icon: assets.About, name: "About us", url: "/about" },
  ];

  let offsetTop = 0;
  let scrollTop = 0;
  let enter = false;
  let tooltipText = "";

  function mouseEnter(e: any, item: MenuItem) {
    enter = true;
    offsetTop = e.target.offsetTop - menuRef.scrollTop;
    tooltipText = item.name;
  }

  function mouseLeave() {
    enter = false;
  }

  function openSearch() {
    isAsideOpen.set(false);
    openModal(SearchModal, "Search", {}, { type: "new" });
  }

  // $: if (isClient && $isAsideOpen) {
  //   document.body.classList.add("unscrollable");
  // } else if (isClient) {
  //   document.body.classList.remove("unscrollable");
  // }
</script>

<aside class="sidebar-container" class:open={$isAsideOpen}>
  <div class="overlay" class:open={$isAsideOpen} />
  <div
    class="sidebar"
    class:open={$isAsideOpen}
    use:clickOutside
    on:click_outside={() => isAsideOpen.set(false)}
  >
    <div
      class="top"
      on:click={() => toggleAside()}
      on:keydown={() => toggleAside()}
    >
      <div class="burger">
        <Burger fill={"white"} width={"20px"} height={"20px"} />
      </div>
      <div class="logo">
        <img src={logo} alt="BCFUN logo" class="logo-desktop" />
        <img src={logoMobile} alt="BCFUN logo" class="logo-mobile" />
      </div>
    </div>
    <div
      class="search underline"
      on:click={() => openSearch()}
      on:keydown={() => openSearch()}
    >
      <div class="wrap">
        <div class="icon">
          <Search />
        </div>
        <span class="text"> Search </span>
      </div>
    </div>
    <div class="wrap-menu">
      <div bind:this={menuRef} class="overflow">
        <ul class="menu underline">
          {#each mainMenu as item}
            <li
              class={`${$page.url.pathname === item.url && "active"}`}
              on:mouseenter|stopPropagation={() => mouseEnter(event, item)}
              on:mouseleave={() => mouseLeave()}
              on:click={() => {
                goto(item.url);
                isAsideOpen.set(false);
              }}
              on:keydown
            >
              <div class="icon">
                <svelte:component this={item.icon} fill={"white"} />
              </div>
              <span class="text">
                {item.name}
              </span>
            </li>
          {/each}
        </ul>
        <ul class="secondary-menu">
          {#each secondaryMenu as item}
            <li
              class={`${$page.url.pathname === item.url && "active"}`}
              class:disabled={item.disabled}
              on:mouseenter={() => mouseEnter(event, item)}
              on:mouseleave={() => mouseLeave()}
              on:click={() => {
                goto(item.url);
                isAsideOpen.set(false);
              }}
              on:keydown
            >
              <div class="icon">
                <svelte:component this={item.icon} />
              </div>
              <span class="text">
                {item.name}
              </span>
            </li>
          {/each}
        </ul>
      </div>
      <div class="tooltip" class:hover={enter} style:top={`${offsetTop}px`}>
        {tooltipText}
      </div>
    </div>
  </div>
</aside>

<style lang="scss">
  .label {
    font-size: 14px;
    font-weight: 600;
    color: var(--cp-grey);
  }
  .underline {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
      background-color: var(--brand-stroke);
    }
  }
  aside {
    position: fixed;
    width: 65px;
    height: 100%;
    z-index: 99;
    @media (max-width: 992px) {
      width: 0;
      overflow: hidden;
    }
    &.open {
      width: 100%;
      .sidebar {
        left: 0;
      }
    }
    .overlay {
      width: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      top: 0;
      left: 0;
      height: 100%;
      z-index: 1;
      display: none;
      &.open {
        display: block;
      }
    }
    .sidebar {
      position: absolute;
      width: 65px;
      height: 100%;
      background: rgba(33, 38, 51, 0.9);
      left: 0;
      top: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      /* transition: 0.2s linear; */
      @media (max-width: 992px) {
        left: -100%;
      }
      .top {
        cursor: pointer;
        min-height: 73px;
        display: flex;
        justify-content: center;
        align-items: center;
        .burger {
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(180deg);
          @media (max-width: 992px) {
            margin-right: 12px;
            border: 1px solid var(--brand-stroke);
          }
          &:hover {
            background-color: var(--brand-primary);
          }
        }
        .logo {
          user-select: none;
          width: 140px;
          cursor: pointer;
          display: none;
          @media (max-width: 992px) {
            display: flex;
          }
          @media (max-width: 768px) {
            width: 40px;
          }
          img {
            width: 100%;
          }
          .logo-desktop {
            @media (max-width: 992px) {
              display: flex;
            }
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
      }
      .search {
        width: 40px;
        padding: 0 0 14px;
        margin: 0 auto 14px;
        .wrap {
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &:hover {
            background-color: var(--brand-primary);
            border-color: var(--brand-primary);
          }
          .icon {
            width: 40px;
            display: flex;
            justify-content: center;
          }
        }
        .text {
          font-weight: 600;
          color: white;
          display: none;
        }
      }
      .wrap-menu {
        display: flex;
        flex-direction: column;
        flex: 1 0 0;
        position: relative;
        .tooltip {
          position: absolute;
          height: 40px;
          border-radius: 8px;
          background: white;
          color: var(--black);
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          white-space: nowrap;
          display: flex;
          align-items: center;
          padding: 0 10px;
          left: calc(100% + 15px);
          transition: 0.2s ease-in-out;
          opacity: 0;
          visibility: hidden;
          &:before {
            content: "";
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;

            border-right: 14px solid white;
            position: absolute;
            left: -5px;
          }
          &.hover {
            opacity: 1;
            visibility: visible;
          }
          @media (max-width: 992px) {
            display: none;
          }
        }
        .overflow {
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1 0 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          @media (max-width: 992px) {
            padding-right: 15px;
          }
        }
      }
      .menu {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0 0 14px;
        li {
          font-size: 15px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          width: 40px;
          height: 40px;
          &:hover,
          &.active {
            background: var(--brand-primary);
            border-color: var(--brand-primary);
          }
          &:last-of-type {
            padding-bottom: 0;
          }
          .icon {
            width: 40px;
            display: flex;
            justify-content: center;
          }
        }
        .text {
          opacity: 0;
          width: 0;
          visibility: hidden;
          white-space: nowrap;
        }
      }
      .secondary-menu {
        display: flex;
        flex-direction: column;
        padding-top: 14px;
        gap: 8px;
        margin-bottom: 10px;
        li {
          text-transform: capitalize;
          cursor: pointer;
          color: var(--gray);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          width: 40px;
          height: 40px;

          &.disabled {
            pointer-events: none;
          }
          &:hover,
          &.active {
            background-color: var(--cp-grey-light-2);
          }
          .icon {
            width: 40px;
            display: flex;
            justify-content: center;
          }
        }
        .text {
          opacity: 0;
          width: 0;
          visibility: hidden;
          white-space: nowrap;
        }
      }
      &.open {
        align-items: flex-start;
        padding: 0 0 0 10px;
        width: 315px;
        @media (max-width: 992px) {
          width: 100%;
          padding: 0 0 0 15px;
        }

        .burger {
          transform: rotate(0);
        }
        .search {
          width: 100%;
          .wrap {
            width: 100%;
          }
          .text {
            display: block;
            flex: 1 0 0;
          }
        }
        .wrap-menu {
          width: 100%;
          .overflow {
            padding-right: 10px;
          }

          ul {
            width: 100%;

            li {
              width: 100%;
              .text {
                opacity: 1;
                width: 100%;
                visibility: visible;
              }
            }
          }
        }
        .tooltip {
          display: none;
        }
      }
    }
  }
</style>
