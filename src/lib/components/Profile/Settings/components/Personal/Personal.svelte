<script lang="ts">
  import Input from "$lib/elements/Input/Input.svelte";
  import { player } from "$lib/stores/player";
  import AccountInfoField from "./AccountInfoField.svelte";
  import PhoneInput from "$lib/elements/PhoneInput/PhoneInput.svelte";
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";

  import { isEmail } from "$lib/utils/validation";
  import { EMPTY_FAILURE } from "$lib/types/validation";

  import dayjs from "dayjs";

  import DateInput from "$lib/elements/Input/DateInput.svelte";
  import Button from "$lib/elements/Button";
  import type { Failure } from "superstruct";

  let _data = {} as any;
  let activeEditField: any = null;
  let loading: boolean = false;

  let errors: Record<string, Failure> = { [""]: { ...EMPTY_FAILURE } };

  const submit = async () => {
    loading = true;
    if (Object.entries(_data).length < 1) {
      Alert.warning("Same data");
      return;
    }
    errors = { [""]: { ...EMPTY_FAILURE } };
    const [_, err] = await api.players.updatePlayer(_data);
    if (!err) {
      Alert.success("Updated");
      activeEditField = null;
      await api.players.info();
    }
    loading = false;
  };

  function onInput(e: any, field: string) {
    if (field === "email") {
      if ("email" in _data) {
        delete _data["email"];
      }
      errors = { ...errors, ["email"]: { ...EMPTY_FAILURE } };
      if (!isEmail(e.target.value)) {
        errors.email.message = "Enter valid email";
        return;
      }
      if ($player.email == e.target.value) {
        return;
      }
      return (_data.email = e.target.value);
    }
    if (field === "first_name") {
      if ("first_name" in _data) {
        delete _data["first_name"];
      }
      errors = { ...errors, ["first_name"]: { ...EMPTY_FAILURE } };
      if (e.target.value.length < 2) {
        errors.first_name.message = "Min. 2 characters";
        return;
      }
      if ($player.first_name == e.target.value) {
        return;
      }
      return (_data.first_name = e.target.value);
    }
    if (field === "last_name") {
      if ("last_name" in _data) {
        delete _data["last_name"];
      }
      errors = { ...errors, ["last_name"]: { ...EMPTY_FAILURE } };
      if (e.target.value.length < 2) {
        errors.last_name.message = "Min. 2 characters";
        return;
      }
      if ($player.last_name == e.target.value) {
        return;
      }
      return (_data.last_name = e.target.value);
    }
  }

  let isClear = false;
  function onDateValue(detail: string) {
    if ("birth_date" in _data) {
      delete _data["birth_date"];
    }
    errors = { ...errors, ["birth_date"]: { ...EMPTY_FAILURE } };
    if (detail === $player.birth_date) {
      return;
    }
    let [year, mm, dd] = detail.split("-");
    if (year === "YYYY") {
      return;
    }
    if (year?.includes("Y") || parseInt(year) < 1940) {
      errors["birth_date"].message = "Valid from 1940";
      isClear = true;
      return;
    }
    if (parseInt(year) > dayjs().year() - 18) {
      errors["birth_date"].message = "You are under 18";
      isClear = true;
      return;
    }
    if (mm?.includes("M") || parseInt(mm) > 12) {
      errors["birth_date"].message = "The value must be 01-12";
      isClear = true;
      return;
    }
    if (dd?.includes("D") || parseInt(dd) > 31) {
      errors["birth_date"].message = "The value must be 01-31";
      isClear = true;
      return;
    }
    isClear = false;
    return (_data.birth_date = detail);
  }

  $: birthDate = $player.birth_date || "YYYY-MM-DD";

  async function clear() {
    isClear = false;
    if ("birth_date" in _data) {
      delete _data["birth_date"];
    }
    birthDate = "YYYY-MM-DD";
    errors = { ...errors, ["birth_date"]: { ...EMPTY_FAILURE } };
  }
</script>

<div class="block">
  <div class="content mb-10">
    <AccountInfoField field="fullName">
      <div class="d-flex gap-14">
        <Input
          value={$player.first_name}
          on:input={(e) => onInput(e, "first_name")}
          error={errors && errors["first_name"]}
          disabled={$player.kyc_status == 1}
          nativePlaceholder={"First name"}
        />
        <Input
          value={$player.last_name}
          on:input={(e) => onInput(e, "last_name")}
          error={errors && errors["last_name"]}
          disabled={$player.kyc_status == 1}
          nativePlaceholder={"Last name"}
        />
      </div>
    </AccountInfoField>
    <AccountInfoField field={"birthDate"}>
      <DateInput
        value={birthDate}
        error={errors && errors["birth_date"]}
        on:value={({ detail }) => onDateValue(detail)}
        disabled={$player.kyc_status == 1}
      >
        <!-- {#if isClear}
          <div class="clear" on:click={() => clear()} on:keydown>
            Clear
          </div>
        {/if} -->
      </DateInput>
    </AccountInfoField>
    <AccountInfoField field={"phone"}>
      <PhoneInput
        errors={{
          code:
            errors && (errors["phone_code"] || errors["phone_country"])
              ? true
              : null,
          number:
            errors && errors["phone_number"] ? errors["phone_number"] : null,
        }}
        disabled={$player.kyc_status == 1}
        theme="settings"
        value={{
          phone_code: $player.phone_code,
          phone_country: $player.phone_country,
          phone_number: $player.phone_number,
        }}
        onInput={(phone) => {
          if (
            $player.phone_country === phone.phone_country &&
            $player.phone_number === phone.phone_number
          ) {
            return;
          }
          _data = phone;
        }}
      />
    </AccountInfoField>
    <AccountInfoField field={"email"} disabled={$player.email_verified_at}>
      <Input
        value={$player.email}
        on:input={(e) => onInput(e, "email")}
        error={errors && errors["email"]}
        disabled={$player.email_verified_at}
      />
    </AccountInfoField>
    <AccountInfoField field={"username"}>
      <Input
        value={$player.username}
        error={errors && errors["username"]}
        disabled
      />
    </AccountInfoField>
  </div>
  <Button on:click={() => submit()}>Save</Button>
  <div class="anounce mt-10">
    Please contact support to update read only fields.
  </div>
</div>

<style lang="scss">
  .block {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 30px 0 0;

    .content {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .anounce {
      font-size: 14px;
      color: var(--settings-subtitle-color);
    }
  }
</style>
