import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import {
  ProductFormComponent,
  ProductsComponent,
  OrdersComponent,
} from './components';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { ProductResolverGuard } from './guards/product-resolver.guard.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'product',
        children: [
          {
            path: 'edit/:ID',
            component: ProductFormComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              product: ProductResolverGuard,
            },
          },
          {
            path: 'add',
            component: ProductFormComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              product: ProductResolverGuard,
            },
          },
        ],
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  static components = [
    AdminComponent,
    ProductsComponent,
    ProductFormComponent,
    OrdersComponent,
  ];
}
