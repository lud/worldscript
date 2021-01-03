<script>
  import { iterateGMap } from '$game/gmap'
  import Cell from '$components/Cell.svelte'

  export let gmap

  function cellData(cube, cell) {
    return { cube, cell }
  }

  $: cellsData = iterateGMap(gmap, cellData)

  const viewBox = '-100 -100 200 200'
  // function hexToPixel
</script>

<pre>{JSON.stringify(gmap, null, 2)} </pre>

<svg {viewBox}>
  <g>
    {#each cellsData as { cube, cell }}
      <Cell {cube} {cell} />
    {/each}
  </g>
</svg>
