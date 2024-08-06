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
    [content] = await api.content.contentByGroupName("affiliates", lang);
    loading = false;
  }
</script>

<svelte:head>
  <title>BCFUN | Affiliates</title>
</svelte:head>

<div class="container mx-auto">
  <LoadingOverlay {loading}>
    <div class="text-column">
      {#if content?.response?.length}
        {#each content.response as item}
          {@html item.text}
        {/each}
        <h2>Ricco Jennings / Affiliate Manager</h2>
        <p>
          Skype: <a
            href="https://join.skype.com/invite/IycysOd2ZRKg"
            target="_blank"
          >
            live:.cid.209cdd12e39eff4d
          </a>
        </p>
        <p>
          Whatsapp: <a href="https://wa.me/17787399926" target="_blank"
            >+1 (778) 739-9926</a
          >
        </p>
      {/if}
    </div>
  </LoadingOverlay>
</div>
