<script lang="ts">
  import { currencyIdToCurrency } from "$lib/stores/static";

  export let currencyId: number;

  async function getIcon(id: number) {
    const currencyCode = $currencyIdToCurrency[id].code.toLowerCase();
    const currencyIcon = await import(
      `../../assets/currencies/${currencyCode}.svg`
    );
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      })
    );
    return currencyIcon.default;
  }
</script>

{#await getIcon(currencyId)}
  <div class="skeleton nologo" />
{:then value}
  <img src={value} alt="crypto icon" />
{:catch _}
  <!-- '' -->
{/await}

<style>
  .skeleton {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }
</style>
