<script context="module" lang="ts">
  export const EMPTY_VALUE = {
    phone_country: "",
    phone_code: "",
    phone_number: "",
  };

  export function isValueValid(val: any) {
    return !!val.phone_code && !!val.phone_country && !!val.phone_number;
  }

  export function validatePhone(val: typeof EMPTY_VALUE) {
    let codePresent = false;
    let numberPresent = false;

    if (val.phone_number) {
      numberPresent = true;
    }

    if (val.phone_code) {
      codePresent = true;
    }

    return {
      code: !codePresent,
      number: !numberPresent,
    };
  }
</script>

<script lang="ts">
  import Input from "$lib/elements/Input";
  import { cfIpCountry } from "$lib/stores/player";
  import CountryModal from "./CountryModal.svelte";
  import phone_codes from "./phone_codes.json";
  import { slide } from "svelte/transition";
  import { closeModal, openModal } from "../Modal";

  type PhoneCode = {
    code: string;
    country_code: string;
    display_value: string;
    country_name: string;
  };

  export let value = EMPTY_VALUE;
  type PhoneErrors = {
    code: any | null;
    number: any | null;
  };
  export let errors: PhoneErrors = {
    code: null,
    number: null,
  };
  export let placeholder = "Phone number";
  export let onInput = (val: typeof value) => {};
  export let theme: "default" | "settings" = "default";
  export let disabled = false;

  let selectedPhoneCodeImageSrc: string;
  let selectedPhoneCode: PhoneCode | null;
  let phoneCodeInputValue = "";
  let filteredPhoneCodes: PhoneCode[] = phone_codes as PhoneCode[];

  let prevValue = EMPTY_VALUE;

  $: {
    if (JSON.stringify(prevValue) !== JSON.stringify(value)) {
      onInput(value);
    }
    prevValue = { ...value };
  }

  $: if (value.phone_code && value.phone_country) {
    (async () => {
      const selected = (phone_codes as PhoneCode[]).find(
        (phoneCode) => phoneCode.country_code === value.phone_country
      );

      if (selected) {
        selectedPhoneCode = selected;
        phoneCodeInputValue = `+${selected.code}`;

        selectedPhoneCodeImageSrc = await import(
          `../../assets/country_flags/${selectedPhoneCode.country_code.toLowerCase()}.svg`
        ).then((value) => value.default);
      }
    })();
  }

  function onSelectPhoneCode(phoneCode: PhoneCode) {
    errors.code = null;
    value.phone_code = phoneCode.code;
    value.phone_country = phoneCode.country_code;
  }

  let load = false;

  $: if ($cfIpCountry && !load && theme == "default") {
    let selected = filteredPhoneCodes.find(
      (phone) => phone.country_code === $cfIpCountry
    );
    if (selected) {
      value.phone_code = selected.code;
      value.phone_country = selected.country_code;
    }
    onInput(value);
    load = true;
  }

  function onPhoneCodeInputFocus() {
    openModal(
      CountryModal,
      "",
      {
        filteredPhoneCodes,
        onSelect: (phoneCode) => {
          onSelectPhoneCode(phoneCode);
          closeModal();
        },
      },
      { type: "new" }
    );
  }
</script>

<div class="wrapper gap-16" class:settings={theme === "settings"}>
  <div>
    <div
      class="selected"
      class:active={selectedPhoneCode}
      class:error={errors.code}
      class:disabled
      on:click={() => {
        if (!disabled) {
          onPhoneCodeInputFocus();
        }
      }}
      on:keydown
    >
      {#if selectedPhoneCodeImageSrc}
        <img
          src={selectedPhoneCodeImageSrc}
          alt="selected phone flag"
          width="18"
          height="18"
          class="flag"
        />
      {:else}
        <span class="no-translate"> Code </span>
      {/if}
      <span class="value">
        {phoneCodeInputValue}
      </span>
    </div>
    {#if errors.code}
      <span
        class="s-error no-translate"
        in:slide={{ duration: 500 }}
        out:slide={{ duration: 0 }}>Enter code</span
      >
    {/if}
  </div>
  <Input
    error={errors.number && errors.number}
    bind:value={value.phone_number}
    on:input={() => (errors.number = null)}
    placeholder="Phone number"
    type="number"
    {disabled}
  />
  <!-- placeholder="Phone number" -->
  <!-- type="number" -->
</div>

<!-- width: 500px;
height: 538px;
top: -290px;
left: -15px; -->

<style lang="scss">
  .s-error {
    display: block;
    color: var(--red);
    font-weight: 600;
    transition: 0.3s ease-in-out;
    line-height: 19px;
    font-size: 14px;
  }
  .modal {
    position: fixed;
  }
  .wrapper {
    display: flex;
    align-items: flex-start;
    position: relative;
    border-radius: 8px;
    min-height: 50px;
    width: 100%;
  }
  .flag {
    pointer-events: none;
    user-select: none;
  }
  .wrapper {
    .selected {
      position: relative;
      background-color: transparent;
      border: 1px solid var(--input-border-color);
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 15px;
      gap: 6px;
      min-width: 115px;
      height: 50px;
      &.disabled {
        pointer-events: none;
      }
      &.active {
        border-color: var(--input-primary-highlight);
      }

      :global(svg) {
        height: 20px;
        width: 20px;
      }

      &.error {
        border: 1px solid var(--red);
        span:not(.value) {
          color: rgb(250, 80, 81) !important;
        }
      }
      & span.value {
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.7);
      }
      & > span:not(.value) {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        color: white;
        left: 15px;
        transition: all 0.1s;
        pointer-events: none;
        font-size: 14px;
        font-weight: 600;
        padding: 1px 5px;

        &.active {
          background-color: var(--dialog-background-color);
          top: 0;
          font-size: 10px;
        }
        &:empty {
          display: none;
        }
      }
    }

    &--bottom {
      position: absolute;
      top: calc(100% + 10px);
      z-index: 999;
      width: 320px;
      background: var(--layer-0);
      border-radius: 8px;
      overflow: auto;
      height: 195px;
      left: 0;
      display: none;

      &.active {
        display: block;
      }
    }
  }
</style>
