<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import clickOutside from "$lib/utils/clickOutside";
  import Arrow from "./assets/arrow_down.svg";

  const dispatch = createEventDispatcher();

  import Input from "$lib/elements/Input";

  export let items: Array<any> = [];
  export let value: any;
  export let displayKey: any = null;
  export let tabIndex = 0;
  export let blurOnSelect = true;
  export let placeholder = "";
  export let searchable = false;
  export let searchablePlaceholder = "";

  export let showPlaceholder: boolean = false;
  export let showArrow: boolean = false;

  let ref;
  let isOpen = false;
  let searchedString = "";

  const onFocus = () => {
    isOpen = !isOpen;
  };
  const onBlur = () => {
    isOpen = false;
  };
  if (displayKey && searchable) {
    searchedString = value[displayKey];
  }
  const onItemClick = (e: Event, item: any) => {
    e.stopPropagation();
    if (blurOnSelect) {
      onBlur();
    }
    value = item;
    searchedString = item[displayKey];
    dispatch("select", item);
  };
  const slots: any = $$slots;
</script>

<!-- w-100 -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- class={`${dropdownStyle({ isFocused: isOpen, isSearch: searchable })} `} -->
<div
  class="drpdwn"
  bind:this={ref}
  on:click={onFocus}
  on:keydown={onFocus}
  on:blur={onBlur}
  tabindex={tabIndex}
>
  {#if placeholder && !value && !searchable}
    <div class="selected-item">{placeholder}</div>
  {/if}

  {#if showPlaceholder && value.length}
    <div class="placeholder">{placeholder}</div>
  {/if}

  {#if slots?.selectedItem}
    <slot name="selectedItem" item={value} />
  {:else if displayKey}
    {#if searchable}
      <div use:clickOutside on:click_outside={onBlur}>
        <Input
          type="text"
          placeholder={searchablePlaceholder}
          bind:value={searchedString}
          on:focus={onFocus}
        />
        <!-- selectText={true} -->
      </div>
    {:else}
      <div class="selected-item">{value ? value[displayKey] : ""}</div>
    {/if}
  {:else}
    <div class="selected-item">{value || ""}</div>
  {/if}
  <div class="select-arrow">
    <!-- <Arrow direction={isOpen ? 'up' : 'down'} width={12} height={12} /> -->
  </div>
  {#if isOpen}
    <div class="list scrollbar">
      {#each items as item}
        <!-- add on:click on item-wrapper. slots cant have directives :( -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={(e) => onItemClick(e, item)} class="item-wrapper">
          {#if slots?.listItem}
            <slot name="listItem" {item} />
          {:else if displayKey}
            <div class="list-item">{item[displayKey]}</div>
          {:else}
            <div class="list-item">{item}</div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
  {#if showArrow}
    <div class={isOpen ? "up arrow" : "arrow"}>
      <img src={Arrow} alt="arrow_down" />
    </div>
  {/if}
</div>

<style lang="scss">
  .placeholder {
    font-size: 12px;
    font-weight: 600;
    color: var(--brand-primary);
    position: absolute;
    top: 0;
    left: 15px;
  }
  .drpdwn {
    position: relative;
    background-color: transparent;
    border: 1px solid var(--input-primary-highlight);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    width: 100%;
    min-width: 140px;
    height: 50px;
    border-radius: 8px;
    & .selected-item {
      transition: all 0.2s;
      position: absolute;
      color: rgba(255, 255, 255, 0.7);
      left: 15px;
      top: 24px;
      transform: translate(0, -50%);
      pointer-events: none;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
    }
    .item-wrapper {
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 56px;
      background-color: var(--layer-0);
      border-bottom: 1px solid var(--brand-stroke);
      padding: 0px 15px;
      &:hover {
        filter: brightness(85%);
      }
      &:last-of-type {
        border-bottom: 0;
      }
      & > .list-item {
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 600;
      }
    }

    & > .list {
      border-radius: 8px;
      overflow: auto;
      min-width: fit-content;
      z-index: 1;
      position: absolute;
      top: 56px;
      left: 0;
      width: 100%;
      max-height: 185px;
      text-transform: capitalize;
    }

    .arrow {
      position: absolute;
      right: 12px;
      filter: invert(1);
      width: 24px;
      height: 24px;
      transition: all 0.4s ease-in-out;
    }

    .up {
      transform: rotate(180deg);
    }
  }
</style>
