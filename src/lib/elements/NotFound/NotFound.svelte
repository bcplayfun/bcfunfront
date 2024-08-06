<script lang="ts">
  export let description: any;
</script>

<div class="not-found">
  <div class="content">
    <p class="description">{description}</p>
  </div>
</div>

<style lang="scss">
  .not-found {
    width: 100%;
    height: 140px;
    position: relative;
  }
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;

    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 32px 0;

    img {
      width: 42px;
      height: auto;
    }

    .title {
      color: white;
      font-size: 22px;
      line-height: 24px;
      font-weight: bold;
    }

    .description {
      color: var(--gray);
      font-size: 15px;
      line-height: 22px;
      width: 350px;
    }
  }
</style>
