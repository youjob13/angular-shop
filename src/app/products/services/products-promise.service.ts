import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { CONSTANTS, ConstantsServiceType } from 'src/app/core';
import type { IProduct } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsPromiseService {
  constructor(
    private httpClient: HttpClient,
    @Optional() @Inject(CONSTANTS) private constants: ConstantsServiceType
  ) {}

  loadProduct(): Promise<IProduct[]> {
    const pathToProducts = `${this.constants.API_URL}${this.constants.ProductsDataEndpoint}`;

    return this.httpClient.get<IProduct[]>(pathToProducts).toPromise();
  }

  addProduct(product: IProduct): Promise<IProduct> {
    const pathToProducts = `${this.constants.API_URL}${this.constants.ProductsDataEndpoint}`;

    return this.httpClient.post<IProduct>(pathToProducts, product).toPromise();
  }

  updateProduct(updatedProduct: IProduct): Promise<IProduct> {
    const pathToProducts = `${this.constants.API_URL}${this.constants.ProductsDataEndpoint}/${updatedProduct.id}`;

    return this.httpClient
      .put<IProduct>(pathToProducts, updatedProduct)
      .toPromise();
  }
}
