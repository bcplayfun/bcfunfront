<script lang="ts">
  import Alert from "$lib/elements/Alert";
  import * as Assets from "./assets";

  export let input: any;
  export let error = "";

  let fileName = "";
  let filePreview = "";
  let fileExt = "";

  $: if (input.file.get("file")) {
    const file = input.file.get("file");
    fileName = file.name;
    filePreview = URL.createObjectURL(file);
  } else {
    filePreview = "";
    fileName = "";
  }

  async function onFileSelected(e: any) {
    const fileSize = e.target.files[0].size / 1024 / 1024;
    fileExt = e.target.value.match(/\.([^\.]+)$/)[1];
    if (fileSize > 15) {
      e.target.value = "";
      Alert.error("Maximum upload size 5mb");
      return;
    }

    switch (fileExt.toLowerCase()) {
      case "jpg":
      case "jpeg":
      case "png":
      case "pdf":
        input.file.append("file", e.target.files[0]);
        input.file.append("option", "private");
        fileName = e.target.files[0].name;
        filePreview = URL.createObjectURL(e.target.files[0]);
        break;
      default:
        e.target.value = "";
        fileName = "";
        filePreview = "";
        Alert.error("Please upload jpg, png or pdf files");
    }
  }
</script>

<input
  id={input.key}
  style="display: none;"
  type="file"
  accept=".jpg, .jpeg, .png, .pdf"
  on:change={(e) => {
    onFileSelected(e);
  }}
  on:click={() => (error = "")}
/>
<label class="item" class:error for={input.key}>
  <h2>
    {input.name}
    {#if input.required}
      <span style:color="#fa5051">*</span>
    {/if}
  </h2>
  <div class="inner">
    <div class="label">Choose file</div>
    <div class="file">
      {!fileName.length
        ? "No file chosen"
        : fileName.length < 20
          ? fileName
          : fileName.split(`.${fileExt}`)[0].substring(0, 20) + "." + fileExt}
    </div>
    <div class="ms-auto">
      <svelte:component this={Assets.UploadIcon} />
    </div>
  </div>
</label>
{#if error.length}
  <span class="error">
    {error}
  </span>
{/if}
{#if filePreview && fileExt !== "pdf"}
  <img src={filePreview} alt="" class="img mt-10" />
{/if}

<style lang="scss">
  .img {
    max-height: 100px;
    object-fit: cover;
    width: 100%;
  }
  .error {
    display: block;
    color: var(--red);
    font-weight: 600;
    transition: 0.3s ease-in-out;
    line-height: 19px;
    font-size: 14px;
  }
  .item {
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: border-color 0.4s ease;
    &:hover {
      border-color: var(--color-primary);
    }

    h2 {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-color-primary);
    }
    .inner {
      margin-top: 5px;
      width: 100%;
      height: 40px;
      padding: 0 10px;
      border: 2px solid var(--brand-stroke);
      background: var(--panel-background-color-primary);
      display: flex;
      align-items: center;
      gap: 5px;
      .label {
        font-size: 13px;
        font-weight: 600;
      }
      .file {
        font-size: 12px;
        font-weight: 500;
      }
    }

    &.error {
      .inner {
        border-color: var(--red);
      }
    }
  }
</style>
