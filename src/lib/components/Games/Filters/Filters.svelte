<script lang="ts">
  import type { Provider } from "$lib/types/provider";
  import { page } from "$app/stores";
  import { Filter, Equalizer } from "$lib/elements/Icons";
  import { filters, gameTypes, isFiltersCalculated, liveGameTypes } from ".";
  import { closeModal, openModal } from "$lib/elements/Modal";
  import ProvidersModal from "./ProvidersModal.svelte";
  import { onDestroy, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { objectToUrlSearchParams } from "$lib/api/games";
  import { providers } from "$lib/stores/providers";

  let selectedProviders: string = "";
  let selectedTypes: string = "";
  let isMountCalculationsDone = false;
  export let url: string;

  onMount(() => {
    isMountCalculationsDone = true;
  });

  onDestroy(() => {
    $isFiltersCalculated = false;
  });

  $: query = {
    limit: $page?.url.searchParams?.get("limit"),
    offset: $page?.url.searchParams?.get("offset"),
    group_name: $page?.url.searchParams?.get("group_name"),
    provider_id: $page?.url.searchParams?.get("provider_id"),
  };

  function onQueriesUpdated(q: typeof query) {
    const newFilters: typeof $filters = {};
    if (q.limit) {
      newFilters.limit = parseInt(q.limit);
    } else {
      newFilters.limit = 57;
    }
    if (q.offset) {
      newFilters.page = parseInt(q.offset);
    } else {
      newFilters.page = 1;
    }
    if (q.group_name) {
      newFilters.group_name = q.group_name;
      selectedTypes = q.group_name;
    } else {
      selectedTypes = "";
    }
    if (q.provider_id) {
      newFilters.provider_id = q.provider_id;
      selectedProviders = q.provider_id;
    }
    $filters = newFilters;
    $isFiltersCalculated = true;
  }

  $: if (isMountCalculationsDone) {
    onQueriesUpdated(query);
  }

  function openProvidersModal() {
    openModal(
      ProvidersModal,
      "",
      {
        providers: $providers,
        selectedProviders,
        url: url,
        onChoose(provider: Provider) {
          closeModal();
          const params = objectToUrlSearchParams($filters);
          params.delete("provider_id");
          params.append("provider_id", provider.id.toString());
          goto(`/${url}?${params.toString()}`, {
            noScroll: true,
          });
        },
      },
      { type: "new" }
    );
  }

  function clearProvider() {
    selectedProviders = "";
    const params = objectToUrlSearchParams($filters);
    params.delete("provider_id");
    goto(`/${url}?${params.toString()}`, { noScroll: true });
  }

  function getProviderName(id: string) {
    return $providers.filter((provider) => id === provider.id.toString())[0]
      .name;
  }

  let scrollY: number;
</script>

<svelte:window bind:scrollY />

<div class="filter-container">
  <div class="providers-container">
    <div
      class="button"
      on:click={() => clearProvider()}
      on:keydown={() => clearProvider()}
    >
      <Filter chosenProvder={selectedProviders ? true : false} />
    </div>
    <div
      class="providers {selectedProviders && 'chosen'}"
      on:click={() => openProvidersModal()}
      on:keydown={() => openProvidersModal()}
    >
      {#if $providers?.length}
        {selectedProviders
          ? getProviderName(selectedProviders)
          : "All game providers"}
      {/if}
      <Equalizer fill={selectedProviders ? "#00BC3D" : "#9698A1"} />
    </div>
  </div>
  <div class="types d-flex">
    {#each url === "live" ? liveGameTypes : gameTypes as type}
      <div
        class="type"
        class:active={selectedTypes == type.key}
        on:click={() => {
          const params = objectToUrlSearchParams($filters);
          if (params.get("group_name") == type.key) {
            params.delete("group_name");
          } else {
            params.delete("group_name");
            params.append("group_name", type.key);
          }
          if (scrollY > 1200) {
            goto(`/${url}?${params.toString()}`, { noScroll: false });
          } else {
            goto(`/${url}?${params.toString()}`, { noScroll: true });
          }
        }}
        on:keydown
      >
        {type.title}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .filter-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 0 15px;

    @media (max-width: 992px) {
      gap: 10px;
      justify-content: space-between;
    }
    .providers-container {
      display: flex;
      gap: 10px;
    }
    .providers {
      position: relative;
      width: max-content;
      height: 40px;
      padding: 0 15px;
      font-size: 14px;
      font-weight: 700;
      color: var(--chip-text-color);
      border-radius: 8px;
      background-color: var(--chip-bg-color);
      cursor: pointer;
      letter-spacing: 0.25px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 10px;
      &.chosen {
        color: white;
      }
    }
    .button {
      width: 40px;
      height: 40px;
      min-width: 40px;
      font-size: 28px;
      border-radius: 8px;
      background-color: var(--chip-bg-color);
      transition: color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .types {
      display: flex;
      overflow-x: auto;
      margin-left: auto;
      padding-bottom: 5px;

      @media (max-width: 992px) {
        order: 3;
        width: 100%;
      }

      .type {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        padding: 11px 15px;
        margin: 0 5px;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--chip-text-color);
        border-radius: 8px;
        background-color: var(--chip-bg-color);
        transition: 0.2s ease-in-out;
        cursor: pointer;
        white-space: nowrap;
        &.active {
          background-color: var(--brand-primary);
          color: white;
        }
        &:first-of-type {
          margin-left: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
</style>
