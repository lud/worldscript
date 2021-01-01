export enum CellBiomeID {
  Temperate = 'Temperate'
}

export interface CellBiome {
  id: CellBiomeID;
}

export enum CellNatureID {
  DenseVegetation = 'DenseVegetation',
}

export enum CellSettlementID {
  None = 'None'
}

export interface CellSettlement {
  id: CellSettlementID;
  name: string;
}

export interface Cell {
  coords: {
    q: number;
    r: number;
  };
  level: number;
  settled: boolean;
  biome: CellBiomeID;
  nature: CellNatureID;
  settlement: CellSettlementID;
}
