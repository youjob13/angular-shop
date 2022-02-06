import { EMPTY, Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/products/services/products.service';
import { Category, IProduct } from 'src/app/shared/models/product.model';

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class ProductResolverGuard implements Resolve<Partial<IProduct>> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ):
    | Partial<IProduct>
    | Observable<Partial<IProduct>>
    | Promise<Partial<IProduct>> {
    const id = route.paramMap.get('ID');

    const billetProduct = {
      name: '',
      description: '',
      category: Category.OTHER,
      price: 0,
      quantity: 0,
    } as Partial<IProduct>;

    if (id == null) {
      return of(billetProduct);
    }

    return this.productsService.getProduct(id).pipe(
      switchMap((product) => {
        if (product == null) {
          return this.onGoBack();
        }

        return of(product);
      }),
      take(1),
      catchError(() => this.onGoBack())
    );
  }

  private onGoBack(): Observable<never> {
    this.router.navigate(['/admin/products']);
    return EMPTY;
  }
}
