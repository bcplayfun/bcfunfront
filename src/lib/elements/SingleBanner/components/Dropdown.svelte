<script lang="ts">
  import { currencies } from "$lib/stores/static";
  import { sortCurrencies } from "$lib/utils/currency";
  import DropdownItem from "./DropdownItem.svelte";
  import DropdownItemHandle from "./DropdownItemHandle.svelte";

  export let activeCurrencyID: number;
  let isOpen = false;

  function choosePack(id: number) {
    activeCurrencyID = id;
    isOpen = false;
  }

  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="dropdown">
  <div class="handle" on:click={toggle} on:keydown>
    <DropdownItemHandle bind:activeCurrencyID bind:isOpen />
  </div>
  <div class="tag">Currency</div>
  {#if isOpen}
    <!-- <select>
    {#each sortCurrencies($currencies.filter((c) => c.is_active)) as currency, index}
      <div
        class="pack"
        class:active={activeCurrencyID === currency.id}
        on:click={() => choosePack(currency.id)}
        on:keydown
      >
        <DropdownItem bind:currency />
      </div>
      <option value={index}>
        <div
          class="pack"
          class:active={activeCurrencyID === currency.id}
          on:click={() => choosePack(currency.id)}
          on:keydown
        >
          <DropdownItem bind:currency />
        </div>
      </option>
    {/each}
  </select> -->

    <div class="list">
      {#each sortCurrencies($currencies.filter((c) => c.is_active)) as currency, index}
        <div
          class="pack"
          class:active={activeCurrencyID === currency.id}
          on:click={() => choosePack(currency.id)}
          on:keydown
        >
          <DropdownItem bind:currency />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .dropdown {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 23;
    .handle {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 15px;
      border: 1px solid var(--input-primary-highlight);
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;

      cursor: pointer;
    }

    .tag {
      position: absolute;
      padding: 0 3px;
      top: -8px;
      left: 15px;
      font-size: 12px;
      font-weight: 600;
      color: var(--brand-primary);
      background-color: var(--dialog-background-color);
    }

    .list {
      background: var(--dialog-background-color);
      position: absolute;
      top: calc(100% + 5px);
      border: 1px solid var(--input-primary-highlight);
      /* border-radius: 8px; */
      width: 100%;
      max-height: 200px;
      overflow: auto;

      padding: 5px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      &::-webkit-scrollbar-thumb {
        background-color: var(--brand-stroke);
        border-radius: 2px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }

      .pack {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 15px;

        font-weight: 500;
        font-size: 13px;
        cursor: pointer;

        &:first-of-type,
        &:nth-of-type(2) {
          height: 45px;
          grid-column: span 2;
          text-align: center;
          justify-content: center;
        }

        /* border-right: 1px solid var(--input-primary-highlight); */
        /* margin: 0 0 5px; */

        &:hover,
        &.active {
          background-color: var(--input-primary-highlight);
        }

        &:last-of-type {
          margin: 0;
          border-bottom: none;
        }
      }
    }
  }
</style>
