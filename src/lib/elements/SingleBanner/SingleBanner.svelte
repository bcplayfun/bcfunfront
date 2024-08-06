<script lang="ts">
  import { browser } from "$app/environment";
  import * as assets from "$lib/assets/banners";
  import { breakpoints } from "$lib/utils/constants";
  import Image from "$lib/elements/Image";
  import Widget from "./components/Widget.svelte";

  let isMobile = browser ? window.innerWidth < breakpoints.md : false;
</script>

<div class="banner">
  <div class="background">
    <Image url={assets.registerB} />
  </div>
  <Widget />
</div>

<style lang="scss">
  .banner {
    position: relative;
    height: 480px;
    .foreground,
    .background {
      position: absolute;
      height: 100%;
      border-radius: 18px;
      width: 100%;
    }
    /* .foreground {
      right: -10px;
      left: -10px;
      animation: moveFront linear 15s infinite;
      animation-play-state: running;
    } */
    /* .background {
      right: -10px;
      left: -10px;
      animation: moveBg linear 15s infinite;
      animation-play-state: running;
    } */
    .img {
      position: absolute;
      /* inset: 0; */
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  @keyframes moveFront {
    0% {
      transform: translateZ(0) rotate(0.0001deg);
    }
    25% {
      transform: translate3d(10px, 0, 0) rotate(0.0001deg);
    }
    50% {
      transform: translateZ(0) rotate(0.0001deg);
    }
    75% {
      transform: translate3d(-10px, 0, 0) rotate(0.0001deg);
    }
    100% {
      transform: translateZ(0) rotate(0.0001deg);
    }
  }
  @keyframes moveBg {
    0% {
      transform: translateZ(0) rotate(0.0001deg);
    }
    25% {
      transform: translate3d(-10px, 0, 0) rotate(0.0001deg);
    }
    50% {
      transform: translateZ(0) rotate(0.0001deg);
    }
    75% {
      transform: translate3d(10px, 0, 0) rotate(0.0001deg);
    }
    100% {
      transform: translateZ(0) rotate(0.0001deg);
    }
  }
</style>
