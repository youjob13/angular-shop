import { Component } from '@angular/core';
import { CartListService } from 'src/app/cart/services/cart-list.service';

import { IProduct } from '../../../shared/models/product.model';
import { ProductsService } from '../../services/products.service';
import { CanActivate } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', '../../../app.component.scss'],
})
export class ProductListComponent implements CanActivate {
  constructor(
    public productService: ProductsService,
    private cartListService: CartListService
  ) {}

  canActivate(): boolean {
    return false;
  }

  addProductToCart(product: IProduct): void {
    this.cartListService.addProduct(product);
  }
}
