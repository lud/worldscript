import type { CellBiome, CellBiomeID } from '../cell'
import type { ItemType, ItemTypeID } from '../item-type'
import type { Tech, TechID } from '../tech'

type EntityID = string | number
type Entity = { id: EntityID; name?: string }
type EntityOf<T extends EntityID> = { id: T; name?: string }

export type GameContentPack = (builder: GameContentPatcher) => void


export interface GameContentBuilder {
  build(): GameContent;
  addPack(pack: GameContentPack): void;
}

export interface GameContentPatcher {
  addTech(tech: Tech): void;
  addItem(itt: ItemType): void;
}

export interface GameContent {
  techs: Partial<Record<TechID, Tech>>;
  biomes: Partial<Record<CellBiomeID, CellBiome>>;
  itemTypes: Partial<Record<ItemTypeID, ItemType>>;
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


      const patcher = {
        addTech(tech: Tech): void {
          register(techs, tech)
        },

        addItem(itt: ItemType): void {
          register(itemTypes, itt)
        },

      }
      packs.forEach(pack => pack(patcher))
      return { techs, biomes, itemTypes }
    },
  }
}
