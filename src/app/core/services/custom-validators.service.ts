import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class CustomValidatorsService {
  static nameValidator: ValidatorFn = ({
    value,
  }: AbstractControl): ValidationErrors | null => {
    const firstLetter = value[0];
    return firstLetter === firstLetter.toUpperCase()
      ? null
      : { nameValidationError: true };
  };
}
