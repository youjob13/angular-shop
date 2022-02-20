import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartListService } from 'src/app/cart/services/cart-list.service';

import { IProduct } from '../../../shared/models/product.model';
import { ProductsService } from '../../services/products.service';
import { CanActivate } from '@angular/router';
import { AppState } from 'src/app/core/@ngrx/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectProducts,
  selectProductsLoading,
} from 'src/app/core/@ngrx/products/products.selectors';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', '../../../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, CanActivate {
  products$!: Observable<readonly IProduct[]>;
  loading$!: Observable<boolean>;

  constructor(
    public productsService: ProductsService,
    private cartListService: CartListService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductsLoading);
  }

  canActivate(): boolean {
    return false;
  }

  addProductToCart(product: IProduct): void {
    this.cartListService.addProduct(product);
  }
}
