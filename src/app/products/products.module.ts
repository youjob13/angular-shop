import { inject, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components';
import { ProductsRoutingModule } from './products.routing';
import { GeneratorService } from '../core';

@NgModule({
  declarations: [ProductsRoutingModule.components, ProductComponent],
  imports: [CommonModule, SharedModule, ProductsRoutingModule],
  exports: [ProductComponent],
  providers: [GeneratorService],
})
export class ProductsModule {}

export const GENERATOR_ID_TOKEN = new InjectionToken<(n: number) => string>(
  'String Generator',
  {
    providedIn: ProductsModule,
    factory: () => {
      const generatorService = inject(GeneratorService);
      return (n: number) => generatorService.generate(n);
    },
  }
);
