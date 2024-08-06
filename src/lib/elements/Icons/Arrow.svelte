<script lang="ts">
  export let direction: "left" | "right" | "up" | "down" = "left";
  export let fill: string = "none";
  export let height = 12;
  export let width = 12;

  const directionToDeg = (dir: typeof direction): number => {
    switch (dir) {
      case "down":
        return 0;
      case "left":
        return 90;
      case "up":
        return 180;
      case "right":
        return 270;
    }
  };
</script>

<svg
  class={`icon icon-arrowLeft`}
  viewBox="0 0 12 12"
  {width}
  {height}
  {fill}
  style={`transition: transform 0.2s;transform: rotate(${directionToDeg(
    direction
  )}deg);pointer-events:none`}
>
  <title>Arrow {direction}</title>
  <path
    d="M9.5 4.5L6 8L2.5 4.5"
    stroke="white"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
