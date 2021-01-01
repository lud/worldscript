export enum ItemTypeID {
  Stone,
  Food
}

export interface ItemType {
  id: ItemTypeID,
  name: string
}