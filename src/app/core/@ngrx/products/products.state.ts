import { IProduct } from 'src/app/shared/models/product.model';

export interface ProductsState {
  products: Readonly<IProduct[]>;
  initialProduct: IProduct | null;
  readonly loading: boolean;
  readonly error: Error | string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  initialProduct: null,
};
