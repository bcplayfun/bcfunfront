<script lang="ts">
  import { currencies } from "$lib/stores/static";
  import Icon from "$lib/components/Profile/components/BalanceSelect/Icon.svelte";

  export let currency: any;
</script>

<div class="icon me-10">
  <Icon
    currencyId={$currencies.find((c) => c.name === currency.name)?.id || 0}
  />
</div>
{currency.name}

<style lang="scss">
  .icon {
    /* position: absolute;
    width: 15px;
    height: 15px;
    bottom: -2px;
    right: -2px; */
    width: 20px;
    height: 20px;
  }
  .min-amount {
    color: var(--brand-primary);
    font-size: 14px;
    font-weight: 600;
    line-height: 120%;
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    right: 0;
    bottom: -6px;
    background-color: var(--dialog-background-color);
    padding: 1px 5px;
    font-size: 10px;

    @include media.down(md) {
      font-size: 10px;
      gap: 4px;
      img {
        width: 13px;
      }
    }
  }
</style>
