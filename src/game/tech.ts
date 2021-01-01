import type { CellSettlementID } from './cell'
import type { InventoryModifier } from './inventory'

export enum TechID {
  Exploration
}

export interface Tech {
  id: TechID;
  name: string;
  requiredSettlementID: CellSettlementID;
  duration: number;
  requiredIterations: number;
  costs: InventoryModifier[];
}