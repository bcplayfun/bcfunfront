<script lang="ts">
  export let width = 0;
</script>

<div class="bonus-progress">
  <div class="bonus-progress--wrapper">
    <div class="bonus-progress--line" style={`width: ${width}%`} />
  </div>
  <div class="dots">
    <div class="step">
      <div
        class="label"
        class:active={false}
        class:first={true}
        class:last={false}
      >
        Deposit
      </div>
      <div class="line top" />
      <div class="line bottom" />
    </div>
    <div class="step">
      <div
        class="label"
        class:active={false}
        class:first={false}
        class:last={true}
      >
        Wager 1x
      </div>
      <div class="line top" />
      <div class="line bottom" />
    </div>
  </div>
</div>

<style lang="scss">
  $progress-height: 6px;
  $progress-radius: 12px;
  $transition-time: 0.5s;
  $progress-background: rgba(255, 255, 255, 0.3);

  .bonus-progress {
    position: relative;
    width: 100%;
    padding: 20px 0px;
    margin: 25px 0 15px;
    border-radius: $progress-radius;
    display: flex;

    .dots {
      width: 100%;
      position: absolute;
      top: 17px;
      display: flex;
      justify-content: space-between;
    }

    &--wrapper {
      overflow: hidden;
      position: absolute;
      width: 100%;
      height: $progress-height;
      background: $progress-background;
      border-radius: $progress-radius;
    }

    &--line {
      width: 0%;
      height: $progress-height;
      background: var(--color-success-400);
      transition: width $transition-time;
    }
  }
  //step
  $dot-size: 12px;
  $progress-background: rgba(255, 255, 255, 0.3);
  $transition-time: 0.5s;

  .label {
    color: white;
    position: absolute;
    bottom: 20px;
    font-size: 14px;
    transform: translate(-50%, 0);
    left: 50%;
    opacity: 0.5;
    transition: opacity $transition-time;

    &.active {
      opacity: 1;
    }

    &.first {
      left: 0;
      transform: translate(0, 0);
    }
    &.last {
      left: auto;
      right: 0;
      transform: translate(0, 0);
    }
  }

  .step {
    width: $dot-size;
    height: $dot-size;
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    .line {
      height: 10px;
      width: 1px;
      background: $progress-background;
      position: absolute;
      &.top {
        left: 5px;
        bottom: 12px;
      }
      &.bottom {
        left: 5px;
        top: 12px;
      }
    }
  }
</style>
