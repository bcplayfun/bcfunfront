<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import Cookies from "js-cookie";
  import { TABS, type ProfileNavKey, go } from "..";
  import { isLoggedIn } from "$lib/stores/player";
  import { isProfileVisible } from "$lib/stores/website";

  export let activeTab: ProfileNavKey;

  $: activeTabIndex = $TABS.findIndex((tab) => tab.key === activeTab);

  async function logout() {
    const [_, error] = await api.auth.logout();
    if (!error) {
      isProfileVisible.set(false);
      Cookies.remove("auth");
      isLoggedIn.set(false);
      goto("/");
    }
  }
</script>

<div class="tabs">
  {#each $TABS as tab, i}
    {#if i !== 0}
      <div
        class="tab"
        class:active={activeTabIndex === i}
        class:mt-20={tab.mt ? true : false}
        on:click={() => {
          go("dashboard", tab.key);
        }}
        on:keydown
      >
        <div class="inner">
          <div
            class="icon"
            style:background-color={tab.bg ? tab.bg : "#232c3b"}
          >
            <div class="svg">
              <svelte:component this={tab.icon} />
            </div>
          </div>
          {tab.label}
        </div>
      </div>
    {/if}
  {/each}
  <div
    class="tab mt-auto mb-10"
    style:height={"auto"}
    style:min-height={"initial"}
    on:click={logout}
    on:keydown
  >
    <div class="inner">Log out</div>
  </div>
</div>

<style lang="scss">
  .tabs {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 5px;
    margin-top: 20px;
  }

  .tab {
    position: relative;

    width: 100%;
    display: flex;
    align-items: center;

    color: #9c9cab;
    font-size: 14px;
    font-weight: 300;
    line-height: 140%;

    padding: 0 9px 0 0;
    height: 44px;
    min-height: 44px;

    cursor: pointer;

    &:hover {
      color: #fff;
    }

    @include media.down(md) {
      font-size: 15px;
      line-height: 20px;
    }

    .icon {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      .svg {
        height: 60%;
      }
    }

    .inner {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      gap: 10px;
      padding: 0 6px;
    }

    &.active {
      color: #fff;
      font-weight: 500;
      &:before {
        display: block;
      }
      .inner {
        border-radius: 8px;
        background: var(--layer-1);
        box-shadow: 0px 1px 7px -3px #18181d;
      }
    }
  }

  :global(.tab .colored) {
    fill: white;
  }
</style>
