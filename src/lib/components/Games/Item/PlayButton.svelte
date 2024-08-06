<script lang="ts">
  import { isLoggedIn } from "$lib/stores/player";
</script>

<button on:click>
  {$isLoggedIn ? "Play now" : "Register now"}
</button>

<style lang="scss">
  button {
    background: transparent;
    padding: 8px 10px;
    border-radius: 8px;
    background-color: rgba(0, 139, 44, 0.7);
    background-image: conic-gradient(
      from 1turn,
      rgb(0, 188, 61),
      rgb(0, 139, 44)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 0.2s ease-in-out;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    color: white;
    &:hover {
      filter: brightness(1.1);
    }
  }
</style>
