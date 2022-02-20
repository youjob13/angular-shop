import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CartListService } from 'src/app/cart/services/cart-list.service';
import { AppState } from 'src/app/core/@ngrx/app.state';
import { selectProductById } from 'src/app/core/@ngrx/products/products.selectors';
import { IProduct } from 'src/app/shared/models/product.model';

@Component({
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductViewComponent implements OnInit {
  product: IProduct | undefined;

  constructor(
    private cartService: CartListService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectProductById)
      .pipe(take(1))
      .subscribe((product) => {
        this.product = product;
      });
  }

  onBuyProduct(): void {
    if (this.product) {
      this.cartService.addProduct(this.product);
    }
  }
}
