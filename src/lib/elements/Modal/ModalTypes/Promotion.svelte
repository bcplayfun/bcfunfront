<div class="modal-default hide-scrollbar">
  <slot />
</div>

<style lang="scss">
  .modal-default {
    position: fixed;
    border-radius: 8px;
    max-width: 100%;
    min-width: 20%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000000;

    @media (max-width: 768px) {
      max-width: calc(100% - 10px);
    }
  }
</style>
