import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/@ngrx/app.state';
import {
  selectProducts,
  selectProductsLoading,
} from 'src/app/core/@ngrx/products/products.selectors';
import { ProductsService } from 'src/app/products/services/products.service';
import { IProduct } from 'src/app/shared/models/product.model';
import * as RouterActions from '../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  products$!: Observable<readonly IProduct[]>;
  loading$!: Observable<boolean>;

  constructor(
    public productsService: ProductsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductsLoading);
  }

  onEditProduct(product: IProduct): void {
    const URL = ['admin/product/edit', product.id];
    this.store.dispatch(RouterActions.Navigate({ path: URL }));
  }
}
