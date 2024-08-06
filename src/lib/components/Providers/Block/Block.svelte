<script lang="ts">
  import Item from "../Item";
  import { providers } from "$lib/stores/providers";
  import { EMPTY_PROVIDER } from "$lib/types/provider";
  import ProviderSlider from "$lib/elements/ProviderSlider/ProviderSlider.svelte";
  import { sortProviders } from "$lib/utils/providers";
  import { cfIpCountry } from "$lib/stores/player";

  $: list = $providers?.length ? $providers : Array(10).fill(EMPTY_PROVIDER);
</script>

<div class="container mx-auto my-16">
  <ProviderSlider data={sortProviders(list, $cfIpCountry)} title="Providers">
    <svelte:fragment slot="item" let:item>
      <Item provider={item} />
    </svelte:fragment>
  </ProviderSlider>
</div>
