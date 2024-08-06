<script lang="ts">
  import { openModal } from "$lib/elements/Modal";
  import Register from "$lib/elements/Modals/Register";
  import { go } from "$lib/elements/Profile";
  import { isLoggedIn } from "$lib/stores/player";
  import img from "./methods.png";

  function action() {
    if ($isLoggedIn) {
      go("dashboard", "my-account");
    } else {
      openModal(Register, "Sign up", {}, { type: "new" });
    }
  }
</script>

<div class="container mx-auto mt-32 mb-16">
  <div class="banner" on:click={() => action()} on:keydown>
    <div class="img-wrap">
      <img src={img} alt="visa, mastercard,apple pay, btc, crypto" />
    </div>
  </div>
</div>

<style lang="scss">
  .banner {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: 8px;
    padding: 0;
    gap: 10px;
    pointer-events: none;

    @include media.down(md) {
      gap: 5px;
    }
    .img-wrap {
      display: flex;
      align-items: center;
      gap: 40px;
      img {
        width: 370px;
        user-select: none;
      }
    }
  }
</style>
