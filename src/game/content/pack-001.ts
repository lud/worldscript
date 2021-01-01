import { CellSettlementID } from '../cell'
import { ItemTypeID } from '../item-type'
import { TechID } from '../tech'
import type { GameContentPatcher } from './content-registry'

export default function (patcher: GameContentPatcher): void {
  const { addItem, addTech } = patcher

  addTech({
    id: TechID.Exploration,
    name: 'Exploration',
    costs: [],
    requiredIterations: 0,
    requiredSettlementID: CellSettlementID.None,
    duration: 1,
  })

  addItem({ id: ItemTypeID.Food, name: 'Food' })

}