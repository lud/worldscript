import { CellNatureID, Cell, CellBiomeID, CellSettlementID, UnknownCell, unknownCell } from './cell'



export type Cube = [/*x*/number,/*y*/number,/*z*/number]
export type Axial = [/*q*/number,/*r*/number]

export function cube(x: number, y: number, z: number): Cube {
  if (x + y + z !== 0) {
    throw new Error(`Invalid hex ${x} ${y} ${z}`)
  }
  return [x, y, z]
}

export type Grid = Record<number, Record<number, Cell | UnknownCell>>;

export interface GMap {
  grid: Grid;
}

function cubeToAxial(hex: Cube): Axial {
  return [hex[0], hex[2]]
}

function axialToCube([q, r]: Axial): Cube {
  return [q, -q - r, r]
}

export function createMap(): GMap {
  const origin = cube(0, 0, 0)

  const firstCell: Cell = {
    biome: CellBiomeID.Temperate,
    settlement: CellSettlementID.Cave,
    level: 1,
    nature: CellNatureID.Rocky,
  }
  const initialCells: ([Cube, Cell | UnknownCell])[] = [[origin, firstCell], ...cubeNeighbours(origin).map((neighCube: Cube): [Cube, UnknownCell] => [neighCube, unknownCell()])]

  console.log('initialCells', initialCells)

  const grid = {}
  initialCells.forEach(([cube, cell]) => {
    mutReplaceGridCell(grid, cubeToAxial(cube), cell)
  })

  return { grid }
}

function mutReplaceGridCell(grid: Grid, qr: Axial, cell: Cell | UnknownCell): void {
  const [q, r] = qr
  if (typeof grid[q] === 'undefined') grid[q] = {}
  grid[q][r] = cell
}

function cubeNeighbours(c: Cube): Cube[] {
  const directions = [
    cube(+1, -1, 0), cube(+1, 0, -1), cube(0, +1, -1),
    cube(-1, +1, 0), cube(-1, 0, +1), cube(0, -1, +1),
  ]
  return directions.map(add => cubeAdd(c, add))
}

function cubeAdd(c: Cube, add: Cube): Cube {
  return cube(c[0] + add[0], c[1] + add[1], c[2] + add[2])
}

export function iterateGMap<T>(gmap: GMap, fn: (cube: Cube, cell: Cell | UnknownCell) => T): T[] {
  const result: T[] = []
  Object.keys(gmap.grid).forEach(q => Object.keys(gmap.grid[q]).forEach(r => {
    const c = axialToCube([parseInt(q), parseInt(r)])
    const cell = gmap.grid[q][r]
    result.push(fn(c, cell))
  }))
  return result
}