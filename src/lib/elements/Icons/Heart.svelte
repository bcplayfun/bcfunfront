<script>
  export let width = 22;
  export let height = 20;
  export let stroke = "white";
  export let strokeWidth = 2;
  export let fill = "transparent";
</script>

<div on:click on:keydown>
  <svg
    {width}
    {height}
    {fill}
    viewBox="0 0 22 20"
    style="transition: fill .2s ease-in-out;"
    xmlns="http://www.w3.org/2000/svg"
    class="heart-svg"
  >
    <path
      d="M19.1023 3.16452C18.6462 2.71607 18.1046 2.36034 17.5086
        2.11763C16.9125 1.87492 16.2737 1.75 15.6285 1.75C14.9833 1.75 14.3444
        1.87492 13.7484 2.11763C13.1523 2.36034 12.6108 2.71607 12.1547
        3.16452L11.2081 4.09476L10.2615 3.16452C9.34019 2.25912 8.09063 1.75047
        6.7877 1.75047C5.48477 1.75047 4.23521 2.25912 3.3139 3.16452C2.39259
        4.06992 1.875 5.2979 1.875 6.57833C1.875 7.85875 2.39259 9.08674 3.3139
        9.99214L4.26049 10.9224L11.2081 17.75L18.1557 10.9224L19.1023
        9.99214C19.5586 9.54391 19.9206 9.01171 20.1676 8.42596C20.4145 7.8402
        20.5417 7.21237 20.5417 6.57833C20.5417 5.94428 20.4145 5.31645 20.1676
        4.7307C19.9206 4.14494 19.5586 3.61275 19.1023 3.16452Z"
      fill-opacity="1"
      {stroke}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</div>

<style>
  div {
    cursor: pointer;
    flex-shrink: 0;
  }
</style>
