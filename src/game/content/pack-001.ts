import { CellNatureID, CellSettlementID } from '../cell'
import { ItemTypeID } from '../item-type'
import { KraftID } from '../kraft'
import { TechID } from '../tech'
import type { GameContentPatcher } from './content-registry'
import { invm } from '../inventory'
import { noop } from 'svelte/internal'
import { GameLogger, logmsg } from '../logger'

export default function (patcher: GameContentPatcher): void {
  const { addItem, addTech, addSettlement, addKraft } = patcher

  addSettlement({ id: CellSettlementID.None, name: 'Unsettled' })

  addTech({
    id: TechID.Exploration,
    name: 'Exploration',
    costs: [],
    requiredIterations: 0,
    requiredSettlementID: null,
    duration: 1,
  })

  addItem({ id: ItemTypeID.Food, name: 'Food' })

  addKraft({
    id: KraftID.FoodPicking1,
    costs: [],
    gains: [invm(ItemTypeID.Food, 1)],
    acceptCell: null,
    duration: 1,
    logChanges: logmsg('Gathered some food'),
    name: 'Pick Food',
    requiredNatures: [CellNatureID.DenseVegetation],
    requiredSettlements: [CellSettlementID.None],
    requiredTechID: TechID.Exploration,
    workers: 1, transformCell: null,
  })

}