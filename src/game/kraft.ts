import type { Cell, CellNatureID, CellSettlementID } from './cell'
import type { Costs, Gains } from './inventory'
import type { GameLogger } from './logger'
import type { TechID } from './tech'

export enum KraftID {
  FoodPicking1 = 'FoodPicking'
}

export interface Kraft {
  id: KraftID;
  name: string;
  costs: Costs;
  gains: Gains;
  duration: number;
  requiredTechID: TechID;
  workers: number;
  requiredSettlements: null | CellSettlementID[];
  requiredNatures: null | CellNatureID[];
  // acceptCell can look in the cell state to know if we have some requirements,
  // for example if an agricultural cell is well irrigated. We have
  // requiredSettlements separated so we cann pick cells faster
  acceptCell: (cell: Cell) => boolean;
  transformCell?: (cell: Cell) => Cell;
  logChanges: (logger: GameLogger) => void;
}