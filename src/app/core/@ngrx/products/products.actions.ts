import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/models/product.model';

// хорошее решение, возможно назвать ProductsActionTypes
// так как в другом модуле происходит импорт всех Actions через объект ProductsActions
export enum ProductsActions {
  GetProducts = '[Products List Page (App)] GET_PRODUCTS',
  GetProductsSuccess = '[Products List Page (App)] GET_PRODUCTS_SUCCESS',
  GetProductsError = '[Products List Page (App)] GET_PRODUCTS_ERROR',
  AddProduct = '[Admin Product Form (User)] ADD_PRODUCT',
  AddProductSuccess = '[Admin Product Form (User)] ADD_PRODUCT_SUCCESS',
  AddProductError = '[Admin Product Form (User)] ADD_PRODUCT_ERROR',
  UpdateProduct = '[Admin Product Form (User)] UPDATE_PRODUCT',
  UpdateProductSuccess = '[Admin Product Form (User)] UPDATE_PRODUCT_SUCCESS',
  UpdateProductError = '[Admin Product Form (User)] UPDATE_PRODUCT_ERROR',
  SetInitialProduct = '[Admin Product Form (User)] SET_INITIAL_PRODUCT',
}

export const getProducts = createAction(ProductsActions.GetProducts);

export const getProductsSuccess = createAction(
  ProductsActions.GetProductsSuccess,
  props<{ products: IProduct[] }>()
);

export const getProductsError = createAction(
  ProductsActions.GetProductsError,
  props<{ error: Error | string | null }>()
);

export const addProduct = createAction(
  ProductsActions.AddProduct,
  props<{ product: IProduct }>()
);

export const addProductSuccess = createAction(
  ProductsActions.AddProductSuccess,
  props<{ product: IProduct }>()
);

export const addProductError = createAction(
  ProductsActions.AddProductError,
  props<{ error: Error | string | null }>()
);

export const updateProduct = createAction(
  ProductsActions.UpdateProduct,
  props<{ updatedProduct: IProduct }>()
);

export const updateProductSuccess = createAction(
  ProductsActions.UpdateProductSuccess,
  props<{ updatedProduct: IProduct }>()
);

export const updateProductError = createAction(
  ProductsActions.UpdateProductError,
  props<{ error: Error | string | null }>()
);

export const setInitialProduct = createAction(
  ProductsActions.SetInitialProduct,
  props<{ initialProduct: IProduct }>()
);
