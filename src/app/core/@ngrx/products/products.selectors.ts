import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Category, IProduct } from 'src/app/shared/models/product.model';
import { RouterStateUrl } from '../router';
import { selectRouterState } from '../router/router.selectors';
import type { ProductsState } from './products.state';

const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectProductById = createSelector(
  selectProducts,
  selectRouterState,
  (
    products: Readonly<IProduct[]>,
    router: RouterReducerState<RouterStateUrl>
  ): IProduct => {
    const productId = router.state.params.ID;

    return (
      products.find((product) => product.id === productId) || {
        id: '',
        name: '',
        category: Category.OTHER,
        description: '',
        price: 0,
        quantity: 0,
        isAvailable: false,
        imageUrl: '',
        imageAlt: '',
      }
    );
  }
);
