export enum CellBiomeID {
  Temperate
}

export interface CellBiome {
  id: CellBiomeID;
}

export enum CellNatureID {
  DenseVegetation
}

export enum CellSettlementID {
  None
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
