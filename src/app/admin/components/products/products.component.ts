import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/products/services/products.service';
import { IProduct } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  constructor(
    public productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onEditProduct(product: IProduct): void {
    const URL = ['../product/edit', product.id];

    this.router.navigate(URL, { relativeTo: this.route });
  }
}
