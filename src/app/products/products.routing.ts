import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent, ProductViewComponent } from './components';

const routes = [
  {
    path: 'products-list',
    data: { animationState: 'products' },
    component: ProductListComponent,
  },
  {
    path: 'product/:id',
    component: ProductViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
  static components = [ProductListComponent, ProductViewComponent];
}
