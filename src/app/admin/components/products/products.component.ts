import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/products/services/products.service';
import { IProduct } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  products!: IProduct[];

  constructor(
    public productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().then((res) => {
      this.products = res;
      this.changeDetector.markForCheck();
    });
  }

  onEditProduct(product: IProduct): void {
    const URL = ['../product/edit', product.id];

    this.router.navigate(URL, { relativeTo: this.route });
  }
}
