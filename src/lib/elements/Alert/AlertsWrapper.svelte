<script lang="ts">
  import Alert from "./Alert.svelte";

  import { alerts, dismissAlert } from ".";
</script>

{#if $alerts}
  <section class="container-xl">
    {#each $alerts as notification (notification.id)}
      <Alert
        type={notification.type}
        dismissible={notification.config.dismissible}
        on:dismiss={() => dismissAlert(notification.id)}
      >
        <div class="description">{notification.description}</div>
      </Alert>
    {/each}
  </section>
{/if}

<style lang="scss">
  .description {
    font-size: 14px;
  }
  section {
    position: fixed;
    bottom: 24px;
    left: 24px;
    display: flex;
    flex-direction: column;
    z-index: 9999999;
    @media (max-width: 992px) {
      bottom: 75px;
    }
  }
</style>
