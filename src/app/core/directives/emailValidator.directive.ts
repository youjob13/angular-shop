import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[emailValidator][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective {
  validate({ value }: AbstractControl): ValidationErrors | null {
    return /[\w\d]+@[\d\w]{2,10}\..{2,10}/i.test(value)
      ? null
      : { emailValidationError: true };
  }
}
