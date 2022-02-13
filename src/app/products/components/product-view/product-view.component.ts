import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartListService } from 'src/app/cart/services/cart-list.service';

import { IProduct } from 'src/app/shared/models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductViewComponent implements OnInit {
  product: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartListService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          const productID = paramMap.get('id');
          return productID
            ? of(this.productsService.getProduct(productID))
            : EMPTY;
        })
      )
      .subscribe(
        (product) => {
          this.product = product;
        },
        (err) => {
          console.error(err);
          this.router.navigate(['/products-list']);
        }
      );
  }

  onBuyProduct(): void {
    if (this.product) {
      this.cartService.addProduct(this.product);
    }
  }
}
