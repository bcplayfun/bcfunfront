<script lang="ts">
  import { currencies } from "$lib/stores/static";
  import Icon from "$lib/components/Profile/components/BalanceSelect/Icon.svelte";
  import Arrow from "$lib/elements/Icons/Arrow.svelte";

  export let activeCurrencyID: any;
  export let isOpen: boolean;

  $: name = $currencies.find((c) => c.id === activeCurrencyID)?.name;
</script>

{#if $currencies.length && activeCurrencyID}
  <div
    style:width="20px"
    style:height="20px"
    style:margin-right="10px"
    style:position="relative"
  >
    <Icon
      currencyId={$currencies.find((c) => c.id === activeCurrencyID)?.id || 0}
    />
  </div>
{/if}
{name}
{#if name === "USDTT"}
  <span style:font-size="12px" style:color="#b6bcc4">&nbsp;- TRC20 </span>
{:else if name === "USDTE"}
  <span style:font-size="12px" style:color="#b6bcc4">&nbsp;- ERC20 </span>
{/if}
<div class="arrow">
  <Arrow direction={isOpen ? "up" : "down"} />
</div>

<style>
  .arrow {
    position: absolute;
    right: 15px;
  }
</style>
