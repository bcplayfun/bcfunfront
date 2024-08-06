<script lang="ts">
  export let width: number = 16;
  export let height: number = 16;
  export let stroke: string = "white";
</script>

<svg
  {width}
  {height}
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 4L4 12"
    {stroke}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <!-- stroke="#0071b2" -->
  <path
    d="M4 4L12 12"
    {stroke}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
