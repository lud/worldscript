<script context="module">
  const { sqrt, round, PI, cos, sin } = Math

  const SIZE_X = 50
  const SIZE_Y = 30

  // const CELLPADDING = Math.max(SIZE_X, SIZE_Y) * 0.1
  const CELLPADDING = 0

  const INNER_X = round(SIZE_X - CELLPADDING)
  const INNER_Y = round(SIZE_Y - CELLPADDING)

  function flatTopCubeToPixel([q, _, r]) {
    var x = SIZE_X * ((3 / 2) * q)
    var y = SIZE_Y * ((sqrt(3) / 2) * q + sqrt(3) * r)
    return [x, y]
  }

  // With the flat top orientation, the corners are at 0°, 60°, 120°, 180°, 240°, 300°
  function flatTopCornerOffset(cornerIndex) {
    const angle = 2 * PI * ((cornerIndex + 0) / 6)
    console.log('angle', angle)
    return [INNER_X * cos(angle), INNER_Y * sin(angle)]
  }

  function hexagonCorners() {
    return [0, 1, 2, 3, 4, 5].map(flatTopCornerOffset)
  }

  function hexPolygonPoints() {
    const points = hexagonCorners()
    return points.map((xy) => xy.join(' ')).join(' ')
  }

  const HEX_POINTS = hexPolygonPoints()
  console.log('HEX_POINTS', HEX_POINTS)

  console.log('hexagonCorners()', JSON.stringify(hexagonCorners()))
  console.log('hexPolygonPoints()', hexPolygonPoints())
</script>

<script>
  export let cell
  export let cube
  console.log('cube', cube)

  $: translation = flatTopCubeToPixel(cube)

  $: console.log('flatTopCubeToPixel(cube)', flatTopCubeToPixel(cube))

  function ringN(cube) {
    return Math.max(...cube)
  }

  function maxIndex(cube) {
    return Math.pow(6, ringN(cube))
  }
</script>

<g transform="translate({translation[0]}, {translation[1]})">
  <polygon
    points={HEX_POINTS}
    stroke="#aaaaaa"
    fill="transparent"
    stroke-width="1" />
</g>
