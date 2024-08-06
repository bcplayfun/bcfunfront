<script lang="ts">
  import { EMPTY_FAILURE } from "$lib/types/validation";
  import { detectErrors } from "$lib/utils/superstructErros";
  import type { Failure } from "superstruct";
  import type { AutocompleteTypes } from ".";
  import CircleLoading from "../Button/CircleLoading.svelte";
  import * as Assets from "$lib/components/Profile/Settings/assets/";

  export let value: string = "";
  export let placeholder: string = "";
  export let nativePlaceholder: string = "";
  export let multiline: boolean = false;
  export let type: "password" | "text" | "email" | "number" = "text";
  export let isPassword: boolean = false;
  export let error: Failure = { ...EMPTY_FAILURE };
  export let autocomplete: AutocompleteTypes = "off";
  export let isTrim: boolean = false;
  export let inputmode:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url" = "text";
  let inputRef: HTMLInputElement;
  let isPasswordShown: boolean = false;
  export let transform: "default" | "capitalize" | "uppercase" | "lowercase" =
    "default";
  export let background:
    | "blue"
    | "transparent"
    | "tWhite"
    | "brand-secondary"
    | "green"
    | "grey" = "transparent";
  export let name = "";
  export let color: "" | "white" = "";
  export let size: "small" | "normal" | "large" = "normal";
  export let loading = false;
  export let disabled = false;

  export const focus = () => {
    inputRef?.focus();
  };

  $: inputType = isPassword ? (isPasswordShown ? "text" : "password") : type;

  function handleInput(e: any) {
    value = type.match(/^(number|range)$/)
      ? e.target.value === ""
        ? ""
        : e.target.value
      : e.target.value;
    if (isTrim) {
      value = value.trim();
    }
    if (error) {
      error = EMPTY_FAILURE;
    }
  }

  const showPassword = () => {
    isPasswordShown = !isPasswordShown;
  };

  function getBgClass() {
    if (!background) {
      return "";
    }
    return `bg--${background}`;
  }
  function getTransformClass() {
    if (!transform) {
      return "";
    }
    return `transform--${transform}`;
  }
</script>

<div class="full {error?.message && 'input-error'}">
  <div
    class={`input-wrapper ${color} ${size} ${
      $$props.class
    } ${getBgClass()} ${getTransformClass()}`}
    style:height={multiline ? "100%" : "50px"}
  >
    {#if multiline}
      <textarea bind:value {placeholder} on:input />
    {:else}
      <input
        bind:this={inputRef}
        {value}
        placeholder={nativePlaceholder}
        type={inputType}
        {inputmode}
        {disabled}
        {autocomplete}
        {name}
        on:input={handleInput}
        on:input
        on:keyup
        on:focus
        on:blur
      />
      {#if placeholder}
        <span class="placeholder">{placeholder}</span>
      {/if}
      {#if isPassword}
        <span
          class="show-password"
          on:click|preventDefault={showPassword}
          on:keydown|preventDefault={showPassword}
          >{isPasswordShown ? "Hide" : "Show"}</span
        >
      {/if}
      {#if loading}
        <div class="loading">
          <CircleLoading size="15px" />
        </div>
      {/if}
      {#if disabled}
        <div class="lock">
          <svelte:component this={Assets.ResponsibleIcon} fill="#394f69" />
        </div>
      {/if}
    {/if}
    <slot />
  </div>
  {#if error?.message}
    <span class="error">{detectErrors(error) || "Error"}</span>
  {/if}
</div>

<style lang="scss">
  .loading {
    position: absolute;
    right: 15px;
  }
  .full {
    width: 100%;
  }

  .lock {
    position: absolute;
    right: 10px;
    width: 15px;
    height: 15px;
  }
  .input-error {
    .input-wrapper input,
    .input-wrapper textarea {
      border: 1px solid var(--red);
    }
    .placeholder {
      color: var(--red) !important;
    }
  }
  .input-wrapper {
    position: relative;
    width: 100%;
    background-color: var(--input-primary);
    height: 50px;
    border-radius: 8px;
    overflow: visible;
    display: flex;
    align-items: center;
    transition: border 0.2s ease-in-out;
  }
  input,
  textarea {
    background-color: var(--input-primary);
    border: 1px solid var(--input-primary-highlight);
    width: 100%;
    height: 100%;
    border-radius: 8px;
    outline: none;
    padding: 0 15px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    caret-color: var(--brand-primary);
    transition: 0.3s ease-in-out;

    &:hover:not(.disabled) {
      background-color: var(--input-primary-highlight);
    }
    &:focus,
    &:not(:placeholder-shown),
    &:-webkit-autofill {
      + .placeholder {
        top: 8px;
        padding: 1px 5px;
        font-size: 10px;
        color: var(--brand-primary);
      }
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    box-shadow: 0 0 0px 1000px transparent inset;
    /* -webkit-text-fill-color: ${theme.get("textColor")}; */
    /* -webkit-box-shadow: 0 0 0px 1000px #000 inset; */
    transition: background-color 5000000s ease-in-out 0s;
    -webkit-text-fill-color: rgba(255, 255, 255, 0.8);
    // font-size: 14px;
  }

  textarea {
    padding-top: 15px;
    resize: none;
    min-height: 110px;
  }

  .placeholder {
    transition: all 0.2s;
    position: absolute;
    color: white;
    left: 15px;
    top: 50%;
    transform: translate(0, -50%);
    pointer-events: none;
    font-size: 13px;
    font-weight: 600;
  }

  .error {
    display: block;
    color: var(--red);
    font-weight: 600;
    transition: 0.3s ease-in-out;
    line-height: 19px;
    font-size: 14px;
  }

  .show-password {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 2;
    right: 12px;
    color: var(--brand-primary);
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    user-select: none;
    text-transform: uppercase;
    &:hover {
      filter: brightness(1.1);
    }
  }

  .bg {
    &--blue {
      background-color: var(--input-background-color);
      input,
      textarea {
        background-color: var(--input-background-color);
        border-color: var(--input-border-color);
        &:hover:not(.disabled) {
          background-color: var(--input-background-color);
          border-color: var(--input-hover-color);
        }
        &:focus,
        &:not(:placeholder-shown),
        &:-webkit-autofill {
          border-color: var(--brand-primary) !important;
          + .placeholder {
            top: 8px;
            font-size: 10px;
            color: var(--brand-primary);
          }
        }
      }
    }
    &--transparent {
      background-color: transparent;
      input,
      textarea {
        background-color: transparent;
        border-color: var(--input-border-color);
        &:hover:not(.disabled) {
          background-color: transparent;
          border-color: var(--input-primary-highlight);
        }
        &:focus,
        &:not(:placeholder-shown),
        &:-webkit-autofill {
          border-color: var(--input-primary-highlight) !important;
          + .placeholder {
            background-color: var(--dialog-background-color);
            top: 0px;
            font-size: 10px;
          }
        }
      }
    }
  }
</style>
