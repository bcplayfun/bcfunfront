<script lang="ts">
  import { addonBg, addonMark, addonWheel } from "./assets/wheel";
</script>

<div class="addon">
  <img src={addonBg} alt="bg" class="bg" />
  <img src={addonMark} alt="bg" class="mark" />
  <img src={addonWheel} alt="bg" class="wheel" />
</div>

<style lang="scss">
  .addon {
    position: relative;
    width: 2rem;
    height: 2rem;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    .wheel {
      position: relative;
      animation: spining 2s linear infinite;
    }
    .bg {
      position: absolute;
    }
    .mark {
      position: absolute;
      top: -0.375rem;
      left: 49%;
      transform: translate(-50%);
      width: 1.125rem;
      height: auto;
      z-index: 3;
    }
  }

  @keyframes spining {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
