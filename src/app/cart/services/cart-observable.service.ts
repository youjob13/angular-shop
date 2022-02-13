import { forkJoin, Observable } from 'rxjs';
import { CONSTANTS, ConstantsServiceType } from 'src/app/core';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import type { IPurchasedProduct } from '../cart.model';
@Injectable({
  providedIn: 'root',
})
export class CartObservableService {
  constructor(
    private httpClient: HttpClient,
    @Optional() @Inject(CONSTANTS) private constants: ConstantsServiceType
  ) {
    this.loadCart();
  }

  loadCart(): Observable<IPurchasedProduct[]> {
    const pathToCartProducts = `${this.constants.API_URL}${this.constants.CartDataEndpoint}`;

    return this.httpClient.get<IPurchasedProduct[]>(pathToCartProducts);
  }

  updateProduct(
    updatedProduct: IPurchasedProduct
  ): Observable<IPurchasedProduct[]> {
    const pathToCartProducts = `${this.constants.API_URL}${this.constants.CartDataEndpoint}/${updatedProduct.id}`;

    return this.httpClient.put<IPurchasedProduct[]>(
      pathToCartProducts,
      updatedProduct
    );
  }

  addProduct(product: IPurchasedProduct): Observable<IPurchasedProduct[]> {
    const pathToCartProducts = `${this.constants.API_URL}${this.constants.CartDataEndpoint}`;

    return this.httpClient.post<IPurchasedProduct[]>(
      pathToCartProducts,
      product
    );
  }

  deleteProduct(productId: string): Observable<void> {
    const pathToCartProducts = `${this.constants.API_URL}${this.constants.CartDataEndpoint}/${productId}`;
    console.log(productId);

    return this.httpClient.delete<void>(pathToCartProducts);
  }

  clearCart(cartProducts: IPurchasedProduct[]): Observable<void> {
    return forkJoin(
      ...cartProducts.map((product) => {
        return this.deleteProduct(product.id);
      })
    );
  }
}
