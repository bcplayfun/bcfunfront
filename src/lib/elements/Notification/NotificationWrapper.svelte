<script lang="ts">
  import Notification from "./Notification.svelte";
  import { notificationMessages, dismissNotificationMessage } from ".";
</script>

{#if $notificationMessages.length > 0}
  <section class="container-xl">
    {#each $notificationMessages as notification (notification.notification_id)}
      <Notification
        notification={notification.template}
        on:dismiss={() =>
          dismissNotificationMessage(notification.notification_id)}
      />
    {/each}
  </section>
{/if}

<style lang="scss">
  section {
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 9999999999;
    max-width: 336px;
    padding: 0;
  }
</style>
