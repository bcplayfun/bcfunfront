<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import * as assets from "$lib/assets/icons/index";
  import Button from "../Button";
  import { goto } from "$app/navigation";
  import type { Template } from "./index";
  import { isJsonString } from "$lib/utils/string";
  import { go } from "../Profile";

  const dispatch = createEventDispatcher();

  export let notification: Template;
</script>

<div
  class="notification"
  in:fly={{ y: 200, duration: 2000 }}
  out:fade={{ duration: 500 }}
>
  <div class="notification-header">
    <h4 class="title">
      {#if isJsonString(notification.title)}
        {@html JSON.parse(notification.title)}
      {:else}
        {@html notification.title}
      {/if}
    </h4>
    <Button round size="small" on:click={() => dispatch("dismiss")}>
      <img src={assets.close} alt="Close" />
    </Button>
  </div>
  <div class="notification-wrapper">
    {#if notification?.url}
      <div class="img-wrap">
        <img
          src={notification.url}
          alt={notification.title}
          style="border-radius: 10px;"
        />
      </div>
    {/if}
    {#if notification.description || notification.url?.length}
      <div class="bottom-tab">
        <div class="description">
          {#if isJsonString(notification.description)}
            {@html JSON.parse(notification.description)}
          {:else}
            {@html notification.description}
          {/if}
        </div>
        {#if notification?.action_url}
          <Button
            on:click={() => {
              if (notification.action_url?.startsWith("/")) {
                goto(notification.action_url);
              } else {
                go("dashboard", notification.action_url || "");
              }
              dispatch("dismiss");
            }}
            size="small"
          >
            {notification.action_title}
          </Button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .notification {
    display: flex;
    flex-direction: column;
    min-width: 320px;
    max-width: 320px;
    background-color: var(--layer-1);
    border-radius: 15px;
    padding: 1rem;
    margin-bottom: 8px;
    transition: all 0.3s ease-in-out;
    & .notification-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 13px;
      .title {
        font-size: 15px;
        line-height: 24px;
        color: white;
        margin: 0;
      }
    }
    & .notification-wrapper {
      img {
        width: 100%;
        height: 168px;
        object-fit: cover;
        border-radius: 15px;
      }
      .bottom-tab {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        margin: 12px 0 0;
        flex-direction: column;
        gap: 8px;
        .description {
          margin: 0 20px 0 0;
          font-size: 14px;
          line-height: 22px;
          p {
            margin: 0;
            padding: 0;
          }
        }
      }
    }
    @media (max-width: 992px) {
      max-width: 100%;
      width: 100%;
      right: 0;
      bottom: 0;

      & .notification-wrapper {
        /* img {
          display: none;
        } */
        .bottom-tab {
          flex-direction: column;
          align-items: flex-start;
          p {
            max-width: 300px;
            margin: 0 0 20px;
          }
        }
      }
    }
  }
</style>
