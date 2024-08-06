<script lang="ts">
  import BannerSlider from "$lib/elements/BannerSlider/BannerSlider.svelte";
  import Item from "./Item.svelte";

  export let banners: any[];

  let loading: boolean = false;
</script>

<div class="container mx-auto relative mb-24">
  <BannerSlider data={banners}>
    <svelte:fragment slot="item" let:item>
      <Item banner={item} {loading} />
    </svelte:fragment>
  </BannerSlider>
</div>
