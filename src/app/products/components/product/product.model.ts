export enum Category {
  LAPTOP = 'laptop',
  SMARTPHONE = 'smartphone',
  OTHER = 'other',
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
}
