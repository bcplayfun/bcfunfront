<script lang="ts">
  import Button from "$lib/elements/Button";
  import { closeModal } from "$lib/elements/Modal";
  import api from "$lib/api";
  import { isJsonString } from "$lib/utils/string";

  export let activeTitle: string;
  export let inactiveTitle: string;
  export let bonusID: number;
  export let cb: (res: string) => void;

  let loading: boolean = false;

  async function voidFunc() {
    loading = true;
    const [res, err] = await api.bonuses.activate(bonusID, 1);
    loading = false;
    if (!err) {
      cb(res);
    }
    closeModal();
  }
</script>

<div class="bonus-void">
  <h4 class="title">Are you sure you want to void bonus?</h4>
  <p class="text">
    By activating {#if isJsonString(activeTitle)}
      {@html JSON.parse(activeTitle)}
    {:else}
      {activeTitle}
    {/if},
    <br />
    you will cancel your active bonus
  </p>
  <Button on:click={() => voidFunc()} {loading}>Accept</Button>
</div>

<style lang="scss">
  .bonus-void {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 370px;
    margin: 0 auto;
    padding: 20px;

    & > .title {
      margin-top: 20px;
      margin-bottom: 12px;
      font-size: 20px;
      line-height: 32px;
      font-weight: 600;
      text-align: center;
    }
    & > .text {
      margin-top: 20px;
      font-size: 15px;
      line-height: 23px;
      font-weight: 600;
      margin-bottom: 26px;
      text-align: center;
    }
  }
  :global(.void-btn) {
    width: 344px;
  }
</style>
