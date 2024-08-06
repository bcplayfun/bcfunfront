<script lang="ts">
  import { TABS, type SettingsNavKey } from "..";
  import { go } from "$lib/elements/Profile";

  export let activeTab: SettingsNavKey;

  $: activeTabIndex = $TABS.findIndex((tab) => tab.key === activeTab);
</script>

<div class="tabs">
  {#each $TABS as tab, i}
    {#if i !== 0}
      <div
        class="tab"
        class:active={activeTabIndex === i}
        class:mt-20={tab.mt ? true : false}
        on:click={() => {
          go("settings", tab.key);
        }}
        on:keydown
      >
        <div class="inner">
          <div class="icon">
            <div class="svg">
              <svelte:component this={tab.icon} />
            </div>
          </div>
          {tab.label}
        </div>
      </div>
    {/if}
  {/each}
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

    background-color: #232c3b;
    border-radius: 8px;

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
      gap: 5px;
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
