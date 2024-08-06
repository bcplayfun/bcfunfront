<script lang="ts">
  export let width: string = "20px";
  export let height: string = "20px";
  export let fill: string = "#9698A1";
</script>

<svg viewBox="0 0 32 32" {width} {height} {fill}>
  <path
    d="m4 9h4c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2h14c.552 0 1-.447 1-1s-.448-1-1-1h-14c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2h-4c-.552 0-1 .447-1 1s.448 1 1 1z"
  />
  <path
    d="m28 15h-6c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2h-12c-.552 0-1 .447-1 1s.448 1 1 1h12c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2h6c.552 0 1-.447 1-1s-.448-1-1-1z"
  />
  <path
    d="m28 23h-14c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2h-4c-.552 0-1 .447-1 1s.448 1 1 1h4c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2h14c.552 0 1-.447 1-1s-.448-1-1-1z"
  />
</svg>

<style>
  svg {
    pointer-events: none;
  }
</style>
