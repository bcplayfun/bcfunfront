<script lang="ts">
  import Input from "$lib/elements/Input";
  import Search from "../Icons/Search.svelte";
  import phone_codes from "./phone_codes.json";

  type PhoneCode = {
    code: string;
    country_code: string;
    display_value: string;
    country_name: string;
  };
  export let filteredPhoneCodes: PhoneCode[];
  export let onSelect: (phone_code: PhoneCode) => void;

  function select(item: PhoneCode) {
    onSelect(item);
  }

  const flagCache = new Map();
  async function getFlag(flag: string) {
    if (flagCache.has(flag)) {
      return flagCache.get(flag);
    }

    const flagIcon = await import(`../../assets/country_flags/${flag}.svg`);
    flagCache.set(flag, flagIcon.default);
    return flagIcon.default;
  }

  let isFocus: boolean = false;
  let inputValue: any = "";

  function search(event: any) {
    inputValue = event.target.value;
    filteredPhoneCodes = phone_codes.filter(
      (phoneCode) =>
        phoneCode.code.startsWith(inputValue) ||
        phoneCode.display_value
          .toLocaleLowerCase()
          .startsWith(inputValue.toLowerCase()) ||
        phoneCode.country_name
          .toLowerCase()
          .startsWith(inputValue.toLowerCase())
    );
    filteredPhoneCodes.sort((a, b) => {
      if (a.country_name > b.country_name) {
        return 1;
      } else if (a.country_name < b.country_name) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  const popular = ["GB", "DE", "FR", "IT", "CH", "SE", "NO"];

  const customComparator = (a: PhoneCode, b: PhoneCode) => {
    if (a.country_code === "GB") {
      return -1;
    } else if (b.country_code === "GB") {
      return 1;
    } else {
      return filteredPhoneCodes.indexOf(a) - filteredPhoneCodes.indexOf(b);
    }
  };
</script>

<div class="countries">
  <div class="search-wrapper {isFocus && 'focused'}">
    <div class="svg">
      <Search />
    </div>
    <Input
      on:focus={() => {
        isFocus = true;
      }}
      on:blur={() => {
        isFocus = false;
      }}
      on:input={(event) => search(event)}
      placeholder="Search country"
    />
  </div>
  {#if inputValue}
    {#if filteredPhoneCodes.length == 0}
      <div class="no-content">no content</div>
    {:else}
      <div class="body">
        {#each filteredPhoneCodes as item}
          <div on:click={() => select(item)} on:keydown class="item">
            {#await getFlag(item.country_code.toLowerCase())}
              ...
            {:then value}
              <img src={value} alt="" width="20" height="20" />
            {:catch error}
              !!!
            {/await}
            <div>{item.country_name} (+{item.code})</div>
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <div class="top">
      <div class="title">Popular countries</div>
      <div class="body">
        {#each filteredPhoneCodes
          .filter((phone) => popular.includes(phone.country_code))
          .sort(customComparator) as item}
          <div on:click={() => select(item)} on:keydown class="item">
            {#await getFlag(item.country_code.toLowerCase())}
              ...
            {:then value}
              <img src={value} alt="" width="20" height="20" />
            {:catch error}
              !!!
            {/await}
            <div>{item.country_name} (+{item.code})</div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .no-content {
    display: flex;
    justify-content: center;
    font-weight: 500;
  }
  .search-wrapper {
    width: 100%;
    position: relative;
    margin-bottom: 15px;
    .svg {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }
    &.focused .search-input {
      box-shadow: inset 0 0 0 1.5px var(--provider-tile-selected);
    }
  }
  .countries {
    width: 375px;
    overflow: auto;
    padding: 25px 15px 5px;
    position: relative;
    @media (max-width: 992px) {
      width: 100%;
    }
    .top {
      display: flex;
      flex-direction: column;
      .title {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 10px;
      }
    }
    .item {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 8px;
      font-size: 13px;
      padding: 14px 15px;
      transition: background 0.2s;
      border: 1px solid var(--input-border-color);

      &:hover {
        border-color: var(--input-primary-highlight);
      }
      :global(svg) {
        height: 20px;
        width: 20px;
      }
    }
    .show-more {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      margin: 0 auto;
      font-size: 14px;
      font-weight: 600;
      margin: 10px 0;
      cursor: pointer;
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
