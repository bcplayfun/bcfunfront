<script lang="ts">
  import { EMPTY_FAILURE } from "$lib/types/validation";
  import { detectErrors } from "$lib/utils/superstructErros";
  import type { Failure } from "superstruct";
  import { createEventDispatcher, onMount } from "svelte";
  import * as Assets from "$lib/components/Profile/Settings/assets/";

  export let error: Failure = { ...EMPTY_FAILURE };

  export let placeholder: string = "YYYY-MM-DD";
  export let dataSlots: string = "YMD";
  export let value: string = "";
  export let disabled = false;

  const dispatch = createEventDispatcher();

  let input: HTMLInputElement | null;
  onMount(() => {
    const el: HTMLInputElement | null = input;

    if (!el) {
      console.error("Input element not found");
      return;
    }

    const pattern: string = placeholder;
    const slots: Set<string> = new Set(dataSlots || "_");
    const prev: () => number[] = (() => {
      let j = 0;
      return () =>
        Array.from(pattern, (c, i) => (slots.has(c) ? (j = i + 1) : j));
    })();

    const first: number = [...pattern].findIndex((c) => slots.has(c));
    const accept: RegExp = new RegExp("\\d", "g");

    const clean = (input: any): string[] => {
      input = input.match(accept) || [];
      return Array.from(pattern, (c) =>
        input[0] === c || slots.has(c) ? input.shift() || c : c
      );
    };

    const format = () => {
      const [i, j] = [el.selectionStart, el.selectionEnd].map((i) => {
        //@ts-ignore
        i = clean(el.value.slice(0, i)).findIndex((c) => slots.has(c));
        return i < 0
          ? prev()[prev().length - 1]
          : back
            ? prev()[i - 1] || first
            : i;
      });

      el.value = clean(el.value).join("");
      el.setSelectionRange(i, j);
      dispatch("value", el.value);
      back = false;
    };

    let back: boolean = false;

    el.addEventListener("keydown", (e) => (back = e.key === "Backspace"));
    el.addEventListener("input", format);
    el.addEventListener("focus", format);
    el.addEventListener("blur", () => el.value === pattern && (el.value = ""));
  });
</script>

<div class="full {error?.message && 'input-error'}">
  <div class="input-wrapper">
    <input
      bind:value
      bind:this={input}
      data-slots={dataSlots}
      {placeholder}
      {disabled}
      on:input
      on:blur
    />
    {#if disabled}
      <div class="lock">
        <svelte:component this={Assets.ResponsibleIcon} fill="#394f69" />
      </div>
    {/if}
  </div>
  <slot />
  {#if error?.message}
    <span class="error">{detectErrors(error) || "Error"}</span>
  {/if}
</div>

<style lang="scss">
  .lock {
    position: absolute;
    right: 10px;
    width: 15px;
    height: 15px;
  }
  .input-error {
    .input-wrapper input {
      border-color: var(--red) !important;
    }
    .placeholder {
      color: var(--red) !important;
    }
  }

  .input-wrapper {
    position: relative;
    width: 100%;
    background-color: transparent;
    height: 50px;
    border-radius: 8px;
    overflow: visible;
    display: flex;
    align-items: center;
    transition: border 0.2s ease-in-out;
  }
  input {
    background-color: transparent;
    border: 1px solid var(--input-border-color);
    width: 100%;
    height: 100%;
    border-radius: 8px;
    outline: none;
    padding: 0 15px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    caret-color: var(--brand-primary);
    transition: 0.3s ease-in-out;
    /* 
    &::placeholder {
      color: transparent;
    } */
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

  .error {
    display: block;
    color: var(--red);
    font-weight: 600;
    transition: 0.3s ease-in-out;
    line-height: 19px;
    font-size: 14px;
  }
</style>
