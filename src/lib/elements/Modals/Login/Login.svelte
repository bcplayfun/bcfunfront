<script lang="ts">
  import Button from "$lib/elements/Button";
  import Input from "$lib/elements/Input";
  import { openModal } from "$lib/elements/Modal";
  import ResetPassword from "../ResetPassword";
  import Register from "../Register";
  import api from "$lib/api";
  import { type LoginForm, EMPTY_LOGIN_FORM } from "$lib/types/player";
  import { isEmail } from "$lib/utils/validation";

  export let onSuccess = () => {};

  let loading: boolean = false;

  let form: LoginForm = { ...EMPTY_LOGIN_FORM };
  let email_or_username: string = "";

  async function login() {
    loading = true;
    if (isEmail(email_or_username)) {
      form.email = email_or_username;
      delete form.username;
    } else {
      form.username = email_or_username;
      delete form.email;
    }
    const [_, error] = await api.auth.login(form);
    if (!error) {
      onSuccess();
    }
    loading = false;
  }

  function openSignUp() {
    openModal(Register, "Sign up", {}, { type: "new" });
  }

  function openReset() {
    openModal(ResetPassword, "Update Password", {}, { type: "new" });
  }
</script>

<form action="./" on:submit|preventDefault={login} class="login">
  <Input
    bind:value={email_or_username}
    placeholder={"Email or Username"}
    isTrim
    name="email_or_username"
    autocomplete="email"
  />
  <Input
    bind:value={form.password}
    placeholder={"Password"}
    type="password"
    isPassword
    name="password"
    autocomplete="current-password"
  />
  <p
    class="forgot"
    on:click={() => {
      openReset();
    }}
    on:keydown={() => {
      openReset();
    }}
  >
    Forgot password?
  </p>
  <Button type="submit" {loading}>Play now</Button>
  <div class="footer">
    <span>Don't have an account? &nbsp;</span>
    <span on:click={openSignUp} on:keydown={openSignUp} class="open"
      >Open Account</span
    >
  </div>
</form>

<style lang="scss">
  .login {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 370px;
    padding: var(--brand-padding-x);
    @media (max-width: 992px) {
      width: 100%;
    }
    .forgot {
      font-size: 13px;
      line-height: 18px;
      color: var(--brand-primary);
      text-align: right;
      cursor: pointer;
      font-weight: 600;
      &:hover {
        filter: brightness(1.1);
      }
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: var(--white);
      .open {
        color: var(--brand-primary);
        font-weight: 600;
        cursor: pointer;
        &:hover {
          filter: brightness(1.1);
        }
      }
    }
  }
</style>
