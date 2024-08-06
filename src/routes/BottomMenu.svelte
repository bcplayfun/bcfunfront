<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import * as assets from "$lib/elements/Icons";

  const bottomMenu = [
    { icon: assets.Home, name: "home", url: "/" },
    { icon: assets.SlotMachine, name: "slots", url: "/slots" },
    { icon: assets.Live, name: "live", url: "/live" },
    { icon: assets.Live, name: "mini", url: "/mini" },
    { icon: assets.Promotions, name: "promos", url: "/promotions" },
  ];

  // let list: HTMLUListElement;
  // let scroll: any;

  // onMount(() => {
  //   checkScroll();
  // });

  // function resize() {
  //   checkScroll();
  // }

  // function checkScroll() {
  //   if (browser && list && list.scrollWidth > list.clientWidth) {
  //     return (scroll = true);
  //   } else if (browser && list) {
  //     return (scroll = false);
  //   }
  // }
</script>

<!-- <svelte:window on:resize={resize} /> -->

<nav class="bottom-menu">
  <!-- bind:this={list} -->
  <!-- class:scroll -->
  <ul>
    {#each bottomMenu as item}
      <li
        class={`${$page.url.pathname === item.url && "active"}`}
        class:vip={item.name === "vip"}
        on:click={() => goto(item.url)}
        on:keydown
      >
        <div class="icon">
          <svelte:component this={item.icon} fill={"white"} />
        </div>
        <div class="text">
          {item.name}
        </div>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  .bottom-menu {
    width: 100%;
    background: var(--layer-0);
    z-index: 9;
    position: fixed;
    bottom: 0;
    margin: 0 auto;
    transition: 0.3s ease-in-out;
    @media (min-width: 993px) {
      display: none;
    }
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      &.scroll {
        justify-content: flex-start;
      }
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--gray);
        font-size: 13px;
        padding: 8px;
        border-radius: 20px;
        white-space: nowrap;
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          opacity: 0.7;
        }
        &.vip {
          position: relative;
          top: -20px;
          background: var(--layer-0);
          border-radius: 50%;
        }
        &.active {
          color: var(--brand-primary);
          .icon {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
