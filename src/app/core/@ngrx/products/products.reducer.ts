import { Action, createReducer, on } from '@ngrx/store';
import { initialProductsState, ProductsState } from './products.state';
import * as Actions from './products.actions';

const reducer = createReducer(
  initialProductsState,
  on(Actions.getProducts, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getProductsSuccess, (state, { products }) => {
    return {
      ...state,
      products,
      loading: false,
    };
  }),
  on(Actions.getProductsError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(Actions.addProductSuccess, (state, { product }) => {
    return {
      ...state,
      products: [...state.products, product],
    };
  }),
  on(
    Actions.addProductError,
    Actions.updateProductError,
    (state, { error }) => {
      return {
        ...state,
        error,
      };
    }
  ),
  on(Actions.updateProductSuccess, (state, { updatedProduct }) => {
    return {
      ...state,
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    };
  }),
  on(Actions.setInitialProduct, (state, { initialProduct }) => {
    return {
      ...state,
      initialProduct,
    };
  })
);

export function productsReducer(
  state: ProductsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
