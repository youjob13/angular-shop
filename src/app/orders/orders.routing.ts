import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProcessOrderComponent } from './component';

const routes = [
  {
    path: '',
    component: ProcessOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {
  static components = [ProcessOrderComponent];
}
