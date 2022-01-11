export enum Category {
  LAPTOP = 'laptop',
  SMARTPHONE = 'smartphone',
  OTHER = 'other',
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
}
