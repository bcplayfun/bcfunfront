<script lang="ts">
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";
  import Button from "$lib/elements/Button/Button.svelte";
  import Input from "$lib/elements/Input/Input.svelte";
  import { isEmail } from "$lib/utils/validation";
  import MailVerified from "./assets/mail-verified.svg";

  let email_or_username: string = "";

  type Form = {
    username?: string;
    email?: string;
  };
  let form: Form = {
    username: "",
    email: "",
  };

  let loading: boolean = false;
  let showSuccess: boolean = false;

  async function request() {
    loading = true;
    if (email_or_username.length < 5) {
      Alert.error("Min. length is 5 characters");
      loading = false;
      return;
    }
    if (isEmail(email_or_username)) {
      form.email = email_or_username;
      delete form.username;
    } else {
      form.username = email_or_username;
      delete form.email;
    }
    const [_, err] = await api.auth.requestNewPassword(form);
    if (!err) {
      showSuccess = true;
      loading = false;
      return;
    }
    loading = false;
  }

  async function resend() {
    loading = true;
    const [_, error] = await api.auth.requestNewPassword(form);
    if (!error) {
      Alert.success("Success, check your email");
    }
    loading = false;
  }
</script>

<form action="./" class="reset">
  {#if showSuccess}
    <div class="success">
      <div class="round">
        <img src={MailVerified} alt="success icon" class="img" />
      </div>
      <h2 class="title">Hello, there!</h2>
      <p class="description">
        We have sent you a password reset link to your mail. Please check your
        inbox.
      </p>
      <div class="bottom d-flex">
        <Button on:click={() => (showSuccess = false)}>Re-enter</Button>
        <Button on:click={resend} color="white" {loading}>Resend</Button>
      </div>
    </div>
  {:else}
    <p class="description">
      Enter your email or username below for a password reset link.
    </p>
    <div class="bottom">
      <Input
        bind:value={email_or_username}
        placeholder={"Please enter your email or username"}
        isTrim
      />
      <Button type="submit" {loading} on:click={request}>Send</Button>
    </div>
  {/if}
</form>

<style lang="scss">
  .reset {
    width: 370px;
    padding: var(--brand-padding-x);
    @media (max-width: 992px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      padding: 15px;
    }
    .title {
      font-weight: 700;
      font-size: 25px;
      margin-bottom: 20px;
    }
    .description {
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      margin-bottom: 10px;
      color: white;
    }
    .bottom {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
  .success {
    display: flex;
    align-items: center;
    flex-direction: column;
    .bottom {
      display: flex;
      flex-direction: row;
      gap: 18px;
    }
    .round {
      background: #09090b;
      width: 109px;
      height: 109px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        width: 65px;
      }
    }
    .title {
      font-size: 24px;
      line-height: 40px;
      font-weight: 500;
      color: white;
      margin: 28px 0 12px;
    }
    .description {
      font-size: 14px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 32px;
      text-align: center;
    }
    .back {
      font-size: 15px;
      color: white;
      .try {
        font-weight: 600;
        color: #ffbd39;
        cursor: pointer;
      }
    }
  }
</style>
