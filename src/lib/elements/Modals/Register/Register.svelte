<script lang="ts">
  import api from "$lib/api";
  import Button from "$lib/elements/Button/Button.svelte";
  import Input from "$lib/elements/Input";
  import { closeModal } from "$lib/elements/Modal";
  import {
    type RegistrationForm,
    EMPTY_REGISTRATION_FORM,
  } from "$lib/types/player";
  import { isEmail, mapErrors } from "$lib/utils/validation";
  import { EMPTY_FAILURE } from "$lib/types/validation";
  import Arrow from "./assets/vector.svg";
  import ArrowChecked from "./assets/checkedMark.svg";
  import {
    type Failure,
    StructError,
    validate,
    object,
    define,
    Struct,
  } from "superstruct";
  // import PhoneInput from "$lib/elements/PhoneInput";
  // import { lettersOnly } from "$lib/utils/superstructErros";
  import { checkUsernameValidity } from ".";
  import auth from "$lib/api/auth";
  import { onMount, tick } from "svelte";
  import third_parties from "$lib/third_parties";
  import Cookies from "js-cookie";

  import CurrencySelect from "$lib/elements/CurrencySelect/CurrencySelect.svelte";
  import { currencies } from "$lib/stores/static";
  import GiftBox from "./GiftBox.svelte";
  import { go } from "$lib/elements/Profile";
  import { sortCurrencies } from "$lib/utils/currency";
  import { cfIpCountry } from "$lib/stores/player";
  // import Alert from "$lib/elements/Alert";

  export let onSuccess = () => {};
  let loading = { email: false, username: false, submit: false };
  let isNotAvailable = {
    email: false,
    username: false,
  };

  let bonuses: any = [];
  let selectedCurrency =
    $currencies?.find((c) =>
      $cfIpCountry === "GB" ? c.name === "GBP" : c.name === "BTC"
    ) || $cfIpCountry === "GB"
      ? {
          id: 3,
          code: "gbp",
          name: "GBP",
          is_crypto: 0,
          is_active: 1,
          withdrawal_min_amount: "0.000000000000000000",
          min_usable_amount: "0.000000000000000000",
          bonus_min_usable_amount: "0.000000000000000000",
        }
      : {
          bonus_min_usable_amount: "0.000000000000000000",
          code: "btc",
          id: 4,
          is_active: 1,
          is_crypto: 1,
          min_usable_amount: "0.000000000000000000",
          name: "BTC",
          withdrawal_min_amount: "0.000000000000000000",
        };
  $: activeBonus = bonuses.find(
    (b: any) => b.currency_id === selectedCurrency?.id
  );
  let bonusStatus = "on";

  let form: RegistrationForm = { ...EMPTY_REGISTRATION_FORM };
  let passwordScale: boolean[] = [];
  let errors: Record<string, Failure> = { [""]: { ...EMPTY_FAILURE } };

  const Email: Struct<string> = define<string>("email", (value) => {
    if (!isEmail(value)) {
      return "Enter valid email";
    }
    if (isNotAvailable.email) {
      return "Email is already taken";
    }
    return true;
  });

  const usernameCheck = define("usernameCheck", (value) => {
    if (typeof value !== "string") {
      return "Value must be a string";
    }
    if (value.length < 5) {
      return "Min. length is 5 characters";
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
      return "Value must contain A-z, 0-9, -, _";
    }
    if (isNotAvailable.username) {
      return "Username is already taken";
    }
    return true;
  });

  const passwordCh = define("passwordCh", () => {
    if (!isPasswordSuccess) {
      return "Incomplete Password";
    }
    return true;
  });
  // first_name: lettersOnly,
  // last_name: lettersOnly,
  const User: Struct<any> = object({
    username: usernameCheck,
    email: Email,
    password: passwordCh,
    confirm_password: passwordCh,
  });
  // phone_code: size(string(), 1, 10),
  // phone_country: size(string(), 1, 10),
  // phone_number: size(string(), 1, 40),

  let btag: string | null = null;
  // let uta: string | null = null;

  async function onSignUp() {
    form.confirm_password = form.password;
    const [structError, _f] = validate(form, User);
    if (structError instanceof StructError) {
      errors = mapErrors(structError.failures());
      return;
    }
    errors = { [""]: { ...EMPTY_FAILURE } };

    //check availability
    if (
      isCheckingUsernameAvailability ||
      isCheckingEmailAvailability ||
      isNotAvailable.email ||
      isNotAvailable.username ||
      !isPasswordSuccess
    ) {
      return;
    }

    if (Cookies.get("btag")) {
      btag = Cookies.get("btag")!;
    }

    loading["submit"] = true;
    const [_, error] = await api.auth.register(
      form,
      btag,
      selectedCurrency?.id,
      bonusStatus === "on" ? activeBonus?.id : undefined
    );
    if (!error) {
      closeModal();
      await api.auth.login({
        email: form.email,
        password: form.password,
      });
      go(
        "dashboard",
        activeBonus?.id && bonusStatus === "on" ? "bonuses" : "my-account"
      );
      onSuccess();
    }
    loading["submit"] = false;
  }

  let usernameTimer: any;
  let isCheckingUsernameAvailability: boolean = false;
  async function checkUsernameAvailability(e: any) {
    const username: string = e.target.value;
    if (!username.length) {
      clearTimeout(usernameTimer);
      errors = { ...errors, ["username"]: { ...EMPTY_FAILURE } };
      loading["username"] = false;
      return;
    }
    if (!checkUsernameValidity(username)) {
      clearTimeout(usernameTimer);
      errors = { ...errors, ["username"]: { ...EMPTY_FAILURE } };
      errors["username"].message = "Value must contain A-z, 0-9, -, _";
      loading["username"] = false;
      return;
    }
    if (username.length < 5) {
      clearTimeout(usernameTimer);
      usernameTimer = setTimeout(async () => {
        errors = { ...errors, ["username"]: { ...EMPTY_FAILURE } };
        errors["username"].message = "Min. length is 5 characters";
        loading["username"] = false;
      }, 1000);
      return;
    }
    if (username.length > 25) {
      clearTimeout(usernameTimer);
      errors = { ...errors, ["username"]: { ...EMPTY_FAILURE } };
      errors["username"].message = "Max. length is 25 characters";
      loading["username"] = false;
      return;
    }
    if (username.length >= 5) {
      clearTimeout(usernameTimer);
      loading["username"] = true;
      isCheckingUsernameAvailability = true;
      usernameTimer = setTimeout(async () => {
        await isUsernameAvailable(username);
        isCheckingUsernameAvailability = false;
      }, 2000);
    }
  }
  async function isUsernameAvailable(val: string) {
    isNotAvailable.username = false;
    const [isAvailable] = await auth.checkEmailUsername(val);
    if (!isAvailable) {
      errors = { ...errors, ["username"]: { ...EMPTY_FAILURE } };
    } else {
      errors = { ...errors, ["username"]: { ...EMPTY_FAILURE } };
      errors["username"].message = "Username is already taken";
      isNotAvailable.username = true;
    }
    loading["username"] = false;
    return false;
  }

  let emailTimer: any;
  let isCheckingEmailAvailability: boolean = false;

  async function checkEmailAvailability(e: any) {
    const email: string = e.target.value;
    const [valError, _] = validate(email, Email);
    if (email.length && valError instanceof StructError) {
      clearTimeout(emailTimer);
      emailTimer = setTimeout(() => {
        errors = { ...errors, ["email"]: { ...EMPTY_FAILURE } };
        errors["email"].message = "Enter valid email";
        loading["email"] = false;
        return;
      }, 500);
    }
    if (!email.length) {
      clearTimeout(emailTimer);
      errors = { ...errors, ["email"]: { ...EMPTY_FAILURE } };
      loading["email"] = false;
      return;
    }
    if (isEmail(email)) {
      clearTimeout(emailTimer);
      loading["email"] = true;
      isCheckingEmailAvailability = true;
      emailTimer = setTimeout(async () => {
        await isEmailAvailable(email);
        isCheckingEmailAvailability = false;
      }, 2000);
    }
  }
  async function isEmailAvailable(email: string) {
    isNotAvailable.email = false;
    const [isAvailable] = await auth.checkEmailUsername(email);
    if (!isAvailable) {
      errors = { ...errors, ["email"]: { ...EMPTY_FAILURE } };
    } else {
      errors = { ...errors, ["email"]: { ...EMPTY_FAILURE } };
      errors["email"].message = "Email is already taken";
      isNotAvailable.email = true;
    }
    loading["email"] = false;
    return false;
  }

  $: isPasswordMoreThan8character = form.password.length >= 8;
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

    if (passwordContainsDigit.test(form.password)) {
      passwordContainsNumber = true;
    } else {
      passwordContainsNumber = false;
    }
    if (passwordContainsUpperCaseRegex.test(form.password)) {
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
      errors = { ...errors, ["password"]: { ...EMPTY_FAILURE } };
      errors["password"].message = "Incomplete Password";
    }
    if (e.target.value.length == 0 || isPasswordSuccess) {
      errors = { ...errors, ["password"]: { ...EMPTY_FAILURE } };
    }
  }

  onMount(async () => {
    const [res, err] =
      await api.bonuses.getBonusTypesByGroup("registration-bonus");
    if (!err) {
      bonuses = res?.bonus_types;
    }
  });
</script>

<div class="bonus-section">
  {#if $currencies.length}
    {#if activeBonus}
      <GiftBox
        bind:selectedCurrency
        bind:activeBonus
        onChange={(val) => (bonusStatus = val)}
      />
    {/if}
    <CurrencySelect
      currencies={sortCurrencies(
        $currencies.filter(
          (c) =>
            (c.is_active && c.is_crypto) || c.name === "EUR" || c.name === "GBP"
        )
      )}
      {selectedCurrency}
      on:select={({ detail }) => (selectedCurrency = detail)}
    />
  {/if}
</div>
<form action="./" on:submit|preventDefault={onSignUp} class="register">
  <div class="overflow">
    <div class="border-line"></div>
    <Input
      bind:value={form.username}
      placeholder={"Username"}
      loading={loading["username"]}
      autocomplete="username"
      name="username"
      error={errors && errors["username"]}
      on:input={(e) => checkUsernameAvailability(e)}
    />
    <Input
      bind:value={form.email}
      placeholder={"Email"}
      loading={loading["email"]}
      autocomplete="email"
      name="email"
      error={errors && errors["email"]}
      on:input={(e) => checkEmailAvailability(e)}
    />
    <Input
      bind:value={form.password}
      placeholder={"Password"}
      type="password"
      name="password"
      autocomplete="new-password"
      isPassword
      error={errors && errors["password"]}
      on:input={(e) => passwordCheck(e)}
    />
    {#if form.password.length}
      <ul class="password-check">
        <li>
          <img
            src={passwordContainsUpperCase ? ArrowChecked : Arrow}
            alt="check-mark"
          />
          Includes lower and upper case characters
        </li>
        <li>
          <img
            src={passwordContainsNumber ? ArrowChecked : Arrow}
            alt="check-mark"
          />
          At least one number
        </li>
        <li>
          <img
            src={isPasswordMoreThan8character ? ArrowChecked : Arrow}
            alt="check-mark"
          />
          Minimum 8 characters
        </li>
      </ul>
    {/if}
  </div>
  <div class="bottom mt-auto">
    <div class="terms">
      <span>
        By signing up, you agree with our
        <a href="https://bcfun.fun/terms" target="_blank" class="link">
          Terms & Conditions
        </a>
        and confirm you're over 18.
      </span>
    </div>
    <Button type="submit" loading={loading["submit"]}>{"Sign up"}</Button>
  </div>
</form>

<style lang="scss">
  .bonus-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: var(--brand-padding-x);
  }
  .border-line {
    width: 50%;
    height: 1px;
    background-color: #545463;
    margin: 10px auto;
  }
  .register {
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1 0 0;
    /* min-height: 700px; */
    @media (max-width: 992px) {
      flex: 1 0 0;
    }

    .overflow {
      height: 100%;
      overflow: visible;
      overflow-y: clip;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;
      padding: var(--brand-padding-x);
    }
    .bottom {
      display: flex;
      flex-direction: column;
      padding: var(--brand-padding-x);
      gap: 15px;
    }
    .terms {
      margin-top: auto;
      font-size: 13px;
      line-height: 22px;
      color: var(--white);
      text-align: center;
      @media (max-width: 992px) {
        margin-top: initial;
      }
      .link {
        text-decoration: underline;
        color: var(--white);
        &:hover {
          text-decoration: none;
        }
      }
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
    }
  }
</style>
