import { NgModule } from '@angular/core';
import { EmailValidatorDirective } from './directives/emailValidator.directive';

@NgModule({
  declarations: [EmailValidatorDirective],
  imports: [],
  exports: [EmailValidatorDirective],
})
export class CoreModule {}
