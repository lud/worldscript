export enum ItemTypeID {
  Stone = 'Stone',
  Food = 'Food'
}

export interface ItemType {
  id: ItemTypeID;
  name: string;
}