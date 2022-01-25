import { CartListService } from 'src/app/cart/services/cart-list.service';

import { Component } from '@angular/core';

import { IProduct } from '../../../shared/models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', '../../../app.component.scss'],
})
export class ProductListComponent {
  constructor(
    public productService: ProductsService,
    private cartListService: CartListService
  ) {}

  addProductToCart(product: IProduct): void {
    this.cartListService.addProduct(product);
  }
}
