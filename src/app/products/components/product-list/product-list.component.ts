import { Component, OnInit } from '@angular/core';
import { CartListService } from 'src/app/cart-list/services/cart-list.service';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../product/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', '../../../app.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];

  constructor(
    private productService: ProductsService,
    private cartListService: CartListService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  addProductToCart(product: IProduct): void {
    this.cartListService.addProduct(product);
  }
}
