<script lang="ts">
  import * as assets from "../assets";
  export let type: "email" | "mobile" = "email";
  export let isVerified = false;

  const data = {
    email: {
      success: assets.emailSuccess,
      fail: assets.emailFail,
    },
    mobile: {
      success: assets.phoneSuccess,
      fail: assets.phoneFail,
    },
  };
</script>

{#if isVerified}
  <div class="item">
    <img src={assets.success} alt="verified" />
    <div class="absolute {type}">
      <img src={data[type].success} alt={type} />
      <span>{type}</span>
      <img src={assets.mark} alt="checked" />
    </div>
  </div>
{:else}
  <div class="item not">
    <img src={assets.fail} alt="not verified" />
    <div class="absolute {type}">
      <img src={data[type].fail} alt={type} />
      <span>{type}</span>
      <img src={assets.x} alt="x" />
    </div>
  </div>
{/if}

<style lang="scss">
  .item {
    position: relative;
    &.not {
      cursor: pointer;
    }
    .absolute {
      position: absolute;
      display: flex;
      align-items: center;
      top: 50%;
      transform: translateY(-50%);
      gap: 6px;
      &.email {
        left: 7.5px;
      }
      &.mobile {
        left: 9.5px;
      }
      span {
        text-transform: capitalize;
        color: #fff;

        font-size: 14px;
        font-weight: 500;
        line-height: 140%;
      }
    }
  }
</style>
