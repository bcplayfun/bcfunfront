<script lang="ts">
  export let text: string = "";
  export let align: "left" | "center" | "right" = "left";
  export let color: string = "";
</script>

<div class="empty-box {align}" style:color>
  <p class="empty-text">{text}</p>
</div>

<style lang="scss">
  .empty-box {
    display: flex;
    align-items: center;
    background: var(--panel-background-color-primary);
    border-radius: 8px;
    font-weight: 400;
    padding: 5px 15px;
    color: var(--text-color-secondary);
    border: 1px solid var(--empty-border-color);
    min-height: 60px;
    &.left {
      justify-content: flex-start;
    }
    &.center {
      justify-content: center;
    }
    &.right {
      justify-content: flex-end;
    }
  }
</style>
