import type { ItemTypeID } from './item-type'

export type Inventory = Record<ItemTypeID, number>

export interface InventoryModifier {
  t: ItemTypeID; amount: number;
}

export function modifier(t: ItemTypeID, amount: number): InventoryModifier {
  return { t, amount }
}
