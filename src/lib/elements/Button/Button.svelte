<script lang="ts">
  import CircleLoading from "./CircleLoading.svelte";

  export let text: boolean = false;
  export let skeleton: boolean = false;
  export let w100: boolean = false;
  export let color: "" | "white" = "";
  export let background:
    | "blue"
    | "transparent"
    | "tWhite"
    | "brand-secondary"
    | "green"
    | "grey"
    | "white" = "blue";
  export let type: "submit" | undefined = undefined;
  export let loading: boolean = false;
  export let round: boolean = false;
  export let size: "small" | "normal" | "large" = "normal";
  export let transform: "default" | "capitalize" | "uppercase" | "lowercase" =
    "default";
  export let disabled: boolean = false;
  export let title = "";

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

<button
  on:click|stopPropagation
  class:w100
  class:skeleton
  class:text
  class:round
  class:loading
  class={`${color} ${size} ${
    $$props.class
  } ${getBgClass()} ${getTransformClass()}`}
  {type}
  {disabled}
  {title}
>
  <slot />
  {#if loading}
    <CircleLoading />
  {/if}
</button>

<style lang="scss">
  .bg {
    &--blue {
      background-color: rgba(0, 139, 44, 0.7);
      background-image: conic-gradient(
        from 1turn,
        rgb(0, 188, 61),
        rgb(0, 139, 44)
      );
      &:hover {
        filter: brightness(1.1);
        outline: 2px solid #29292f;
      }
      &:active {
        filter: none;
      }
    }
    &--transparent {
      background-color: transparent;
      border: 1px solid var(--brand-stroke);
      &:hover {
        border-color: white;
        filter: none;
      }
    }
    &--tWhite {
      background-color: transparent;
      border: 1px solid white;
    }
    &--brand-secondary {
      background-color: var(--brand-secondary);
      color: var(--brand-primary);
    }
    &--white {
      background-color: #1d803ab3;
      background-image: conic-gradient(
        from 1turn,
        rgba(88, 175, 16, 1),
        rgba(29, 128, 58, 1)
      );
    }
    &--green {
      background-color: var(--green);
      &:hover {
        outline: none;
      }
    }
    &--grey {
      background-color: var(--cp-grey-dark-1);
      color: white;
    }
  }
  .transform {
    &--lowercase {
      text-transform: lowercase;
    }
    &--uppercase {
      text-transform: uppercase;
    }
    &--capitalize {
      text-transform: capitalize;
    }
  }
  button {
    border: none;
    font-size: 0.875rem;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.3s;
    cursor: pointer;
    font-weight: 600;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline-color: #29292f;
    gap: 5px;
    @media (max-width: 768px) {
      padding: 0.5rem 0.75rem;
    }
    &:hover {
      filter: brightness(1.1);
      outline: 1px solid #29292f;
    }
    &.text {
      background-color: transparent;
      color: white;
      &.skeleton {
        height: 24px;
      }
    }
    &.w100 {
      width: 100%;
    }
    &.skeleton {
      min-width: 101px;
      height: 40px;
    }
    &.white {
      color: var(--white);
    }

    &.round {
      border-radius: 50%;
      padding: 0px;
      aspect-ratio: 1;
    }

    &.small {
      height: 32px;
      width: fit-content;
    }
    &.large {
      width: 100%;
      height: 50px;
    }

    &:disabled {
      opacity: 0.4;
      pointer-events: none;
    }
    &.loading {
      pointer-events: none;
    }
  }
</style>
