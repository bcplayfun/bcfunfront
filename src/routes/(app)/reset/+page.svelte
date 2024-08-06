<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";
  import Button from "$lib/elements/Button/Button.svelte";
  import Input from "$lib/elements/Input";
  import { openModal } from "$lib/elements/Modal";
  import Login from "$lib/elements/Modals/Login/Login.svelte";
  import { EMPTY_FAILURE } from "$lib/types/validation";
  import { passwordCheck } from "$lib/utils/superstructErros";
  import { mapErrors } from "$lib/utils/validation";
  import {
    Struct,
    StructError,
    define,
    object,
    validate,
    type Failure,
    string,
  } from "superstruct";

  let loading: boolean = false;

  type Form = {
    code: string;
    password: string;
    confirm_password: string;
  };
  let form: Form = {
    code: "",
    password: "",
    confirm_password: "",
  };

  const isSame: Struct<string> = define<string>("same", (value) => {
    if (value == form.password) {
      return true;
    }
    return `Password doesn't match`;
  });
  const struct: Struct<any> = object({
    code: string(),
    password: passwordCheck,
    confirm_password: isSame,
  });

  let errors: Record<string, Failure> = { [""]: { ...EMPTY_FAILURE } };

  async function reset() {
    let code = $page.url.searchParams.get("code");
    if (code && code.length) {
      const [structError, _f] = validate(form, struct);
      if (structError instanceof StructError) {
        errors = mapErrors(structError.failures());

        return;
      }
      errors = { [""]: { ...EMPTY_FAILURE } };
      loading = true;
      form.code = code;
      const [_, err] = await api.auth.forgotPassword(form);
      if (!err) {
        Alert.success("Updated");
        openModal(Login, "Log in", {}, { type: "new" });
        goto("/");
      }
    } else {
      Alert.error("Code is invalid");
    }
    loading = false;
  }
</script>

<svelte:head>
  <title>BCFUN | Reset Password</title>
</svelte:head>

<div class="container mx-auto">
  <h1 class="page-title">Reset Password</h1>
  <form action="./" class="reset" on:submit|preventDefault={reset}>
    <div class="input-row">
      <Input
        bind:value={form.password}
        placeholder={"New Password"}
        type="password"
        error={errors && errors["password"]}
        isPassword
      />
    </div>
    <div class="input-row">
      <Input
        bind:value={form.confirm_password}
        placeholder={"Confirm Password"}
        type="password"
        error={errors && errors["confirm_password"]}
        isPassword
      />
    </div>
    <Button type="submit" {loading}>Update</Button>
  </form>
</div>

<style lang="scss">
  .page-title {
    margin-top: 50px;
    font-size: 40px;
    font-weight: 800;
    color: white;
    display: flex;
    justify-content: center;
  }
  .reset {
    max-width: 500px;
    margin: 30px auto 0;
    gap: 15px;
    display: flex;
    flex-direction: column;
  }
</style>
