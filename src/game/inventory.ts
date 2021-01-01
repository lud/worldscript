import type { ItemTypeID } from './item-type'

export type Inventory = Record<ItemTypeID, number>

export interface InventoryModifier {
  t: ItemTypeID; amount: number;
}
export type Costs = InventoryModifier[]
export type Gains = InventoryModifier[]

export function invm(t: ItemTypeID, amount: number): InventoryModifier {
  return { t, amount }
}
