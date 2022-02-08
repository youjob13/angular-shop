import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from 'src/app/products/services/products.service';
import { Category, IProduct } from 'src/app/shared/models/product.model';

import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { CanComponentDeactivate } from '../../interfaces/can-component-deactivate.interface';

const DEFAULT_PRODUCT_IMAGE = '/assets/default.png';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit, CanComponentDeactivate {
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    category: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    quantity: new FormControl(0),
    imageUrl: new FormControl(''),
  });

  private initialProduct!: IProduct;
  private isSave = false;
  categories = [Category.LAPTOP, Category.SMARTPHONE, Category.OTHER];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isNotEdited = (
      Object.keys(this.initialProduct) as (keyof IProduct)[]
    ).every(
      (property) =>
        property === 'id' ||
        this.initialProduct[property] === this.productForm.value[property]
    );

    if (isNotEdited) {
      return true;
    }

    if (this.isSave) {
      return true;
    }

    return confirm('Are you sure? All completed information will be lost');
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map((data) => data.product))
      .subscribe((product: IProduct) => {
        this.initialProduct = product;

        // можно воспользоваться таким методом, может быть код будет меньше
        // this.productForm.setValue()/patchValue();

        this.productForm.controls.name.setValue(product.name || '');
        this.productForm.controls.description.setValue(
          product.description || ''
        );
        this.productForm.controls.category.setValue(product.category || '');
        this.productForm.controls.price.setValue(product.price || 0);
        this.productForm.controls.quantity.setValue(product.quantity || 0);
        this.productForm.controls.imageUrl.setValue(
          product?.imageUrl || DEFAULT_PRODUCT_IMAGE,
          { emitModelToViewChange: false }
        );
      });
  }

  onSave(): void {
    this.isSave = true;

    if (this.initialProduct.id) {
      this.productsService.updateProduct(
        this.initialProduct,
        this.productForm.value
      );
    } else {
      this.productsService.addProduct(this.productForm.value);
    }

    this.location.back();
  }

  onGoBack(): void {
    this.router.navigate(['admin/products']);
  }

  onFileChange(event: Event) {
    const { files } = event.target as any;
    let file = files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      this.productForm.controls.imageUrl.setValue(reader.result);
    };
    reader.readAsDataURL(file);
  }
}
