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
  quantity: number;
  category: Category;
  isAvailable: boolean;
  imageUrl: string;
  imageAlt?: string;
}
