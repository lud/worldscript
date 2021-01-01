import type { CellSettlementID } from './cell'
import type { InventoryModifier } from './inventory'

export enum TechID {
  Exploration = 'Exploration'
}

export interface Tech {
  id: TechID;
  name: string;
  requiredSettlementID: null | CellSettlementID;
  duration: number;
  requiredIterations: number;
  costs: InventoryModifier[];
}