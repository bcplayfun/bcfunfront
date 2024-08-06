<script lang="ts">
  import { fade } from "svelte/transition";
  import {
    TAB_KEY_TO_COMPONENT,
    type SettingsNavKey,
    TEST_KEYS,
    TABS,
  } from ".";
  import { browser } from "$app/environment";
  import { onDestroy, onMount } from "svelte";

  import * as Assets from "./assets";
  import { go } from "$lib/elements/Profile";

  let activeTab: SettingsNavKey = "navigation";

  let renderedComponent = TAB_KEY_TO_COMPONENT[activeTab];
  $: if (activeTab) {
    renderedComponent = TAB_KEY_TO_COMPONENT[activeTab];
  }
  $: componentToRender = TAB_KEY_TO_COMPONENT[activeTab];

  function onAutroEnd() {
    renderedComponent = TAB_KEY_TO_COMPONENT[activeTab];
  }

  onMount(() => {
    var queryParams = window.location.search.substring(1).split("&");
    let [param] = queryParams.filter((param) => param.includes("settings="));

    if (param && TEST_KEYS.includes(param.split("settings=")[1])) {
      activeTab = param.split("settings=")[1] as SettingsNavKey;
    }
  });

  if (browser) {
    window.addEventListener("pushstatechange", handlePushstateChange);
    window.addEventListener("popstate", handlePushstateChange);
  }

  function handlePushstateChange() {
    var queryParams = window.location.search.substring(1).split("&");
    let [param] = queryParams.filter((param) => param.includes("settings="));

    if (param && TEST_KEYS.includes(param.split("settings=")[1])) {
      activeTab = param.split("settings=")[1] as SettingsNavKey;
    } else {
      activeTab = "navigation";
    }
  }

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("pushstatechange", handlePushstateChange);
    }
  });
</script>

<div class="component-title">
  {#if activeTab !== "navigation"}
    <div
      class="back"
      on:click|stopPropagation={() => {
        go("dashboard", "settings");
      }}
      on:keydown
    >
      <img src={Assets.BackIcon} alt="" />
      Back
    </div>
  {/if}
  {$TABS.find((tab) => tab.key === activeTab)?.label}
</div>
<div class="component">
  {#if renderedComponent === componentToRender}
    <div
      class="child"
      transition:fade|local={{ duration: 150 }}
      on:outroend={onAutroEnd}
    >
      <svelte:component this={TAB_KEY_TO_COMPONENT[activeTab]} />
    </div>
  {/if}
</div>

<style lang="scss">
  .back {
    position: absolute;
    gap: 10px;
    top: 0;
    left: 0;
    width: 70px;
    height: 33px;
    display: flex;
    align-items: center;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    z-index: 9;
    background-color: var(--dialog-background-color);

    /* @include media.down(md) {
      left: 4px;
    } */
  }
  .component {
    position: relative;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
  }
  .child {
    padding-right: 15px;
    flex: 1 0 0;
    overflow: auto;
    &::-webkit-scrollbar-track {
      flex: 1 0 0;
    }
  }
</style>
