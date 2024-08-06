<script lang="ts">
  export let loading = false;
  export let radius = "0px";
</script>

{#if loading}
  <div class="loading-overlay" style="border-radius : {radius}">
    <div class="loader position-relative">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
{/if}
<slot />

<style lang="scss">
  .loading-overlay {
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: progress;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .loader {
    display: inline-block;
    width: 80px;
    height: 80px;

    div {
      position: absolute;
      background-color: white;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    div:nth-child(1) {
      left: 8px;
      animation: loader1 0.6s infinite;
    }

    div:nth-child(2) {
      left: 8px;
      animation: loader2 0.6s infinite;
    }

    div:nth-child(3) {
      left: 32px;
      animation: loader2 0.6s infinite;
    }

    div:nth-child(4) {
      left: 56px;
      animation: loader3 0.6s infinite;
    }
  }

  @keyframes loader1 {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes loader3 {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes loader2 {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(24px, 0);
    }
  }
</style>
