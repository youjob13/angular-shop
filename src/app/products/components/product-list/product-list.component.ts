import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CartListService } from 'src/app/cart/services/cart-list.service';

import { IProduct } from '../../../shared/models/product.model';
import { ProductsService } from '../../services/products.service';
import { CanActivate } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', '../../../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, CanActivate {
  products!: IProduct[];

  constructor(
    public productsService: ProductsService,
    private cartListService: CartListService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().then((res) => {
      this.products = res;
      this.changeDetector.markForCheck();
    });
  }

  canActivate(): boolean {
    return false;
  }

  addProductToCart(product: IProduct): void {
    this.cartListService.addProduct(product);
  }
}
