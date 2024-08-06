<script lang="ts">
  import * as Assets from "./assets";
  import { fade } from "svelte/transition";
  import { TAB_KEY_TO_COMPONENT, type ProfileNavKey, TEST_KEYS, go } from ".";
  import Player from "./components/PlayerInfo.svelte";
  import { browser } from "$app/environment";
  import { isLoggedIn, player } from "$lib/stores/player";
  import { onDestroy, onMount } from "svelte";
  import { openModal } from "../Modal";
  import Login from "../Modals/Login/Login.svelte";
  import { isProfileVisible } from "$lib/stores/website";
  import api from "$lib/api";

  let activeTab: ProfileNavKey = "my-account";

  let renderedComponent = TAB_KEY_TO_COMPONENT[activeTab];
  $: if (activeTab) {
    renderedComponent = TAB_KEY_TO_COMPONENT[activeTab];
  }
  $: componentToRender = TAB_KEY_TO_COMPONENT[activeTab];

  function onAutroEnd() {
    renderedComponent = TAB_KEY_TO_COMPONENT[activeTab];
  }

  onMount(async () => {
    var queryParams = window.location.search.substring(1).split("&");
    let [param] = queryParams.filter((param) => param.includes("dashboard"));

    if (param && TEST_KEYS.includes(param.split("dashboard=")[1])) {
      isProfileVisible.set(true);
      activeTab = param.split("dashboard=")[1] as ProfileNavKey;
    }

    window.addEventListener("pushstatechange", handlePushstateChange);
    window.addEventListener("popstate", handlePushstateChange);
    window.addEventListener("keydown", closeOnEscape);
  });

  function handlePushstateChange() {
    var queryParams = window.location.search.substring(1).split("&");
    let [param] = queryParams.filter((param) => param.includes("dashboard"));

    if (param && TEST_KEYS.includes(param.split("dashboard=")[1])) {
      if (!$isProfileVisible) {
        isProfileVisible.set(true);
      }
      activeTab = param.split("dashboard=")[1] as ProfileNavKey;
    } else {
      isProfileVisible.set(false);
    }
  }

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("pushstatechange", handlePushstateChange);
      window.removeEventListener("popstate", handlePushstateChange);
      window.removeEventListener("keydown", closeOnEscape);
    }
  });

  function closeOnEscape(e: any) {
    if (e.key === "Escape") isProfileVisible.set(false);
  }

  $: if (browser && $isProfileVisible) {
    document.body.classList.add("unscrollable");
    api.players.info();
  } else if (browser) {
    document.body.classList.remove("unscrollable");
  }

  $: if (!$isLoggedIn && $isProfileVisible) {
    openModal(Login, "Log in", {}, { type: "new" });
  }
</script>

{#if $isLoggedIn && $isProfileVisible}
  <div
    class="backdrop"
    on:click={() => {
      window.history.pushState({}, "", window.location.pathname);
      const customEvent = new Event("pushstatechange", { bubbles: true });
      window.dispatchEvent(customEvent);
    }}
    on:keydown
  />
  <div class="modal-profile container-sm mx-auto">
    <div
      class="close-button"
      on:click={() => {
        window.history.pushState({}, "", window.location.pathname);
        const customEvent = new Event("pushstatechange", { bubbles: true });
        window.dispatchEvent(customEvent);
      }}
      on:keydown
    >
      <Assets.CloseIcon />
    </div>
    <div class="profile-wrapper">
      <!-- {#if activeTab === "navigation"}
        <div class="nav-title">
          {$TABS[0].label}
        </div>
      {/if} -->
      <div class="aside" class:check={activeTab !== "navigation"}>
        <Player />
        <svelte:component
          this={TAB_KEY_TO_COMPONENT["navigation"]}
          bind:activeTab
        />
      </div>
      {#if activeTab !== "navigation"}
        <div class="component">
          <div
            class="back"
            on:click={() => {
              go("dashboard", "navigation");
            }}
            on:keydown
          >
            <img src={Assets.back} alt="back icon" />
            Back
          </div>
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
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .back {
    position: absolute;
    gap: 10px;
    top: 15px;
    left: 15px;
    width: 70px;
    height: 33px;
    display: flex;
    align-items: center;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    z-index: 9;

    &:hover {
      filter: brightness(1.1);
    }

    @include media.up(md) {
      display: none;
    }
  }
  .container-sm {
    width: 100%;
    max-width: 750px;
  }
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999997;
  }
  .modal-profile {
    background-color: var(--dialog-background-color);
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    min-height: calc(100% - 200px);
    max-height: calc(100% - 90px);
    /* height: 100%; */

    position: fixed;
    left: 50%;
    top: 60px;
    transform: translate(-50%, 0);
    z-index: 999998;

    @media (min-width: 1200px) and (max-height: 900px) {
      height: 100%;
    }

    @include media.down(md) {
      width: 100%;
      height: 100%;
      max-height: inherit;
      top: 0;
      left: 0;
      transform: none;
      margin-left: 0;
    }
  }

  .close-button {
    background: #1c1c21;
    width: 33px;
    height: 33px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 15px;
    top: 15px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    z-index: 1;
    @include media.down(md) {
      /* right: 9px;
      top: 9px; */
    }

    &:hover {
      transform: rotate(90deg);
      background: #2f2f37;
    }
  }

  .profile-wrapper {
    width: 100%;
    flex: 1 0 0;
    display: flex;
    flex-direction: row;
    gap: 30px;

    padding: 15px 0 15px 15px;

    .aside {
      display: flex;
      flex-direction: column;
      width: 240px;
      height: 100%;

      border-radius: 8px;

      &.check {
        @include media.down(md) {
          display: none;
        }
      }
    }
    .component {
      flex: 1 0 0;
      display: flex;
      flex-direction: column;
      .child {
        flex: 1 0 0;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
