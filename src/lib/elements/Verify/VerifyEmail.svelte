<script lang="ts">
  import api from "$lib/api";
  import Button from "$lib/elements/Button";
  import Alert from "$lib/elements/Alert";
  import { closeModal } from "../Modal";

  let loading: boolean = false;
  async function sendEmail() {
    loading = true;
    const [_, err] = await api.players.sendEmailVerify();
    if (!err) {
      Alert.success("Email was successfully sent, please check your inbox.");
      closeModal();
    }
    loading = false;
  }
</script>

<div class="verify">
  <div class="text">
    Thank you ! Verification Email is now sent to specified email and will be
    available for next 24 hours!
  </div>
  <div class="mt-14">
    <Button size="large" {loading} on:click={() => sendEmail()}>Send</Button>
  </div>
</div>

<style lang="scss">
  .verify {
    width: 350px;
    padding: var(--brand-padding-x);
    @media (max-width: 992px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      padding: 15px;
    }
    .text {
      font-size: 14px;
      font-weight: 500;
    }
  }
</style>
