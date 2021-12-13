import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { CartListService } from 'src/app/cart-list/services/cart-list.service';
import { Category, IProduct } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() name = '';
  @Input() description = '';
  @Input() price = 0;
  @Input() category = Category.OTHER;
  @Input() isAvailable = false;

  // не стоит тут внедрять зависимость
  // этот компонент не владеет данными и не должен с ними что-то делать,
  // кроме отображения
  constructor(private cartListService: CartListService) {}

  ngOnInit(): void {}

  onAddToCart(): void {
    console.log('Product purchased');
    const product = {
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      isAvailable: this.isAvailable,
    };

    this.cartListService.addProduct(product);
  }

  getProductStatus(): string {
    return this.isAvailable ? 'Yes' : 'No';
  }
}
