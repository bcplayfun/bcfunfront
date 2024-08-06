<script lang="ts">
</script>

<div class="modal-default hide-scrollbar">
  <slot />
</div>

<style lang="scss">
  .modal-default {
    position: fixed;
    border-radius: 8px;
    background-color: var(--dialog-background-color);
    max-width: 80%;
    min-width: 20%;
    height: calc(100% - 40px);
    max-height: 690px;
    overflow-y: auto;
    overflow-x: hidden;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000000;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
      max-width: calc(100% - 10px);
    }
  }
</style>
