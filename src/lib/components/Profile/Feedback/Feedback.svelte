<script lang="ts">
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";
  import Button from "$lib/elements/Button";
  import Input from "$lib/elements/Input";
  import { EMPTY_FAILURE } from "$lib/types/validation";
  import type { Failure } from "superstruct";

  let value = "";
  let error: Failure = { ...EMPTY_FAILURE };

  $: if (value.length > 1000) {
    error.message = "Max. characters 1000";
  } else {
    error = { ...EMPTY_FAILURE };
  }

  async function send() {
    if (value.length < 10) {
      error.message = "Min. characters 10";
      return;
    }
    if (value.length > 1000) {
      return;
    }
    const [_, err] = await api.players.sendFeedback("value");
    if (!err) {
      Alert.success("Updated");
      value = "";
    }
  }
</script>

<div class="component-title">Your feedback</div>
<div class="feedback">
  <div class="title">Share your thoughts and get hidden gifts</div>
  <div class="description">
    What do you think about our website? Please share your thoughts with us so
    we can improve and make BCFUN the best it can be.
  </div>
  <div class="textarea">
    <Input bind:value {error} multiline placeholder={"Your feedback..."} />
  </div>
  <div class="limit">
    {value.length}/1000
  </div>
  <Button on:click={() => send()}>Send</Button>
</div>

<style lang="scss">
  .feedback {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 30px 15px 0 0;
    .title {
      color: var(--brand-primary);
      font-size: 15px;
      font-weight: 600;
    }
    .description {
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 500;
    }

    .limit {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      color: var(--text-secondary);
      font-size: 12px;
    }
  }
</style>
