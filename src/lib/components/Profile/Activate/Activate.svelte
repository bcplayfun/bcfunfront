<script lang="ts">
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";
  import Button from "$lib/elements/Button";
  import Input from "$lib/elements/Input";
  import { go } from "$lib/elements/Profile";

  let value = "";

  let loading = false;

  async function submit() {
    loading = true;
    const [res] = await api.players.activatePromoCode(value);
    if (res) {
      Alert.success(res?.response);
      go("dashboard", "bonuses");
    }
    loading = false;
  }
</script>

<div class="component-title">Activate bonus code</div>

<div class="body">
  <div class="text">
    By entering the bonus code, you automatically become eligible for
    participation in the corresponding casino bonus campaign.
  </div>
  <form action="./" on:submit|preventDefault={submit} class="form mt-16">
    <Input type="text" bind:value placeholder="Bonus code" />
    <div class="mt-16" />
    <Button type="submit" size="large" {loading}>ACTIVATE</Button>
  </form>
</div>

<style lang="scss">
  .body {
    padding-right: 15px;
    margin: 15px 0 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1 0 0;
    .text {
      color: var(--text-secondary);
      text-align: center;
    }
    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
