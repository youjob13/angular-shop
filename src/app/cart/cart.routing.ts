import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartListComponent } from './components';

const routes = [
  {
    path: '',
    component: CartListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {
  static components = [CartListComponent];
}
