import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Category, IProduct } from 'src/app/shared/models/product.model';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlTree } from '@angular/router';

import { CanComponentDeactivate } from '../../interfaces/can-component-deactivate.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/@ngrx/app.state';
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';
import * as RouterActions from '../../../core/@ngrx/router/router.actions';
import { selectProductById } from 'src/app/core/@ngrx/products/products.selectors';

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

  private isSave = false;
  categories = [Category.LAPTOP, Category.SMARTPHONE, Category.OTHER];

  constructor(private store: Store<AppState>) {}

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(selectProductById).pipe(
      switchMap((initialProduct: IProduct) => {
        const isNotEdited = (
          Object.keys(initialProduct) as (keyof IProduct)[]
        ).every(
          (property) =>
            property === 'id' ||
            initialProduct[property] === this.productForm.value[property]
        );

        if (isNotEdited) {
          return of(true);
        }

        if (this.isSave) {
          return of(true);
        }

        return of(
          confirm('Are you sure? All completed information will be lost')
        );
      })
    );
  }

  ngOnInit(): void {
    this.store
      .select(selectProductById)
      .pipe(take(1))
      .subscribe((product) => {
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

    this.store
      .select(selectProductById)
      .pipe(take(1))
      .subscribe((initialProduct) => {
        if (initialProduct.id) {
          const updatedProduct: IProduct = {
            ...initialProduct,
            ...this.productForm.value,
          };
          this.store.dispatch(
            ProductsActions.updateProduct({ updatedProduct })
          );
        } else {
          const product: IProduct = this.productForm.value;
          this.store.dispatch(ProductsActions.addProduct({ product }));
        }
      });
  }

  onGoBack(): void {
    this.store.dispatch(RouterActions.Navigate({ path: ['admin/products'] }));
  }

  onFileChange(event: Event): void {
    const { files } = event.target as any;
    let file = files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      this.productForm.controls.imageUrl.setValue(reader.result);
    };
    reader.readAsDataURL(file);
  }
}
