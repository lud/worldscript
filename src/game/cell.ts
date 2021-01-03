export enum CellBiomeID {
  Temperate = 'Temperate'
}

export interface CellBiome {
  id: CellBiomeID;
}

export enum CellNatureID {
  DenseVegetation = 'DenseVegetation',
  Rocky = 'Rocky'
}

export enum CellSettlementID {
  None = 'None',
  Cave = 'Cave'
}

export interface CellSettlement {
  id: CellSettlementID;
  name: string;
}

export interface Cell {
  level: number;
  biome: CellBiomeID;
  nature: CellNatureID;
  settlement: CellSettlementID;
}

export type UnknownCell = 'UNKNOWN'

export function unknownCell(): UnknownCell { return 'UNKNOWN' }