<script lang="ts">
  import { lazyLoad } from "$lib/utils/lazyLoad";

  export let url = "";
  export let name = "";

  let loadedImage = false;
</script>

<img
  use:lazyLoad={url}
  on:loaded={() => (loadedImage = true)}
  alt={name}
  class="image"
/>
<div class="skeleton {loadedImage && 'hide'}" />

<style lang="scss">
  .skeleton {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
    visibility: visible;
    transition: 0.2s ease-in;
    &.hide {
      opacity: 0;
      visibility: hidden;
      display: none;
    }
  }
  .image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
</style>
