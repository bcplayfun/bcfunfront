<script lang="ts">
  import { openModal } from "$lib/elements/Modal";
  import VerifyEmail from "$lib/elements/Verify";
  type Field = "username" | "email" | "phone" | "fullName" | "birthDate" | null;
  let fieldTexts = {
    username: "Username",
    email: "Email",
    phone: "Phone",
    fullName: "Full name",
    birthDate: "Date of birth",
    null: "",
  };
  export let field: Field;
  export let data = {} as any;
  export let disabled = false;

  function openVerifyEmail() {
    openModal(VerifyEmail, "Verify Email", {}, { type: "new" });
  }
</script>

<div class:email={field === "email"}>
  <div class="field">
    {field ? fieldTexts[field] : ""}
  </div>
  <div style:position="relative">
    <slot {data} />
    {#if field === "email" && !disabled}
      <div class="verify" on:click={() => openVerifyEmail()} on:keydown>
        Verify
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .verify {
    display: flex;
    align-items: center;
    position: absolute;
    top: 15px;
    right: 0;
    padding: 0 10px;
    color: var(--brand-primary);
    font-size: 12px;
    font-weight: 500;

    cursor: pointer;
  }
  :global(form.email .value) {
    text-transform: lowercase;
  }
  .field {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 600;
    margin: 0 0 5px;
  }
  form {
    position: relative;
  }
  .input-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }
</style>
