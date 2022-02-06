import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core';
import { DetailsComponent } from './details';
import { OrdersGuard } from './orders';
import { PageForbiddenComponent } from './page-forbidden';

const routes: Routes = [
  {
    path: 'cart-list',
    data: { animationState: 'cart' },
    loadChildren: () =>
      import('./cart/cart.module')
        .then((m) => m.CartListModule)
        .catch((error) => console.error(error)),
  },
  {
    path: 'orders',
    canLoad: [OrdersGuard],
    canActivate: [OrdersGuard],
    data: { animationState: 'orders' },
    loadChildren: () =>
      import('./orders/orders.module')
        .then((m) => m.OrdersModule)
        .catch((error) => console.error(error)),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module')
        .then((m) => m.AdminModule)
        .catch((error) => console.error(error)),
  },
  {
    path: 'news',
    component: DetailsComponent,
    outlet: 'details',
  },
  {
    path: 'forbidden',
    data: { animationState: 'forbidden' },
    component: PageForbiddenComponent,
  },
  {
    path: '**',
    redirectTo: 'products-list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
