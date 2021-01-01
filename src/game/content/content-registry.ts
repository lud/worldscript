import type { CellBiome, CellBiomeID, CellSettlement, CellSettlementID } from '../cell'
import type { InventoryModifier } from '../inventory'
import type { ItemType, ItemTypeID } from '../item-type'
import type { Tech, TechID } from '../tech'
import invariant from 'invariant'

type EntityID = string | number
type Entity = { id: EntityID; name?: string }
type EntityOf<T extends EntityID> = { id: T; name?: string }
type Costs = InventoryModifier[]

export type GameContentPack = (builder: GameContentPatcher) => void

export interface GameContentBuilder {
  build(): GameContent;
  addPack(pack: GameContentPack): void;
}

export interface GameContentPatcher {
  addTech(tech: Tech): void;
  addItem(itt: ItemType): void;
  addSettlement(stmt: CellSettlement): void;
}

export interface GameContent {
  techs: Partial<Record<TechID, Tech>>;
  biomes: Partial<Record<CellBiomeID, CellBiome>>;
  itemTypes: Partial<Record<ItemTypeID, ItemType>>;
  settlements: Partial<Record<CellSettlementID, CellSettlement>>;
}

function checkNew(store: Record<EntityID, unknown>, entity: Entity) {
  if (store[entity.id]) {
    throw new Error(`Cannot register ${entity.name || 'noname'}#${entity.id} to the registry: already registered`)
  }
}

function register<T extends EntityID>(store: Partial<Record<T, EntityOf<T>>>, entity: EntityOf<T>): void {
  checkNew(store, entity)
  store[entity.id] = entity
}

export function createContentBuilder(): GameContentBuilder {
  const packs: GameContentPack[] = []
  return {
    addPack(pack: GameContentPack) {
      packs.push(pack)
    },
    build(): GameContent {
      const techs: Partial<Record<TechID, Tech>> = {}
      const biomes: Partial<Record<CellBiomeID, CellBiome>> = {}
      const itemTypes: Partial<Record<ItemTypeID, ItemType>> = {}
      const settlements: Partial<Record<CellSettlementID, CellSettlement>> = {}

      function checkCosts(costs: Costs) {
        costs.forEach(({ t }) => invariant(!!itemTypes[t], `Item type '${t}' is not defined`))
      }

      function checkSettlementID(id: CellSettlementID) {
        invariant(!!settlements[id], `Cell settlement '${id}' is not defined`)
      }

      const patcher = {

        addTech(tech: Tech): void {
          checkCosts(tech.costs)
          checkSettlementID(tech.requiredSettlementID)
          register(techs, tech)
        },

        addItem(itt: ItemType): void {
          register(itemTypes, itt)
        },

        addSettlement(stmt: CellSettlement): void {
          register(settlements, stmt)
        },

      }
      packs.forEach(pack => pack(patcher))
      return { techs, biomes, itemTypes, settlements }
    },
  }
}
