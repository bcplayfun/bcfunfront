<script lang="ts">
  import api from "$lib/api";
  import LoadingOverlay from "$lib/elements/LoadingOverlay.svelte";
  import { langStore } from "$lib/utils/page";

  let content: any;
  let loading = false;

  $: if ($langStore) {
    getContent($langStore);
  }

  async function getContent(lang: "en" | "pt") {
    loading = true;
    [content] = await api.content.contentByGroupName("terms", lang);
    loading = false;
  }
</script>

<svelte:head>
  <title>BCFUN | Terms & Conditions</title>
</svelte:head>

<div class="container mx-auto">
  <LoadingOverlay {loading}>
    <div class="text-column">
      {#if content?.response?.length}
        {#each content.response as item}
          {@html item.text}
        {/each}
      {/if}
    </div>
  </LoadingOverlay>
</div>
