<script lang="ts">
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";
  import Button from "$lib/elements/Button/Button.svelte";
  import Input from "$lib/elements/Input/Input.svelte";
  import type { ChangePassword } from "$lib/types/player";
  import { mapErrors } from "$lib/utils/validation";
  import { EMPTY_FAILURE } from "$lib/types/validation";
  import {
    type Failure,
    StructError,
    validate,
    object,
    define,
    Struct,
  } from "superstruct";
  import Arrow from "$lib/elements/Modals/Register/assets/vector.svg";
  import ArrowChecked from "$lib/elements/Modals/Register/assets/checkedMark.svg";
  import { tick } from "svelte";

  let loading = false;
  let form: ChangePassword = {
    password: "",
    new_password: "",
    confirm_password: "",
  };

  let errors: Record<string, Failure> = { [""]: { ...EMPTY_FAILURE } };

  const isSame: Struct<string> = define<string>("same", (value) => {
    if (value == form.new_password) {
      return "Password doesn't match";
    }
    return true;
  });

  const passwordCh = define("passwordCh", () => {
    if (!isPasswordSuccess) {
      return "Incomplete Password";
    }
    return true;
  });

  const User: Struct<any> = object({
    password: passwordCh,
    new_password: passwordCh,
    confirm_password: isSame,
  });

  async function submit() {
    form.confirm_password = form.new_password;
    const [structError, _f] = validate(form, User);
    if (structError instanceof StructError) {
      errors = mapErrors(structError.failures());
      return;
    }
    errors = { [""]: { ...EMPTY_FAILURE } };

    loading = true;
    const [_, err] = await api.auth.changePassword(form);
    if (!err) {
      Alert.success("Password Updated Successfully");
      form = {
        password: "",
        new_password: "",
        confirm_password: "",
      };
    }
    loading = false;
  }

  let passwordScale: boolean[] = [];
  $: isPasswordMoreThan8character = form.new_password.length >= 8;
  let passwordContainsNumber: boolean = false;
  let passwordContainsUpperCase: boolean = false;
  let isPasswordSuccess: boolean = false;
  let success: Record<string, boolean> = {
    email: false,
    username: false,
    submit: false,
  };

  $: isPasswordSuccess
    ? (success["password"] = true)
    : (success["password"] = false);

  async function passwordCheck(e: any) {
    await tick();

    let passwordContainsDigit = new RegExp("(?=.*?[0-9])");
    let passwordContainsUpperCaseRegex = new RegExp("(?=.*?[A-Z])");

    if (passwordContainsDigit.test(e.target.value)) {
      passwordContainsNumber = true;
    } else {
      passwordContainsNumber = false;
    }
    if (passwordContainsUpperCaseRegex.test(e.target.value)) {
      passwordContainsUpperCase = true;
    } else {
      passwordContainsUpperCase = false;
    }

    let cases = [
      passwordContainsNumber,
      passwordContainsUpperCase,
      isPasswordMoreThan8character,
    ];
    passwordScale = cases.filter((elem) => elem == true);

    passwordScale.length === 3
      ? (isPasswordSuccess = true)
      : (isPasswordSuccess = false);
    if (!isPasswordSuccess) {
      errors = { ...errors, ["new_password"]: { ...EMPTY_FAILURE } };
      errors["new_password"].message = "Incomplete Password";
    }
    if (e.target.value.length == 0 || isPasswordSuccess) {
      errors = { ...errors, ["new_password"]: { ...EMPTY_FAILURE } };
    }
  }
</script>

<div class="block">
  <form action="./" on:submit|preventDefault={submit} class="form">
    <Input
      bind:value={form.password}
      placeholder={"Current Password"}
      type="password"
      error={errors && errors["password"]}
      isPassword
    />
    <Input
      bind:value={form.new_password}
      placeholder={"New Password"}
      type="password"
      error={errors && errors["new_password"]}
      isPassword
      on:input={(e) => passwordCheck(e)}
    />
    {#if form.new_password.length}
      <ul class="password-check">
        <li class:checked={passwordContainsUpperCase}>
          <img
            src={passwordContainsUpperCase ? ArrowChecked : Arrow}
            alt="check-mark"
          />
          Includes lower and upper case characters
        </li>
        <li class:checked={passwordContainsNumber}>
          <img
            src={passwordContainsNumber ? ArrowChecked : Arrow}
            alt="check-mark"
          />
          At least one number
        </li>
        <li class:checked={isPasswordMoreThan8character}>
          <img
            src={isPasswordMoreThan8character ? ArrowChecked : Arrow}
            alt="check-mark"
          />
          Minimum 8 characters
        </li>
      </ul>
    {/if}
    <Button type="submit" {loading} class="mt-auo">Save</Button>
  </form>
</div>

<style lang="scss">
  .block {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 30px 0 0;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .form {
    width: 100%;
    gap: 10px;
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .password-check {
    color: #9c9cab;
    li {
      display: flex;
      gap: 8px;
      font-size: 14px;
      font-weight: 300;
      line-height: 17px;
      &.checked {
        color: var(--brand-primary);
      }
    }
  }
</style>
