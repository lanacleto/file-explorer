<script lang="ts">
  interface Props {
    width?: number;
    height?: number;
    fill?: string;
  }

  let { width = 24, height = 24, fill = "#999999" }: Props = $props();
</script>

<svg
  class="icon icon-x-file"
  data-testid="icon-x-file"
  {width}
  {height}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M17 8.00714L15.9929 7L12 10.9929L8.00714 7L7 8.00714L10.9929 12L7 15.9929L8.00714 17L12 13.0071L15.9929 17L17 15.9929L13.0071 12L17 8.00714Z"
    {fill}
  />
</svg> 